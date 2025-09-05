import { formatPrice } from '../../utils/helpers.js';
import ProductCard from '../shared/ProductCard.js';
import NotFoundPage from '../shared/NotFoundPage.js';

function renderStars(rating = 0) {
    let stars = '';
    const fullStars = Math.floor(rating);
    for (let i = 0; i < 5; i++) {
        stars += `<svg class="w-5 h-5 ${i < fullStars ? 'text-yellow-400' : 'text-gray-300'}" fill="currentColor" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"></path></svg>`;
    }
    return stars;
}

export default function ProductDetailPage({ productManager }, productId) {
  const product = productManager.getProduct(productId);
  if (!product) return NotFoundPage();

  const relatedProducts = productManager.getRelatedProducts(productId);

  return `
    <div class="bg-white">
    <div class="container py-12">
      <div class="grid md:grid-cols-2 gap-8 lg:gap-12 mb-12">
        <div class="flex flex-col-reverse md:flex-row gap-4">
            <div class="flex md:flex-col gap-3 justify-center">
                ${product.images.map((img, index) => `
                    <img src="${img}" alt="Thumbnail ${index+1}" 
                         class="w-20 h-20 object-cover rounded-lg cursor-pointer border-2 transition"
                         style="border-color: ${index === 0 ? 'var(--primary)' : 'transparent'};"
                         data-action="select-product-image" data-image-url="${img}">
                `).join('')}
            </div>
            <div class="flex-1">
                <img src="${product.images[0]}" alt="${product.name}" id="mainProductImage" class="w-full h-auto max-h-[500px] object-cover rounded-lg shadow-md">
            </div>
        </div>
        <div>
          <h1 class="text-3xl font-bold mb-2">${product.name}</h1>
          <div class="flex items-center gap-4 mb-4 text-sm">
            <div class="flex items-center gap-1">${renderStars(product.rating)}</div>
            <div class="text-gray-500 font-semibold">${(product.rating || 0).toFixed(1)}</div>
            <div class="text-gray-300">|</div>
            <div class="text-gray-500">${product.reviewCount || 0} Penilaian</div>
            <div class="text-gray-300">|</div>
            <div class="text-gray-500">${product.sold || 0} Terjual</div>
          </div>
          <div class="bg-gray-50 p-4 rounded-lg mb-4">
            <div class="flex items-baseline gap-3">
                <p class="text-4xl font-bold text-primary">${formatPrice(product.price)}</p>
                ${product.discountPercentage > 0 ? `
                    <span class="text-lg text-gray-500 line-through">${formatPrice(product.originalPrice)}</span>
                    <span class="badge badge-primary">-${product.discountPercentage}%</span>
                ` : ''}
            </div>
          </div>
          <div class="prose max-w-none text-gray-600 mb-6">
            <h3 class="font-semibold">Deskripsi Produk</h3>
            <p>${product.description}</p>
          </div>
          <div class="flex items-center gap-4 mb-6">
            <label class="form-label mb-0">Jumlah</label>
            <input type="number" value="1" min="1" max="${product.stock}" class="form-input w-24 text-center" id="quantity">
            <p class="text-sm text-gray-500">Stok: ${product.stock}</p>
          </div>
          <div class="flex gap-4">
            <button class="btn btn-outline flex-1 btn-lg" data-action="add-to-cart" data-product-id="${product.id}" ${product.stock === 0 ? 'disabled' : ''}>
              + Keranjang
            </button>
            <button class="btn btn-primary flex-1 btn-lg" data-action="buy-now" data-product-id="${product.id}" ${product.stock === 0 ? 'disabled' : ''}>
              Beli Sekarang
            </button>
          </div>
        </div>
      </div>
      ${relatedProducts.length > 0 ? `
        <section class="mt-16 pt-12 border-t">
          <h2 class="text-2xl font-bold mb-8">Anda Mungkin Juga Suka</h2>
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            ${relatedProducts.map(ProductCard).join('')}
          </div>
        </section>
      ` : ''}
    </div>
    </div>
  `;
}
