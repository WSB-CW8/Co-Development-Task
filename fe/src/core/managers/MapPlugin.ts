import L, { Icon, Marker, Map } from "leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { BusData } from "../types/types";
import { events } from "../eventBus/events";
import { EventBus } from "../eventBus/EventBus";
import { Plugin } from "../core";

class MapPlugin implements Plugin {
  private map!: Map;
  private markers: Marker[] = [];

  constructor(
    private eventBus: EventBus,
    private containerId: string,
    private center: [number, number],
    private zoom: number
  ) {}

  initialize(): void {
    // Initialize map
    this.map = L.map(this.containerId).setView(this.center, this.zoom);

    // Add tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(this.map);

    // Listen for events from the EventBus
    this.eventBus.on(events.busDataUpdated, (buses: BusData[]) => {
      if (!this.markers.length) {
        this.updateBuses(buses);
        return;
      }

      for (const bus of buses) {
        this.moveMarker(bus.vehiclenumber, bus.lat, bus.lon);
      }
    });

    this.eventBus.on(events.busDataFiltered, (buses: BusData[]) => {
      this.updateBuses(buses);
    });
  }

  destroy(): void {
    // Clean up markers and map instance
    this.clearMarkers();
    this.map.remove();
  }

  private addMarker(lat: number, lon: number, description: string): Marker {
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

  private clearMarkers(): void {
    this.markers.forEach((marker) => this.map.removeLayer(marker));
    this.markers = [];
  }

  private updateBuses(buses: BusData[]): void {
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

  private moveMarker(
    vehicleNumber: string,
    newLat: number,
    newLon: number
  ): void {
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
}

export { MapPlugin };
