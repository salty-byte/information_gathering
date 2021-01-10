import { MockHTTPResponse } from './httpResponse';

describe('httpResponse test', () => {
  describe('MockHTTPResponse test', () => {
    test('returns the suitable response', async () => {
      const response1 = new MockHTTPResponse('https://test.example.com/');
      expect(response1.getContentText()).toBe('<html>test</html>');

      const response2 = new MockHTTPResponse(
        'https://test.example.com/test.html'
      );
      expect(response2.getContentText()).toBe('<html>test</html>');
    });

    test('returns empty when the url is not matching', async () => {
      const response = new MockHTTPResponse('https://not-match.example.com/');
      expect(response.getContentText()).toBe('');
    });
  });
});
