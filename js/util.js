const DEFAULT_DEBOUNCE_DELAY = 500;

const checkStingLenght = (str, maxLength) => str.length <= maxLength;

const getRandomInt = (firstNumber, secondNumber) => {
  const max = Math.floor(Math.max(Math.abs(firstNumber), Math.abs(secondNumber)));
  const min = Math.ceil(Math.min(Math.abs(firstNumber), Math.abs(secondNumber)));

  const result = Math.random() * (max - min + 1) + min;

  return Math.floor(result);
};

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

export { checkStingLenght, getRandomInt, disableButton, enableButton, removeOnPushBtn, debounce };
