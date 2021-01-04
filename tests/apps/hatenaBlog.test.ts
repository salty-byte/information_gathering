import { mockSpreadSheet } from '../setupMock';
import { HatenaBlogApp } from '../../src/apps/hatenaBlog';
import * as upload from '../../src/upload';

describe('HatenaBlogApp test', () => {
  const APP_NAME = 'HatenaBlog';
  let postSpy: jest.SpyInstance<void, [message?: string]>;

  beforeEach(() => {
    postSpy = jest.spyOn(upload, 'postToSlack').mockReturnValue();
  });

  afterEach(() => {
    mockSpreadSheet.clear();
  });

  describe('create test', () => {
    beforeAll(() => {
      PropertiesService.getScriptProperties = jest
        .fn()
        .mockImplementation(() => {
          return {
            getProperty: () =>
              'https://example.com/hatena-1/,https://example.com/hatena-2/',
          };
        });
    });

    test('fetch and create infos', async () => {
      const sheet = mockSpreadSheet.getSheetByName(APP_NAME);
      expect(sheet.getLastRow()).toBe(0);

      const app = new HatenaBlogApp();
      app.create();

      expect(UrlFetchApp.fetch).toHaveBeenCalledWith(
        'https://example.com/hatena-1/'
      );

      expect(UrlFetchApp.fetch).toHaveBeenCalledWith(
        'https://example.com/hatena-2/'
      );

      expect(sheet.getLastRow()).toBe(3);
      expect(sheet.getRange(1, 1).getDisplayValue()).toBe(
        'Mon, 28 Dec 2020 00:00:00 +0900'
      );
      expect(sheet.getRange(1, 2).getDisplayValue()).toBe('タイトル１');
      expect(sheet.getRange(1, 3).getDisplayValue()).toBe(
        'https://example.com/hatena-1/1'
      );
      expect(sheet.getRange(2, 1).getDisplayValue()).toBe(
        'Sun, 27 Dec 2020 00:00:00 +0900'
      );
      expect(sheet.getRange(2, 2).getDisplayValue()).toBe('タイトル２');
      expect(sheet.getRange(2, 3).getDisplayValue()).toBe(
        'https://example.com/hatena-1/2'
      );
      expect(sheet.getRange(3, 1).getDisplayValue()).toBe(
        'Mon, 28 Dec 2020 00:00:00 +0900'
      );
      expect(sheet.getRange(3, 2).getDisplayValue()).toBe('タイトル３');
      expect(sheet.getRange(3, 3).getDisplayValue()).toBe(
        'https://example.com/hatena-2/1'
      );
    });

    test('fetch and create infos without duplicate title', async () => {
      const sheet = mockSpreadSheet.getSheetByName(APP_NAME);
      sheet.insertRows(1, 2);
      sheet.getRange(1, 1).setValue('Mon, 28 Dec 2020 00:00:00 +0900');
      sheet.getRange(1, 2).setValue('タイトル１');
      sheet.getRange(1, 3).setValue('https://example.com/hatena-1/1');
      sheet.getRange(2, 1).setValue('Sat, 26 Dec 2020 00:00:00 +0900');
      sheet.getRange(2, 2).setValue('新タイトル');
      sheet.getRange(2, 3).setValue('https://example.com/hatena-1/new');
      expect(sheet.getLastRow()).toBe(2);

      const app = new HatenaBlogApp();
      app.create();

      expect(sheet.getLastRow()).toBe(4);
      expect(sheet.getRange(1, 1).getDisplayValue()).toBe(
        'Sun, 27 Dec 2020 00:00:00 +0900'
      );
      expect(sheet.getRange(1, 2).getDisplayValue()).toBe('タイトル２');
      expect(sheet.getRange(1, 3).getDisplayValue()).toBe(
        'https://example.com/hatena-1/2'
      );
      expect(sheet.getRange(2, 1).getDisplayValue()).toBe(
        'Mon, 28 Dec 2020 00:00:00 +0900'
      );
      expect(sheet.getRange(2, 2).getDisplayValue()).toBe('タイトル３');
      expect(sheet.getRange(2, 3).getDisplayValue()).toBe(
        'https://example.com/hatena-2/1'
      );
      expect(sheet.getRange(3, 1).getDisplayValue()).toBe(
        'Mon, 28 Dec 2020 00:00:00 +0900'
      );
      expect(sheet.getRange(3, 2).getDisplayValue()).toBe('タイトル１');
      expect(sheet.getRange(3, 3).getDisplayValue()).toBe(
        'https://example.com/hatena-1/1'
      );
      expect(sheet.getRange(4, 1).getDisplayValue()).toBe(
        'Sat, 26 Dec 2020 00:00:00 +0900'
      );
      expect(sheet.getRange(4, 2).getDisplayValue()).toBe('新タイトル');
      expect(sheet.getRange(4, 3).getDisplayValue()).toBe(
        'https://example.com/hatena-1/new'
      );
    });
  });

  describe('upload test', () => {
    beforeAll(() => {
      PropertiesService.getScriptProperties = jest
        .fn()
        .mockImplementation(() => {
          return {
            getProperty: () => 'https://example.com/hatena-1/',
          };
        });
    });

    test('upload infos', async () => {
      const sheet = mockSpreadSheet.getSheetByName(APP_NAME);
      expect(sheet.getLastRow()).toBe(0);

      const app = new HatenaBlogApp();
      app.create();
      app.upload();

      const messages = [
        `【${APP_NAME}】`,
        'タイトル１:',
        'https://example.com/hatena-1/1',
        'タイトル２:',
        'https://example.com/hatena-1/2',
      ];
      expect(postSpy).toHaveBeenCalledWith(`${messages.join('\n')}`);
    });

    test('no upload when there are no infos', async () => {
      const sheet = mockSpreadSheet.getSheetByName(APP_NAME);
      expect(sheet.getLastRow()).toBe(0);

      const app = new HatenaBlogApp();
      app.upload();

      expect(postSpy).not.toHaveBeenCalled();
    });
  });
});
