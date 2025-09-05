export class Router {
  constructor() {
    this.routes = {};
    this.currentRoute = { path: '/', params: {} };
    this.listeners = {};
  }

  init() {
    window.addEventListener('popstate', () => {
      this.handleRoute();
    });

    // Handle initial route
    this.handleRoute();
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

  navigate(path) {
    window.history.pushState({}, '', path);
    this.handleRoute();
  }

  handleRoute() {
    const path = window.location.pathname;
    const searchParams = new URLSearchParams(window.location.search);
    
    // Parse route parameters
    const params = {};
    for (const [key, value] of searchParams) {
      params[key] = value;
    }

    this.currentRoute = { path, params };
    this.emit('routeChanged', this.currentRoute);
  }

  getCurrentRoute() {
    return this.currentRoute;
  }
}
