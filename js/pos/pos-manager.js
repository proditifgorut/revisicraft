export class POSManager {
  constructor(stateManager, productManager, authManager) {
    this.stateManager = stateManager;
    this.productManager = productManager;
    this.authManager = authManager;
  }

  init() {
    // POS state is managed in the global state manager
  }

  _updateTransaction(transaction) {
    this.stateManager.setState({ currentTransaction: transaction });
  }

  addItem(productId) {
    const product = this.productManager.getProduct(productId);
    if (!product || product.stock === 0) return;

    let transaction = { ...this.stateManager.getState().currentTransaction };
    let items = [...transaction.items];
    const existingItem = items.find(item => item.productId === parseInt(productId));
    
    if (existingItem) {
      if (existingItem.quantity < product.stock) {
        existingItem.quantity += 1;
        existingItem.subtotal = existingItem.quantity * product.price;
      }
    } else {
      items.push({
        id: Date.now(),
        productId: parseInt(productId),
        product,
        quantity: 1,
        subtotal: product.price
      });
    }
    transaction.items = items;
    this._calculateTotals(transaction);
  }

  removeItem(itemId) {
    let transaction = { ...this.stateManager.getState().currentTransaction };
    transaction.items = transaction.items.filter(item => item.id !== parseInt(itemId));
    this._calculateTotals(transaction);
  }

  _calculateTotals(transaction) {
    transaction.subtotal = transaction.items.reduce((total, item) => total + item.subtotal, 0);
    transaction.tax = Math.round(transaction.subtotal * 0.11); // 11% PPN
    transaction.total = transaction.subtotal + transaction.tax;
    this._updateTransaction(transaction);
  }
  
  calculateChange(paymentAmount) {
      let transaction = { ...this.stateManager.getState().currentTransaction };
      const payment = parseFloat(paymentAmount) || 0;
      transaction.payment = payment;
      transaction.change = payment >= transaction.total ? payment - transaction.total : 0;
      this._updateTransaction(transaction);
  }

  completeTransaction(paymentAmount) {
    let transaction = this.stateManager.getState().currentTransaction;
    if (transaction.items.length === 0) {
      document.dispatchEvent(new CustomEvent('showNotification', { detail: { message: 'Tidak ada item dalam transaksi', type: 'warning' } }));
      return;
    }
    if (parseFloat(paymentAmount) < transaction.total) {
      document.dispatchEvent(new CustomEvent('showNotification', { detail: { message: 'Jumlah pembayaran kurang', type: 'error' } }));
      return;
    }

    const completedTransaction = {
      ...transaction,
      id: Date.now(),
      timestamp: new Date().toISOString(),
      partnerId: this.authManager.getCurrentUser()?.id
    };

    const allTransactions = JSON.parse(localStorage.getItem('alatacraft_pos_transactions') || '[]');
    allTransactions.push(completedTransaction);
    localStorage.setItem('alatacraft_pos_transactions', JSON.stringify(allTransactions));

    this.resetTransaction();
    document.dispatchEvent(new CustomEvent('showNotification', { detail: { message: 'Transaksi berhasil!', type: 'success' } }));
  }

  resetTransaction() {
    this.stateManager.setState({
      currentTransaction: { items: [], subtotal: 0, tax: 0, total: 0, payment: 0, change: 0 }
    });
  }

  getPartnerTransactions() {
      const partnerId = this.authManager.getCurrentUser()?.id;
      const allTransactions = JSON.parse(localStorage.getItem('alatacraft_pos_transactions') || '[]');
      return allTransactions.filter(t => t.partnerId === partnerId).sort((a,b) => new Date(b.timestamp) - new Date(a.timestamp));
  }
}
