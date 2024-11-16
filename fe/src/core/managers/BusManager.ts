import { EventBus } from "../eventBus/EventBus";
import { events } from "../eventBus/events";
import { BusData } from "../types/types";

class BusManager {
  private buses: BusData[] = [];
  private filteredBuses: BusData[] = [];

  constructor(private eventBus: EventBus) {
    eventBus.on(events.busDataFilterChanged, (line: string) => {
      this.filterBuses(line);
    });
  }

  async fetchBuses(apiUrl: string, filter: string): Promise<void> {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = (await response.json()) as { result: BusData[] };
      this.buses = data.result;
      this.filteredBuses = this.filterBuses(filter);
      this.eventBus.emit(events.busDataUpdated, this.filteredBuses);
    } catch (error) {
      this.eventBus.emit(events.busDataError, error);
      console.error("Failed to fetch bus data:", error);
    }
  }

  filterBuses(line: string): BusData[] {
    if (!line) {
      this.filteredBuses = this.buses;
    } else {
      this.filteredBuses = this.buses.filter((bus) => bus.lines.includes(line));
    }
    this.eventBus.emit(events.busDataFiltered, this.filteredBuses);

    return this.filteredBuses;
  }
}

export { BusManager };
