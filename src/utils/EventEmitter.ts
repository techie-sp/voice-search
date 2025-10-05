type Listener<T> = (payload: T) => void;

export default class EventEmitter<T = any> {
  private listeners = new Set<Listener<T>>();

  addListener(listener: Listener<T>) {
    this.listeners.add(listener);
  }

  removeListener(listener: Listener<T>) {
    this.listeners.delete(listener);
  }

  emit(payload: T) {
    this.listeners.forEach((listener) => listener(payload));
  }
}
