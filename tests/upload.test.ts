import { postToSlack } from '../src/upload';

UrlFetchApp.fetch = jest.fn();

describe('upload test', () => {
  describe('postToSlack test', () => {
    test('send a message to slack', async () => {
      postToSlack('test');
      expect(UrlFetchApp.fetch).toHaveBeenCalledWith('https://example.com/', {
        contentType: 'application/json',
        method: 'post',
        payload: '{"username":"GAS_Bot","text":"test"}',
      });
    });
  });
});
