export default class Entry {
  month: number;
  day: number;
  text: string;

  constructor(month: number, day: number, text = "") {
    this.month = month;
    this.day = day;
    this.text = text;
  }
}
