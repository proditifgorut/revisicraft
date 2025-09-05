export class UIManager {
  constructor() {
    this.currentModalId = null;
  }

  init() {
    document.addEventListener('showNotification', (e) => {
      this.showNotification(e.detail.message, e.detail.type);
    });

    document.addEventListener('hideModal', () => {
      this.hideModal();
    });

    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal')) {
        this.hideModal();
      }
    });

    window.addEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    const header = document.querySelector('header');
    if (header) {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  }

  showModal(modalId) {
    this.hideModal();
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('show');
      this.currentModalId = modalId;
    }
  }

  hideModal() {
    if (this.currentModalId) {
      const modal = document.getElementById(this.currentModalId);
      if (modal) {
        modal.classList.remove('show');
      }
      this.currentModalId = null;
    }
  }

  showNotification(message, type = 'info') {
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => notification.classList.add('show'), 10);

    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 400);
    }, 3000);
  }

  toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu) {
      mobileMenu.classList.toggle('hidden');
    }
  }

  selectProductImage(imageUrl) {
    const mainImage = document.getElementById('mainProductImage');
    if (mainImage) {
      mainImage.src = imageUrl;
    }
    document.querySelectorAll('[data-action="select-product-image"]').forEach(el => {
        el.style.borderColor = 'transparent';
    });
    const selectedThumb = document.querySelector(`[data-image-url="${imageUrl}"]`);
    if(selectedThumb) {
        selectedThumb.style.borderColor = 'var(--primary)';
    }
  }
}
