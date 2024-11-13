import L, { LatLngExpression } from "leaflet";
import { BasePlugin } from "../interfaces";

const TILE_URL = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
const ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>';

const WARSAW_COORDINATES: LatLngExpression = [52.259788, 21.040546];
const ZOOM = 13;

class MapPlugin implements BasePlugin {
  private map: L.Map;

  constructor(map: L.Map) {
    this.map = map;
  }

  initialize(): void {
    this.map.setView(WARSAW_COORDINATES, ZOOM);
    L.tileLayer(TILE_URL, {
      attribution: ATTRIBUTION,
    }).addTo(this.map);
  }
}

export const mapPlugin = (map: L.Map): BasePlugin => {
  return new MapPlugin(map);
};
