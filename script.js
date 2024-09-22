const addCalc = (n1, n2) => n1 + n2;
const subtractCalc = (n1, n2) => n1 - n2;
const multiplyCalc = (n1, n2) => n1 * n2;
const divideCalc = (n1, n2) => n1 / n2;

let number1 = null;
let number2 = null;
let operation = "";

function operate(operator, n1, n2) {
  switch (operator) {
    case "add":
      console.log(operator);

      return addCalc(n1, n2);

    case "subtract":
      console.log(operator);

      return subtractCalc(n1, n2);

    case "multiply":
      console.log(operator);

      return multiplyCalc(n1, n2);

    case "divide":
      console.log(operator);

      return divideCalc(n1, n2);

    default:
      break;
  }
}

const getOperation = function (operation) {
  let operationSymbol = "";
  switch (operation) {
    case "add":
      operationSymbol = "+";
      break;
    case "subtract":
      operationSymbol = "-";
      break;
    case "multiply":
      operationSymbol = "x";
      break;
    case "divide":
      operationSymbol = "/";
      break;
    default:
      break;
  }

  return operationSymbol;
};

const displayText = document.querySelector(".calculator-display");
const numBtns = document.querySelectorAll(".num-btn");
const operationBtns = document.querySelectorAll(".operation");
const clearBtn = document.querySelector(".function-btn[value='clear']");
const ereaseBtn = document.querySelector(".function-btn[value='erase']");
const equalBtn = document.querySelector(".equal");

const populateDisplay = function (string, concatString = true) {
  if (concatString == true) {
    displayText.textContent += string;
    return;
  }
  displayText.textContent = string;
};

const eraseDisplay = function () {
  let displayValue = displayText.textContent;
  let newDisplayValue = displayValue.slice(0, displayValue.length - 1);

  if (newDisplayValue == "") {
    return 0;
  }
  return newDisplayValue;
};

const getDisplayValue = function () {
  let displayValue = displayText.textContent;
  if (
    displayValue == "+" ||
    displayValue == "-" ||
    displayValue == "x" ||
    displayValue == "/"
  ) {
    return displayValue;
  }
  return Number(displayValue);
};

operationBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (number1 == null) number1 = getDisplayValue();
    operation = btn.value;

    populateDisplay(getOperation(operation), false);
  });
});

numBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (typeof getDisplayValue() != "number") {
      populateDisplay(btn.value, false);
      return;
    }
    populateDisplay(btn.value);
  });
});

//Adicionar EventListener nos botões de exclusão e de igual

const resetCalc = function () {
  number1 = number2 = null;
  operation = "";
  populateDisplay(0, false);
};

clearBtn.addEventListener("click", () => {
  resetCalc();
});

ereaseBtn.addEventListener("click", () => {
  if (number1 !== null && number2 !== null) {
    resetCalc()
  }
  populateDisplay(eraseDisplay(), false);
  number1 = getDisplayValue();
});

equalBtn.addEventListener("click", () => {
  number2 = getDisplayValue();
  populateDisplay(operate(operation, number1, number2), false);
  number1 = getDisplayValue();
});

//Adicionar variáveis para a realização das operações

//Limpar display após seleção de operação e seleção de número
