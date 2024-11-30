import { Plugin } from "../..";
import { EventBus } from "../../eventBus/EventBus";

import { BusData, Filter } from "../../types/types";
import { mapEvents, UpdateType } from "../MapPlugin";

type BusPluginOptions = {
  path: string;
  filters: Filter<BusData>[];
};

export const events = {
  busDataError: "busDataError",
  busDataLoading: "busDataLoading",
  busDataFetched: "busDataFetched",
  busDataUpdated: "busDataUpdated",
  busDataFilterChanged: "busDataFilterChanged",
  busDataFetchNewData: "busDataFetchNewData",
};

class BusPlugin implements Plugin {
  private buses: BusData[] = [];
  private filteredBuses: BusData[] = [];

  constructor(private eventBus: EventBus, private options: BusPluginOptions) {}

  initialize(): void {
    this.eventBus.on(events.busDataFetchNewData, this.fetchData.bind(this));

    // Fetch initial buses
    this.fetchData(true);

    this.eventBus.on(events.busDataFilterChanged, () => {
      this.emitBusData("replace");
    });
  }

  destroy(): void {
    // Clear buses data
    this.buses = [];
    this.filteredBuses = [];
  }

  async fetchData(initialFetch?: boolean): Promise<void> {
    const apiUrl = import.meta.env.VITE_API_URL + "/buses";
    try {
      const response = await fetch(apiUrl + this.options.path);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = (await response.json()) as { result: BusData[] };
      this.buses = data.result;

      this.emitBusData(initialFetch ? "replace" : "move");

      if (initialFetch) {
        this.eventBus.emit(events.busDataFetched, this.buses);
      }
    } catch (error) {
      this.eventBus.emit(events.busDataError, error);
      console.error("Failed to fetch bus data:", error);
    }
  }

  private emitBusData(updateType: UpdateType) {
    this.filteredBuses = this.options.filters.reduce(
      (filteredData, filter) => filter.filter(filteredData),
      this.buses
    );
    // Emit the updated bus data
    this.eventBus.emit(mapEvents.mapLayerUpdated, {
      layer: "buses",
      data: this.filteredBuses.map((bus) => ({
        lat: bus.lat,
        lng: bus.lon,
        description: this.GetDescription(bus),
      })),
      updateType: updateType,
    });
  }

  private GetDescription(bus: BusData): string {
    return Object.entries(bus)
      .map(([key, value]) => `${key}: ${value}`)
      .join("<br />");
  }
}

export { BusPlugin };
