class SecurityNextApp extends BaseApp{
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
  
  fetchData() {
    const response = UrlFetchApp.fetch(this.url);
    const regexp = /<item>([\s\S]*?)<\/item>/gi;
    const result = response.getContentText().match(regexp);
    
    const dataList = [];
    for (let i in result) {
      const text = result[i];
      const title = text.match(/<title>([\s\S]+?)<\/title>/)[1];
      const url = text.match(/<link>([\s\S]+?)<\/link>/)[1];
      const date = text.match(/<pubDate>([\s\S]+?)<\/pubDate>/)[1];
      dataList.push(new Data(date, title, url));
    }
    return dataList;
  }
  
  removeDuplicate(dataList) {
    const sheet = this.getSheet();
    const limit = Math.min(100, sheet.getLastRow());
    return dataList.filter(data => {
      for (let i = 1; i <= limit; i++) {
        const title = sheet.getRange(i, 2).getDisplayValue();
        if (data.title === title) {
          return false;
        }
      }
      return true;
    });
  }
  
  upload() {
    const sheet = this.getSheet();
    
    let message = "";
    for (let i = 1; i <= sheet.getLastRow(); i++) {
      const title = sheet.getRange(i, 2).getDisplayValue();
      const url = sheet.getRange(i, 3).getDisplayValue();
      const isSent = sheet.getRange(i, 4).getDisplayValue();
      if (isSent == '〇') {
        break;
      }
      sheet.getRange(i, 4).setValue('〇');
      message += `${title}:\n${url}\n`
    }
    postToSlack(message);
  }
}
