/* ============================================
   SHIMMERS BAKERY — Animations
   ============================================ */

const Animations = {
  /**
   * Create sparkle burst at a given position
   */
  createSparkle(x, y, count = 12) {
    const colors = [
      'var(--pink-400)', 'var(--yellow-400)', 'var(--blue-300)',
      'var(--green-400)', 'var(--pink-300)', '#FFD700'
    ];
    const symbols = ['✦', '✧', '★', '·', '✶', '✷'];
    
    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.className = 'sparkle-particle';
      
      const angle = (360 / count) * i;
      const distance = 30 + Math.random() * 60;
      const size = 10 + Math.random() * 16;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const symbol = symbols[Math.floor(Math.random() * symbols.length)];
      
      particle.style.cssText = `
        left: ${x}px;
        top: ${y}px;
        --sparkle-size: ${size}px;
        --sparkle-color: ${color};
        animation-duration: ${500 + Math.random() * 500}ms;
      `;
      particle.textContent = symbol;
      particle.style.fontSize = `${size}px`;
      particle.style.color = color;
      
      // Animate outward
      const tx = Math.cos(angle * Math.PI / 180) * distance;
      const ty = Math.sin(angle * Math.PI / 180) * distance;
      
      document.body.appendChild(particle);
      
      requestAnimationFrame(() => {
        particle.style.transition = `all ${500 + Math.random() * 500}ms cubic-bezier(0.34, 1.56, 0.64, 1)`;
        particle.style.transform = `translate(${tx}px, ${ty}px) scale(0) rotate(${Math.random() * 360}deg)`;
        particle.style.opacity = '0';
      });
      
      setTimeout(() => particle.remove(), 1200);
    }
  },

  /**
   * Full-screen confetti celebration
   */
  createConfetti(count = 80) {
    const colors = [
      '#ff85b3', '#ffadd2', '#ffd6e7',  // pink
      '#7dd3fc', '#bae6fd',              // blue
      '#fde68a', '#fbbf24',              // yellow
      '#a7f3d0', '#6ee7b7',              // green
      '#f5e6c8',                         // beige
    ];
    
    const container = document.createElement('div');
    container.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:9999;overflow:hidden;';
    document.body.appendChild(container);
    
    for (let i = 0; i < count; i++) {
      const piece = document.createElement('div');
      const color = colors[Math.floor(Math.random() * colors.length)];
      const left = Math.random() * 100;
      const size = 6 + Math.random() * 10;
      const duration = 2 + Math.random() * 3;
      const delay = Math.random() * 1.5;
      const shapes = ['50%', '0', '30%'];
      const shape = shapes[Math.floor(Math.random() * shapes.length)];
      
      piece.style.cssText = `
        position: absolute;
        top: -20px;
        left: ${left}%;
        width: ${size}px;
        height: ${size * 1.3}px;
        background: ${color};
        border-radius: ${shape};
        animation: confettiFall ${duration}s ease-in ${delay}s forwards;
        transform: rotate(${Math.random() * 360}deg);
      `;
      
      container.appendChild(piece);
    }
    
    setTimeout(() => container.remove(), 6000);
  },

  /**
   * Add click bounce animation to an element
   */
  addClickBounce(element) {
    element.addEventListener('click', function(e) {
      this.style.animation = 'none';
      void this.offsetHeight; // trigger reflow
      this.style.animation = 'bounce 400ms cubic-bezier(0.34, 1.56, 0.64, 1)';
    });
  },

  /**
   * Create click ripple effect
   */
  createRipple(event, element) {
    const rect = element.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${event.clientY - rect.top - size / 2}px`;
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  },

  /**
   * Create floating background bubbles
   */
  createBubbles(container, count = 8) {
    const colors = ['var(--pink-300)', 'var(--blue-300)', 'var(--yellow-300)', 'var(--green-300)'];
    
    for (let i = 0; i < count; i++) {
      const bubble = document.createElement('div');
      bubble.className = 'bubble';
      const size = 20 + Math.random() * 60;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const left = Math.random() * 100;
      const duration = 6 + Math.random() * 8;
      const delay = Math.random() * 5;
      
      bubble.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        left: ${left}%;
        bottom: -${size}px;
        --bubble-duration: ${duration}s;
        animation-delay: ${delay}s;
      `;
      
      container.appendChild(bubble);
    }
  },

  /**
   * Stagger animation for child elements
   */
  staggerChildren(parent, animationClass = 'animate-slideUp', baseDelay = 80) {
    const children = parent.children;
    for (let i = 0; i < children.length; i++) {
      children[i].style.opacity = '0';
      children[i].style.animationDelay = `${i * baseDelay}ms`;
      children[i].classList.add(animationClass);
    }
  },

  /**
   * Page transition
   */
  pageTransition(appEl, renderFn) {
    appEl.style.animation = 'none';
    void appEl.offsetHeight;
    renderFn();
    appEl.style.animation = 'fadeInScale 400ms ease forwards';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  /**
   * Order placed sparkle celebration - big one!
   */
  orderCelebration() {
    // Multiple sparkle bursts
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    this.createSparkle(centerX, centerY, 20);
    setTimeout(() => this.createSparkle(centerX - 100, centerY - 50, 15), 200);
    setTimeout(() => this.createSparkle(centerX + 100, centerY - 50, 15), 400);
    setTimeout(() => this.createConfetti(100), 300);
    
    // Additional sparkle bursts at random positions
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        this.createSparkle(
          Math.random() * window.innerWidth,
          Math.random() * window.innerHeight,
          8
        );
      }, 600 + i * 300);
    }
  },

  /**
   * Discount applied celebration
   */
  discountCelebration(element) {
    const rect = element.getBoundingClientRect();
    this.createSparkle(
      rect.left + rect.width / 2,
      rect.top + rect.height / 2,
      15
    );
  },

  /**
   * Wiggle animation on element
   */
  wiggle(element) {
    element.style.animation = 'none';
    void element.offsetHeight;
    element.style.animation = 'wiggle 600ms ease-in-out';
  },

  /**
   * Pop animation on element
   */
  pop(element) {
    element.style.animation = 'none';
    void element.offsetHeight;
    element.style.animation = 'pop 300ms cubic-bezier(0.34, 1.56, 0.64, 1)';
  }
};
