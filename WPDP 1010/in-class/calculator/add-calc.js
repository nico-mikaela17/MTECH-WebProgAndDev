// Create a quick interface with 2 inputs. These inputs will hold the numbers you  are adding together.
//  Use a function to calculate values and return the addition of two numbers
//  Make the result display on the DOM in like a div or other HTML element
// If you get extra time. Try to make it look nicer with some CSS

let num1Input = document.querySelector("#num1");
let num2Input = document.querySelector("#num2");
let addBtn = document.querySelector("#addBtn");

function addValues() {
  let num1 = Number(num1Input.value);
  let num2 = Number(num2Input.value);
  let num3 = num1 + num2;
  return num3;
}

function updateDiv() {
  let resultDiv = document.querySelector("#result");
  resultDiv.textContent = addValues();
}

addBtn.addEventListener("click", updateDiv);
