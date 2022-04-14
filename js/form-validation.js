// import { sendData } from './api.js';

const TOTAL_ALLOWED_TAGS = 5;
const MAX_TAG_LENGHT = 20;

const userForm = document.querySelector('.img-upload__form');
const hashTags = userForm.querySelector('.text__hashtags');

const pristine = new Pristine(userForm, {
  classTo: 'container-for-error-message',
  errorTextParent: 'container-for-error-message',
  errorTextClass: 'error-message-style',
});

let isTooLongHashtag;
let isCorrectHashtag;
let hasTagDuplicate;

const hasDuplicates = (array) => {
  const newArray = array.map((element) => element.toLowerCase());
  hasTagDuplicate = (new Set(newArray)).size === newArray.length;
  return (new Set(newArray)).size === newArray.length;
};

const checkHashtag = (tagsArr) => {
  tagsArr.forEach((tag) => {
    if (tag.length <= MAX_TAG_LENGHT) {
      isTooLongHashtag = true;
      return true;
    } else {
      isTooLongHashtag = false;
      return true;
    }
  });

  tagsArr.forEach((tag) => {
    isCorrectHashtag = /^#(?=.*[^0-9])[a-zа-яё0-9]+$/i.test(tag);
    return /^#(?=.*[^0-9])[a-zа-яё0-9]+$/i.test(tag);
  });
};

const validateHashtags = (value) => {
  if (value) {
    const tags = value.split(' ').filter((element) => element !== '');
    return (tags.length > TOTAL_ALLOWED_TAGS) ? false : hasDuplicates(tags) && checkHashtag(tags);
  } else {
    return true;
  }
};

const showErrorMessage = (value) => {
  const tags = value.split(' ').filter((element) => element !== '');
  if (!isCorrectHashtag) {
    return 'Указан не верный формат хештега';
  }

  if (!isTooLongHashtag) {
    return 'Превышена допустимая длина хештега в 20 символов';
  }

  if (!hasTagDuplicate) {
    return 'Теги не должны быть одинаковыми';
  }

  if (tags.length > TOTAL_ALLOWED_TAGS) {
    return 'Укажите не более 5 хештегов';
  }
};

pristine.addValidator(hashTags, validateHashtags, showErrorMessage);

userForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
});
