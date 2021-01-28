import { BaseApp } from './baseApp';
import { splitAndTrim } from '../helpers/stringHelpers';

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

  protected getItemsRegExp(): RegExp {
    return /<entry>([\s\S]*?)<\/entry>/gi;
  }

  protected getURLRegExp(): RegExp {
    return /<url>([\s\S]+?)<\/url>/;
  }

  protected getDateRegExp(): RegExp {
    return /<published>([\s\S]+?)<\/published>/;
  }
}
