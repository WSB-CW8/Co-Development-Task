import { PluginWithFetch } from "../core";
import { EventBus } from "../eventBus/EventBus";
import { events } from "../eventBus/events";
import { BusData } from "../types/types";

class BusPlugin implements PluginWithFetch {
  private buses: BusData[] = [];
  private filteredBuses: BusData[] = [];

  constructor(private eventBus: EventBus) {}

  initialize(): void {
    // Subscribe to filter changes
    this.eventBus.on(events.busDataFilterChanged, this.filterBuses.bind(this));
    this.eventBus.on(events.busDataFetchNewData, this.fetchData.bind(this));

    // Fetch initial buses
    this.fetchData();
  }

  destroy(): void {
    // Unsubscribe from events
    this.eventBus.off(events.busDataFilterChanged, this.filterBuses.bind(this));

    // Clear buses data
    this.buses = [];
    this.filteredBuses = [];
  }

  async fetchData(): Promise<void> {
    const apiUrl = import.meta.env.VITE_API_URL;
    try {
      const response = await fetch(apiUrl + "/buses");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = (await response.json()) as { result: BusData[] };
      this.buses = data.result;
      this.filteredBuses = data.result;

      // Emit the updated bus data
      this.eventBus.emit(events.busDataUpdated, this.filteredBuses);
    } catch (error) {
      this.eventBus.emit(events.busDataError, error);
      console.error("Failed to fetch bus data:", error);
    }
  }

  private filterBuses(line: string): void {
    if (!line) {
      this.filteredBuses = this.buses;
    } else {
      this.filteredBuses = this.buses.filter((bus) => bus.lines.includes(line));
    }

    // Emit the filtered data
    this.eventBus.emit(events.busDataFiltered, this.filteredBuses);
  }
}

export { BusPlugin };
