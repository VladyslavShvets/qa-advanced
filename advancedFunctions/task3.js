function divide(numerator, denominator) {
  if (
    typeof numerator !== "number" ||
    typeof denominator !== "number" ||
    Number.isNaN(numerator) ||
    Number.isNaN(denominator)
  ) {
    throw new TypeError("Both arguments must be valid numbers.");
  }

  if (denominator === 0) {
    throw new Error("Cannot divide by zero.");
  }

  return numerator / denominator;
}

try {
  console.log("10 / 2 =", divide(10, 2));
} catch (error) {
  console.log("Error:", error.message);
} finally {
  console.log("Робота завершена");
}

try {
  console.log("10 / 0 =", divide(10, 0));
} catch (error) {
  console.log("Error:", error.message);
} finally {
  console.log("Робота завершена");
}

try {
  console.log("'10' / 2 =", divide("10", 2));
} catch (error) {
  console.log("Error:", error.message);
} finally {
  console.log("Робота завершена");
}
