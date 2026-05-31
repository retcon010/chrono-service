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

// ==========================================
  // LÓGICA 3: PRESUPUESTO INTERACTIVO Y VALIDACIÓN (PRESUPUESTO.HTML)
  // ==========================================
  const formPresupuesto = document.getElementById("presupuestoForm");
  
  if (formPresupuesto) {
    // 1. SELECTORES DE ENTRADA
    const inputNombre = document.getElementById("nombre");
    const inputApellidos = document.getElementById("apellidos");
    const inputTelefono = document.getElementById("telefono");
    const inputEmail = document.getElementById("email");
    const selectProducto = document.getElementById("producto");
    const inputPlazo = document.getElementById("plazo");
    const checkPrivacidad = document.getElementById("privacidad");
    const btnReset = document.getElementById("btn-reset");

    // 2. SELECTORES DE PANTALLA DINÁMICA (RECIBO)
    const lblPlazoVal = document.getElementById("plazo-val");
    const lblDescuentoTag = document.getElementById("descuento-tag");
    const txtReciboBase = document.getElementById("recibo-base");
    const txtReciboPlazoDesc = document.getElementById("recibo-plazo-desc");
    const txtReciboDescuento = document.getElementById("recibo-descuento");
    const txtReciboExtras = document.getElementById("recibo-extras");
    const txtReciboTax = document.getElementById("recibo-tax");
    const txtReciboTotal = document.getElementById("recibo-total");

    // 3. EXPRESIONES REGULARES NATIVAS (REQUERIDO ENUNCIADO)
    const regexLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    const regexTelefono = /^\d{9}$/;
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Función de cálculo matemático en tiempo real (Sin botones)
    function calcularPresupuestoInmediato() {
      // Base
      const costeBase = parseFloat(selectProducto.value);
      
      // Plazo y Descuentos aplicados consecutivamente
      const meses = parseInt(inputPlazo.value);
      lblPlazoVal.innerText = `${meses} Mese${meses > 1 ? 'es' : 's'}`;
      
      let porcentajeDescuento = 0;
      if (meses >= 12 && meses < 24) {
        porcentajeDescuento = 0.15; // 15% Descuento anual solicitado en maqueta
        lblDescuentoTag.innerText = "Save 15% Annual";
        lblDescuentoTag.style.display = "inline-block";
      } else if (meses >= 24) {
        porcentajeDescuento = 0.25; // 25% por larga permanencia
        lblDescuentoTag.innerText = "Save 25% Loyalty";
        lblDescuentoTag.style.display = "inline-block";
      } else {
        lblDescuentoTag.style.display = "none";
      }

      const cantidadDescuento = costeBase * porcentajeDescuento;
      txtReciboPlazoDesc.innerText = `${meses} Month Commitment (${porcentajeDescuento * 100}%)`;
      
      // Extras acumulativos (Checkboxes)
      let acumuladoExtras = 0;
      const checkboxesActivos = formPresupuesto.querySelectorAll('input[name="extras"]:checked');
      checkboxesActivos.forEach(cb => {
        acumuladoExtras += parseFloat(cb.value);
      });

      // Cálculos parciales y Tasas fijas (Ej: 10% regulaciones operativas)
      const subtotalMensual = (costeBase - cantidadDescuento) + acumuladoExtras;
      const tasaRegulaciones = subtotalMensual * 0.10;
      const inversionTotalFinal = subtotalMensual + tasaRegulaciones;

      // Inyección formateada en los nodos de texto de la columna derecha
      txtReciboBase.innerText = `$${costeBase.toFixed(2)}`;
      txtReciboDescuento.innerText = `-$${cantidadDescuento.toFixed(2)}`;
      txtReciboExtras.innerText = `$${acumuladoExtras.toFixed(2)}`;
      txtReciboTax.innerText = `$${tasaRegulaciones.toFixed(2)}`;
      txtReciboTotal.innerText = inversionTotalFinal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    // 4. SISTEMA DE ESCUCHA ACTIVA DE EVENTOS (INPUT)
    selectProducto.addEventListener("change", calcularPresupuestoInmediato);
    inputPlazo.addEventListener("input", calcularPresupuestoInmediato);
    formPresupuesto.addEventListener("change", (e) => {
      if (e.target.name === "extras") calcularPresupuestoInmediato();
    });

    // 5. RUTINAS DE VALIDACIÓN DE CONTACTO (PARTE 1 ENUNCIADO)
    function validarCampoIndividual(input, regex, msgErrorElemento, textoSiFalla, longMax = null) {
      const valor = input.value.trim();
      
      if (!valor) {
        msgErrorElemento.innerText = "Este campo es obligatorio.";
        input.style.borderColor = "#d93838";
        return false;
      }
      if (longMax && valor.length > longMax) {
        msgErrorElemento.innerText = `Excede el tamaño máximo permitido (${longMax} caracteres).`;
        input.style.borderColor = "#d93838";
        return false;
      }
      if (regex && !regex.test(valor)) {
        msgErrorElemento.innerText = textoSiFalla;
        input.style.borderColor = "#d93838";
        return false;
      }

      // Si pasa los filtros limpiamos errores
      msgErrorElemento.innerText = "";
      input.style.borderColor = "#cbd5df";
      return true;
    }

    // Interceptación del submit final
    formPresupuesto.addEventListener("submit", (e) => {
      e.preventDefault(); // Detiene envío nativo

      const esNombreValido = validarCampoIndividual(inputNombre, regexLetras, document.getElementById("err-nombre"), "Sólo se admiten letras.", 15);
      const esApellidoValido = validarCampoIndividual(inputApellidos, regexLetras, document.getElementById("err-apellidos"), "Sólo se admiten letras.", 40);
      const esTelefonoValido = validarCampoIndividual(inputTelefono, regexTelefono, document.getElementById("err-telefono"), "Debe contener exactamente 9 números.");
      const esEmailValido = validarCampoIndividual(inputEmail, regexEmail, document.getElementById("err-email"), "Formato incorrecto (nnnnn_nn@zzzzz.xxx).");

      if (!checkPrivacidad.checked) {
        alert("Atención: Debe aceptar expresamente las condiciones de privacidad.");
        return;
      }

      if (esNombreValido && esApellidoValido && esTelefonoValido && esEmailValido) {
        alert(`¡Propuesta sincronizada con éxito!\nCliente: ${inputNombre.value} ${inputApellidos.value}\nInversión mensual calculada: $${txtReciboTotal.innerText}`);
        // Aquí se procedería a enviar los datos procesados al servidor de producción
      } else {
        alert("Por favor, corrige los errores del formulario de contacto antes de continuar.");
      }
    });

    // Botón de reseteo completo controlado
    btnReset.addEventListener("click", () => {
      formPresupuesto.reset();
      // Limpiar errores visuales
      document.querySelectorAll(".error-msg").forEach(span => span.innerText = "");
      document.querySelectorAll(".input-wrapper input").forEach(input => input.style.borderColor = "#cbd5df");
      calcularPresupuestoInmediato();
    });

    // Inicialización al cargar la página
    calcularPresupuestoInmediato();
  }