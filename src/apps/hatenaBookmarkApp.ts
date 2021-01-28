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

  protected getDateRegExp(): RegExp {
    return /<dc:date>([\s\S]+?)<\/dc:date>/;
  }

  protected filterItem(text: string): boolean {
    return this.hasSecurityTag(text);
  }

  protected findAppData(text: string): AppData {
    const title = regExpOr(text, this.getTitleRegExp(), 1);
    const url = regExpOr(text, this.getURLRegExp(), 1);
    const date = regExpOr(text, this.getDateRegExp(), 1);
    return {
      date,
      title: decodeEntityReferences(title),
      url,
    };
  }

  private hasSecurityTag(text = '') {
    const tags = [...text.matchAll(/<dc:subject>([\s\S]+?)<\/dc:subject>/gi)];
    return tags
      .filter((v) => v && v.length >= 2)
      .map((v) => decodeEntityReferences(v[1]))
      .some((v) => this.securityTags.includes(v));
  }
}
