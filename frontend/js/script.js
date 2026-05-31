document.addEventListener("DOMContentLoaded", () => {
  / * Determina la ruta base dependiendo de si el archivo HTML está dentro de la carpeta 'views' * /
  const basePath = window.location.pathname.includes('/views/') ? '../' : '';

  // ==========================================================================
  // LÓGICA 1: SECCIÓN DE NOTICIAS Y ARTÍCULOS (INDEX.HTML / HOME)
  // ==========================================================================
  const newsGrid = document.getElementById("news-grid");
  if (newsGrid) {
    / * Petición asíncrona para cargar las noticias desde el archivo JSON externo * /
    fetch(basePath + "js/noticias.json")
      .then(response => {
        if (!response.ok) throw new Error("Error al recuperar las actualizaciones y noticias");
        return response.json();
      })
      .then(news => {
        let newsHtml = ""; // Optimización: acumulamos el texto HTML en una variable para no saturar el DOM
        news.forEach(item => {
          newsHtml += `
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
        newsGrid.innerHTML = newsHtml; // Inyección única en el DOM al finalizar el bucle
      })
      .catch(err => console.error(err));
  }

  // ==========================================================================
  // LÓGICA 2: GALERÍA DINÁMICA Y FILTRADO DE PROYECTOS (GALERIA.HTML)
  // ==========================================================================
  const galleryContainer = document.getElementById("gallery-container");
  const immersiveSection = document.getElementById("immersive-section");
  
  if (galleryContainer) {
    let allImages = []; // Matriz global para almacenar los datos descargados del JSON

    / * 1. Carga inicial de las imágenes del porfolio * /
    fetch(basePath + "js/galeria.json")
      .then(response => {
        if (!response.ok) throw new Error("Error al recuperar los datos de la galería");
        return response.json();
      })
      .then(data => {
        allImages = data;
        renderGallery(allImages); // Muestra todos los elementos al cargar la página
        setupFilters();           // Inicializa los controladores de los botones de filtro
      })
      .catch(err => console.error(err));

    / * Función encargada de pintar los nodos HTML de la galería * /
    function renderGallery(items) {
      if (items.length === 0) {
        galleryContainer.innerHTML = "<p>No hay elementos disponibles en esta categoría.</p>";
        return;
      }

      let galleryHtml = ""; // Optimización de rendimiento
      items.forEach(item => {
        galleryHtml += `
          <div class="gallery-item" data-id="${item.id}">
            <img src="${item.imagen}" alt="${item.titulo}">
            <div class="gallery-overlay">
              <h4>${item.titulo}</h4>
            </div>
          </div>
        `;
      });
      galleryContainer.innerHTML = galleryHtml; // Inyección única

      / * Asigna eventos de clic a las tarjetas recién creadas para abrir el visor * /
      document.querySelectorAll(".gallery-item").forEach(card => {
        card.addEventListener("click", () => {
          const selectedId = parseInt(card.getAttribute("data-id"));
          const imageObject = allImages.find(img => img.id === selectedId);
          if (imageObject) initializeViewer(imageObject);
        });
      });
    }

    / * 2. Controlador de eventos para los botones de filtrado (Industrial, Mantenimiento, etc.) * /
    function setupFilters() {
      const filterButtons = document.querySelectorAll(".filter-btn");
      
      filterButtons.forEach(button => {
        button.addEventListener("click", () => {
          // Intercambia la clase activa para cambiar el color del botón seleccionado
          filterButtons.forEach(b => b.classList.remove("active"));
          button.classList.add("active");

          const currentFilter = button.getAttribute("data-filter");

          // Filtrado condicional según la categoría seleccionada
          if (currentFilter === "all") {
            renderGallery(allImages);
          } else {
            const filteredItems = allImages.filter(img => img.categoria === currentFilter);
            renderGallery(filteredItems);
          }
        });
      });
    }

    / * 3. Mecanismo dinámico para el Visor Inmersivo de detalles * /
    function initializeViewer(data) {
      // Modifica las clases para cambiar el layout y añade los datos de la imagen seleccionada
      immersiveSection.className = "immersive-viewer active-view";
      immersiveSection.innerHTML = `
        <div class="viewer-image-side">
          <img src="${data.imagen}" alt="${data.titulo}">
        </div>
        <div class="viewer-info-side">
          <span class="viewer-tag">// SISTEMA CENTRAL // CATEGORÍA: ${data.categoria}</span>
          <h3 style="margin-top: 10px; font-size: 26px;">${data.titulo}</h3>
          <p style="margin: 15px 0 25px 0;">${data.descripcion}</p>
          <button class="btn-action-active" id="btn-explore-interface">EXPLORAR INTERFAZ</button>
        </div>
      `;

      // Evento del botón de acción dentro del propio visor informativo
      document.getElementById("btn-explore-interface").addEventListener("click", () => {
        alert("Iniciando el protocolo de análisis técnico...");
      });
    }
  }

  // ==========================================================================
  // LÓGICA 3: FORMULARIO DE PRESUPUESTO INTERACTIVO Y VALIDACIÓN (PRESUPUESTO.HTML)
  // ==========================================================================
  const formBudget = document.getElementById("presupuestoForm");
  
  if (formBudget) {
    / * 1. SELECTORES DE LOS CAMPOS DE ENTRADA (INPUTS) * /
    const inputName = document.getElementById("nombre");
    const inputLastName = document.getElementById("apellidos");
    const inputPhone = document.getElementById("telefono");
    const inputEmail = document.getElementById("email");
    const selectProduct = document.getElementById("producto");
    const inputTerm = document.getElementById("plazo");
    const checkPrivacy = document.getElementById("privacidad");
    const btnReset = document.getElementById("btn-reset");

    / * 2. SELECTORES DE LOS CAMPOS DEL RECIBO DE DESGLOSE (DERECHA) * /
    const lblTermVal = document.getElementById("plazo-val");
    const lblDiscountTag = document.getElementById("descuento-tag");
    const txtReceiptBase = document.getElementById("recibo-base");
    const txtReceiptTermDesc = document.getElementById("recibo-plazo-desc");
    const txtReceiptDiscount = document.getElementById("recibo-descuento");
    const txtReceiptExtras = document.getElementById("recibo-extras");
    const txtReceiptTax = document.getElementById("recibo-tax");
    const txtReceiptTotal = document.getElementById("recibo-total");

    / * 3. EXPRESIONES REGULARES NATIVAS PARA VALIDACIÓN * /
    const regexLetters = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    const regexPhone = /^\d{9}$/;
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    / * Función central para recalcular los costes del presupuesto al instante * /
    function calculateInstantBudget() {
      // Precio del servicio base seleccionado
      const baseCost = parseFloat(selectProduct.value) || 0;
      
      // Cálculo de meses y actualización de etiquetas de descuento por volumen de tiempo
      const months = parseInt(inputTerm.value) || 1;
      lblTermVal.innerText = `${months} Mes${months > 1 ? 'es' : ''}`;
      
      let discountPercentage = 0;
      if (months >= 12 && months < 24) {
        discountPercentage = 0.15; // 15% de descuento anual
        lblDiscountTag.innerText = "Ahorro Anual del 15%";
        lblDiscountTag.style.display = "inline-block";
      } else if (months >= 24) {
        discountPercentage = 0.25; // 25% de descuento por fidelidad a largo plazo
        lblDiscountTag.innerText = "Ahorro por Fidelidad del 25%";
        lblDiscountTag.style.display = "inline-block";
      } else {
        lblDiscountTag.style.display = "none";
      }

      const discountAmount = baseCost * discountPercentage;
      txtReceiptTermDesc.innerText = `Compromiso de ${months} Meses (${discountPercentage * 100}%)`;
      
      // Sumatorio de los Extras acumulativos elegidos en los checkboxes
      let accumulatedExtras = 0;
      const activeCheckboxes = formBudget.querySelectorAll('input[name="extras"]:checked');
      activeCheckboxes.forEach(cb => {
        accumulatedExtras += parseFloat(cb.value) || 0;
      });

      // Cálculos parciales y adición de la tasa de regulación del servicio (10%)
      const monthlySubtotal = (baseCost - discountAmount) + accumulatedExtras;
      const regulationTax = monthlySubtotal * 0.10;
      const finalTotalInvestment = monthlySubtotal + regulationTax;

      // Inyección de los importes finales formateados en la tarjeta del recibo derecho
      txtReceiptBase.innerText = `${baseCost.toFixed(2)} €`;
      txtReceiptDiscount.innerText = `-${discountAmount.toFixed(2)} €`;
      txtReceiptExtras.innerText = `${accumulatedExtras.toFixed(2)} €`;
      txtReceiptTax.innerText = `${regulationTax.toFixed(2)} €`;
      txtReceiptTotal.innerText = finalTotalInvestment.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    / * 4. ESCUCHADORES DE EVENTOS ACTIVOS PARA EL CÁLCULO EN TIEMPO REAL * /
    selectProduct.addEventListener("change", calculateInstantBudget);
    inputTerm.addEventListener("input", calculateInstantBudget);
    formBudget.addEventListener("change", (e) => {
      if (e.target.name === "extras") calculateInstantBudget();
    });

    / * 5. RUTINAS DE VALIDACIÓN INDIVIDUAL DE CAMPOS DE CONTACTO * /
    function validateIndividualField(input, regex, errorMsgElement, textIfFails, maxLength = null) {
      const value = input.value.trim();
      
      if (!value) {
        errorMsgElement.innerText = "Este campo es obligatorio.";
        input.style.borderColor = "#d93838";
        return false;
      }
      if (maxLength && value.length > maxLength) {
        errorMsgElement.innerText = `Supera el tamaño máximo permitido (${maxLength} caracteres).`;
        input.style.borderColor = "#d93838";
        return false;
      }
      if (regex && !regex.test(value)) {
        errorMsgElement.innerText = textIfFails;
        input.style.borderColor = "#d93838";
        return false;
      }

      // Si pasa todos los filtros, limpia los estados de error visuales
      errorMsgElement.innerText = "";
      input.style.borderColor = "#cbd5df";
      return true;
    }

    / * Intercepción del evento de envío (Submit) del formulario de presupuesto * /
    formBudget.addEventListener("submit", (e) => {
      e.preventDefault(); // Detiene el refresco automático de la página

      // Validaciones de cada input individual con sus respectivas expresiones regulares
      const isNameValid = validateIndividualField(inputName, regexLetters, document.getElementById("err-nombre"), "Solo se permiten letras.", 15);
      const isLastNameValid = validateIndividualField(inputLastName, regexLetters, document.getElementById("err-apellidos"), "Solo se permiten letras.", 40);
      const isPhoneValid = validateIndividualField(inputPhone, regexPhone, document.getElementById("err-telefono"), "Debe contener exactamente 9 números.");
      const isEmailValid = validateIndividualField(inputEmail, regexEmail, document.getElementById("err-email"), "Formato incorrecto (ejemplo@dominio.com).");

      // Validación explícita del checkbox legal de privacidad
      if (!checkPrivacy.checked) {
        alert("Atención: Debe aceptar explícitamente los términos y condiciones de privacidad.");
        return;
      }

      // Si todo es correcto, simula la sincronización con la base de datos
      if (isNameValid && isLastNameValid && isPhoneValid && isEmailValid) {
        alert(`¡Propuesta sincronizada con éxito!\nCliente: ${inputName.value} ${inputLastName.value}\nInversión mensual calculada: ${txtReceiptTotal.innerText} €`);
      } else {
        alert("Por favor, corrija los errores en el formulario antes de proceder.");
      }
    });

    / * Comportamiento del botón de borrado y reinicio manual del formulario * /
    btnReset.addEventListener("click", () => {
      formBudget.reset();
      // Elimina los mensajes de error e id de bordes rojos residuales
      document.querySelectorAll(".error-msg").forEach(span => span.innerText = "");
      document.querySelectorAll(".input-wrapper input").forEach(input => input.style.borderColor = "#cbd5df");
      calculateInstantBudget(); // Revierte el recibo a los valores por defecto
    });

    / * Disparador inicial automático al cargar el archivo de presupuestos por primera vez * /
    calculateInstantBudget();
  }
});