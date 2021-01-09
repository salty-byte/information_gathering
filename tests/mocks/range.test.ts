import { MockRange } from './range';

describe('MockRange test', () => {
  describe('setValue test', () => {
    test('sets a value', async () => {
      const range = new MockRange(1, 1);
      expect(range.value).toBe('');

      range.setValue('test');
      expect(range.value).toBe('test');
    });
  });

  describe('getColumn test', () => {
    test('returns the column', async () => {
      const range1 = new MockRange(1, 1);
      expect(range1.getColumn()).toBe(1);

      const range2 = new MockRange(10, 2);
      expect(range2.getColumn()).toBe(2);
    });
  });

  describe('getDisplayValue test', () => {
    test('returns the set value', async () => {
      const range = new MockRange(1, 1);
      expect(range.getDisplayValue()).toBe('');

      range.setValue('test');
      expect(range.getDisplayValue()).toBe('test');
    });
  });

  describe('getRow test', () => {
    test('returns the row', async () => {
      const range1 = new MockRange(1, 1);
      expect(range1.getRow()).toBe(1);

      const range2 = new MockRange(10, 2);
      expect(range2.getRow()).toBe(10);
    });
  });
});
