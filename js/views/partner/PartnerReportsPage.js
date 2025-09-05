import { formatPrice, formatDate } from '../../utils/helpers.js';

export default function PartnerReportsPage({ posManager }) {
    const transactions = posManager.getPartnerTransactions();
  return `
    <h1 class="text-2xl font-bold mb-6">Laporan Penjualan</h1>
    <div class="card">
        <div class="card-body">
            <div class="table-wrapper">
                <table class="table">
                    <thead>
                        <tr>
                            <th>ID Transaksi</th>
                            <th>Tanggal</th>
                            <th>Jumlah Item</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${transactions.length > 0 ? transactions.map(t => `
                            <tr>
                                <td>#${t.id}</td>
                                <td>${formatDate(t.timestamp)}</td>
                                <td>${t.items.reduce((sum, i) => sum + i.quantity, 0)}</td>
                                <td>${formatPrice(t.total)}</td>
                            </tr>
                        `).join('') : '<tr><td colspan="4" class="text-center">Belum ada transaksi.</td></tr>'}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  `;
}
