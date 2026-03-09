const users = [
  { name: "Anna", email: "anna@example.com", age: 21 },
  { name: "Max", email: "max@example.com", age: 25 },
  { name: "Ira", email: "ira@example.com", age: 19 },
];

for (const { name, email, age } of users) {
  console.log(`Name: ${name}, Email: ${email}, Age: ${age}`);
}
