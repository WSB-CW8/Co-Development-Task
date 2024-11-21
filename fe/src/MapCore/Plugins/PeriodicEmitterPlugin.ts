import { Plugin } from "..";
import { EventBus } from "../eventBus/EventBus";

export class PeriodicEmitterPlugin implements Plugin {
  constructor(
    private eventBus: EventBus,
    private options: {
      eventName: string;
      fetchInterval?: number;
      intervalId?: number;
    }
  ) {}

  initialize(): void {
    // Start periodic fetching
    this.startFetching();
  }

  private startFetching(): void {
    this.stopFetching(); // Ensure no duplicate intervals

    this.options.intervalId = setInterval(() => {
      this.eventBus.emit(this.options.eventName, null);
    }, this.options.fetchInterval);
  }

  private stopFetching(): void {
    if (this.options.intervalId !== null) {
      clearInterval(this.options.intervalId);
      this.options.intervalId = undefined;
    }
  }
}
