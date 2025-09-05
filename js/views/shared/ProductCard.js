import { formatPrice } from '../../utils/helpers.js';

function renderStars(rating = 0) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    for (let i = 0; i < fullStars; i++) {
        stars += `<svg fill="currentColor" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"></path></svg>`;
    }
    if (halfStar) {
        stars += `<svg fill="currentColor" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z M10 12.41V0l-2.051 4.14-4.58.665 3.315 3.23-.783 4.56L10 12.41z"></path></svg>`;
    }
    for (let i = 0; i < emptyStars; i++) {
        stars += `<svg fill="var(--gray-300)" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"></path></svg>`;
    }
    return stars;
}

export default function ProductCard(product) {
  return `
    <div class="card flex flex-col group text-left relative">
      ${product.discountPercentage > 0 ? `
        <div class="absolute top-2 right-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded-full z-10">-${product.discountPercentage}%</div>
      ` : ''}
      <a href="/product?id=${product.id}" data-action="navigate" data-route="/product?id=${product.id}" class="block overflow-hidden rounded-t-lg">
        <img src="${product.images[0]}" alt="${product.name}" class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300">
      </a>
      <div class="p-3 flex-1 flex flex-col">
        <h3 class="font-normal text-sm text-gray-700 mb-2 line-clamp-2 leading-snug">
          <a href="/product?id=${product.id}" data-action="navigate" data-route="/product?id=${product.id}" class="hover:text-primary transition-colors">${product.name}</a>
        </h3>
        <div class="mt-auto">
            <div class="flex items-baseline gap-2 mb-1">
                <div class="text-lg font-bold text-primary">${formatPrice(product.price)}</div>
                ${product.discountPercentage > 0 ? `
                    <div class="text-sm text-gray-500 line-through">${formatPrice(product.originalPrice)}</div>
                ` : ''}
            </div>
            <div class="flex items-center text-xs text-gray-500 gap-2">
                <div class="star-rating">${renderStars(product.rating)}</div>
                <span>(${product.reviewCount || 0})</span>
                <span class="px-1">&middot;</span>
                <span>${product.sold || 0} terjual</span>
            </div>
        </div>
      </div>
    </div>
  `;
}
