
// MÓDULO GENERAL DE LA INTERFAZ - PWA EL MANANTIAL

document.addEventListener('DOMContentLoaded', () => {
  // Corregido: Uso de comillas invertidas (backticks) para la interpolación
  console.log(`pwa_el_manantial running`);

  // Mostrar indicador visual de estado de red
  actualizarEstadoRed();
  window.addEventListener('online', actualizarEstadoRed);
  window.addEventListener('offline', actualizarEstadoRed);
});

function actualizarEstadoRed() {
  const indicador = document.getElementById('status-conexion');
  if (indicador) {
    if (navigator.onLine) {
      indicador.textContent = "Online 🟢";
      indicador.style.color = "green";
    } else {
      indicador.textContent = "Modo Offline 🟠";
      indicador.style.color = "orange";
    }
  }
}

// Función auxiliar para redirecciones seguras
function irA(vista) {
  // Redirección directa basada en la ruta del servidor Node.js / SQLite3
  window.location.href = vista;
}
