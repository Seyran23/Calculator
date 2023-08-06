const input = document.querySelector("input");
const calcBtns = document.querySelectorAll(".buttons_container .button");

const operations = ["-", "+", "/", "*"];
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

let answer = 0;
let initialValue = "";

function isFloat(number) {
  return number % 1 !== 0;
}

function countDecimalDigits(number) {
  const strNumber = number.toString();
  const decimalIndex = strNumber.indexOf(".");
  if (decimalIndex !== -1) {
    return strNumber.length - decimalIndex - 1;
  } else {
    return 0;
  }
}

calcBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const btnValue = btn.textContent;

    if (btnValue === "AC") {
      initialValue = "";
    } else if (btnValue === "DE") {
      if (initialValue.length > 0) {
        initialValue = initialValue.slice(0, -1);
      }
    } else if (
      btnValue === "0" ||
      btnValue === "00" ||
      operations.includes(btnValue) ||
      btnValue === "."
    ) {
      const lastChar = initialValue.charAt(initialValue.length - 1);
      if (numbers.includes(lastChar)) {
        initialValue += btnValue;
      }
    } else if (btnValue === "=") {
      try {
        if (initialValue) {
          answer = eval(initialValue);
          if (isFloat(answer) && countDecimalDigits(answer) > 3) {
            answer = answer.toFixed(3);
          }
          initialValue = String(answer);
        }
      } catch (error) {
        initialValue = "Error";
      }
    } else {
      initialValue += btnValue;
    }

    input.value = initialValue;
  });
});
