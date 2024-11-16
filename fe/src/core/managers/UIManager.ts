import { EventBus } from "../eventBus/EventBus";
import { events } from "../eventBus/events";
import { BusData } from "../types/types";

class UIManager {
  private filterSelect: HTMLSelectElement;
  private busLines: string[] = [];

  constructor(private eventBus: EventBus) {
    this.filterSelect = document.createElement("select");
    this.filterSelect.id = "busLineFilter";
    this.init();
    this.eventBus.on(events.busDataUpdated, this.updateOptions.bind(this));
  }

  private init(): HTMLSelectElement {
    this.filterSelect.addEventListener("change", (e: Event) => {
      const line = (e.target as HTMLSelectElement).value;
      this.eventBus.emit(events.busDataFilterChanged, line);
    });

    document
      .querySelector<HTMLDivElement>("#app")!
      .appendChild(this.filterSelect);

    return this.filterSelect;
  }

  private updateOptions(buses: BusData[]): void {
    if (this.busLines.length) {
      return;
    }

    this.busLines = Array.from(new Set(buses.map((bus) => bus.lines)));
    const selectValue = this.filterSelect.value;
    this.filterSelect.innerHTML = ""; // Clear existing options
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.text = "All";
    this.filterSelect.appendChild(defaultOption);

    this.busLines.forEach((line) => {
      const option = document.createElement("option");
      option.value = line;
      option.text = line;
      this.filterSelect.appendChild(option);
    });

    this.filterSelect.value = selectValue;
  }

  getFilterSelectValue(): string {
    return this.filterSelect.value;
  }
}

export { UIManager };
