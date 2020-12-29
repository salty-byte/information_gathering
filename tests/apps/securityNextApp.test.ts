import { mockSpreadSheet } from '../setupMock';
import { SecurityNextApp } from '../../src/apps/securityNextApp';
import * as upload from '../../src/upload';

describe('SecurityNextApp test', () => {
  const APP_NAME = 'Security Next';
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

      const app = new SecurityNextApp();
      app.create();

      expect(UrlFetchApp.fetch).toHaveBeenCalledWith(
        'https://www.security-next.com/feed'
      );

      expect(sheet.getLastRow()).toBe(2);
      expect(sheet.getRange(1, 1).getDisplayValue()).toBe(
        'Wed, 25 Nov 2020 00:00:00 +0000'
      );
      expect(sheet.getRange(1, 2).getDisplayValue()).toBe('タイトル１');
      expect(sheet.getRange(1, 3).getDisplayValue()).toBe(
        'https://example.com/security-next/1'
      );
      expect(sheet.getRange(2, 1).getDisplayValue()).toBe(
        'Thu, 26 Nov 2020 00:00:00 +0000'
      );
      expect(sheet.getRange(2, 2).getDisplayValue()).toBe('タイトル２');
      expect(sheet.getRange(2, 3).getDisplayValue()).toBe(
        'https://example.com/security-next/2'
      );
    });

    test('fetch and create infos without duplicate title', async () => {
      const sheet = mockSpreadSheet.getSheetByName(APP_NAME);
      sheet.insertRows(1, 2);
      sheet.getRange(1, 1).setValue('Tue, 24 Nov 2020 00:00:00 +0000');
      sheet.getRange(1, 2).setValue('タイトル１');
      sheet.getRange(1, 3).setValue('https://example.com/security-next/1');
      sheet.getRange(2, 1).setValue('Thu, 26 Nov 2020 00:00:00 +0000');
      sheet.getRange(2, 2).setValue('新タイトル');
      sheet.getRange(2, 3).setValue('https://example.com/security-next/new');
      expect(sheet.getLastRow()).toBe(2);

      const app = new SecurityNextApp();
      app.create();

      expect(sheet.getLastRow()).toBe(3);
      expect(sheet.getRange(1, 1).getDisplayValue()).toBe(
        'Thu, 26 Nov 2020 00:00:00 +0000'
      );
      expect(sheet.getRange(1, 2).getDisplayValue()).toBe('タイトル２');
      expect(sheet.getRange(1, 3).getDisplayValue()).toBe(
        'https://example.com/security-next/2'
      );
      expect(sheet.getRange(2, 1).getDisplayValue()).toBe(
        'Tue, 24 Nov 2020 00:00:00 +0000'
      );
      expect(sheet.getRange(2, 2).getDisplayValue()).toBe('タイトル１');
      expect(sheet.getRange(2, 3).getDisplayValue()).toBe(
        'https://example.com/security-next/1'
      );
      expect(sheet.getRange(3, 1).getDisplayValue()).toBe(
        'Thu, 26 Nov 2020 00:00:00 +0000'
      );
      expect(sheet.getRange(3, 2).getDisplayValue()).toBe('新タイトル');
      expect(sheet.getRange(3, 3).getDisplayValue()).toBe(
        'https://example.com/security-next/new'
      );
    });
  });

  describe('upload test', () => {
    test('upload infos', async () => {
      const sheet = mockSpreadSheet.getSheetByName(APP_NAME);
      expect(sheet.getLastRow()).toBe(0);

      const app = new SecurityNextApp();
      app.create();
      app.upload();

      const messages = [
        `【${APP_NAME}】`,
        'タイトル１:',
        'https://example.com/security-next/1',
        'タイトル２:',
        'https://example.com/security-next/2',
      ];
      expect(postSpy).toHaveBeenCalledWith(`${messages.join('\n')}`);
    });

    test('no upload when there are no infos', async () => {
      const sheet = mockSpreadSheet.getSheetByName(APP_NAME);
      expect(sheet.getLastRow()).toBe(0);

      const app = new SecurityNextApp();
      app.upload();

      expect(postSpy).not.toHaveBeenCalled();
    });
  });
});
