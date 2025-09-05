export class AdminManager {
  constructor(stateManager, productManager) {
    this.stateManager = stateManager;
    this.productManager = productManager;
  }

  init() {}

  showAddProductModal() {
    this.stateManager.setState({ currentModal: { type: 'product-form', data: null } });
    window.app.uiManager.showModal('formModal');
  }

  showEditProductModal(productId) {
    const product = this.productManager.getProduct(productId);
    this.stateManager.setState({ currentModal: { type: 'product-form', data: product } });
    window.app.uiManager.showModal('formModal');
  }

  addProduct(formData) {
    const productData = this._formDataToObject(formData);
    this.productManager.addProduct(productData);
    this._notifyAndClose('Produk berhasil ditambahkan!');
  }

  updateProduct(formData) {
    const productData = this._formDataToObject(formData);
    this.productManager.updateProduct(productData);
    this._notifyAndClose('Produk berhasil diperbarui!');
  }

  deleteProduct(productId) {
    if (confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
      this.productManager.deleteProduct(parseInt(productId));
      this._notifyAndClose('Produk berhasil dihapus!');
    }
  }
  
  _formDataToObject(formData) {
    return {
      id: formData.get('id') ? parseInt(formData.get('id')) : null,
      name: formData.get('name'),
      description: formData.get('description'),
      price: parseInt(formData.get('price')),
      stock: parseInt(formData.get('stock')),
      categoryId: parseInt(formData.get('categoryId')),
      images: formData.get('images').split(',').map(url => url.trim()),
      featured: formData.get('featured') === 'on'
    };
  }

  _notifyAndClose(message) {
    document.dispatchEvent(new CustomEvent('showNotification', { detail: { message, type: 'success' } }));
    window.app.uiManager.hideModal();
    this.stateManager.setState({ currentModal: { type: null, data: null } });
  }

  // Mock data for dashboards
  getDashboardStats() {
    const products = this.productManager.getAllProducts();
    const users = window.app.authManager.getAllUsers();
    const orders = JSON.parse(localStorage.getItem('alatacraft_pos_transactions') || '[]'); // Using POS as mock orders

    return {
        revenue: orders.reduce((sum, order) => sum + order.total, 0),
        orderCount: orders.length,
        customerCount: users.filter(u => u.role === 'customer').length,
        productCount: products.length
    };
  }
}
