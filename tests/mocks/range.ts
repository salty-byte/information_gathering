export class MockRange {
  private _value: string;
  private _column: number;
  private _row: number;

  get value(): string {
    return this._value;
  }

  constructor(row: number, column: number) {
    this._value = '';
    this._column = column;
    this._row = row;
  }

  setValue(value: string): void {
    this._value = value;
  }

  getColumn(): number {
    return this._column;
  }

  getDisplayValue(): string {
    return this._value;
  }

  getRow(): number {
    return this._row;
  }
}
