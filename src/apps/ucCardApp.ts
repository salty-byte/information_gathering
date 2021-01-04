import { BaseApp } from './baseApp';
import { regExpOr } from '../helpers/stringHelpers';

export class UCCardApp extends BaseApp {
  static readonly BASE_URL = 'https://www2.uccard.co.jp';
  static readonly ITEM_LIMIT = 10;

  constructor() {
    super('UCCard', `${UCCardApp.BASE_URL}/important/`);
  }

  fetchData(url: string): AppData[] {
    const response = UrlFetchApp.fetch(url);
    const dlRegexp = /<dl[^>]*>([\s\S]*?)<\/dl>/gi;
    const dlResults = response.getContentText().match(dlRegexp);
    if (!dlResults) {
      return [];
    }

    const itemRegexp = /<dt[^>]*>([\s\S]*?)<\/dd>/gi;
    let results = dlResults[0].match(itemRegexp);
    if (!results) {
      return [];
    }

    // get item limit
    results = results.slice(0, UCCardApp.ITEM_LIMIT);

    const dataList: AppData[] = [];
    for (const text of results) {
      const title = regExpOr(text, /<a[^>]*>([\s\S]*?)<\/a>/, 1);
      const path = regExpOr(text, /<a href="([\s\S]+?)"/, 1);
      const date = regExpOr(text, /<dt>([\s\S]+?)<\/dt>/, 1);
      dataList.push({
        date,
        title: this.trimImgTag(title),
        url: this.createUrl(path),
      });
    }
    return dataList;
  }

  private trimImgTag(str: string) {
    return str.replace(/<img[^>]*>/, '').trim();
  }

  private createUrl(path: string) {
    const target = path.trim();
    return path.startsWith('http') ? target : `${UCCardApp.BASE_URL}${target}`;
  }
}
