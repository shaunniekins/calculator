let firstOperand = '';
let secondOperand = '';
let shouldResetScreen = false;
let currentOperation = null;

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equal]');
const clearButton = document.querySelector('[data-clear]');
const allClearButton = document.querySelector('[data-all-clear]');
const pointButton = document.querySelector('#pointBtn');
const previousDataText = document.querySelector('[data-previous]');
const currentDataText = document.querySelector('[data-current]');

window.addEventListener('keydown', keyboardInput);
equalsButton.addEventListener('click', evaluate);
clearButton.addEventListener('click', clear);
allClearButton.addEventListener('click', allClear);
pointButton.addEventListener('click', appendDec);


// when user clicks for numbers
numberButtons.forEach((numberButton) =>
    numberButton.addEventListener('click', () => appendNumber(numberButton.innerText))
);

operationButtons.forEach((operationButton) =>
    operationButton.addEventListener('click', () => setOperation(operationButton.innerText))
);

function appendNumber(number) {
    if (currentDataText.innerText === '0' || shouldResetScreen) {
        resetScreen();
    }
    currentDataText.innerText += number;
}

function resetScreen() {
    currentDataText.innerText = '';
    shouldResetScreen = false;
}

function setOperation(operator) {
    if (currentOperation !== null) {
        evaluate();
    }
    firstOperand = currentDataText.innerText;
    currentOperation = operator;
    previousDataText.innerText = `${firstOperand} ${currentOperation}`;
    shouldResetScreen = true;
}

function evaluate() {
    if (currentOperation === null || shouldResetScreen) return;
    if (currentOperation === '÷' && currentDataText.innerText === '0') {
        alert("You can't divide by 0!");
        return;
    }
    secondOperand = currentDataText.innerText;
    currentDataText.innerText = roundResult(
        operate(currentOperation, firstOperand, secondOperand)
    )
    previousDataText.innerText = `${firstOperand} ${currentOperation} ${secondOperand} = `;
    currentOperation = null;
}

function roundResult(number) {
    return Math.round(number * 1000) / 1000;
}

function clear() {
    if (currentDataText.innerText !== '0') {
        currentDataText.innerText = currentDataText.innerText.toString().slice(0, -1);    
    }
}

function allClear() {
    currentDataText.innerText = '0';
    previousDataText.innerText = '';
    firstOperand = '';
    secondOperand = '';
    currentOperation = null;
}

function appendDec() {
    if (shouldResetScreen) resetScreen();
    if (currentDataText.innerText === '') {
        currentDataText.innerText = '0';
    }
    if (currentDataText.innerText.includes('.')) return;
    currentDataText.innerText += '.';
}

function keyboardInput(e) {
    if (e.key >= 0 && e.key <= 9) {
        appendNumber(e.key);
    }
    if (e.key === '.') {
        appendDec();
    }
    if (e.key === '=' || e.key === 'Enter') {
        evaluate();
    }
    if (e.key === 'Backspace') {
        clear();
    }
    if (e.key === 'Escape') {
        allClear();
    }
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        setOperation(convertOperator(e.key));
    }
}

function convertOperator(keyboardOperator) {
    if (keyboardOperator === '/') return '÷';
    if (keyboardOperator === '*') return '*';
    if (keyboardOperator === '-') return '-';
    if (keyboardOperator === '+') return '+';
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}


function operate(operator, a, b) {
    a = Number(a);
    b = Number(b);
    switch(operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '÷':
            if (b === 0) return null;
            return divide(a, b);
        default:
            return null;
    }
}