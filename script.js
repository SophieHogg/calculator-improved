let input = document.getElementById("textarea--input");
let buttonEq = document.getElementById("button--equals");
const buttonClr = document.getElementById("button--clear");
const buttonDec = document.getElementById("button--dec");
const buttonAns = document.getElementById("button--ans");
const numberButton = document.querySelectorAll(".number");
const operatorButton = document.querySelectorAll(".operator");
const buttons = document.querySelectorAll(".button");
const buttonBsp = document.getElementById("button--bsp");

var reg = new RegExp(/[0-9]/);
let operator = "";
let number = 0;
let numsArr = [];
let ans = 0;
let output = 0;
input.innerHTML = 0;

numberButton.forEach((button) => {
    button.addEventListener("click", () => {
        if (
            button.value == 0 &&
            input.value.charAt(0) == 0 &&
            input.value.length == 1
        ) {
            console.log(input.value.length);
            input.value = input.value;
        } else {
            input.value += button.value;
            number += button.value;
        }
    });
});

operatorButton.forEach((button) => {
    button.addEventListener("click", () => {
        let inputValue = input.value;
        if (reg.test(inputValue[inputValue.length - 1])) {
            number = parseFloat(number);
            numsArr.push(parseFloat(number));
            number = 0;
            if (numsArr.length == 2) {
                output = 0;
                output = calculateHelper(numsArr[0], operator, numsArr[1]);
                if (output == "error" || output == NaN) {
                    input.innerHTML = "Error";
                }
                numsArr = [];
                numsArr.push(output);
            }
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

buttonDec.addEventListener("click", () => {
    let decAllowed = true;
    for (let i = input.value.length; i >= 0; i--) {
        if (/[0-9]/.test(input.value[input.value.length - 1])) {
            console.log(input.value.charAt(i));
            break;
        } else if (input.value.charAt(i) == ".") {
            decAllowed = false;
            break;
        }
    }
    if (decAllowed) {
        input.value += ".";
        number += ".";
    }
});

buttonClr.addEventListener("click", () => {
    input.value = "";
    number = "";
    operator = "";
    numsArr = [];
    input.innerHTML = 0;
});

buttonBsp.addEventListener("click", () => {
    let lastDigit = input.value.charAt(input.value.length - 1);
    if (reg.test(lastDigit)) {
        number = number.slice(0, -1);
    } else {
        operator = "";
    }
    input.value = input.value.slice(0, -1);
});

buttonAns.addEventListener("click", () => {
    input.value += output;
    number += output;
});

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
