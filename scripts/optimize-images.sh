#!/bin/bash

# Image Optimization Script for AV Photos Portfolio
# This script processes high-resolution photos from external drive
# and creates web-optimized versions in three sizes

set -e  # Exit on error

# Color codes for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}AV Photos - Image Optimization Script${NC}"
echo -e "${BLUE}========================================${NC}\n"

# Source directories (external drive)
SOURCE_1BEST="/Volumes/Adithya T7/avphotos/website/1best"
SOURCE_0BEST="/Volumes/Adithya T7/avphotos/website/0best"
SOURCE_ABOUT="/Volumes/Adithya T7/avphotos/website/About"

# Destination directories (project)
DEST_GALLERY="images/gallery/medium"
DEST_ABOUT="images/about"

# Check if ImageMagick is installed
if ! command -v magick &> /dev/null && ! command -v convert &> /dev/null; then
    echo -e "${YELLOW}Error: ImageMagick is not installed${NC}"
    echo "Please install it with: brew install imagemagick"
    exit 1
fi

# Use 'magick' command if available (ImageMagick 7), otherwise 'convert' (ImageMagick 6)
if command -v magick &> /dev/null; then
    MAGICK_CMD="magick"
else
    MAGICK_CMD="convert"
fi

# Check if source directories exist
if [ ! -d "$SOURCE_1BEST" ]; then
    echo -e "${YELLOW}Warning: $SOURCE_1BEST not found${NC}"
    echo "Please ensure external drive is mounted"
    exit 1
fi

if [ ! -d "$SOURCE_0BEST" ]; then
    echo -e "${YELLOW}Warning: $SOURCE_0BEST not found${NC}"
    exit 1
fi

# Function to optimize a single image
optimize_image() {
    local input_file="$1"
    local output_name="$2"
    local filename=$(basename "$input_file")

    echo -e "${GREEN}Processing: ${filename}${NC}"

    # Create medium size (1200px width, 85% quality)
    $MAGICK_CMD "$input_file" \
        -auto-orient \
        -resize 1200x\> \
        -strip \
        -quality 85 \
        -interlace Plane \
        -colorspace sRGB \
        "${DEST_GALLERY}/${output_name}"
}

# Initialize counter
counter=1

echo -e "\n${BLUE}Processing images from 1best folder (11 images)...${NC}\n"

# Process 1best images
shopt -s nullglob
for img in "$SOURCE_1BEST"/*.jpg "$SOURCE_1BEST"/*.JPG "$SOURCE_1BEST"/*.jpeg "$SOURCE_1BEST"/*.JPEG; do
    [ -f "$img" ] || continue
    output_name=$(printf "img-%02d.jpg" $counter)
    optimize_image "$img" "$output_name"
    ((counter++))
done

echo -e "\n${BLUE}Processing images from 0best folder (37 images)...${NC}\n"

# Process 0best images
for img in "$SOURCE_0BEST"/*.jpg "$SOURCE_0BEST"/*.JPG "$SOURCE_0BEST"/*.jpeg "$SOURCE_0BEST"/*.JPEG; do
    [ -f "$img" ] || continue
    output_name=$(printf "img-%02d.jpg" $counter)
    optimize_image "$img" "$output_name"
    ((counter++))
done

echo -e "\n${BLUE}Processing profile photo from About folder...${NC}\n"

# Process profile photo
if [ -f "$SOURCE_ABOUT/mypic.jpg" ]; then
    echo -e "${GREEN}Processing: mypic.jpg${NC}"
    $MAGICK_CMD "$SOURCE_ABOUT/mypic.jpg" \
        -auto-orient \
        -resize 800x\> \
        -strip \
        -quality 85 \
        -interlace Plane \
        -colorspace sRGB \
        "${DEST_ABOUT}/profile.jpg"
else
    echo -e "${YELLOW}Warning: mypic.jpg not found in About folder${NC}"
fi

# Display summary
echo -e "\n${BLUE}========================================${NC}"
echo -e "${GREEN}Optimization Complete!${NC}"
echo -e "${BLUE}========================================${NC}\n"

total_gallery_images=$((counter - 1))
echo "Gallery images processed: $total_gallery_images"
echo ""

# Calculate sizes
if command -v du &> /dev/null; then
    gallery_size=$(du -sh "$DEST_GALLERY" 2>/dev/null | cut -f1)

    echo "Output size:"
    echo "  Gallery: $gallery_size"
fi

echo -e "\n${GREEN}Images are ready for use in the website!${NC}"
echo -e "Run ${BLUE}python3 -m http.server 8000${NC} to test locally\n"
