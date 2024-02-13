//selecting the value of the number the user selected
//giving each value a message assigned to display


function giveMeMessage() {
  let inputNumber = document.querySelector("#inputNumber");
  console.log("button clicked");
  let inputValue = Number(inputNumber.value);
  console.log(inputValue);
  if (inputValue <= 12) {
    message = "Good Morning";
  } else if (13 <= inputValue <= 16) {
    message = "Good Afternoon";
  } else if (17 <= inputValue <= 19) {
    message = "Good Evening";
  } else if (20 <= inputValue <= 24) {
    message = "Good Night";
  }
  return message;
  console.log(message);
}

function handeGreetingButtonClick() {
  let greetingMessage = document.querySelector("#greetingMessage");
  greetingMessage.textContent = giveMeMessage();
}

//get the message-value pair to display it

//add event listener to the button
//when the button gets clicked, display a message
let greetingBtn = document.querySelector("#greetingBtn");
greetingBtn.addEventListener("click", handeGreetingButtonClick);
