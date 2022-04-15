import { createSmallPicture } from './small-picture.js';
import { showBigPicture } from './big-picture.js';

const RANDOM_PICTURES_COUNT = 10;

const picturesContainer = document.querySelector('.pictures');
const filterRandom = document.querySelector('#filter-random');
const filterDiscussed = document.querySelector('#filter-discussed');
const filterDefault = document.querySelector('#filter-default');

const getRandomPictures = (pictureArr, picturesCount) => {
  const arrayCopy = pictureArr.slice();
  return arrayCopy.sort(() => Math.random() - Math.random()).slice(0, picturesCount);
};

const getDiscussedPictures = (pictureArr) => {
  const arrayCopy = pictureArr.slice();
  return arrayCopy.sort((pictureA, pictureB) => pictureB.comments.length - pictureA.comments.length);
};

const removeActiveClass = (activeClass, ...buttons) => {
  buttons.forEach((btn) => {
    if (btn.classList.contains(activeClass)) {
      btn.classList.remove(activeClass);
    }
  });
};

const renderPictures = (pictureArr) => {
  pictureArr.forEach((picture) => {
    picturesContainer.insertAdjacentElement('beforeend', createSmallPicture(picture));
  });
};

const renderRandomPictures = (recievedPictures) => {
  removeActiveClass('img-filters__button--active', filterDiscussed, filterDefault);
  filterRandom.classList.add('img-filters__button--active');

  const previousPictures = document.querySelectorAll('.picture');
  previousPictures.forEach((picture) => picture.remove());

  const randomPictures = getRandomPictures(recievedPictures, RANDOM_PICTURES_COUNT);
  renderPictures(randomPictures);

  const displayedPictures = document.querySelectorAll('.picture');
  displayedPictures.forEach((pictureNode) => {
    pictureNode.addEventListener('click', () => showBigPicture(pictureNode, randomPictures));
  });
};

const renderDiscussedPictures = (recievedPictures) => {
  removeActiveClass('img-filters__button--active', filterRandom, filterDefault);
  filterDiscussed.classList.add('img-filters__button--active');

  const previousPictures = document.querySelectorAll('.picture');
  previousPictures.forEach((picture) => picture.remove());

  const discussedPictures = getDiscussedPictures(recievedPictures);
  renderPictures(discussedPictures);

  const displayedPictures = document.querySelectorAll('.picture');
  displayedPictures.forEach((pictureNode) => {
    pictureNode.addEventListener('click', () => showBigPicture(pictureNode, discussedPictures));
  });
};

const renderDefaultPictures = (recievedPictures) => {
  removeActiveClass('img-filters__button--active', filterRandom, filterDiscussed);
  filterDefault.classList.add('img-filters__button--active');

  const previousPictures = document.querySelectorAll('.picture');
  previousPictures.forEach((picture) => picture.remove());

  renderPictures(recievedPictures);

  const displayedPictures = document.querySelectorAll('.picture');
  displayedPictures.forEach((pictureNode) => {
    pictureNode.addEventListener('click', () => showBigPicture(pictureNode, recievedPictures));
  });
};

export { renderRandomPictures, renderDiscussedPictures, renderDefaultPictures, renderPictures };
