import { AuthManager } from './auth/auth-manager.js';
import { Router } from './router/router.js';
import { StateManager } from './state/state-manager.js';
import { UIManager } from './ui/ui-manager.js';
import { ProductManager } from './products/product-manager.js';
import { CartManager } from './cart/cart-manager.js';
import { POSManager } from './pos/pos-manager.js';
import { AdminManager } from './admin/admin-manager.js';
import { ViewRenderer } from './views/ViewRenderer.js';

export class App {
  constructor() {
    this.stateManager = new StateManager();
    this.authManager = new AuthManager(this.stateManager);
    this.productManager = new ProductManager(this.stateManager);
    this.cartManager = new CartManager(this.stateManager, this.productManager);
    this.posManager = new POSManager(this.stateManager, this.productManager, this.authManager);
    this.adminManager = new AdminManager(this.stateManager, this.productManager);
    this.uiManager = new UIManager();
    this.router = new Router();
    this.viewRenderer = new ViewRenderer(this);
    
    this.init();
  }

  init() {
    this.stateManager.init();
    this.authManager.init();
    this.productManager.init();
    this.cartManager.init();
    this.posManager.init();
    this.adminManager.init();
    this.uiManager.init();
    this.router.init();

    this.setupGlobalEvents();
    this.render();
  }

  setupGlobalEvents() {
    document.addEventListener('click', (e) => {
      const target = e.target.closest('[data-action]');
      if (target) {
        e.preventDefault();
        this.handleAction(target.dataset.action, target, e);
      }
    });

    document.addEventListener('submit', (e) => {
      if (e.target.dataset.form) {
        e.preventDefault();
        this.handleForm(e.target.dataset.form, e.target, e);
      }
    });
    
    document.addEventListener('input', (e) => {
        const target = e.target.closest('[data-on-input]');
        if(target) {
            this.handleInput(target.dataset.onInput, target, e);
        }
    });

    this.stateManager.on('stateChanged', () => this.render());
    this.router.on('routeChanged', () => this.render());
  }

  handleAction(action, element, event) {
    const actions = {
      'toggle-menu': () => this.uiManager.toggleMobileMenu(),
      'show-login': () => this.uiManager.showModal('loginModal'),
      'show-register': () => this.uiManager.showModal('registerModal'),
      'logout': () => this.authManager.logout(),
      'add-to-cart': () => this.handleAddToCart(element),
      'buy-now': () => this.handleBuyNow(element),
      'chat-whatsapp': () => this.handleWhatsAppChat(element),
      'navigate': () => this.router.navigate(element.dataset.route),
      'close-modal': () => this.uiManager.hideModal(),
      'remove-from-cart': () => this.cartManager.removeItem(element.dataset.productId),
      'checkout': () => this.router.navigate('/checkout'),
      'pos-add-item': () => this.posManager.addItem(element.dataset.productId),
      'pos-remove-item': () => this.posManager.removeItem(element.dataset.itemId),
      'pos-complete-transaction': () => this.posManager.completeTransaction(document.getElementById('paymentAmount').value),
      'admin-show-add-product': () => this.adminManager.showAddProductModal(),
      'admin-show-edit-product': () => this.adminManager.showEditProductModal(element.dataset.productId),
      'admin-delete-product': () => this.adminManager.deleteProduct(element.dataset.productId),
      'select-product-image': () => this.uiManager.selectProductImage(element.dataset.imageUrl),
    };

    if (actions[action]) actions[action]();
  }

  handleForm(formType, form) {
    const formData = new FormData(form);
    const forms = {
      'login': () => this.authManager.login(formData),
      'register': () => this.authManager.register(formData),
      'add-product': () => this.adminManager.addProduct(formData),
      'edit-product': () => this.adminManager.updateProduct(formData),
      'checkout': () => this.handleCheckout(formData),
      'search': () => {
        const searchInput = form.querySelector('input[name="search"]');
        this.productManager.applyFilters({ search: searchInput.value });
        this.router.navigate('/products');
      }
    };

    if (forms[formType]) forms[formType]();
  }
  
  handleInput(inputType, input) {
    const inputs = {
        'update-cart-quantity': () => this.cartManager.updateQuantity(input.dataset.productId, parseInt(input.value)),
        'pos-calculate-change': () => this.posManager.calculateChange(input.value),
        'filter-products': () => this.productManager.applyFilters({
            category: document.getElementById('categoryFilter').value,
            price: document.getElementById('priceFilter').value,
            sort: document.getElementById('sortFilter').value,
        }),
    };
    if(inputs[inputType]) inputs[inputType]();
  }

  handleAddToCart(element) {
    const user = this.authManager.getCurrentUser();
    if (!user) {
      this.uiManager.showNotification('Silakan login terlebih dahulu', 'warning');
      this.uiManager.showModal('loginModal');
      return;
    }
    const quantityInput = document.getElementById('quantity');
    const quantity = quantityInput ? parseInt(quantityInput.value) : 1;
    this.cartManager.addItem(element.dataset.productId, quantity);
    this.uiManager.showNotification('Produk berhasil ditambahkan', 'success');
  }

  handleBuyNow(element) {
    const user = this.authManager.getCurrentUser();
    if (!user) {
      this.uiManager.showNotification('Silakan login terlebih dahulu', 'warning');
      this.uiManager.showModal('loginModal');
      return;
    }
    const quantityInput = document.getElementById('quantity');
    const quantity = quantityInput ? parseInt(quantityInput.value) : 1;
    this.cartManager.clearCart();
    this.cartManager.addItem(element.dataset.productId, quantity);
    this.router.navigate('/checkout');
  }

  handleWhatsAppChat(element) {
    const productName = element.dataset.productName;
    const adminPhone = '6281234567890';
    const message = encodeURIComponent(`Halo Alatacraft, saya tertarik dengan produk ${productName}`);
    window.open(`https://api.whatsapp.com/send?phone=${adminPhone}&text=${message}`, '_blank');
  }

  handleCheckout(formData) {
    this.uiManager.showNotification('Pesanan berhasil dibuat! (Simulasi)', 'success');
    this.cartManager.clearCart();
    this.router.navigate('/dashboard');
  }

  render() {
    this.viewRenderer.render();
  }
}

export function initializeApp() {
  window.app = new App();
}
