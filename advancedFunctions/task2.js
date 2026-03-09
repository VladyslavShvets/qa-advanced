function countdown(num) {
  console.log(num);

  if (num <= 0) {
    return;
  }

  countdown(num - 1);
}

countdown(5);
