import { postToSlack } from '../upload';
import { regExpOr } from '../helpers/stringHelpers';

export abstract class BaseApp {
  protected name: string;
  protected url: string;

  constructor(name = 'base', url = 'http://example.com') {
    this.name = name;
    this.url = url;
  }

  protected getSheet(
    sheetName = this.name
  ): GoogleAppsScript.Spreadsheet.Sheet {
    const activeSheet = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = activeSheet.getSheetByName(sheetName);
    if (!sheet) {
      sheet = activeSheet.insertSheet(sheetName);
    }
    return sheet;
  }

  create(): void {
    const dataList = this.removeDuplicate(this.fetchData());
    if (!dataList.length) {
      return;
    }

    const sheet = this.getSheet();
    sheet.insertRows(1, dataList.length);
    for (let i = 1; i <= dataList.length; i++) {
      const data = dataList[i - 1];
      sheet.getRange(i, 1).setValue(data.date);
      sheet.getRange(i, 2).setValue(data.title);
      sheet.getRange(i, 3).setValue(data.url);
    }
  }

  protected fetchData(): AppData[] {
    const response = UrlFetchApp.fetch(this.url);
    const regexp = /<item>([\s\S]*?)<\/item>/gi;
    const results = response.getContentText().match(regexp);
    if (!results) {
      return [];
    }

    const dataList: AppData[] = [];
    for (const text of results) {
      const title = regExpOr(text, /<title>([\s\S]+?)<\/title>/, 1);
      const url = regExpOr(text, /<link>([\s\S]+?)<\/link>/, 1);
      const date = regExpOr(text, /<pubDate>([\s\S]+?)<\/pubDate>/, 1);
      dataList.push({ date, title, url });
    }
    return dataList;
  }

  protected removeDuplicate(dataList: AppData[]): AppData[] {
    const sheet = this.getSheet();
    const limit = Math.min(100, sheet.getLastRow());
    return dataList.filter((data) => {
      for (let i = 1; i <= limit; i++) {
        const title = sheet.getRange(i, 2).getDisplayValue();
        if (data.title === title) {
          return false;
        }
      }
      return true;
    });
  }

  upload(): void {
    const sheet = this.getSheet();
    const messages: string[] = [];
    for (let i = 1; i <= sheet.getLastRow(); i++) {
      const title = sheet.getRange(i, 2).getDisplayValue();
      const url = sheet.getRange(i, 3).getDisplayValue();
      const isSent = sheet.getRange(i, 4).getDisplayValue();
      if (isSent == '〇') {
        break;
      }
      sheet.getRange(i, 4).setValue('〇');
      messages.push(`${title}:\n${url}`);
    }

    if (messages.length) {
      const message = `【${this.name}】\n${messages.join('\n')}`;
      postToSlack(message);
    }
  }
}
