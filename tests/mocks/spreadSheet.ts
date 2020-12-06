export class MockSpreadSheet {
  getSheetByName(name: string): MockSheet {
    return new MockSheet(name);
  }
}

export class MockSheet {
  private name: string;
  private data: Map<number, Map<number, MockRange>>;

  constructor(name = 'test') {
    this.name = name;
    this.data = new Map();
  }

  insertRows(): void {
    this.data.set(0, new Map());
  }

  getLastRow(): number {
    return Math.max(...this.data.keys()) + 1;
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
