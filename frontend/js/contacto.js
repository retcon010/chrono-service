document.addEventListener("DOMContentLoaded", function () {
    
    // ==========================================
    // INTERACTIVE MAP LOGIC (LEAFLET.JS)
    // ==========================================
    const mapContainer = document.getElementById('map');
    
    if (mapContainer) {
        // 1. BUSINESS COORDINATES (Geneva, Switzerland - 24 Horology Row)
        const businessCoords = [46.2044, 6.1432]; 

        // 2. INITIALIZE DYNAMIC MAP (Uses OpenStreetMap - No API Keys required)
        const map = L.map('map').setView(businessCoords, 14);

        // Visual map tiles layer (Light/clean style adapted to corporate aesthetics)
        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        }).addTo(map);

        // Add the workshop physical marker onto the interactive map
        L.marker(businessCoords).addTo(map)
            .bindPopup('<b>Chronos Atelier Headquarters</b><br>24 Horology Row, Geneva.')
            .openPopup();

        // Variable to safely store previous route layer traces
        let currentRouteLine = null;

        // 3. ROUTE CALCULATION MECHANISM
        const calculateBtn = document.getElementById("calculateRouteBtn");
        const locationInput = document.getElementById("userLocation");
        const resultBox = document.getElementById("routeResult");

        // Ensure elements exist before binding routing listeners
        if (calculateBtn && locationInput && resultBox) {
            calculateBtn.addEventListener("click", function () {
                const userCity = locationInput.value.trim();

                if (userCity === "") {
                    alert("Please enter a departure city to calculate the route.");
                    return;
                }

                // Simulated Geocoding to trace routes from key European points
                let startCoords = [48.8566, 2.3522]; // Default fallback: Paris, France
                let kmDistance = "540 km";
                let duration = "5h 15 min";

                // Routing conditions mapping
                if (userCity.toLowerCase().includes("mil")) {
                    startCoords = [45.4642, 9.1900]; // Milan, Italy
                    kmDistance = "318 km";
                    duration = "3h 45 min";
                } else if (userCity.toLowerCase().includes("barc") || userCity.toLowerCase().includes("lleida")) {
                    startCoords = [41.3851, 2.1734]; // Barcelona/Lleida entry point
                    kmDistance = "790 km";
                    duration = "7h 50 min";
                } else if (userCity.toLowerCase().includes("zur") || userCity.toLowerCase().includes("zúrich")) {
                    startCoords = [47.3769, 8.5417]; // Zurich, Switzerland (Typo fixed)
                    kmDistance = "278 km";
                    duration = "2h 50 min";
                }

                // Remove previous route trace layer from the map if it exists
                if (currentRouteLine) {
                    map.removeLayer(currentRouteLine);
                }

                // Draw the dynamic Polyline route using corporate blue style
                currentRouteLine = L.polyline([startCoords, businessCoords], {
                    color: '#2b4360',
                    weight: 4,
                    dashArray: '5, 10',
                    opacity: 0.8
                }).addTo(map);

                // Auto-fit bounds to frame both the client and headquarters perfectly
                const bounds = L.latLngBounds([startCoords, businessCoords]);
                map.fitBounds(bounds, { padding: [50, 50] });

                // Render calculated info template inside the lateral panel
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
    // INQUIRY FORM SUBMISSION MANAGEMENT
    // ==========================================
    const serviceForm = document.getElementById("serviceForm");
    
    if (serviceForm) {
        serviceForm.addEventListener("submit", function (e) {
            e.preventDefault();
            
            const name = document.getElementById("fullName").value;
            const subjectSelect = document.getElementById("subject");
            const subjectText = subjectSelect.options[subjectSelect.selectedIndex].text;

            // Feedback alert in English matching site standards
            alert(`Thank you, ${name}! Your request regarding "${subjectText}" has been successfully processed by our technical department.`);
            serviceForm.reset();
        });
    }
});