document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // INICIALIZACIÓN GENERAL DEL SCRIPT
    // ==========================================
    // Todo el código se ejecuta cuando el DOM está completamente cargado
    // para asegurar que todos los elementos HTML existan antes de manipularlos.

    // ==========================================
    // LÓGICA 1: MAPA INTERACTIVO (LEAFLET.JS)
    // ==========================================

    const mapContainer = document.getElementById('map');

    if (mapContainer) {

        // ==========================================
        // COORDENADAS DE LA EMPRESA
        // ==========================================
        // Ubicación fija del taller central en Ginebra (Suiza)
        const businessCoords = [46.2044, 6.1432];

        // ==========================================
        // INICIALIZACIÓN DEL MAPA
        // ==========================================
        // Se utiliza Leaflet con mapas de OpenStreetMap / CartoDB
        const map = L.map('map').setView(businessCoords, 14);

        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap & CARTO'
        }).addTo(map);

        // Marcador principal de la empresa en el mapa
        L.marker(businessCoords)
            .addTo(map)
            .bindPopup('<b>Chronos Atelier Headquarters</b><br>24 Horology Row, Geneva.')
            .openPopup();

        // ==========================================
        // VARIABLE DE RUTA ACTIVA
        // ==========================================
        // Almacena la línea de ruta actual para poder eliminarla y recalcularla
        let currentRouteLine = null;

        // ==========================================
        // LÓGICA 2: CÁLCULO DE RUTAS
        // ==========================================

        const calculateBtn = document.getElementById("calculateRouteBtn");
        const locationInput = document.getElementById("userLocation");
        const resultBox = document.getElementById("routeResult");

        if (calculateBtn && locationInput && resultBox) {

            calculateBtn.addEventListener("click", function () {

                // Ciudad introducida por el usuario
                const userCity = locationInput.value.trim();

                // Validación básica de entrada
                if (userCity === "") {
                    alert("Please enter a departure city to calculate the route.");
                    return;
                }

                // ==========================================
                // COORDENADAS SIMULADAS DE ORIGEN
                // ==========================================
                // Se simulan puntos de origen para distintas ciudades
                let startCoords = [48.8566, 2.3522]; // París por defecto
                let kmDistance = "540 km";
                let duration = "5h 15 min";

                // Ajuste dinámico según la ciudad introducida
                if (userCity.toLowerCase().includes("mil")) {
                    startCoords = [45.4642, 9.1900]; // Milán
                    kmDistance = "318 km";
                    duration = "3h 45 min";

                } else if (
                    userCity.toLowerCase().includes("barc") ||
                    userCity.toLowerCase().includes("lleida")
                ) {
                    startCoords = [41.3851, 2.1734]; // Barcelona / Lleida
                    kmDistance = "790 km";
                    duration = "7h 50 min";

                } else if (
                    userCity.toLowerCase().includes("zur") ||
                    userCity.toLowerCase().includes("zúrich")
                ) {
                    startCoords = [47.3769, 8.5417]; // Zúrich
                    kmDistance = "278 km";
                    duration = "2h 50 min";
                }

                // ==========================================
                // LIMPIEZA DE RUTA ANTERIOR
                // ==========================================
                // Evita superposición de rutas en el mapa
                if (currentRouteLine) {
                    map.removeLayer(currentRouteLine);
                }

                // ==========================================
                // DIBUJO DE NUEVA RUTA
                // ==========================================
                currentRouteLine = L.polyline([startCoords, businessCoords], {
                    color: '#2b4360',
                    weight: 4,
                    dashArray: '5, 10',
                    opacity: 0.8
                }).addTo(map);

                // Ajusta el mapa para mostrar toda la ruta
                const bounds = L.latLngBounds([startCoords, businessCoords]);
                map.fitBounds(bounds, { padding: [50, 50] });

                // ==========================================
                // MOSTRAR RESULTADOS DE RUTA
                // ==========================================
                resultBox.innerHTML = `
                    <strong>Route successfully calculated:</strong><br>
                    <i class="fa-solid fa-road"></i> <b>Distance:</b> ${kmDistance}<br>
                    <i class="fa-solid fa-clock"></i> <b>Estimated Time:</b> ${duration} (via A1)
                `;

                resultBox.classList.remove("hidden");
            });
        }
    }

    // ==========================================
    // LÓGICA 3: ENVÍO DEL FORMULARIO DE CONTACTO
    // ==========================================

    const serviceForm = document.getElementById("serviceForm");

    if (serviceForm) {

        serviceForm.addEventListener("submit", function (e) {
            e.preventDefault();

            // Datos del formulario
            const name = document.getElementById("fullName").value;
            const subjectSelect = document.getElementById("subject");
            const subjectText = subjectSelect.options[subjectSelect.selectedIndex].text;

            // ==========================================
            // CONFIRMACIÓN DE ENVÍO
            // ==========================================
            // Mensaje de confirmación simulado tras el envío
            alert(`Thank you, ${name}! Your request regarding "${subjectText}" has been successfully processed by our technical department.`);

            // Reinicio del formulario tras el envío
            serviceForm.reset();
        });
    }

}); // Fin del DOMContentLoaded