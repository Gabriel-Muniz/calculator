let num1 = num2 = null;
let operator = null;

const calcBtn = document.querySelectorAll(".calc-btns button");
const numBtn = document.querySelectorAll(".num-btn");
const opBtn = document.querySelectorAll(".op-btn");
const equalBtn = document.querySelector(".equal-btn")
const eraseBtn = document.querySelector(".func-btn");
const deleteBtn = document.querySelector("#delete")
const display = document.querySelector(".selected-number");
const displayViewer = document.querySelector(".operation-viewer");
const dot = document.querySelector("#dot");
const zero = document.querySelector("#num0");
const regExp = /\.+/

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

function keyPress(e) {
    const pressedKey = document.querySelector(`.calc-btns button[data-key='${e.key}']`);
    if(!pressedKey) return;
    pressedKey.click();
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

const updateDisplay = (parameter) => {
    if (display.textContent === "0" && parameter !== ".") {
        display.textContent = "";
    }
    display.textContent += parameter;
}

const checkDots = () => {
    if (regExp.test(display.textContent)) {
        dot.disabled = true;
        dot.classList.add("disabled");
    }
    else {
        dot.disabled = false;
        dot.classList.remove("disabled")
    }
}

numBtn.forEach(btn => {
    btn.addEventListener("click", () => {
        updateDisplay(btn.textContent)
        checkDots();
    })
});

window.addEventListener("keydown", keyPress);

eraseBtn.addEventListener("click", () => {
    let displayText = display.textContent;
    display.textContent = displayText.slice(0, display.textContent.length - 1);
    if (display.textContent == "") {
        display.textContent = "0";
    }
    checkDots();
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
        checkDots();

    })
});

equalBtn.addEventListener("click", () => {
    if (num1 === null || operator === null) {
        return;
    }
    num2 = display.textContent;
    updateViewer(num1, operator, num2, "=")

    let result = (operate(operator, num1, num2));
    result = Math.round(result * 100) / 100;
    clearDisplay(display, false);
    updateDisplay(result);
    num1 = result;
    operator = null;
    checkDots();
})

deleteBtn.addEventListener("click", () => {
    clearDisplay(displayViewer, true);
    clearDisplay(display, true);
    num1 = num2 = operator = null;
    checkDots();
})