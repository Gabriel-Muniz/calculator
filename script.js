const addCalc = (n1, n2) => n1 + n2;
const subtractCalc = (n1, n2) => n1 - n2;
const multiplyCalc = (n1, n2) => n1 * n2;
const divideCalc = (n1, n2) => n1 / n2;

const number1 = 1;
const number2 = 2;

function operate(operator, n1, n2) {
  switch (operator) {
    case "add":
      console.log(addCalc(n1, n2));
      break;
    case "subtract":
      console.log(subtractCalc(n1, n2));
      break;
    case "multiply":
      console.log(multiplyCalc(n1, n2));
      break;
    case "divide":
      console.log(divideCalc(n1, n2));
      break;

    default:
      break;
  }
}
