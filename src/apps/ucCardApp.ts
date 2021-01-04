import { BaseApp } from './baseApp';
import { regExpOr } from '../helpers/stringHelpers';

export class UCCardApp extends BaseApp {
  constructor() {
    super('UCCard', 'https://www2.uccard.co.jp/important/');
  }

  fetchData(url: string): AppData[] {
    const response = UrlFetchApp.fetch(url);
    const dlRegexp = /<dl[^>]*>([\s\S]*?)<\/dl>/gi;
    const dlResults = response.getContentText().match(dlRegexp);
    if (!dlResults) {
      return [];
    }

    let itemList: string[] = [];
    for (const text of dlResults) {
      const itemRegexp = /<dt[^>]*>([\s\S]*?)<\/dd>/gi;
      const results = text.match(itemRegexp);
      if (results) {
        itemList = itemList.concat(results);
      }
    }

    const dataList: AppData[] = [];
    for (const text of itemList) {
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
    return path.startsWith('http')
      ? target
      : `https://www2.uccard.co.jp${target}`;
  }
}
