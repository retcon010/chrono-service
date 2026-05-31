document.addEventListener("DOMContentLoaded", () => {
  const newsGrid = document.getElementById("news-grid");

  // Si no encuentra el contenedor en la página actual, detiene el script para evitar errores
  if (!newsGrid) return;

  // Comprobamos si estamos dentro de la carpeta /views/ para adaptar la ruta hacia js/
  const rutaBase = window.location.pathname.includes('/views/') ? '../' : '';

  // Fetch directo a tu archivo noticias.json dentro de la carpeta js/
  fetch(rutaBase + "js/noticias.json")
    .then(response => {
      if (!response.ok) {
        throw new Error("No se pudo cargar el archivo js/noticias.json");
      }
      return response.json();
    })
    .then(noticias => {
      // Limpiamos el texto de "Cargando..."
      newsGrid.innerHTML = "";

      // Renderizamos las tarjetas dinámicamente
      noticias.forEach(item => {
        const cardHtml = `
          <article class="news-card">
            <div class="card-thumb">
              <img src="${item.imagen}" alt="${item.titulo}">
            </div>
            <div class="card-body">
              <span class="card-date">${item.fecha}</span>
              <h3 class="card-title">${item.titulo}</h3>
              <p class="card-text">${item.descripcion}</p>
            </div>
          </article>
        `;
        newsGrid.innerHTML += cardHtml;
      });
    })
    .catch(error => {
      console.error("Error:", error);
      newsGrid.innerHTML = `<p style="color: red; font-family: sans-serif;">Error al cargar las novedades técnicas desde la carpeta js.</p>`;
    });
});