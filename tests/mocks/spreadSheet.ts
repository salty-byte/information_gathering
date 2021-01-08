import { MockSheet } from './sheet';
export class MockSpreadSheet {
  private _data: Map<string, MockSheet>;

  get data(): Map<string, MockSheet> {
    return this._data;
  }

  constructor() {
    this._data = new Map();
  }

  getSheetByName(name: string): MockSheet {
    let sheet = this._data.get(name);
    if (!sheet) {
      sheet = new MockSheet(name);
      this._data.set(name, sheet);
    }
    return sheet;
  }

  clear(): void {
    this._data.clear();
  }
}
