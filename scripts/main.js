let num1 = num2 = null;
let operator = null;

const numBtn = document.querySelectorAll(".num-btn");
const opBtn = document.querySelectorAll(".op-btn");
const equalBtn = document.querySelector(".equal-btn")
const eraseBtn = document.querySelector(".func-btn");
const display = document.querySelector(".calc-display");

const add = (num1 ,num2) => num1 + num2;
const subtract = (num1, num2) => num1 - num2;
const multiply = (num1, num2) => num1 * num2;
const divide = (num1, num2) => num1/num2;


const operate = (operator, num1, num2) => {
    switch (operator) {
        case "+":
            return add(num1, num2);
            break;
        case "-":
            return subtract(num1, num2);
            break;
        case "/":
            return divide(num1, num2);
            break;
        case "x":
            return multiply(num1, num2);
            break;
        default:
            break;
    }
}

const clearDisplay = () => {
    display.textContent = "0";
}

numBtn.forEach(btn => {
    btn.addEventListener("click", () => {
        if (display.textContent === "0") {
            display.textContent = "";
        }
        display.textContent += btn.textContent;
    })
});

eraseBtn.addEventListener("click", () => {
    let displayText = display.textContent;
    display.textContent = displayText.slice(0, displayText.length-1);
    if (display.textContent == "") {
        display.textContent = "0";
    }
})

opBtn.forEach(btn => {
    btn.addEventListener("click", () => {
        num1 = +display.textContent;
        operator = btn.textContent;
        clearDisplay();
    })
});

equalBtn.addEventListener("click", () => {
    if (num1 === null || operator === null) {
        return;
    }
    console.log(operate(operator, num1, +display.textContent));
    display.textContent = (operate(operator, num1, +display.textContent));
    num1 = display.textContent;
    operator = null;    
})