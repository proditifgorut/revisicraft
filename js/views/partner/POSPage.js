import { formatPrice } from '../../utils/helpers.js';

export default function POSPage({ productManager, posManager }) {
  const products = productManager.getAllProducts();
  const transaction = posManager.stateManager.getState().currentTransaction;

  return `
    <h1 class="text-2xl font-bold mb-6">Point of Sale (POS)</h1>
    <div class="grid lg:grid-cols-5 gap-6">
      <div class="lg:col-span-3 card">
        <div class="card-header"><input type="text" placeholder="Cari produk..." class="form-input"></div>
        <div class="card-body h-[60vh] overflow-y-auto">
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            ${products.map(p => `
              <div class="card text-center cursor-pointer hover:shadow-md" data-action="pos-add-item" data-product-id="${p.id}">
                <img src="${p.images[0]}" class="w-full h-20 object-cover">
                <div class="p-2">
                  <p class="text-sm font-semibold">${p.name}</p>
                  <p class="text-xs text-primary">${formatPrice(p.price)}</p>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
      <div class="lg:col-span-2 card">
        <div class="card-header"><h2 class="text-xl font-semibold">Transaksi</h2></div>
        <div class="card-body flex flex-col h-[60vh]">
          <div class="flex-1 overflow-y-auto mb-4">
            ${transaction.items.length === 0 ? '<p class="text-center text-gray-500">Belum ada item</p>' : transaction.items.map(item => `
              <div class="flex items-center gap-2 border-b pb-2 mb-2">
                <div class="flex-1">
                  <p class="font-medium text-sm">${item.product.name}</p>
                  <p class="text-xs">${formatPrice(item.product.price)} x ${item.quantity}</p>
                </div>
                <p class="font-semibold text-sm">${formatPrice(item.subtotal)}</p>
                <button class="text-red-500" data-action="pos-remove-item" data-item-id="${item.id}">&times;</button>
              </div>
            `).join('')}
          </div>
          <div class="border-t pt-4">
            <div class="flex justify-between text-sm mb-1"><span>Subtotal</span><span>${formatPrice(transaction.subtotal)}</span></div>
            <div class="flex justify-between text-sm mb-2"><span>Pajak (11%)</span><span>${formatPrice(transaction.tax)}</span></div>
            <div class="flex justify-between font-bold text-lg mb-4"><span>Total</span><span>${formatPrice(transaction.total)}</span></div>
            <div class="grid grid-cols-2 gap-4 mb-4">
                <div class="form-group"><label class="form-label">Bayar</label><input type="number" id="paymentAmount" class="form-input" value="${transaction.payment || ''}" data-on-input="pos-calculate-change"></div>
                <div class="form-group"><label class="form-label">Kembali</label><input type="text" id="changeAmount" class="form-input" value="${formatPrice(transaction.change)}" readonly></div>
            </div>
            <button class="btn btn-success w-full" data-action="pos-complete-transaction" ${transaction.items.length === 0 ? 'disabled' : ''}>Selesaikan Transaksi</button>
          </div>
        </div>
      </div>
    </div>
  `;
}
