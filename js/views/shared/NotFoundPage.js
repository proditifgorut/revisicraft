export default function NotFoundPage() {
  return `
    <div class="container py-16 text-center">
      <h1 class="text-6xl font-bold text-primary mb-4">404</h1>
      <p class="text-xl text-gray-600 mb-8">Halaman yang Anda cari tidak ditemukan.</p>
      <button class="btn btn-primary" data-action="navigate" data-route="/">Kembali ke Beranda</button>
    </div>
  `;
}
