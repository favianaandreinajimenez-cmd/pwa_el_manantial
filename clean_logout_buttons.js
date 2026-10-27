const fs = require('fs');
const path = require('path');

const publicDir = 'c:/Users/Desktop/stitch_el_manantial/aplicacion_web_progresiva/public';
const files = [
    'index.html',
    'ordeno.html',
    'unidad.html',
    'inventario.html',
    'salud.html',
    'reportes.html',
    'historial.html',
    'usuarios.html'
];

files.forEach(file => {
    const filePath = path.join(publicDir, file);
    
    // Validar que el archivo exista antes de procesarlo
    if (!fs.existsSync(filePath)) {
        console.log(`Archivo no encontrado: ${file}`);
        return;
    }

    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(/\r\n/g, '\n'); // Normalizar saltos de línea de Windows a \n
    
    // Buscar cualquier secuencia de uno o más botones de logout seguidos del enlace de avatar de usuario
    const pattern = /(?:<button @click="logout"[\s\S]*?<\/button>\s*)+<a href="usuarios\.html"[\s\S]*?<\/a>/g;
    
    // Reemplazar exactamente con un solo botón de logout y el enlace del avatar de usuario respetando diseño y colores
    const singleButtonWithAvatar = `<button @click="logout" class="w-10 h-10 rounded-full hover:bg-error/10 text-on-surface-variant hover:text-error transition-colors flex items-center justify-center cursor-pointer" title="Cerrar Sesión">
    <span class="material-symbols-outlined text-[20px]" data-icon="logout">logout</span>
  </button>
  <a href="usuarios.html" class="w-10 h-10 rounded-full overflow-hidden border-2 border-primary-container flex items-center justify-center bg-primary text-on-primary text-sm font-bold active:scale-95 transition-transform duration-150 shadow-sm">
    <img v-if="currentUser && currentUser.avatar && (currentUser.avatar.startsWith('http') || currentUser.avatar.startsWith('data:'))" alt="User profile" class="w-full h-full object-cover" :src="currentUser.avatar"/>
    <span v-else>{{ currentUser ? currentUser.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : 'US' }}</span>
  </a>`;
    
    if (pattern.test(content)) {
        content = content.replace(pattern, singleButtonWithAvatar);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Botones de cierre de sesión limpiados para: ${file}`);
    } else {
        console.log(`No se encontraron botones duplicados para: ${file}`);
    }
});
