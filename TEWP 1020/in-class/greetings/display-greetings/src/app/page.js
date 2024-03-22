export function GiveMeMessage() {
  let date = new Date();
  console.log(date);

  let timeNow = date.getHours();
  console.log(timeNow);

  let message;

  if (timeNow <= 12) {
    message = "Good Morning";
  } else if (13 <= timeNow <= 16) {
    message = "Good Afternoon";
  } else if (17 <= timeNow <= 19) {
    message = "Good Evening";
  } else if (20 <= timeNow <= 24) {
    message = "Good Night";
  }
  return message;
}

export function GiveMeHoursNow() {
  let date = new Date();
  console.log(date);

  let timeNow = date.getHours();
  console.log(timeNow);

  return timeNow;
}

export function GiveMeMinutesNow() {
  let date = new Date();
  console.log(date);

  let timeNow = date.getMinutes();
  console.log(timeNow);

  return timeNow;
}

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
let temperature = await getTemperatureInF();

export default function MyApp() {
  return (
    <main>
      <div className="m-5">
        <h2 className="text-4xl	">
          <span className="text-amber-400">
            <GiveMeMessage />
          </span>{" "}
          it's{" "}
          <span className="text-sky-300">
            <GiveMeHoursNow />:<GiveMeMinutesNow />
          </span>{" "}
          now
          <br></br>
          and the temperature is{" "}
          <span className="text-pink-400">{temperature}°F</span>.
        </h2>
      </div>
    </main>
  );
}
