import { sendData } from './api.js';
import { onSuccess, onFail } from './popup-windows.js';
import { disableButton } from './util.js';

const TOTAL_ALLOWED_TAGS = 5;
const MAX_TAG_LENGHT = 20;

const body = document.querySelector('body');
const userForm = body.querySelector('.img-upload__form');
const editWindow = userForm.querySelector('.img-upload__overlay');
const hashTags = editWindow.querySelector('.text__hashtags');
const submitButton = editWindow.querySelector('.img-upload__submit');


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
    } else {
      isTooLongHashtag = false;
    }
  });

  tagsArr.forEach((tag) => {
    isCorrectHashtag = /^#(?=.*[^0-9])[a-zа-яё0-9]+$/i.test(tag);
  });

  return isTooLongHashtag && isCorrectHashtag;
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

  if (pristine.validate()) {
    const formData = new FormData(evt.target);
    disableButton(submitButton);
    sendData(formData)
      .then((response) => {
        if (response.ok) {
          body.classList.remove('modal-open');
          editWindow.classList.add('hidden');
          onSuccess(userForm, submitButton);
        } else {
          throw new Error();
        }
      })
      .catch(() => {
        body.classList.remove('modal-open');
        editWindow.classList.add('hidden');
        onFail(userForm, submitButton);
      });
  }
});
