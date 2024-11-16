import { EventBus } from "./eventBus/EventBus";

export interface Plugin {
  initialize(): void; // Called by the core to initialize the plugin
  destroy?(): void; // Optional cleanup logic
}

export interface PluginWithFetch extends Plugin {
  fetchData(apiUrl: string): Promise<void>;
}

export class Core {
  private plugins: Plugin[] = [];
  private eventBus: EventBus;

  constructor(eventBus: EventBus) {
    this.eventBus = eventBus;
  }

  getEventBus(): EventBus {
    return this.eventBus;
  }

  registerPlugin(plugin: Plugin): void {
    this.plugins.push(plugin);
  }

  initializePlugins(): void {
    this.plugins.forEach((plugin) => plugin.initialize());
  }

  destroyPlugins(): void {
    this.plugins.forEach((plugin) => plugin.destroy?.());
  }
}
