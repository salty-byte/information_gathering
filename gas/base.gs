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
  upload() {}
}

class Data{
  constructor(date, title, url) {
    this.date = date;
    this.title = title;
    this.url = url;
  }
}
