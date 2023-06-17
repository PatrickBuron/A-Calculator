const keys = document.querySelectorAll('.key');
const displayInput = document.querySelector('.display .input');
const displayOutput = document.querySelector('.display .output');


let input = "";

for (let key of keys) {
    const value = key.dataset.key;

    key.addEventListener('click', () => {
        if (value == "clear") {
            input = "";
            displayInput.innerHTML = "";
            displayOutput.innerHTML = "";
            // changeFontSize(32);
        } else if (value == "=") {
            let result = eval(input);
            // round number to 3 decimal points
            result = Math.round(result * 1000) / 1000;
            check_result_length(result);

            displayOutput.innerHTML = result;
            displayInput.innerHTML = CleanInput(input);
        } else {
            input += value;
            displayInput.innerHTML = CleanInput(input);
        }

    }
    )
}


function CleanInput(input) {
    let input_array = input.split("");
    let input_array_length = input_array.length;

    for (let i = 0; i < input_array_length; i++) {
        if (input_array[i] == "*") {
            input_array[i] = ` <span class="operator">x</span> `;
        } else if (input_array[i] == "/") {
            input_array[i] = ` <span class="operator">/</span> `;
        } else if (input_array[i] == "+") {
            input_array[i] = ` <span class="operator">+</span> `;
        } else if (input_array[i] == "-") {
            input_array[i] = ` <span class="operator">-</span> `;
        } else if (input_array[i] == "%") {
            input_array[i] = ` <span class="operator">%</span> `;
        }

    }
    return input_array.join("");
}

function check_result_length(result) {
    if (Number(result) < 999999999999) {
        displayOutput.style.fontSize = "32px";
        displayOutput.style.paddingTop = "10px";
    } else if (Number(result) > 999999999999) {
        displayOutput.style.fontSize = "20px";
        displayOutput.style.paddingTop = "20px";
    }
}