import { MockRange } from './range';
import { MockTextFinder } from './textFinder';

export class MockSheet {
  private _name: string;
  private _data: Map<number, Map<number, MockRange>>;

  get name(): string {
    return this._name;
  }

  get data(): Map<number, Map<number, MockRange>> {
    return this._data;
  }

  constructor(name = 'test') {
    this._name = name;
    this._data = new Map();
  }

  insertRows(row: number, line: number): void {
    const newData = new Map();
    for (let i = 1; i < row; i++) {
      if (this._data.has(i)) {
        newData.set(i, this._data.get(i));
      }
    }

    for (let i = 0; i < line; i++) {
      newData.set(row + i, new Map());
    }

    for (let i = row; i <= this.getLastRow(); i++) {
      if (this._data.has(i)) {
        newData.set(i + line, this._data.get(i));
      }
    }

    this._data = newData;
  }

  getLastRow(): number {
    return Math.max(...this._data.keys(), 0);
  }

  getRange(row: number, column: number): MockRange {
    let rowData = this._data.get(row);
    if (!rowData) {
      rowData = new Map();
      this._data.set(row, rowData);
    }

    let range = rowData.get(column);
    if (!range) {
      range = new MockRange(row, column);
      rowData.set(column, range);
    }

    return range;
  }

  createTextFinder(findText: string): MockTextFinder {
    return new MockTextFinder(this, findText);
  }
}
