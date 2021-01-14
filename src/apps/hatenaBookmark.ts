import { BaseApp } from './baseApp';
import { decodeEntityReferences, regExpOr } from '../helpers/stringHelpers';

export class HatenaBookmarkApp extends BaseApp {
  private securityTags: string[];

  constructor() {
    super('HatenaBookmark', [
      'https://b.hatena.ne.jp/hotentry.rss',
      'https://b.hatena.ne.jp/hotentry/it.rss',
    ]);
    this.securityTags = ['セキュリティ', 'security'];
  }

  fetchData(url: string): AppData[] {
    const response = UrlFetchApp.fetch(url);
    const regexp = /<item[^>]*>([\s\S]*?)<\/item>/gi;
    const results = response.getContentText().match(regexp);
    if (!results) {
      return [];
    }

    const dataList: AppData[] = [];
    for (const text of results) {
      if (!this.hasSecurityTag(text)) {
        continue;
      }
      const title = regExpOr(text, /<title>([\s\S]+?)<\/title>/, 1);
      const url = regExpOr(text, /<link>([\s\S]+?)<\/link>/, 1);
      const date = regExpOr(text, /<dc:date>([\s\S]+?)<\/dc:date>/, 1);
      dataList.push({
        date,
        title: decodeEntityReferences(title),
        url,
      });
    }
    return dataList;
  }

  private hasSecurityTag(text = '') {
    const tags = [...text.matchAll(/<dc:subject>([\s\S]+?)<\/dc:subject>/gi)];
    return tags
      .filter((v) => v && v.length >= 2)
      .map((v) => decodeEntityReferences(v[1]))
      .some((v) => this.securityTags.includes(v));
  }
}
