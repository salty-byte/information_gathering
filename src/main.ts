import { ITmediaApp } from './apps/itmediaApp';
import { SecurityNextApp } from './apps/securityNextApp';

export function createInfos(): void {
  const appList = [];
  appList.push(new SecurityNextApp());
  appList.push(new ITmediaApp());

  for (const app of appList) {
    app.create();
  }
}

export function uploadInfos(): void {
  const appList = [];
  appList.push(new SecurityNextApp());
  appList.push(new ITmediaApp());

  for (const app of appList) {
    app.upload();
  }
}
