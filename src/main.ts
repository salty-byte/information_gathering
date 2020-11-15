import {ITmediaApp} from './apps/itmediaApp';
import {SecurityNextApp} from './apps/securityNextApp';

export function createInfos() {
  const appList = [];
  appList.push(new SecurityNextApp());
  appList.push(new ITmediaApp());

  for (const app of appList) {
    app.create();
  }
}

export function uploadInfos() {
  const appList = [];
  appList.push(new SecurityNextApp());
  appList.push(new ITmediaApp());

  for (const app of appList) {
    app.upload();
  }
}
