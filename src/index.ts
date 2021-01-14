import * as main from './main';

declare const global: {
  [x: string]: () => void;
};

global.createInfoAll = () => main.createInfoAll();
global.uploadInfoAll = () => main.uploadInfoAll();

global.execHatenaBlog = () => main.execHatenaBlog();
global.execHatenaBookmark = () => main.execHatenaBookmark();
global.execITmedia = () => main.execITmedia();
global.execSecurityNext = () => main.execSecurityNext();
global.execTheHackerNews = () => main.execTheHackerNews();
global.execUCCard = () => main.execUCCard();

global.execRSS2 = () => main.execRSS2();
