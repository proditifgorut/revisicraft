import ProductCard from '../shared/ProductCard.js';

export default function ProductsPage({ productManager }) {
  const products = productManager.getFilteredProducts();
  const categories = productManager.getCategories();
  
  return `
    <div class="bg-gray-50">
    <div class="container py-12">
      <div class="text-left mb-8">
        <h1 class="text-3xl font-bold mb-1">Semua Produk</h1>
        <p class="text-gray-600">Temukan karya seni anyaman yang sempurna untuk Anda.</p>
      </div>
      <div class="flex flex-col md:flex-row gap-8">
        <aside class="w-full md:w-64 flex-shrink-0">
          <div class="p-4 border rounded-lg bg-white">
            <h3 class="font-semibold text-lg mb-4">Filter</h3>
              <div class="form-group">
                <label class="form-label">Kategori</label>
                <select class="form-select" id="categoryFilter" data-on-input="filter-products">
                  <option value="">Semua Kategori</option>
                  ${categories.map(cat => `<option value="${cat.id}">${cat.name}</option>`).join('')}
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Rentang Harga</label>
                <select class="form-select" id="priceFilter" data-on-input="filter-products">
                  <option value="">Semua Harga</option>
                  <option value="0-100000"> &lt; Rp 100.000</option>
                  <option value="100000-250000">Rp 100rb - 250rb</option>
                  <option value="250000-500000">Rp 250rb - 500rb</option>
                  <option value="500000-Infinity"> &gt; Rp 500.000</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Urutkan</label>
                <select class="form-select" id="sortFilter" data-on-input="filter-products">
                  <option value="popular">Paling Populer</option>
                  <option value="newest">Terbaru</option>
                  <option value="price-low">Harga Terendah</option>
                  <option value="price-high">Harga Tertinggi</option>
                </select>
              </div>
          </div>
        </aside>
        <div class="flex-1">
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            ${products.length > 0 ? products.map(ProductCard).join('') : '<p class="col-span-full text-center text-gray-500 py-16">Produk yang cocok dengan filter Anda tidak ditemukan.</p>'}
          </div>
        </div>
      </div>
    </div>
    </div>
  `;
}
