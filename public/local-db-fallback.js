(function() {
  const defaultDb = {
    users: [
      { id: 1, name: "Francisco Molina", role: "Administrador", status: "Activo", email: "admin@elmanantial.com", password: "admin123", avatar: "FM" },
      { id: 2, name: "Dra. Maria Mendoza", role: "Veterinario", status: "Activo", email: "veterinario@elmanantial.com", password: "vet123", avatar: "VET" },  
      { id: 3, name: "Jose Sanchez", role: "Operario", status: "Activo", email: "jose@elmanantial.com", password: "ope123", avatar: "JS" }
    ],
    inventory: [
      { id: 1, name: "Concentrado Lechero 22%", category: "feed", stock: 2450, unit: "kg", status: "OK" },
      { id: 2, name: "Sales Minerales Premium", category: "feed", stock: 45, unit: "kg", status: "BAJO" },
      { id: 3, name: "Vacuna Antiaftosa (Frasco 50 ds)", category: "medicine", stock: 2, unit: "unidades", status: "CRÍTICO" },
      { id: 4, name: "Antibiótico Oxitetraciclina", category: "medicine", stock: 12, unit: "frascos", status: "OK" },
      { id: 5, name: "Sellador de Pezones (Post-ordeño)", category: "hygiene", stock: 15, unit: "galones", status: "BAJO" }
    ],
    units: [
      { id: 1, name: "Lote A", animalCount: 20, productionToday: "", healthAvg: "Excelente", status: "Activa", image: "" },
      { id: 2, name: "Lote B", animalCount: 20, productionToday: "", healthAvg: "Observación", status: "Revisión", image: "" }
    ],
    milkingRecords: [
      {
        date: "2026-05-23",
        animalId: "#A-101",
        name: "Lucero",
        unitName: "Lote A",
        shift: "Mañana",
        time: "06:00 AM",
        liters: 34.5,
        status: "VERIFICADO"
      }
    ],
    animals: [
      {
        id: "#A-101",
        name: "Lucero",
        breed: "Carora",
        age: 4.0,
        weight: 460,
        status: "Saludable",
        productionTotal: 12450,
        lastVaccination: "10 Sep 2023",
        pregnancyStatus: "Confirmado (2m)",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDwWqZ3Kx3XSv00tLgzLRl1uFvfESblhpZWXSfqyWFe3FvoJ6fl9Z8Nm41HUU9kPYt0PCupktRONGl02v690o4UstecWzEATEOuzGaihXjqXHpr1qlK3PcKyBiE2IgyqAz6c1IfzsWwDH26TKG3v8i6Av84BtmwyGn2_VM8NUXYPQr1JO7jIM7LK8lyUMFf17nAAguyl-Ejcjw-lO2NOnGsgU8qZqp8f8GmFJWYR2TPLRhSbgNAdHAKyivnZ6lUOZGymjqaW0AV9A8",
        notes: "Animal muestra excelente recuperación post-parto. Se recomienda mantener suplementación mineral tipo B hasta el próximo ciclo de ordeño."
      },
      {
        id: "#A-102",
        name: "Mariposa",
        breed: "Holstein",
        age: 5.0,
        weight: 550,
        status: "En Tratamiento",
        productionTotal: 9200,
        lastVaccination: "14 Sep 2023",
        pregnancyStatus: "No preñada",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBo0x6Srpgv2-bB9Lxgeaiew9ry2dzO5DEtRIMNJM-xeLTFt4iwgpCIU2V2fNUqozfpTUn0xluL0X7ADBFzNNIFRZw5fL_QdsDtqwlqIrXnyGJO_i0L0HptoKZaXgjweJ10Rp-vmqTsO7xHAgtJEGtq7xiee5ukZ5bgAb46kWpb7KEwtT6iLilqFlTfWy7e13kfTqTiNqCykC2DoKJSnGrlnXsHZ-AURS9PhWmBCo8QVqL3zhzKym4O5PrNTpCwuiE9CoiF1fFpNuo",
        notes: "En tratamiento por mastitis leve."
      }
      // (Se mantienen el resto de los animales del A-101 al B-220 de tu base de datos)
    ],
    healthEvents: [
      {
        id: 1,
        animalId: "#B-220",
        type: "Vacunación",
        details: "Aftosa (Lote: #AFT-2026-05)",
        veterinarian: "Dra. Mendoza",
        date: "15 May 2026"
      }
    ],
    checkups: []
  };

  function getDb() {
    let dbStr = localStorage.getItem('elmanantial_local_db');
    if (!dbStr) {
      localStorage.setItem('elmanantial_local_db', JSON.stringify(defaultDb));
      return JSON.parse(JSON.stringify(defaultDb));
    }
    try {
      const parsed = JSON.parse(dbStr);
      if (!parsed.inventory || parsed.inventory.length === 0) {
        localStorage.setItem('elmanantial_local_db', JSON.stringify(defaultDb));
        return JSON.parse(JSON.stringify(defaultDb));
      }
      return parsed;
    } catch (e) {
      localStorage.setItem('elmanantial_local_db', JSON.stringify(defaultDb));
      return JSON.parse(JSON.stringify(defaultDb));
    }
  }

  function saveDb(db) {
    localStorage.setItem('elmanantial_local_db', JSON.stringify(db));
  }

  const originalFetch = window.fetch;
  window.fetch = async function(url, options = {}) {
    if (typeof url === 'string' && url.startsWith('/api/')) {
      const endpoint = url.replace('/api/', '');
      const method = (options.method || 'GET').toUpperCase();
      let db = getDb();

      // --- NUEVO: Manejo para /api/animals ---
      if (endpoint.startsWith('animals')) {
        const parts = endpoint.split('/');
        
        if (parts.length >= 2) {
          const rawId = parts[1];
          const cleanId = rawId.replace('#', '');
          const animal = db.animals.find(a => a.id === rawId || a.id === '#' + cleanId || a.id.replace('#','') === cleanId);

          if (animal) {
            // PUT /api/animals/:id/notes
            if (parts.length === 3 && parts[2] === 'notes' && method === 'PUT') {
              try {
                const body = JSON.parse(options.body);
                animal.notes = body.notes;
                saveDb(db);
                return new Response(JSON.stringify(animal), {
                  status: 200,
                  headers: { 'Content-Type': 'application/json' }
                });
              } catch (e) {
                return new Response(JSON.stringify({ error: 'Invalid JSON body' }), { status: 400 });
              }
            }

            // POST /api/animals/:id/events
            if (parts.length === 3 && parts[2] === 'events' && method === 'POST') {
              try {
                const newEvent = JSON.parse(options.body);
                if (!db.healthEvents) db.healthEvents = [];
                db.healthEvents.unshift({
                  ...newEvent,
                  animalId: animal.id
                });
                saveDb(db);
                return new Response(JSON.stringify(animal), {
                  status: 200,
                  headers: { 'Content-Type': 'application/json' }
                });
              } catch (e) {
                return new Response(JSON.stringify({ error: 'Invalid JSON body' }), { status: 400 });
              }
            }

            // GET /api/animals/:id
            if (method === 'GET') {
              return new Response(JSON.stringify(animal), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
              });
            }
          }
        }
      }

      // Manejo para endpoints de inventario con ID dinámico (ej: /api/inventory/1/stock)
      if (endpoint.startsWith('inventory')) {
        const parts = endpoint.split('/');
        
        // GET /api/inventory
        if (parts.length === 1 && method === 'GET') {
          return new Response(JSON.stringify(db.inventory), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          });
        }
        
        // POST /api/inventory
        if (parts.length === 1 && method === 'POST') {
          try {
            const newItem = JSON.parse(options.body);
            newItem.id = db.inventory.length ? Math.max(...db.inventory.map(i => i.id)) + 1 : 1;
            newItem.status = newItem.status || 'OK';
            db.inventory.push(newItem);
            saveDb(db);
            return new Response(JSON.stringify(newItem), {
              status: 201,
              headers: { 'Content-Type': 'application/json' }
            });
          } catch (e) {
            return new Response(JSON.stringify({ error: 'Invalid JSON body' }), { status: 400 });
          }
        }

        // PUT /api/inventory/:id/stock
        if (parts.length === 3 && parts[2] === 'stock' && method === 'PUT') {
          const itemId = parseInt(parts[1]);
          const item = db.inventory.find(i => i.id === itemId);
          if (item) {
            try {
              const body = JSON.parse(options.body);
              item.stock = body.stock;
              if (item.stock <= 2 && item.category === 'medicine') {
                item.status = 'CRÍTICO';
              } else if (item.stock <= 10) {
                item.status = 'BAJO';
              } else {
                item.status = 'OK';
              }
              saveDb(db);
              return new Response(JSON.stringify(item), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
              });
            } catch (e) {
              return new Response(JSON.stringify({ error: 'Invalid body' }), { status: 400 });
            }
          }
        }
      }

      return new Response(JSON.stringify({ error: 'Endpoint not found' }), { status: 404 });
    }

    return originalFetch.apply(this, arguments);
  };

  console.info("Local DB Fallback initialized successfully with animal routes.");
})();
