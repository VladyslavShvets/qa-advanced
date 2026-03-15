const Book = require("./Book");

class EBook extends Book {
  constructor(title, author, year, fileFormat) {
    super(title, author, year);
    this.fileFormat = fileFormat;
  }

  get fileFormat() {
    return this._fileFormat;
  }

  set fileFormat(value) {
    Book.validateText(value, "File format");
    this._fileFormat = value.trim().toUpperCase();
  }

  printInfo() {
    console.log(
      `Title: ${this.title}, Author: ${this.author}, Year: ${this.year}, Format: ${this.fileFormat}`
    );
  }

  static createFromBook(book, fileFormat) {
    if (!(book instanceof Book)) {
      throw new TypeError("book must be an instance of Book");
    }

    return new EBook(book.title, book.author, book.year, fileFormat);
  }
}

module.exports = EBook;
