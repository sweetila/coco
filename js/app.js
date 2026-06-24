/* ============================================
   SHIMMERS BAKERY — App Router & Init
   ============================================ */

const App = {
  init() {
    // Initialize order list
    OrderList.init();

    // Setup navigation
    this.setupNav();

    // Listen for hash changes
    window.addEventListener('hashchange', () => this.route());

    // Listen for scroll (navbar effect)
    window.addEventListener('scroll', debounce(() => {
      const navbar = document.querySelector('.navbar');
      if (navbar) {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
      }
    }, 10));

    // Initial route
    this.route();
  },

  setupNav() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    // Mobile menu toggle
    const menuBtn = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    if (menuBtn && navLinks) {
      menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        Animations.pop(menuBtn);
      });
    }

    // Close mobile menu on link click
    document.querySelectorAll('.navbar__link').forEach(link => {
      link.addEventListener('click', () => {
        if (navLinks) navLinks.classList.remove('open');
      });
    });
  },

  route() {
    const hash = location.hash || '#/';
    const app = document.getElementById('app');

    // Page transition wrapper
    const render = (fn) => Animations.pageTransition(app, fn);

    // Parse route
    if (hash === '#/' || hash === '' || hash === '#') {
      render(() => Pages.renderHome());
      this.setActiveNav('home');
    }
    else if (hash.startsWith('#/item/')) {
      const parts = hash.replace('#/item/', '').split('/');
      const categoryId = parts[0];
      const productId = parts[1];
      render(() => Pages.renderItem(categoryId, productId));
      this.setActiveNav(categoryId);
    }
    else if (hash === '#/order-list') {
      render(() => Pages.renderOrderList());
      this.setActiveNav('order-list');
    }
    else if (hash === '#/make-my-cake') {
      render(() => Pages.renderMakeMyCakePage());
      this.setActiveNav('make-my-cake');
    }
    else if (hash.startsWith('#/order-complete')) {
      const orderId = hash.replace('#/order-complete/', '').replace('#/order-complete', '');
      render(() => Pages.renderOrderConfirmation(orderId));
      this.setActiveNav('');
    }
    else {
      // Check if it's a category
      const categoryId = hash.replace('#/', '');
      const category = getCategory(categoryId);
      if (category) {
        render(() => Pages.renderCategory(categoryId));
        this.setActiveNav(categoryId);
      } else {
        // 404
        render(() => {
          app.innerHTML = `
            <div class="empty-state" style="min-height: calc(100vh - 70px); display: flex; flex-direction: column; align-items: center; justify-content: center;">
              <div class="empty-state__emoji">🤷‍♀️</div>
              <h2 class="empty-state__title">Page Not Found</h2>
              <p class="empty-state__desc">Oops! This page doesn't exist. Let's get you back to the treats!</p>
              <button class="btn btn--primary" onclick="location.hash='#/'">🏠 Go Home</button>
            </div>
          `;
        });
      }
    }
  },

  setActiveNav(id) {
    document.querySelectorAll('.navbar__link').forEach(link => {
      link.classList.remove('active');
      if (link.dataset.route === id) {
        link.classList.add('active');
      }
    });
  }
};

// Boot the app
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
