export default function Modals({ stateManager }) {
  const { currentModal } = stateManager.getState();
  
  const productFormModal = () => {
    const product = currentModal.data;
    const isEdit = !!product;
    return `
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold">${isEdit ? 'Edit' : 'Tambah'} Produk</h2>
        <button data-action="close-modal">&times;</button>
      </div>
      <form data-form="${isEdit ? 'edit-product' : 'add-product'}">
        ${isEdit ? `<input type="hidden" name="id" value="${product.id}">` : ''}
        <div class="form-group">
          <label class="form-label">Nama Produk</label>
          <input type="text" name="name" class="form-input" value="${product?.name || ''}" required>
        </div>
        <div class="form-group">
          <label class="form-label">Deskripsi</label>
          <textarea name="description" class="form-textarea" rows="3" required>${product?.description || ''}</textarea>
        </div>
        <div class="grid grid-cols-2 gap-4">
            <div class="form-group">
                <label class="form-label">Harga</label>
                <input type="number" name="price" class="form-input" value="${product?.price || ''}" required>
            </div>
            <div class="form-group">
                <label class="form-label">Stok</label>
                <input type="number" name="stock" class="form-input" value="${product?.stock || ''}" required>
            </div>
        </div>
        <div class="form-group">
            <label class="form-label">Kategori</label>
            <select name="categoryId" class="form-select" required>
                ${window.app.productManager.getCategories().map(cat => `<option value="${cat.id}" ${product?.categoryId === cat.id ? 'selected' : ''}>${cat.name}</option>`).join('')}
            </select>
        </div>
        <div class="form-group">
          <label class="form-label">URL Gambar (pisahkan dengan koma)</label>
          <input type="text" name="images" class="form-input" value="${product?.images.join(', ') || ''}" required>
        </div>
        <div class="form-group flex items-center gap-2">
            <input type="checkbox" name="featured" id="featured" ${product?.featured ? 'checked' : ''}>
            <label for="featured">Produk Unggulan</label>
        </div>
        <button type="submit" class="btn btn-primary w-full">${isEdit ? 'Simpan Perubahan' : 'Tambah Produk'}</button>
      </form>
    `;
  };

  const getModalContent = () => {
    if (currentModal?.type === 'product-form') {
      return productFormModal();
    }
    return '';
  };

  return `
    <div class="modal" id="loginModal">
      <div class="modal-content">
        <div class="flex justify-between items-center mb-6"><h2 class="text-2xl font-bold">Masuk</h2><button data-action="close-modal">&times;</button></div>
        <form data-form="login">
          <div class="form-group"><label class="form-label">Email</label><input type="email" name="email" class="form-input" required></div>
          <div class="form-group"><label class="form-label">Password</label><input type="password" name="password" class="form-input" required></div>
          <button type="submit" class="btn btn-primary w-full mb-4">Masuk</button>
        </form>
        <p class="text-center text-sm">Belum punya akun? <button class="text-primary hover:underline" data-action="show-register">Daftar</button></p>
      </div>
    </div>
    <div class="modal" id="registerModal">
      <div class="modal-content">
        <div class="flex justify-between items-center mb-6"><h2 class="text-2xl font-bold">Daftar</h2><button data-action="close-modal">&times;</button></div>
        <form data-form="register">
          <div class="form-group"><label class="form-label">Nama</label><input type="text" name="name" class="form-input" required></div>
          <div class="form-group"><label class="form-label">Email</label><input type="email" name="email" class="form-input" required></div>
          <div class="form-group"><label class="form-label">Password</label><input type="password" name="password" class="form-input" required></div>
          <div class="form-group"><label class="form-label">Konfirmasi Password</label><input type="password" name="confirmPassword" class="form-input" required></div>
          <button type="submit" class="btn btn-primary w-full mb-4">Daftar</button>
        </form>
        <p class="text-center text-sm">Sudah punya akun? <button class="text-primary hover:underline" data-action="show-login">Masuk</button></p>
      </div>
    </div>
    <div class="modal" id="formModal">
        <div class="modal-content">
            ${getModalContent()}
        </div>
    </div>
  `;
}
