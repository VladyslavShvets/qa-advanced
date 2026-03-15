class Book {
  constructor(title, author, year) {
    this.title = title;
    this.author = author;
    this.year = year;
  }

  get title() {
    return this._title;
  }

  set title(value) {
    Book.validateText(value, "Title");
    this._title = value.trim();
  }

  get author() {
    return this._author;
  }

  set author(value) {
    Book.validateText(value, "Author");
    this._author = value.trim();
  }

  get year() {
    return this._year;
  }

  set year(value) {
    Book.validateYear(value);
    this._year = value;
  }

  printInfo() {
    console.log(
      `Title: ${this.title}, Author: ${this.author}, Year: ${this.year}`
    );
  }

  static validateText(value, fieldName) {
    if (typeof value !== "string" || value.trim() === "") {
      throw new TypeError(`${fieldName} must be a non-empty string`);
    }
  }

  static validateYear(value) {
    const currentYear = new Date().getFullYear();

    if (!Number.isInteger(value) || value <= 0 || value > currentYear) {
      throw new TypeError(
        `Year must be an integer between 1 and ${currentYear}`
      );
    }
  }

  static findOldestBook(books) {
    if (!Array.isArray(books) || books.length === 0) {
      throw new TypeError("Books must be provided as a non-empty array");
    }

    books.forEach((book) => {
      if (!(book instanceof Book)) {
        throw new TypeError("Each item must be an instance of Book or EBook");
      }
    });

    return books.reduce((oldestBook, currentBook) => {
      return currentBook.year < oldestBook.year ? currentBook : oldestBook;
    });
  }
}

module.exports = Book;
