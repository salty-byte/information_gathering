import { MockSpreadSheet } from './mocks/spreadSheet';
import { MockHTTPResponse } from './mocks/httpResponse';

SpreadsheetApp.getActiveSpreadsheet = jest
  .fn()
  .mockImplementation(() => new MockSpreadSheet());

UrlFetchApp.fetch = jest
  .fn()
  .mockImplementation((url: string) => new MockHTTPResponse(url));
