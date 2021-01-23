import { mockSpreadSheet } from '../setupMock';
import { QiitaApp } from '../../src/apps/qiitaApp';
import * as upload from '../../src/upload';

describe('QiitaApp test', () => {
  const APP_NAME = 'Qiita';
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
              'https://example.com/qiita-1/,https://example.com/qiita-2/',
          };
        });
    });

    test('fetch and create infos', async () => {
      const sheet = mockSpreadSheet.getSheetByName(APP_NAME);
      expect(sheet.getLastRow()).toBe(0);

      const app = new QiitaApp();
      app.create();

      expect(UrlFetchApp.fetch).toHaveBeenCalledWith(
        'https://example.com/qiita-1/'
      );

      expect(UrlFetchApp.fetch).toHaveBeenCalledWith(
        'https://example.com/qiita-2/'
      );

      expect(sheet.getLastRow()).toBe(3);
      expect(sheet.getRange(1, 1).getDisplayValue()).toBe(
        '2021-01-23T00:00:00+09:00'
      );
      expect(sheet.getRange(1, 2).getDisplayValue()).toBe('タイトル２');
      expect(sheet.getRange(1, 3).getDisplayValue()).toBe(
        'https://example.com/qiita-1/2'
      );
      expect(sheet.getRange(2, 1).getDisplayValue()).toBe(
        '2021-01-22T00:00:00+09:00'
      );
      expect(sheet.getRange(2, 2).getDisplayValue()).toBe('タイトル１');
      expect(sheet.getRange(2, 3).getDisplayValue()).toBe(
        'https://example.com/qiita-1/1'
      );
      expect(sheet.getRange(3, 1).getDisplayValue()).toBe(
        '2021-01-20T00:00:00+09:00'
      );
      expect(sheet.getRange(3, 2).getDisplayValue()).toBe('タイトル３');
      expect(sheet.getRange(3, 3).getDisplayValue()).toBe(
        'https://example.com/qiita-2/1'
      );
    });

    test('fetch and create infos without duplicate title', async () => {
      const sheet = mockSpreadSheet.getSheetByName(APP_NAME);
      sheet.insertRows(1, 2);
      sheet.getRange(1, 1).setValue('2021-01-23T00:00:00+09:00');
      sheet.getRange(1, 2).setValue('タイトル１');
      sheet.getRange(1, 3).setValue('https://example.com/qiita-1/1');
      sheet.getRange(2, 1).setValue('2021-01-23T00:00:00+09:00');
      sheet.getRange(2, 2).setValue('新タイトル');
      sheet.getRange(2, 3).setValue('https://example.com/qiita-1/new');
      expect(sheet.getLastRow()).toBe(2);

      const app = new QiitaApp();
      app.create();

      expect(sheet.getLastRow()).toBe(4);
      expect(sheet.getRange(1, 1).getDisplayValue()).toBe(
        '2021-01-23T00:00:00+09:00'
      );
      expect(sheet.getRange(1, 2).getDisplayValue()).toBe('タイトル２');
      expect(sheet.getRange(1, 3).getDisplayValue()).toBe(
        'https://example.com/qiita-1/2'
      );
      expect(sheet.getRange(2, 1).getDisplayValue()).toBe(
        '2021-01-20T00:00:00+09:00'
      );
      expect(sheet.getRange(2, 2).getDisplayValue()).toBe('タイトル３');
      expect(sheet.getRange(2, 3).getDisplayValue()).toBe(
        'https://example.com/qiita-2/1'
      );
      expect(sheet.getRange(3, 1).getDisplayValue()).toBe(
        '2021-01-23T00:00:00+09:00'
      );
      expect(sheet.getRange(3, 2).getDisplayValue()).toBe('タイトル１');
      expect(sheet.getRange(3, 3).getDisplayValue()).toBe(
        'https://example.com/qiita-1/1'
      );
      expect(sheet.getRange(4, 1).getDisplayValue()).toBe(
        '2021-01-23T00:00:00+09:00'
      );
      expect(sheet.getRange(4, 2).getDisplayValue()).toBe('新タイトル');
      expect(sheet.getRange(4, 3).getDisplayValue()).toBe(
        'https://example.com/qiita-1/new'
      );
    });
  });

  describe('upload test', () => {
    beforeAll(() => {
      PropertiesService.getScriptProperties = jest
        .fn()
        .mockImplementation(() => {
          return {
            getProperty: () => 'https://example.com/qiita-1/',
          };
        });
    });

    test('upload infos', async () => {
      const sheet = mockSpreadSheet.getSheetByName(APP_NAME);
      expect(sheet.getLastRow()).toBe(0);

      const app = new QiitaApp();
      app.create();
      app.upload();

      const messages = [
        `【${APP_NAME}】`,
        'タイトル２:',
        'https://example.com/qiita-1/2',
        'タイトル１:',
        'https://example.com/qiita-1/1',
      ];
      expect(postSpy).toHaveBeenCalledWith(`${messages.join('\n')}`);
    });

    test('no upload when there are no infos', async () => {
      const sheet = mockSpreadSheet.getSheetByName(APP_NAME);
      expect(sheet.getLastRow()).toBe(0);

      const app = new QiitaApp();
      app.upload();

      expect(postSpy).not.toHaveBeenCalled();
    });
  });
});
