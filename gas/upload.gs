function postToSlack(message = 'no message') {
  const jsonData = {
     "username" : BOT_NAME,
     "text" : message
  };
  const payload = JSON.stringify(jsonData);
  const options = {
    "method" : "post",
    "contentType" : "application/json",
    "payload" : payload
  };

  UrlFetchApp.fetch(SLACK_URL, options);
}
