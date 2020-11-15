import {BOT_NAME, SLACK_URL} from './settings';

export function postToSlack(message = 'no message') {
  const jsonData = {
    username: BOT_NAME,
    text: message,
  };

  UrlFetchApp.fetch(SLACK_URL, {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(jsonData),
  });
}
