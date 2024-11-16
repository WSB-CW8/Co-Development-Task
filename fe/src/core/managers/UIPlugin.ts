import { Plugin } from "../core";
import { EventBus } from "../eventBus/EventBus";
import { events } from "../eventBus/events";
import { BusData } from "../types/types";

class UIPlugin implements Plugin {
  private filterSelect: HTMLSelectElement;
  private busLines: string[] = [];

  constructor(private eventBus: EventBus) {
    this.filterSelect = document.createElement("select");
    this.filterSelect.id = "busLineFilter";
  }

  initialize(): void {
    // Set up filter dropdown
    this.initFilterSelect();

    // Listen for bus data updates
    this.eventBus.on(events.busDataUpdated, this.updateOptions.bind(this));
  }

  destroy(): void {
    // Remove event listeners
    this.eventBus.off(events.busDataUpdated, this.updateOptions.bind(this));
    this.filterSelect.removeEventListener("change", this.handleFilterChange);

    // Clean up UI
    this.filterSelect.remove();
  }

  private initFilterSelect(): void {
    // Set up event listener for filter changes
    this.filterSelect.addEventListener(
      "change",
      this.handleFilterChange.bind(this)
    );

    // Append to the app container
    const appContainer = document.querySelector<HTMLDivElement>("#app");
    if (appContainer) {
      appContainer.appendChild(this.filterSelect);
    }
  }

  private handleFilterChange(e: Event): void {
    const line = (e.target as HTMLSelectElement).value;
    this.eventBus.emit(events.busDataFilterChanged, line);
  }

  private updateOptions(buses: BusData[]): void {
    // Avoid redundant updates if options are already populated
    if (this.busLines.length) return;

    // Extract unique bus lines
    this.busLines = Array.from(new Set(buses.map((bus) => bus.lines)));

    // Preserve current selection
    const currentSelection = this.filterSelect.value;

    // Clear existing options and add default
    this.filterSelect.innerHTML = "";
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.text = "All";
    this.filterSelect.appendChild(defaultOption);

    // Populate dropdown with bus lines
    this.busLines.forEach((line) => {
      const option = document.createElement("option");
      option.value = line;
      option.text = line;
      this.filterSelect.appendChild(option);
    });

    // Restore previous selection
    this.filterSelect.value = currentSelection;
  }

  getSelectedLine(): string {
    return this.filterSelect.value;
  }
}

export { UIPlugin };
