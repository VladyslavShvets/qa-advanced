const person = {
  firstName: "Oleh",
  lastName: "Petrenko",
  age: 28,
};

person.email = "oleh.petrenko@example.com";
delete person.age;

console.log("Updated person object:", person);
