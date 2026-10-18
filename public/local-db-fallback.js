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
      // --- LOTE A (A-101 al A-120) ---
      { id: "#A-101", name: "Lucero", breed: "Carora", age: 4.0, weight: 460, status: "Saludable", productionTotal: 12450, lastVaccination: "10 Sep 2025", pregnancyStatus: "Confirmado (2m)", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDwWqZ3Kx3XSv00tLgzLRl1uFvfESblhpZWXSfqyWFe3FvoJ6fl9Z8Nm41HUU9kPYt0PCupktRONGl02v690o4UstecWzEATEOuzGaihXjqXHpr1qlK3PcKyBiE2IgyqAz6c1IfzsWwDH26TKG3v8i6Av84BtmwyGn2_VM8NUXYPQr1JO7jIM7LK8lyUMFf17nAAguyl-Ejcjw-lO2NOnGsgU8qZqp8f8GmFJWYR2TPLRhSbgNAdHAKyivnZ6lUOZGymjqaW0AV9A8", notes: "Animal muestra excelente recuperación post-parto." },
      { id: "#A-102", name: "Mariposa", breed: "Holstein", age: 5.0, weight: 550, status: "En Tratamiento", productionTotal: 9200, lastVaccination: "14 Sep 2025", pregnancyStatus: "No preñada", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBo0x6Srpgv2-bB9Lxgeaiew9ry2dzO5DEtRIMNJM-xeLTFt4iwgpCIU2V2fNUqozfpTUn0xluL0X7ADBFzNNIFRZw5fL_QdsDtqwlqIrXnyGJO_i0L0HptoKZaXgjweJ10Rp-vmqTsO7xHAgtJEGtq7xiee5ukZ5bgAb46kWpb7KEwtT6iLilqFlTfWy7e13kfTqTiNqCykC2DoKJSnGrlnXsHZ-AURS9PhWmBCo8QVqL3zhzKym4O5PrNTpCwuiE9CoiF1fFpNuo", notes: "En tratamiento por mastitis leve." },
      { id: "#A-103", name: "Gitana", breed: "Brahman", age: 3.5, weight: 430, status: "Saludable", productionTotal: 11000, lastVaccination: "10 Sep 2025", pregnancyStatus: "Confirmado (1m)", image: "", notes: "Buena condición corporal." },
      { id: "#A-104", name: "Estrella", breed: "Pardo Suizo", age: 4.5, weight: 480, status: "Saludable", productionTotal: 11800, lastVaccination: "10 Sep 2025", pregnancyStatus: "No preñada", image: "", notes: "Sin novedad." },
      { id: "#A-105", name: "Luna", breed: "Jersey", age: 3.0, weight: 410, status: "Saludable", productionTotal: 10500, lastVaccination: "10 Sep 2025", pregnancyStatus: "No preñada", image: "", notes: "Primer parto exitoso." },
      { id: "#A-106", name: "Mora", breed: "Carora", age: 5.5, weight: 520, status: "Saludable", productionTotal: 13000, lastVaccination: "10 Sep 2025", pregnancyStatus: "Confirmado (3m)", image: "", notes: "Alta producción lechera." },
      { id: "#A-107", name: "Paloma", breed: "Holstein", age: 4.0, weight: 490, status: "Saludable", productionTotal: 11500, lastVaccination: "10 Sep 2025", pregnancyStatus: "No preñada", image: "", notes: "Estable." },
      { id: "#A-108", name: "Flor", breed: "Brahman", age: 6.0, weight: 540, status: "Bajo Observación", productionTotal: 9800, lastVaccination: "10 Sep 2025", pregnancyStatus: "No preñada", image: "", notes: "Revisar miembro posterior izquierdo." },
      { id: "#A-109", name: "Rosilla", breed: "Pardo Suizo", age: 3.8, weight: 450, status: "Saludable", productionTotal: 11200, lastVaccination: "10 Sep 2025", pregnancyStatus: "Confirmado (2m)", image: "", notes: "Control al día." },
      { id: "#A-110", name: "Esperanza", breed: "Carora", age: 4.2, weight: 470, status: "Saludable", productionTotal: 12100, lastVaccination: "10 Sep 2025", pregnancyStatus: "No preñada", image: "", notes: "Excelente temperamento." },
      { id: "#A-111", name: "Bravia", breed: "Holstein", age: 5.0, weight: 510, status: "Saludable", productionTotal: 12500, lastVaccination: "10 Sep 2025", pregnancyStatus: "Confirmado (4m)", image: "", notes: "Buena genética." },
      { id: "#A-112", name: "Consentida", breed: "Jersey", age: 3.2, weight: 420, status: "Saludable", productionTotal: 10800, lastVaccination: "10 Sep 2025", pregnancyStatus: "No preñada", image: "", notes: "Activa y alerta." },
      { id: "#A-113", name: "Castaña", breed: "Brahman", age: 4.7, weight: 495, status: "Saludable", productionTotal: 11600, lastVaccination: "10 Sep 2025", pregnancyStatus: "Confirmado (1m)", image: "", notes: "Sin novedades." },
      { id: "#A-114", name: "Reina", breed: "Carora", age: 6.2, weight: 530, status: "Saludable", productionTotal: 14000, lastVaccination: "10 Sep 2025", pregnancyStatus: "No preñada", image: "", notes: "Vaca nodriza destacada." },
      { id: "#A-115", name: "Prieta", breed: "Pardo Suizo", age: 3.5, weight: 440, status: "Saludable", productionTotal: 10900, lastVaccination: "10 Sep 2025", pregnancyStatus: "No preñada", image: "", notes: "Desarrollo normal." },
      { id: "#A-116", name: "Linda", breed: "Holstein", age: 4.1, weight: 475, status: "Saludable", productionTotal: 11900, lastVaccination: "10 Sep 2025", pregnancyStatus: "Confirmado (2m)", image: "", notes: "Salud óptima." },
      { id: "#A-117", name: "Perla", breed: "Jersey", age: 3.9, weight: 430, status: "Saludable", productionTotal: 10700, lastVaccination: "10 Sep 2025", pregnancyStatus: "No preñada", image: "", notes: "Comportamiento dócil." },
      { id: "#A-118", name: "Pinta", breed: "Brahman", age: 5.3, weight: 505, status: "Saludable", productionTotal: 12200, lastVaccination: "10 Sep 2025", pregnancyStatus: "Confirmado (3m)", image: "", notes: "Sin problemas sanitarios." },
      { id: "#A-119", name: "Margarita", breed: "Carora", age: 4.6, weight: 485, status: "Saludable", productionTotal: 11800, lastVaccination: "10 Sep 2025", pregnancyStatus: "No preñada", image: "", notes: "Buena respuesta al ordeño." },
      { id: "#A-120", name: "Sultana A", breed: "Holstein", age: 4.8, weight: 515, status: "Saludable", productionTotal: 12600, lastVaccination: "10 Sep 2025", pregnancyStatus: "Confirmado (1m)", image: "", notes: "Cierre del Lote A en excelentes condiciones." },

      // --- LOTE B (B-201 al B-220) ---
      { id: "#B-201", name: "Ceniza", breed: "Brahman", age: 3.6, weight: 440, status: "Saludable", productionTotal: 10400, lastVaccination: "15 May 2026", pregnancyStatus: "No preñada", image: "", notes: "Ingresada al Lote B recientemente." },
      { id: "#B-202", name: "Bonita", breed: "Holstein", age: 4.2, weight: 490, status: "Saludable", productionTotal: 11500, lastVaccination: "15 May 2026", pregnancyStatus: "Confirmado (2m)", image: "", notes: "Desarrollo lechero constante." },
      { id: "#B-203", name: "Rocío", breed: "Carora", age: 5.1, weight: 520, status: "Bajo Observación", productionTotal: 12000, lastVaccination: "15 May 2026", pregnancyStatus: "No preñada", image: "", notes: "En observación por leve baja en consumo." },
      { id: "#B-204", name: "Diamante", breed: "Pardo Suizo", age: 3.8, weight: 460, status: "Saludable", productionTotal: 11100, lastVaccination: "15 May 2026", pregnancyStatus: "Confirmado (3m)", image: "", notes: "Excelente ganancia de peso." },
      { id: "#B-205", name: "Gaviota", breed: "Jersey", age: 3.2, weight: 415, status: "Saludable", productionTotal: 10200, lastVaccination: "15 May 2026", pregnancyStatus: "No preñada", image: "", notes: "Sin novedades." },
      { id: "#B-206", name: "Sultana", breed: "Brahman", age: 4.5, weight: 480, status: "Saludable", productionTotal: 11400, lastVaccination: "15 May 2026", pregnancyStatus: "Confirmado (1m)", image: "", notes: "Vacunación aplicada." },
      { id: "#B-207", name: "Alondra", breed: "Holstein", age: 5.0, weight: 530, status: "Saludable", productionTotal: 12800, lastVaccination: "15 May 2026", pregnancyStatus: "No preñada", image: "", notes: "Producción estable." },
      { id: "#B-208", name: "Vainilla", breed: "Carora", age: 3.9, weight: 450, status: "Saludable", productionTotal: 10900, lastVaccination: "15 May 2026", pregnancyStatus: "Confirmado (2m)", image: "", notes: "Salud excelente." },
      { id: "#B-209", name: "Chiquita", breed: "Pardo Suizo", age: 4.1, weight: 470, status: "Saludable", productionTotal: 11300, lastVaccination: "15 May 2026", pregnancyStatus: "No preñada", image: "", notes: "Comportamiento dócil." },
      { id: "#B-210", name: "Furia", breed: "Jersey", age: 3.5, weight: 425, status: "Saludable", productionTotal: 10600, lastVaccination: "15 May 2026", pregnancyStatus: "Confirmado (4m)", image: "", notes: "Gestación avanzada sin novedad." },
      { id: "#B-211", name: "Esmeralda", breed: "Brahman", age: 4.8, weight: 500, status: "Saludable", productionTotal: 11700, lastVaccination: "15 May 2026", pregnancyStatus: "No preñada", image: "", notes: "Control sanitario OK." },
      { id: "#B-212", name: "Venus", breed: "Holstein", age: 5.4, weight: 540, status: "Saludable", productionTotal: 13200, lastVaccination: "15 May 2026", pregnancyStatus: "Confirmado (3m)", image: "", notes: "Alto rendimiento." },
      { id: "#B-213", name: "Zafira", breed: "Carora", age: 3.7, weight: 445, status: "Saludable", productionTotal: 10800, lastVaccination: "15 May 2026", pregnancyStatus: "No preñada", image: "", notes: "Sin problemas." },
      { id: "#B-214", name: "Blanquita", breed: "Pardo Suizo", age: 4.3, weight: 485, status: "Saludable", productionTotal: 11600, lastVaccination: "15 May 2026", pregnancyStatus: "Confirmado (1m)", image: "", notes: "Buen estado general." },
      { id: "#B-215", name: "Tornasol", breed: "Jersey", age: 3.4, weight: 420, status: "Saludable", productionTotal: 10500, lastVaccination: "15 May 2026", pregnancyStatus: "No preñada", image: "", notes: "Activa." },
      { id: "#B-216", name: "Gitana B", breed: "Brahman", age: 4.6, weight: 495, status: "Saludable", productionTotal: 11900, lastVaccination: "15 May 2026", pregnancyStatus: "Confirmado (2m)", image: "", notes: "Sin novedad." },
      { id: "#B-217", name: "Milagros", breed: "Holstein", age: 5.2, weight: 535, status: "Saludable", productionTotal: 13000, lastVaccination: "15 May 2026", pregnancyStatus: "No preñada", image: "", notes: "Recuperada satisfactoriamente de trimestre anterior." },
      { id: "#B-218", name: "Encanto", breed: "Carora", age: 4.0, weight: 470, status: "Saludable", productionTotal: 11200, lastVaccination: "15 May 2026", pregnancyStatus: "Confirmado (2m)", image: "", notes: "Parámetros normales." },
      { id: "#B-219", name: "Paz", breed: "Pardo Suizo", age: 4.4, weight: 490, status: "Saludable", productionTotal: 11800, lastVaccination: "15 May 2026", pregnancyStatus: "No preñada", image: "", notes: "Tranquila en corral." },
      { id: "#B-220", name: "Noble", breed: "Brahman", age: 5.0, weight: 510, status: "Saludable", productionTotal: 12400, lastVaccination: "15 May 2026", pregnancyStatus: "Confirmado (3m)", image: "", notes: "Último registro del Lote B al día." }
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
      // Forzar actualización si no existen animales o hay menos de 40
      if (!parsed.animals || parsed.animals.length < 40) {
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

      // --- Manejo para /api/animals ---
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

      // Manejo para endpoints de inventario con ID dinámico
      if (endpoint.startsWith('inventory')) {
        const parts = endpoint.split('/');
        
        if (parts.length === 1 && method === 'GET') {
          return new Response(JSON.stringify(db.inventory), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          });
        }
        
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

  console.info("Local DB Fallback initialized successfully with 40 static animals (A-101 to B-220).");
})();
