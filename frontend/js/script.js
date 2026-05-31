// Si la página está en la carpeta /views/, tiene que salir con '../' antes de buscar /js/
const rutaBase = window.location.pathname.includes('/views/') ? '../' : '';

fetch(rutaBase + 'js/noticias.json') // 👈 Apunta a tu carpeta js
  .then(response => {
    if (!response.ok) throw new Error("No se pudo cargar el archivo");
    return response.json();
  })
  .then(noticias => {
    // ... (El resto del código de inyección queda exactamente igual)
  });