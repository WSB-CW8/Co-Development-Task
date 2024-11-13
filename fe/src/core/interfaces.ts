export interface BasePlugin {
  initialize(): void;
}

export interface BaseRenderer<T> {
  render(data: T): void;
}

export interface BaseDataFetcher<T> {
  fetchData(path: string): Promise<T>;
}
