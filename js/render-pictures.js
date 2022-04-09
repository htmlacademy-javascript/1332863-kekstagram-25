import { getData } from './api.js';
import { showBigPicture } from './big-picture.js';
import { createSmallPicture } from './small-picture.js';


const picturesContainer = document.querySelector('.pictures');

let pictures = [];

getData()
  .then((gettedPictures) => {
    pictures = gettedPictures;
  })
  .then(() => {
    pictures.forEach((picture) => {
      picturesContainer.insertAdjacentElement('afterbegin', createSmallPicture(picture));
    });
  })
  .then(() => {
    const smallPictures = document.querySelectorAll('.picture');
    smallPictures.forEach((pictureNode) => {
      pictureNode.addEventListener('click', () => showBigPicture(pictureNode, pictures));
    });
  });
