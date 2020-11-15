import {createInfos, uploadInfos} from './main'

declare const global: {
  [x: string]: any;
};

global.createInfos = () => createInfos();
global.uploadInfos = () => uploadInfos();
