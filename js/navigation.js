// Navigation functionality for mobile menu and header behavior

class Navigation {
  constructor() {
    this.header = document.querySelector('.header');
    this.menuToggle = document.querySelector('.menu-toggle');
    this.nav = document.querySelector('.nav');
    this.navLinks = document.querySelectorAll('.nav__link');
    this.navOverlay = null;

    this.init();
  }

  init() {
    // Create mobile menu overlay
    this.createOverlay();

    // Setup event listeners
    this.setupMobileMenu();
    this.setupStickyHeader();
    this.setupActiveLinks();
    this.setupSmoothScroll();
  }

  createOverlay() {
    // Create overlay element for mobile menu
    this.navOverlay = document.createElement('div');
    this.navOverlay.className = 'nav-overlay';
    document.body.appendChild(this.navOverlay);

    // Close menu when overlay is clicked
    this.navOverlay.addEventListener('click', () => {
      this.closeMenu();
    });
  }

  setupMobileMenu() {
    if (!this.menuToggle || !this.nav) return;

    // Toggle menu on hamburger click
    this.menuToggle.addEventListener('click', () => {
      this.toggleMenu();
    });

    // Close menu when a link is clicked
    this.navLinks.forEach(link => {
      link.addEventListener('click', () => {
        this.closeMenu();
      });
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeMenu();
      }
    });
  }

  toggleMenu() {
    const isActive = this.nav.classList.contains('active');

    if (isActive) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }

  openMenu() {
    this.nav.classList.add('active');
    this.menuToggle.classList.add('active');
    this.navOverlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }

  closeMenu() {
    this.nav.classList.remove('active');
    this.menuToggle.classList.remove('active');
    this.navOverlay.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
  }

  setupStickyHeader() {
    if (!this.header) return;

    let lastScroll = 0;

    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;

      // Add shadow when scrolled
      if (currentScroll > 50) {
        this.header.classList.add('scrolled');
      } else {
        this.header.classList.remove('scrolled');
      }

      lastScroll = currentScroll;
    });
  }

  setupActiveLinks() {
    // Highlight active page in navigation
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    this.navLinks.forEach(link => {
      const linkPage = link.getAttribute('href');

      if (linkPage === currentPage ||
          (currentPage === '' && linkPage === 'index.html') ||
          (currentPage === 'index.html' && linkPage === 'index.html')) {
        link.classList.add('active');
      }
    });
  }

  setupSmoothScroll() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');

        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          e.preventDefault();

          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }
}

// Initialize navigation when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new Navigation();
  });
} else {
  new Navigation();
}
