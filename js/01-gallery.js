import { galleryItems } from './gallery-items.js';
// Change code below this line

const gallaryRef = document.querySelector('div.gallery');

const gallaryItemsMarkup = galleryItems
  .map(
    ({ preview, original, description }) =>
      `<div><a class="gallery__link" href="${original}"><img class="gallery__image" src="${preview}" data-source="${original}" alt="${description}"/></a></div>`
  )
  .join(' ');

gallaryRef.innerHTML = gallaryItemsMarkup;

const gallaryClickHandler = event => {
  event.preventDefault();

  if (event.target.nodeName !== 'IMG') return;

  const gallaryItemInstance = basicLightbox.create(
    `<img src="${event.target.dataset.source}" width="800" height="600" alt="${event.target.alt}">`
  );

  gallaryItemInstance.show();
};

gallaryRef.addEventListener('click', gallaryClickHandler);
