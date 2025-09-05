import { formatPrice, formatDate } from '../../utils/helpers.js';

export default function AdminOrdersPage() {
    const orders = JSON.parse(localStorage.getItem('alatacraft_pos_transactions') || '[]');
  return `
    <h1 class="text-2xl font-bold mb-6">Manajemen Pesanan</h1>
    <div class="card">
      <div class="card-body">
        <p>Menampilkan simulasi pesanan dari transaksi POS.</p>
        <div class="table-wrapper mt-4">
          <table class="table">
            <thead>
              <tr>
                <th>ID Pesanan</th>
                <th>Tanggal</th>
                <th>Mitra ID</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${orders.length > 0 ? orders.map(o => `
                <tr>
                  <td>#${o.id}</td>
                  <td>${formatDate(o.timestamp)}</td>
                  <td>${o.partnerId}</td>
                  <td>${formatPrice(o.total)}</td>
                  <td><span class="badge badge-success">Selesai</span></td>
                </tr>
              `).join('') : '<tr><td colspan="5" class="text-center">Tidak ada pesanan.</td></tr>'}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}
