//giving each value a message assigned to display

function giveMeMessage() {
  let date = new Date();
  console.log(date);

  let timeNow = date.getHours();
  console.log(timeNow);

  if (timeNow <= 12) {
    message = "Good Morning";
  } else if (13 <= timeNow <= 16) {
    message = "Good Afternoon";
  } else if (17 <= timeNow <= 19) {
    message = "Good Evening";
  } else if (20 <= timeNow <= 24) {
    message = "Good Night";
  }
  return message + " it's " + timeNow + " now.";
}

let greetingMessageDiv = document.querySelector("#greetingMessage");
greetingMessage.textContent = giveMeMessage();
