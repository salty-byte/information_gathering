import { mockSpreadSheet } from '../setupMock';
import { HatenaBookmarkApp } from '../../src/apps/hatenaBookmark';
import * as upload from '../../src/upload';

describe('HatenaBookmarkApp test', () => {
  const APP_NAME = 'HatenaBookmark';
  let postSpy: jest.SpyInstance<void, [message?: string]>;

  beforeEach(() => {
    postSpy = jest.spyOn(upload, 'postToSlack').mockReturnValue();
  });

  afterEach(() => {
    mockSpreadSheet.clear();
  });

  describe('create test', () => {
    test('fetch and create infos', async () => {
      const sheet = mockSpreadSheet.getSheetByName(APP_NAME);
      expect(sheet.getLastRow()).toBe(0);

      const app = new HatenaBookmarkApp();
      app.create();

      expect(UrlFetchApp.fetch).toHaveBeenCalledWith(
        'https://b.hatena.ne.jp/hotentry.rss'
      );

      expect(UrlFetchApp.fetch).toHaveBeenCalledWith(
        'https://b.hatena.ne.jp/hotentry/it.rss'
      );

      expect(sheet.getLastRow()).toBe(2);
      expect(sheet.getRange(1, 1).getDisplayValue()).toBe(
        '2020-12-28T00:00:00Z'
      );
      expect(sheet.getRange(1, 2).getDisplayValue()).toBe('タイトル１');
      expect(sheet.getRange(1, 3).getDisplayValue()).toBe(
        'https://example.com/hatena/1'
      );
      expect(sheet.getRange(2, 1).getDisplayValue()).toBe(
        '2020-12-27T00:00:00Z'
      );
      expect(sheet.getRange(2, 2).getDisplayValue()).toBe('タイトル２');
      expect(sheet.getRange(2, 3).getDisplayValue()).toBe(
        'https://example.com/hatena/2'
      );
    });

    test('fetch and create infos without duplicate title', async () => {
      const sheet = mockSpreadSheet.getSheetByName(APP_NAME);
      sheet.insertRows(1, 2);
      sheet.getRange(1, 1).setValue('2020-12-25T00:00:00Z');
      sheet.getRange(1, 2).setValue('タイトル１');
      sheet.getRange(1, 3).setValue('https://example.com/hatena/1');
      sheet.getRange(2, 1).setValue('2020-12-25T00:00:00Z');
      sheet.getRange(2, 2).setValue('新タイトル');
      sheet.getRange(2, 3).setValue('https://example.com/hatena/new');
      expect(sheet.getLastRow()).toBe(2);

      const app = new HatenaBookmarkApp();
      app.create();

      expect(sheet.getLastRow()).toBe(3);
      expect(sheet.getRange(1, 1).getDisplayValue()).toBe(
        '2020-12-27T00:00:00Z'
      );
      expect(sheet.getRange(1, 2).getDisplayValue()).toBe('タイトル２');
      expect(sheet.getRange(1, 3).getDisplayValue()).toBe(
        'https://example.com/hatena/2'
      );
      expect(sheet.getRange(2, 1).getDisplayValue()).toBe(
        '2020-12-25T00:00:00Z'
      );
      expect(sheet.getRange(2, 2).getDisplayValue()).toBe('タイトル１');
      expect(sheet.getRange(2, 3).getDisplayValue()).toBe(
        'https://example.com/hatena/1'
      );
      expect(sheet.getRange(3, 1).getDisplayValue()).toBe(
        '2020-12-25T00:00:00Z'
      );
      expect(sheet.getRange(3, 2).getDisplayValue()).toBe('新タイトル');
      expect(sheet.getRange(3, 3).getDisplayValue()).toBe(
        'https://example.com/hatena/new'
      );
    });
  });

  describe('upload test', () => {
    test('upload infos', async () => {
      const sheet = mockSpreadSheet.getSheetByName(APP_NAME);
      expect(sheet.getLastRow()).toBe(0);

      const app = new HatenaBookmarkApp();
      app.create();
      app.upload();

      const messages = [
        `【${APP_NAME}】`,
        'タイトル１:',
        'https://example.com/hatena/1',
        'タイトル２:',
        'https://example.com/hatena/2',
      ];
      expect(postSpy).toHaveBeenCalledWith(`${messages.join('\n')}`);
    });

    test('no upload when there are no infos', async () => {
      const sheet = mockSpreadSheet.getSheetByName(APP_NAME);
      expect(sheet.getLastRow()).toBe(0);

      const app = new HatenaBookmarkApp();
      app.upload();

      expect(postSpy).not.toHaveBeenCalled();
    });
  });
});
