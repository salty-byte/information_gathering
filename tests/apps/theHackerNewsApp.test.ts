import { mockSpreadSheet } from '../setupMock';
import { TheHackerNewsApp } from '../../src/apps/theHackerNewsApp';
import * as upload from '../../src/upload';

describe('TheHackerNews test', () => {
  const APP_NAME = 'TheHackerNews';
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

      const app = new TheHackerNewsApp();
      app.create();

      expect(UrlFetchApp.fetch).toHaveBeenCalledWith(
        'https://feeds.feedburner.com/TheHackersNews'
      );

      expect(sheet.getLastRow()).toBe(2);
      expect(sheet.getRange(1, 1).getDisplayValue()).toBe(
        'Fri, 27 Nov 2020 00:00:00 PST'
      );
      expect(sheet.getRange(1, 2).getDisplayValue()).toBe('Title1');
      expect(sheet.getRange(1, 3).getDisplayValue()).toBe(
        'https://example.com/the-hackers-news/1'
      );
      expect(sheet.getRange(2, 1).getDisplayValue()).toBe(
        'Thu, 26 Nov 2020 00:00:00 PST'
      );
      expect(sheet.getRange(2, 2).getDisplayValue()).toBe('Title2');
      expect(sheet.getRange(2, 3).getDisplayValue()).toBe(
        'https://example.com/the-hackers-news/2'
      );
    });

    test('fetch and create infos without duplicate title', async () => {
      const sheet = mockSpreadSheet.getSheetByName(APP_NAME);
      sheet.insertRows(1, 2);
      sheet.getRange(1, 1).setValue('Thu, 26 Nov 2020 00:00:00 PST');
      sheet.getRange(1, 2).setValue('Title1');
      sheet.getRange(1, 3).setValue('https://example.com/the-hackers-news/1');
      sheet.getRange(2, 1).setValue('Mon, 25 Nov 2020 00:00:00 PST');
      sheet.getRange(2, 2).setValue('NewTitle');
      sheet.getRange(2, 3).setValue('https://example.com/the-hackers-news/new');
      expect(sheet.getLastRow()).toBe(2);

      const app = new TheHackerNewsApp();
      app.create();

      expect(sheet.getLastRow()).toBe(3);
      expect(sheet.getRange(1, 1).getDisplayValue()).toBe(
        'Thu, 26 Nov 2020 00:00:00 PST'
      );
      expect(sheet.getRange(1, 2).getDisplayValue()).toBe('Title2');
      expect(sheet.getRange(1, 3).getDisplayValue()).toBe(
        'https://example.com/the-hackers-news/2'
      );
      expect(sheet.getRange(2, 1).getDisplayValue()).toBe(
        'Thu, 26 Nov 2020 00:00:00 PST'
      );
      expect(sheet.getRange(2, 2).getDisplayValue()).toBe('Title1');
      expect(sheet.getRange(2, 3).getDisplayValue()).toBe(
        'https://example.com/the-hackers-news/1'
      );
      expect(sheet.getRange(3, 1).getDisplayValue()).toBe(
        'Mon, 25 Nov 2020 00:00:00 PST'
      );
      expect(sheet.getRange(3, 2).getDisplayValue()).toBe('NewTitle');
      expect(sheet.getRange(3, 3).getDisplayValue()).toBe(
        'https://example.com/the-hackers-news/new'
      );
    });
  });

  describe('upload test', () => {
    test('upload infos', async () => {
      const sheet = mockSpreadSheet.getSheetByName(APP_NAME);
      expect(sheet.getLastRow()).toBe(0);

      const app = new TheHackerNewsApp();
      app.create();
      app.upload();

      const messages = [
        `【${APP_NAME}】`,
        'Title1:',
        'https://example.com/the-hackers-news/1',
        'Title2:',
        'https://example.com/the-hackers-news/2',
      ];
      expect(postSpy).toHaveBeenCalledWith(`${messages.join('\n')}`);
    });

    test('no upload when there are no infos', async () => {
      const sheet = mockSpreadSheet.getSheetByName(APP_NAME);
      expect(sheet.getLastRow()).toBe(0);

      const app = new TheHackerNewsApp();
      app.upload();

      expect(postSpy).not.toHaveBeenCalled();
    });
  });
});
