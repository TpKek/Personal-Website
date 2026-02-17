/**
 * Fintech Portfolio - Interactive JavaScript
 * Handles navigation, animations, and user interactions
 */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initScrollAnimations();
  initSmoothScroll();
  initActiveNavigation();
  initSpotlight();
  initParticles();
  initTerminalTime();
});

/**
 * Mobile Navigation Toggle
 */
function initNavigation() {
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (!navToggle || !navLinks) return;

  navToggle.addEventListener('click', () => {
    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', !isExpanded);
    navLinks.classList.toggle('active');

    // Animate hamburger
    navToggle.classList.toggle('active');
  });

  // Close menu when clicking a link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.classList.remove('active');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', e => {
    if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.classList.remove('active');
    }
  });
}

/**
 * Scroll-triggered Animations
 */
function initScrollAnimations() {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-visible');
        // Optional: stop observing after animation
        // observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all sections
  document.querySelectorAll('.section').forEach(section => {
    section.classList.add('animate-section');
    observer.observe(section);
  });

  // Observe cards and other elements
  document
    .querySelectorAll(
      '.highlight-card, .skill-category, .project-card, .approach-card, .education-card'
    )
    .forEach(el => {
      el.classList.add('animate-element');
      observer.observe(el);
    });
}

/**
 * Smooth Scroll for Anchor Links
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      e.preventDefault();
      const target = document.querySelector(href);

      if (target) {
        const navHeight = document.querySelector('.nav').offsetHeight;
        const targetPosition =
          target.getBoundingClientRect().top + window.pageYOffset - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth',
        });
      }
    });
  });
}

/**
 * Active Navigation State on Scroll
 */
function initActiveNavigation() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  if (sections.length === 0 || navLinks.length === 0) return;

  const observerOptions = {
    root: null,
    rootMargin: '-50% 0px -50% 0px',
    threshold: 0,
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');

        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

/**
 * Typing Effect for Hero (Optional Enhancement)
 */
function initTypingEffect() {
  const element = document.querySelector('.hero-title .title-line:last-child');
  if (!element) return;

  const text = element.textContent;
  element.textContent = '';
  element.style.borderRight = '2px solid var(--color-primary-400)';

  let index = 0;
  const typeInterval = setInterval(() => {
    if (index < text.length) {
      element.textContent += text[index];
      index++;
    } else {
      clearInterval(typeInterval);
      element.style.borderRight = 'none';
    }
  }, 100);
}

/**
 * Code Window Syntax Highlighting Animation
 */
function initCodeHighlight() {
  const codeContent = document.querySelector('.code-content code');
  if (!codeContent) return;

  // Add line numbers or other enhancements
  const lines = codeContent.innerHTML.split('\n');
  codeContent.innerHTML = lines
    .map((line, i) => `<span class="line" data-line="${i + 1}">${line}</span>`)
    .join('\n');
}

/**
 * Stats Counter Animation
 */
function animateStats() {
  const stats = document.querySelectorAll('.stat-value');

  stats.forEach(stat => {
    const value = stat.textContent;
    if (value.includes('+')) {
      const num = parseInt(value);
      animateNumber(stat, 0, num, 1500, '+');
    }
  });
}

function animateNumber(element, start, end, duration, suffix = '') {
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Easing function
    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
    const current = Math.floor(start + (end - start) * easeOutQuart);

    element.textContent = current + suffix;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

/**
 * Project Card Hover Effects
 */
function initProjectHover() {
  const cards = document.querySelectorAll('.project-card, .project-featured');

  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-8px)';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
    });
  });
}

/**
 * Form Validation (if contact form is added later)
 */
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

/**
 * Dark/Light Mode Toggle (Future Enhancement)
 */
function initThemeToggle() {
  const toggle = document.querySelector('.theme-toggle');
  if (!toggle) return;

  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);

  toggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });
}

/**
 * Lazy Loading Images
 */
function initLazyLoading() {
  const images = document.querySelectorAll('img[data-src]');

  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  } else {
    // Fallback for older browsers
    images.forEach(img => {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    });
  }
}

/**
 * Performance: Debounce function
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Performance: Throttle function
 */
function throttle(func, limit) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Magic UI / Aceternity-style Spotlight Effect
 * Creates a mouse-following spotlight gradient in the hero section
 */
function initSpotlight() {
  const hero = document.querySelector('.hero');
  const spotlight = document.getElementById('spotlight');

  if (!hero || !spotlight) return;

  let mouseX = 0;
  let mouseY = 0;
  let currentX = 0;
  let currentY = 0;
  let lastMouseX = 0;
  let lastMouseY = 0;
  let isAnimating = false;
  let idleTimeout = null;

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  hero.addEventListener('mouseenter', () => {
    spotlight.classList.add('active');
  });

  hero.addEventListener('mouseleave', () => {
    spotlight.classList.remove('active');
    isAnimating = false;
  });

  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;

    // Reset idle timeout on mouse movement
    clearTimeout(idleTimeout);
    idleTimeout = setTimeout(() => {
      isAnimating = false;
    }, 100); // Pause after 100ms of no movement

    // Start animation if not already running
    if (!isAnimating) {
      isAnimating = true;
      requestAnimationFrame(animate);
    }
  });

  // Smooth animation loop - only runs when mouse is moving
  function animate() {
    if (!isAnimating) return;

    // Lerp for smooth following
    currentX += (mouseX - currentX) * 0.1;
    currentY += (mouseY - currentY) * 0.1;

    // Update the ::before pseudo-element position via CSS custom properties
    document.documentElement.style.setProperty('--spotlight-x', `${currentX}px`);
    document.documentElement.style.setProperty('--spotlight-y', `${currentY}px`);

    // Check if mouse has stopped moving and animation has caught up
    const hasCaughtUp = Math.abs(mouseX - currentX) < 1 && Math.abs(mouseY - currentY) < 1;
    const mouseStopped = mouseX === lastMouseX && mouseY === lastMouseY;

    if (hasCaughtUp && mouseStopped) {
      isAnimating = false;
      return;
    }

    lastMouseX = mouseX;
    lastMouseY = mouseY;

    requestAnimationFrame(animate);
  }
}

/**
 * Magic UI / Aceternity-style Particles Effect
 * Creates floating particles in the hero background
 */
function initParticles() {
  const container = document.getElementById('particles');

  if (!container) return;

  // Reduce particle count for Firefox for better performance
  const isFirefox = navigator.userAgent.toLowerCase().includes('firefox');
  const particleCount = isFirefox ? 10 : 20;

  for (let i = 0; i < particleCount; i++) {
    createParticle(container, i);
  }
}

function createParticle(container, index) {
  const particle = document.createElement('div');
  particle.className = 'particle';

  // Randomize particle properties
  const size = Math.random() * 4 + 2;
  const left = Math.random() * 100;
  const delay = Math.random() * 8;
  const duration = Math.random() * 4 + 6;

  particle.style.cssText = `
    width: ${size}px;
    height: ${size}px;
    left: ${left}%;
    animation-delay: ${delay}s;
    animation-duration: ${duration}s;
  `;

  // Alternate colors between green and gold
  if (index % 3 === 0) {
    particle.style.background = 'var(--color-gold-primary)';
  }

  container.appendChild(particle);
}

// Add CSS for animations via JavaScript
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  .animate-section {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }

  .animate-section.animate-visible {
    opacity: 1;
    transform: translateY(0);
  }

  .animate-element {
    opacity: 0;
    transform: translateY(15px);
    transition: opacity 0.5s ease, transform 0.5s ease;
  }

  .animate-element.animate-visible {
    opacity: 1;
    transform: translateY(0);
  }

  .nav-links a.active {
    color: var(--color-primary-400);
  }

  .nav-links a.active::after {
    width: 100%;
  }

  @media (prefers-reduced-motion: reduce) {
    .animate-section,
    .animate-element {
      opacity: 1;
      transform: none;
      transition: none;
    }
  }
`;
document.head.appendChild(styleSheet);

/**
 * Terminal Time Update
 * Updates the banking terminal clock in real-time
 */
function initTerminalTime() {
  const timeElement = document.getElementById('terminal-time');

  if (!timeElement) return;

  function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    timeElement.textContent = `${hours}:${minutes}:${seconds}`;
  }

  // Update immediately and then every second
  updateTime();
  setInterval(updateTime, 1000);
}
