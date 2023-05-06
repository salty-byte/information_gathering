import { BaseApp } from './baseApp';
import { regExpOr } from '../helpers/stringHelpers';

export class UCCardApp extends BaseApp {
  static readonly BASE_URL = 'https://www2.uccard.co.jp';

  constructor() {
    super('UCCard', `${UCCardApp.BASE_URL}/important/`);
  }

  protected findItems(text: string): Array<string> {
    const dlRegexp = /<dl[^>]*>([\s\S]*?)<\/dl>/gi;
    const dlResults = text.match(dlRegexp);
    if (!dlResults) {
      return [];
    }

    const itemRegexp = /<dt[^>]*>([\s\S]*?)<\/dd>/gi;
    return dlResults[0].match(itemRegexp) || [];
  }

  protected findAppData(text: string): AppData {
    const title = regExpOr(text, /<a[^>]*>([\s\S]*?)<\/a>/, 1);
    const path = regExpOr(text, /<a href="([\s\S]+?)"/, 1);
    const date = regExpOr(text, /<dt>([\s\S]+?)<\/dt>/, 1);
    return {
      date,
      title: this.trimImgTag(title),
      url: this.createUrl(path),
    };
  }

  private trimImgTag(str: string) {
    return str.replace(/<img[^>]*>/, '').trim();
  }

  private createUrl(path: string) {
    const target = path.trim();
    return path.startsWith('http') ? target : `${UCCardApp.BASE_URL}${target}`;
  }
}
