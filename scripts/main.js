let num1 = num2 = 0;

const numBtn = document.querySelectorAll(".num-btn");
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
        case "*":
            return multiply(num1, num2);
            break;
        default:
            break;
    }
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