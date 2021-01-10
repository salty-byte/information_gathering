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

    test('returns null when there is no current range with matching text', async () => {
      const sheet = new MockSheet();
      sheet.getRange(1, 2).setValue('match text');
      const textFinder = new MockTextFinder(sheet, 'text');
      expect(textFinder.getCurrentMatch()).toBeNull();
    });

    test('returns the current range with matching text', async () => {
      const sheet = new MockSheet();
      sheet.getRange(1, 2).setValue('text');
      const textFinder = new MockTextFinder(sheet, 'text');
      textFinder.findNext();
      const result = textFinder.getCurrentMatch();
      expect(result).not.toBeNull();
      expect(result?.getColumn()).toBe(2);
      expect(result?.getRow()).toBe(1);
    });
  });

  describe('findNext test', () => {
    test('returns null when there is no range with matching text', async () => {
      const sheet = new MockSheet();
      sheet.getRange(1, 2).setValue('not match');
      const textFinder = new MockTextFinder(sheet, 'text');
      expect(textFinder.findNext()).toBeNull();
    });

    test('returns null when there is no next range with matching text', async () => {
      const sheet = new MockSheet();
      sheet.getRange(1, 2).setValue('match text');
      sheet.getRange(3, 2).setValue('not match');
      const textFinder = new MockTextFinder(sheet, 'text');
      textFinder.findNext();
      expect(textFinder.findNext()).toBeNull();
    });

    test('returns the next range with matching text', async () => {
      const sheet = new MockSheet();
      sheet.getRange(1, 2).setValue('not match');
      sheet.getRange(2, 3).setValue('match text');
      sheet.getRange(3, 1).setValue('text next');
      const textFinder = new MockTextFinder(sheet, 'text');
      const result1 = textFinder.findNext();
      expect(result1).not.toBeNull();
      expect(result1?.getRow()).toBe(2);
      expect(result1?.getColumn()).toBe(3);

      const result2 = textFinder.findNext();
      expect(result2).not.toBeNull();
      expect(result2?.getRow()).toBe(3);
      expect(result2?.getColumn()).toBe(1);
    });
  });
});
