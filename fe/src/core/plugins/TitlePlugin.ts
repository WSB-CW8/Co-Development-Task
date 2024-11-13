import { BasePlugin } from "../interfaces";

class TitlePlugin implements BasePlugin {
  private title: string;

  constructor(title: string) {
    this.title = title;
  }

  initialize(): void {
    const titleElement = document.createElement("h1");
    titleElement.innerText = this.title;
    document.body.prepend(titleElement);
  }
}

export const titlePlugin = (title: string): BasePlugin => {
  return new TitlePlugin(title);
};
