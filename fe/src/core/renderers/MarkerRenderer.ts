import { BaseRenderer } from "../interfaces";
import { BusData } from "../types";
import L, { Icon } from "leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";

type MarkerRendererOptions = {
  iconUrl: string;
  iconSize: [number, number];
  iconAnchor: [number, number];
};

export class MarkerRenderer implements BaseRenderer<BusData[]> {
  private map: L.Map;
  private options?: MarkerRendererOptions;

  constructor(map: L.Map, options?: MarkerRendererOptions) {
    this.map = map;
    this.options = options;
  }

  render(data: BusData[]): void {
    if (!data) {
      // TODO: SOME BETTER ERROR HANDLING, MAYBE RETRY?
      return console.error("No data to render");
    }

    data.forEach((bus) => {
      const busValues = Object.entries(bus).map((value) => {
        return `${value[0]}: ${value[1]}`;
      });

      const marker = L.marker([bus.lat, bus.lon], {
        icon: new Icon({
          iconUrl: this.options?.iconUrl ?? markerIconPng,
          iconSize: this.options?.iconSize ?? [25, 41],
          iconAnchor: this.options?.iconAnchor ?? [12, 41],
        }),
      }).addTo(this.map);

      marker.bindPopup(busValues.join("<br/>"));
    });
  }
}
