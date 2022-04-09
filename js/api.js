import { showErrorMessage } from './util.js';

const URL_FOR_GET = 'https://25.javascript.pages.academy/kekstagram/data';
const URL_FOR_SEND = 'https://25.javascript.pages.academy/kekstagram';
const MESSAGE_TEXT = 'Ошибка при получении данных с сервера, повторите попытку позже.';
const ALERT_SHOW_TIME = 5000;

const getData = () =>
  fetch(URL_FOR_GET)
    .then((response) => response.json())
    .catch(() => showErrorMessage(MESSAGE_TEXT, ALERT_SHOW_TIME));

const sendData = (data) => fetch(URL_FOR_SEND, { method: 'POST', body: data }).catch();

export { getData, sendData };
