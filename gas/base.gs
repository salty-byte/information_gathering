class BaseApp{
  constructor(name = "base", url = "http://example.com") {
    this.name = name;
    this.url = url;
  }
  
  clear() {
    this.getSheet().clear();
  }

  getSheet(sheetName = this.name) {
    const activeSheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = activeSheet.getSheetByName(sheetName);
    return sheet;
  }

  create() {}

  upload() {
    const sheet = this.getSheet();
    let message = `【${this.name}】\n`;
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

class Data{
  constructor(date, title, url) {
    this.date = date;
    this.title = title;
    this.url = url;
  }
}
