import { faker } from '@faker-js/faker';

export class ProductManager {
  constructor(stateManager) {
    this.stateManager = stateManager;
  }

  init() {
    this.loadProducts();
  }

  loadProducts() {
    let products = JSON.parse(localStorage.getItem('alatacraft_products'));
    let categories = JSON.parse(localStorage.getItem('alatacraft_categories'));

    if (!products || !categories || products.length === 0) {
      const data = this.generateMockData();
      products = data.products;
      categories = data.categories;
      localStorage.setItem('alatacraft_products', JSON.stringify(products));
      localStorage.setItem('alatacraft_categories', JSON.stringify(categories));
    }
    
    this.stateManager.setState({ products, filteredProducts: products, categories });
  }

  generateMockData() {
    const categories = [
      { id: 1, name: 'Tas & Aksesoris', icon: '👜' }, 
      { id: 2, name: 'Dekorasi Rumah', icon: '🖼️' },
      { id: 3, name: 'Furnitur', icon: '🛋️' }, 
      { id: 4, name: 'Peralatan Dapur', icon: '🍽️' }
    ];

    const productTemplates = {
      1: ['Tas Tote Anyaman', 'Tas Selempang Bulat', 'Sandal Jepit', 'Topi Pantai Lebar'],
      2: ['Keranjang Serbaguna', 'Tempat Tisu Estetik', 'Cermin Dinding Rotan', 'Karpet Lantai'],
      3: ['Kursi Stool Unik', 'Meja Kopi Kecil', 'Rak Dinding Gantung', 'Lampu Tidur'],
      4: ['Tatakan Gelas', 'Nampan Saji', 'Wadah Buah', 'Piring Hias']
    };
    
    const imageTemplates = {
        1: [
            'https://images.unsplash.com/photo-1566577738399-a56de69b9148?w=600&h=600&fit=crop',
            'https://images.unsplash.com/photo-1550928434-d6f4a848c02a?w=600&h=600&fit=crop',
            'https://images.unsplash.com/photo-1621999808622-53c89361a303?w=600&h=600&fit=crop',
        ],
        2: [
            'https://images.unsplash.com/photo-1588796124733-1443b5d43b9a?w=600&h=600&fit=crop',
            'https://images.unsplash.com/photo-1594313313407-35b8f41f7cd9?w=600&h=600&fit=crop',
            'https://images.unsplash.com/photo-1618221318015-24a27d63a86a?w=600&h=600&fit=crop',
        ],
        3: [
            'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&h=600&fit=crop',
            'https://images.unsplash.com/photo-1503602642458-232111445657?w=600&h=600&fit=crop',
            'https://images.unsplash.com/photo-1544457070-4cd773b4d71e?w=600&h=600&fit=crop',
        ],
        4: [
            'https://images.unsplash.com/photo-1606822437129-a832e015a5a0?w=600&h=600&fit=crop',
            'https://images.unsplash.com/photo-1616125349591-ea3a039746a6?w=600&h=600&fit=crop',
            'https://images.unsplash.com/photo-1628191136938-c6d3b3305367?w=600&h=600&fit=crop',
        ]
    };

    const products = Array.from({ length: 24 }, (_, index) => {
      const category = faker.helpers.arrayElement(categories);
      const name = faker.helpers.arrayElement(productTemplates[category.id]);
      const price = faker.number.int({ min: 50, max: 750 }) * 1000;
      const hasDiscount = faker.datatype.boolean();
      const discountPercentage = hasDiscount ? faker.number.int({ min: 10, max: 40 }) : 0;
      
      return {
        id: index + 1,
        name: `${name} Eceng Gondok`,
        description: `Kerajinan ${name.toLowerCase()} dari eceng gondok pilihan, dianyam dengan tangan oleh pengrajin lokal. Produk ini tidak hanya cantik secara estetika, tetapi juga ramah lingkungan dan mendukung ekonomi kreatif.`,
        price: price,
        originalPrice: hasDiscount ? Math.round(price / (1 - discountPercentage / 100)) : price,
        discountPercentage: discountPercentage,
        stock: faker.number.int({ min: 5, max: 30 }),
        categoryId: category.id,
        sku: `ALT-EG${String(index + 1).padStart(3, '0')}`,
        images: faker.helpers.shuffle(imageTemplates[category.id]),
        featured: index < 6,
        createdAt: faker.date.recent({ days: 90 }).toISOString(),
        rating: faker.number.float({ min: 4, max: 5, precision: 0.1 }),
        reviewCount: faker.number.int({ min: 10, max: 200 }),
        sold: faker.number.int({min: 20, max: 500}),
      };
    });
    return { products, categories };
  }
  
  _updateLocalStorage(products) {
      localStorage.setItem('alatacraft_products', JSON.stringify(products));
      this.stateManager.setState({ products, filteredProducts: products });
  }

  addProduct(productData) {
      const { products } = this.stateManager.getState();
      const newProduct = {
          ...productData,
          id: Date.now(),
          sku: `ALT-EG${String(products.length + 1).padStart(3, '0')}`,
          createdAt: new Date().toISOString(),
          rating: faker.number.float({ min: 4, max: 5, precision: 0.1 }),
          reviewCount: faker.number.int({ min: 10, max: 200 }),
          sold: 0,
      };
      const updatedProducts = [...products, newProduct];
      this._updateLocalStorage(updatedProducts);
  }

  updateProduct(updatedProductData) {
      let { products } = this.stateManager.getState();
      const updatedProducts = products.map(p => p.id === updatedProductData.id ? { ...p, ...updatedProductData } : p);
      this._updateLocalStorage(updatedProducts);
  }
  
  deleteProduct(productId) {
      let { products } = this.stateManager.getState();
      const updatedProducts = products.filter(p => p.id !== productId);
      this._updateLocalStorage(updatedProducts);
  }

  getAllProducts() {
    return this.stateManager.getState().products;
  }
  
  getFilteredProducts() {
      return this.stateManager.getState().filteredProducts;
  }

  getProduct(id) {
    return this.getAllProducts().find(p => p.id === parseInt(id));
  }

  getFeaturedProducts() {
    return this.getAllProducts().filter(p => p.featured).slice(0, 6);
  }

  getRelatedProducts(productId, limit = 6) {
    const product = this.getProduct(productId);
    if (!product) return [];
    
    return this.getAllProducts()
      .filter(p => p.categoryId === product.categoryId && p.id !== parseInt(productId))
      .slice(0, limit);
  }

  getCategories() {
    return this.stateManager.getState().categories;
  }

  applyFilters({ category, price, sort, search }) {
    let results = this.getAllProducts();

    if(search) {
        results = results.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    }

    if (category) {
      results = results.filter(p => p.categoryId === parseInt(category));
    }

    if (price) {
      const [min, max] = price.split('-').map(Number);
      results = results.filter(p => {
          if(max) return p.price >= min && p.price <= max;
          return p.price >= min;
      });
    }
    
    switch (sort) {
      case 'newest': results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); break;
      case 'price-low': results.sort((a, b) => a.price - b.price); break;
      case 'price-high': results.sort((a, b) => b.price - a.price); break;
      case 'popular': results.sort((a, b) => b.sold - a.sold); break;
    }
    
    this.stateManager.setState({ filteredProducts: results });
  }
}
