import {
  BaseApp,
  HatenaBlogApp,
  HatenaBookmarkApp,
  ITmediaApp,
  SecurityNextApp,
  TheHackerNewsApp,
  UCCardApp,
} from './apps/index';

const getAppList = (): BaseApp[] => {
  return [
    new HatenaBlogApp(),
    new HatenaBookmarkApp(),
    new SecurityNextApp(),
    new ITmediaApp(),
    new TheHackerNewsApp(),
    new UCCardApp(),
  ];
};

export const createInfoAll = (): void => {
  const appList = getAppList();
  for (const app of appList) {
    app.create();
  }
};

export const uploadInfoAll = (): void => {
  const appList = getAppList();
  for (const app of appList) {
    app.upload();
  }
};

export const execHatenaBlog = (): void => {
  const app = new HatenaBlogApp();
  app.create();
  app.upload();
};

export const execHatenaBookmark = (): void => {
  const app = new HatenaBookmarkApp();
  app.create();
  app.upload();
};

export const execSecurityNext = (): void => {
  const app = new SecurityNextApp();
  app.create();
  app.upload();
};

export const execITmedia = (): void => {
  const app = new ITmediaApp();
  app.create();
  app.upload();
};

export const execTheHackerNews = (): void => {
  const app = new TheHackerNewsApp();
  app.create();
  app.upload();
};

export const execUCCard = (): void => {
  const app = new UCCardApp();
  app.create();
  app.upload();
};
