import { BaseApp } from './baseApp';

export class TheHackerNewsApp extends BaseApp {
  constructor() {
    super('TheHackerNews', 'https://feeds.feedburner.com/TheHackersNews');
  }
}
