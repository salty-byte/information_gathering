import {BaseApp} from './baseApp';

export class ITmediaApp extends BaseApp{
  constructor() {
    super("ITmedia", "https://rss.itmedia.co.jp/rss/2.0/news_security.xml");
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
