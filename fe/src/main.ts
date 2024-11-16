import "./style.css";
import "leaflet/dist/leaflet.css";

import { eventBus } from "./core/eventBus/EventBus";
import { MapManager } from "./core/managers/MapManager";
import { UIManager } from "./core/managers/UIManager";
import { BusManager } from "./core/managers/BusManager";

// Managers

// Main App Initialization
document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
    <h1>Bus Tracker</h1>
    <div id="map"></div>
`;

const mapManager = new MapManager(eventBus, "map", [52.259788, 21.040546], 13);
const busManager = new BusManager(eventBus);
const uiManager = new UIManager(eventBus);

const apiUrl = import.meta.env.VITE_API_URL;

// Initial Data Fetch
setInterval(() => {
  busManager
    .fetchBuses(apiUrl, uiManager.getFilterSelectValue())
    .then(() => console.log("Buses fetched and rendered."));
}, 5000);
