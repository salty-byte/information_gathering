import { mockSpreadSheet } from '../setupMock';
import { UCCardApp } from '../../src/apps/ucCardApp';
import * as upload from '../../src/upload';

describe('UCCard test', () => {
  const APP_NAME = 'UCCard';
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

      const app = new UCCardApp();
      app.create();

      expect(UrlFetchApp.fetch).toHaveBeenCalledWith(
        'https://www2.uccard.co.jp/important/'
      );

      expect(sheet.getLastRow()).toBe(2);
      expect(sheet.getRange(1, 1).getDisplayValue()).toBe('2020年12月20日');
      expect(sheet.getRange(1, 2).getDisplayValue()).toBe('タイトル１');
      expect(sheet.getRange(1, 3).getDisplayValue()).toBe(
        'https://www2.uccard.co.jp/uccard/1'
      );
      expect(sheet.getRange(2, 1).getDisplayValue()).toBe('2020年12月19日');
      expect(sheet.getRange(2, 2).getDisplayValue()).toBe('タイトル２');
      expect(sheet.getRange(2, 3).getDisplayValue()).toBe(
        'https://www2.uccard.co.jp/uccard/2'
      );
    });

    test('fetch and create infos without duplicate title', async () => {
      const sheet = mockSpreadSheet.getSheetByName(APP_NAME);
      sheet.insertRows(1, 2);
      sheet.getRange(1, 1).setValue('2020年12月22日');
      sheet.getRange(1, 2).setValue('タイトル１');
      sheet.getRange(1, 3).setValue('https://www2.uccard.co.jp/uccard/1');
      sheet.getRange(2, 1).setValue('2020年12月24日');
      sheet.getRange(2, 2).setValue('新タイトル');
      sheet.getRange(2, 3).setValue('https://www2.uccard.co.jp/uccard/new');
      expect(sheet.getLastRow()).toBe(2);

      const app = new UCCardApp();
      app.create();

      expect(sheet.getLastRow()).toBe(3);
      expect(sheet.getRange(1, 1).getDisplayValue()).toBe('2020年12月19日');
      expect(sheet.getRange(1, 2).getDisplayValue()).toBe('タイトル２');
      expect(sheet.getRange(1, 3).getDisplayValue()).toBe(
        'https://www2.uccard.co.jp/uccard/2'
      );
      expect(sheet.getRange(2, 1).getDisplayValue()).toBe('2020年12月22日');
      expect(sheet.getRange(2, 2).getDisplayValue()).toBe('タイトル１');
      expect(sheet.getRange(2, 3).getDisplayValue()).toBe(
        'https://www2.uccard.co.jp/uccard/1'
      );
      expect(sheet.getRange(3, 1).getDisplayValue()).toBe('2020年12月24日');
      expect(sheet.getRange(3, 2).getDisplayValue()).toBe('新タイトル');
      expect(sheet.getRange(3, 3).getDisplayValue()).toBe(
        'https://www2.uccard.co.jp/uccard/new'
      );
    });
  });

  describe('upload test', () => {
    test('upload infos', async () => {
      const sheet = mockSpreadSheet.getSheetByName(APP_NAME);
      expect(sheet.getLastRow()).toBe(0);

      const app = new UCCardApp();
      app.create();
      app.upload();

      const messages = [
        `【${APP_NAME}】`,
        'タイトル１:',
        'https://www2.uccard.co.jp/uccard/1',
        'タイトル２:',
        'https://www2.uccard.co.jp/uccard/2',
      ];
      expect(postSpy).toHaveBeenCalledWith(`${messages.join('\n')}`);
    });

    test('no upload when there are no infos', async () => {
      const sheet = mockSpreadSheet.getSheetByName(APP_NAME);
      expect(sheet.getLastRow()).toBe(0);

      const app = new UCCardApp();
      app.upload();

      expect(postSpy).not.toHaveBeenCalled();
    });
  });
});
