import { MockSpreadSheet } from './mocks/spreadSheet';
import { MockHTTPResponse } from './mocks/httpResponse';

const mockSpreadSheet = new MockSpreadSheet();

SpreadsheetApp.getActiveSpreadsheet = jest
  .fn()
  .mockImplementation(() => mockSpreadSheet);

UrlFetchApp.fetch = jest
  .fn()
  .mockImplementation((url: string) => new MockHTTPResponse(url));

export { mockSpreadSheet };
