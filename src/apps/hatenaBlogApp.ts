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
}
