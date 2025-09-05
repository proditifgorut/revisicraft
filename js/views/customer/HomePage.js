import ProductCard from '../shared/ProductCard.js';

export default function HomePage({ productManager }) {
  const featuredProducts = productManager.getFeaturedProducts();
  const categories = productManager.getCategories();
  return `
    <section class="bg-white">
        <div class="container py-12">
            <div class="grid md:grid-cols-2 items-center gap-12">
                <div class="text-center md:text-left">
                    <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">Sentuhan Alam, <br/><span class="text-primary">Karya Tangan Terbaik</span></h1>
                    <p class="text-lg text-gray-600 mb-8">Jelajahi ribuan produk eceng gondok buatan tangan pengrajin lokal. Bawa keunikan alam ke dalam rumah Anda.</p>
                    <div class="flex justify-center md:justify-start gap-4">
                        <button class="btn btn-primary btn-lg" data-action="navigate" data-route="/products">Belanja Sekarang</button>
                        <button class="btn btn-outline btn-lg" data-action="navigate" data-route="#">Jadi Mitra</button>
                    </div>
                </div>
                <div class="relative h-96">
                    <img src="https://images.unsplash.com/photo-1594313313407-35b8f41f7cd9?w=800&h=600&fit=crop" alt="Kerajinan Eceng Gondok" class="rounded-lg shadow-lg w-full h-full object-cover">
                     <div class="absolute -bottom-4 -left-4 w-48 h-48 bg-white p-4 rounded-lg shadow-lg">
                        <img src="https://images.unsplash.com/photo-1566577738399-a56de69b9148?w=200&h=200&fit=crop" class="w-full h-full object-cover rounded-md"/>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="py-16">
        <div class="container">
            <h2 class="text-3xl font-bold text-center mb-8">Kategori Pilihan</h2>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                ${categories.map(cat => `
                    <a href="/products" data-action="navigate" data-route="/products?category=${cat.id}" class="block text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all">
                        <div class="text-4xl mb-3">${cat.icon}</div>
                        <h3 class="font-semibold text-gray-800">${cat.name}</h3>
                    </a>
                `).join('')}
            </div>
        </div>
    </section>

    <section class="py-16 bg-white">
      <div class="container">
        <div class="flex justify-between items-center mb-8">
            <h2 class="text-3xl font-bold">Flash Sale 🔥</h2>
            <a href="/products" data-action="navigate" data-route="/products" class="btn btn-outline btn-sm">Lihat Semua</a>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          ${featuredProducts.map(ProductCard).join('')}
        </div>
      </div>
    </section>
  `;
}
