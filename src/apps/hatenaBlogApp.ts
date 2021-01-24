import { BaseApp } from './baseApp';
import {
  decodeEntityReferences,
  regExpOr,
  splitAndTrim,
} from '../helpers/stringHelpers';

export class HatenaBlogApp extends BaseApp {
  constructor() {
    const urls = HatenaBlogApp.readUrls();
    super('HatenaBlog', urls);
  }

  private static readUrls(): string[] {
    const urlStr =
      PropertiesService.getScriptProperties().getProperty('HATENA_BLOG_URLS') ||
      '';
    return splitAndTrim(urlStr, ',');
  }

  fetchData(url: string): AppData[] {
    const response = UrlFetchApp.fetch(url);
    const regexp = /<item[^>]*>([\s\S]*?)<\/item>/gi;
    let results = response.getContentText().match(regexp);
    if (!results) {
      return [];
    }

    // get item limit
    results = results.slice(0, this.itemLimit);

    const dataList: AppData[] = [];
    for (const text of results) {
      const title = regExpOr(text, /<title>([\s\S]+?)<\/title>/, 1);
      const url = regExpOr(text, /<link>([\s\S]+?)<\/link>/, 1);
      const date = regExpOr(text, /<pubDate>([\s\S]+?)<\/pubDate>/, 1);
      dataList.push({
        date,
        title: decodeEntityReferences(title),
        url,
      });
    }
    return dataList;
  }
}
