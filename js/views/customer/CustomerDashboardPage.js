export default function CustomerDashboardPage({ authManager }) {
  const user = authManager.getCurrentUser();
  return `
    <div class="container py-8">
      <h1 class="text-3xl font-bold mb-8">Dashboard Pelanggan</h1>
      <div class="card">
        <div class="card-body">
          <p>Selamat datang, <strong>${user.name}</strong>!</p>
          <p>Email: ${user.email}</p>
          <p class="mt-4">Riwayat pesanan akan ditampilkan di sini.</p>
        </div>
      </div>
    </div>
  `;
}
