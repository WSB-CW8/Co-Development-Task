import "./style.css";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  
    <div>
      <h1>Tutaj coś będzie kiedyś</h1>
    </div>
    
    <div id="map"></div>
 
`;

const map = L.map("map").setView([52.259788, 21.040546], 13);

// Load and display tile layer (OpenStreetMap tiles)
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors",
}).addTo(map);
