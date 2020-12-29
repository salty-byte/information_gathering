import {
  BaseApp,
  HatenaBookmarkApp,
  ITmediaApp,
  SecurityNextApp,
  TheHackerNewsApp,
} from './apps/index';

function getAppList(): BaseApp[] {
  return [
    new HatenaBookmarkApp(),
    new SecurityNextApp(),
    new ITmediaApp(),
    new TheHackerNewsApp(),
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
