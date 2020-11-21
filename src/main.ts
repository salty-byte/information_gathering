import { BaseApp } from './apps/baseApp';
import { ITmediaApp } from './apps/itmediaApp';
import { SecurityNextApp } from './apps/securityNextApp';
import { TheHackerNewsApp } from './apps/theHackerNewsApp';

function getAppList(): BaseApp[] {
  return [new SecurityNextApp(), new ITmediaApp(), new TheHackerNewsApp()];
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
