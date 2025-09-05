export default function Header({ authManager, cartManager, router }) {
  const user = authManager.getCurrentUser();
  const cartCount = cartManager.getItemCount();

  const navLink = (path, text) => `
    <a href="${path}" 
       class="text-gray-600 hover:text-primary transition-colors text-sm font-medium"
       data-action="navigate" data-route="${path}">
       ${text}
    </a>`;

  const iconLink = (path, icon, text, count) => `
    <a href="${path}" data-action="navigate" data-route="${path}" class="relative flex items-center gap-2 text-gray-600 hover:text-primary transition-colors">
        ${icon}
        <span class="text-sm hidden lg:block">${text}</span>
        ${count > 0 ? `<span class="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">${count}</span>` : ''}
    </a>
  `;

  return `
    <header>
      <div class="header-top hidden md:block">
        <div class="container flex justify-between items-center text-xs text-gray-600">
            <div class="flex gap-4">
                <span>Selamat Datang di Alatacraft!</span>
            </div>
            <div class="flex gap-4">
                ${navLink('#', 'Bantuan')}
                ${navLink('#', 'Lacak Pesanan')}
                 ${!user ? `
                    <button class="text-xs font-medium" data-action="show-login">Masuk</button>
                    <span class="text-gray-300">|</span>
                    <button class="text-xs font-medium" data-action="show-register">Daftar</button>
                ` : ''}
            </div>
        </div>
      </div>
      <div class="header-main">
        <div class="container flex items-center justify-between">
            <a class="flex items-center gap-2" href="/" data-action="navigate" data-route="/">
                <div class="w-10 h-10 bg-primary rounded-md flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>
                </div>
                <span class="text-2xl font-bold text-gray-900 hidden lg:block">Alatacraft</span>
            </a>
            
            <div class="search-bar hidden md:flex">
                <form data-form="search" class="w-full flex">
                    <input type="text" name="search" placeholder="Cari tas anyaman, dekorasi rumah..." class="form-input">
                    <button type="submit">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    </button>
                </form>
            </div>

            <div class="flex items-center gap-6">
                ${user ? `
                    ${iconLink('/dashboard', `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`, user.name.split(' ')[0])}
                    ${iconLink('/cart', `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>`, 'Keranjang', cartCount)}
                    <button class="btn btn-ghost btn-sm hidden md:flex" data-action="logout">Logout</button>
                ` : `
                    ${iconLink('/cart', `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>`, 'Keranjang', cartCount)}
                    <button class="btn btn-primary btn-sm hidden md:flex" data-action="show-login">Masuk</button>
                `}
                <button class="md:hidden btn btn-ghost" data-action="toggle-menu" title="Menu">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                </button>
            </div>
        </div>
      </div>
    </header>
  `;
}
