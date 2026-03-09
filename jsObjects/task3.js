const car1 = {
  brand: "Toyota",
  model: "Corolla",
  year: 2020,
};

const car2 = {
  brand: "Honda",
  model: "Civic",
  owner: 2018,
};

const car3 = {
  ...car1,
  ...car2,
};

console.log("Car 3 object:", car3);
