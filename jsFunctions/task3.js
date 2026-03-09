function checkOrder(available, ordered) {
  if (available < ordered) {
    return "Your order is too large, we don't have enough goods.";
  }

  if (ordered === 0) {
    return "Your order is empty";
  }

  return "Your order is accepted";
}

console.log("available=10, ordered=12 ->", checkOrder(10, 12));
console.log("available=10, ordered=0 ->", checkOrder(10, 0));
console.log("available=10, ordered=8 ->", checkOrder(10, 8));
