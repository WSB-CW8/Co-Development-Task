import { EventBus } from "./eventBus/EventBus";

export interface Plugin {
  initialize(eventBus: EventBus): void;
}

export interface PluginWithFetch extends Plugin {
  fetchData(apiUrl: string): Promise<void>;
}

export class MapCore {
  constructor(
    private eventBus: EventBus,
    private config: { plugins: Plugin[] }
  ) {}

  initializePlugins(): void {
    this.config.plugins.forEach((plugin) => {
      plugin.initialize(this.eventBus);
    });
  }
}
