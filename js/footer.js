document.addEventListener('DOMContentLoaded', function () {
  const footerPlaceholder = document.getElementById('footer-placeholder');
  if (!footerPlaceholder) return;

  footerPlaceholder.outerHTML = `
  <footer class="footer">
    <div class="container">
      <div class="footer__content">
        <div class="footer__section">
          <img src="images/photography logo.png" alt="AV Photos" class="footer__logo">
          <p>Professional family and event photography serving the Dallas-Fort Worth area.</p>
        </div>

        <div class="footer__section">
          <h4>Quick Links</h4>
          <p><a href="index.html">Home</a></p>
          <p><a href="about.html">About</a></p>
          <p><a href="testimonials.html">Testimonials</a></p>
          <p><a href="faq.html">FAQ</a></p>
        </div>

        <div class="footer__section">
          <h4>Contact</h4>
          <p>Phone: <a href="tel:4694037497">469-403-7497</a></p>
          <p>Serving: Dallas-Fort Worth, TX</p>
        </div>
      </div>

      <div class="footer__bottom">
        <p>&copy; 2026 AV Photos. All rights reserved.</p>
      </div>
    </div>
  </footer>`;
});
