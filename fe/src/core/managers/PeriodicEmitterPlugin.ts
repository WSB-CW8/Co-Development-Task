import { Plugin } from "../core";
import { EventBus } from "../eventBus/EventBus";
import { events } from "../eventBus/events";

export class PeriodicEmitterPlugin implements Plugin {
  constructor(
    private eventBus: EventBus,
    private eventName: events,
    private intervalId?: number,
    private fetchInterval: number = 10000
  ) {}

  initialize(): void {
    // Start periodic fetching
    this.startFetching();
  }

  destroy(): void {
    // Stop periodic fetching
    this.stopFetching();
  }

  private startFetching(): void {
    this.stopFetching(); // Ensure no duplicate intervals

    this.intervalId = setInterval(() => {
      this.eventBus.emit(this.eventName, null);
    }, this.fetchInterval);
  }

  private stopFetching(): void {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = undefined;
    }
  }
}
