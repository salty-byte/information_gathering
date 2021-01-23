import { BaseApp } from './baseApp';
import { regExpOr, splitAndTrim } from '../helpers/stringHelpers';

export class QiitaApp extends BaseApp {
  constructor() {
    const urls = QiitaApp.readUrls();
    super('Qiita', urls);
  }

  private static readUrls(): string[] {
    const urlStr =
      PropertiesService.getScriptProperties().getProperty('QIITA_URLS') || '';
    return splitAndTrim(urlStr, ',');
  }

  fetchData(url: string): AppData[] {
    const response = UrlFetchApp.fetch(url);
    const regexp = /<entry>([\s\S]*?)<\/entry>/gi;
    let results = response.getContentText().match(regexp);
    if (!results) {
      return [];
    }

    // get item limit
    results = results.slice(0, this.itemLimit);

    const dataList: AppData[] = [];
    for (const text of results) {
      const title = regExpOr(text, /<title>([\s\S]+?)<\/title>/, 1);
      const url = regExpOr(text, /<url>([\s\S]+?)<\/url>/, 1);
      const date = regExpOr(text, /<published>([\s\S]+?)<\/published>/, 1);
      dataList.push({
        date,
        title,
        url,
      });
    }
    return dataList;
  }
}
