import { formatPrice } from '../../utils/helpers.js';

export default function CheckoutPage({ cartManager }) {
  const items = cartManager.getItemsWithDetails();
  const total = cartManager.getTotal();

  return `
    <div class="container py-8">
      <h1 class="text-3xl font-bold mb-8">Checkout</h1>
      <div class="grid lg:grid-cols-2 gap-8">
        <div>
          <h2 class="text-xl font-semibold mb-4">Alamat Pengiriman</h2>
          <form data-form="checkout" class="card">
            <div class="card-body">
              <div class="form-group"><label class="form-label">Nama Penerima</label><input type="text" class="form-input" required></div>
              <div class="form-group"><label class="form-label">Alamat Lengkap</label><textarea class="form-textarea" rows="3" required></textarea></div>
              <div class="grid grid-cols-2 gap-4">
                <div class="form-group"><label class="form-label">Kota</label><input type="text" class="form-input" required></div>
                <div class="form-group"><label class="form-label">Kode Pos</label><input type="text" class="form-input" required></div>
              </div>
              <div class="form-group"><label class="form-label">Nomor Telepon</label><input type="tel" class="form-input" required></div>
            </div>
            <div class="card-footer">
              <button type="submit" class="btn btn-primary w-full">Buat Pesanan</button>
            </div>
          </form>
        </div>
        <div>
          <h2 class="text-xl font-semibold mb-4">Ringkasan Pesanan</h2>
          <div class="card">
            <div class="card-body">
              ${items.map(item => `
                <div class="flex justify-between items-center mb-2 text-sm">
                  <span>${item.product.name} (x${item.quantity})</span>
                  <span>${formatPrice(item.subtotal)}</span>
                </div>
              `).join('')}
              <div class="border-t my-4"></div>
              <div class="flex justify-between font-bold">
                <span>Total</span>
                <span>${formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
