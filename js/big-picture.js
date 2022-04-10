const DISPLAYED_COMMENTS = 5;
const COMMENT_INCREASE_STEP = 5;

const body = document.querySelector('body');
const bigPicture = body.querySelector('.big-picture');
const closeBtn = bigPicture.querySelector('#picture-cancel');
const image = bigPicture.querySelector('img');
const likes = bigPicture.querySelector('.likes-count');
const commentsTotal = bigPicture.querySelector('.comments-total');
const commentsShown = bigPicture.querySelector('.comments-shown');
const socialComments = bigPicture.querySelector('.social__comments');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const description = bigPicture.querySelector('.social__caption');

const getDataById = (pictureNode, receivedData) => {
  const nodeId = pictureNode.dataset.id;
  return receivedData.find((picture) => picture.id === Number(nodeId));
};

const createComment = (commentData) => {
  const comment = document.createElement('li');
  comment.classList.add('social__comment');

  const avatar = document.createElement('img');
  avatar.classList.add('social__picture');
  avatar.src = commentData.avatar;
  avatar.alt = commentData.name;
  avatar.width = 35;
  avatar.height = 35;

  const text = document.createElement('p');
  text.classList.add('social__text');
  text.textContent = commentData.message;

  comment.appendChild(avatar);
  comment.appendChild(text);
  return comment;
};

const closePictureByClick = () => {
  body.classList.remove('modal-open');
  bigPicture.classList.add('hidden');
};

const closePictureByKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();

    body.classList.remove('modal-open');
    bigPicture.classList.add('hidden');
  }
};

const showMoreComments = (comments) => {
  const sliceStart = Number(commentsShown.textContent);
  let sliceEnd;
  if (comments.length <= sliceStart + COMMENT_INCREASE_STEP) {
    sliceEnd = comments.length;
    commentsLoader.classList.add('hidden');
  } else {
    sliceEnd = sliceStart + COMMENT_INCREASE_STEP;
  }
  commentsShown.textContent = sliceEnd;

  comments
    .slice(sliceStart, sliceEnd)
    .forEach((comment) => {
      socialComments.insertAdjacentElement('beforeend', createComment(comment));
    });
};

const showBigPicture = (pictureNode, receivedData) => {
  const pictureData = getDataById(pictureNode, receivedData);

  body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');

  image.src = pictureData.url;
  likes.textContent = pictureData.likes;
  description.textContent = pictureData.description;
  commentsTotal.textContent = pictureData.comments.length;

  if (pictureData.comments.length < DISPLAYED_COMMENTS) {
    commentsShown.textContent = commentsShown.textContent.replace(/[0-99]/, pictureData.comments.length);
    commentsLoader.classList.add('hidden');
  } else {
    commentsShown.textContent = commentsShown.textContent.replace(/[0-9]+/g, 5);
    commentsLoader.classList.remove('hidden');
  }

  while (socialComments.firstChild) {
    socialComments.removeChild(socialComments.firstChild);
  }

  pictureData.comments
    .slice(0, DISPLAYED_COMMENTS)
    .forEach((comment) => {
      socialComments.insertAdjacentElement('beforeend', createComment(comment));
    });

  closeBtn.addEventListener('click', closePictureByClick);
  document.addEventListener('keydown', closePictureByKeydown);
  commentsLoader.addEventListener('click', () => showMoreComments(pictureData.comments));
};

export { showBigPicture };
