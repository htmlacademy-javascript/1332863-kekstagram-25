import { getData } from './api.js';
import { debounce } from './util.js';
import { showBigPicture } from './big-picture.js';
import { renderRandomPictures, renderDiscussedPictures, renderDefaultPictures, renderPictures } from './pictures-filter.js';

const DEBOUNCE_TIMEOUT = 500;

const filter = document.querySelector('.img-filters');
const filterRandom = document.querySelector('#filter-random');
const filterDiscussed = document.querySelector('#filter-discussed');
const filterDefault = document.querySelector('#filter-default');

let pictures = [];

const renderFilteredPictures = (evt) => {
  if (evt.target === filterRandom) {
    renderRandomPictures(pictures);
  }

  if (evt.target === filterDiscussed) {
    renderDiscussedPictures(pictures);
  }

  if (evt.target === filterDefault) {
    renderDefaultPictures(pictures);
  }
};

getData()
  .then((gettedPictures) => {
    pictures = gettedPictures;
  })
  .then(() => {
    renderPictures(pictures);
    filter.classList.remove('img-filters--inactive');

    const displayedPictures = document.querySelectorAll('.picture');
    displayedPictures.forEach((pictureNode) => {
      pictureNode.addEventListener('click', () => showBigPicture(pictureNode, pictures));
    });
  })
  .then(() => {
    filter.addEventListener('click', debounce(renderFilteredPictures, DEBOUNCE_TIMEOUT));
  });
