// Main JavaScript file - Initialize all modules and handle general functionality

class App {
  constructor() {
    this.init();
  }

  init() {
    // Setup FAQ accordion
    this.setupFAQAccordion();

    // Setup contact links
    this.setupContactLinks();

    // Add any other general initialization here
    console.log('AV Photos website initialized');
  }

  setupFAQAccordion() {
    const faqQuestions = document.querySelectorAll('.faq-question');

    if (faqQuestions.length === 0) return;

    faqQuestions.forEach(question => {
      question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        const isActive = question.classList.contains('active');

        // Close all other FAQ items (optional - comment out for multiple open at once)
        // this.closeAllFAQs();

        if (isActive) {
          // Close this FAQ
          question.classList.remove('active');
          answer.classList.remove('active');
        } else {
          // Open this FAQ
          question.classList.add('active');
          answer.classList.add('active');
        }
      });
    });
  }

  closeAllFAQs() {
    const allQuestions = document.querySelectorAll('.faq-question');
    const allAnswers = document.querySelectorAll('.faq-answer');

    allQuestions.forEach(q => q.classList.remove('active'));
    allAnswers.forEach(a => a.classList.remove('active'));
  }

  setupContactLinks() {
    // Ensure phone links work properly
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');

    phoneLinks.forEach(link => {
      // Add click tracking (optional - for analytics)
      link.addEventListener('click', () => {
        console.log('Phone link clicked');
        // Add analytics tracking here if needed
      });
    });
  }
}

// Utility Functions

// Debounce function for scroll/resize events
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

// Check if element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Scroll to top function
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new App();
  });
} else {
  new App();
}

// Export utilities for use in other scripts if needed
window.AppUtils = {
  debounce,
  isInViewport,
  scrollToTop
};
