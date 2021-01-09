import { MockSheet } from './sheet';
import { MockTextFinder } from './textFinder';

describe('MockTextFinder test', () => {
  describe('getCurrentMatch test', () => {
    test('returns null when there is no range with matching text', async () => {
      const sheet = new MockSheet();
      sheet.getRange(1, 2).setValue('not match');
      const textFinder = new MockTextFinder(sheet, 'text');
      expect(textFinder.getCurrentMatch()).toBeNull();
    });

    test('returns the range with matching text', async () => {
      const sheet = new MockSheet();
      sheet.getRange(1, 2).setValue('match text');
      const textFinder = new MockTextFinder(sheet, 'text');
      expect(textFinder.getCurrentMatch()).not.toBeNull();
    });
  });
});
