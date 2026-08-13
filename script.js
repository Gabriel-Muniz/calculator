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