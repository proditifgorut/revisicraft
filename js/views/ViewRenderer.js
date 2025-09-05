import Header from './shared/Header.js';
import Footer from './shared/Footer.js';
import Modals from './shared/Modals.js';
import HomePage from './customer/HomePage.js';
import ProductsPage from './customer/ProductsPage.js';
import ProductDetailPage from './customer/ProductDetailPage.js';
import CartPage from './customer/CartPage.js';
import CheckoutPage from './customer/CheckoutPage.js';
import CustomerDashboardPage from './customer/CustomerDashboardPage.js';
import PartnerDashboardPage from './partner/PartnerDashboardPage.js';
import POSPage from './partner/POSPage.js';
import PartnerReportsPage from './partner/PartnerReportsPage.js';
import AdminDashboardPage from './admin/AdminDashboardPage.js';
import AdminProductsPage from './admin/AdminProductsPage.js';
import AdminOrdersPage from './admin/AdminOrdersPage.js';
import AdminUsersPage from './admin/AdminUsersPage.js';
import NotFoundPage from './shared/NotFoundPage.js';

export class ViewRenderer {
  constructor(app) {
    this.app = app;
    this.appElement = document.getElementById('app');
  }

  render() {
    const { router, authManager } = this.app;
    const route = router.getCurrentRoute();
    const user = authManager.getCurrentUser();
    
    let pageContent = '';
    let header = Header(this.app);
    let showFooter = true;

    // Redirect logic for logged in users
    if (user) {
        if (user.role === 'admin' && !route.path.startsWith('/admin')) {
            this.app.router.navigate('/admin/dashboard');
            return;
        }
        if (user.role === 'partner' && !route.path.startsWith('/partner')) {
            this.app.router.navigate('/partner/dashboard');
            return;
        }
    }

    if (user?.role === 'admin') {
      pageContent = this.getAdminPage(route);
      header = ''; // Admin has its own layout
      showFooter = false;
    } else if (user?.role === 'partner') {
      pageContent = this.getPartnerPage(route);
      header = ''; // Partner has its own layout
      showFooter = false;
    } else {
      pageContent = this.getCustomerPage(route);
    }

    this.appElement.innerHTML = `
      <div class="flex flex-col min-h-screen">
        ${header}
        <main class="flex-grow">${pageContent}</main>
        ${showFooter ? Footer() : ''}
        ${Modals(this.app)}
      </div>
    `;
  }

  getCustomerPage(route) {
    switch (route.path) {
      case '/': return HomePage(this.app);
      case '/products': return ProductsPage(this.app);
      case '/product': return ProductDetailPage(this.app, route.params.id);
      case '/cart': return CartPage(this.app);
      case '/checkout': return this.app.authManager.getCurrentUser() ? CheckoutPage(this.app) : NotFoundPage();
      case '/dashboard': return this.app.authManager.getCurrentUser() ? CustomerDashboardPage(this.app) : NotFoundPage();
      default: return NotFoundPage();
    }
  }

  getPartnerPage(route) {
    const layout = (content) => `
        <div class="flex h-screen bg-gray-100">
            ${this.getSidebar(this.app.authManager.getCurrentUser())}
            <div class="flex-1 flex flex-col overflow-hidden">
                ${this.getDashboardHeader(this.app.authManager.getCurrentUser())}
                <div class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4 md:p-8">
                    ${content}
                </div>
            </div>
        </div>`;
    
    switch (route.path) {
        case '/partner/dashboard': return layout(PartnerDashboardPage(this.app));
        case '/partner/pos': return layout(POSPage(this.app));
        case '/partner/reports': return layout(PartnerReportsPage(this.app));
        default: return layout(PartnerDashboardPage(this.app));
    }
  }

  getAdminPage(route) {
    const layout = (content) => `
        <div class="flex h-screen bg-gray-100">
            ${this.getSidebar(this.app.authManager.getCurrentUser())}
            <div class="flex-1 flex flex-col overflow-hidden">
                ${this.getDashboardHeader(this.app.authManager.getCurrentUser())}
                <div class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4 md:p-8">
                    ${content}
                </div>
            </div>
        </div>`;

    switch (route.path) {
      case '/admin/dashboard': return layout(AdminDashboardPage(this.app));
      case '/admin/products': return layout(AdminProductsPage(this.app));
      case '/admin/orders': return layout(AdminOrdersPage(this.app));
      case '/admin/users': return layout(AdminUsersPage(this.app));
      default: return layout(AdminDashboardPage(this.app));
    }
  }

  getDashboardHeader(user) {
      return `
        <header class="flex justify-between items-center p-4 bg-white border-b sticky top-0 z-10">
            <h1 class="text-xl font-semibold text-gray-800">Selamat datang, ${user.name.split(' ')[0]}</h1>
            <button class="btn btn-outline btn-sm" data-action="logout">Logout</button>
        </header>
      `;
  }

  getSidebar(user) {
      const currentPath = this.app.router.getCurrentRoute().path;
      const isActive = (path) => currentPath === path ? 'bg-primary text-white' : 'text-gray-600 hover:bg-primary-light hover:text-white';
      
      const navLink = (path, icon, text) => `
        <a href="${path}" data-action="navigate" data-route="${path}" class="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive(path)}">
            ${icon}
            <span class="font-medium">${text}</span>
        </a>`;

      const partnerLinks = `
        ${navLink('/partner/dashboard', `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="9"></rect><rect x="14" y="3" width="7" height="5"></rect><rect x="14" y="12" width="7" height="9"></rect><rect x="3" y="16" width="7" height="5"></rect></svg>`, 'Dashboard')}
        ${navLink('/partner/pos', `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2H2v10l9.29 9.29a1 1 0 0 0 1.41 0L22 13.41a1 1 0 0 0 0-1.41L12 2z"></path><path d="M7 7h.01"></path></svg>`, 'Point of Sale')}
        ${navLink('/partner/reports', `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>`, 'Laporan')}
      `;
      const adminLinks = `
        ${navLink('/admin/dashboard', `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="9"></rect><rect x="14" y="3" width="7" height="5"></rect><rect x="14" y="12" width="7" height="9"></rect><rect x="3" y="16" width="7" height="5"></rect></svg>`, 'Dashboard')}
        ${navLink('/admin/products', `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>`, 'Produk')}
        ${navLink('/admin/orders', `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><line x1="10" y1="9" x2="8" y2="9"></line></svg>`, 'Pesanan')}
        ${navLink('/admin/users', `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`, 'Pengguna')}
      `;

      return `
        <aside class="w-64 flex-shrink-0 bg-white border-r p-4 flex-col hidden md:flex">
            <div class="flex items-center gap-3 mb-10">
              <div class="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>
              </div>
              <span class="text-xl font-bold text-gray-900">Alatacraft</span>
            </div>
            <nav class="flex flex-col gap-2">
                ${user.role === 'admin' ? adminLinks : partnerLinks}
            </nav>
            <div class="mt-auto">
                <a href="/" data-action="navigate" data-route="/" class="flex items-center gap-3 px-4 py-3 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                    <span class="font-medium">Kembali ke Toko</span>
                </a>
            </div>
        </aside>
      `;
  }
}
