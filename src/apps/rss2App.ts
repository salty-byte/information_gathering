import { BaseApp } from './baseApp';

export class RSS2App extends BaseApp {
  constructor() {
    const urls = RSS2App.readUrls();
    super('RSS2.0', urls);
  }

  private static readUrls(): string[] {
    const urlStr =
      PropertiesService.getScriptProperties().getProperty('RSS2_URLS') || '';
    return urlStr
      .split(',')
      .map((v) => v.trim())
      .filter(Boolean);
  }
}
