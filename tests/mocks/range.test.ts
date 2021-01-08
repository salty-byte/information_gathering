import { MockRange } from './range';

describe('MockRange test', () => {
  describe('setValue test', () => {
    test('sets a value', async () => {
      const range = new MockRange();
      expect(range.value).toBe('');

      range.setValue('test');
      expect(range.value).toBe('test');
    });
  });

  describe('getDisplayValue test', () => {
    test('returns the set value', async () => {
      const range = new MockRange();
      expect(range.getDisplayValue()).toBe('');

      range.setValue('test');
      expect(range.getDisplayValue()).toBe('test');
    });
  });
});
