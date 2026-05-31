document.addEventListener("DOMContentLoaded", function () {
    
    // ==========================================================================
    // LÓGICA DEL MAPA INTERACTIVO (LEAFLET.JS)
    // ==========================================================================
    const mapContainer = document.getElementById('map');
    
    if (mapContainer) {
        / * 1. COORDENADAS DEL NEGOCIO (Ginebra, Suiza - 24 Horology Row) * /
        const businessCoords = [46.2044, 6.1432]; 

        / * 2. INICIALIZAR EL MAPA DINÁMICO (Usa OpenStreetMap - Sin necesidad de claves API) * /
        const map = L.map('map').setView(businessCoords, 14);

        // Capa de diseño visual del mapa (Estilo claro y limpio adaptado a la estética corporativa)
        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> colaboradores &copy; <a href="https://carto.com/attributions">CARTO</a>'
        }).addTo(map);

        // Añadir el marcador físico del taller dentro del mapa interactivo
        L.marker(businessCoords).addTo(map)
            .bindPopup('<b>Sede Central de Chronos Atelier</b><br>24 Horology Row, Ginebra.')
            .openPopup();

        // Variable global interna para almacenar de forma segura el trazado de la ruta anterior
        let currentRouteLine = null;

        / * 3. MECANISMO DE CÁLCULO DE RUTAS DINÁMICAS * /
        const calculateBtn = document.getElementById("calculateRouteBtn");
        const locationInput = document.getElementById("userLocation");
        const resultBox = document.getElementById("routeResult");

        // Asegurar que los elementos del DOM existen antes de asignar los escuchadores de rutas
        if (calculateBtn && locationInput && resultBox) {
            calculateBtn.addEventListener("click", function () {
                const userCity = locationInput.value.trim();

                if (userCity === "") {
                    alert("Por favor, introduzca una ciudad de origen para calcular la ruta.");
                    return;
                }

                // Geocodificación simulada para trazar rutas desde puntos clave europeos
                let startCoords = [48.8566, 2.3522]; // Valor por defecto en caso de fallo: París, Francia
                let kmDistance = "540 km";
                let duration = "5h 15 min";

                // Mapeo condicional de rutas simuladas según la entrada del usuario
                if (userCity.toLowerCase().includes("mil")) {
                    startCoords = [45.4642, 9.1900]; // Milán, Italia
                    kmDistance = "318 km";
                    duration = "3h 45 min";
                } else if (userCity.toLowerCase().includes("barc") || userCity.toLowerCase().includes("lleida")) {
                    startCoords = [41.3851, 2.1734]; // Punto de entrada Barcelona / Lleida
                    kmDistance = "790 km";
                    duration = "7h 50 min";
                } else if (userCity.toLowerCase().includes("zur") || userCity.toLowerCase().includes("zúrich")) {
                    startCoords = [47.3769, 8.5417]; // Zúrich, Suiza
                    kmDistance = "278 km";
                    duration = "2h 50 min";
                }

                // Eliminar el trazado de la ruta anterior en el mapa si ya existía uno
                if (currentRouteLine) {
                    map.removeLayer(currentRouteLine);
                }

                // Dibujar la línea poligonal dinámica (Polyline) con el color azul corporativo
                currentRouteLine = L.polyline([startCoords, businessCoords], {
                    color: '#2b4360',
                    weight: 4,
                    dashArray: '5, 10',
                    opacity: 0.8
                }).addTo(map);

                // Auto-ajustar los límites del mapa para encuadrar al cliente y a la sede perfectamente
                const bounds = L.latLngBounds([startCoords, businessCoords]);
                map.fitBounds(bounds, { padding: [50, 50] });

                // Renderizar la plantilla con la información calculada dentro del panel lateral
                resultBox.innerHTML = `
                    <strong>Ruta calculada con éxito:</strong><br>
                    <i class="fa-solid fa-road"></i> <b>Distancia:</b> ${kmDistance}<br>
                    <i class="fa-solid fa-clock"></i> <b>Tiempo estimado:</b> ${duration} (por A1)
                `;
                resultBox.classList.remove("hidden");
            });
        }
    }

    // ==========================================================================
    // GESTIÓN DEL ENVÍO DEL FORMULARIO DE CONTACTO
    // ==========================================================================
    const serviceForm = document.getElementById("serviceForm");
    
    if (serviceForm) {
        serviceForm.addEventListener("submit", function (e) {
            e.preventDefault(); // Detener el envío tradicional del formulario
            
            const name = document.getElementById("fullName").value;
            const subjectSelect = document.getElementById("subject");
            const subjectText = subjectSelect.options[subjectSelect.selectedIndex].text;

            // Alerta de confirmación traducida al castellano para dar feedback al usuario
            alert(`¡Muchas gracias, ${name}! Tu solicitud sobre "${subjectText}" ha sido procesada correctamente por nuestro departamento técnico.`);
            serviceForm.reset(); // Limpiar todos los campos del formulario tras el éxito
        });
    }
});