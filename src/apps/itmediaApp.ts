import { BaseApp } from './baseApp';

export class ITmediaApp extends BaseApp {
  constructor() {
    super('ITmedia', 'https://rss.itmedia.co.jp/rss/2.0/news_security.xml');
  }
}
