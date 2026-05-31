document.addEventListener("DOMContentLoaded", () => {
  // Determinamos la ruta base dependiendo de la ubicación del archivo HTML
  const rutaBase = window.location.pathname.includes('/views/') ? '../' : '';

  // ==========================================
  // LÓGICA 1: LOGICA DE SECCIÓN NOTICIAS (INDEX.HTML)
  // ==========================================
  const newsGrid = document.getElementById("news-grid");
  if (newsGrid) {
    fetch(rutaBase + "js/noticias.json")
      .then(response => {
        if (!response.ok) throw new Error("Error al recuperar novedades");
        return response.json();
      })
      .then(noticias => {
        newsGrid.innerHTML = "";
        noticias.forEach(item => {
          newsGrid.innerHTML += `
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
        });
      })
      .catch(err => console.error(err));
  }

  // ==========================================
  // LÓGICA 2: GALERÍA DINÁMICA Y FILTRADO (GALERIA.HTML)
  // ==========================================
  const galleryContainer = document.getElementById("gallery-container");
  const immersiveSection = document.getElementById("immersive-section");
  
  if (galleryContainer) {
    let todasLasImagenes = [];

    // 1. Cargar las imágenes desde el JSON externo de forma dinámica
    fetch(rutaBase + "js/galeria.json")
      .then(response => {
        if (!response.ok) throw new Error("Error al recuperar galería");
        return response.json();
      })
      .then(data => {
        todasLasImagenes = data;
        renderGallery(todasLasImagenes); // Render inicial de todos los items
        setupFilters();
      })
      .catch(err => console.error(err));

    // Función encargada de pintar los nodos HTML de las imágenes
    function renderGallery(items) {
      galleryContainer.innerHTML = "";
      if (items.length === 0) {
        galleryContainer.innerHTML = "<p>No hay elementos disponibles en esta categoría.</p>";
        return;
      }

      items.forEach(item => {
        const itemHtml = `
          <div class="gallery-item" data-id="${item.id}">
            <img src="${item.imagen}" alt="${item.titulo}">
            <div class="gallery-overlay">
              <h4>${item.titulo}</h4>
            </div>
          </div>
        `;
        galleryContainer.innerHTML += itemHtml;
      });

      // Añadir evento click a cada elemento de la galería recién renderizado
      document.querySelectorAll(".gallery-item").forEach(card => {
        card.addEventListener("click", () => {
          const idSeleccionado = parseInt(card.getAttribute("data-id"));
          const objetoImagen = todasLasImagenes.find(img => img.id === idSeleccionado);
          if (objetoImagen) inicializarVisor(objetoImagen);
        });
      });
    }

    // 2. Controladores de los botones de filtrado
    function setupFilters() {
      const botonesFiltro = document.querySelectorAll(".filter-btn");
      
      botonesFiltro.forEach(boton => {
        boton.addEventListener("click", () => {
          // Remover clase activa de los demás botones
          botonesFiltro.forEach(b => b.classList.remove("active"));
          boton.classList.add("active");

          const filtro = boton.getAttribute("data-filter");

          // Filtrado condicional
          if (filtro === "all") {
            renderGallery(todasLasImagenes);
          } else {
            const filtrados = todasLasImagenes.filter(img => img.categoria === filtro);
            renderGallery(filtrados);
          }
        });
      });
    }

    // 3. Mecanismo dinámico para el Immersive Viewer
    function inicializarVisor(data) {
      // Modificamos las clases y estructura del contenedor para el estado activo
      immersiveSection.className = "immersive-viewer active-view";
      immersiveSection.innerHTML = `
        <div class="viewer-image-side">
          <img src="${data.imagen}" alt="${data.titulo}">
        </div>
        <div class="viewer-info-side">
          <span class="viewer-tag">// CORE SYSTEM // CATEGORY: ${data.categoria}</span>
          <h3 style="margin-top: 10px; font-size: 26px;">${data.titulo}</h3>
          <p style="margin: 15px 0 25px 0;">${data.descripcion}</p>
          <button class="btn-action-active" onclick="alert('Iniciando protocolo de análisis técnico...')">EXPLORE INTERFACE</button>
        </div>
      `;
    }
  }
});