
const images = [
  {
    thumb: 'https://images.squarespace-cdn.com/content/v1/5b228bd689c172172ab88d9c/1501f7d6-87ac-445c-a87b-e9ff9551ccaa/_DSF5280-Enhanced-NR.jpg?format=2500w',
    hires: 'https://images.squarespace-cdn.com/content/v1/5b228bd689c172172ab88d9c/1501f7d6-87ac-445c-a87b-e9ff9551ccaa/_DSF5280-Enhanced-NR.jpg?format=2500w',
    alt: 'Tokyo cityscape'
  },
  {
    thumb: 'https://media.gettyimages.com/id/1441083322/photo/mt-fuji-and-tokyo-skyline.jpg?s=612x612&w=gi&k=20&c=pUVxXo1XGPKprnCga--Sa4EJ_xttZfkYKO5b2fOAndQ=',
    hires: 'https://media.gettyimages.com/id/1441083322/photo/mt-fuji-and-tokyo-skyline.jpg?s=612x612&w=gi&k=20&c=pUVxXo1XGPKprnCga--Sa4EJ_xttZfkYKO5b2fOAndQ=',
    alt: 'Mountain landscape'
  }
];


const gallery = document.querySelector('.gallery');
const zoom = document.querySelector('.zoom');
const imageZoom = document.querySelector('.image-zoom');

let zoomLevel = 1;
let currentImage = null;
let clearSrcTimeout = null;


const preloadImage = (url) => {
  const img = new Image();
  img.src = url;
  img.onerror = () => console.error(`Failed to preload image: ${url}`);
};

const initializeGallery = () => {
  if (!gallery || !zoom || !imageZoom) {
    console.error('Required DOM elements are missing.');
    return;
  }


  images.forEach((img, index) => {
    const imageDiv = document.createElement('div');
    imageDiv.classList.add('image');
    imageDiv.innerHTML = `
      <a href="${img.hires}" aria-label="View high-resolution image: ${img.alt}">
        <img src="${img.thumb}" alt="${img.alt}" 
             onerror="this.src='https://via.placeholder.com/500?text=Image+Not+Available'; this.alt='Image not available';">
      </a>
    `;
    gallery.appendChild(imageDiv);
    preloadImage(img.hires);
  });

 document.querySelectorAll('.image').forEach((image) => {
    image.addEventListener('mouseover', enterImage);
    image.addEventListener('touchstart', enterImage, { passive: false });
    image.addEventListener('mouseout', leaveImage);
    image.addEventListener('touchend', leaveImage);
    image.addEventListener('mousemove', moveImage);
    image.addEventListener('touchmove', moveImage, { passive: false });
    image.addEventListener('wheel', zoomImage, { passive: false });
  });
};


const enterImage = (e) => {
  if (!zoom || !imageZoom) return;
  zoom.classList.add('show', 'loading');
  clearTimeout(clearSrcTimeout);

  currentImage = e.currentTarget;
  const hiresUrl = currentImage.querySelector('a').getAttribute('href');
  imageZoom.setAttribute('src', hiresUrl);

  imageZoom.onload = () => zoom.classList.remove('loading');
  imageZoom.onerror = () => {
    console.error(`Failed to load high-res image: ${hiresUrl}`);
    zoom.classList.remove('show', 'loading');
  };

  updateZoomPosition(e);
};


const leaveImage = () => {
  if (!zoom || !imageZoom) return;
  zoom.style.transform = 'scale(1)';
  zoomLevel = 1;
  zoom.classList.remove('show');
  clearSrcTimeout = setTimeout(() => {
    imageZoom.setAttribute('src', '');
    imageZoom.setAttribute('alt', '');
  }, 250);
};

const moveImage = (e) => {
  e.preventDefault();
  if (!currentImage || !zoom || !imageZoom) return;

  updateZoomPosition(e);

  const rect = currentImage.getBoundingClientRect();
  const percX = (e.clientX - rect.left) / rect.width;
  const percY = (e.clientY - rect.top) / rect.height;

  const zoomLeft = -percX * imageZoom.offsetWidth + zoom.offsetWidth / 2;
  const zoomTop = -percY * imageZoom.offsetHeight + zoom.offsetHeight / 2;

  imageZoom.style.left = `${zoomLeft}px`;
  imageZoom.style.top = `${zoomTop}px`;
};


const updateZoomPosition = (e) => {
  const isTouch = e.touches;
  const posX = isTouch ? e.touches[0].clientX : e.clientX;
  const posY = isTouch ? e.touches[0].clientY : e.clientY;

  const offsetY = isTouch ? zoom.offsetHeight / 1.25 : zoom.offsetHeight / 2;
  zoom.style.left = `${posX - zoom.offsetWidth / 2}px`;
  zoom.style.top = `${posY - offsetY}px`;
};


const zoomImage = (e) => {
  e.preventDefault();
  zoomLevel += e.deltaY > 0 ? -0.5 : 0.5;
  zoomLevel = Math.max(1, Math.min(zoomLevel, 5));
  zoom.style.transform = `scale(${zoomLevel})`;
};


document.addEventListener('DOMContentLoaded', initializeGallery);
