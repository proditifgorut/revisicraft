export class StateManager {
  constructor() {
    this.state = {
      currentUser: null,
      cart: [],
      products: [],
      filteredProducts: [],
      categories: [],
      orders: [],
      currentTransaction: {
        items: [],
        subtotal: 0,
        tax: 0,
        total: 0,
        payment: 0,
        change: 0
      },
      currentModal: { type: null, data: null },
    };
    this.listeners = {};
  }

  init() {
    // State is initialized by managers
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.emit('stateChanged', this.state);
  }

  getState() {
    return this.state;
  }

  on(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  emit(event, data) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(callback => callback(data));
    }
  }
}
