/**
 * Motor de Base de Datos SQLite (WASM) para Finca El Manantial (Modo Offline-First)
 */
let db = null;
let SQL = null;

async function initSqlDatabase() {
    if (db) return db;

    try {
        // 1. Cargar la librería sql.js desde el CDN con soporte WASM
        SQL = await initSqlJs({
            locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/${file}`
        });

        // 2. Intentar recuperar la base de datos guardada previamente en el navegador (IndexedDB)
        const savedDbBytes = await loadDbFromIndexedDB();

        if (savedDbBytes) {
            db = new SQL.Database(savedDbBytes);
            console.log("Base de datos SQLite cargada exitosamente desde el almacenamiento local.");
        } else {
            // Si no existe ninguna copia previa, creamos una nueva base de datos y sus tablas
            db = new SQL.Database();
            crearEsquemaTablas();
            console.log("Nueva base de datos SQLite creada para Finca El Manantial.");
        }
        return db;
    } catch (error) {
        console.error("Error al inicializar SQLite WASM:", error);
        return null;
    }
}

/**
 * Define las tablas relacionales idénticas al backend para mantener consistencia total
 */
function crearEsquemaTablas() {
    const queries = `
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            role TEXT NOT NULL,
            status TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            avatar TEXT NOT NULL,
            sincronizado INTEGER DEFAULT 1
        );

        CREATE TABLE IF NOT EXISTS inventory (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            category TEXT NOT NULL,
            stock REAL NOT NULL,
            unit TEXT NOT NULL,
            status TEXT NOT NULL,
            sincronizado INTEGER DEFAULT 0
        );

        CREATE TABLE IF NOT EXISTS units (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            owner TEXT NOT NULL,
            animalCount INTEGER NOT NULL,
            productionToday REAL NOT NULL,
            healthAvg TEXT NOT NULL,
            status TEXT NOT NULL,
            image TEXT NOT NULL,
            sincronizado INTEGER DEFAULT 0
        );

        CREATE TABLE IF NOT EXISTS milkingRecords (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            unitName TEXT NOT NULL,
            liters REAL NOT NULL,
            shift TEXT NOT NULL,
            time TEXT NOT NULL,
            status TEXT NOT NULL,
            date TEXT NOT NULL,
            sincronizado INTEGER DEFAULT 0
        );

        CREATE TABLE IF NOT EXISTS animals (
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
            notes TEXT,
            sincronizado INTEGER DEFAULT 0
        );

        CREATE TABLE IF NOT EXISTS healthEvents (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            animalId TEXT NOT NULL,
            type TEXT NOT NULL,
            details TEXT NOT NULL,
            veterinarian TEXT NOT NULL,
            date TEXT NOT NULL,
            sincronizado INTEGER DEFAULT 0
        );

        CREATE TABLE IF NOT EXISTS checkups (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            target TEXT NOT NULL,
            priority TEXT NOT NULL,
            date TEXT NOT NULL,
            sincronizado INTEGER DEFAULT 0
        );

        -- Insertar usuarios por defecto idénticos a los del servidor
        INSERT OR IGNORE INTO users (id, name, role, status, email, password, avatar) VALUES 
        (1, 'Francisco Molina', 'Administrador', 'Activo', 'admin@elmanantial.com', 'admin123', 'ADMIN'),
        (2, 'Dra. Maria Mendoza', 'Veterinario', 'Activo', 'veterinario@elmanantial.com', 'vet123', 'VET'),
        (3, 'Jose Sanchez', 'Operario', 'Activo', 'jose@elmanantial.com', 'ope123', 'JS');
    `;
    db.run(queries);
    persistirEnIndexedDB();
}

/**
 * Guarda una copia binaria exacta de la base de datos SQLite en IndexedDB para persistencia offline
 */
function persistirEnIndexedDB() {
    if (!db) return;
    const data = db.export();
    const request = indexedDB.open("ElManantialSQLiteDB", 1);

    request.onupgradeneeded = e => {
        const conn = e.target.result;
        if (!conn.objectStoreNames.contains("storage")) {
            conn.createObjectStore("storage");
        }
    };

    request.onsuccess = e => {
        const conn = e.target.result;
        const tx = conn.transaction("storage", "readwrite");
        tx.objectStore("storage").put(data, "sqlite_file");
    };
}

/**
 * Carga el archivo binario de SQLite desde IndexedDB
 */
function loadDbFromIndexedDB() {
    return new Promise(resolve => {
        const request = indexedDB.open("ElManantialSQLiteDB", 1);
        request.onerror = () => resolve(null);
        request.onsuccess = e => {
            const conn = e.target.result;
            if (!conn.objectStoreNames.contains("storage")) {
                resolve(null);
                return;
            }
            const tx = conn.transaction("storage", "readonly");
            const req = tx.objectStore("storage").get("sqlite_file");
            req.onsuccess = () => resolve(req.result);
            req.onerror = () => resolve(null);
        };
    });
}

/**
 * Función genérica para ejecutar consultas de escritura (INSERT, UPDATE, DELETE) y respaldar cambios
 */
async function ejecutarSQL(query, params = []) {
    const database = await initSqlDatabase();
    if (!database) return null;
    
    try {
        database.run(query, params);
        persistirEnIndexedDB(); // Guarda cambios offline automáticamente
        return true;
    } catch (error) {
        console.error("Error al ejecutar SQL:", error);
        return false;
    }
}

/**
 * Función genérica para consultas de lectura (SELECT)
 */
async function consultarSQL(query, params = []) {
    const database = await initSqlDatabase();
    if (!database) return [];

    try {
        const stmt = database.prepare(query);
        stmt.bind(params);
        const resultados = [];
        while (stmt.step()) {
            resultados.push(stmt.getAsObject());
        }
        stmt.free();
        return resultados;
    } catch (error) {
        console.error("Error al consultar SQL:", error);
        return [];
    }
}
