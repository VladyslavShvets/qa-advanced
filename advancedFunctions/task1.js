function handleNum(number, handleEven, handleOdd) {
  if (number % 2 === 0) {
    handleEven(number);
    return;
  }

  handleOdd(number);
}

function handleEven(number) {
  console.log(`number is even: ${number}`);
}

function handleOdd(number) {
  console.log(`number is odd: ${number}`);
}

handleNum(8, handleEven, handleOdd);
handleNum(7, handleEven, handleOdd);
