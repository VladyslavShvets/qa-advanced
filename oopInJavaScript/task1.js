const Book = require("./Book");
const EBook = require("./EBook");

const firstBook = new Book("Clean Code", "Robert C. Martin", 2008);
const secondBook = new Book("Refactoring", "Martin Fowler", 1999);
const thirdBook = new Book("Design Patterns", "Erich Gamma", 1994);

console.log("Books:");
firstBook.printInfo();
secondBook.printInfo();
thirdBook.printInfo();

const digitalBook = new EBook(
  "JavaScript: The Good Parts",
  "Douglas Crockford",
  2008,
  "pdf"
);

console.log("\nEBook:");
digitalBook.printInfo();

firstBook.title = "Clean Code Handbook";
firstBook.author = "Uncle Bob";
firstBook.year = 2009;
digitalBook.fileFormat = "epub";

console.log("\nUpdated values through getters:");
console.log(`Title: ${firstBook.title}`);
console.log(`Author: ${firstBook.author}`);
console.log(`Year: ${firstBook.year}`);
console.log(`Format: ${digitalBook.fileFormat}`);

const library = [firstBook, secondBook, thirdBook, digitalBook];
const oldestBook = Book.findOldestBook(library);

console.log("\nOldest book:");
oldestBook.printInfo();

const convertedBook = EBook.createFromBook(secondBook, "mobi");

console.log("\nEBook created from Book:");
convertedBook.printInfo();
