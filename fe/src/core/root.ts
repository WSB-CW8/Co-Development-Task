import { BasePlugin } from "./interfaces";

export class Root {
  private plugins: BasePlugin[];

  constructor(plugins: BasePlugin[]) {
    this.plugins = plugins;
  }

  async initialize() {
    for (const plugin of this.plugins) {
      plugin.initialize();
    }
  }
}
