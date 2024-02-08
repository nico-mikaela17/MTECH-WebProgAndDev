let counter = 0;

function increaseCount() {
  counter = counter + 1;

  console.log("counter", counter);
  updateMessage();
}
//when user clicks the button, it will show how many times it was clicked
function addEvenntListenerToTheButton() {
  let button = document.querySelector("button");
  button.addEventListener("click", increaseCount);
}
addEvenntListenerToTheButton();

//update click counter
function updateMessage() {
  let countDiv = document.querySelector("#countDiv");
  let countDivMessage = "Click Count: " + counter;
  countDiv.textContent = countDivMessage;
}
updateMessage()