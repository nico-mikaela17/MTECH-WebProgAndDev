function updateMessage(message) {
  const divElement = document.querySelector(".message");

  divElement.textContent = message;
}

function getMessage(number) {
  console.log(number);

  //write your code here
  if (number === 0) {
    divElement = "";
  } else if (number % 5 === 0 && number % 3 === 0) {
    return "FizzBuzz";
  } else if (number % 3 === 0) {
    return "Fizz";
  } else if (number % 5 === 0) {
    return "Buzz";
  } else {
    return number;
  }
}

function handleInputChange(e) {
  const inputValue = e.target.value;
  const inputValueAsNumber = Number(inputValue);
  const newMessage = getMessage(inputValueAsNumber);

  updateMessage(newMessage);
}

function addEventListenerToInput() {
  const inputElement = document.querySelector("input");

  inputElement.addEventListener("input", handleInputChange);
}

function initializePage() {
  addEventListenerToInput();
}

initializePage();
