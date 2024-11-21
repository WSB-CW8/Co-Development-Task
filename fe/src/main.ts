import "./style.css";
import "leaflet/dist/leaflet.css";

import { MapCore } from "./MapCore";
import { eventBus } from "./MapCore/eventBus/EventBus";
import { MapPlugin } from "./MapCore/Plugins/MapPlugin";
import { BusPlugin, events } from "./MapCore/Plugins/Buses/BusPlugin";
import { PeriodicEmitterPlugin } from "./MapCore/Plugins/PeriodicEmitterPlugin";

import { FilterBusesByLineSelected } from "./MapCore/Plugins/Buses/Filters/FilterByLine";

// Create more if needed.
const PeriodicBusFetcher = PeriodicEmitterPlugin;

const mapCore = new MapCore(eventBus, {
  plugins: [
    new MapPlugin(eventBus, {
      containerId: "map",
      center: [52.259788, 21.040546],
      zoom: 13,
    }),
    new BusPlugin(eventBus, {
      path: "/buses",
      filters: [
        new FilterBusesByLineSelected(eventBus, {
          selectElementId: "bus-lines-filter",
        }),
      ],
    }),
    new PeriodicBusFetcher(eventBus, {
      eventName: events.busDataFetchNewData,
      intervalId: 0,
      fetchInterval: 10000,
    }),
  ],
});


// Initialize Plugins
mapCore.initializePlugins();

