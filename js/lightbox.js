// Lightbox functionality for full-screen image viewing

class Lightbox {
  constructor() {
    this.images = [];
    this.currentIndex = 0;
    this.lightboxElement = null;
    this.imageElement = null;
    this.isOpen = false;
    this.touchStartX = 0;
    this.touchEndX = 0;

    this.init();
  }

  init() {
    // Create lightbox HTML structure
    this.createLightbox();

    // Find all gallery images
    this.setupGalleryImages();

    // Setup event listeners
    this.setupEventListeners();
  }

  createLightbox() {
    // Create lightbox container
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
      <button class="lightbox__close" aria-label="Close lightbox"></button>
      <button class="lightbox__nav lightbox__nav--prev" aria-label="Previous image"></button>
      <button class="lightbox__nav lightbox__nav--next" aria-label="Next image"></button>
      <div class="lightbox__content">
        <div class="lightbox__spinner"></div>
        <img class="lightbox__image" src="" alt="" />
      </div>
      <div class="lightbox__counter">
        <span class="lightbox__current">1</span> / <span class="lightbox__total">1</span>
      </div>
    `;

    document.body.appendChild(lightbox);

    // Store references
    this.lightboxElement = lightbox;
    this.imageElement = lightbox.querySelector('.lightbox__image');
    this.spinner = lightbox.querySelector('.lightbox__spinner');
    this.currentCounter = lightbox.querySelector('.lightbox__current');
    this.totalCounter = lightbox.querySelector('.lightbox__total');
    this.closeButton = lightbox.querySelector('.lightbox__close');
    this.prevButton = lightbox.querySelector('.lightbox__nav--prev');
    this.nextButton = lightbox.querySelector('.lightbox__nav--next');
  }

  setupGalleryImages() {
    const galleryItems = document.querySelectorAll('.gallery__item');

    galleryItems.forEach((item, index) => {
      const img = item.querySelector('.gallery__image');

      if (img) {
        // Store image data
        this.images.push({
          src: img.src,
          alt: img.alt || `Gallery image ${index + 1}`
        });

        // Add click handler
        item.addEventListener('click', () => {
          this.open(index);
        });

        // Make keyboard accessible
        item.setAttribute('tabindex', '0');
        item.setAttribute('role', 'button');
        item.setAttribute('aria-label', `View image ${index + 1}`);

        item.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.open(index);
          }
        });
      }
    });

    // Update total counter
    this.totalCounter.textContent = this.images.length;
  }

  setupEventListeners() {
    // Close button
    this.closeButton.addEventListener('click', () => this.close());

    // Navigation buttons
    this.prevButton.addEventListener('click', () => this.showPrevious());
    this.nextButton.addEventListener('click', () => this.showNext());

    // Close on background click
    this.lightboxElement.addEventListener('click', (e) => {
      if (e.target === this.lightboxElement) {
        this.close();
      }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!this.isOpen) return;

      switch(e.key) {
        case 'Escape':
          this.close();
          break;
        case 'ArrowLeft':
          this.showPrevious();
          break;
        case 'ArrowRight':
          this.showNext();
          break;
      }
    });

    // Touch/swipe support
    this.lightboxElement.addEventListener('touchstart', (e) => {
      this.touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    this.lightboxElement.addEventListener('touchend', (e) => {
      this.touchEndX = e.changedTouches[0].screenX;
      this.handleSwipe();
    }, { passive: true });

    // Preload adjacent images when image loads
    this.imageElement.addEventListener('load', () => {
      this.hideSpinner();
      this.preloadAdjacentImages();
    });
  }

  open(index) {
    this.currentIndex = index;
    this.isOpen = true;

    // Show lightbox
    this.lightboxElement.classList.add('active');
    document.body.classList.add('lightbox-open');

    // Load and show image
    this.showImage(index);
  }

  close() {
    this.isOpen = false;
    this.lightboxElement.classList.remove('active');
    document.body.classList.remove('lightbox-open');
  }

  showImage(index) {
    // Ensure index is within bounds
    if (index < 0) {
      this.currentIndex = this.images.length - 1;
    } else if (index >= this.images.length) {
      this.currentIndex = 0;
    } else {
      this.currentIndex = index;
    }

    const image = this.images[this.currentIndex];

    // Show spinner
    this.showSpinner();

    // Update image
    this.imageElement.src = image.src;
    this.imageElement.alt = image.alt;

    // Update counter
    this.currentCounter.textContent = this.currentIndex + 1;

    // Update navigation button states
    this.updateNavigationButtons();
  }

  showNext() {
    this.showImage(this.currentIndex + 1);
  }

  showPrevious() {
    this.showImage(this.currentIndex - 1);
  }

  updateNavigationButtons() {
    // Always enable both buttons for circular navigation
    this.prevButton.style.opacity = '1';
    this.nextButton.style.opacity = '1';

    // Or disable at edges (uncomment if preferred):
    // if (this.currentIndex === 0) {
    //   this.prevButton.style.opacity = '0.3';
    // }
    // if (this.currentIndex === this.images.length - 1) {
    //   this.nextButton.style.opacity = '0.3';
    // }
  }

  handleSwipe() {
    const swipeThreshold = 50;
    const swipeDistance = this.touchEndX - this.touchStartX;

    if (Math.abs(swipeDistance) > swipeThreshold) {
      if (swipeDistance > 0) {
        // Swiped right - show previous
        this.showPrevious();
      } else {
        // Swiped left - show next
        this.showNext();
      }
    }
  }

  preloadAdjacentImages() {
    // Preload next and previous images for smooth navigation
    const prevIndex = this.currentIndex - 1;
    const nextIndex = this.currentIndex + 1;

    if (prevIndex >= 0) {
      const prevImg = new Image();
      prevImg.src = this.images[prevIndex].src;
    }

    if (nextIndex < this.images.length) {
      const nextImg = new Image();
      nextImg.src = this.images[nextIndex].src;
    }
  }

  showSpinner() {
    this.spinner.style.display = 'block';
  }

  hideSpinner() {
    this.spinner.style.display = 'none';
  }
}

// Initialize lightbox when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new Lightbox();
  });
} else {
  new Lightbox();
}
