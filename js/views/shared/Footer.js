export default function Footer() {
  return `
    <footer class="bg-gray-100 border-t-2 border-gray-200">
        <div class="container py-12">
            <div class="grid md:grid-cols-5 gap-8">
                <div class="md:col-span-2">
                    <h4 class="font-bold mb-4 text-lg text-gray-900">Alatacraft</h4>
                    <p class="text-gray-600 mb-4 text-sm">Platform kerajinan tangan Indonesia dengan sistem kemitraan yang mendukung UMKM lokal.</p>
                </div>
                <div>
                    <h4 class="font-semibold mb-4 text-gray-800">Jelajahi</h4>
                    <ul class="space-y-2 text-gray-600 text-sm">
                    <li><a href="/" data-action="navigate" data-route="/" class="hover:text-primary">Beranda</a></li>
                    <li><a href="/products" data-action="navigate" data-route="/products" class="hover:text-primary">Produk</a></li>
                    <li><a href="#" class="hover:text-primary">Kategori</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-semibold mb-4 text-gray-800">Tentang</h4>
                    <ul class="space-y-2 text-gray-600 text-sm">
                    <li><a href="#" class="hover:text-primary">Tentang Kami</a></li>
                    <li><a href="#" class="hover:text-primary">Menjadi Mitra</a></li>
                    <li><a href="#" class="hover:text-primary">Karir</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-semibold mb-4 text-gray-800">Bantuan</h4>
                    <ul class="space-y-2 text-gray-600 text-sm">
                    <li><a href="#" class="hover:text-primary">Pusat Bantuan</a></li>
                    <li><a href="#" class="hover:text-primary">Hubungi Kami</a></li>
                    <li><a href="#" class="hover:text-primary">Status Pesanan</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="bg-gray-200 py-4">
            <div class="container text-center text-gray-600 text-sm">
                <p>&copy; ${new Date().getFullYear()} Alatacraft. Semua hak dilindungi.</p>
            </div>
        </div>
    </footer>
  `;
}
