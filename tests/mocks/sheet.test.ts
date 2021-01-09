import { MockSheet } from './sheet';
import { MockTextFinder } from './textFinder';

describe('MockRange test', () => {
  describe('insertRows test', () => {
    test('inserts some rows', async () => {
      const sheet = new MockSheet('test');
      expect(sheet.data.size).toBe(0);

      sheet.insertRows(1, 3);
      sheet.getRange(1, 2).setValue('line1');
      sheet.getRange(2, 2).setValue('line2');
      sheet.getRange(3, 2).setValue('line3');
      expect(sheet.data.size).toBe(3);

      sheet.insertRows(2, 2);
      expect(sheet.data.size).toBe(5);
      expect(sheet.getRange(1, 2).getDisplayValue()).toBe('line1');
      expect(sheet.getRange(4, 2).getDisplayValue()).toBe('line2');
      expect(sheet.getRange(5, 2).getDisplayValue()).toBe('line3');
    });
  });

  describe('getLastRow test', () => {
    test('returns the number of last row', async () => {
      const sheet = new MockSheet('test');
      expect(sheet.getLastRow()).toBe(0);

      sheet.insertRows(1, 3);
      sheet.getRange(1, 2).setValue('line1');
      expect(sheet.getLastRow()).toBe(3);

      sheet.insertRows(2, 3);
      expect(sheet.getLastRow()).toBe(6);

      sheet.getRange(10, 1);
      expect(sheet.getLastRow()).toBe(10);
    });
  });

  describe('getRange test', () => {
    test('returns a new range when there is no range with matching row and column', async () => {
      const sheet = new MockSheet('test');
      expect(sheet.getLastRow()).toBe(0);

      const range = sheet.getRange(1, 4);
      expect(range.getDisplayValue()).toBe('');
    });

    test('returns the range with matching row and column', async () => {
      const sheet = new MockSheet('test');
      sheet.getRange(2, 4).setValue('new range');
      expect(sheet.getRange(2, 4).getDisplayValue()).toBe('new range');
    });
  });

  describe('createTextFinder test', () => {
    test('returns a new text finder', async () => {
      const sheet = new MockSheet('test');
      expect(sheet.createTextFinder('text')).toBeInstanceOf(MockTextFinder);
    });
  });
});
