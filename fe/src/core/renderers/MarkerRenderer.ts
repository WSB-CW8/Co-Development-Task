import { BaseRenderer } from "../interfaces";
import { BusData } from "../types";
import L from "leaflet";

export class MarkerRenderer implements BaseRenderer<BusData[]> {
  private map: L.Map;

  constructor(map: L.Map) {
    this.map = map;
  }

  render(data: BusData[]): void {
    if (!data) {
      // TODO: SOME BETTER ERROR HANDLING, MAYBE RETRY?
      return console.error("No data to render");
    }

    data.forEach((bus) => {
      L.marker([bus.lat, bus.lon]).addTo(this.map);
    });
  }
}
