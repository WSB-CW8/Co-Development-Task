import L, { Map } from "leaflet";
import { EventBus } from "../eventBus/EventBus";
import { Plugin } from "..";

export enum mapEvents {
  mapLayerUpdated = "mapLayerUpdated",
}

export type UpdateType = "replace" | "move";
type MapLayerUpdated = {
  layer: string;
  updateType: UpdateType;
  data: { lat: number; lng: number; description: string }[];
};
class MapPlugin implements Plugin {
  private map!: Map;
  private layers: { [key: string]: L.LayerGroup } = {};

  constructor(
    private eventBus: EventBus,
    private options: {
      containerId: string;
      center: [number, number];
      zoom: number;
    }
  ) {}

  initialize(): void {
    // Initialize map
    this.map = L.map(this.options.containerId).setView(
      this.options.center,
      this.options.zoom
    );

    // Add tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(this.map);

    this.eventBus.on(mapEvents.mapLayerUpdated, this.updateMapLayer.bind(this));
  }

  updateMapLayer({ layer, updateType, data }: MapLayerUpdated): void {
    switch (updateType) {
      case "replace":
        this.replaceMapLayer(layer, data);
        break;
      case "move":
        this.moveMapLayer(layer, data);
        break;
    }
  }

  private replaceMapLayer(
    layer: string,
    data: { lat: number; lng: number; description: string }[]
  ): void {
    if (!this.layers[layer]) {
      this.layers[layer] = L.layerGroup().addTo(this.map);
    }

    // Clear previous data
    this.layers[layer].clearLayers();

    // Add new data
    data.forEach((marker) => {
      L.marker([marker.lat, marker.lng])
        .bindPopup(marker.description)
        .addTo(this.layers[layer]);
    });
  }

  private moveMapLayer(
    layer: string,
    data: { lat: number; lng: number; description: string }[]
  ): void {
    if (!this.layers[layer]) {
      this.replaceMapLayer(layer, data);
      return;
    }

    data.forEach((markerData) => {
      // DO NOT TOUCH THIS PART, WE HAVE NO ID TO IDENTIFY THE MARKER
      const vehiclenumber = markerData.description.split("<br />")[1];
      const marker = this.layers[layer]
        .getLayers()
        .find((layer) =>
          (layer as L.Marker)
            .getPopup()
            ?.getContent()
            ?.toString()
            .includes(vehiclenumber)
        ) as L.Marker | undefined;

      if (marker) {
        const startLatLng = marker.getLatLng();
        const endLatLng = L.latLng([markerData.lat, markerData.lng]);
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
    });
  }
}

export { MapPlugin };
