import { enableButton, removeOnPushBtn } from './util.js';
import { resetToDefault } from './edit-picture.js';

const successMessage = document.querySelector('#success').content.querySelector('.success');
const errorMessage = document.querySelector('#error').content.querySelector('.error');
const successButton = successMessage.querySelector('.success__button');
const errorButton = errorMessage.querySelector('.error__button');

const removeSuccessMessageByEsc = (evt) => {
  removeOnPushBtn('Escape', successMessage, evt);
};

const removeErrorMessageByEsc = (evt) => {
  removeOnPushBtn('Escape', errorMessage, evt);
};

const removeSuccessMessage = () => {
  successMessage.remove();
  document.removeEventListener('keydown', removeSuccessMessageByEsc, { once: true });
};

const removeErrorMessage = () => {
  errorMessage.remove();
  document.removeEventListener('keydown', removeErrorMessageByEsc, { once: true });
};

const onSuccess = (form, button) => {
  document.body.insertAdjacentElement('beforeend', successMessage);

  successButton.addEventListener('click', removeSuccessMessage);
  successMessage.addEventListener('click', removeSuccessMessage);
  document.addEventListener('keydown', removeSuccessMessageByEsc, { once: true });

  form.reset();
  resetToDefault();
  enableButton(button);
};

const onFail = (form, button) => {
  document.body.insertAdjacentElement('beforeend', errorMessage);

  errorButton.focus();
  errorButton.addEventListener('click', removeErrorMessage);
  errorMessage.addEventListener('click', removeErrorMessage);
  document.addEventListener('keydown', removeErrorMessageByEsc, { once: true });

  form.reset();
  resetToDefault();
  enableButton(button);
};

const showErrorMessage = (message, showTime) => {

  const alertContainer = document.createElement('div');
  alertContainer.style.position = 'absolute';
  alertContainer.style.zIndex = 100;
  alertContainer.style.top = 0;
  alertContainer.style.left = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '20px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.color = '#ffe753';
  alertContainer.style.backgroundColor = '#3c3614';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, showTime);
};

export { showErrorMessage, onSuccess, onFail };
