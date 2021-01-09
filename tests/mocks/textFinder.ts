import { MockRange } from './range';
import { MockSheet } from './sheet';

export class MockTextFinder {
  private findText: string;
  private target: MockSheet;

  constructor(target: MockSheet, findText: string) {
    this.target = target;
    this.findText = findText;
  }

  getCurrentMatch(): MockRange | null {
    for (const [, ranges] of this.target.data) {
      for (const [, range] of ranges) {
        if (range.value.includes(this.findText)) {
          return range;
        }
      }
    }
    return null;
  }
}
