document.addEventListener("DOMContentLoaded", () => {
  // Determine the base path depending on the location of the HTML file
  const basePath = window.location.pathname.includes('/views/') ? '../' : '';

  // ==========================================
  // LOGIC 1: NEWS SECTION LOGIC (INDEX.HTML)
  // ==========================================
  const newsGrid = document.getElementById("news-grid");
  if (newsGrid) {
    fetch(basePath + "js/noticias.json")
      .then(response => {
        if (!response.ok) throw new Error("Error retrieving updates and news");
        return response.json();
      })
      .then(news => {
        let newsHtml = ""; // Performance optimization: accumulate string
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
        newsGrid.innerHTML = newsHtml; // Single DOM injection
      })
      .catch(err => console.error(err));
  }

  // ==========================================
  // LOGIC 2: DYNAMIC GALLERY & FILTERING (GALERIA.HTML)
  // ==========================================
  const galleryContainer = document.getElementById("gallery-container");
  const immersiveSection = document.getElementById("immersive-section");
  
  if (galleryContainer) {
    let allImages = [];

    // 1. Load images dynamically from external JSON
    fetch(basePath + "js/galeria.json")
      .then(response => {
        if (!response.ok) throw new Error("Error retrieving gallery data");
        return response.json();
      })
      .then(data => {
        allImages = data;
        renderGallery(allImages); // Initial rendering of all items
        setupFilters();
      })
      .catch(err => console.error(err));

    // Function responsible for rendering gallery HTML nodes
    function renderGallery(items) {
      if (items.length === 0) {
        galleryContainer.innerHTML = "<p>No items available in this category.</p>";
        return;
      }

      let galleryHtml = ""; // Performance optimization
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
      galleryContainer.innerHTML = galleryHtml; // Single DOM injection

      // Attach click events to freshly rendered gallery items
      document.querySelectorAll(".gallery-item").forEach(card => {
        card.addEventListener("click", () => {
          const selectedId = parseInt(card.getAttribute("data-id"));
          const imageObject = allImages.find(img => img.id === selectedId);
          if (imageObject) initializeViewer(imageObject);
        });
      });
    }

    // 2. Filter button event controllers
    function setupFilters() {
      const filterButtons = document.querySelectorAll(".filter-btn");
      
      filterButtons.forEach(button => {
        button.addEventListener("click", () => {
          // Remove active class from other buttons
          filterButtons.forEach(b => b.classList.remove("active"));
          button.classList.add("active");

          const currentFilter = button.getAttribute("data-filter");

          // Conditional filtering
          if (currentFilter === "all") {
            renderGallery(allImages);
          } else {
            const filteredItems = allImages.filter(img => img.categoria === currentFilter);
            renderGallery(filteredItems);
          }
        });
      });
    }

    // 3. Dynamic mechanism for the Immersive Viewer
    function initializeViewer(data) {
      // Modify classes and layout of the container for the active view state
      immersiveSection.className = "immersive-viewer active-view";
      immersiveSection.innerHTML = `
        <div class="viewer-image-side">
          <img src="${data.imagen}" alt="${data.titulo}">
        </div>
        <div class="viewer-info-side">
          <span class="viewer-tag">// CORE SYSTEM // CATEGORY: ${data.categoria}</span>
          <h3 style="margin-top: 10px; font-size: 26px;">${data.titulo}</h3>
          <p style="margin: 15px 0 25px 0;">${data.descripcion}</p>
          <button class="btn-action-active" id="btn-explore-interface">EXPLORE INTERFACE</button>
        </div>
      `;

      // Inline onclick alert avoided for better standard compliance
      document.getElementById("btn-explore-interface").addEventListener("click", () => {
        alert("Initializing technical analysis protocol...");
      });
    }
  }

  // ==========================================
  // LOGIC 3: INTERACTIVE BUDGET & VALIDATION (PRESUPUESTO.HTML)
  // ==========================================
  const formBudget = document.getElementById("presupuestoForm");
  
  if (formBudget) {
    // 1. INPUT SELECTORS
    const inputName = document.getElementById("nombre");
    const inputLastName = document.getElementById("apellidos");
    const inputPhone = document.getElementById("telefono");
    const inputEmail = document.getElementById("email");
    const selectProduct = document.getElementById("producto");
    const inputTerm = document.getElementById("plazo");
    const checkPrivacy = document.getElementById("privacidad");
    const btnReset = document.getElementById("btn-reset");

    // 2. DYNAMIC RECEIPT DISPLAY SELECTORS
    const lblTermVal = document.getElementById("plazo-val");
    const lblDiscountTag = document.getElementById("descuento-tag");
    const txtReceiptBase = document.getElementById("recibo-base");
    const txtReceiptTermDesc = document.getElementById("recibo-plazo-desc");
    const txtReceiptDiscount = document.getElementById("recibo-descuento");
    const txtReceiptExtras = document.getElementById("recibo-extras");
    const txtReceiptTax = document.getElementById("recibo-tax");
    const txtReceiptTotal = document.getElementById("recibo-total");

    // 3. NATIVE REGULAR EXPRESSIONS
    const regexLetters = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    const regexPhone = /^\d{9}$/;
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Real-time calculation logic
    function calculateInstantBudget() {
      // Base cost
      const baseCost = parseFloat(selectProduct.value) || 0;
      
      // Term and discounts applied sequentially
      const months = parseInt(inputTerm.value) || 1;
      lblTermVal.innerText = `${months} Month${months > 1 ? 's' : ''}`;
      
      let discountPercentage = 0;
      if (months >= 12 && months < 24) {
        discountPercentage = 0.15; // 15% Annual discount
        lblDiscountTag.innerText = "Save 15% Annual";
        lblDiscountTag.style.display = "inline-block";
      } else if (months >= 24) {
        discountPercentage = 0.25; // 25% Loyalty discount
        lblDiscountTag.innerText = "Save 25% Loyalty";
        lblDiscountTag.style.display = "inline-block";
      } else {
        lblDiscountTag.style.display = "none";
      }

      const discountAmount = baseCost * discountPercentage;
      txtReceiptTermDesc.innerText = `${months} Month Commitment (${discountPercentage * 100}%)`;
      
      // Accumulative Extras (Checkboxes)
      let accumulatedExtras = 0;
      const activeCheckboxes = formBudget.querySelectorAll('input[name="extras"]:checked');
      activeCheckboxes.forEach(cb => {
        accumulatedExtras += parseFloat(cb.value) || 0;
      });

      // Partial calculations and operating regulation fee (10%)
      const monthlySubtotal = (baseCost - discountAmount) + accumulatedExtras;
      const regulationTax = monthlySubtotal * 0.10;
      const finalTotalInvestment = monthlySubtotal + regulationTax;

      // Update right column layout receipt nodes
      txtReceiptBase.innerText = `$${baseCost.toFixed(2)}`;
      txtReceiptDiscount.innerText = `-$${discountAmount.toFixed(2)}`;
      txtReceiptExtras.innerText = `$${accumulatedExtras.toFixed(2)}`;
      txtReceiptTax.innerText = `$${regulationTax.toFixed(2)}`;
      txtReceiptTotal.innerText = finalTotalInvestment.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    // 4. ACTIVE EVENT LISTENERS FOR CALCULATION
    selectProduct.addEventListener("change", calculateInstantBudget);
    inputTerm.addEventListener("input", calculateInstantBudget);
    formBudget.addEventListener("change", (e) => {
      if (e.target.name === "extras") calculateInstantBudget();
    });

    // 5. CONTACT VALIDATION ROUTINES
    function validateIndividualField(input, regex, errorMsgElement, textIfFails, maxLength = null) {
      const value = input.value.trim();
      
      if (!value) {
        errorMsgElement.innerText = "This field is required.";
        input.style.borderColor = "#d93838";
        return false;
      }
      if (maxLength && value.length > maxLength) {
        errorMsgElement.innerText = `Exceeds maximum size permitted (${maxLength} characters).`;
        input.style.borderColor = "#d93838";
        return false;
      }
      if (regex && !regex.test(value)) {
        errorMsgElement.innerText = textIfFails;
        input.style.borderColor = "#d93838";
        return false;
      }

      // Clear errors if filters are passed successfully
      errorMsgElement.innerText = "";
      input.style.borderColor = "#cbd5df";
      return true;
    }

    // Final submit interception control
    formBudget.addEventListener("submit", (e) => {
      e.preventDefault();

      const isNameValid = validateIndividualField(inputName, regexLetters, document.getElementById("err-nombre"), "Only letters are allowed.", 15);
      const isLastNameValid = validateIndividualField(inputLastName, regexLetters, document.getElementById("err-apellidos"), "Only letters are allowed.", 40);
      const isPhoneValid = validateIndividualField(inputPhone, regexPhone, document.getElementById("err-telefono"), "Must contain exactly 9 numbers.");
      const isEmailValid = validateIndividualField(inputEmail, regexEmail, document.getElementById("err-email"), "Incorrect format (nnnnn_nn@zzzzz.xxx).");

      if (!checkPrivacy.checked) {
        alert("Attention: You must explicitly accept the privacy terms and conditions.");
        return;
      }

      if (isNameValid && isLastNameValid && isPhoneValid && isEmailValid) {
        alert(`Proposal synchronized successfully!\nClient: ${inputName.value} ${inputLastName.value}\nCalculated monthly investment: $${txtReceiptTotal.innerText}`);
        // Ready for production server data handling
      } else {
        alert("Please correct the errors in the contact form before proceeding.");
      }
    });

    // Managed complete reset button behavior
    btnReset.addEventListener("click", () => {
      formBudget.reset();
      // Clean up visual error states
      document.querySelectorAll(".error-msg").forEach(span => span.innerText = "");
      document.querySelectorAll(".input-wrapper input").forEach(input => input.style.borderColor = "#cbd5df");
      calculateInstantBudget();
    });

    // Page load initialization trigger
    calculateInstantBudget();
  }
}); // <-- CORREGIDO: Ahora cierra todo el hilo del DOMContentLoaded de manera segura