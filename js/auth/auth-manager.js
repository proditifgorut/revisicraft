export class AuthManager {
  constructor(stateManager) {
    this.stateManager = stateManager;
    this.listeners = {};
    this.mockUsers = [
        { id: 1, email: 'admin@alatacraft.com', password: 'admin123', name: 'Admin Utama', role: 'admin' },
        { id: 2, email: 'mitra@alatacraft.com', password: 'mitra123', name: 'Mitra Jaya', role: 'partner' },
        { id: 3, email: 'customer@alatacraft.com', password: 'customer123', name: 'Budi Pelanggan', role: 'customer' }
    ];
  }

  init() {
    const savedUser = localStorage.getItem('alatacraft_user');
    if (savedUser) {
      this.stateManager.setState({ currentUser: JSON.parse(savedUser) });
    }
    const savedUsers = localStorage.getItem('alatacraft_users');
    if(savedUsers) {
        this.mockUsers = JSON.parse(savedUsers);
    }
  }

  on(event, callback) {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event].push(callback);
  }

  emit(event, data) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(callback => callback(data));
    }
  }

  getCurrentUser() {
    return this.stateManager.getState().currentUser;
  }
  
  getAllUsers() {
    return this.mockUsers;
  }

  async login(formData) {
    const email = formData.get('email');
    const password = formData.get('password');
    const user = this.mockUsers.find(u => u.email === email && u.password === password);
    
    if (user) {
      const { password: _, ...userToSave } = user;
      localStorage.setItem('alatacraft_user', JSON.stringify(userToSave));
      this.stateManager.setState({ currentUser: userToSave });
      this.showNotification('Login berhasil!', 'success');
      this.hideModal();
    } else {
      this.showNotification('Email atau password salah', 'error');
    }
  }

  async register(formData) {
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');

    if (password !== confirmPassword) {
      this.showNotification('Password tidak cocok', 'error');
      return;
    }
    
    if (this.mockUsers.some(u => u.email === email)) {
        this.showNotification('Email sudah terdaftar', 'error');
        return;
    }

    const newUser = { id: Date.now(), name, email, password, role: 'customer' };
    this.mockUsers.push(newUser);
    localStorage.setItem('alatacraft_users', JSON.stringify(this.mockUsers));

    const { password: _, ...userToSave } = newUser;
    localStorage.setItem('alatacraft_user', JSON.stringify(userToSave));
    this.stateManager.setState({ currentUser: userToSave });
    
    this.showNotification('Registrasi berhasil!', 'success');
    this.hideModal();
  }

  logout() {
    localStorage.removeItem('alatacraft_user');
    this.stateManager.setState({ currentUser: null, cart: [] });
    localStorage.removeItem('alatacraft_cart');
    this.showNotification('Logout berhasil', 'success');
    // We navigate to home, the router will trigger a re-render
    window.app.router.navigate('/');
  }

  showNotification(message, type) {
    document.dispatchEvent(new CustomEvent('showNotification', { detail: { message, type } }));
  }

  hideModal() {
    document.dispatchEvent(new CustomEvent('hideModal'));
  }
}
