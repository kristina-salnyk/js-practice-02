import { galleryItems } from './gallery-items.js';
// Change code below this line

const gallaryRef = document.querySelector('div.gallery');
let currentGallaryItemInstance;

gallaryRef.innerHTML = galleryItems
  .map(
    ({ preview, original, description }) =>
      `<div><a class="gallery__link" href="${original}"><img loading="lazy" class="gallery__image lazyload" data-src="${preview}" data-source="${original}" alt="${description}"/></a></div>`
  )
  .join(' ');

if ('loading' in HTMLImageElement.prototype) {
  const loadingLazyImages = document.querySelectorAll('img[loading="lazy"]');

  loadingLazyImages.forEach(img => {
    img.src = img.dataset.src;
  });
} else {
  const lazyLoadingScript = document.createElement('script');
  lazyLoadingScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
  lazyLoadingScript.integrity =
    'sha512-q583ppKrCRc7N5O0n2nzUiJ+suUv7Et1JGels4bXOaMFQcamPk9HjdUknZuuFjBNs7tsMuadge5k9RzdmO+1GQ==';
  lazyLoadingScript.crossOrigin = 'anonymous';
  lazyLoadingScript.referrerPolicy = 'no-referrer';

  document.body.appendChild(lazyLoadingScript);
}

const escKeyPressHandler = event => {
  if (event.code === 'Escape') {
    currentGallaryItemInstance.close();
    window.removeEventListener('keydown', escKeyPressHandler);
  }
};

const gallaryClickHandler = event => {
  event.preventDefault();

  if (event.target.nodeName !== 'IMG') return;

  currentGallaryItemInstance = basicLightbox.create(
    `<img src="${event.target.dataset.source}" width="800" height="600" alt="${event.target.alt}">`
  );

  currentGallaryItemInstance.show();
  window.addEventListener('keydown', escKeyPressHandler);
};

gallaryRef.addEventListener('click', gallaryClickHandler);
