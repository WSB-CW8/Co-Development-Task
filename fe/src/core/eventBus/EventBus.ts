export type EventCallback<T = any> = (...args: T[]) => void;

class EventBus {
  private static instance: EventBus;
  private events: { [key: string]: EventCallback[] };

  private constructor() {
    this.events = {};
  }

  // Get eventbus instance
  static getInstance(): EventBus {
    if (!EventBus.instance) {
      EventBus.instance = new EventBus();
    }

    return EventBus.instance;
  }

  // Subscribe to an event
  on<T>(event: string, callback: EventCallback<T>): void {
    if (!this.events[event]) {
      this.events[event] = [];
    }

    this.events[event].push(callback);
  }

  // Unsubscribe callback function from an event
  off<T>(event: string, callback: EventCallback<T>): void {
    if (!this.events[event]) {
      return;
    }

    this.events[event] = this.events[event].filter((cb) => cb !== callback);
  }

  emit<T>(event: string, data: T) {
    if (!this.events[event]) {
      return;
    }

    this.events[event].forEach((callback) => callback(data));
  }
}

const eventBus = EventBus.getInstance();
export { eventBus, EventBus };
