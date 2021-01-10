import { MockRange } from './range';
import { MockSheet } from './sheet';

export class MockTextFinder {
  private findText: string;
  private target: MockSheet;
  private currentInfo: {
    row: number;
    column: number;
    range: MockRange | null;
  };

  constructor(target: MockSheet, findText: string) {
    this.target = target;
    this.findText = findText;
    this.currentInfo = {
      row: 0,
      column: 0,
      range: null,
    };
  }

  private setCurrentInfo(
    row: number,
    column: number,
    range: MockRange | null
  ): void {
    this.currentInfo.row = row;
    this.currentInfo.column = column;
    this.currentInfo.range = range;
  }

  findNext(): MockRange | null {
    for (const [row, ranges] of this.target.data) {
      if (row < this.currentInfo.row) {
        continue;
      }

      for (const [column, range] of ranges) {
        if (row === this.currentInfo.row && column <= this.currentInfo.column) {
          continue;
        }

        if (range.value.includes(this.findText)) {
          this.setCurrentInfo(row, column, range);
          return range;
        }
      }
    }

    this.setCurrentInfo(0, 0, null);
    return null;
  }

  getCurrentMatch(): MockRange | null {
    return this.currentInfo.range;
  }
}
