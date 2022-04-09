const insertData = (node, data, prop = 'textContent') => {
  if (data) {
    node[prop] = data;
  } else {
    node.remove();
  }
};

const createSmallPicture = (pictureData) => {
  const template = document.querySelector('#picture').content.querySelector('.picture');
  const picture = template.cloneNode(true);

  const imgNode = picture.querySelector('.picture__img');
  const commentsCountNode = picture.querySelector('.picture__comments');
  const likesNode = picture.querySelector('.picture__likes');

  const { id, url, likes, comments } = pictureData;
  const commentsLength = comments.length;

  insertData(imgNode, url, 'src');
  insertData(commentsCountNode, commentsLength);
  insertData(likesNode, likes);
  picture.setAttribute('data-id', id);

  return picture;
};

export { createSmallPicture };
