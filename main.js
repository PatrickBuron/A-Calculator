
// For this java script code i followed a tutorial on youtube ( https://youtu.be/j59qQ7YWLxw } and added a new function at the end of the code to fix the bug with the overflowing number on the display.



class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }


    // this following function is to clear/delete the complet display 

    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    // this following function is to delete the last character of the string on the display

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }


    // this following function is to return all the pressed numbers as a string on the display

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }


    // this function is to ....

    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }


    //  this function adds tasks to the operatores 

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
            case 'x':
                computation = prev * current
                break
            case '/':
                computation = prev / current
                break
            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }
    //    this following function is to turns the number into a string and adds decimal numbers 

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        check_stringNumber_length(stringNumber);
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


    // thsi function is to update the display .the current number changes into the previous number

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
// the follwoing function adds a click event to each number button on the claculator and returns the inner text element eventually updates the display

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})


// the follwoing function adds a click event to each operation button on the claculator and returns the inner text element eventually updates the display

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

// the follwoing function adds a click event to the equal button on the claculator and returns the inner text element eventually , computes and updates the display , after running the clear function

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})


// the follwoing function adds a click event to clear button on the claculator  eventually updates the display after running the clear function

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})


// the follwoing function adds a click event to delete button on the claculator , eventually updates the display after running the clear function

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})


// The check_stringNumber_length is a selfmade function and is not part of the tutorial !!!!!

// this function checks how long the string is and chooses the beter font size  to prevent a text overflow at the display element 


function check_stringNumber_length(result) {

    if (result.length <= 10) {
        currentOperandTextElement.style.fontSize = "32px";

    } else if (result.length > 10) {
        currentOperandTextElement.style.fontSize = "20px";

    }
}







