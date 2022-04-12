const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const DEFAULT_IMG_SCALE = 100;
const MAX_IMG_SCALE = 100;
const MIN_IMG_SCALE = 25;
const SCALE_STEP = 25;
const CONVERTER_TO_CSS_VALUE = 100;

const body = document.querySelector('body');
const userForm = body.querySelector('.img-upload__form');
const uploadFileBtn = userForm.querySelector('#upload-file');
const editWindow = userForm.querySelector('.img-upload__overlay');
const resetBtn = editWindow.querySelector('#upload-cancel');
const imgPreview = editWindow.querySelector('.img-upload__preview > img');
const scaleUpBtn = editWindow.querySelector('.scale__control--bigger');
const scaleDownBtn = editWindow.querySelector('.scale__control--smaller');
const scaleDisplay = editWindow.querySelector('.scale__control--value');

scaleDisplay.value = `${DEFAULT_IMG_SCALE}%`;

scaleUpBtn.addEventListener('click', () => {
  if (parseInt(scaleDisplay.value, 10) < MAX_IMG_SCALE) {
    const scaleValue = parseInt(scaleDisplay.value, 10) + SCALE_STEP;
    scaleDisplay.value = `${scaleValue}%`;

    imgPreview.style.transform = `scale(${scaleValue/CONVERTER_TO_CSS_VALUE})`;
  }
});

scaleDownBtn.addEventListener('click', () => {
  if (parseInt(scaleDisplay.value, 10) > MIN_IMG_SCALE) {
    const scaleValue = parseInt(scaleDisplay.value, 10) - SCALE_STEP;
    scaleDisplay.value = `${scaleValue}%`;

    imgPreview.style.transform = `scale(${scaleValue/CONVERTER_TO_CSS_VALUE})`;
  }
});

function closeEditWindowByKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    body.classList.remove('modal-open');
    editWindow.classList.add('hidden');
  }

  resetBtn.removeEventListener('click', closeEditWindowByClick, { once: true });
}

function closeEditWindowByClick() {
  body.classList.remove('modal-open');
  editWindow.classList.add('hidden');

  document.removeEventListener('keydown', closeEditWindowByKeydown);
}

uploadFileBtn.addEventListener('change', () => {
  body.classList.add('modal-open');
  editWindow.classList.remove('hidden');

  const userImg = uploadFileBtn.files[0];
  const fileName = userImg.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    imgPreview.src = URL.createObjectURL(userImg);
  }

  resetBtn.addEventListener('click', closeEditWindowByClick, { once: true });
  document.addEventListener('keydown', closeEditWindowByKeydown, { once: true });
});
