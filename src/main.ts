import {
  BaseApp,
  HatenaBlogApp,
  HatenaBookmarkApp,
  ITmediaApp,
  SecurityNextApp,
  TheHackerNewsApp,
  UCCardApp,
} from './apps/index';

function getAppList(): BaseApp[] {
  return [
    new HatenaBlogApp(),
    new HatenaBookmarkApp(),
    new SecurityNextApp(),
    new ITmediaApp(),
    new TheHackerNewsApp(),
    new UCCardApp(),
  ];
}

export function createInfos(): void {
  const appList = getAppList();
  for (const app of appList) {
    app.create();
  }
}

export function uploadInfos(): void {
  const appList = getAppList();
  for (const app of appList) {
    app.upload();
  }
}
