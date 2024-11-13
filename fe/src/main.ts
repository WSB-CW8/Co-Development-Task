import "./style.css";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { busPlugin } from "./core/plugins/BusPlugin";
import { mapPlugin } from "./core/plugins/MapPlugin";
import { Root } from "./core/root";
import { DataFetcher } from "./core/utils/dataFetcher";
import { MarkerRenderer } from "./core/renderers/MarkerRenderer";
import { titlePlugin } from "./core/plugins/TitlePlugin";

const API_URL = import.meta.env.VITE_API_URL;

const dataFetcher = new DataFetcher(API_URL);

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
<div id="map"></div>
`;

const mapInstance = L.map("map"); // Assuming you have a map instance

const main = new Root([
  titlePlugin("Warsaw Buses"),
  mapPlugin(mapInstance),
  busPlugin(dataFetcher, new MarkerRenderer(mapInstance)),
]);

main.initialize();
