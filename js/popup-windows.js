import { enableButton, removeOnPushBtn } from './util.js';
import { resetToDefault } from './edit-picture.js';

const successMessage = document.querySelector('#success').content.querySelector('.success');
const errorMessage = document.querySelector('#error').content.querySelector('.error');
const successButton = successMessage.querySelector('.success__button');
const errorButton = errorMessage.querySelector('.error__button');

const onSuccess = (form, button) => {
  document.body.insertAdjacentElement('beforeend', successMessage);

  successButton.addEventListener('click', () => successMessage.remove());
  successMessage.addEventListener('click', () => successMessage.remove());
  document.addEventListener('keydown', (evt) => removeOnPushBtn('Escape', successMessage, evt));

  form.reset();
  resetToDefault();
  enableButton(button);
};

const onFail = (form, button) => {
  document.body.insertAdjacentElement('beforeend', errorMessage);

  errorButton.focus();
  errorButton.addEventListener('click', () => errorMessage.remove());
  errorMessage.addEventListener('click', () => errorMessage.remove());
  document.addEventListener('keydown', (evt) => removeOnPushBtn('Escape', errorMessage, evt));
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
