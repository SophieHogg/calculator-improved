//HTML elements
let input = document.getElementById("textarea--input");
let buttonEq = document.getElementById("button--equals");
const buttonClr = document.getElementById("button--clear");
const buttonDec = document.getElementById("button--dec");
const buttonAns = document.getElementById("button--ans");
const numberButton = document.querySelectorAll(".number");
const operatorButton = document.querySelectorAll(".operator");
const buttons = document.querySelectorAll(".button");
const buttonBsp = document.getElementById("button--bsp");

// basic variables
var reg = new RegExp(/[0-9]/);
let operator = "";
let number = 0;
let numsArr = [];
let ans = 0;
let output = 0;
input.innerHTML = 0;

//when number button is clicked, adds number to display and to 'number' used for calculations. Unable to add multiple leading 0s at the start of the equation.
numberButton.forEach((button) => {
    button.addEventListener("click", () => {
        if (button.value == 0 && input.value.length == 0) {
            console.log(input.value.length);
            input.value = input.value;
        } else {
            input.value += button.value;
            number += button.value;
        }
    });
});

//when an operator button is clicked, it will first ensure the last number was a number. If it was, it will push the previous number to an array. If the array has two numbers in it, it will use the saved operator to complete the calculation before updating the saved operator and clearing the number array. The output from the initial calculation will then be pushed to the array, allowing multiple calculations and a left-to-right operating order.
operatorButton.forEach((button) => {
    button.addEventListener("click", () => {
        let inputValue = input.value;
        if (reg.test(inputValue[inputValue.length - 1])) {
            number = parseFloat(number);
            numsArr.push(parseFloat(number));
            number = 0;
            if (numsArr.length == 2) {
                output = 0;
                //calls on the external function to calculate
                output = calculateHelper(numsArr[0], operator, numsArr[1]);
                //ensures that errors will show if there are any problems
                if (output == "error" || output == NaN) {
                    output = "Error!";
                }
                numsArr = [];
                numsArr.push(output);
            }
            //the equals button is dealt with here. This will NOT add the operator to the display box.
            if (button.value == "=") {
                input.value = output;
                numsArr = [];
                number = output;
            } else {
                input.value += button.value;
                operator = button.value;
            }
        }
    });
});

//when decimal button is clicked, the decimal will be added IF (and only if) the same number does not contain a decimal.
buttonDec.addEventListener("click", () => {
    if ((number + "").indexOf(".") == -1) {
        input.value += ".";
        number += ".";
    }
});

//clears all defined variables and clears the display box
buttonClr.addEventListener("click", () => {
    input.value = "";
    number = "";
    operator = "";
    numsArr = [];
    input.innerHTML = 0;
});

// backspaces the input box, removes last digit from number if the last digit was a number or a decimal point, otherwise clears the operator.
buttonBsp.addEventListener("click", () => {
    let lastDigit = input.value.charAt(input.value.length - 1);
    if (/[0-9\.]/.test(lastDigit)) {
        number = number.slice(0, -1);
    } else {
        operator = "";
    }
    input.value = input.value.slice(0, -1);
});

//returns the output i.e. the previous answer
buttonAns.addEventListener("click", () => {
    input.value += output;
    number += output;
});

//calculator function - takes inputs from operators, number 1 and number 2 and outputs the correct solution. Returns an error if a number is divided by 0.
const calculateHelper = (a, o, b) => {
    switch (o) {
        case "*":
            return a * b;
        case "/":
            if (b == 0) {
                return "error";
            } else {
                return a / b;
            }
        case "+":
            return a + b;
        case "-":
            return a - b;
        case "=":
            return a;
        default:
            return 0;
    }
};
