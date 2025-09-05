import { formatPrice } from '../../utils/helpers.js';

export default function AdminProductsPage({ productManager }) {
  const products = productManager.getAllProducts();
  return `
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Manajemen Produk</h1>
      <button class="btn btn-primary" data-action="admin-show-add-product">Tambah Produk</button>
    </div>
    <div class="card">
      <div class="card-body">
        <div class="table-wrapper">
          <table class="table">
            <thead>
              <tr>
                <th>Nama Produk</th>
                <th>Kategori</th>
                <th>Harga</th>
                <th>Stok</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              ${products.map(p => `
                <tr>
                  <td>${p.name}</td>
                  <td>${productManager.getCategories().find(c => c.id === p.categoryId)?.name}</td>
                  <td>${formatPrice(p.price)}</td>
                  <td>${p.stock}</td>
                  <td class="flex gap-2">
                    <button class="btn btn-secondary btn-sm" data-action="admin-show-edit-product" data-product-id="${p.id}">Edit</button>
                    <button class="btn btn-error btn-sm" data-action="admin-delete-product" data-product-id="${p.id}">Hapus</button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}
