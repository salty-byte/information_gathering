let slackUrl;
if (process.env.NODE_ENV === 'production') {
  slackUrl = PropertiesService.getScriptProperties().getProperty('SLACK_URL');
}
const SLACK_URL = slackUrl || 'https://example.com/';
const BOT_NAME = 'GAS_Bot';

export { SLACK_URL, BOT_NAME };
