import { createInfos, uploadInfos } from './main';

declare const global: {
  [x: string]: () => void;
};

global.createInfos = () => createInfos();
global.uploadInfos = () => uploadInfos();
