// fronciaki kilka tematów:
// 1. Chcemy tu jakiś package manager czy wyjebongo?
// 2. Chcemy tu jakiś bundler czy wyjebongo?

// Initialize the map
var map = L.map("map").setView([52.259788, 21.040546], 13);

// Load and display tile layer (OpenStreetMap tiles)
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors",
}).addTo(map);

// Function to fetch and render bus data
function fetchAndRenderBusData() {
  fetch("http://localhost:3000/api/buses")
    .then((response) => response.json())
    .then((data) => {
      // Clear existing markers
      map.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          map.removeLayer(layer);
        }
      });

      // Add new markers
      data.forEach((bus) => {
        var marker = L.marker([bus.Lat, bus.Lon]).addTo(map);
        marker.bindPopup(
          `<b>Line:</b> ${bus.Lines}<br>
                    <b>Vehicle Number:</b> ${bus.VehicleNumber}<br>
                    <b>Time:</b> ${bus.Time}<br>
                    <b>Brigade:</b> ${bus.Brigade}`
        );
      });
    })
    .catch((error) => console.error("Error fetching bus data:", error));
}

// Initial fetch and render
fetchAndRenderBusData();

// Fetch and render every 10 seconds
setInterval(fetchAndRenderBusData, 10000);
