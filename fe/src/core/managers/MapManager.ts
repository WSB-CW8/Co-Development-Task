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

    eventBus.on(events.busDataUpdated, (buses: BusData[]) => {
      if (!this.markers.length) {
        this.updateBuses(buses);
        return;
      }

      for (const bus of buses) {
        this.moveMarker(bus.vehiclenumber, bus.lat, bus.lon);
      }
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

  moveMarker(vehicleNumber: string, newLat: number, newLon: number): void {
    const marker = this.markers.find((marker) =>
      marker
        .getPopup()
        ?.getContent()
        ?.toString()
        .includes(`Vehicle: ${vehicleNumber}`)
    );

    if (marker) {
      const startLatLng = marker.getLatLng();
      const endLatLng = L.latLng([newLat, newLon]);
      const duration = 1000; // 1 second
      const startTime = performance.now();

      const animateMarker = (currentTime: number) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);

        const currentLat =
          startLatLng.lat + (endLatLng.lat - startLatLng.lat) * progress;
        const currentLng =
          startLatLng.lng + (endLatLng.lng - startLatLng.lng) * progress;

        marker.setLatLng([currentLat, currentLng]);

        if (progress < 1) {
          requestAnimationFrame(animateMarker);
        }
      };

      requestAnimationFrame(animateMarker);
    }
  }

  getMarkers(): Marker[] {
    return this.markers;
  }
}

export { MapManager };
