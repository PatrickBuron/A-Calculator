// const keys = document.querySelectorAll('.key');
// const displayInput = document.querySelector('.display .input');
// const displayOutput = document.querySelector('.display .output');


// let input = "";

// for (let key of keys) {
//     const value = key.dataset.key;

//     key.addEventListener('click', () => {
//         if (value == "clear") {
//             input = "";
//             displayInput.innerHTML = "";
//             displayOutput.innerHTML = "";
//             // changeFontSize(32);
//         } else if (value == "=") {
//             let result = eval(input);
//             // round number to 3 decimal points
//             result = Math.round(result * 1000) / 1000;
//             check_result_length(result);

//             displayOutput.innerHTML = result;
//             displayInput.innerHTML = CleanInput(input);
//         } else {
//             input += value;
//             displayInput.innerHTML = CleanInput(input);
//         }

//     }
//     )
// }


// function CleanInput(input) {
//     let input_array = input.split("");
//     let input_array_length = input_array.length;

//     for (let i = 0; i < input_array_length; i++) {
//         if (input_array[i] == "*") {
//             input_array[i] = ` <span class="operator">x</span> `;
//         } else if (input_array[i] == "/") {
//             input_array[i] = ` <span class="operator">/</span> `;
//         } else if (input_array[i] == "+") {
//             input_array[i] = ` <span class="operator">+</span> `;
//         } else if (input_array[i] == "-") {
//             input_array[i] = ` <span class="operator">-</span> `;
//         } else if (input_array[i] == "%") {
//             input_array[i] = ` <span class="operator">%</span> `;
//         }

//     }
//     return input_array.join("");
// }

// function check_result_length(result) {
//     if (Number(result) < 999999999999) {
//         displayOutput.style.fontSize = "32px";
//         displayOutput.style.paddingTop = "10px";
//     } else if (Number(result) > 999999999999) {
//         displayOutput.style.fontSize = "20px";
//         displayOutput.style.paddingTop = "20px";
//     }
// }


// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! N E W   JAVASCRIPT  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText =
            this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
            this.previousOperandTextElement.innerText =
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousOperandTextElement.innerText = ''
        }
    }
}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})