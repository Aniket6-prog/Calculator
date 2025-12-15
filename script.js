let display = document.getElementById('display');
    let currentInput = '';
    let operator = '';
    let previousInput = '';
    function updateDisplay() {
        display.textContent = currentInput || '0';
    }

    function clear() {
        currentInput = '';
        operator = '';
        previousInput = '';
        updateDisplay();
    }

    function appendNumber(number) {
        if (currentInput === '0' && number !== '.') {
            currentInput = number;
        } else {
            currentInput += number;
        }
        updateDisplay();
    }

    function appendOperator(op) {
        if (currentInput === '') return;
        if (previousInput !== '') {
            calculate();
        }
        operator = op;
        previousInput = currentInput;
        currentInput = '';
    }

    function calculate() {
        let result;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);
        if (isNaN(prev) || isNaN(current)) return;
        switch (operator) {
            case '+':
                result = prev + current;
                break;
            case '−':
                result = prev - current;
                break;
            case '×':
                result = prev * current;
                break;
            case '÷':
                if (current === 0) {
                    alert('Cannot divide by zero');
                    return;
                }
                result = prev / current;
                break;
            default:
                return;
        }
        currentInput = result.toString();
        operator = '';
        previousInput = '';
        updateDisplay();
    }

    // Button event listeners
    document.getElementById('clear').addEventListener('click', clear);
    document.getElementById('divide').addEventListener('click', () => appendOperator('÷'));
    document.getElementById('multiply').addEventListener('click', () => appendOperator('×'));
    document.getElementById('subtract').addEventListener('click', () => appendOperator('−'));
    document.getElementById('add').addEventListener('click', () => appendOperator('+'));
    document.getElementById('equals').addEventListener('click', calculate);
    document.getElementById('zero').addEventListener('click', () => appendNumber('0'));
    document.getElementById('one').addEventListener('click', () => appendNumber('1'));
    document.getElementById('two').addEventListener('click', () => appendNumber('2'));
    document.getElementById('three').addEventListener('click', () => appendNumber('3'));
    document.getElementById('four').addEventListener('click', () => appendNumber('4'));
    document.getElementById('five').addEventListener('click', () => appendNumber('5'));
    document.getElementById('six').addEventListener('click', () => appendNumber('6'));
    document.getElementById('seven').addEventListener('click', () => appendNumber('7'));
    document.getElementById('eight').addEventListener('click', () => appendNumber('8'));
    document.getElementById('nine').addEventListener('click', () => appendNumber('9'));
    document.getElementById('decimal').addEventListener('click', () => {
        if (!currentInput.includes('.')) {
            appendNumber('.');
        }
    });

    // Keyboard support
    document.addEventListener('keydown', (event) => {
        const key = event.key;
        if (key >= '0' && key <= '9') {
            appendNumber(key);
        } else if (key === '.') {
            if (!currentInput.includes('.')) {
                appendNumber('.');
            }
        } else if (key === '+') {
            appendOperator('+');
        } else if (key === '-') {
            appendOperator('−');
        } else if (key === '*') {
            appendOperator('×');
        } else if (key === '/') {
            appendOperator('÷');
        } else if (key === 'Enter' || key === '=') {
            calculate();
        } else if (key === 'Escape' || key === 'c' || key === 'C') {
            clear();
        }
    });