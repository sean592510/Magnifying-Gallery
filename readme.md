# Image Zoom Gallery

A professional, responsive image gallery with zoom functionality, built with HTML, CSS, and JavaScript. Ideal for e-commerce product pages, portfolios, or photography websites. Features a dynamic grid of images with a magnifying zoom lens effect on hover or tap, accessible design, and error handling.

## Features

- **Zoom Lens**: Hover or tap images to display a circular zoom lens showing a high-resolution view.
- **Responsive Design**: Adapts to all screen sizes using CSS Grid, with a single-column layout on mobile.
- **Accessibility**: Includes ARIA attributes (`role="grid"`, `aria-label`) and descriptive `alt` text.
- **Error Handling**: Displays a fallback image (`fallback.jpg`) if an image fails to load.
- **Touch Support**: Works on touch devices with adjusted zoom lens positioning.
- **Performance**: Preloads high-resolution images for smooth zooming.

## Demo

Run locally with a server (e.g., `live-server`) or deploy to platforms like Netlify or GitHub Pages.

## Project Structure
image-zoom-gallery/
├── index.html        # Main HTML file
├── styles.css        # CSS styles for layout and zoom
├── script.js         # JavaScript for dynamic gallery and zoom
├── fallback.jpg      # Placeholder image for errors
├── README.md         # Project documentation
├── .gitignore        # Git ignore rules

