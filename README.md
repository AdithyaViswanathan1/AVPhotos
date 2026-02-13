# AV Photos - Photography Portfolio Website

Professional family and event photography portfolio for the Dallas-Fort Worth area.

## Features

- 48 curated portfolio images in responsive gallery
- Full-screen lightbox with keyboard and touch navigation
- Mobile-friendly design with hamburger menu
- Fast loading with lazy loading optimization
- Classic, elegant design with professional typography
- About, Testimonials, and FAQ pages
- SEO-optimized and accessible

## Technology Stack

- **Pure HTML5/CSS3/JavaScript** - No frameworks, simple and fast
- **Google Fonts** - Playfair Display, Lora, Source Sans Pro
- **Responsive Design** - Mobile-first approach
- **Hosted on GitHub Pages** - Free and reliable hosting

## Prerequisites

Before setting up the website, ensure you have the following installed:

```bash
# Check if ImageMagick is installed
magick --version
# If not installed:
brew install imagemagick

# Python 3 (for local server)
python3 --version
```

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/avphotos.git
cd avphotos
```

### 2. Optimize Images

The source images are too large for web use (6-13MB each). Run the optimization script to create web-optimized versions:

```bash
# Make sure external drive is mounted at /Volumes/Adithya T7/
# Run the optimization script
bash scripts/optimize-images.sh
```

This script will:
- Process 11 images from `1best` folder
- Process 37 images from `0best` folder
- Process 1 profile photo from `About` folder
- Create 3 sizes: thumbnails (600px), medium (1200px), full (1920px)
- Compress and optimize for web (~15-25MB total vs 230MB original)

Expected output:
```
images/gallery/thumbnails/ (48 images)
images/gallery/medium/ (48 images)
images/gallery/full/ (48 images)
images/about/profile.jpg (1 image)
```

### 3. Add All Gallery Images to index.html

After running the image optimization script, you'll need to add all 48 images to the gallery in `index.html`. The file currently has placeholders for the first 8 images. Add the remaining images (img-09.jpg through img-48.jpg) following this pattern:

```html
<div class="gallery__item">
  <img
    class="gallery__image"
    src="images/gallery/thumbnails/img-09.jpg"
    data-medium="images/gallery/medium/img-09.jpg"
    data-full="images/gallery/full/img-09.jpg"
    alt="Gallery image description"
    loading="lazy"
  >
</div>
```

### 4. Test Locally

Start a local web server to test the website:

```bash
# Option 1: Python (recommended)
python3 -m http.server 8000

# Option 2: Node.js
npx http-server -p 8000

# Option 3: PHP
php -S localhost:8000
```

Then visit: `http://localhost:8000`

### 5. Verify Everything Works

Test checklist:
- [ ] All 48 images display in gallery grid
- [ ] Clicking images opens lightbox
- [ ] Prev/Next navigation works in lightbox
- [ ] Keyboard navigation (arrow keys, ESC) works
- [ ] Mobile menu toggles correctly
- [ ] All pages are accessible via navigation
- [ ] Phone number is clickable on mobile
- [ ] Lazy loading functions (check Network tab)
- [ ] Responsive design works on mobile, tablet, desktop

## Deployment to GitHub Pages

### 1. Commit All Files

```bash
git add .
git commit -m "Initial website setup with optimized images"
git push origin main
```

### 2. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under "Source", select branch: **main**
4. Select folder: **/ (root)**
5. Click **Save**

### 3. Access Your Site

Your site will be available at:
```
https://yourusername.github.io/avphotos/
```

(Replace `yourusername` with your GitHub username)

## Customization

### Update Contact Information

Search for `469-403-7497` in all HTML files and update with your phone number.

### Add Custom Domain (Optional)

1. Create a `CNAME` file in the root directory with your domain:
   ```
   avphotos.com
   ```

2. Configure DNS with your domain provider:
   - Add CNAME record pointing to: `yourusername.github.io`

3. Enable HTTPS in GitHub Pages settings

### Modify Colors

Edit `css/variables.css` to change the color scheme:

```css
:root {
  --color-primary-text: #2c2c2c;
  --color-accent: #8b7355;
  /* etc. */
}
```

### Update Content

- **About page**: Edit `about.html` to add your photographer bio
- **Testimonials**: Edit `testimonials.html` to add real client reviews
- **FAQ**: Edit `faq.html` to customize questions and answers

## Project Structure

```
avphotos/
├── index.html                  # Home/Gallery page
├── about.html                  # About page
├── testimonials.html           # Testimonials page
├── faq.html                    # FAQ page
├── css/
│   ├── reset.css              # Browser reset
│   ├── variables.css          # Design tokens
│   ├── typography.css         # Font styles
│   ├── layout.css             # Grid and layout
│   ├── components.css         # UI components
│   ├── lightbox.css           # Lightbox modal
│   └── responsive.css         # Media queries
├── js/
│   ├── navigation.js          # Mobile menu
│   ├── lightbox.js            # Image viewer
│   ├── lazyload.js            # Performance
│   └── main.js                # General functionality
├── images/
│   ├── gallery/               # Portfolio images
│   └── about/                 # Profile photo
├── scripts/
│   └── optimize-images.sh     # Image processing
└── README.md
```

## Performance

- **Page Load**: < 3 seconds on 3G
- **Lighthouse Score**: 90+ (performance)
- **Total Page Size**: < 3MB initial load
- **Image Sizes**: 80-500KB each (optimized)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- iOS Safari
- Chrome Mobile

## License

Copyright © 2025 AV Photos. All rights reserved.

## Support

For questions or issues, please open an issue on GitHub or contact:
- **Phone**: 469-403-7497
- **Service Area**: Dallas-Fort Worth, TX