/* ============================================
   SHIMMERS BAKERY — Order List Logic
   ============================================ */

const OrderList = {
  items: [],

  init() {
    const saved = localStorage.getItem('shimmers_order_list');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        this.items = data.items || [];
      } catch (e) {
        this.items = [];
      }
    }
    this.updateBadge();
  },

  save() {
    localStorage.setItem('shimmers_order_list', JSON.stringify({
      items: this.items,
    }));
    this.updateBadge();
    EventBus.emit('order-list:updated', this.items);
  },

  addItem(product, categoryId, options = {}) {
    const item = {
      id: Date.now().toString(36) + Math.random().toString(36).substr(2, 5),
      productId: product.id,
      categoryId: categoryId,
      name: product.name,
      sticker: product.sticker,
      basePrice: product.price,
      cardGradient: product.cardGradient,
      quantity: 1,
      options: options,
      totalPrice: this.calculateItemPrice(product, options),
    };
    this.items.push(item);
    this.save();
    return item;
  },

  calculateItemPrice(product, options) {
    let price = product.price;
    
    // Weight multiplier
    if (options.weight) {
      const weightOption = CUSTOMIZATION_OPTIONS.weights.find(w => w.value === options.weight);
      if (weightOption) {
        price = Math.round(price * weightOption.priceMultiplier);
      }
    }
    
    // Tier extra
    if (options.tier) {
      const tierOption = CUSTOMIZATION_OPTIONS.tiers.find(t => t.value === options.tier);
      if (tierOption) {
        price += tierOption.priceExtra;
      }
    }
    
    // Add-ons
    if (options.addOns && options.addOns.length > 0) {
      options.addOns.forEach(addonName => {
        const addon = CUSTOMIZATION_OPTIONS.addOns.find(a => a.name === addonName);
        if (addon) price += addon.price;
      });
    }
    
    return price;
  },

  removeItem(itemId) {
    this.items = this.items.filter(item => item.id !== itemId);
    this.save();
  },

  updateQuantity(itemId, quantity) {
    const item = this.items.find(i => i.id === itemId);
    if (item) {
      if (quantity <= 0) {
        this.removeItem(itemId);
      } else {
        item.quantity = quantity;
        this.save();
      }
    }
  },

  getSubtotal() {
    return this.items.reduce((sum, item) => sum + (item.totalPrice * item.quantity), 0);
  },

  getItemCount() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  },

  clear() {
    this.items = [];
    this.save();
  },

  updateBadge() {
    const badge = document.getElementById('cart-badge');
    if (badge) {
      const count = this.getItemCount();
      badge.textContent = count;
      badge.dataset.count = count;
      badge.style.display = count > 0 ? 'flex' : 'none';
      if (count > 0) {
        badge.style.animation = 'none';
        void badge.offsetHeight;
        badge.style.animation = 'bounceIn 400ms cubic-bezier(0.34, 1.56, 0.64, 1)';
      }
    }
  }
};
