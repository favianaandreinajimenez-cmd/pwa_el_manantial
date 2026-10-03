const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Servir archivos estáticos desde la carpeta public
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// ==================== RUTAS DE AUTENTICACIÓN ====================

app.post('/api/login', (req, res) => {
  let { email, password } = req.body;

  // Compatibilidad con accesos directos predefinidos
  if (email === 'operador1@elmanantial.com' && password === 'operador1') {
    email = 'jose@elmanantial.com';
  } else if (email === 'veterinario@elmanantial.com' && password === 'veterinario1') {
    password = 'vet123';
  }

  const query = `SELECT * FROM users WHERE email = ? AND password = ?`;
  db.get(query, [email, password], (err, user) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!user) return res.status(401).json({ error: 'Credenciales incorrectas' });
    if (user.status && user.status !== 'Activo') {
      return res.status(403).json({ error: "Su cuenta ha sido desactivada." });
    }
    res.json(user);
  });
});

// ==================== RUTAS DE DASHBOARD ====================

app.get('/api/dashboard', (req, res) => {
  db.all("SELECT * FROM milkingRecords ORDER BY id DESC", [], (err, milkingRecords) => {
    // Si la tabla se llama 'milking' en lugar de 'milkingRecords', ajusta según tu base de datos
    db.all("SELECT * FROM units", [], (err, units) => {
      db.all("SELECT * FROM inventory", [], (err, inventory) => {
        const statsQuery = `
          SELECT 
            (SELECT COUNT(*) FROM animals) as totalAnimals,
            (SELECT SUM(liters) FROM milkingRecords) as totalProduction,
            (SELECT COUNT(*) FROM inventory) as totalInventoryItems,
            (SELECT COUNT(*) FROM users) as totalUsers
        `;
        
        db.get(statsQuery, (err, stats) => {
          res.json({
            stats: stats || { totalAnimals: 0, totalProduction: 0 },
            todayLiters: 0,
            activeUnits: units ? units.length : 0,
            criticalStockAlerts: inventory ? inventory.filter(i => i.status === 'CRÍTICO' || i.status === 'BAJO').length : 0,
            recentMilking: milkingRecords ? milkingRecords.slice(0, 5) : [],
            units: units || []
          });
        });
      });
    });
  });
});

// ==================== RUTAS DE USUARIOS ====================

app.get('/api/users', (req, res) => {
  db.all(`SELECT * FROM users`, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/users', (req, res) => {
  const { name, email, password, role, status, avatar } = req.body;
  const userStatus = status || "Activo";
  const userRole = role || "usuario";
  const userAvatar = avatar || name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  const query = `INSERT INTO users (name, role, status, email, password, avatar) VALUES (?, ?, ?, ?, ?, ?)`;
  db.run(query, [name, userRole, userStatus, email, password, userAvatar], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    db.get("SELECT * FROM users WHERE id = ?", [this.lastID], (err, row) => {
      res.status(201).json(row);
    });
  });
});

app.put('/api/users/:id', (req, res) => {
  const { name, email, password, role, status } = req.body;
  const { id } = req.params;
  const query = `UPDATE users SET name = ?, email = ?, role = ?, status = ? WHERE id = ?`;

  db.run(query, [name, email, role, status, id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    db.get("SELECT * FROM users WHERE id = ?", [id], (err, row) => {
      res.json(row);
    });
  });
});

app.delete('/api/users/:id', (req, res) => {
  db.run(`DELETE FROM users WHERE id = ?`, [req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Usuario eliminado con éxito' });
  });
});

// ==================== RUTAS DE INVENTARIO ====================

app.get('/api/inventory', (req, res) => {
  db.all(`SELECT * FROM inventory`, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows || []);
  });
});

app.post('/api/inventory', (req, res) => {
  const { name, category, stock, unit, status } = req.body;
  const query = `INSERT INTO inventory (name, category, stock, unit, status) VALUES (?, ?, ?, ?, ?)`;
  
  db.run(query, [name, category, stock, unit, status || 'OK'], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    db.get("SELECT * FROM inventory WHERE id = ?", [this.lastID], (err, row) => {
      res.status(201).json(row);
    });
  });
});

// ==================== RUTAS DE UNIDADES / LOTES ====================

app.get('/api/units', (req, res) => {
  db.all(`SELECT * FROM units`, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows || []);
  });
});

app.post('/api/units', (req, res) => {
  const { name, owner, animalCount, status } = req.body;
  const query = `INSERT INTO units (name, owner, animalCount, status) VALUES (?, ?, ?, ?)`;
  
  db.run(query, [name, owner, animalCount || 0, status || 'Activa'], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    db.get("SELECT * FROM units WHERE id = ?", [this.lastID], (err, row) => {
      res.status(201).json(row);
    });
  });
});

// ==================== RUTAS DE ORDEÑO ====================

app.get('/api/milking', (req, res) => {
  db.all(`SELECT * FROM milkingRecords ORDER BY id DESC`, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows || []);
  });
});

app.post('/api/milking', (req, res) => {
  const { unitName, liters, shift, date } = req.body;
  const query = `INSERT INTO milkingRecords (unitName, liters, shift, date, status) VALUES (?, ?, ?, ?, ?)`;
  
  db.run(query, [unitName, liters, shift, date || new Date().toISOString().split('T')[0], 'VERIFICADO'], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    db.get("SELECT * FROM milkingRecords WHERE id = ?", [this.lastID], (err, row) => {
      res.status(201).json(row);
    });
  });
});

// ==================== RUTAS DE ANIMALES ====================

app.get('/api/animals', (req, res) => {
  const { unit } = req.query;
  let query = `SELECT * FROM animals`;
  let params = [];

  if (unit) {
    query += ` WHERE unit = ? OR id LIKE ?`;
    params.push(unit, `%${unit}%`);
  }

  db.all(query, params, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows || []);
  });
});

app.post('/api/animals', (req, res) => {
  const { name, tag, breed, yield: cowYield, status, unit } = req.body;
  const query = `INSERT INTO animals (name, tag, breed, yield, status, unit) VALUES (?, ?, ?, ?, ?, ?)`;
  
  db.run(query, [name, tag, breed, cowYield, status || 'Activa', unit], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    db.get("SELECT * FROM animals WHERE id = ?", [this.lastID], (err, row) => {
      res.status(201).json(row);
    });
  });
});

// ==================== REPORTES Y SALUD ====================

app.get('/api/health-summary', (req, res) => {
  db.all(`SELECT * FROM animals`, (err, animals) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({
      healthyPercentage: 94,
      inTreatment: 2,
      underObservation: 1,
      animals: animals || []
    });
  });
});

// Fallback para SPA (Single Page Application)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ==================== INICIO DEL SERVIDOR ====================
app.listen(PORT, () => {
  console.log(`pwa_el_manantial running at http://localhost:${PORT}`);
});
