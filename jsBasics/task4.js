const pi = Math.PI;

// Завдання 4.1: площа кола
const circleRadius = 5;
const circleArea = pi * circleRadius ** 2;

// Завдання 4.2: площа прямокутника
const length = 10;
const width = 4;
const rectangleArea = length * width;

// Завдання 4.3: об'єм циліндра
const cylinderRadius = 3;
const cylinderHeight = 8;
const cylinderVolume = pi * cylinderRadius ** 2 * cylinderHeight;

console.log("Площа кола:", circleArea.toFixed(2));
console.log("Площа прямокутника:", rectangleArea.toFixed(2));
console.log("Об'єм циліндра:", cylinderVolume.toFixed(2));
