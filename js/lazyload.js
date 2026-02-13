// Lazy loading for images using Intersection Observer API

class LazyLoader {
  constructor() {
    this.images = [];
    this.observer = null;

    this.init();
  }

  init() {
    // Find all images to lazy load
    this.images = document.querySelectorAll('img[loading="lazy"]');

    if (this.images.length === 0) return;

    // Check if Intersection Observer is supported
    if ('IntersectionObserver' in window) {
      this.setupIntersectionObserver();
    } else {
      // Fallback: load all images immediately
      this.loadAllImages();
    }
  }

  setupIntersectionObserver() {
    const options = {
      root: null, // viewport
      rootMargin: '50px', // load slightly before entering viewport
      threshold: 0.01
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.loadImage(entry.target);
          this.observer.unobserve(entry.target);
        }
      });
    }, options);

    // Observe all lazy images
    this.images.forEach(img => {
      this.observer.observe(img);

      // Add blur-up effect class
      img.classList.add('lazy-loading');
    });
  }

  loadImage(img) {
    // Get the source from data attribute or src
    const source = img.dataset.src || img.src;

    if (!source) return;

    // Create new image to preload
    const imageLoader = new Image();

    imageLoader.onload = () => {
      // Set the actual source
      img.src = source;

      // Add loaded class for fade-in effect
      img.classList.remove('lazy-loading');
      img.classList.add('lazy-loaded');

      // Detect aspect ratio and tag parent gallery item
      this.detectAspectRatio(img, imageLoader);
    };

    imageLoader.onerror = () => {
      // Handle error (optional)
      img.classList.remove('lazy-loading');
      img.classList.add('lazy-error');
      console.error(`Failed to load image: ${source}`);
    };

    // Start loading
    imageLoader.src = source;
  }

  detectAspectRatio(img, imageLoader) {
    const width = imageLoader.naturalWidth;
    const height = imageLoader.naturalHeight;

    if (!width || !height) return;

    const aspectRatio = width / height;
    const galleryItem = img.closest('.gallery__item');

    if (!galleryItem) return;

    // Determine aspect ratio category
    // Portrait: height > width (ratio < 0.9)
    // Landscape: width > height (ratio > 1.1)
    // Square: roughly equal (0.9 - 1.1)
    if (aspectRatio < 0.9) {
      galleryItem.setAttribute('data-aspect', 'portrait');
    } else if (aspectRatio > 1.1) {
      galleryItem.setAttribute('data-aspect', 'landscape');
    } else {
      galleryItem.setAttribute('data-aspect', 'square');
    }
  }

  loadAllImages() {
    // Fallback for browsers without Intersection Observer
    this.images.forEach(img => {
      this.loadImage(img);
    });
  }
}

// Initialize lazy loader when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new LazyLoader();
  });
} else {
  new LazyLoader();
}

// Add CSS for lazy loading effect
const style = document.createElement('style');
style.textContent = `
  .lazy-loading {
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .lazy-loaded {
    opacity: 1;
  }

  .lazy-error {
    opacity: 0.5;
    background-color: #f0f0f0;
  }
`;
document.head.appendChild(style);
