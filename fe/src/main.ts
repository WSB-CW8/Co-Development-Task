import "./style.css";
import "leaflet/dist/leaflet.css";

import { Core } from "./core/core";
import { eventBus } from "./core/eventBus/EventBus";
import { MapPlugin } from "./core/managers/MapPlugin";
import { UIPlugin } from "./core/managers/UIPlugin";
import { BusPlugin } from "./core/managers/BusPlugin";
import { PeriodicEmitterPlugin } from "./core/managers/PeriodicEmitterPlugin";
import { events } from "./core/eventBus/events";

// Main App Initialization
document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
    <h1>Bus Tracker</h1>
    <div id="map"></div>
`;

// Create Core
const core = new Core(eventBus);

// Instantiate Plugins
const mapPlugin = new MapPlugin(eventBus, "map", [52.259788, 21.040546], 13);
const uiPlugin = new UIPlugin(eventBus);
const busPlugin = new BusPlugin(eventBus);
const refreshBusDataPlugin = new PeriodicEmitterPlugin(
  eventBus,
  events.busDataFetchNewData,
  0,
  10000
);

// Register Plugins
core.registerPlugin(mapPlugin);
core.registerPlugin(uiPlugin);
core.registerPlugin(busPlugin);
core.registerPlugin(refreshBusDataPlugin);

// Initialize Plugins
core.initializePlugins();
