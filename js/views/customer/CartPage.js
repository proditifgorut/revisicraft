import { formatPrice } from '../../utils/helpers.js';

export default function CartPage({ cartManager }) {
  const items = cartManager.getItemsWithDetails();
  const total = cartManager.getTotal();

  if (items.length === 0) {
    return `
      <div class="container py-16 text-center">
        <h1 class="text-2xl font-bold mb-4">Keranjang Anda Kosong</h1>
        <p class="text-gray-600 mb-8">Sepertinya Anda belum menambahkan produk apapun.</p>
        <button class="btn btn-primary" data-action="navigate" data-route="/products">Mulai Belanja</button>
      </div>
    `;
  }

  return `
    <div class="container py-8">
      <h1 class="text-3xl font-bold mb-8">Keranjang Belanja</h1>
      <div class="grid lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2">
          <div class="card">
            ${items.map(item => `
              <div class="flex items-center gap-4 p-4 border-b">
                <img src="${item.product.images[0]}" alt="${item.product.name}" class="w-24 h-24 object-cover rounded">
                <div class="flex-1">
                  <h3 class="font-semibold">${item.product.name}</h3>
                  <p class="text-sm text-gray-500">${formatPrice(item.product.price)}</p>
                </div>
                <div class="flex items-center gap-4">
                  <input type="number" value="${item.quantity}" min="1" max="${item.product.stock}" 
                         class="form-input w-20 text-center"
                         data-on-input="update-cart-quantity" data-product-id="${item.product.id}">
                  <p class="font-semibold w-24 text-right">${formatPrice(item.subtotal)}</p>
                  <button class="text-red-500 hover:text-red-700" data-action="remove-from-cart" data-product-id="${item.product.id}" title="Hapus">&times;</button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
        <div>
          <div class="card">
            <div class="card-header"><h2 class="text-xl font-bold">Ringkasan</h2></div>
            <div class="card-body">
              <div class="flex justify-between mb-4">
                <span>Subtotal</span>
                <span class="font-semibold">${formatPrice(total)}</span>
              </div>
              <p class="text-sm text-gray-500 mb-6">Pajak dan ongkos kirim akan dihitung saat checkout.</p>
              <button class="btn btn-primary w-full" data-action="checkout">Lanjut ke Checkout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
