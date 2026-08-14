console.log('Hello world!')

const add = (num1, num2) => num1 + num2;
const subtract = (num1, num2) => num1 - num2;
const multiply = (num1, num2) => num1 * num2;
const divide = (num1, num2) => num1 / num2;

let operationNumber1 = null;
let operationNumber2 = null;
let operator = null;

const operate = (operationNumber1, operationNumber2, operator) => {

    switch (operator) {
        case 'add':
            return add(operationNumber1, operationNumber2);
            break;
        case 'subtract':
            return subtract(operationNumber1, operationNumber2);
            break;
        case 'multiply':
            return multiply(operationNumber1, operationNumber2);
        case 'divide':
            return divide(operationNumber1, operationNumber2)
            break;
        default:
            break;
    }
}

const calculatorButtons = document.querySelector('.calculator-buttons-container')

calculatorButtons.addEventListener('click', (e) => {
    let auxTarget = e.target;

    if (!auxTarget.value) return;

    if (auxTarget.classList.contains('action-btn')) {
        clearCalc();
        updateDisplay('0');
        return;
    }

    if (auxTarget.value === 'equal') {
        let operationResult = operate(Number(operationNumber1), Number(operationNumber2), operator);

        updateDisplay(`${operationNumber1} ${operator} ${operationNumber2} =`, true);
        updateDisplay(operationResult)

        operationNumber1 = operationResult;
        operator = null;
        operationNumber2 = null;
        return;
    };

    if (auxTarget.classList.contains('operation-btn') && !auxTarget.classList.contains('equal-btn')) {

        operator = auxTarget.value;
        updateDisplay('0');
        updateDisplay(`${operationNumber1} ${auxTarget.textContent}`, true);
        return;
    }

    if (operator === null) {
        operationNumber1 = (operationNumber1) ? operationNumber1 + auxTarget.value : auxTarget.value;
        updateDisplay(operationNumber1);
    } else {
        operationNumber2 = (operationNumber2) ? operationNumber2 + auxTarget.value : auxTarget.value;
        updateDisplay(operationNumber2);
    }
})

const updateDisplay = (string, isSecondary = false, resetDisplay = false) => {
    const outDisplay = document.querySelector('.main-display');
    const outSecondaryDisplay = document.querySelector('.secondary-display');


    if (resetDisplay) {
        outSecondaryDisplay.textContent = '';
    }

    if (isSecondary) {
        outSecondaryDisplay.textContent = string;
        return;
    }

    outDisplay.textContent = string;
}

const clearCalc = () => {
    operationNumber1 = null;
    operationNumber2 = null;
    operator = null;

    updateDisplay('0', false, true);
}