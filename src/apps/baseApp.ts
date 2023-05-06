import { postToSlack } from '../upload';
import { regExpOr } from '../helpers/stringHelpers';

export abstract class BaseApp {
  static readonly STATUS_NEW = 'new';
  static readonly STATUS_UPLOADING = 'uploading';
  static readonly STATUS_UPLOADED = 'uploaded';

  protected name: string;
  protected urls: string[];
  protected itemLimit = 5;

  constructor(name = 'base', urls: string | string[], itemLimit = 5) {
    this.name = name;
    this.urls = Array.isArray(urls) ? urls : [urls];
    this.itemLimit = itemLimit;
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
    const dataList = this.removeDuplicate(this.fetchDataList());
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
      sheet.getRange(i, 4).setValue(BaseApp.STATUS_NEW);
    }
  }

  protected fetchDataList(): AppData[] {
    const dataMap = new Map<string, AppData>();
    for (const url of this.urls) {
      const data = this.fetchData(url);
      data.forEach((v) => dataMap.set(v.url, v));
    }
    return Array.from(dataMap.values());
  }

  protected fetchData(url: string): AppData[] {
    const response = UrlFetchApp.fetch(url);
    return this.findItems(response.getContentText())
      .slice(0, this.itemLimit)
      .filter((v) => this.filterItem(v))
      .map((v) => this.findAppData(v));
  }

  protected findItems(text: string): Array<string> {
    const regexp = this.getItemsRegExp();
    return text.match(regexp) || [];
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected filterItem(text: string): boolean {
    return true;
  }

  protected findAppData(text: string): AppData {
    const title = regExpOr(text, this.getTitleRegExp(), 1);
    const url = regExpOr(text, this.getURLRegExp(), 1);
    const date = regExpOr(text, this.getDateRegExp(), 1);
    return { date, title, url };
  }

  protected getItemsRegExp(): RegExp {
    return /<item[^>]*>([\s\S]*?)<\/item>/gi;
  }

  protected getTitleRegExp(): RegExp {
    return /<title>([\s\S]+?)<\/title>/;
  }

  protected getURLRegExp(): RegExp {
    return /<link>([\s\S]+?)<\/link>/;
  }

  protected getDateRegExp(): RegExp {
    return /<pubDate>([\s\S]+?)<\/pubDate>/;
  }

  protected removeDuplicate(dataList: AppData[]): AppData[] {
    const sheet = this.getSheet();
    const limit = Math.min(100, sheet.getLastRow());
    return dataList.filter((data) => {
      const result = sheet.createTextFinder(data.title).findNext();
      return !result || result.getRow() > limit;
    });
  }

  upload(): void {
    const sheet = this.getSheet();
    const messages: string[] = [];
    for (let i = 1; i <= sheet.getLastRow(); i++) {
      const status = sheet.getRange(i, 4).getDisplayValue();
      if (status === BaseApp.STATUS_UPLOADED) {
        break;
      }
      const title = sheet.getRange(i, 2).getDisplayValue();
      const url = sheet.getRange(i, 3).getDisplayValue();
      messages.push(`${title}:\n${url}`);
      sheet.getRange(i, 4).setValue(BaseApp.STATUS_UPLOADING);
    }

    if (!messages.length) {
      return;
    }

    const message = `【${this.name}】\n${messages.join('\n')}`;
    postToSlack(message);

    for (let i = 1; i <= sheet.getLastRow(); i++) {
      const status = sheet.getRange(i, 4).getDisplayValue();
      if (status === BaseApp.STATUS_UPLOADED) {
        break;
      }
      if (status === BaseApp.STATUS_UPLOADING) {
        sheet.getRange(i, 4).setValue(BaseApp.STATUS_UPLOADED);
      }
    }
  }
}
