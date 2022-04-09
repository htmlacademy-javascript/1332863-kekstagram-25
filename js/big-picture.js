const body = document.querySelector('body');
const bigPicture = body.querySelector('.big-picture');
const closeBtn = bigPicture.querySelector('#picture-cancel');
const image = bigPicture.querySelector('img');
const likes = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const socialComments = bigPicture.querySelector('.social__comments');
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

const showBigPicture = (pictureNode, recievedData) => {

  const pictureData = getDataById(pictureNode, recievedData);

  body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');

  image.src = pictureData.url;
  likes.textContent = pictureData.likes;
  commentsCount.textContent = pictureData.comments.length;
  description.textContent = pictureData.description;

  while (socialComments.firstChild) {
    socialComments.removeChild(socialComments.firstChild);
  }

  pictureData.comments.forEach((comment) => {
    socialComments.insertAdjacentElement('afterbegin', createComment(comment));
  });

  closeBtn.addEventListener('click', closePictureByClick);
  document.addEventListener('keydown', closePictureByKeydown);
};

export { showBigPicture };
