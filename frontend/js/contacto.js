document.addEventListener("DOMContentLoaded", function () {
    
    // 1. COORDENADAS DEL NEGOCIO (Ginebra, Suiza - 24 Horology Row)
    const businessCoords = [46.2044, 6.1432]; 

    // 2. INICIALIZAR EL MAPA DINÁMICO (Usa OpenStreetMap sin coste de API keys)
    const map = L.map('map').setView(businessCoords, 14);

    // Capa visual del mapa (Estilo claro/limpio adaptado a la estética)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
    }).addTo(map);

    // Añadir el marcador físico del taller en el mapa
    const businessMarker = L.marker(businessCoords).addTo(map)
        .bindPopup('<b>Chronos Atelier Headquarters</b><br>24 Horology Row, Geneva.')
        .openPopup();

    // Variable para almacenar líneas de ruta previas
    let currentRouteLine = null;

    // 3. CÁLCULO DE LA RUTA DEL CLIENTE (Cumpliendo el enunciado del mapa interactivo)
    const calculateBtn = document.getElementById("calculateRouteBtn");
    const locationInput = document.getElementById("userLocation");
    const resultBox = document.getElementById("routeResult");

    calculateBtn.addEventListener("click", function () {
        const userCity = locationInput.value.trim();

        if (userCity === "") {
            alert("Por favor, introduce una ciudad de origen para trazar la ruta.");
            return;
        }

        // Simulación de Geocodificación para simular rutas reales desde puntos clave de Europa
        let startCoords = [48.8566, 2.3522]; // Por defecto: París, Francia
        let kmDistance = "540 km";
        let duration = "5h 15 min";

        if (userCity.toLowerCase().includes("mil") || userCity.toLowerCase().includes("milán")) {
            startCoords = [45.4642, 9.1900];
            kmDistance = "318 km";
            duration = "3h 45 min";
        } else if (userCity.toLowerCase().includes("barc") || userCity.toLowerCase().includes("lleida")) {
            startCoords = [41.3851, 2.1734];
            kmDistance = "790 km";
            duration = "7h 50 min";
        } else if (userCity.toLowerCase().includes("zur") || userCity.toLowerCase().includes("gúrich")) {
            startCoords = [47.3769, 8.5417];
            kmDistance = "278 km";
            duration = "2h 50 min";
        }

        // Eliminar trazado de ruta anterior si existiese
        if (currentRouteLine) {
            map.removeLayer(currentRouteLine);
        }

        // Dibujar la línea de ruta (Polyline) en color azul corporativo sobre el mapa dinámico
        currentRouteLine = L.polyline([startCoords, businessCoords], {
            color: '#2b4360',
            weight: 4,
            dashArray: '5, 10',
            opacity: 0.8
        }).addTo(map);

        // Autoajustar el zoom del mapa para encuadrar perfectamente la posición del cliente y el negocio
        const bounds = L.latLngBounds([startCoords, businessCoords]);
        map.fitBounds(bounds, { padding: [50, 50] });

        // Mostrar cuadro de información de ruta calculada en el panel lateral
        resultBox.innerHTML = `
            <strong>Ruta calculada con éxito:</strong><br>
            <i class="fa-solid fa-road"></i> <b>Distancia:</b> ${kmDistance}<br>
            <i class="fa-solid fa-clock"></i> <b>Tiempo estimado:</b> ${duration} (vía A1)
        `;
        resultBox.classList.remove("hidden");
    });

    // 4. ENVÍO DEL FORMULARIO DE CONSULTA
    const serviceForm = document.getElementById("serviceForm");
    serviceForm.addEventListener("submit", function (e) {
        e.preventDefault();
        
        const name = document.getElementById("fullName").value;
        const subjectSelect = document.getElementById("subject");
        const subjectText = subjectSelect.options[subjectSelect.selectedIndex].text;

        alert(`¡Gracias, ${name}! Tu solicitud sobre "${subjectText}" ha sido procesada de manera correcta por el departamento técnico.`);
        serviceForm.reset();
    });
});