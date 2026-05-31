document.addEventListener("DOMContentLoaded", () => {
    const newsGrid = document.getElementById("news-grid");

    // Hacemos el fetch al archivo externo JSON
    fetch("data/noticias.json")
      .then(response => {
        if (!response.ok) {
          throw new Error("No se pudo cargar el archivo de noticias");
        }
        return response.json();
      })
      .then(noticias => {
        // Limpiamos el contenedor
        newsGrid.innerHTML = "";

        // Recorremos el JSON y construimos el HTML de cada tarjeta
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
        newsGrid.innerHTML = `<p style="color: red;">Error al cargar las novedades técnicas.</p>`;
      });
    });

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