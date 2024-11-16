import L, { Icon, Marker, Map } from "leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { BusData } from "../types/types";
import { events } from "../eventBus/events";
import { EventBus } from "../eventBus/EventBus";

class MapManager {
  private map: Map;
  private markers: Marker[] = [];

  constructor(
    eventBus: EventBus,
    containerId: string,
    center: [number, number],
    zoom: number
  ) {
    this.map = L.map(containerId).setView(center, zoom);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(this.map);

    eventBus.on(events.busDataFetched, (buses: BusData[]) => {
      this.updateBuses(buses);
    });
    eventBus.on(events.busDataFiltered, (buses: BusData[]) => {
      this.updateBuses(buses);
    });
  }

  addMarker(lat: number, lon: number, description: string): Marker {
    const marker = L.marker([lat, lon], {
      icon: new Icon({
        iconUrl: markerIconPng,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
      }),
    }).addTo(this.map);
    marker.bindPopup(description);
    this.markers.push(marker);
    return marker;
  }

  clearMarkers(): void {
    this.markers.forEach((marker) => this.map.removeLayer(marker));
    this.markers = [];
  }

  updateBuses(buses: BusData[]): void {
    this.clearMarkers();
    buses.forEach((bus) => {
      const description = `
        Vehicle: ${bus.vehiclenumber}<br>
        Line: ${bus.lines}<br>
        Time: ${bus.time}<br>
        Brigade: ${bus.brigade}
        `;
      this.addMarker(bus.lat, bus.lon, description);
    });
  }
}

export { MapManager };
