/* ============================================
   SHIMMERS BAKERY — Page Renderers
   ============================================ */

const Pages = {

  /* ========================
     HOME PAGE
     ======================== */
  renderHome() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <!-- Hero Section -->
      <section class="hero" id="hero">
        <div class="hero__bg-decor">
          <div class="hero__bg-shape"></div>
          <div class="hero__bg-shape"></div>
          <div class="hero__bg-shape"></div>
          <div class="hero__bg-shape"></div>
        </div>
        <div class="hero__floating-treats">
          <span class="hero__floating-treat">🧁</span>
          <span class="hero__floating-treat">🍪</span>
          <span class="hero__floating-treat">🎂</span>
          <span class="hero__floating-treat">🍰</span>
          <span class="hero__floating-treat">🍩</span>
          <span class="hero__floating-treat">✨</span>
        </div>
        <span class="hero__sparkle-left">✨</span>
        <span class="hero__sparkle-right">✨</span>
        <div class="hero__content">
          <h1 class="hero__title">
            <span class="hero__title-shimmer">Shimmers</span>
          </h1>
          <p class="hero__subtitle">Where Every Bite Sparkles ✨</p>
          <p class="hero__tagline">Handcrafted with love in the heart of the city — freshly baked daily</p>
          <div class="hero__cta-group">
            <button class="btn btn--primary btn--large" onclick="location.hash='#/cakes'; Animations.createSparkle(event.clientX, event.clientY);">
              🎂 Explore Our Menu
            </button>
            <button class="btn btn--secondary btn--large" onclick="document.getElementById('categories').scrollIntoView({behavior:'smooth'});">
              ✨ View Categories
            </button>
          </div>
        </div>
      </section>

      <!-- Categories Section -->
      <section class="categories-section" id="categories">
        <div class="section-header">
          <h2 class="section-header__title">Our Delicious Menu ✨</h2>
          <p class="section-header__subtitle">Tap a category to explore all items</p>
        </div>
        <div class="categories-grid" id="categories-grid">
          ${CATEGORIES.map((cat, i) => `
            <div class="category-card" 
                 onclick="Animations.createRipple(event, this); setTimeout(() => location.hash = '#/${cat.id}', 200);"
                 style="animation-delay: ${i * 100}ms;"
                 id="cat-${cat.id}">
              <span class="category-card__sticker">${cat.sticker}</span>
              <div class="category-card__emoji">${cat.emoji}</div>
              <h3 class="category-card__name">${cat.name}</h3>
              <p class="category-card__desc">${cat.description}</p>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- About / CTA Section -->
      <section style="padding: var(--space-3xl) var(--space-xl); background: var(--gradient-sunset); text-align: center;">
        <div style="max-width: 700px; margin: 0 auto;">
          <h2 style="font-family: var(--font-heading); font-size: 1.8rem; font-weight: 700; color: var(--text-primary); margin-bottom: var(--space-md);">
            🎀 Custom Orders Welcome!
          </h2>
          <p style="color: var(--text-secondary); font-size: 1rem; line-height: 1.7; margin-bottom: var(--space-xl);">
            Want a cake that's uniquely yours? Choose your flavours, toppings, tiers, and decorations.
            We'll create something magical just for you! ✨
          </p>
          <button class="btn btn--primary btn--large" onclick="location.hash='#/design'; Animations.createSparkle(event.clientX, event.clientY);">
            🎂 Design Your Cake
          </button>
        </div>
      </section>

      ${this.renderFooter()}
    `;

    // Stagger category cards animation
    setTimeout(() => {
      const grid = document.getElementById('categories-grid');
      if (grid) Animations.staggerChildren(grid, 'animate-slideUp', 80);
    }, 300);

    // Add floating bubbles to hero
    const hero = document.getElementById('hero');
    if (hero) Animations.createBubbles(hero, 6);
  },

  renderDesignPage() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="design-page page">
        <button class="back-btn" onclick="location.hash='#/'">← Back to Menu</button>

        <div class="category-page__header" style="background: ${getCategory('cakes').bgGradient};">
          <span class="category-page__emoji">🎨</span>
          <div>
            <h1 class="category-page__title">Design Your Cake</h1>
            <p class="category-page__desc">Choose whether to modify an existing cake or build your own from scratch.</p>
          </div>
        </div>

        <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: var(--space-xl); padding: var(--space-2xl) 0;">
          <div class="option-card" style="padding: var(--space-xl); background: var(--white); border-radius: var(--radius-xl); box-shadow: var(--shadow-soft); display:flex; flex-direction:column; gap:var(--space-md); align-items:flex-start;">
            <h2 style="margin:0;">Modify Existing Cake Options</h2>
            <p style="color: var(--text-secondary);">Select a cake from our Cakes menu and tweak its size, tiers, icing or toppings.</p>
            <div style="margin-top: auto; display:flex; gap:var(--space-md);">
              <button class="btn btn--primary" onclick="location.hash='#/cakes'; Animations.createSparkle(event.clientX, event.clientY);">Go to Cakes</button>
            </div>
          </div>

          <div class="option-card" style="padding: var(--space-xl); background: var(--white); border-radius: var(--radius-xl); box-shadow: var(--shadow-soft); display:flex; flex-direction:column; gap:var(--space-md); align-items:flex-start;">
            <h2 style="margin:0;">Make My Own</h2>
            <p style="color: var(--text-secondary);">Build your custom cake: choose tiers, weight, base flavour, icing, toppings and any custom notes.</p>
            <div style="margin-top: auto; display:flex; gap:var(--space-md);">
              <button class="btn btn--secondary" onclick="location.hash='#/make-my-cake'; Animations.createSparkle(event.clientX, event.clientY);">Start Building</button>
            </div>
          </div>
        </div>

      ${this.renderFooter()}
    `;
  },

  /* ========================
     CATEGORY PAGE
     ======================== */
  renderCategory(categoryId) {
    const category = getCategory(categoryId);
    const products = PRODUCTS[categoryId] || [];
    const app = document.getElementById('app');

    if (!category) {
      app.innerHTML = `
        <div class="empty-state">
          <div class="empty-state__emoji">😕</div>
          <h2 class="empty-state__title">Category Not Found</h2>
          <p class="empty-state__desc">Looks like this category doesn't exist.</p>
          <button class="btn btn--primary" onclick="location.hash='#/'">🏠 Go Home</button>
        </div>
      `;
      return;
    }

    app.innerHTML = `
      <div class="category-page page">
        <button class="back-btn" onclick="location.hash='#/'">
          ← Back to Menu
        </button>
        
        <div class="category-page__header" style="background: ${category.bgGradient};">
          <span class="category-page__emoji">${category.emoji}</span>
          <div>
            <h1 class="category-page__title">${category.name}</h1>
            <p class="category-page__desc">${category.description}</p>
          </div>
        </div>

        <div class="products-grid" id="products-grid">
          ${products.map((product, i) => `
            <div class="product-card" 
                 onclick="Animations.createRipple(event, this); setTimeout(() => location.hash = '#/item/${categoryId}/${product.id}', 250);"
                 style="animation-delay: ${i * 80}ms;"
                 id="product-${product.id}">
              <div class="product-card__image" style="background: ${product.cardGradient};">
                <span class="product-card__image-emoji">${category.emoji}</span>
                <span class="product-card__sticker">${product.sticker}</span>
                <span class="product-card__sticker-label">${product.stickerLabel}</span>
              </div>
              <div class="product-card__info">
                <h3 class="product-card__name">${product.name}</h3>
                <div class="product-card__price">${formatPrice(product.price)}</div>
                ${product.allergens.length > 0 ? `
                  <div class="product-card__allergen-dots">
                    ${product.allergens.map(() => '<span class="product-card__allergen-dot"></span>').join('')}
                  </div>
                ` : ''}
              </div>
            </div>
          `).join('')}
        </div>
        ${categoryId === 'cakes' ? `
          <div class="section-note" style="margin-top: var(--space-xl); padding: var(--space-xl); background: var(--white); border-radius: var(--radius-xl); box-shadow: var(--shadow-soft);">
            <p style="margin: 0; font-size: 0.98rem; color: var(--text-secondary);">
              🎨 Want a truly custom cake? Visit the <button class="link-btn" onclick="location.hash='#/design'">Design Your Cake</button> page. All other menu items are pre-made and fixed.
            </p>
          </div>
        ` : ''}
      </div>
      ${this.renderFooter()}
    `;

    // Stagger product cards
    setTimeout(() => {
      const grid = document.getElementById('products-grid');
      if (grid) Animations.staggerChildren(grid, 'animate-slideUp', 80);
    }, 100);
  },

  /* ========================
     ITEM DETAIL PAGE
     ======================== */
  renderItem(categoryId, productId) {
    const category = getCategory(categoryId);
    const product = getProduct(categoryId, productId);
    const app = document.getElementById('app');

    if (!product || !category) {
      app.innerHTML = `
        <div class="empty-state">
          <div class="empty-state__emoji">😕</div>
          <h2 class="empty-state__title">Item Not Found</h2>
          <p class="empty-state__desc">This item doesn't seem to exist.</p>
          <button class="btn btn--primary" onclick="location.hash='#/'">🏠 Go Home</button>
        </div>
      `;
      return;
    }

    app.innerHTML = `
      <div class="item-page page">
        <button class="back-btn" onclick="location.hash='#/${categoryId}'">
          ← Back to ${category.name}
        </button>

        <div class="item-page__card">
          <div class="item-page__hero">
            <div class="item-page__image" style="background: ${product.cardGradient};">
              <span class="item-page__image-emoji">${category.emoji}</span>
              <span class="item-page__image-sticker">${product.sticker}</span>
            </div>
            <div class="item-page__details">
              <h1 class="item-page__name">${product.name}</h1>
              <div class="item-page__price" id="item-price">${formatPrice(product.price)}</div>
              <p class="item-page__desc">${product.description}</p>
              <span class="item-page__weight">⚖️ ${product.weight}</span>
              
              <!-- Allergens -->
              ${product.allergens.length > 0 ? `
                <div class="allergens">
                  <div class="allergens__title">⚠️ Allergen Information</div>
                  <div class="allergens__list">
                    ${product.allergens.map(a => `<span class="badge badge--allergen">${a}</span>`).join('')}
                  </div>
                </div>
              ` : ''}

              <!-- Ingredients -->
              <div class="ingredients">
                <div class="ingredients__title">📋 Ingredients</div>
                <ul class="ingredients__list">
                  ${product.ingredients.map(ing => `<li class="ingredients__item">${ing}</li>`).join('')}
                </ul>
              </div>
            </div>
          </div>

          <!-- Add to Cart -->
          <div style="padding: var(--space-xl) var(--space-2xl) var(--space-2xl); display: flex; gap: var(--space-md); align-items: center; flex-wrap: wrap;">
            <div class="qty-control">
              <button class="qty-control__btn" onclick="Pages.updateItemQty(-1)">−</button>
              <span class="qty-control__value" id="item-qty">1</span>
              <button class="qty-control__btn" onclick="Pages.updateItemQty(1)">+</button>
            </div>
              <button class="btn btn--primary btn--large" id="add-to-order-btn"
                    onclick="Pages.addCurrentItemToOrderList('${categoryId}', '${productId}', event)">
              📝 Add to Order List — <span id="item-total-price">${formatPrice(product.price)}</span>
            </button>
          </div>
        </div>

        <!-- Special Message -->
        <div style="margin-top: var(--space-xl); padding: var(--space-xl); background: var(--white); border-radius: var(--radius-xl); box-shadow: var(--shadow-soft);">
          <h3 style="font-family: var(--font-heading); font-weight: 700; margin-bottom: var(--space-md); display: flex; align-items: center; gap: var(--space-sm);">
            💌 Add a Special Message
          </h3>
          <textarea class="form-textarea" id="special-message" placeholder="Write a message to go with your order (e.g., 'Happy Birthday Mom!')..." rows="3"></textarea>
        </div>
      </div>
      ${this.renderFooter()}
    `;

    // Store current item state
    this._currentItem = {
      product,
      categoryId,
      quantity: 1,
      options: {
        weight: null,
        baseFlavor: null,
        toppingFlavor: null,
        tier: null,
        topper: null,
        addOns: [],
        message: '',
      }
    };

    this.recalcItemPrice();
  },

  renderCustomization(product) {
    return `
      <div class="customization">
        <h3 class="customization__title">🎨 Customise Your Order</h3>
        <div class="customization__grid">
          <!-- Tiers -->
          <div class="form-group">
            <label class="form-label">🎂 Tiers</label>
            <select class="form-select" id="custom-tier" onchange="Pages.onCustomizationChange()">
              ${CUSTOMIZATION_OPTIONS.tiers.map(t => `
                <option value="${t.value}">${t.label}${t.priceExtra > 0 ? ' (+' + formatPrice(t.priceExtra) + ')' : ''}</option>
              `).join('')}
            </select>
          </div>

          <!-- Weight -->
          <div class="form-group">
            <label class="form-label">⚖️ Weight</label>
            <select class="form-select" id="custom-weight" onchange="Pages.onCustomizationChange()">
              ${CUSTOMIZATION_OPTIONS.weights.map(w => `
                <option value="${w.value}" ${w.value === 0.45 ? 'selected' : ''}>${w.label}</option>
              `).join('')}
            </select>
          </div>

          <!-- Base Flavor -->
          <div class="form-group">
            <label class="form-label">🍰 Base Flavour</label>
            <select class="form-select" id="custom-base" onchange="Pages.onCustomizationChange()">
              ${CUSTOMIZATION_OPTIONS.baseFlavors.map(f => `
                <option value="${f}">${f}</option>
              `).join('')}
            </select>
          </div>

          <!-- Topping Flavor -->
          <div class="form-group">
            <label class="form-label">🍦 Topping Flavour</label>
            <select class="form-select" id="custom-topping" onchange="Pages.onCustomizationChange()">
              ${CUSTOMIZATION_OPTIONS.toppingFlavors.map(f => `
                <option value="${f}">${f}</option>
              `).join('')}
            </select>
          </div>

          <!-- Add-ons -->
          <div class="customization__addons">
            <label class="form-label">🌟 Add-ons</label>
            <div class="customization__addons-grid">
              ${CUSTOMIZATION_OPTIONS.addOns.map(addon => `
                <label class="addon-chip" id="addon-${addon.name.replace(/\s+/g, '-')}">
                  <input type="checkbox" onchange="Pages.toggleAddon('${addon.name}', this.parentElement)" value="${addon.name}">
                  <span class="addon-chip__emoji">${addon.emoji}</span>
                  <span>${addon.name}</span>
                  <span class="addon-chip__price">+${formatPrice(addon.price)}</span>
                </label>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // --- Item page helpers ---

  _currentItem: null,

  updateItemQty(delta) {
    if (!this._currentItem) return;
    this._currentItem.quantity = Math.max(1, this._currentItem.quantity + delta);
    const qtyEl = document.getElementById('item-qty');
    if (qtyEl) {
      qtyEl.textContent = this._currentItem.quantity;
      Animations.pop(qtyEl);
    }
    this.recalcItemPrice();
  },

  onCustomizationChange() {
    if (!this._currentItem) return;
    const weightEl = document.getElementById('custom-weight');
    const tierEl = document.getElementById('custom-tier');
    const baseEl = document.getElementById('custom-base');
    const toppingEl = document.getElementById('custom-topping');

    if (weightEl) this._currentItem.options.weight = parseFloat(weightEl.value);
    if (tierEl) this._currentItem.options.tier = parseInt(tierEl.value);
    if (baseEl) this._currentItem.options.baseFlavor = baseEl.value;
    if (toppingEl) this._currentItem.options.toppingFlavor = toppingEl.value;

    this.recalcItemPrice();
    this.updateCakePreview();
    this.updateMakeMyCakeSummary();
  },

  toggleAddon(addonName, element) {
    if (!this._currentItem) return;
    const checkbox = element ? element.querySelector('input[type="checkbox"]') : null;
    const has = this._currentItem.options.addOns.indexOf(addonName) >= 0;

    if (checkbox) {
      // Sync based on checkbox state
      if (checkbox.checked && !has) {
        this._currentItem.options.addOns.push(addonName);
        element.classList.add('selected');
        Animations.pop(element);
      } else if (!checkbox.checked && has) {
        this._currentItem.options.addOns = this._currentItem.options.addOns.filter(a => a !== addonName);
        element.classList.remove('selected');
      }
    } else {
      // Fallback: toggle
      if (has) {
        this._currentItem.options.addOns = this._currentItem.options.addOns.filter(a => a !== addonName);
        if (element) element.classList.remove('selected');
      } else {
        this._currentItem.options.addOns.push(addonName);
        if (element) element.classList.add('selected');
        if (element) Animations.pop(element);
      }
    }

    this.recalcItemPrice();
  },

  recalcItemPrice() {
    if (!this._currentItem) return;
    const unitPrice = OrderList.calculateItemPrice(this._currentItem.product, this._currentItem.options);
    const total = unitPrice * this._currentItem.quantity;
    
    const priceEl = document.getElementById('item-price');
    const totalEl = document.getElementById('item-total-price');
    if (priceEl) priceEl.textContent = formatPrice(unitPrice);
    if (totalEl) totalEl.textContent = formatPrice(total);
  },

  addCurrentItemToOrderList(categoryId, productId, event) {
    if (!this._currentItem) return;
    
    const messageEl = document.getElementById('special-message');
    if (messageEl) this._currentItem.options.message = messageEl.value;

    const product = getProduct(categoryId, productId);
    const item = OrderList.addItem(product, categoryId, { ...this._currentItem.options });
    item.quantity = this._currentItem.quantity;
    OrderList.save();

    // Sparkle animation
    Animations.createSparkle(event.clientX, event.clientY, 15);

    // Show toast
    this.showToast(`${product.sticker} ${product.name} added to order list!`);

    // Bounce the button
    const btn = document.getElementById('add-to-order-btn');
    if (btn) Animations.addClickBounce(btn);
  },

  renderMakeMyCakePage() {
    const cakes = PRODUCTS.cakes;
    const defaultCake = cakes[0];
    const app = document.getElementById('app');

    this._currentItem = {
      product: defaultCake,
      categoryId: 'cakes',
      quantity: 1,
      options: {
        weight: 0.45,
        baseFlavor: CUSTOMIZATION_OPTIONS.baseFlavors[0],
        toppingFlavor: CUSTOMIZATION_OPTIONS.toppingFlavors[0],
        tier: 1,
        topper: null,
        addOns: [],
        message: '',
      }
    };

    app.innerHTML = `
      <div class="make-cake-page page">
        <button class="back-btn" onclick="location.hash='#/cakes'">← Back to Cakes</button>

        <div class="category-page__header" style="background: ${getCategory('cakes').bgGradient};">
          <span class="category-page__emoji">🎨</span>
          <div>
            <h1 class="category-page__title">Make My Cake</h1>
            <p class="category-page__desc">Build your cake from the base, icing, tier, toppers, and toppings.</p>
          </div>
        </div>

        <div class="customize-page__content" style="display: grid; gap: var(--space-xl); padding: var(--space-2xl) 0; grid-template-columns: minmax(300px, 1fr) 360px;">
          <div class="make-cake-left" style="display:grid; gap: var(--space-xl);">
            <div class="form-group">
              <label class="form-label">Choose Your Cake</label>
              <select class="form-select" id="custom-cake-selection" onchange="Pages.onCustomizeCakeChange()">
                ${cakes.map(cake => `
                  <option value="${cake.id}">${cake.name} — ${formatPrice(cake.price)}</option>
                `).join('')}
              </select>
            </div>
            <div class="product-card product-card--preview" style="display: grid; gap: var(--space-md); padding: var(--space-lg); background: var(--white); border-radius: var(--radius-xl); box-shadow: var(--shadow-soft);">
              <div class="product-card__image" id="custom-preview-image" style="background: ${defaultCake.cardGradient};">
                <span class="product-card__image-emoji">${defaultCake.sticker}</span>
                <span class="product-card__sticker">${defaultCake.stickerLabel}</span>
              </div>
              <div>
                <h2 id="custom-preview-name" style="margin: 0 0 var(--space-sm);">${defaultCake.name}</h2>
                <p id="custom-preview-description" style="margin: 0 0 var(--space-sm); color: var(--text-secondary);">${defaultCake.description}</p>
                <div style="display: flex; justify-content: space-between; align-items: center; gap: var(--space-sm);">
                  <div style="font-weight: 700;">Base Price</div>
                  <div id="custom-preview-base-price" style="font-weight: 700;">${formatPrice(defaultCake.price)}</div>
                </div>
              </div>
            </div>
            ${this.renderCakeBuilder(defaultCake)}
          </div>

          <div class="cake-builder-summary" style="display: grid; gap: var(--space-md); padding: var(--space-xl); background: var(--white); border-radius: var(--radius-xl); box-shadow: var(--shadow-soft);">
            <div class="cake-preview" id="cake-preview">
              <div class="cake-preview__stage" id="cake-preview-stage"></div>
              <div class="cake-preview__info">
                <div class="cake-preview__label">Cake preview</div>
                <div class="cake-preview__details" id="cake-preview-details">Choose a base and tier to begin.</div>
              </div>
            </div>
            <div class="cake-summary-list">
              <h3 style="margin:0; font-size:1rem; font-weight:700;">Your Selections</h3>
              <ul id="cake-summary-items" style="list-style:none; padding:0; margin:0; display:grid; gap: 0.75rem;"></ul>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; font-weight:700;">
              <span>Total</span>
              <span id="make-cake-total">${formatPrice(defaultCake.price)}</span>
            </div>
            <div style="display: flex; gap: var(--space-md); align-items: center; flex-wrap: wrap;">
              <div class="qty-control" style="margin-bottom: 0;">
                <button class="qty-control__btn" onclick="Pages.updateItemQty(-1)">−</button>
                <span class="qty-control__value" id="item-qty">1</span>
                <button class="qty-control__btn" onclick="Pages.updateItemQty(1)">+</button>
              </div>
              <button class="btn btn--primary btn--large" id="add-to-order-btn" onclick="Pages.addCurrentItemToOrderList('cakes', '${defaultCake.id}', event)">
                📝 Add Custom Cake — <span id="item-total-price">${formatPrice(defaultCake.price)}</span>
              </button>
            </div>
          </div>
        </div>

        <div style="padding: var(--space-xl); background: var(--white); border-radius: var(--radius-xl); box-shadow: var(--shadow-soft); margin-top: var(--space-xl);">
          <h3 style="font-family: var(--font-heading); font-weight: 700; margin-bottom: var(--space-md); display: flex; align-items: center; gap: var(--space-sm);">
            💌 Add a Special Message
          </h3>
          <textarea class="form-textarea" id="special-message" placeholder="Write a message to go with your order..." rows="3"></textarea>
        </div>
      </div>
      ${this.renderFooter()}
    `;

    this.updateCakePreview();
    this.updateMakeMyCakeSummary();
    this.recalcItemPrice();
  },

  renderCakeBuilder(product) {
    return `
      <div class="cake-builder">
        <div class="form-group">
          <label class="form-label">🎂 Tiers</label>
          <select class="form-select" id="custom-tier" onchange="Pages.onCustomizationChange()">
            ${CUSTOMIZATION_OPTIONS.tiers.map(t => `
              <option value="${t.value}">${t.label}${t.priceExtra > 0 ? ' (+' + formatPrice(t.priceExtra) + ')' : ''}</option>
            `).join('')}
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">⚖️ Cake Size</label>
          <select class="form-select" id="custom-weight" onchange="Pages.onCustomizationChange()">
            ${CUSTOMIZATION_OPTIONS.weights.map(w => `
              <option value="${w.value}" ${w.value === 0.45 ? 'selected' : ''}>${w.label}</option>
            `).join('')}
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">🍰 Base Flavor</label>
          <select class="form-select" id="custom-base" onchange="Pages.onCustomizationChange()">
            ${CUSTOMIZATION_OPTIONS.baseFlavors.map(f => `
              <option value="${f}">${f}</option>
            `).join('')}
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">🍦 Icing Flavor</label>
          <select class="form-select" id="custom-topping" onchange="Pages.onCustomizationChange()">
            ${CUSTOMIZATION_OPTIONS.toppingFlavors.map(f => `
              <option value="${f}">${f}</option>
            `).join('')}
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">🎉 Cake Topper</label>
          <select class="form-select" id="cake-topper-select" onchange="Pages.onCakeTopperChange()">
            <option value="">None</option>
            ${CUSTOMIZATION_OPTIONS.cakeToppers.map(topper => `
              <option value="${topper.name}">${topper.name} (+${formatPrice(topper.price)})</option>
            `).join('')}
          </select>
        </div>
        <div class="customization__addons">
          <label class="form-label">🌟 Extra Toppings</label>
          <div class="customization__addons-grid">
            ${CUSTOMIZATION_OPTIONS.addOns.map(addon => `
              <label class="addon-chip" id="addon-${addon.name.replace(/\s+/g, '-') }">
                <input type="checkbox" onchange="Pages.toggleAddon('${addon.name}', this.parentElement)" value="${addon.name}">
                <span class="addon-chip__emoji">${addon.emoji}</span>
                <span>${addon.name}</span>
                <span class="addon-chip__price">+${formatPrice(addon.price)}</span>
              </label>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  },

  onCakeTopperChange() {
    if (!this._currentItem) return;
    const topperSelect = document.getElementById('cake-topper-select');
    if (!topperSelect) return;

    this._currentItem.options.topper = topperSelect.value || null;
    this.updateCakePreview();
    this.recalcItemPrice();
    this.updateMakeMyCakeSummary();
  },

  onCustomizeCakeChange() {
    const select = document.getElementById('custom-cake-selection');
    if (!select || !this._currentItem) return;

    const cake = getProduct('cakes', select.value);
    if (!cake) return;

    this._currentItem.product = cake;
    this._currentItem.categoryId = 'cakes';
    this._currentItem.quantity = 1;

    const qtyEl = document.getElementById('item-qty');
    if (qtyEl) qtyEl.textContent = '1';

    const btn = document.getElementById('add-to-order-btn');
    if (btn) btn.setAttribute('onclick', `Pages.addCurrentItemToOrderList('cakes', '${cake.id}', event)`);

    this._currentItem.options.addOns = [];
    document.querySelectorAll('.addon-chip.selected').forEach(chip => {
      chip.classList.remove('selected');
      const checkbox = chip.querySelector('input[type="checkbox"]');
      if (checkbox) checkbox.checked = false;
    });

    const topperSelect = document.getElementById('cake-topper-select');
    if (topperSelect) topperSelect.value = '';
    this._currentItem.options.topper = null;

    this.updateCakePreview();
    this.recalcItemPrice();
    this.updateMakeMyCakeSummary();
  },

  updateCakePreview() {
    const cake = this._currentItem.product;
    const stage = document.getElementById('cake-preview-stage');
    const details = document.getElementById('cake-preview-details');
    if (!stage || !details) return;

    const baseEmoji = this.getBaseEmoji(this._currentItem.options.baseFlavor || cake.name);
    const tierCount = this._currentItem.options.tier || 1;
    const topperEmoji = this.getTopperEmoji(this._currentItem.options.topper);
    const icingEmoji = this.getIcingEmoji(this._currentItem.options.toppingFlavor);

    stage.innerHTML = '';
    for (let i = 0; i < tierCount; i++) {
      const layer = document.createElement('div');
      layer.className = 'cake-layer visible';
      layer.textContent = baseEmoji;
      layer.style.animationDelay = `${i * 120}ms`;
      stage.appendChild(layer);
    }

    if (topperEmoji) {
      const topper = document.createElement('div');
      topper.className = 'cake-topper visible';
      topper.textContent = topperEmoji;
      stage.appendChild(topper);
    }

    details.textContent = `Base: ${this._currentItem.options.baseFlavor || cake.name}, Icing: ${this._currentItem.options.toppingFlavor || 'None'}, Tiers: ${tierCount}${this._currentItem.options.topper ? `, Topper: ${this._currentItem.options.topper}` : ''}`;
    Animations.pop(stage);
  },

  getBaseEmoji(flavor) {
    const map = {
      'Chocolate Sponge': '🍫',
      'Vanilla Sponge': '🍰',
      'Red Velvet': '🌹',
      'Butterscotch': '🍯',
      'Pineapple': '🍍',
      'Strawberry': '🍓',
      'Coffee': '☕',
    };
    return map[flavor] || '🍰';
  },

  getTopperEmoji(topper) {
    const topperPage2 = (CUSTOMIZATION_OPTIONS.cakeToppers || []).find(t => t.name === topper);
    return topperPage2 ? topperPage2.emoji : '🎂';
  },

  getIcingEmoji(icing) {
    const map = {
      'Buttercream': '🧈',
      'Whipped Cream': '🍦',
      'Chocolate Ganache': '🍫',
      'Cream Cheese': '🧀',
      'Fondant': '🧁',
      'Fresh Fruit': '🍓',
      'Caramel Drizzle': '🍯',
      'Strawberry Glaze': '🍓',
    };
    return map[icing] || '✨';
  },

  updateMakeMyCakeSummary() {
    const summary = document.getElementById('cake-summary-items');
    const totalEl = document.getElementById('make-cake-total');
    if (!summary || !totalEl) return;

    const lines = [];
    const opt = this._currentItem.options;
    const cake = this._currentItem.product;

    lines.push(`<li>Base: ${opt.baseFlavor || cake.name}</li>`);
    lines.push(`<li>Icing: ${opt.toppingFlavor || 'None'}</li>`);
    lines.push(`<li>Tier: ${opt.tier || 1}</li>`);
    if (opt.topper) {
      const topper = CUSTOMIZATION_OPTIONS.cakeToppers.find(t => t.name === opt.topper);
      const topperLabel = topper ? `${opt.topper} (+${formatPrice(topper.price)})` : opt.topper;
      lines.push(`<li>Topper: ${topperLabel}</li>`);
    }
    if (opt.addOns.length > 0) {
      opt.addOns.forEach(addonName => {
        const addon = CUSTOMIZATION_OPTIONS.addOns.find(a => a.name === addonName);
        lines.push(`<li>${addonName}${addon ? ` (+${formatPrice(addon.price)})` : ''}</li>`);
      });
    }
    if (opt.message) {
      lines.push(`<li>Note: ${opt.message}</li>`);
    }

    summary.innerHTML = lines.join('');
    totalEl.textContent = formatPrice(this._currentItem.quantity * OrderList.calculateItemPrice(cake, opt));
  },

  /* ========================
     ORDER LIST PAGE
     ======================== */
  renderOrderList() {
    const app = document.getElementById('app');
    const items = OrderList.items;

    if (items.length === 0) {
      app.innerHTML = `
        <div class="empty-state" style="min-height: calc(100vh - 70px); display: flex; flex-direction: column; align-items: center; justify-content: center;">
          <div class="empty-state__emoji">📝</div>
          <h2 class="empty-state__title">Your order list is empty!</h2>
          <p class="empty-state__desc">Select treats and custom orders to build your preparation list for the shop manager.</p>
          <button class="btn btn--primary btn--large" onclick="location.hash='#/'">🍰 Browse Menu</button>
        </div>
      `;
      return;
    }

    app.innerHTML = `
      <div class="cart-page page">
        <button class="back-btn" onclick="location.hash='#/'">← Back to Menu</button>

        <h1 class="cart-page__title">📝 Your Order List</h1>

        <div id="cart-items">
          ${items.map((item, i) => `
            <div class="cart-item" style="animation-delay: ${i * 80}ms;" id="cart-item-${item.id}">
              <div class="cart-item__image" style="background: ${item.cardGradient || 'var(--gradient-warm)'};">
                ${item.sticker || '🍰'}
              </div>
              <div class="cart-item__info">
                <div class="cart-item__name">
                  ${item.name}
                  ${item.options.addOns && item.options.addOns.length > 0 ? `
                    <span class="cart-item__addon-tag">(${item.options.addOns.map(addonName => {
                      const addon = CUSTOMIZATION_OPTIONS.addOns.find(a => a.name === addonName);
                      return addon ? `${addon.name} +${formatPrice(addon.price)}` : addonName;
                    }).join(', ')})
                  ` : ''}
                </div>
                <div class="cart-item__options">
                  ${item.options.weight ? `${item.options.weight}kg` : ''}
                  ${item.options.baseFlavor ? ` · ${item.options.baseFlavor}` : ''}
                  ${item.options.toppingFlavor ? ` · ${item.options.toppingFlavor}` : ''}
                  ${item.options.tier && item.options.tier > 1 ? ` · ${item.options.tier}-Tier` : ''}
                  ${item.options.message ? ` · Message: ${item.options.message}` : ''}
                </div>
                ${item.options.addOns && item.options.addOns.length > 0 ? `
                  <div class="cart-item__addons">Add-ons: ${item.options.addOns.map(addonName => {
                    const addon = CUSTOMIZATION_OPTIONS.addOns.find(a => a.name === addonName);
                    return addon ? `${addon.name} (+${formatPrice(addon.price)})` : addonName;
                  }).join(', ')}</div>
                ` : ''}
              </div>
              <div class="qty-control">
                <button class="qty-control__btn" onclick="Pages.orderListUpdateQty('${item.id}', -1)">−</button>
                <span class="qty-control__value" id="qty-${item.id}">${item.quantity}</span>
                <button class="qty-control__btn" onclick="Pages.orderListUpdateQty('${item.id}', 1)">+</button>
              </div>
              <div class="cart-item__price">${formatPrice(item.totalPrice * item.quantity)}</div>
              <button class="cart-item__remove" onclick="Pages.orderListRemoveItem('${item.id}')" title="Remove">✕</button>
            </div>
          `).join('')}
        </div>

        <div class="cart-summary">
          <h3 class="cart-summary__title">📋 Order List Summary</h3>
          <div class="cart-summary__row">
            <span>Items</span>
            <span>${OrderList.getItemCount()}</span>
          </div>
          <div class="cart-summary__row cart-summary__row--total">
            <span>Total Expense</span>
            <span>${formatPrice(OrderList.getSubtotal())}</span>
          </div>
          <div style="margin-top: var(--space-xl); display: flex; gap: var(--space-md); flex-wrap: wrap;">
            <button class="btn btn--primary btn--large" style="flex: 1;" onclick="Pages.sendWhatsAppOrder(event);">
              ✅ Confirm & Send via WhatsApp
            </button>
            <button class="btn btn--ghost btn--small" onclick="if(confirm('Clear the entire order list?')){OrderList.clear(); Pages.renderOrderList();}">
              🗑️ Clear Order List
            </button>
          </div>
        </div>
      </div>
      ${this.renderFooter()}
    `;
  },

  orderListUpdateQty(itemId, delta) {
    const item = OrderList.items.find(i => i.id === itemId);
    if (!item) return;
    const newQty = item.quantity + delta;
    if (newQty <= 0) {
      this.orderListRemoveItem(itemId);
      return;
    }
    OrderList.updateQuantity(itemId, newQty);
    this.renderOrderList();
  },

  orderListRemoveItem(itemId) {
    const el = document.getElementById(`cart-item-${itemId}`);
    if (el) {
      el.style.transition = 'all 300ms ease';
      el.style.transform = 'translateX(100px)';
      el.style.opacity = '0';
      setTimeout(() => {
        OrderList.removeItem(itemId);
        this.renderOrderList();
      }, 300);
    } else {
      OrderList.removeItem(itemId);
      this.renderOrderList();
    }
  },

  getWhatsAppOrderText(items) {
    const header = '*New Order from Digital Menu!* 🍰';
    const separator = '-----------------------------';
    const lines = [header, separator, `*Shop:* ${SHOP_INFO.name}`, separator];

    items.forEach(item => {
      const optionParts = [];
      if (item.options.weight) optionParts.push(`${item.options.weight}kg`);
      if (item.options.tier && item.options.tier > 1) optionParts.push(`${item.options.tier}-Tier`);
      if (item.options.baseFlavor) optionParts.push(item.options.baseFlavor);
      if (item.options.toppingFlavor) optionParts.push(item.options.toppingFlavor);
      const addonDetails = item.options.addOns && item.options.addOns.length > 0
        ? item.options.addOns.map(addonName => {
            const addon = CUSTOMIZATION_OPTIONS.addOns.find(a => a.name === addonName);
            return addon ? `${addon.name} (+${formatPrice(addon.price)})` : addonName;
          })
        : [];
      if (addonDetails.length > 0) optionParts.push(`Add-ons: ${addonDetails.join(', ')}`);

      const optionText = optionParts.length ? ` (${optionParts.join(', ')})` : '';
      lines.push(`• ${item.quantity}x ${item.name}${optionText}`);
      if (item.options.message) {
        lines.push(`  _Note:_ ${item.options.message}`);
      }
    });

    lines.push(separator);
    lines.push(`*Total Amount:* ${formatPrice(OrderList.getSubtotal())}`);
    lines.push('Please prepare my order for pickup.');

    return lines.join('\n');
  },

  sendWhatsAppOrder(event) {
    if (OrderList.items.length === 0) {
      this.showToast('📝 Your order list is empty. Add items before sending.');
      return;
    }

    const phone = SHOP_INFO.whatsappPhone || SHOP_INFO.phone.replace(/\D/g, '');
    const text = this.getWhatsAppOrderText(OrderList.items);
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;

    window.open(url, '_blank');
    Animations.createSparkle(event.clientX, event.clientY, 20);
  },

  /* ========================
     ORDER CONFIRMATION
     ======================== */
  renderOrderConfirmation(orderId) {
    const app = document.getElementById('app');

    app.innerHTML = `
      <div class="confirmation-page">
        <div class="confirmation__card">
          <div class="confirmation__emoji">🎉</div>
          <h1 class="confirmation__title">Order List Submitted!</h1>
          <p class="confirmation__subtitle">Your digital order list is ready for the shop manager.</p>
          <p style="color: var(--text-muted); font-size: 0.9rem;">Share this order ID with the staff so they can prepare your items quickly.</p>
          <div class="confirmation__order-id">Order ID: ${orderId || generateOrderId()}</div>
          <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: var(--space-xl);">
            Thank you for using Shimmers digital menu. If you want to update the list, start again from the menu.</p>
          <button class="btn btn--primary btn--large" onclick="location.hash='#/'">
            🏠 Back to Menu
          </button>
        </div>
      </div>
    `;

    setTimeout(() => Animations.orderCelebration(), 400);
  },

  /* ========================
     FOOTER (shared)
     ======================== */
  renderFooter() {
    return `
      <footer class="footer" id="contact">
        <div class="footer__decor">🧁 · 🍰 · 🍪 · ✨ · 🎂 · 🍩</div>
        <div class="footer__content">
          <div class="footer__brand">
            <div class="footer__logo">✨ Shimmers</div>
            <p class="footer__tagline">${SHOP_INFO.tagline}</p>
            <p style="font-size: 0.85rem; color: var(--text-muted);">
              Handcrafted with love — freshly baked daily in our sunny kitchen.
            </p>
          </div>
          <div>
            <h4 class="footer__section-title">📍 Visit Us</h4>
            <div class="footer__info">
              <div class="footer__info-item">
                <span class="footer__info-icon">🏠</span>
                <span>${SHOP_INFO.address}</span>
              </div>
              <div class="footer__info-item">
                <span class="footer__info-icon">🕐</span>
                <span>${SHOP_INFO.hours}</span>
              </div>
            </div>
          </div>
          <div>
            <h4 class="footer__section-title">📞 Contact</h4>
            <div class="footer__info">
              <div class="footer__info-item">
                <span class="footer__info-icon">📞</span>
                <span>${SHOP_INFO.phone}</span>
              </div>
              <div class="footer__info-item">
                <span class="footer__info-icon">✉️</span>
                <span>${SHOP_INFO.email}</span>
              </div>
              <div class="footer__info-item">
                <span class="footer__info-icon">📸</span>
                <span>${SHOP_INFO.instagram}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="footer__bottom">
          <p>© 2026 Shimmers Bakery — Made with <span class="footer__heart">♥</span> and lots of sugar!</p>
        </div>
      </footer>
    `;
  },

  /* ========================
     TOAST NOTIFICATION
     ======================== */
  showToast(message, duration = 3000) {
    // Remove existing toast
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <span class="toast__emoji">✨</span>
      <span class="toast__message">${message}</span>
    `;
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        toast.classList.add('show');
      });
    });

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 500);
    }, duration);
  },
};
