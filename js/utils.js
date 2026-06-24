/* ============================================
   SHIMMERS BAKERY — Utility Helpers
   ============================================ */

function formatPrice(amount) {
  return '₹' + amount.toLocaleString('en-IN');
}

function generateOrderId() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let id = 'SHM-';
  for (let i = 0; i < 6; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
}

function $(selector, parent = document) {
  return parent.querySelector(selector);
}

function $$(selector, parent = document) {
  return Array.from(parent.querySelectorAll(selector));
}

function createElement(tag, className = '', innerHTML = '') {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (innerHTML) el.innerHTML = innerHTML;
  return el;
}

function getCategory(id) {
  return CATEGORIES.find(c => c.id === id);
}

function getProduct(categoryId, productId) {
  const products = PRODUCTS[categoryId];
  if (!products) return null;
  return products.find(p => p.id === productId);
}

function getCategoryEmoji(categoryId) {
  const cat = getCategory(categoryId);
  return cat ? cat.emoji : '🍰';
}

// Debounce utility
function debounce(fn, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

// Simple event bus
const EventBus = {
  _events: {},
  on(event, callback) {
    if (!this._events[event]) this._events[event] = [];
    this._events[event].push(callback);
  },
  emit(event, data) {
    if (this._events[event]) {
      this._events[event].forEach(cb => cb(data));
    }
  },
  off(event, callback) {
    if (this._events[event]) {
      this._events[event] = this._events[event].filter(cb => cb !== callback);
    }
  }
};
