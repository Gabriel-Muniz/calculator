console.log('Hello world!')

const add = (num1, num2) => formatOutput(num1 + num2);
const subtract = (num1, num2) => formatOutput(num1 - num2);
const multiply = (num1, num2) => formatOutput(num1 * num2);
const divide = (num1, num2) => formatOutput(num1 / num2);

const formatOutput = (num) => {
    console.log(typeof num);
    
    return Number.isInteger(num) ? num : num.toFixed(2);
}

let operationValues = {
    num1: null,
    num2: null,
    operator: null,
    isResult: false,
}
const OPERATION_SIGN = {
    'add': '\u{0002B}',
    'subtract': '\u{02212}',
    'multiply':'\u{000D7}',
    'divide': '\u{000F7}',
}
let auxCurrentNum = operationValues.num1;

const operate = (operationObj) => {

    switch (operationObj.operator) {
        case 'add':
            return add(Number(operationObj.num1), Number(operationObj.num2));
            break;
        case 'subtract':
            return subtract(Number(operationObj.num1), Number(operationObj.num2));
            break;
        case 'multiply':
            return multiply(Number(operationObj.num1), Number(operationObj.num2));
        case 'divide':
            return divide(Number(operationObj.num1), Number(operationObj.num2))
            break;
        default:
            break;
    }
}

const digitButtonsContainer = document.querySelector('.digits-container');
const operationsContainer = document.querySelector('.operations-container');
const equalBtn = document.querySelector('.equal-btn');
const eraseBtn = document.querySelector('.erase-btn');
const clearBtn = document.querySelector('.clear-btn');

clearBtn.addEventListener('click', (e) => {
    clearCalc();
})

eraseBtn.addEventListener('click', (e) => {
    if(!auxCurrentNum) return;

    if(operationValues.num2 !== null){
        operationValues.num2 = (operationValues.num2.length > 1) ? operationValues.num2.slice(0, operationValues.num2.length - 1) : 0;          
        console.log(operationValues)

        updateDisplay(operationValues.num2);
    }else{
        operationValues.num1 = (operationValues.num1.length > 1) ? operationValues.num1.slice(0, operationValues.num1.length - 1) : 0;
        updateDisplay(operationValues.num1);
    }

})

digitButtonsContainer.addEventListener('click', (e) => {
    let auxTarget = e.target;

    if (!auxTarget.value) return;

    console.log('=>',operationValues.isResult, operationValues.operator);
    
    if(operationValues.isResult && operationValues.operator === null){
        operationValues.num1 = null;
        operationValues.isResult = false;
        updateDisplay('', true)
    }
    
    if (auxTarget.value === '.') {
        console.log(auxCurrentNum);
        if (auxCurrentNum.includes('.')) return;
    }

    if (!operationValues.operator) {
        operationValues.num1 = (operationValues.num1) ? operationValues.num1 + auxTarget.value : auxTarget.value;
        updateDisplay(operationValues.num1);
        auxCurrentNum = operationValues.num1;
    } else {
        operationValues.num2 = (operationValues.num2) ? operationValues.num2 + auxTarget.value : auxTarget.value;
        updateDisplay(operationValues.num2);
        auxCurrentNum = operationValues.num2;
    }

})

operationsContainer.addEventListener('click', (e) => {
    let auxTarget = e.target;
    const isActionBtn = auxTarget.classList.contains('action-btn');

    if (!auxTarget.value || isActionBtn) return;

    if (operationValues.num1 !== null && operationValues.operator !== null) {
        equalBtn.dispatchEvent(new Event('click'));
    }

    if(operationValues.num1 === null){
        operationValues.num1 = 0;
    }
    if (operationValues.num2 === null) {
        operationValues.num2 = 0;
    }

    operationValues.operator = auxTarget.value;
    updateDisplay('0');
    updateDisplay(`${operationValues.num1} ${auxTarget.textContent}`, true);
})

equalBtn.addEventListener('click', (e) => {
    if (operationValues.operator === null || operationValues.num2 === null)  return;

    if (operationValues.operator === 'divide' && operationValues.num2 == 0) {
        updateDisplay(`Nuh-uh! You can't divide by 0!`)

        setTimeout(() => {
            clearCalc();
        }, 1500)
        return;
    };

    let operationResult = operate(operationValues);
    operationValues.isResult = true;

    updateDisplay(`${operationValues.num1} ${OPERATION_SIGN[operationValues.operator]} ${operationValues.num2} =`, true);
    updateDisplay(operationResult)

    console.log(`${operationValues.num1} ${operationValues.operator} ${operationValues.num2} = ${operationResult}`)

    operationValues.num1 = operationResult;
    operationValues.operator = null;
    operationValues.num2 = null;
    auxCurrentNum = String(operationValues.num1);
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
    for (const key in operationValues) {        
        operationValues[key] = null;
    }
    updateDisplay('0', false, true);
}

window.addEventListener('keydown', (e) => {
    const DIGIT_REGEXP = /[0-9.,]/;
    const VALID_OPERATORS = ['-', '+', '*', '/']
    
    if(DIGIT_REGEXP.test(e.key)) {
        const digitPressed = document.querySelector(`.digit-btn[value='${(e.key !== ',') ? e.key : '.'}']`);
        digitPressed.click();        
    }
    if(e.key === 'Enter' || e.key === '='){
        equalBtn.dispatchEvent(new Event('click'));
        return;
    }
    if(e.key === 'Delete'){
        clearBtn.dispatchEvent(new Event('click'));
        return;
    }
    if(e.key === 'Backspace'){
        eraseBtn.dispatchEvent(new Event('click'))
        return;
    }
    if(VALID_OPERATORS.find((keyValue) => e.key === keyValue)){
        console.log(e.key);
        
        let auxSelector;
        switch (e.key) {
            case '+':
                auxSelector = 'add';
                break;
            case '-':
                auxSelector = 'subtract';
                break;
            case '*':
                auxSelector = 'multiply';
                break;
            default:
                auxSelector ='divide'
                break;
        }
        let operationPressed = document.querySelector(`.operation-btn[value='${auxSelector}']`)
        operationPressed.click();
    }
})