let num1 = num2 = null;
let operator = null;

const numBtn = document.querySelectorAll(".num-btn");
const opBtn = document.querySelectorAll(".op-btn");
const equalBtn = document.querySelector(".equal-btn")
const eraseBtn = document.querySelector(".func-btn");
const deleteBtn = document.querySelector("#delete")
const display = document.querySelector(".selected-number");
const displayViewer = document.querySelector(".operation-viewer");
const dot = document.querySelector(".dot");

const add = (num1, num2) => num1 + num2;
const subtract = (num1, num2) => num1 - num2;
const multiply = (num1, num2) => num1 * num2;
const divide = (num1, num2) => num1 / num2;


const operate = (operator, num1, num2) => {
    switch (operator) {
        case "+":
            return add(+num1, +num2);
            break;
        case "-":
            return subtract(+num1, +num2);
            break;
        case "/":
            return divide(+num1, +num2);
            break;
        case "x":
            return multiply(+num1, +num2);
            break;
        default:
            break;
    }
}
const updateViewer = (...parameters) => {
    clearDisplay(displayViewer, false);

    parameters.forEach(item => {
        displayViewer.textContent += " " + item;
    });

}
const clearDisplay = (displayToClear, makeItZero) => {
    if (makeItZero) {
        displayToClear.textContent = "0";
        return;
    }
    displayToClear.textContent = "";
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
    display.textContent = displayText.slice(0, displayText.length - 1);
    if (display.textContent == "") {
        display.textContent = "0";
    }
})

opBtn.forEach(btn => {
    btn.addEventListener("click", () => {
        if (operator !== null) {
            equalBtn.click();
        }
        num1 = +display.textContent;
        operator = btn.textContent;
        updateViewer(num1, operator)
        clearDisplay(display, true);
    })
});

equalBtn.addEventListener("click", () => {
    if (num1 === null || operator === null) {
        return;
    }
    num2 = display.textContent;
    updateViewer(num1, operator, num2, "=")

    let result = (operate(operator, num1, num2));
    display.textContent = result;
    num1 = result;
    operator = null;
})

deleteBtn.addEventListener("click", () => {
    clearDisplay(displayViewer, true);
    clearDisplay(display, true);
    num1 = num2 = operator = null;
})