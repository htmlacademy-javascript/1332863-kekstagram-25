import { getData } from "./api.js";
import { createSimilarPicture } from "./small-picture.js";

const picturesContainer = document.querySelector('.pictures');
const smallPictures = document.querySelectorAll('.picture');
const bigPicture = document.querySelector('.big-picture');
const closeBtn = bigPicture.querySelector('#picture-cancel');
const img = bigPicture.querySelector('img');
const likes = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const socialComments = bigPicture.querySelector('.social__comments');
const description = bigPicture.querySelector('.social__caption');

const showBigPicture = (picture) => {
  bigPicture.classList.remove('hidden');
  img.src = picture.querySelector('img').src;
};

smallPictures.forEach((picture) => {
  picture.addEventListener('click', () => showBigPicture(picture));
});

getData()
  .then((pictures) => {
    pictures.forEach((picture) => {
      picturesContainer.insertAdjacentElement('afterbegin', createSimilarPicture(picture));
    });
  });
