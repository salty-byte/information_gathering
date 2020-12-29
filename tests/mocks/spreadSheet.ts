export class MockSpreadSheet {
  private data: Map<string, MockSheet>;

  constructor() {
    this.data = new Map();
  }

  getSheetByName(name: string): MockSheet {
    let sheet = this.data.get(name);
    if (!sheet) {
      sheet = new MockSheet(name);
      this.data.set(name, sheet);
    }
    return sheet;
  }

  clear(): void {
    this.data.clear();
  }
}

export class MockSheet {
  private name: string;
  private data: Map<number, Map<number, MockRange>>;

  constructor(name = 'test') {
    this.name = name;
    this.data = new Map();
  }

  insertRows(row: number, line: number): void {
    const newData = new Map();
    for (let i = 1; i < row; i++) {
      if (this.data.has(i)) {
        newData.set(i, this.data.get(i));
      }
    }

    for (let i = 0; i < line; i++) {
      newData.set(row + i, new Map());
    }

    for (let i = row; i <= this.getLastRow(); i++) {
      if (this.data.has(i)) {
        newData.set(i + line, this.data.get(i));
      }
    }

    this.data = newData;
  }

  getLastRow(): number {
    return Math.max(...this.data.keys(), 0);
  }

  getRange(row: number, column: number): MockRange {
    let rowData = this.data.get(row);
    if (!rowData) {
      rowData = new Map();
      this.data.set(row, rowData);
    }

    let range = rowData.get(column);
    if (!range) {
      range = new MockRange();
      rowData.set(column, range);
    }

    return range;
  }
}

export class MockRange {
  private value: string;

  constructor() {
    this.value = '';
  }

  setValue(value: string): void {
    this.value = value;
  }

  getDisplayValue(): string {
    return this.value;
  }
}
