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
    filterRandom.addEventListener('click', debounce(() => renderRandomPictures(pictures), DEBOUNCE_TIMEOUT));
    filterDiscussed.addEventListener('click', debounce(() => renderDiscussedPictures(pictures), DEBOUNCE_TIMEOUT));
    filterDefault.addEventListener('click', debounce(() => renderDefaultPictures(pictures), DEBOUNCE_TIMEOUT));
  });
