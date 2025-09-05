import { formatPrice } from '../../utils/helpers.js';

export default function AdminDashboardPage({ adminManager }) {
  const stats = adminManager.getDashboardStats();
  
  const statCard = (name, value, icon, type) => `
    <div class="card stat-card ${type}">
        <div class="flex justify-between items-start">
            <div>
                <div class="label">${name}</div>
                <div class="value">${value}</div>
            </div>
            <div class="icon">${icon}</div>
        </div>
    </div>
  `;

  return `
    <h1 class="text-2xl font-bold mb-6">Dashboard Admin</h1>
    <div class="dashboard-grid">
        ${statCard('Total Pendapatan', formatPrice(stats.revenue), `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>`, 'revenue')}
        ${statCard('Total Pesanan', stats.orderCount, `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>`, 'orders')}
        ${statCard('Jumlah Pelanggan', stats.customerCount, `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle></svg>`, 'customers')}
        ${statCard('Jumlah Produk', stats.productCount, `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line></svg>`, 'products')}
    </div>
  `;
}
