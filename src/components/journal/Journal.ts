/**
 * Journal model for storing entries. Month are 0-11.
 */
class Journal {
  private data: string[][];

  constructor() {
    this.data = new Array(12).fill([]);
  }

  /**
   * Return the entry for the month and day. If there is no entry,
   * return undefined.
   * @param month - number 0-11 (jan- dec)
   * @param day - number for the day
   */
  getEntry(month: number, day: number): string | null {
    const entry = this.data[month][day];
    return entry ? entry : null;
  }

  setEntry(month: number, day: number, text: string) {
    this.data[month][day] = text;
  }

  hasEntry(month: number, day: number) {
    return this.data[month][day] ? true : false;
  }
}

export default Journal;
