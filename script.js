const addCalc = (n1, n2) => n1 + n2;
const subtractCalc = (n1, n2) => n1 - n2;
const multiplyCalc = (n1, n2) => n1 * n2;
const divideCalc = (n1, n2) => n1 / n2;

let number1 = null;
let number2 = null;

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

const getOperation = function (operation) {
  let operationSymbol = '';
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

const populateDisplay = function(string, concatString = true) {
  if(concatString == true){
    displayText.textContent += string;
    return;
  } 
  displayText.textContent = string;
}

const eraseDisplay = function() {
  
  let displayValue = displayText.textContent;
  let newDisplayValue = displayValue.slice(0, displayValue.length-1);
  
  if (newDisplayValue == '') {
    return 0;
  }
  return newDisplayValue;
}

const getDisplayValue = function() {
  return Number(displayText.textContent);
}

operationBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    populateDisplay(getOperation(btn.value), false);
  });
});

numBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    populateDisplay(btn.value);
  });
});

//Adicionar EventListener nos botões de exclusão e de igual
clearBtn.addEventListener('click', () => {
  populateDisplay(0, false)
})

ereaseBtn.addEventListener('click', () => {
  populateDisplay(eraseDisplay(), false);
})


//Adicionar variáveis para a realização das operações

//Limpar display após seleção de operação e seleção de número

