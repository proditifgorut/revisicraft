export default function PartnerDashboardPage() {
  return `
    <h1 class="text-2xl font-bold mb-6">Dashboard Mitra</h1>
    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="card"><div class="card-body"><h3 class="font-semibold">Penjualan Hari Ini</h3><p class="text-2xl font-bold">Rp 1.250.000</p></div></div>
        <div class="card"><div class="card-body"><h3 class="font-semibold">Transaksi Hari Ini</h3><p class="text-2xl font-bold">15</p></div></div>
        <div class="card"><div class="card-body"><h3 class="font-semibold">Produk Terlaris</h3><p class="text-lg">Batik Tulis Premium</p></div></div>
        <div class="card"><div class="card-body"><h3 class="font-semibold">Stok Kritis</h3><p class="text-2xl font-bold">3 Produk</p></div></div>
    </div>
  `;
}
