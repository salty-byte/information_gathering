import { BaseApp } from './baseApp';

export class TheHackerNewsApp extends BaseApp {
  constructor() {
    super('TheHackerNews', 'https://feeds.feedburner.com/TheHackersNews');
  }

  protected getURLRegExp(): RegExp {
    return /<feedburner:origLink>([\s\S]+?)<\/feedburner:origLink>/;
  }

  protected getDateRegExp(): RegExp {
    return /<pubDate>([\s\S]+?)<\/pubDate>/;
  }
}
