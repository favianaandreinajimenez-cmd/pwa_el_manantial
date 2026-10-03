(function() {
  const defaultDb = {
    users: [
      { id: 1, name: "Francisco Molina", role: "Administrador", status: "Activo", email: "admin@elmanantial.com", password: "admin123", avatar: "FM" },
      { id: 2, name: "Dra. Maria Mendoz", role: "Veterinario", status: "Activo", email: "veterinario@elmanantial.com", password: "vet123", avatar: "VET" },  
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
      },
      {
        date: "2026-05-23",
        animalId: "#A-102",
        name: "Mariposa",
        unitName: "Lote A",
        shift: "Mañana",
        time: "06:08 AM",
        liters: 38.2,
        status: "VERIFICADO"
      },
      {
        date: "2026-05-23",
        animalId: "#A-103",
        name: "Gitana",
        unitName: "Lote A",
        shift: "Mañana",
        time: "06:15 AM",
        liters: 29.0,
        status: "VERIFICADO"
      },
      {
        date: "2026-05-23",
        animalId: "#A-104",
        name: "Estrella",
        unitName: "Lote A",
        shift: "Mañana",
        time: "06:22 AM",
        liters: 33.6,
        status: "VERIFICADO"
      },
      {
        date: "2026-05-23",
        animalId: "#A-105",
        name: "Luna",
        unitName: "Lote A",
        shift: "Mañana",
        time: "06:30 AM",
        liters: 28.4,
        status: "VERIFICADO"
      },
      {
        date: "2026-05-23",
        animalId: "#A-106",
        name: "Paloma",
        unitName: "Lote A",
        shift: "Mañana",
        time: "06:37 AM",
        liters: 31.1,
        status: "VERIFICADO"
      },
      {
        date: "2026-05-23",
        animalId: "#A-107",
        name: "Rosilla",
        unitName: "Lote A",
        shift: "Mañana",
        time: "06:45 AM",
        liters: 30.2,
        status: "VERIFICADO"
      },
      {
        date: "2026-05-23",
        animalId: "#A-108",
        name: "Morena",
        unitName: "Lote A",
        shift: "Mañana",
        time: "06:52 AM",
        liters: 39.5,
        status: "VERIFICADO"
      },
      {
        date: "2026-05-23",
        animalId: "#A-109",
        name: "Margarita",
        unitName: "Lote A",
        shift: "Mañana",
        time: "07:00 AM",
        liters: 31.8,
        status: "VERIFICADO"
      },
      {
        date: "2026-05-23",
        animalId: "#A-110",
        name: "Princesa",
        unitName: "Lote A",
        shift: "Mañana",
        time: "07:07 AM",
        liters: 35.0,
        status: "VERIFICADO"
      },
      {
        date: "2026-05-23",
        animalId: "#A-111",
        name: "Flor",
        unitName: "Lote A",
        shift: "Mañana",
        time: "07:15 AM",
        liters: 27.6,
        status: "VERIFICADO"
      },
      {
        date: "2026-05-23",
        animalId: "#A-112",
        name: "Reina",
        unitName: "Lote A",
        shift: "Mañana",
        time: "07:22 AM",
        liters: 32.4,
        status: "VERIFICADO"
      },
      {
        date: "2026-05-23",
        animalId: "#A-113",
        name: "Bonita",
        unitName: "Lote A",
        shift: "Mañana",
        time: "07:30 AM",
        liters: 31.0,
        status: "VERIFICADO"
      },
      {
        date: "2026-05-23",
        animalId: "#A-114",
        name: "Mora",
        unitName: "Lote A",
        shift: "Mañana",
        time: "07:37 AM",
        liters: 37.9,
        status: "VERIFICADO"
      },
      {
        date: "2026-05-23",
        animalId: "#A-115",
        name: "Canela",
        unitName: "Lote A",
        shift: "Mañana",
        time: "07:45 AM",
        liters: 31.5,
        status: "VERIFICADO"
      },
      {
        date: "2026-05-23",
        animalId: "#A-116",
        name: "Pinta",
        unitName: "Lote A",
        shift: "Mañana",
        time: "07:52 AM",
        liters: 34.2,
        status: "VERIFICADO"
      },
      {
        date: "2026-05-23",
        animalId: "#A-117",
        name: "Negra",
        unitName: "Lote A",
        shift: "Mañana",
        time: "08:00 AM",
        liters: 28.0,
        status: "VERIFICADO"
      },
      {
        date: "2026-05-23",
        animalId: "#A-118",
        name: "Blanca",
        unitName: "Lote A",
        shift: "Mañana",
        time: "08:07 AM",
        liters: 33.1,
        status: "VERIFICADO"
      },
      {
        date: "2026-05-23",
        animalId: "#A-119",
        name: "Perla",
        unitName: "Lote A",
        shift: "Mañana",
        time: "08:15 AM",
        liters: 30.4,
        status: "VERIFICADO"
      },
      {
        date: "2026-05-23",
        animalId: "#A-120",
        name: "Esperanza",
        unitName: "Lote A",
        shift: "Mañana",
        time: "08:22 AM",
        liters: 38.8,
        status: "VERIFICADO"
      },
      // --- LOTE B ---
      {
        date: "2026-05-23",
        animalId: "#B-201",
        name: "Rosa",
        unitName: "Lote B",
        shift: "Mañana",
        time: "08:35 AM",
        liters: 29.8,
        status: "VERIFICADO"
      },
      {
        date: "2026-05-23",
        animalId: "#B-202",
        name: "Hermosa",
        unitName: "Lote B",
        shift: "Mañana",
        time: "08:42 AM",
        liters: 37.1,
        status: "VERIFICADO"
      },
      {
        date: "2026-05-23",
        animalId: "#B-203",
        name: "Diamante",
        unitName: "Lote B",
        shift: "Mañana",
        time: "08:50 AM",
        liters: 31.2,
        status: "VERIFICADO"
      },
      {
        date: "2026-05-23",
        animalId: "#B-204",
        name: "Zamurita",
        unitName: "Lote B",
        shift: "Mañana",
        time: "08:57 AM",
        liters: 34.0,
        status: "VERIFICADO"
      },
      {
        date: "2026-05-23",
        animalId: "#B-205",
        name: "Gaviota",
        unitName: "Lote B",
        shift: "Mañana",
        time: "09:05 AM",
        liters: 28.5,
        status: "VERIFICADO"
      },
      {
        date: "2026-05-23",
        animalId: "#B-206",
        name: "Lucerito",
        unitName: "Lote B",
        shift: "Mañana",
        time: "09:12 AM",
        liters: 32.0,
        status: "VERIFICADO"
      },
      {
        date: "2026-05-23",
        animalId: "#B-207",
        name: "Tormenta",
        unitName: "Lote B",
        shift: "Mañana",
        time: "09:20 AM",
        liters: 29.5,
        status: "VERIFICADO"
      },
      {
        date: "2026-05-23",
        animalId: "#B-208",
        name: "Manea",
        unitName: "Lote B",
        shift: "Mañana",
        time: "09:27 AM",
        liters: 38.0,
        status: "VERIFICADO"
      },
      {
        date: "2026-05-23",
        animalId: "#B-209",
        name: "Consentida",
        unitName: "Lote B",
        shift: "Mañana",
        time: "09:35 AM",
        liters: 32.2,
        status: "VERIFICADO"
      },
      {
        date: "2026-05-23",
        animalId: "#B-210",
        name: "Altagracia",
        unitName: "Lote B",
        shift: "Mañana",
        time: "09:42 AM",
        liters: 34.6,
        status: "VERIFICADO"
      },
      {
        date: "2026-05-23",
        animalId: "#B-211",
        name: "Sombra",
        unitName: "Lote B",
        shift: "Mañana",
        time: "09:50 AM",
        liters: 27.9,
        status: "VERIFICADO"
      },
      {
        date: "2026-05-23",
        animalId: "#B-212",
        name: "Parda",
        unitName: "Lote B",
        shift: "Mañana",
        time: "09:57 AM",
        liters: 32.1,
        status: "VERIFICADO"
      },
      {
        date: "2026-05-23",
        animalId: "#B-213",
        name: "Chiquinquirá",
        unitName: "Lote B",
        shift: "Mañana",
        time: "10:05 AM",
        liters: 31.8,
        status: "VERIFICADO"
      },
      {
        date: "2026-05-23",
        animalId: "#B-214",
        name: "Lunaria",
        unitName: "Lote B",
        shift: "Mañana",
        time: "10:12 AM",
        liters: 36.9,
        status: "VERIFICADO"
      },
      {
        date: "2026-05-23",
        animalId: "#B-215",
        name: "Reliquia",
        unitName: "Lote B",
        shift: "Mañana",
        time: "10:20 AM",
        liters: 30.5,
        status: "VERIFICADO"
      },
      {
        date: "2026-05-23",
        animalId: "#B-216",
        name: "Pintada",
        unitName: "Lote B",
        shift: "Mañana",
        time: "10:27 AM",
        liters: 34.3,
        status: "VERIFICADO"
      },
      {
        date: "2026-05-23",
        animalId: "#B-217",
        name: "Pavita",
        unitName: "Lote B",
        shift: "Mañana",
        time: "10:35 AM",
        liters: 27.8,
        status: "VERIFICADO"
      },
      {
        date: "2026-05-23",
        animalId: "#B-218",
        name: "Milagrosa",
        unitName: "Lote B",
        shift: "Mañana",
        time: "10:42 AM",
        liters: 32.7,
        status: "VERIFICADO"
      },
      {
        date: "2026-05-23",
        animalId: "#B-219",
        name: "Zamana",
        unitName: "Lote B",
        shift: "Mañana",
        time: "10:50 AM",
        liters: 30.1,
        status: "VERIFICADO"
      },
      {
        date: "2026-05-23",
        animalId: "#B-220",
        name: "Florinda",
        unitName: "Lote B",
        shift: "Mañana",
        time: "10:57 AM",
        liters: 38.5,
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
        notes: "Animal muestra excelente recuperación post-parto. Se recomienda mantener suplementación mineral tipo B hasta el próximo ciclo de ordeño. Observar pezón posterior izquierdo por sensibilidad mínima."
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
        notes: "Animal muestra excelente recuperación post-parto. Se recomienda mantener suplementación mineral tipo B hasta el próximo ciclo de ordeño. Observar pezón posterior izquierdo por sensibilidad mínima."
      },
      {
        id: "#A-103",
        name: "Gitana",
        breed: "Brahman",
        age: 3.5,
        weight: 500,
        status: "Bajo Observación",
        productionTotal: 6500,
        lastVaccination: "01 Oct 2023",
        pregnancyStatus: "Confirmado (4m)",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDyoJBk67pMfvNC_TOuqCE0fKENi_YnS8PyuoIZbZzn9-WRIgfhrrIGBV9Qqmz52RbldmJwmWDHMH32NgPw8DM5nDsUbQAiLgwXONDLi3aAUqF6Sj3lGOKVIL1TqA_Bi-0yOrOwHxD78a_R_3NArwCKg6aTBB-6CUys2uX0dQhywQ_3MjavSCf0GkMY2wCn8-O8RoVKaO0EtTLQ4rcfQPHOF4yzJwv4ZxBsb5kseksppsWZVrBmQMapSrXkNaSu5CCMIu6CVE40zT8",
        notes: "Chequeo mensual de gestación y monitoreo de cojera leve."
      },
      {
        id: "#A-104",
        name: "Estrella",
        breed: "Pardo Suizo",
        age: 4.2,
        weight: 530,
        status: "Saludable",
        productionTotal: 8400,
        lastVaccination: "11 Sep 2023",
        pregnancyStatus: "No preñada",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDW3EmF97-GFzGrhnrqGjFsGAr4sL8ORhfn7YuOTjQ4FexKQWEsD6JRaC1W78OYdhmKod5pd9l_dPmsvGFeCB8U4mo6-WJYUaKdVyPpmb8NEZjUlRfXLuStBQYLovDZCafPxrpup8AvhmxPJrDSMLKtD2pDBzHtK60nlNHL6yB0xE3-AVTMemxMo7wYAU3AZiPeq53-eC8U_CAXAVBe3X8g8gOwVeBf3uL32E_qMUqjcIM2_9ZqsGrtaRYjIY2qDRLGP8sc81iEfGU",
        notes: "Comportamiento dócil en sala de ordeño."
      },
      {
        id: "#A-105",
        name: "Luna",
        breed: "Jersey",
        age: 3.0,
        weight: 440,
        status: "Saludable",
        productionTotal: 6100,
        lastVaccination: "19 Sep 2023",
        pregnancyStatus: "Confirmado (1m)",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDwWqZ3Kx3XSv00tLgzLRl1uFvfESblhpZWXSfqyWFe3FvoJ6fl9Z8Nm41HUU9kPYt0PCupktRONGl02v690o4UstecWzEATEOuzGaihXjqXHpr1qlK3PcKyBiE2IgyqAz6c1IfzsWwDH26TKG3v8i6Av84BtmwyGn2_VM8NUXYPQr1JO7jIM7LK8lyUMFf17nAAguyl-Ejcjw-lO2NOnGsgU8qZqp8f8GmFJWYR2TPLRhSbgNAdHAKyivnZ6lUOZGymjqaW0AV9A8",
        notes: "Vaca joven con excelente persistencia."
      },
      {
        id: "#A-106",
        name: "Paloma",
        breed: "Mestiza",
        age: 4.8,
        weight: 490,
        status: "Saludable",
        productionTotal: 7300,
        lastVaccination: "22 Sep 2023",
        pregnancyStatus: "No preñada",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBo0x6Srpgv2-bB9Lxgeaiew9ry2dzO5DEtRIMNJM-xeLTFt4iwgpCIU2V2fNUqozfpTUn0xluL0X7ADBFzNNIFRZw5fL_QdsDtqwlqIrXnyGJO_i0L0HptoKZaXgjweJ10Rp-vmqTsO7xHAgtJEGtq7xiee5ukZ5bgAb46kWpb7KEwtT6iLilqFlTfWy7e13kfTqTiNqCykC2DoKJSnGrlnXsHZ-AURS9PhWmBCo8QVqL3zhzKym4O5PrNTpCwuiE9CoiF1fFpNuo",
        notes: "Adaptada perfectamente al sistema del Lote A."
      },
      {
        id: "#A-107",
        name: "Rosilla",
        breed: "Carora",
        age: 3.8,
        weight: 450,
        status: "Saludable",
        productionTotal: 6800,
        lastVaccination: "05 Sep 2023",
        pregnancyStatus: "Confirmado (3m)",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDyoJBk67pMfvNC_TOuqCE0fKENi_YnS8PyuoIZbZzn9-WRIgfhrrIGBV9Qqmz52RbldmJwmWDHMH32NgPw8DM5nDsUbQAiLgwXONDLi3aAUqF6Sj3lGOKVIL1TqA_Bi-0yOrOwHxD78a_R_3NArwCKg6aTBB-6CUys2uX0dQhywQ_3MjavSCf0GkMY2wCn8-O8RoVKaO0EtTLQ4rcfQPHOF4yzJwv4ZxBsb5kseksppsWZVrBmQMapSrXkNaSu5CCMIu6CVE40zT8",
        notes: "Controles sanitarios al día."
      },
      {
        id: "#A-108",
        name: "Morena",
        breed: "Holstein",
        age: 5.5,
        weight: 570,
        status: "Saludable",
        productionTotal: 9600,
        lastVaccination: "12 Sep 2023",
        pregnancyStatus: "No preñada",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDW3EmF97-GFzGrhnrqGjFsGAr4sL8ORhfn7YuOTjQ4FexKQWEsD6JRaC1W78OYdhmKod5pd9l_dPmsvGFeCB8U4mo6-WJYUaKdVyPpmb8NEZjUlRfXLuStBQYLovDZCafPxrpup8AvhmxPJrDSMLKtD2pDBzHtK60nlNHL6yB0xE3-AVTMemxMo7wYAU3AZiPeq53-eC8U_CAXAVBe3X8g8gOwVeBf3uL32E_qMUqjcIM2_9ZqsGrtaRYjIY2qDRLGP8sc81iEfGU",
        notes: "Buen volumen de producción."
      },
      {
        id: "#A-109",
        name: "Margarita",
        breed: "Brahman",
        age: 4.1,
        weight: 510,
        status: "Saludable",
        productionTotal: 7100,
        lastVaccination: "18 Sep 2023",
        pregnancyStatus: "Confirmado (2m)",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDwWqZ3Kx3XSv00tLgzLRl1uFvfESblhpZWXSfqyWFe3FvoJ6fl9Z8Nm41HUU9kPYt0PCupktRONGl02v690o4UstecWzEATEOuzGaihXjqXHpr1qlK3PcKyBiE2IgyqAz6c1IfzsWwDH26TKG3v8i6Av84BtmwyGn2_VM8NUXYPQr1JO7jIM7LK8lyUMFf17nAAguyl-Ejcjw-lO2NOnGsgU8qZqp8f8GmFJWYR2TPLRhSbgNAdHAKyivnZ6lUOZGymjqaW0AV9A8",
        notes: "Sin observaciones especiales."
      },
      {
        id: "#A-110",
        name: "Princesa",
        breed: "Pardo Suizo",
        age: 3.9,
        weight: 520,
        status: "Saludable",
        productionTotal: 7900,
        lastVaccination: "25 Sep 2023",
        pregnancyStatus: "No preñada",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBo0x6Srpgv2-bB9Lxgeaiew9ry2dzO5DEtRIMNJM-xeLTFt4iwgpCIU2V2fNUqozfpTUn0xluL0X7ADBFzNNIFRZw5fL_QdsDtqwlqIrXnyGJO_i0L0HptoKZaXgjweJ10Rp-vmqTsO7xHAgtJEGtq7xiee5ukZ5bgAb46kWpb7KEwtT6iLilqFlTfWy7e13kfTqTiNqCykC2DoKJSnGrlnXsHZ-AURS9PhWmBCo8QVqL3zhzKym4O5PrNTpCwuiE9CoiF1fFpNuo",
        notes: "Excelente temperamento."
      },
      {
        id: "#A-111",
        name: "Flor",
        breed: "Jersey",
        age: 3.2,
        weight: 430,
        status: "Saludable",
        productionTotal: 5900,
        lastVaccination: "08 Sep 2023",
        pregnancyStatus: "Confirmado (3m)",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDyoJBk67pMfvNC_TOuqCE0fKENi_YnS8PyuoIZbZzn9-WRIgfhrrIGBV9Qqmz52RbldmJwmWDHMH32NgPw8DM5nDsUbQAiLgwXONDLi3aAUqF6Sj3lGOKVIL1TqA_Bi-0yOrOwHxD78a_R_3NArwCKg6aTBB-6CUys2uX0dQhywQ_3MjavSCf0GkMY2wCn8-O8RoVKaO0EtTLQ4rcfQPHOF4yzJwv4ZxBsb5kseksppsWZVrBmQMapSrXkNaSu5CCMIu6CVE40zT8",
        notes: "Leche con alta concentración de sólidos."
      },
      {
        id: "#A-112",
        name: "Reina",
        breed: "Mestiza",
        age: 4.6,
        weight: 480,
        status: "Saludable",
        productionTotal: 7400,
        lastVaccination: "13 Sep 2023",
        pregnancyStatus: "No preñada",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDW3EmF97-GFzGrhnrqGjFsGAr4sL8ORhfn7YuOTjQ4FexKQWEsD6JRaC1W78OYdhmKod5pd9l_dPmsvGFeCB8U4mo6-WJYUaKdVyPpmb8NEZjUlRfXLuStBQYLovDZCafPxrpup8AvhmxPJrDSMLKtD2pDBzHtK60nlNHL6yB0xE3-AVTMemxMo7wYAU3AZiPeq53-eC8U_CAXAVBe3X8g8gOwVeBf3uL32E_qMUqjcIM2_9ZqsGrtaRYjIY2qDRLGP8sc81iEfGU",
        notes: "Estable en los controles de rutina."
      },
      {
        id: "#A-113",
        name: "Bonita",
        breed: "Carora",
        age: 3.5,
        weight: 465,
        status: "Saludable",
        productionTotal: 7100,
        lastVaccination: "17 Sep 2023",
        pregnancyStatus: "Confirmado (5m)",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDwWqZ3Kx3XSv00tLgzLRl1uFvfESblhpZWXSfqyWFe3FvoJ6fl9Z8Nm41HUU9kPYt0PCupktRONGl02v690o4UstecWzEATEOuzGaihXjqXHpr1qlK3PcKyBiE2IgyqAz6c1IfzsWwDH26TKG3v8i6Av84BtmwyGn2_VM8NUXYPQr1JO7jIM7LK8lyUMFf17nAAguyl-Ejcjw-lO2NOnGsgU8qZqp8f8GmFJWYR2TPLRhSbgNAdHAKyivnZ6lUOZGymjqaW0AV9A8",
        notes: "Sin problemas sanitarios."
      },
      {
        id: "#A-114",
        name: "Mora",
        breed: "Holstein",
        age: 5.1,
        weight: 560,
        status: "Saludable",
        productionTotal: 9100,
        lastVaccination: "21 Sep 2023",
        pregnancyStatus: "No preñada",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBo0x6Srpgv2-bB9Lxgeaiew9ry2dzO5DEtRIMNJM-xeLTFt4iwgpCIU2V2fNUqozfpTUn0xluL0X7ADBFzNNIFRZw5fL_QdsDtqwlqIrXnyGJO_i0L0HptoKZaXgjweJ10Rp-vmqTsO7xHAgtJEGtq7xiee5ukZ5bgAb46kWpb7KEwtT6iLilqFlTfWy7e13kfTqTiNqCykC2DoKJSnGrlnXsHZ-AURS9PhWmBCo8QVqL3zhzKym4O5PrNTpCwuiE9CoiF1fFpNuo",
        notes: "Buen rendimiento."
      },
      {
        id: "#A-115",
        name: "Canela",
        breed: "Brahman",
        age: 4.3,
        weight: 515,
        status: "Saludable",
        productionTotal: 7200,
        lastVaccination: "29 Sep 2023",
        pregnancyStatus: "Confirmado (2m)",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDyoJBk67pMfvNC_TOuqCE0fKENi_YnS8PyuoIZbZzn9-WRIgfhrrIGBV9Qqmz52RbldmJwmWDHMH32NgPw8DM5nDsUbQAiLgwXONDLi3aAUqF6Sj3lGOKVIL1TqA_Bi-0yOrOwHxD78a_R_3NArwCKg6aTBB-6CUys2uX0dQhywQ_3MjavSCf0GkMY2wCn8-O8RoVKaO0EtTLQ4rcfQPHOF4yzJwv4ZxBsb5kseksppsWZVrBmQMapSrXkNaSu5CCMIu6CVE40zT8",
        notes: "Monitoreo periódico."
      },
      {
        id: "#A-116",
        name: "Pinta",
        breed: "Pardo Suizo",
        age: 4.0,
        weight: 525,
        status: "Saludable",
        productionTotal: 8100,
        lastVaccination: "03 Oct 2023",
        pregnancyStatus: "No preñada",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDW3EmF97-GFzGrhnrqGjFsGAr4sL8ORhfn7YuOTjQ4FexKQWEsD6JRaC1W78OYdhmKod5pd9l_dPmsvGFeCB8U4mo6-WJYUaKdVyPpmb8NEZjUlRfXLuStBQYLovDZCafPxrpup8AvhmxPJrDSMLKtD2pDBzHtK60nlNHL6yB0xE3-AVTMemxMo7wYAU3AZiPeq53-eC8U_CAXAVBe3X8g8gOwVeBf3uL32E_qMUqjcIM2_9ZqsGrtaRYjIY2qDRLGP8sc81iEfGU",
        notes: "Comportamiento normal."
      },
      {
        id: "#A-117",
        name: "Negrita",
        breed: "Jersey",
        age: 3.3,
        weight: 435,
        status: "Saludable",
        productionTotal: 6000,
        lastVaccination: "09 Sep 2023",
        pregnancyStatus: "Confirmado (4m)",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDwWqZ3Kx3XSv00tLgzLRl1uFvfESblhpZWXSfqyWFe3FvoJ6fl9Z8Nm41HUU9kPYt0PCupktRONGl02v690o4UstecWzEATEOuzGaihXjqXHpr1qlK3PcKyBiE2IgyqAz6c1IfzsWwDH26TKG3v8i6Av84BtmwyGn2_VM8NUXYPQr1JO7jIM7LK8lyUMFf17nAAguyl-Ejcjw-lO2NOnGsgU8qZqp8f8GmFJWYR2TPLRhSbgNAdHAKyivnZ6lUOZGymjqaW0AV9A8",
        notes: "Sin incidencias."
      },
      {
        id: "#A-118",
        name: "Blanca",
        breed: "Mestiza",
        age: 4.7,
        weight: 495,
        status: "Saludable",
        productionTotal: 7500,
        lastVaccination: "15 Sep 2023",
        pregnancyStatus: "No preñada",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBo0x6Srpgv2-bB9Lxgeaiew9ry2dzO5DEtRIMNJM-xeLTFt4iwgpCIU2V2fNUqozfpTUn0xluL0X7ADBFzNNIFRZw5fL_QdsDtqwlqIrXnyGJO_i0L0HptoKZaXgjweJ10Rp-vmqTsO7xHAgtJEGtq7xiee5ukZ5bgAb46kWpb7KEwtT6iLilqFlTfWy7e13kfTqTiNqCykC2DoKJSnGrlnXsHZ-AURS9PhWmBCo8QVqL3zhzKym4O5PrNTpCwuiE9CoiF1fFpNuo",
        notes: "Salud general excelente."
      },
      {
        id: "#A-119",
        name: "Perla",
        breed: "Carora",
        age: 3.6,
        weight: 460,
        status: "Saludable",
        productionTotal: 6900,
        lastVaccination: "20 Sep 2023",
        pregnancyStatus: "Confirmado (1m)",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDyoJBk67pMfvNC_TOuqCE0fKENi_YnS8PyuoIZbZzn9-WRIgfhrrIGBV9Qqmz52RbldmJwmWDHMH32NgPw8DM5nDsUbQAiLgwXONDLi3aAUqF6Sj3lGOKVIL1TqA_Bi-0yOrOwHxD78a_R_3NArwCKg6aTBB-6CUys2uX0dQhywQ_3MjavSCf0GkMY2wCn8-O8RoVKaO0EtTLQ4rcfQPHOF4yzJwv4ZxBsb5kseksppsWZVrBmQMapSrXkNaSu5CCMIu6CVE40zT8",
        notes: "Desarrollo óptimo."
      },
      {
        id: "#A-120",
        name: "Esperanza",
        breed: "Holstein",
        age: 5.2,
        weight: 565,
        status: "Saludable",
        productionTotal: 9400,
        lastVaccination: "26 Sep 2023",
        pregnancyStatus: "No preñada",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDW3EmF97-GFzGrhnrqGjFsGAr4sL8ORhfn7YuOTjQ4FexKQWEsD6JRaC1W78OYdhmKod5pd9l_dPmsvGFeCB8U4mo6-WJYUaKdVyPpmb8NEZjUlRfXLuStBQYLovDZCafPxrpup8AvhmxPJrDSMLKtD2pDBzHtK60nlNHL6yB0xE3-AVTMemxMo7wYAU3AZiPeq53-eC8U_CAXAVBe3X8g8gOwVeBf3uL32E_qMUqjcIM2_9ZqsGrtaRYjIY2qDRLGP8sc81iEfGU",
        notes: "Cierre del lote A con alta producción láctea."
      },
      // --- LOTE B ---
      {
        id: "#B-201",
        name: "Rosa",
        breed: "Carora",
        age: 3.7,
        weight: 455,
        status: "Saludable",
        productionTotal: 6700,
        lastVaccination: "11 Sep 2023",
        pregnancyStatus: "Confirmado (3m)",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDwWqZ3Kx3XSv00tLgzLRl1uFvfESblhpZWXSfqyWFe3FvoJ6fl9Z8Nm41HUU9kPYt0PCupktRONGl02v690o4UstecWzEATEOuzGaihXjqXHpr1qlK3PcKyBiE2IgyqAz6c1IfzsWwDH26TKG3v8i6Av84BtmwyGn2_VM8NUXYPQr1JO7jIM7LK8lyUMFf17nAAguyl-Ejcjw-lO2NOnGsgU8qZqp8f8GmFJWYR2TPLRhSbgNAdHAKyivnZ6lUOZGymjqaW0AV9A8",
        notes: "Comienzo del Lote B en óptimas condiciones."
      },
      {
        id: "#B-202",
        name: "Hermosa",
        breed: "Holstein",
        age: 4.8,
        weight: 540,
        status: "Saludable",
        productionTotal: 8900,
        lastVaccination: "16 Sep 2023",
        pregnancyStatus: "No preñada",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBo0x6Srpgv2-bB9Lxgeaiew9ry2dzO5DEtRIMNJM-xeLTFt4iwgpCIU2V2fNUqozfpTUn0xluL0X7ADBFzNNIFRZw5fL_QdsDtqwlqIrXnyGJO_i0L0HptoKZaXgjweJ10Rp-vmqTsO7xHAgtJEGtq7xiee5ukZ5bgAb46kWpb7KEwtT6iLilqFlTfWy7e13kfTqTiNqCykC2DoKJSnGrlnXsHZ-AURS9PhWmBCo8QVqL3zhzKym4O5PrNTpCwuiE9CoiF1fFpNuo",
        notes: "Estable y sin novedades."
      },
      {
        id: "#B-203",
        name: "Diamante",
        breed: "Brahman",
        age: 4.0,
        weight: 505,
        status: "Saludable",
        productionTotal: 7000,
        lastVaccination: "21 Sep 2023",
        pregnancyStatus: "Confirmado (2m)",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDyoJBk67pMfvNC_TOuqCE0fKENi_YnS8PyuoIZbZzn9-WRIgfhrrIGBV9Qqmz52RbldmJwmWDHMH32NgPw8DM5nDsUbQAiLgwXONDLi3aAUqF6Sj3lGOKVIL1TqA_Bi-0yOrOwHxD78a_R_3NArwCKg6aTBB-6CUys2uX0dQhywQ_3MjavSCf0GkMY2wCn8-O8RoVKaO0EtTLQ4rcfQPHOF4yzJwv4ZxBsb5kseksppsWZVrBmQMapSrXkNaSu5CCMIu6CVE40zT8",
        notes: "Buen desarrollo corporal."
      },
      {
        id: "#B-204",
        name: "Zamurita",
        breed: "Pardo Suizo",
        age: 4.3,
        weight: 535,
        status: "Saludable",
        productionTotal: 8300,
        lastVaccination: "27 Sep 2023",
        pregnancyStatus: "No preñada",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDW3EmF97-GFzGrhnrqGjFsGAr4sL8ORhfn7YuOTjQ4FexKQWEsD6JRaC1W78OYdhmKod5pd9l_dPmsvGFeCB8U4mo6-WJYUaKdVyPpmb8NEZjUlRfXLuStBQYLovDZCafPxrpup8AvhmxPJrDSMLKtD2pDBzHtK60nlNHL6yB0xE3-AVTMemxMo7wYAU3AZiPeq53-eC8U_CAXAVBe3X8g8gOwVeBf3uL32E_qMUqjcIM2_9ZqsGrtaRYjIY2qDRLGP8sc81iEfGU",
        notes: "Sin observaciones especiales."
      },
      {
        id: "#B-205",
        name: "Gaviota",
        breed: "Jersey",
        age: 3.1,
        weight: 445,
        status: "Saludable",
        productionTotal: 6200,
        lastVaccination: "02 Oct 2023",
        pregnancyStatus: "Confirmado (3m)",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDwWqZ3Kx3XSv00tLgzLRl1uFvfESblhpZWXSfqyWFe3FvoJ6fl9Z8Nm41HUU9kPYt0PCupktRONGl02v690o4UstecWzEATEOuzGaihXjqXHpr1qlK3PcKyBiE2IgyqAz6c1IfzsWwDH26TKG3v8i6Av84BtmwyGn2_VM8NUXYPQr1JO7jIM7LK8lyUMFf17nAAguyl-Ejcjw-lO2NOnGsgU8qZqp8f8GmFJWYR2TPLRhSbgNAdHAKyivnZ6lUOZGymjqaW0AV9A8",
        notes: "Comportamiento dócil."
      },
      {
        id: "#B-206",
        name: "Lucerito",
        breed: "Mestiza",
        age: 4.5,
        weight: 485,
        status: "Saludable",
        productionTotal: 7200,
        lastVaccination: "06 Oct 2023",
        pregnancyStatus: "No preñada",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBo0x6Srpgv2-bB9Lxgeaiew9ry2dzO5DEtRIMNJM-xeLTFt4iwgpCIU2V2fNUqozfpTUn0xluL0X7ADBFzNNIFRZw5fL_QdsDtqwlqIrXnyGJO_i0L0HptoKZaXgjweJ10Rp-vmqTsO7xHAgtJEGtq7xiee5ukZ5bgAb46kWpb7KEwtT6iLilqFlTfWy7e13kfTqTiNqCykC2DoKJSnGrlnXsHZ-AURS9PhWmBCo8QVqL3zhzKym4O5PrNTpCwuiE9CoiF1fFpNuo",
        notes: "Buena adaptación en el grupo B."
      },
      {
        id: "#B-207",
        name: "Tormenta",
        breed: "Carora",
        age: 3.6,
        weight: 450,
        status: "Saludable",
        productionTotal: 6600,
        lastVaccination: "12 Sep 2023",
        pregnancyStatus: "Confirmado (1m)",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDyoJBk67pMfvNC_TOuqCE0fKENi_YnS8PyuoIZbZzn9-WRIgfhrrIGBV9Qqmz52RbldmJwmWDHMH32NgPw8DM5nDsUbQAiLgwXONDLi3aAUqF6Sj3lGOKVIL1TqA_Bi-0yOrOwHxD78a_R_3NArwCKg6aTBB-6CUys2uX0dQhywQ_3MjavSCf0GkMY2wCn8-O8RoVKaO0EtTLQ4rcfQPHOF4yzJwv4ZxBsb5kseksppsWZVrBmQMapSrXkNaSu5CCMIu6CVE40zT8",
        notes: "Controles sanitarios completos."
      },
      {
        id: "#B-208",
        name: "Manea",
        breed: "Holstein",
        age: 5.0,
        weight: 555,
        status: "Saludable",
        productionTotal: 9000,
        lastVaccination: "18 Sep 2023",
        pregnancyStatus: "No preñada",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDW3EmF97-GFzGrhnrqGjFsGAr4sL8ORhfn7YuOTjQ4FexKQWEsD6JRaC1W78OYdhmKod5pd9l_dPmsvGFeCB8U4mo6-WJYUaKdVyPpmb8NEZjUlRfXLuStBQYLovDZCafPxrpup8AvhmxPJrDSMLKtD2pDBzHtK60nlNHL6yB0xE3-AVTMemxMo7wYAU3AZiPeq53-eC8U_CAXAVBe3X8g8gOwVeBf3uL32E_qMUqjcIM2_9ZqsGrtaRYjIY2qDRLGP8sc81iEfGU",
        notes: "Estable en su producción."
      },
      {
        id: "#B-209",
        name: "Consentida",
        breed: "Brahman",
        age: 4.2,
        weight: 510,
        status: "Saludable",
        productionTotal: 7300,
        lastVaccination: "24 Sep 2023",
        pregnancyStatus: "Confirmado (4m)",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDwWqZ3Kx3XSv00tLgzLRl1uFvfESblhpZWXSfqyWFe3FvoJ6fl9Z8Nm41HUU9kPYt0PCupktRONGl02v690o4UstecWzEATEOuzGaihXjqXHpr1qlK3PcKyBiE2IgyqAz6c1IfzsWwDH26TKG3v8i6Av84BtmwyGn2_VM8NUXYPQr1JO7jIM7LK8lyUMFf17nAAguyl-Ejcjw-lO2NOnGsgU8qZqp8f8GmFJWYR2TPLRhSbgNAdHAKyivnZ6lUOZGymjqaW0AV9A8",
        notes: "Sin inconvenientes."
      },
      {
        id: "#B-210",
        name: "Altagracia",
        breed: "Pardo Suizo",
        age: 3.8,
        weight: 515,
        status: "Saludable",
        productionTotal: 7800,
        lastVaccination: "30 Sep 2023",
        pregnancyStatus: "No preñada",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBo0x6Srpgv2-bB9Lxgeaiew9ry2dzO5DEtRIMNJM-xeLTFt4iwgpCIU2V2fNUqozfpTUn0xluL0X7ADBFzNNIFRZw5fL_QdsDtqwlqIrXnyGJO_i0L0HptoKZaXgjweJ10Rp-vmqTsO7xHAgtJEGtq7xiee5ukZ5bgAb46kWpb7KEwtT6iLilqFlTfWy7e13kfTqTiNqCykC2DoKJSnGrlnXsHZ-AURS9PhWmBCo8QVqL3zhzKym4O5PrNTpCwuiE9CoiF1fFpNuo",
        notes: "Buen ritmo de ordeño."
      },
      {
        id: "#B-211",
        name: "Sombra",
        breed: "Jersey",
        age: 3.4,
        weight: 440,
        status: "Saludable",
        productionTotal: 6100,
        lastVaccination: "04 Oct 2023",
        pregnancyStatus: "Confirmado (2m)",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDyoJBk67pMfvNC_TOuqCE0fKENi_YnS8PyuoIZbZzn9-WRIgfhrrIGBV9Qqmz52RbldmJwmWDHMH32NgPw8DM5nDsUbQAiLgwXONDLi3aAUqF6Sj3lGOKVIL1TqA_Bi-0yOrOwHxD78a_R_3NArwCKg6aTBB-6CUys2uX0dQhywQ_3MjavSCf0GkMY2wCn8-O8RoVKaO0EtTLQ4rcfQPHOF4yzJwv4ZxBsb5kseksppsWZVrBmQMapSrXkNaSu5CCMIu6CVE40zT8",
        notes: "Salud estable."
      },
      {
        id: "#B-212",
        name: "Parda",
        breed: "Mestiza",
        age: 4.4,
        weight: 475,
        status: "Saludable",
        productionTotal: 7300,
        lastVaccination: "10 Sep 2023",
        pregnancyStatus: "No preñada",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDW3EmF97-GFzGrhnrqGjFsGAr4sL8ORhfn7YuOTjQ4FexKQWEsD6JRaC1W78OYdhmKod5pd9l_dPmsvGFeCB8U4mo6-WJYUaKdVyPpmb8NEZjUlRfXLuStBQYLovDZCafPxrpup8AvhmxPJrDSMLKtD2pDBzHtK60nlNHL6yB0xE3-AVTMemxMo7wYAU3AZiPeq53-eC8U_CAXAVBe3X8g8gOwVeBf3uL32E_qMUqjcIM2_9ZqsGrtaRYjIY2qDRLGP8sc81iEfGU",
        notes: "Sin observaciones médicas."
      },
      {
        id: "#B-213",
        name: "Chiquinquirá",
        breed: "Carora",
        age: 3.9,
        weight: 470,
        status: "Saludable",
        productionTotal: 7200,
        lastVaccination: "14 Sep 2023",
        pregnancyStatus: "Confirmado (3m)",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDwWqZ3Kx3XSv00tLgzLRl1uFvfESblhpZWXSfqyWFe3FvoJ6fl9Z8Nm41HUU9kPYt0PCupktRONGl02v690o4UstecWzEATEOuzGaihXjqXHpr1qlK3PcKyBiE2IgyqAz6c1IfzsWwDH26TKG3v8i6Av84BtmwyGn2_VM8NUXYPQr1JO7jIM7LK8lyUMFf17nAAguyl-Ejcjw-lO2NOnGsgU8qZqp8f8GmFJWYR2TPLRhSbgNAdHAKyivnZ6lUOZGymjqaW0AV9A8",
        notes: "Excelente respuesta a la suplementación."
      },
      {
        id: "#B-214",
        name: "Lunaria",
        breed: "Holstein",
        age: 4.9,
        weight: 550,
        status: "Saludable",
        productionTotal: 8800,
        lastVaccination: "19 Sep 2023",
        pregnancyStatus: "No preñada",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBo0x6Srpgv2-bB9Lxgeaiew9ry2dzO5DEtRIMNJM-xeLTFt4iwgpCIU2V2fNUqozfpTUn0xluL0X7ADBFzNNIFRZw5fL_QdsDtqwlqIrXnyGJO_i0L0HptoKZaXgjweJ10Rp-vmqTsO7xHAgtJEGtq7xiee5ukZ5bgAb46kWpb7KEwtT6iLilqFlTfWy7e13kfTqTiNqCykC2DoKJSnGrlnXsHZ-AURS9PhWmBCo8QVqL3zhzKym4O5PrNTpCwuiE9CoiF1fFpNuo",
        notes: "Producción constante."
      },
      {
        id: "#B-215",
        name: "Reliquia",
        breed: "Brahman",
        age: 4.1,
        weight: 500,
        status: "Saludable",
        productionTotal: 6900,
        lastVaccination: "25 Sep 2023",
        pregnancyStatus: "Confirmado (1m)",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDyoJBk67pMfvNC_TOuqCE0fKENi_YnS8PyuoIZbZzn9-WRIgfhrrIGBV9Qqmz52RbldmJwmWDHMH32NgPw8DM5nDsUbQAiLgwXONDLi3aAUqF6Sj3lGOKVIL1TqA_Bi-0yOrOwHxD78a_R_3NArwCKg6aTBB-6CUys2uX0dQhywQ_3MjavSCf0GkMY2wCn8-O8RoVKaO0EtTLQ4rcfQPHOF4yzJwv4ZxBsb5kseksppsWZVrBmQMapSrXkNaSu5CCMIu6CVE40zT8",
        notes: "Buen estado físico general."
      },
      {
        id: "#B-216",
        name: "Pintada",
        breed: "Pardo Suizo",
        age: 3.8,
        weight: 520,
        status: "Saludable",
        productionTotal: 7900,
        lastVaccination: "01 Oct 2023",
        pregnancyStatus: "No preñada",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDW3EmF97-GFzGrhnrqGjFsGAr4sL8ORhfn7YuOTjQ4FexKQWEsD6JRaC1W78OYdhmKod5pd9l_dPmsvGFeCB8U4mo6-WJYUaKdVyPpmb8NEZjUlRfXLuStBQYLovDZCafPxrpup8AvhmxPJrDSMLKtD2pDBzHtK60nlNHL6yB0xE3-AVTMemxMo7wYAU3AZiPeq53-eC8U_CAXAVBe3X8g8gOwVeBf3uL32E_qMUqjcIM2_9ZqsGrtaRYjIY2qDRLGP8sc81iEfGU",
        notes: "Sin anomalías."
      },
      {
        id: "#B-217",
        name: "Pavita",
        breed: "Jersey",
        age: 3.2,
        weight: 425,
        status: "Saludable",
        productionTotal: 5900,
        lastVaccination: "07 Oct 2023",
        pregnancyStatus: "Confirmado (4m)",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDwWqZ3Kx3XSv00tLgzLRl1uFvfESblhpZWXSfqyWFe3FvoJ6fl9Z8Nm41HUU9kPYt0PCupktRONGl02v690o4UstecWzEATEOuzGaihXjqXHpr1qlK3PcKyBiE2IgyqAz6c1IfzsWwDH26TKG3v8i6Av84BtmwyGn2_VM8NUXYPQr1JO7jIM7LK8lyUMFf17nAAguyl-Ejcjw-lO2NOnGsgU8qZqp8f8GmFJWYR2TPLRhSbgNAdHAKyivnZ6lUOZGymjqaW0AV9A8",
        notes: "Respuesta positiva a planes sanitarios."
      },
      {
        id: "#B-218",
        name: "Milagrosa",
        breed: "Mestiza",
        age: 4.6,
        weight: 490,
        status: "Saludable",
        productionTotal: 7400,
        lastVaccination: "13 Sep 2023",
        pregnancyStatus: "No preñada",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBo0x6Srpgv2-bB9Lxgeaiew9ry2dzO5DEtRIMNJM-xeLTFt4iwgpCIU2V2fNUqozfpTUn0xluL0X7ADBFzNNIFRZw5fL_QdsDtqwlqIrXnyGJO_i0L0HptoKZaXgjweJ10Rp-vmqTsO7xHAgtJEGtq7xiee5ukZ5bgAb46kWpb7KEwtT6iLilqFlTfWy7e13kfTqTiNqCykC2DoKJSnGrlnXsHZ-AURS9PhWmBCo8QVqL3zhzKym4O5PrNTpCwuiE9CoiF1fFpNuo",
        notes: "Comportamiento normal en corral."
      },
      {
        id: "#B-219",
        name: "Zamana",
        breed: "Carora",
        age: 3.5,
        weight: 455,
        status: "Saludable",
        productionTotal: 6800,
        lastVaccination: "18 Sep 2023",
        pregnancyStatus: "Confirmado (2m)",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDyoJBk67pMfvNC_TOuqCE0fKENi_YnS8PyuoIZbZzn9-WRIgfhrrIGBV9Qqmz52RbldmJwmWDHMH32NgPw8DM5nDsUbQAiLgwXONDLi3aAUqF6Sj3lGOKVIL1TqA_Bi-0yOrOwHxD78a_R_3NArwCKg6aTBB-6CUys2uX0dQhywQ_3MjavSCf0GkMY2wCn8-O8RoVKaO0EtTLQ4rcfQPHOF4yzJwv4ZxBsb5kseksppsWZVrBmQMapSrXkNaSu5CCMIu6CVE40zT8",
        notes: "Monitoreo veterinario al día."
      },
      {
        id: "#B-220",
        name: "Florinda",
        breed: "Holstein",
        age: 5.1,
        weight: 560,
        status: "Saludable",
        productionTotal: 9200,
        lastVaccination: "23 Sep 2023",
        pregnancyStatus: "No preñada",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDW3EmF97-GFzGrhnrqGjFsGAr4sL8ORhfn7YuOTjQ4FexKQWEsD6JRaC1W78OYdhmKod5pd9l_dPmsvGFeCB8U4mo6-WJYUaKdVyPpmb8NEZjUlRfXLuStBQYLovDZCafPxrpup8AvhmxPJrDSMLKtD2pDBzHtK60nlNHL6yB0xE3-AVTMemxMo7wYAU3AZiPeq53-eC8U_CAXAVBe3X8g8gOwVeBf3uL32E_qMUqjcIM2_9ZqsGrtaRYjIY2qDRLGP8sc81iEfGU",
        notes: "Cierre exitoso del registro completo del Lote B."
      }
    ],
    healthEvents: [
      {
        id: 1,
        animalId: "#B-220",
        type: "Vacunación",
        details: "Aftosa (Lote: #AFT-2026-05)",
        veterinarian: "Dra. Mendoza",
        date: "15 May 2026"
      },
      {
        id: 2,
        animalId: "#A-102",
        type: "Tratamiento",
        details: "Mastitis Leve (Cefalexina - 5 días) - Finalizado con éxito",
        veterinarian: "Dra. Mendoza",
        date: "22 Abr 2026"
      },
      {
        id: 3,
        animalId: "#A-102",
        type: "Parto",
        details: "Cría Hembra (#A-121) - Parto natural, peso cría 38kg",
        veterinarian: "Dra. Mendoza",
        date: "10 Mar 2026"
      }
    ],
    checkups: [
      {
        id: 1,
        title: "Vacunación Aftosa",
        target: "Lote A",
        priority: "Urgente",
        date: "24 May"
      },
      {
        id: 2,
        title: "Control de Mastitis",
        target: "Lote B",
        priority: "Programado",
        date: "27 May"
      },
      {
        id: 3,
        title: "Chequeo Prenatal",
        target: "Vaca ID: #A-102",
        priority: "Programado",
        date: "02 Jun"
      }
    ]
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
              // Lógica automatizada opcional para el estado según el stock
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
})();

  console.info("Local DB Fallback initialized successfully.");
})();
  function writeLocalDb(db) {
    localStorage.setItem('elmanantial_local_db', JSON.stringify(db));
  }
