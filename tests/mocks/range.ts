export class MockRange {
  private _value: string;

  get value(): string {
    return this._value;
  }

  constructor() {
    this._value = '';
  }

  setValue(value: string): void {
    this._value = value;
  }

  getDisplayValue(): string {
    return this._value;
  }
}
