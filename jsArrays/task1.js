const numbers = [2, -5, 0, 7, -3, 0, 10, -8];

let positiveCount = 0;
let negativeCount = 0;
let zeroCount = 0;

for (let i = 0; i < numbers.length; i += 1) {
  if (numbers[i] > 0) {
    positiveCount += 1;
  } else if (numbers[i] < 0) {
    negativeCount += 1;
  } else {
    zeroCount += 1;
  }
}

console.log("Кількість позитивних чисел:", positiveCount);
console.log("Кількість негативних чисел:", negativeCount);
console.log("Кількість нульових чисел:", zeroCount);
