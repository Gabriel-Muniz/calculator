const addCalc = (n1, n2) => {
  let result = n1 + n2;

  return formatReturn(result);
};
const subtractCalc = (n1, n2) => {
  let result = n1 - n2;

  return formatReturn(result);
};
const multiplyCalc = (n1, n2) => {
  let result = n1 * n2;

  return formatReturn(result);
};
const divideCalc = (n1, n2) => {
  let result = n1 / n2;

  return formatReturn(result);
};

let number1 = null;
let number2 = null;
let operation = "";

const displayText = document.querySelector(".display-bottom");
const displayHistory = document.querySelector(".display-top");
const numBtns = document.querySelectorAll(".num-btn");
const operationBtns = document.querySelectorAll(".operation");
const clearBtn = document.querySelector(".function-btn[value='clear']");
const ereaseBtn = document.querySelector(".function-btn[value='erase']");
const equalBtn = document.querySelector(".equal");
const dotBtn = document.querySelector(".decimal");

function formatReturn(result) {
  return Number.isInteger(result) ? result : result.toFixed(2);
}

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

const handleOperations = function(mathOperation, isSymbol = false) {
  if (isSymbol) {
    mathOperation = (mathOperation == '/') ? 'divide' : (mathOperation == '*') ? 'multiply' : (mathOperation == '+') ? 'add' : 'subtract';
    console.log(`Handle: ${mathOperation}`);
    
  }
  if (operation != "") equalBtn.click();
  if (number1 == null) number1 = getDisplayValue();
  operation = mathOperation;

  populateHistory(number1);
  populateDisplay(getOperation(operation), false);
}

const handleNumbers = function(numInput){
  if (typeof getDisplayValue() != "number") {
    populateHistory(`${number1} ${getOperation(operation)}`);
    populateDisplay(numInput, false);
    return true;
  }
}

const populateHistory = function (string) {
  displayHistory.textContent = string;
};

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
    handleOperations(btn.value);
  });
});

numBtns.forEach((btn) => {
  btn.addEventListener("click", () => {

    populateDisplay(btn.value);
  });
});

//Adicionar EventListener nos botões de exclusão e de igual

const resetCalc = function () {
  number1 = number2 = null;
  operation = "";
  populateHistory("");
  populateDisplay(0, false);
};

clearBtn.addEventListener("click", () => {
  resetCalc();
});

ereaseBtn.addEventListener("click", () => {
  if (number1 !== null && number2 !== null) {
    resetCalc();
  }
  populateDisplay(eraseDisplay(), false);
  number1 = getDisplayValue();
});

equalBtn.addEventListener("click", () => {
  console.log(`${operation} ${number2}`);
  number2 = getDisplayValue();

  if (operation == "divide" && number2 == 0) {
    resetCalc();
    populateDisplay("DUMBASS", false);
    setTimeout(() => {
      resetCalc();
    }, 1000);
    return;
  }

  if (operation == "") return;

  populateHistory(`${number1} ${getOperation(operation)} ${number2} =`);
  populateDisplay(operate(operation, number1, number2), false);
  number1 = getDisplayValue();
  operation = "";
});

dotBtn.addEventListener("click", () => {
  let displayValue = displayText.textContent;
  let hasDot = /\./;
  if (hasDot.exec(displayValue)) return;
  populateDisplay(".");
});

//Adicionar variáveis para a realização das operações

//Limpar display após seleção de operação e seleção de número

window.addEventListener("keydown", (event) => {
  const keyName = event.key;
  console.log(keyName);

  if (Number(keyName) >= 0 && Number(keyName) <= 9) {
    if (handleNumbers(keyName)) {
      return;
    }
    populateDisplay(keyName);
  }

  if (keyName == "Backspace") ereaseBtn.click();

  if (keyName == "Enter") equalBtn.click();
  if (keyName == "Delete") clearBtn.click();
  if (keyName == "." || keyName == ",") dotBtn.click();

  if (keyName == '*' ||
      keyName == '-' ||
      keyName == '/' ||
      keyName == '+'
  ){
    handleOperations(keyName, true)
  }
});
