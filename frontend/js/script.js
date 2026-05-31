document.addEventListener("DOMContentLoaded", () => {

  // ==========================================
  // CONFIGURACIÓN GENERAL
  // ==========================================
  // Determina la ruta base según si el archivo HTML
  // se encuentra en la carpeta raíz o dentro de /views/.
  const basePath = window.location.pathname.includes('/views/') ? '../' : '';

  // ==========================================
  // LÓGICA 1: CARGA DINÁMICA DE NOTICIAS
  // (INDEX.HTML)
  // ==========================================

  // Contenedor donde se insertarán las noticias.
  const newsGrid = document.getElementById("news-grid");

  if (newsGrid) {

    // Obtención de noticias desde un archivo JSON.
    fetch(basePath + "js/noticias.json")
      .then(...)
      .then(news => {

        // Generación dinámica de tarjetas de noticias.
        news.forEach(item => {
          ...
        });

      })
      .catch(err => console.error(err));
  }

  // ==========================================
  // LÓGICA 2: GALERÍA DINÁMICA Y FILTROS
  // (GALERIA.HTML)
  // ==========================================

  // Referencias a la galería y al visor inmersivo.
  const galleryContainer = document.getElementById("gallery-container");
  const immersiveSection = document.getElementById("immersive-section");

  if (galleryContainer) {

    // Array que almacenará todas las imágenes cargadas.
    let allImages = [];

    // Carga de imágenes desde el archivo JSON.
    fetch(basePath + "js/galeria.json")
      .then(...)
      .then(data => {
        ...
      });

    // ==========================================
    // FUNCIÓN: RENDERIZADO DE LA GALERÍA
    // ==========================================
    // Genera dinámicamente las tarjetas de imágenes.
    function renderGallery(items) {
      ...
    }

    // ==========================================
    // FUNCIÓN: CONFIGURACIÓN DE FILTROS
    // ==========================================
    // Permite mostrar únicamente las imágenes
    // correspondientes a una categoría.
    function setupFilters() {
      ...
    }

    // ==========================================
    // FUNCIÓN: VISOR INMERSIVO
    // ==========================================
    // Muestra información ampliada del proyecto
    // seleccionado por el usuario.
    function initializeViewer(data) {
      ...
    }
  }

  // ==========================================
  // LÓGICA 3: PRESUPUESTO Y VALIDACIÓN
  // (PRESUPUESTO.HTML)
  // ==========================================

  const formBudget = document.getElementById("presupuestoForm");

  if (formBudget) {

    // ==========================================
    // SELECTORES DE ELEMENTOS DEL FORMULARIO
    // ==========================================
    // Referencias a campos de entrada, botones
    // y elementos de resumen del presupuesto.
    const inputName = ...
    const inputLastName = ...
    ...

    // ==========================================
    // EXPRESIONES REGULARES DE VALIDACIÓN
    // ==========================================
    // Validan nombres, teléfonos y correos.
    const regexLetters = ...
    const regexPhone = ...
    const regexEmail = ...

    // ==========================================
    // FUNCIÓN DE CÁLCULO DEL PRESUPUESTO
    // ==========================================
    // Calcula:
    // - Coste base
    // - Descuentos por duración
    // - Servicios adicionales
    // - Impuestos
    // - Total final mensual
    function calculateInstantBudget() {
      ...
    }

    // ==========================================
    // EVENTOS DE ACTUALIZACIÓN AUTOMÁTICA
    // ==========================================
    // Recalcula el presupuesto cuando cambian
    // los productos, duración o extras.
    selectProduct.addEventListener(...);
    inputTerm.addEventListener(...);

    // ==========================================
    // VALIDACIÓN DE CAMPOS
    // ==========================================
    // Comprueba formato, longitud máxima y
    // obligatoriedad de los datos introducidos.
    function validateIndividualField(...) {
      ...
    }

    // ==========================================
    // ENVÍO DEL FORMULARIO
    // ==========================================
    // Valida los datos y verifica la aceptación
    // de la política de privacidad antes de enviar.
    formBudget.addEventListener("submit", (e) => {
      ...
    });

    // ==========================================
    // REINICIO DEL FORMULARIO
    // ==========================================
    // Restablece todos los campos, elimina errores
    // visuales y recalcula el presupuesto inicial.
    btnReset.addEventListener("click", () => {
      ...
    });

    // ==========================================
    // INICIALIZACIÓN
    // ==========================================
    // Ejecuta el cálculo inicial al cargar la página.
    calculateInstantBudget();
  }

}); // Fin del evento DOMContentLoaded