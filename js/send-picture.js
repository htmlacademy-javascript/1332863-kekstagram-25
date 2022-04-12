const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const DEFAULT_IMG_SCALE = 100;
const MAX_IMG_SCALE = 100;
const MIN_IMG_SCALE = 25;
const SCALE_STEP = 25;
const CONVERTER_TO_CSS_VALUE = 100;
const DEFAULT_FILTER_MAX_VALUE = 1;
const DEFAULT_FILTER_MIN_VALUE = 0;
const DEFAULT_FILTER_STEP = 0.1;

const body = document.querySelector('body');
const userForm = body.querySelector('.img-upload__form');
const uploadFileBtn = userForm.querySelector('#upload-file');
const editWindow = userForm.querySelector('.img-upload__overlay');
const resetBtn = editWindow.querySelector('#upload-cancel');
const imgPreview = editWindow.querySelector('.img-upload__preview > img');
const scaleUpBtn = editWindow.querySelector('.scale__control--bigger');
const scaleDownBtn = editWindow.querySelector('.scale__control--smaller');
const scaleDisplay = editWindow.querySelector('.scale__control--value');
const effects = editWindow.querySelector('.effects');
const effect = editWindow.querySelector('.effect-level__value');
const sliderElement = editWindow.querySelector('.effect-level__slider');
const sliderElementContainer = editWindow.querySelector('.effect-level');

const resetAllEffects = () => {
  const previousEffectClass = Array.from(imgPreview.classList);
  if (String(previousEffectClass)) {
    imgPreview.classList.remove(previousEffectClass);
  }
  imgPreview.removeAttribute('style');
};

function closeEditWindowByKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    body.classList.remove('modal-open');
    editWindow.classList.add('hidden');
  }
  resetAllEffects();

  resetBtn.removeEventListener('click', closeEditWindowByClick, { once: true });
}

function closeEditWindowByClick() {
  body.classList.remove('modal-open');
  editWindow.classList.add('hidden');
  resetAllEffects();

  document.removeEventListener('keydown', closeEditWindowByKeydown);
}

uploadFileBtn.addEventListener('change', () => {
  body.classList.add('modal-open');
  editWindow.classList.remove('hidden');
  imgPreview.classList.add('effects__preview--none');
  sliderElementContainer.classList.add('hidden');

  scaleDisplay.value = `${DEFAULT_IMG_SCALE}%`;
  imgPreview.style.transform = `scale(${DEFAULT_IMG_SCALE / CONVERTER_TO_CSS_VALUE})`;

  const userImg = uploadFileBtn.files[0];
  const fileName = userImg.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    imgPreview.src = URL.createObjectURL(userImg);
  }

  resetBtn.addEventListener('click', closeEditWindowByClick, { once: true });
  document.addEventListener('keydown', closeEditWindowByKeydown, { once: true });
});

scaleUpBtn.addEventListener('click', () => {
  if (parseInt(scaleDisplay.value, 10) < MAX_IMG_SCALE) {
    const scaleValue = parseInt(scaleDisplay.value, 10) + SCALE_STEP;
    scaleDisplay.value = `${scaleValue}%`;

    imgPreview.style.transform = `scale(${scaleValue / CONVERTER_TO_CSS_VALUE})`;
  }
});

scaleDownBtn.addEventListener('click', () => {
  if (parseInt(scaleDisplay.value, 10) > MIN_IMG_SCALE) {
    const scaleValue = parseInt(scaleDisplay.value, 10) - SCALE_STEP;
    scaleDisplay.value = `${scaleValue}%`;

    imgPreview.style.transform = `scale(${scaleValue / CONVERTER_TO_CSS_VALUE})`;
  }
});

let filterStep = DEFAULT_FILTER_STEP;
let filterMaxValue = DEFAULT_FILTER_MAX_VALUE;
let filterMinValue = DEFAULT_FILTER_MIN_VALUE;

noUiSlider.create(sliderElement, {
  range: {
    min: filterMinValue,
    max: filterMaxValue,
  },
  start: filterMaxValue,
  step: filterStep,
  connect: 'lower',
});

const allEffects = {
  chrome: 'grayscale',
  sepia: 'sepia',
  marvin: 'invert',
  phobos: 'blur',
  heat: 'brightness',
};

const applyEffect = (effectValue, selectedEffect) => {
  if (selectedEffect === 'marvin') {
    imgPreview.style.filter = `${allEffects[selectedEffect]}(${effectValue}%)`;
  } else if (selectedEffect === 'phobos') {
    imgPreview.style.filter = `${allEffects[selectedEffect]}(${effectValue}px)`;
  } else {
    imgPreview.style.filter = `${allEffects[selectedEffect]}(${effectValue})`;
  }
};

let activeEffect;

effects.addEventListener('change', () => {
  activeEffect = new FormData(userForm).getAll('effect');
  activeEffect = String(activeEffect);

  if (activeEffect === 'none') {
    sliderElementContainer.classList.add('hidden');
  } else {
    sliderElementContainer.classList.remove('hidden');
  }

  switch (activeEffect) {
    case 'marvin':
      filterStep = 1;
      filterMaxValue = 100;
      break;
    case 'phobos':
      filterStep = 0.1;
      filterMaxValue = 3;
      break;
    case 'heat':
      filterStep = 0.1;
      filterMinValue = 1;
      filterMaxValue = 3;
      break;
    default:
      filterStep = DEFAULT_FILTER_STEP;
      filterMaxValue = DEFAULT_FILTER_MAX_VALUE;
      filterMinValue = DEFAULT_FILTER_MIN_VALUE;
  }

  sliderElement.noUiSlider.updateOptions({
    range: {
      min: filterMinValue,
      max: filterMaxValue,
    },
    step: filterStep,
  });
  sliderElement.noUiSlider.set(filterMaxValue);

  const previousEffectClass = Array.from(imgPreview.classList);
  imgPreview.classList.remove(previousEffectClass);
  const activeEffectClass = `effects__preview--${activeEffect}`;
  imgPreview.classList.add(activeEffectClass);

  effect.value = filterMaxValue;
  applyEffect(effect.value, activeEffect);
});

sliderElement.noUiSlider.on('slide', () => {
  effect.value = sliderElement.noUiSlider.get();
  applyEffect(effect.value, activeEffect);
});
