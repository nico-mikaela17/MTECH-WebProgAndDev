let greetingDiv = document.querySelector("#greetingDiv");

// let placeIam = navigator.geolocation.getCurrentPosition(function (location) {
// });

async function getTemperatureInF() {
  let apiURL =
    "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m&temperature_unit=fahrenheit&timezone=America%2FDenver";

  return fetch(apiURL)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      return data.current.temperature_2m;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

async function renderPage() {
  let date = new Date();

  let timeNow = date.getHours();

  async function giveMeMessage() {
    if (timeNow <= 12) {
      message = "Good Morning";
    } else if (13 <= timeNow <= 16) {
      message = "Good Afternoon";
    } else if (17 <= timeNow <= 19) {
      message = "Good Evening";
    } else if (20 <= timeNow <= 24) {
      message = "Good Night";
    }
    console.log(message);
    return message;
  }
  giveMeMessage();

  function giveMeMonth() {
    let date = new Date();

    let month = date.getMonth();

    if (month === 0) {
      wordMonth = "Jan";
    } else if (month === 1) {
      wordMonth = "Feb";
    } else if (month === 2) {
      wordMonth = "Mar";
    } else if (month === 3) {
      wordMonth = "Apr";
    } else if (month === 4) {
      wordMonth = "May";
    } else if (month === 5) {
      wordMonth = "Jun";
    } else if (month === 6) {
      wordMonth = "Jul";
    } else if (month === 7) {
      wordMonth = "Aug";
    } else if (month === 8) {
      wordMonth = "Sep";
    } else if (month === 9) {
      wordMonth = "Oct";
    } else if (month === 10) {
      wordMonth = "Nov";
    } else if (month === 11) {
      wordMonth = "Dec";
    }
    return wordMonth;
  }
  giveMeMonth();

  let day = date.getDate();

  let year = date.getFullYear();

  let minutes = date.getMinutes();
  let ampm = timeNow >= 12 ? "pm" : "am";
  timeNow = timeNow % 12;
  timeNow = timeNow ? timeNow : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  let strTime = timeNow + ":" + minutes + " " + ampm;
  let temperature = await getTemperatureInF();

  
  // let convertBtn = document.querySelector("#convertBtn");
  // convertBtn.addEventListener("click", getTemperatureInC);

  greetingDiv.textContent = `${message}. Today's date is ${wordMonth} ${day}, ${year}. Time is ${strTime}. Current temperature is ${temperature} °F. `;
}

renderPage();
