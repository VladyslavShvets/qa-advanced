// Function declaration
function getRectangleAreaDeclaration(width, height) {
  return width * height;
}

// Function expression
const getRectangleAreaExpression = function (width, height) {
  return width * height;
};

// Arrow function
const getRectangleAreaArrow = (width, height) => width * height;

console.log("Declaration area (5, 10):", getRectangleAreaDeclaration(5, 10));
console.log("Expression area (5, 10):", getRectangleAreaExpression(5, 10));
console.log("Arrow area (5, 10):", getRectangleAreaArrow(5, 10));
