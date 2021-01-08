import { MockSpreadSheet } from './spreadSheet';

describe('MockSpreadSheet test', () => {
  describe('getSheetByName test', () => {
    test('returns a new sheet when there is no sheet with matching name', async () => {
      const spreadSheet = new MockSpreadSheet();
      const result = spreadSheet.getSheetByName('test');
      expect(result.name).toBe('test');
      expect(spreadSheet.data.size).toBe(1);
    });

    test('returns the sheet with matching name', async () => {
      const spreadSheet = new MockSpreadSheet();
      const sheet = spreadSheet.getSheetByName('test');
      sheet.insertRows(1, 2);
      expect(spreadSheet.data.size).toBe(1);

      const result = spreadSheet.getSheetByName('test');
      expect(result.name).toBe('test');
      expect(spreadSheet.data.size).toBe(1);
    });
  });

  describe('clear test', () => {
    test('clears map data', async () => {
      const spreadSheet = new MockSpreadSheet();
      spreadSheet.getSheetByName('test1');
      spreadSheet.getSheetByName('test2').insertRows(1, 1);
      expect(spreadSheet.data.size).toBe(2);

      spreadSheet.clear();
      expect(spreadSheet.data.size).toBe(0);
    });
  });
});
