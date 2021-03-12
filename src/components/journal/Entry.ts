export default class Entry {
  public month: number;
  public day: number;
  public text: string;
  // public created: Date;
  // public lastUpdated: Date;

  constructor(
    month: number,
    day: number,
    text: string
    // createdDate = new Date(),
    // updatedDate = new Date()
  ) {
    this.month = month;
    this.day = day;
    this.text = text;
    // this.created = createdDate;
    // this.lastUpdated = updatedDate;
  }
}
