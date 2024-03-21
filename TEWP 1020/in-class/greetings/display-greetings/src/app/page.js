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

export default function MyApp() {
  return (
    <main>
    <div>
      <h1 >Welcome to my app</h1>
      <h2 className="text-4xl text-amber-400	">
        <GiveMeMessage/> it's <GiveMeHoursNow/>:<GiveMeMinutesNow/> now.
      </h2>
    </div>
    </main>
  );
}
