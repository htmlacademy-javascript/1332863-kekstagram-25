const DEFAULT_DEBOUNCE_DELAY = 500;

const checkStingLenght = (str, maxLength) => str.length <= maxLength;

const disableButton = (btn) => {
  btn.disabled = true;
  btn.style.opacity = 0.4;
};

const enableButton = (btn) => {
  btn.disabled = false;
  btn.style.opacity = 1;
};

const removeOnPushBtn = (buttonName, removingObj, evt) => {
  if (evt.key === buttonName) {
    evt.preventDefault();
    removingObj.remove();
  }
};

const debounce = (callback, timeoutDelay = DEFAULT_DEBOUNCE_DELAY) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export { checkStingLenght, disableButton, enableButton, removeOnPushBtn, debounce };
