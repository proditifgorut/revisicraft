export class CartManager {
  constructor(stateManager, productManager) {
    this.stateManager = stateManager;
    this.productManager = productManager;
  }

  init() {
    const savedCart = localStorage.getItem('alatacraft_cart');
    if (savedCart) {
      this.stateManager.setState({ cart: JSON.parse(savedCart) });
    }
  }

  _saveCart(cart) {
    localStorage.setItem('alatacraft_cart', JSON.stringify(cart));
    this.stateManager.setState({ cart });
  }

  addItem(productId, quantity = 1) {
    let cart = [...this.stateManager.getState().cart];
    const existingItem = cart.find(item => item.productId === parseInt(productId));
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ productId: parseInt(productId), quantity });
    }
    this._saveCart(cart);
  }

  removeItem(productId) {
    let cart = this.stateManager.getState().cart.filter(item => item.productId !== parseInt(productId));
    this._saveCart(cart);
  }

  updateQuantity(productId, quantity) {
    if (quantity <= 0) {
      this.removeItem(productId);
      return;
    }
    let cart = this.stateManager.getState().cart.map(item => 
      item.productId === parseInt(productId) ? { ...item, quantity } : item
    );
    this._saveCart(cart);
  }

  clearCart() {
    this._saveCart([]);
  }

  getItemsWithDetails() {
    const { cart } = this.stateManager.getState();
    return cart.map(item => {
      const product = this.productManager.getProduct(item.productId);
      return {
        ...item,
        product,
        subtotal: product ? product.price * item.quantity : 0
      };
    }).filter(item => item.product); // Filter out items where product might not be found
  }

  getItemCount() {
    return this.stateManager.getState().cart.reduce((total, item) => total + item.quantity, 0);
  }

  getTotal() {
    return this.getItemsWithDetails().reduce((total, item) => total + item.subtotal, 0);
  }
}
