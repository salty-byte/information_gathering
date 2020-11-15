import {BaseApp} from './baseApp';

export class SecurityNextApp extends BaseApp {
  constructor() {
    super("Security Next", "https://www.security-next.com/feed");
  }

  create() {
    const dataList = this.removeDuplicate(this.fetchData());
    if (!dataList.length) {
      return;
    }

    const sheet = this.getSheet();
    sheet.insertRows(1, dataList.length);
    for (let i = 1; i <= dataList.length; i++) {
      const data = dataList[i-1];
      sheet.getRange(i, 1).setValue(data.date);
      sheet.getRange(i, 2).setValue(data.title);
      sheet.getRange(i, 3).setValue(data.url);
    }
  }
}
