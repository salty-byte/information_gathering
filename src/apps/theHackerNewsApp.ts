import { BaseApp } from './baseApp';
import { regExpOr } from '../helpers/stringHelpers';

export class TheHackerNewsApp extends BaseApp {
  constructor() {
    super('TheHackersNews', 'https://feeds.feedburner.com/TheHackersNews');
  }

  fetchData(): AppData[] {
    const response = UrlFetchApp.fetch(this.url);
    const regexp = /<item>([\s\S]*?)<\/item>/gi;
    const results = response.getContentText().match(regexp);
    if (!results) {
      return [];
    }

    const dataList: AppData[] = [];
    for (const text of results) {
      const title = regExpOr(text, /<title>([\s\S]+?)<\/title>/, 1);
      const url = regExpOr(
        text,
        /<feedburner:origLink>([\s\S]+?)<\/feedburner:origLink>/,
        1
      );
      const date = regExpOr(text, /<pubDate>([\s\S]+?)<\/pubDate>/, 1);
      dataList.push({ date, title, url });
    }
    return dataList;
  }
}
