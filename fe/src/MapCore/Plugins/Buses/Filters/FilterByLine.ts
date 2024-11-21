import { EventBus } from "../../../eventBus/EventBus";

import { BusData, Filter } from "../../../types/types";
import { events } from "../BusPlugin";

class FilterBusesByLineSelected implements Filter<BusData> {
  private selectElement: HTMLSelectElement;
  private selectedLine: string;

  constructor(
    private eventBus: EventBus,
    private options: {
      selectElementId: string;
    }
  ) {
    this.selectElement = document.getElementById(
      this.options.selectElementId
    ) as HTMLSelectElement;

    this.eventBus.on(events.busDataFetched, (buses: BusData[]) => {
      const uniqueLines = [...new Set(buses.map((bus) => bus.lines))];

      this.selectElement.innerHTML = uniqueLines
        .map((line) => `<option value="${line}">${line}</option>`)
        .join("");

      this.selectElement.innerHTML =
        `<option value="">All</option>` + this.selectElement.innerHTML;
    });

    this.selectedLine = "";

    this.selectElement.addEventListener("change", () => {
      this.selectedLine = this.selectElement.value;
      this.eventBus.emit(events.busDataFilterChanged, null);
    });
  }

  filter(data: BusData[]): BusData[] {
    if (!this.selectedLine) {
      return data;
    }

    return data.filter((bus) => bus.lines === this.selectedLine);
  }
}

export { FilterBusesByLineSelected };
