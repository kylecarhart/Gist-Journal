import Entry from "./Entry";

/**
 * Journal model for storing entries. Months are 1-12.
 */
class Journal {
  entries: Entry[];
  year: number;

  constructor(year: number, entries = [] as Entry[]) {
    this.year = year;
    this.entries = entries;
  }

  getEntry(month: number, day: number) {
    const entry = this.entries.find((entry) => {
      if (entry.month === month && entry.day === day) {
        return true;
      } else {
        return false;
      }
    });

    return entry;
  }

  setEntry(month: number, day: number, entry: Entry) {
    const fromEntry = this.getEntry(month, day);
    if (fromEntry) {
      this.entries.splice(
        this.entries.findIndex((_entry) => _entry === fromEntry),
        1,
        entry
      );
    } else {
      this.entries.push(entry);
    }
  }
}

export default Journal;
