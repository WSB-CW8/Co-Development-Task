import { BaseDataFetcher, BasePlugin, BaseRenderer } from "../interfaces";
import { BusData } from "../types";

const BUS_API_PATH = "/buses";

class BusPlugin implements BasePlugin {
  private dataFetcher: BaseDataFetcher<BusData[]>;
  private renderer: BaseRenderer<BusData[]>;

  constructor(
    dataFetcher: BaseDataFetcher<BusData[]>,
    renderer: BaseRenderer<BusData[]>
  ) {
    this.renderer = renderer;
    this.dataFetcher = dataFetcher;
  }

  async initialize(): Promise<void> {
    try {
      const data = await this.dataFetcher.fetchData(BUS_API_PATH);
      this.renderer.render(data);
    } catch (e) {
      console.error("Failed to fetch data", e);
    }
  }
}

export const busPlugin = (
  dataFetcher: BaseDataFetcher<BusData[]>,
  renderer: BaseRenderer<BusData[]>
): BasePlugin => {
  return new BusPlugin(dataFetcher, renderer);
};
