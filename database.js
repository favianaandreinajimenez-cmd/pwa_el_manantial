const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbFile = path.join(__dirname, 'el_manantial.db');
const db = new sqlite3.Database(dbFile, (err) => {
  if (err) {
    console.error('Error al abrir la base de datos:', err.message);
  } else {
    console.log('Conectado a la base de datos SQLite: el_manantial.db');
    initTables();
  }
});

function initTables() {
  db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      role TEXT NOT NULL,
      status TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      avatar TEXT NOT NULL
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS inventory (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      stock REAL NOT NULL,
      unit TEXT NOT NULL,
      status TEXT NOT NULL
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS units (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      owner TEXT NOT NULL,
      animalCount INTEGER NOT NULL,
      productionToday REAL NOT NULL,
      healthAvg TEXT NOT NULL,
      status TEXT NOT NULL,
      image TEXT NOT NULL
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS milkingRecords (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      unitName TEXT NOT NULL,
      liters REAL NOT NULL,
      shift TEXT NOT NULL,
      time TEXT NOT NULL,
      status TEXT NOT NULL,
      date TEXT NOT NULL
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS animals (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      breed TEXT NOT NULL,
      age REAL NOT NULL,
      weight REAL NOT NULL,
      status TEXT NOT NULL,
      productionTotal REAL NOT NULL,
      lastVaccination TEXT NOT NULL,
      pregnancyStatus TEXT NOT NULL,
      image TEXT,
      notes TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS healthEvents (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      animalId TEXT NOT NULL,
      type TEXT NOT NULL,
      details TEXT NOT NULL,
      veterinarian TEXT NOT NULL,
      date TEXT NOT NULL
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS checkups (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      target TEXT NOT NULL,
      priority TEXT NOT NULL,
      date TEXT NOT NULL
    )`);

    seedDatabase();
  });
}

function seedDatabase() {
  db.get("SELECT COUNT(*) as count FROM users", (err, row) => {
    if (row && row.count === 0) {
      console.log('Poblando datos iniciales...');

      // Usuarios
      const defaultUsers = [
        ["Francisco Molina", "Administrador", "Activo", "admin@elmanantial.com", "admin123", "FM"],
        ["Dra. Maria Mendoza", "Veterinario", "Activo", "veterinario@elmanantial.com", "vet123", "VET"],
        ["Jose Sanchez", "Operario", "Activo", "jose@elmanantial.com", "ope123", "JS"]
      ];
      defaultUsers.forEach(u => db.run(`INSERT INTO users (name, role, status, email, password, avatar) VALUES (?, ?, ?, ?, ?, ?)`, u));

      // Inventario
      const defaultInventory = [
        ["Concentrado Lechero 22%", "feed", 2450, "kg", "OK"],
        ["Sales Minerales Premium", "feed", 45, "kg", "BAJO"],
        ["Vacuna Antiaftosa (Frasco 50 ds)", "medicine", 2, "unidades", "CRÍTICO"],
        ["Antibiótico Oxitetraciclina", "medicine", 12, "frascos", "OK"],
        ["Sellador de Pezones (Post-ordeño)", "hygiene", 15, "galones", "BAJO"]
      ];
      defaultInventory.forEach(i => db.run(`INSERT INTO inventory (name, category, stock, unit, status) VALUES (?, ?, ?, ?, ?)`, i));

      // Unidades
      const defaultUnits = [
        ["Lote A", 20, "", "Excelente", "Activa", "https://lh3.googleusercontent.com/aida-public/AB6AXuCiQj84qzExSTNZP9H_WPszqMEUQEn2D4g232SiZw_f6jJderu2YiED_j_YD7qRdXa86uHRTt00MvjdYqMYjAV2WkswqR_3t8YYZK6ohaO6J6SY8zZGpeq191anjsbExl-eS1G-IvTEgc6kz4ERvR0kw-dmC89849DSrlgfzlQOc86AoAp1xq653i5OhyS0c42UAWuF_TvZ-ufOM8mztT9b0MBx_w8_sAYlttHl00dREu_Atvpvc2tn848fgWzRXXC42vNODqFs0zc"],
        ["Lote B", 20, "", "Observación", "Revisión", "https://lh3.googleusercontent.com/aida-public/AB6AXuBo0x6Srpgv2-bB9Lxgeaiew9ry2dzO5DEtRIMNJM-xeLTFt4iwgpCIU2V2fNUqozfpTUn0xluL0X7ADBFzNNIFRZw5fL_QdsDtqwlqIrXnyGJO_i0L0HptoKZaXgjweJ10Rp-vmqTsO7xHAgtJEGtq7xiee5ukZ5bgAb46kWpb7KEwtT6iLilqFlTfWy7e13kfTqTiNqCykC2DoKJSnGrlnXsHZ-AURS9PhWmBCo8QVqL3zhzKym4O5PrNTpCwuiE9CoiF1fFpNuo"]
      ];
      defaultUnits.forEach(un => db.run(`INSERT INTO units (name, owner, animalCount, productionToday, healthAvg, status, image) VALUES (?, ?, ?, ?, ?, ?, ?)`, un));

      // Ordeños (Estructurados correctamente para la tabla milkingRecords: unitName, liters, shift, time, status, date)
      const defaultMilking = [
        // --- LOTE A ---
        ["Lote A", 34.5, "Mañana", "06:00 AM", "VERIFICADO", "2026-05-23"],
        ["Lote A", 38.2, "Mañana", "06:08 AM", "VERIFICADO", "2026-05-23"],
        ["Lote A", 29.0, "Mañana", "06:15 AM", "VERIFICADO", "2026-05-23"],
        ["Lote A", 33.6, "Mañana", "06:22 AM", "VERIFICADO", "2026-05-23"],
        ["Lote A", 28.4, "Mañana", "06:30 AM", "VERIFICADO", "2026-05-23"],
        ["Lote A", 31.1, "Mañana", "06:37 AM", "VERIFICADO", "2026-05-23"],
        ["Lote A", 30.2, "Mañana", "06:45 AM", "VERIFICADO", "2026-05-23"],
        ["Lote A", 39.5, "Mañana", "06:52 AM", "VERIFICADO", "2026-05-23"],
        ["Lote A", 31.8, "Mañana", "07:00 AM", "VERIFICADO", "2026-05-23"],
        ["Lote A", 35.0, "Mañana", "07:07 AM", "VERIFICADO", "2026-05-23"],
        ["Lote A", 27.6, "Mañana", "07:15 AM", "VERIFICADO", "2026-05-23"],
        ["Lote A", 32.4, "Mañana", "07:22 AM", "VERIFICADO", "2026-05-23"],
        ["Lote A", 31.0, "Mañana", "07:30 AM", "VERIFICADO", "2026-05-23"],
        ["Lote A", 37.9, "Mañana", "07:37 AM", "VERIFICADO", "2026-05-23"],
        ["Lote A", 31.5, "Mañana", "07:45 AM", "VERIFICADO", "2026-05-23"],
        ["Lote A", 34.2, "Mañana", "07:52 AM", "VERIFICADO", "2026-05-23"],
        ["Lote A", 28.0, "Mañana", "08:00 AM", "VERIFICADO", "2026-05-23"],
        ["Lote A", 33.1, "Mañana", "08:07 AM", "VERIFICADO", "2026-05-23"],
        ["Lote A", 30.4, "Mañana", "08:15 AM", "VERIFICADO", "2026-05-23"],
        ["Lote A", 38.8, "Mañana", "08:22 AM", "VERIFICADO", "2026-05-23"],
        // --- LOTE B ---
        ["Lote B", 29.8, "Mañana", "08:35 AM", "VERIFICADO", "2026-05-23"],
        ["Lote B", 37.1, "Mañana", "08:42 AM", "VERIFICADO", "2026-05-23"],
        ["Lote B", 31.2, "Mañana", "08:50 AM", "VERIFICADO", "2026-05-23"],
        ["Lote B", 34.0, "Mañana", "08:57 AM", "VERIFICADO", "2026-05-23"],
        ["Lote B", 28.5, "Mañana", "09:05 AM", "VERIFICADO", "2026-05-23"],
        ["Lote B", 32.0, "Mañana", "09:12 AM", "VERIFICADO", "2026-05-23"],
        ["Lote B", 29.5, "Mañana", "09:20 AM", "VERIFICADO", "2026-05-23"],
        ["Lote B", 38.0, "Mañana", "09:27 AM", "VERIFICADO", "2026-05-23"],
        ["Lote B", 32.2, "Mañana", "09:35 AM", "VERIFICADO", "2026-05-23"],
        ["Lote B", 34.6, "Mañana", "09:42 AM", "VERIFICADO", "2026-05-23"],
        ["Lote B", 27.9, "Mañana", "09:50 AM", "VERIFICADO", "2026-05-23"],
        ["Lote B", 32.1, "Mañana", "09:57 AM", "VERIFICADO", "2026-05-23"],
        ["Lote B", 31.8, "Mañana", "10:05 AM", "VERIFICADO", "2026-05-23"],
        ["Lote B", 36.9, "Mañana", "10:12 AM", "VERIFICADO", "2026-05-23"],
        ["Lote B", 30.5, "Mañana", "10:20 AM", "VERIFICADO", "2026-05-23"],
        ["Lote B", 34.3, "Mañana", "10:27 AM", "VERIFICADO", "2026-05-23"],
        ["Lote B", 27.8, "Mañana", "10:35 AM", "VERIFICADO", "2026-05-23"],
        ["Lote B", 32.7, "Mañana", "10:42 AM", "VERIFICADO", "2026-05-23"],
        ["Lote B", 30.1, "Mañana", "10:50 AM", "VERIFICADO", "2026-05-23"],
        ["Lote B", 38.5, "Mañana", "10:57 AM", "VERIFICADO", "2026-05-23"]
      ];
      defaultMilking.forEach(m => db.run(`INSERT INTO milkingRecords (unitName, liters, shift, time, status, date) VALUES (?, ?, ?, ?, ?, ?)`, m));

      // 40 Animales (Lote A y Lote B) con sus notas e imágenes actualizadas
      const animalsData = [
        ["#A-101", "Lucero", "Carora", 4.0, 460, "Saludable", 12450, "10 Sep 2023", "Confirmado (2m)", "https://lh3.googleusercontent.com/aida-public/AB6AXuDwWqZ3Kx3XSv00tLgzLRl1uFvfESblhpZWXSfqyWFe3FvoJ6fl9Z8Nm41HUU9kPYt0PCupktRONGl02v690o4UstecWzEATEOuzGaihXjqXHpr1qlK3PcKyBiE2IgyqAz6c1IfzsWwDH26TKG3v8i6Av84BtmwyGn2_VM8NUXYPQr1JO7jIM7LK8lyUMFf17nAAguyl-Ejcjw-lO2NOnGsgU8qZqp8f8GmFJWYR2TPLRhSbgNAdHAKyivnZ6lUOZGymjqaW0AV9A8", "Animal muestra excelente recuperación post-parto. Se recomienda mantener suplementación mineral tipo B hasta el próximo ciclo de ordeño. Observar pezón posterior izquierdo por sensibilidad mínima."],
        ["#A-102", "Mariposa", "Holstein", 5.0, 550, "En Tratamiento", 9200, "14 Sep 2023", "No preñada", "https://lh3.googleusercontent.com/aida-public/AB6AXuBo0x6Srpgv2-bB9Lxgeaiew9ry2dzO5DEtRIMNJM-xeLTFt4iwgpCIU2V2fNUqozfpTUn0xluL0X7ADBFzNNIFRZw5fL_QdsDtqwlqIrXnyGJO_i0L0HptoKZaXgjweJ10Rp-vmqTsO7xHAgtJEGtq7xiee5ukZ5bgAb46kWpb7KEwtT6iLilqFlTfWy7e13kfTqTiNqCykC2DoKJSnGrlnXsHZ-AURS9PhWmBCo8QVqL3zhzKym4O5PrNTpCwuiE9CoiF1fFpNuo", "Animal muestra excelente recuperación post-parto. Se recomienda mantener suplementación mineral tipo B hasta el próximo ciclo de ordeño. Observar pezón posterior izquierdo por sensibilidad mínima."],
        ["#A-103", "Gitana", "Brahman", 3.5, 500, "Bajo Observación", 6500, "01 Oct 2023", "Confirmado (4m)", "https://lh3.googleusercontent.com/aida-public/AB6AXuDyoJBk67pMfvNC_TOuqCE0fKENi_YnS8PyuoIZbZzn9-WRIgfhrrIGBV9Qqmz52RbldmJwmWDHMH32NgPw8DM5nDsUbQAiLgwXONDLi3aAUqF6Sj3lGOKVIL1TqA_Bi-0yOrOwHxD78a_R_3NArwCKg6aTBB-6CUys2uX0dQhywQ_3MjavSCf0GkMY2wCn8-O8RoVKaO0EtTLQ4rcfQPHOF4yzJwv4ZxBsb5kseksppsWZVrBmQMapSrXkNaSu5CCMIu6CVE40zT8", "Chequeo mensual de gestación y monitoreo de cojera leve."],
        ["#A-104", "Estrella", "Pardo Suizo", 4.2, 530, "Saludable", 8400, "11 Sep 2023", "No preñada", "https://lh3.googleusercontent.com/aida-public/AB6AXuDW3EmF97-GFzGrhnrqGjFsGAr4sL8ORhfn7YuOTjQ4FexKQWEsD6JRaC1W78OYdhmKod5pd9l_dPmsvGFeCB8U4mo6-WJYUaKdVyPpmb8NEZjUlRfXLuStBQYLovDZCafPxrpup8AvhmxPJrDSMLKtD2pDBzHtK60nlNHL6yB0xE3-AVTMemxMo7wYAU3AZiPeq53-eC8U_CAXAVBe3X8g8gOwVeBf3uL32E_qMUqjcIM2_9ZqsGrtaRYjIY2qDRLGP8sc81iEfGU", "Comportamiento dócil en sala de ordeño."],
        ["#A-105", "Luna", "Jersey", 3.0, 440, "Saludable", 6100, "19 Sep 2023", "Confirmado (1m)", "https://lh3.googleusercontent.com/aida-public/AB6AXuDwWqZ3Kx3XSv00tLgzLRl1uFvfESblhpZWXSfqyWFe3FvoJ6fl9Z8Nm41HUU9kPYt0PCupktRONGl02v690o4UstecWzEATEOuzGaihXjqXHpr1qlK3PcKyBiE2IgyqAz6c1IfzsWwDH26TKG3v8i6Av84BtmwyGn2_VM8NUXYPQr1JO7jIM7LK8lyUMFf17nAAguyl-Ejcjw-lO2NOnGsgU8qZqp8f8GmFJWYR2TPLRhSbgNAdHAKyivnZ6lUOZGymjqaW0AV9A8", "Vaca joven con excelente persistencia."],
        ["#A-106", "Paloma", "Mestiza", 4.8, 490, "Saludable", 7300, "22 Sep 2023", "No preñada", "https://lh3.googleusercontent.com/aida-public/AB6AXuBo0x6Srpgv2-bB9Lxgeaiew9ry2dzO5DEtRIMNJM-xeLTFt4iwgpCIU2V2fNUqozfpTUn0xluL0X7ADBFzNNIFRZw5fL_QdsDtqwlqIrXnyGJO_i0L0HptoKZaXgjweJ10Rp-vmqTsO7xHAgtJEGtq7xiee5ukZ5bgAb46kWpb7KEwtT6iLilqFlTfWy7e13kfTqTiNqCykC2DoKJSnGrlnXsHZ-AURS9PhWmBCo8QVqL3zhzKym4O5PrNTpCwuiE9CoiF1fFpNuo", "Adaptada perfectamente al sistema del Lote A."],
        ["#A-107", "Rosilla", "Carora", 3.8, 450, "Saludable", 6800, "05 Sep 2023", "Confirmado (3m)", "https://lh3.googleusercontent.com/aida-public/AB6AXuDyoJBk67pMfvNC_TOuqCE0fKENi_YnS8PyuoIZbZzn9-WRIgfhrrIGBV9Qqmz52RbldmJwmWDHMH32NgPw8DM5nDsUbQAiLgwXONDLi3aAUqF6Sj3lGOKVIL1TqA_Bi-0yOrOwHxD78a_R_3NArwCKg6aTBB-6CUys2uX0dQhywQ_3MjavSCf0GkMY2wCn8-O8RoVKaO0EtTLQ4rcfQPHOF4yzJwv4ZxBsb5kseksppsWZVrBmQMapSrXkNaSu5CCMIu6CVE40zT8", "Controles sanitarios al día."],
        ["#A-108", "Morena", "Holstein", 5.5, 570, "Saludable", 9600, "12 Sep 2023", "No preñada", "https://lh3.googleusercontent.com/aida-public/AB6AXuDW3EmF97-GFzGrhnrqGjFsGAr4sL8ORhfn7YuOTjQ4FexKQWEsD6JRaC1W78OYdhmKod5pd9l_dPmsvGFeCB8U4mo6-WJYUaKdVyPpmb8NEZjUlRfXLuStBQYLovDZCafPxrpup8AvhmxPJrDSMLKtD2pDBzHtK60nlNHL6yB0xE3-AVTMemxMo7wYAU3AZiPeq53-eC8U_CAXAVBe3X8g8gOwVeBf3uL32E_qMUqjcIM2_9ZqsGrtaRYjIY2qDRLGP8sc81iEfGU", "Buen volumen de producción."],
        ["#A-109", "Margarita", "Brahman", 4.1, 510, "Saludable", 7100, "18 Sep 2023", "Confirmado (2m)", "https://lh3.googleusercontent.com/aida-public/AB6AXuDwWqZ3Kx3XSv00tLgzLRl1uFvfESblhpZWXSfqyWFe3FvoJ6fl9Z8Nm41HUU9kPYt0PCupktRONGl02v690o4UstecWzEATEOuzGaihXjqXHpr1qlK3PcKyBiE2IgyqAz6c1IfzsWwDH26TKG3v8i6Av84BtmwyGn2_VM8NUXYPQr1JO7jIM7LK8lyUMFf17nAAguyl-Ejcjw-lO2NOnGsgU8qZqp8f8GmFJWYR2TPLRhSbgNAdHAKyivnZ6lUOZGymjqaW0AV9A8", "Sin observaciones especiales."],
        ["#A-110", "Princesa", "Pardo Suizo", 3.9, 520, "Saludable", 7900, "25 Sep 2023", "No preñada", "https://lh3.googleusercontent.com/aida-public/AB6AXuBo0x6Srpgv2-bB9Lxgeaiew9ry2dzO5DEtRIMNJM-xeLTFt4iwgpCIU2V2fNUqozfpTUn0xluL0X7ADBFzNNIFRZw5fL_QdsDtqwlqIrXnyGJO_i0L0HptoKZaXgjweJ10Rp-vmqTsO7xHAgtJEGtq7xiee5ukZ5bgAb46kWpb7KEwtT6iLilqFlTfWy7e13kfTqTiNqCykC2DoKJSnGrlnXsHZ-AURS9PhWmBCo8QVqL3zhzKym4O5PrNTpCwuiE9CoiF1fFpNuo", "Excelente temperamento."],
        ["#A-111", "Flor", "Jersey", 3.2, 430, "Saludable", 5900, "08 Sep 2023", "Confirmado (3m)", "https://lh3.googleusercontent.com/aida-public/AB6AXuDyoJBk67pMfvNC_TOuqCE0fKENi_YnS8PyuoIZbZzn9-WRIgfhrrIGBV9Qqmz52RbldmJwmWDHMH32NgPw8DM5nDsUbQAiLgwXONDLi3aAUqF6Sj3lGOKVIL1TqA_Bi-0yOrOwHxD78a_R_3NArwCKg6aTBB-6CUys2uX0dQhywQ_3MjavSCf0GkMY2wCn8-O8RoVKaO0EtTLQ4rcfQPHOF4yzJwv4ZxBsb5kseksppsWZVrBmQMapSrXkNaSu5CCMIu6CVE40zT8", "Leche con alta concentración de sólidos."],
        ["#A-112", "Reina", "Mestiza", 4.6, 480, "Saludable", 7400, "13 Sep 2023", "No preñada", "https://lh3.googleusercontent.com/aida-public/AB6AXuDW3EmF97-GFzGrhnrqGjFsGAr4sL8ORhfn7YuOTjQ4FexKQWEsD6JRaC1W78OYdhmKod5pd9l_dPmsvGFeCB8U4mo6-WJYUaKdVyPpmb8NEZjUlRfXLuStBQYLovDZCafPxrpup8AvhmxPJrDSMLKtD2pDBzHtK60nlNHL6yB0xE3-AVTMemxMo7wYAU3AZiPeq53-eC8U_CAXAVBe3X8g8gOwVeBf3uL32E_qMUqjcIM2_9ZqsGrtaRYjIY2qDRLGP8sc81iEfGU", "Estable en los controles de rutina."],
        ["#A-113", "Bonita", "Carora", 3.5, 465, "Saludable", 7100, "17 Sep 2023", "Confirmado (5m)", "https://lh3.googleusercontent.com/aida-public/AB6AXuDwWqZ3Kx3XSv00tLgzLRl1uFvfESblhpZWXSfqyWFe3FvoJ6fl9Z8Nm41HUU9kPYt0PCupktRONGl02v690o4UstecWzEATEOuzGaihXjqXHpr1qlK3PcKyBiE2IgyqAz6c1IfzsWwDH26TKG3v8i6Av84BtmwyGn2_VM8NUXYPQr1JO7jIM7LK8lyUMFf17nAAguyl-Ejcjw-lO2NOnGsgU8qZqp8f8GmFJWYR2TPLRhSbgNAdHAKyivnZ6lUOZGymjqaW0AV9A8", "Sin problemas sanitarios."],
        ["#A-114", "Mora", "Holstein", 5.1, 560, "Saludable", 9100, "21 Sep 2023", "No preñada", "https://lh3.googleusercontent.com/aida-public/AB6AXuBo0x6Srpgv2-bB9Lxgeaiew9ry2dzO5DEtRIMNJM-xeLTFt4iwgpCIU2V2fNUqozfpTUn0xluL0X7ADBFzNNIFRZw5fL_QdsDtqwlqIrXnyGJO_i0L0HptoKZaXgjweJ10Rp-vmqTsO7xHAgtJEGtq7xiee5ukZ5bgAb46kWpb7KEwtT6iLilqFlTfWy7e13kfTqTiNqCykC2DoKJSnGrlnXsHZ-AURS9PhWmBCo8QVqL3zhzKym4O5PrNTpCwuiE9CoiF1fFpNuo", "Buen rendimiento."],
        ["#A-115", "Canela", "Brahman", 4.3, 515, "Saludable", 7200, "29 Sep 2023", "Confirmado (2m)", "https://lh3.googleusercontent.com/aida-public/AB6AXuDyoJBk67pMfvNC_TOuqCE0fKENi_YnS8PyuoIZbZzn9-WRIgfhrrIGBV9Qqmz52RbldmJwmWDHMH32NgPw8DM5nDsUbQAiLgwXONDLi3aAUqF6Sj3lGOKVIL1TqA_Bi-0yOrOwHxD78a_R_3NArwCKg6aTBB-6CUys2uX0dQhywQ_3MjavSCf0GkMY2wCn8-O8RoVKaO0EtTLQ4rcfQPHOF4yzJwv4ZxBsb5kseksppsWZVrBmQMapSrXkNaSu5CCMIu6CVE40zT8", "Monitoreo periódico."],
        ["#A-116", "Pinta", "Pardo Suizo", 4.0, 525, "Saludable", 8100, "03 Oct 2023", "No preñada", "https://lh3.googleusercontent.com/aida-public/AB6AXuDW3EmF97-GFzGrhnrqGjFsGAr4sL8ORhfn7YuOTjQ4FexKQWEsD6JRaC1W78OYdhmKod5pd9l_dPmsvGFeCB8U4mo6-WJYUaKdVyPpmb8NEZjUlRfXLuStBQYLovDZCafPxrpup8AvhmxPJrDSMLKtD2pDBzHtK60nlNHL6yB0xE3-AVTMemxMo7wYAU3AZiPeq53-eC8U_CAXAVBe3X8g8gOwVeBf3uL32E_qMUqjcIM2_9ZqsGrtaRYjIY2qDRLGP8sc81iEfGU", "Comportamiento normal."],
        ["#A-117", "Negrita", "Jersey", 3.3, 435, "Saludable", 6000, "09 Sep 2023", "Confirmado (4m)", "https://lh3.googleusercontent.com/aida-public/AB6AXuDwWqZ3Kx3XSv00tLgzLRl1uFvfESblhpZWXSfqyWFe3FvoJ6fl9Z8Nm41HUU9kPYt0PCupktRONGl02v690o4UstecWzEATEOuzGaihXjqXHpr1qlK3PcKyBiE2IgyqAz6c1IfzsWwDH26TKG3v8i6Av84BtmwyGn2_VM8NUXYPQr1JO7jIM7LK8lyUMFf17nAAguyl-Ejcjw-lO2NOnGsgU8qZqp8f8GmFJWYR2TPLRhSbgNAdHAKyivnZ6lUOZGymjqaW0AV9A8", "Sin incidencias."],
        ["#A-118", "Blanca", "Mestiza", 4.7, 495, "Saludable", 7500, "15 Sep 2023", "No preñada", "https://lh3.googleusercontent.com/aida-public/AB6AXuBo0x6Srpgv2-bB9Lxgeaiew9ry2dzO5DEtRIMNJM-xeLTFt4iwgpCIU2V2fNUqozfpTUn0xluL0X7ADBFzNNIFRZw5fL_QdsDtqwlqIrXnyGJO_i0L0HptoKZaXgjweJ10Rp-vmqTsO7xHAgtJEGtq7xiee5ukZ5bgAb46kWpb7KEwtT6iLilqFlTfWy7e13kfTqTiNqCykC2DoKJSnGrlnXsHZ-AURS9PhWmBCo8QVqL3zhzKym4O5PrNTpCwuiE9CoiF1fFpNuo", "Salud general excelente."],
        ["#A-119", "Perla", "Carora", 3.6, 460, "Saludable", 6900, "20 Sep 2023", "Confirmado (1m)", "https://lh3.googleusercontent.com/aida-public/AB6AXuDyoJBk67pMfvNC_TOuqCE0fKENi_YnS8PyuoIZbZzn9-WRIgfhrrIGBV9Qqmz52RbldmJwmWDHMH32NgPw8DM5nDsUbQAiLgwXONDLi3aAUqF6Sj3lGOKVIL1TqA_Bi-0yOrOwHxD78a_R_3NArwCKg6aTBB-6CUys2uX0dQhywQ_3MjavSCf0GkMY2wCn8-O8RoVKaO0EtTLQ4rcfQPHOF4yzJwv4ZxBsb5kseksppsWZVrBmQMapSrXkNaSu5CCMIu6CVE40zT8", "Desarrollo óptimo."],
        ["#A-120", "Esperanza", "Holstein", 5.2, 565, "Saludable", 9400, "26 Sep 2023", "No preñada", "https://lh3.googleusercontent.com/aida-public/AB6AXuDW3EmF97-GFzGrhnrqGjFsGAr4sL8ORhfn7YuOTjQ4FexKQWEsD6JRaC1W78OYdhmKod5pd9l_dPmsvGFeCB8U4mo6-WJYUaKdVyPpmb8NEZjUlRfXLuStBQYLovDZCafPxrpup8AvhmxPJrDSMLKtD2pDBzHtK60nlNHL6yB0xE3-AVTMemxMo7wYAU3AZiPeq53-eC8U_CAXAVBe3X8g8gOwVeBf3uL32E_qMUqjcIM2_9ZqsGrtaRYjIY2qDRLGP8sc81iEfGU", "Cierre del lote A con alta producción láctea."],
        
        // --- LOTE B ---
        ["#B-201", "Rosa", "Carora", 3.7, 455, "Saludable", 6700, "11 Sep 2023", "Confirmado (3m)", "https://lh3.googleusercontent.com/aida-public/AB6AXuDwWqZ3Kx3XSv00tLgzLRl1uFvfESblhpZWXSfqyWFe3FvoJ6fl9Z8Nm41HUU9kPYt0PCupktRONGl02v690o4UstecWzEATEOuzGaihXjqXHpr1qlK3PcKyBiE2IgyqAz6c1IfzsWwDH26TKG3v8i6Av84BtmwyGn2_VM8NUXYPQr1JO7jIM7LK8lyUMFf17nAAguyl-Ejcjw-lO2NOnGsgU8qZqp8f8GmFJWYR2TPLRhSbgNAdHAKyivnZ6lUOZGymjqaW0AV9A8", "Comienzo del Lote B en óptimas condiciones."],
        ["#B-202", "Hermosa", "Holstein", 4.8, 540, "Saludable", 8900, "16 Sep 2023", "No preñada", "https://lh3.googleusercontent.com/aida-public/AB6AXuBo0x6Srpgv2-bB9Lxgeaiew9ry2dzO5DEtRIMNJM-xeLTFt4iwgpCIU2V2fNUqozfpTUn0xluL0X7ADBFzNNIFRZw5fL_QdsDtqwlqIrXnyGJO_i0L0HptoKZaXgjweJ10Rp-vmqTsO7xHAgtJEGtq7xiee5ukZ5bgAb46kWpb7KEwtT6iLilqFlTfWy7e13kfTqTiNqCykC2DoKJSnGrlnXsHZ-AURS9PhWmBCo8QVqL3zhzKym4O5PrNTpCwuiE9CoiF1fFpNuo", "Estable y sin novedades."],
        ["#B-203", "Diamante", "Brahman", 4.0, 505, "Saludable", 7000, "21 Sep 2023", "Confirmado (2m)", "https://lh3.googleusercontent.com/aida-public/AB6AXuDyoJBk67pMfvNC_TOuqCE0fKENi_YnS8PyuoIZbZzn9-WRIgfhrrIGBV9Qqmz52RbldmJwmWDHMH32NgPw8DM5nDsUbQAiLgwXONDLi3aAUqF6Sj3lGOKVIL1TqA_Bi-0yOrOwHxD78a_R_3NArwCKg6aTBB-6CUys2uX0dQhywQ_3MjavSCf0GkMY2wCn8-O8RoVKaO0EtTLQ4rcfQPHOF4yzJwv4ZxBsb5kseksppsWZVrBmQMapSrXkNaSu5CCMIu6CVE40zT8", "Buen desarrollo corporal."],
        ["#B-204", "Zamurita", "Pardo Suizo", 4.3, 535, "Saludable", 8300, "27 Sep 2023", "No preñada", "https://lh3.googleusercontent.com/aida-public/AB6AXuDW3EmF97-GFzGrhnrqGjFsGAr4sL8ORhfn7YuOTjQ4FexKQWEsD6JRaC1W78OYdhmKod5pd9l_dPmsvGFeCB8U4mo6-WJYUaKdVyPpmb8NEZjUlRfXLuStBQYLovDZCafPxrpup8AvhmxPJrDSMLKtD2pDBzHtK60nlNHL6yB0xE3-AVTMemxMo7wYAU3AZiPeq53-eC8U_CAXAVBe3X8g8gOwVeBf3uL32E_qMUqjcIM2_9ZqsGrtaRYjIY2qDRLGP8sc81iEfGU", "Sin observaciones especiales."],
        ["#B-205", "Gaviota", "Jersey", 3.1, 445, "Saludable", 6200, "02 Oct 2023", "Confirmado (3m)", "https://lh3.googleusercontent.com/aida-public/AB6AXuDwWqZ3Kx3XSv00tLgzLRl1uFvfESblhpZWXSfqyWFe3FvoJ6fl9Z8Nm41HUU9kPYt0PCupktRONGl02v690o4UstecWzEATEOuzGaihXjqXHpr1qlK3PcKyBiE2IgyqAz6c1IfzsWwDH26TKG3v8i6Av84BtmwyGn2_VM8NUXYPQr1JO7jIM7LK8lyUMFf17nAAguyl-Ejcjw-lO2NOnGsgU8qZqp8f8GmFJWYR2TPLRhSbgNAdHAKyivnZ6lUOZGymjqaW0AV9A8", "Comportamiento dócil."],
        ["#B-206", "Lucerito", "Mestiza", 4.5, 485, "Saludable", 7200, "06 Oct 2023", "No preñada", "https://lh3.googleusercontent.com/aida-public/AB6AXuBo0x6Srpgv2-bB9Lxgeaiew9ry2dzO5DEtRIMNJM-xeLTFt4iwgpCIU2V2fNUqozfpTUn0xluL0X7ADBFzNNIFRZw5fL_QdsDtqwlqIrXnyGJO_i0L0HptoKZaXgjweJ10Rp-vmqTsO7xHAgtJEGtq7xiee5ukZ5bgAb46kWpb7KEwtT6iLilqFlTfWy7e13kfTqTiNqCykC2DoKJSnGrlnXsHZ-AURS9PhWmBCo8QVqL3zhzKym4O5PrNTpCwuiE9CoiF1fFpNuo", "Buena adaptación en el grupo B."],
        ["#B-207", "Tormenta", "Carora", 3.6, 450, "Saludable", 6600, "12 Sep 2023", "Confirmado (1m)", "https://lh3.googleusercontent.com/aida-public/AB6AXuDyoJBk67pMfvNC_TOuqCE0fKENi_YnS8PyuoIZbZzn9-WRIgfhrrIGBV9Qqmz52RbldmJwmWDHMH32NgPw8DM5nDsUbQAiLgwXONDLi3aAUqF6Sj3lGOKVIL1TqA_Bi-0yOrOwHxD78a_R_3NArwCKg6aTBB-6CUys2uX0dQhywQ_3MjavSCf0GkMY2wCn8-O8RoVKaO0EtTLQ4rcfQPHOF4yzJwv4ZxBsb5kseksppsWZVrBmQMapSrXkNaSu5CCMIu6CVE40zT8", "Controles sanitarios completos."],
        ["#B-208", "Manea", "Holstein", 5.0, 555, "Saludable", 9000, "18 Sep 2023", "No preñada", "https://lh3.googleusercontent.com/aida-public/AB6AXuDW3EmF97-GFzGrhnrqGjFsGAr4sL8ORhfn7YuOTjQ4FexKQWEsD6JRaC1W78OYdhmKod5pd9l_dPmsvGFeCB8U4mo6-WJYUaKdVyPpmb8NEZjUlRfXLuStBQYLovDZCafPxrpup8AvhmxPJrDSMLKtD2pDBzHtK60nlNHL6yB0xE3-AVTMemxMo7wYAU3AZiPeq53-eC8U_CAXAVBe3X8g8gOwVeBf3uL32E_qMUqjcIM2_9ZqsGrtaRYjIY2qDRLGP8sc81iEfGU", "Estable en su producción."],
        ["#B-209", "Consentida", "Brahman", 4.2, 510, "Saludable", 7300, "24 Sep 2023", "Confirmado (4m)", "https://lh3.googleusercontent.com/aida-public/AB6AXuDwWqZ3Kx3XSv00tLgzLRl1uFvfESblhpZWXSfqyWFe3FvoJ6fl9Z8Nm41HUU9kPYt0PCupktRONGl02v690o4UstecWzEATEOuzGaihXjqXHpr1qlK3PcKyBiE2IgyqAz6c1IfzsWwDH26TKG3v8i6Av84BtmwyGn2_VM8NUXYPQr1JO7jIM7LK8lyUMFf17nAAguyl-Ejcjw-lO2NOnGsgU8qZqp8f8GmFJWYR2TPLRhSbgNAdHAKyivnZ6lUOZGymjqaW0AV9A8", "Sin inconvenientes."],
        ["#B-210", "Altagracia", "Pardo Suizo", 3.8, 515, "Saludable", 7800, "30 Sep 2023", "No preñada", "https://lh3.googleusercontent.com/aida-public/AB6AXuBo0x6Srpgv2-bB9Lxgeaiew9ry2dzO5DEtRIMNJM-xeLTFt4iwgpCIU2V2fNUqozfpTUn0xluL0X7ADBFzNNIFRZw5fL_QdsDtqwlqIrXnyGJO_i0L0HptoKZaXgjweJ10Rp-vmqTsO7xHAgtJEGtq7xiee5ukZ5bgAb46kWpb7KEwtT6iLilqFlTfWy7e13kfTqTiNqCykC2DoKJSnGrlnXsHZ-AURS9PhWmBCo8QVqL3zhzKym4O5PrNTpCwuiE9CoiF1fFpNuo", "Buen ritmo de ordeño."],
        ["#B-211", "Sombra", "Jersey", 3.4, 440, "Saludable", 6100, "04 Oct 2023", "Confirmado (2m)", "https://lh3.googleusercontent.com/aida-public/AB6AXuDyoJBk67pMfvNC_TOuqCE0fKENi_YnS8PyuoIZbZzn9-WRIgfhrrIGBV9Qqmz52RbldmJwmWDHMH32NgPw8DM5nDsUbQAiLgwXONDLi3aAUqF6Sj3lGOKVIL1TqA_Bi-0yOrOwHxD78a_R_3NArwCKg6aTBB-6CUys2uX0dQhywQ_3MjavSCf0GkMY2wCn8-O8RoVKaO0EtTLQ4rcfQPHOF4yzJwv4ZxBsb5kseksppsWZVrBmQMapSrXkNaSu5CCMIu6CVE40zT8", "Salud estable."],
        ["#B-212", "Parda", "Mestiza", 4.4, 475, "Saludable", 7300, "10 Sep 2023", "No preñada", "https://lh3.googleusercontent.com/aida-public/AB6AXuDW3EmF97-GFzGrhnrqGjFsGAr4sL8ORhfn7YuOTjQ4FexKQWEsD6JRaC1W78OYdhmKod5pd9l_dPmsvGFeCB8U4mo6-WJYUaKdVyPpmb8NEZjUlRfXLuStBQYLovDZCafPxrpup8AvhmxPJrDSMLKtD2pDBzHtK60nlNHL6yB0xE3-AVTMemxMo7wYAU3AZiPeq53-eC8U_CAXAVBe3X8g8gOwVeBf3uL32E_qMUqjcIM2_9ZqsGrtaRYjIY2qDRLGP8sc81iEfGU", "Sin observaciones médicas."],
        ["#B-213", "Chiquinquirá", "Carora", 3.9, 470, "Saludable", 7200, "14 Sep 2023", "Confirmado (3m)", "https://lh3.googleusercontent.com/aida-public/AB6AXuDwWqZ3Kx3XSv00tLgzLRl1uFvfESblhpZWXSfqyWFe3FvoJ6fl9Z8Nm41HUU9kPYt0PCupktRONGl02v690o4UstecWzEATEOuzGaihXjqXHpr1qlK3PcKyBiE2IgyqAz6c1IfzsWwDH26TKG3v8i6Av84BtmwyGn2_VM8NUXYPQr1JO7jIM7LK8lyUMFf17nAAguyl-Ejcjw-lO2NOnGsgU8qZqp8f8GmFJWYR2TPLRhSbgNAdHAKyivnZ6lUOZGymjqaW0AV9A8", "Excelente respuesta a la suplementación."],
        ["#B-214", "Lunaria", "Holstein", 4.9, 550, "Saludable", 8800, "19 Sep 2023", "No preñada", "https://lh3.googleusercontent.com/aida-public/AB6AXuBo0x6Srpgv2-bB9Lxgeaiew9ry2dzO5DEtRIMNJM-xeLTFt4iwgpCIU2V2fNUqozfpTUn0xluL0X7ADBFzNNIFRZw5fL_QdsDtqwlqIrXnyGJO_i0L0HptoKZaXgjweJ10Rp-vmqTsO7xHAgtJEGtq7xiee5ukZ5bgAb46kWpb7KEwtT6iLilqFlTfWy7e13kfTqTiNqCykC2DoKJSnGrlnXsHZ-AURS9PhWmBCo8QVqL3zhzKym4O5PrNTpCwuiE9CoiF1fFpNuo", "Producción constante."],
        ["#B-215", "Reliquia", "Brahman", 4.1, 500, "Saludable", 6900, "25 Sep 2023", "Confirmado (1m)", "https://lh3.googleusercontent.com/aida-public/AB6AXuDyoJBk67pMfvNC_TOuqCE0fKENi_YnS8PyuoIZbZzn9-WRIgfhrrIGBV9Qqmz52RbldmJwmWDHMH32NgPw8DM5nDsUbQAiLgwXONDLi3aAUqF6Sj3lGOKVIL1TqA_Bi-0yOrOwHxD78a_R_3NArwCKg6aTBB-6CUys2uX0dQhywQ_3MjavSCf0GkMY2wCn8-O8RoVKaO0EtTLQ4rcfQPHOF4yzJwv4ZxBsb5kseksppsWZVrBmQMapSrXkNaSu5CCMIu6CVE40zT8", "Buen estado físico general."],
        ["#B-216", "Pintada", "Pardo Suizo", 3.8, 520, "Saludable", 7900, "01 Oct 2023", "No preñada", "https://lh3.googleusercontent.com/aida-public/AB6AXuDW3EmF97-GFzGrhnrqGjFsGAr4sL8ORhfn7YuOTjQ4FexKQWEsD6JRaC1W78OYdhmKod5pd9l_dPmsvGFeCB8U4mo6-WJYUaKdVyPpmb8NEZjUlRfXLuStBQYLovDZCafPxrpup8AvhmxPJrDSMLKtD2pDBzHtK60nlNHL6yB0xE3-AVTMemxMo7wYAU3AZiPeq53-eC8U_CAXAVBe3X8g8gOwVeBf3uL32E_qMUqjcIM2_9ZqsGrtaRYjIY2qDRLGP8sc81iEfGU", "Sin anomalías."],
        ["#B-217", "Pavita", "Jersey", 3.2, 425, "Saludable", 5900, "07 Oct 2023", "Confirmado (4m)", "https://lh3.googleusercontent.com/aida-public/AB6AXuDwWqZ3Kx3XSv00tLgzLRl1uFvfESblhpZWXSfqyWFe3FvoJ6fl9Z8Nm41HUU9kPYt0PCupktRONGl02v690o4UstecWzEATEOuzGaihXjqXHpr1qlK3PcKyBiE2IgyqAz6c1IfzsWwDH26TKG3v8i6Av84BtmwyGn2_VM8NUXYPQr1JO7jIM7LK8lyUMFf17nAAguyl-Ejcjw-lO2NOnGsgU8qZqp8f8GmFJWYR2TPLRhSbgNAdHAKyivnZ6lUOZGymjqaW0AV9A8", "Respuesta positiva a planes sanitarios."],
        ["#B-218", "Milagrosa", "Mestiza", 4.6, 490, "Saludable", 7400, "13 Sep 2023", "No preñada", "https://lh3.googleusercontent.com/aida-public/AB6AXuBo0x6Srpgv2-bB9Lxgeaiew9ry2dzO5DEtRIMNJM-xeLTFt4iwgpCIU2V2fNUqozfpTUn0xluL0X7ADBFzNNIFRZw5fL_QdsDtqwlqIrXnyGJO_i0L0HptoKZaXgjweJ10Rp-vmqTsO7xHAgtJEGtq7xiee5ukZ5bgAb46kWpb7KEwtT6iLilqFlTfWy7e13kfTqTiNqCykC2DoKJSnGrlnXsHZ-AURS9PhWmBCo8QVqL3zhzKym4O5PrNTpCwuiE9CoiF1fFpNuo", "Comportamiento normal en corral."],
        ["#B-219", "Zamana", "Carora", 3.5, 455, "Saludable", 6800, "18 Sep 2023", "Confirmado (2m)", "https://lh3.googleusercontent.com/aida-public/AB6AXuDyoJBk67pMfvNC_TOuqCE0fKENi_YnS8PyuoIZbZzn9-WRIgfhrrIGBV9Qqmz52RbldmJwmWDHMH32NgPw8DM5nDsUbQAiLgwXONDLi3aAUqF6Sj3lGOKVIL1TqA_Bi-0yOrOwHxD78a_R_3NArwCKg6aTBB-6CUys2uX0dQhywQ_3MjavSCf0GkMY2wCn8-O8RoVKaO0EtTLQ4rcfQPHOF4yzJwv4ZxBsb5kseksppsWZVrBmQMapSrXkNaSu5CCMIu6CVE40zT8", "Monitoreo veterinario al día."],
        ["#B-220", "Florinda", "Holstein", 5.1, 560, "Saludable", 9200, "23 Sep 2023", "No preñada", "https://lh3.googleusercontent.com/aida-public/AB6AXuDW3EmF97-GFzGrhnrqGjFsGAr4sL8ORhfn7YuOTjQ4FexKQWEsD6JRaC1W78OYdhmKod5pd9l_dPmsvGFeCB8U4mo6-WJYUaKdVyPpmb8NEZjUlRfXLuStBQYLovDZCafPxrpup8AvhmxPJrDSMLKtD2pDBzHtK60nlNHL6yB0xE3-AVTMemxMo7wYAU3AZiPeq53-eC8U_CAXAVBe3X8g8gOwVeBf3uL32E_qMUqjcIM2_9ZqsGrtaRYjIY2qDRLGP8sc81iEfGU", "Cierre exitoso del registro completo del Lote B."]
      ];
      animalsData.forEach(a => db.run(`INSERT INTO animals (id, name, breed, age, weight, status, productionTotal, lastVaccination, pregnancyStatus, image, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, a));

      // Eventos de salud y chequeos adicionales que proporcionaste
      const healthEventsData = [
        ["#B-220", "Vacunación", "Aftosa (Lote: #AFT-2026-05)", "Dra. Mendoza", "15 May 2026"],
        ["#A-102", "Tratamiento", "Mastitis Leve (Cefalexina - 5 días) - Finalizado con éxito", "Dra. Mendoza", "22 Abr 2026"],
        ["#A-102", "Parto", "Cría Hembra (#A-121) - Parto natural, peso cría 38kg", "Dra. Mendoza", "10 Mar 2026"]
      ];
      healthEventsData.forEach(h => db.run(`INSERT INTO healthEvents (animalId, type, details, veterinarian, date) VALUES (?, ?, ?, ?, ?)`, h));

      const checkupsData = [
        ["Vacunación Aftosa", "Lote A", "Urgente", "24 May"],
        ["Control de Mastitis", "Lote B", "Programado", "27 May"],
        ["Chequeo Prenatal", "Vaca ID: #A-102", "Programado", "02 Jun"]
      ];
      checkupsData.forEach(c => db.run(`INSERT INTO checkups (title, target, priority, date) VALUES (?, ?, ?, ?)`, c));

      console.log('Base de datos inicializada exitosamente.');
    }
  });
}

module.exports = db;
