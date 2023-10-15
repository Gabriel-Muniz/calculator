let num1 = num2 = null;
let operator = null;

const calcBtn = document.querySelectorAll(".calc-btns button");
const numBtn = document.querySelectorAll(".num-btn");
const opBtn = document.querySelectorAll(".op-btn");
const equalBtn = document.querySelector(".equal-btn")
const eraseBtn = document.querySelector(".func-btn");
const deleteBtn = document.querySelector("#delete")
const display = document.querySelector(".calc-display");
const displaySelected = document.querySelector(".selected-number");
const fontDisplay = getComputedStyle(displaySelected);
const displayViewer = document.querySelector(".operation-viewer");
const displayGhost = document.querySelector(".selected-ghost")
const dot = document.querySelector("#dot");
const zero = document.querySelector("#num0");
const dotRegExp = /\.+/     //Check if the display already have a dot
const zeroRegExp = /^0$/    //Check if the display number is 0
const fontRegExp = /(\d+)+\.?(\d+)?/
const fontComputed = fontDisplay.getPropertyValue("font-size").match(fontRegExp);
let selectedWidth = displaySelected.offsetWidth;
let currentFontSize = +fontComputed[0];


const add = (num1, num2) => num1 + num2;
const subtract = (num1, num2) => num1 - num2;
const multiply = (num1, num2) => num1 * num2;
const divide = (num1, num2) => num1 / num2;


const operate = (operator, num1, num2) => {
    switch (operator) {
        case "+":
            return add(+num1, +num2);
        case "-":
            return subtract(+num1, +num2);
        case "/":
            return divide(+num1, +num2);
        case "x":
            return multiply(+num1, +num2);
        default:
            break;
    }
}

const keyPress = (e) => {
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

const checkWidth = () => {
    selectedWidth = displaySelected.offsetWidth
    if (selectedWidth > display.offsetWidth) {
        while (selectedWidth > display.offsetWidth) {
            currentFontSize -= 0.1;

            displaySelected.style.fontSize = `${currentFontSize}px`;
            selectedWidth = displaySelected.offsetWidth;
        }

    }
    else{
        do {
            currentFontSize += 0.1
            displaySelected.style.fontSize = `${currentFontSize}px`;
            selectedWidth = displaySelected.offsetWidth;
        } while (selectedWidth < display.offsetWidth && displaySelected.style.fontSize < fontComputed[0]);
    }
}

const perAction = () => {
    console.log(+fontComputed[0]);
    console.log(currentFontSize);
    console.log(displaySelected.offsetWidth)
    checkDots();
    ghostHandler();
    checkWidth();
}

const ghostHandler = () => {
    displayGhost.textContent = displaySelected.textContent;
}

const clearDisplay = (displayToClear, makeItZero) => {
    if (makeItZero) {
        displayToClear.textContent = "0";
        return;
    }
    displayToClear.textContent = "";
}

const updateDisplay = (parameter) => {
    if (displaySelected.textContent === "0" && parameter !== ".") {
        displaySelected.textContent = "";
    }
    displaySelected.textContent += parameter;
}

const checkDots = () => {
    if (dotRegExp.test(displaySelected.textContent)) {
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
        perAction();
    })
});

window.addEventListener("keydown", keyPress);

eraseBtn.addEventListener("click", () => {
    let displayText = displaySelected.textContent;
    displaySelected.textContent = displayText.slice(0, displaySelected.textContent.length - 1);
    if (displaySelected.textContent == "") {
        displaySelected.textContent = "0";
    }
    perAction();
})

opBtn.forEach(btn => {
    btn.addEventListener("click", () => {
        if (operator !== null) {
            equalBtn.click();
        }
        num1 = +displaySelected.textContent;
        operator = btn.textContent;
        updateViewer(num1, operator)
        clearDisplay(displaySelected, true);
        perAction();

    })
});

equalBtn.addEventListener("click", () => {
    if (num1 === null || operator === null) {
        return;
    }
    if (operator == "/" && displaySelected.textContent == "0") {
        alert("You can't divide by zero");
        clearDisplay(displayViewer, true);
        displaySelected.textContent = num1;
        operator = null;
        return;
    }
    num2 = displaySelected.textContent;
    updateViewer(num1, operator, num2, "=")

    let result = (operate(operator, num1, num2));
    result = Math.round(result * 100) / 100;
    clearDisplay(displaySelected, false);
    updateDisplay(result);
    num1 = result;
    operator = null;
    perAction();
})

deleteBtn.addEventListener("click", () => {
    clearDisplay(displayViewer, true);
    clearDisplay(displaySelected, true);
    num1 = num2 = operator = null;
    perAction();
})