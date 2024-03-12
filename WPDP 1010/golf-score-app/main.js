/************************* ORDER OF OPERATIONS - FUNCTION NOTES *****************************/

/*
  async function getAvailableGolfCourses() {
    // get list of courses, pass it to handleCourseSelect
  }

  function handleSelect(courses) {
    // populate select, add change handler, pass select value to getGolfCourseDetails
  }

  async function getGolfCourseDetails(golfCourseId) {
    // get details, pass it to handleTeeSelect
  }

  function handleTeeSelect(courses) {
    // populate tee select, add change handler, pass select value to populateTable
  }

  function populateTable(courses, teeBoxValue) {
    // use data to populate table, created holes row, pass info to createRow
  }

  ES6Modules-
  function createRow(courses, rowName, teeIndex) {
    // creates data rows based on name passed in, sums Out/In/Total, returns row !important
  }

  class Player {
    constructor(name, id = getNextId(), scores) {
      this.name = name;
      this.id = id;
      this.scores = scores;
  }
}
*/

// Put the createRow function in its own file called row.js, put the export keyword in front of the word function
//FIXME:look into this
// import createRow from 'row.js'

async function getAvailableGolfCourses() {
  try {
    let response = await fetch(
      "https://exquisite-pastelito-9d4dd1.netlify.app/golfapi/courses.json"
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    let courses = await response.json();
    handleCourseSelect(courses);
  } catch (error) {
    console.error("Error fetching course list:", error);
  }
}

getAvailableGolfCourses();

function handleCourseSelect(courses) {
  let courseSelect = document.getElementById("course-select");

  let courseOptionsHtml = "";
  courseOptionsHtml += `<option value="" selected>Choose Course</option>`;
  courses.forEach((course) => {
    courseOptionsHtml += `<option value="${course.id}">${course.name}</option>`;
  });
  courseSelect.innerHTML = courseOptionsHtml;

  // Event listener for the course selection change
  courseSelect.addEventListener("change", () => {
    let teeBoxSelect = document.querySelector("#tee-box-select");
    teeBoxSelect.classList.remove("hidden");
    getGolfCourseDetails(courseSelect.value);
  });
}

async function getGolfCourseDetails(golfCourseId) {
  try {
    let response = await fetch(
      `https://exquisite-pastelito-9d4dd1.netlify.app/golfapi/course${golfCourseId}.json`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    let courses = await response.json();
    handleTeeSelect(courses);
  } catch (error) {
    console.error("Error fetching course details:", error);
  }
}

function handleTeeSelect(courses) {
  let teeBoxSelect = document.querySelector("#tee-box-select");

  let teeBoxSelectHtml = "";
  teeBoxSelectHtml += `<option value="" selected>Choose Difficulty</option>`;
  let seenTeeBoxes = new Set();
  courses.holes[0].teeBoxes.forEach((teeBox, index) => {
    teeBoxSelectHtml += seenTeeBoxes.has(teeBox)
      ? ""
      : `<option value="${index}">${teeBox.teeType.toUpperCase()}</option>`;

    seenTeeBoxes.add(teeBox);
  });
  teeBoxSelect.innerHTML = teeBoxSelectHtml;

  // Event listener for the teeBox selection change
  teeBoxSelect.addEventListener("change", () => {
    let addPlayerBtn = document.querySelector("#addPlayerBtn");
    let table = document.querySelector(".table");
    addPlayerBtn.classList.remove("hidden");
    table.classList.remove("hidden");
    populateTable(courses, teeBoxSelect.value);
  });
}

function populateTable(courses, teeBoxValue) {
  let table = document.querySelector(".table");
  table.innerHTML = "";

  //holes
  let holesRow = document.createElement("tr");
  let holeTitle = document.createElement("th");
  holeTitle.textContent = "HOLES";
  holesRow.appendChild(holeTitle);
  //create the 1-9 numbers
  for (i = 1; i < 10; i++) {
    let holeNumbers = document.createElement("td");
    holeNumbers.textContent = i;
    holesRow.appendChild(holeNumbers);
  }
  let out = document.createElement("th");
  out.textContent = "Out";
  holesRow.appendChild(out);
  for (i = 10; i < 19; i++) {
    let holeNumbers = document.createElement("td");
    holeNumbers.textContent = i;
    holesRow.appendChild(holeNumbers);
  }
  let inText = document.createElement("th");
  inText.textContent = "In";
  holesRow.appendChild(inText);
  let total = document.createElement("th");
  total.textContent = "TOTAL";
  holesRow.appendChild(total);

  const teeIndex = Number(teeBoxValue);

  //save button from modal
  let savePlayerInfo = document.querySelector("#savePlayerInfo");
  savePlayerInfo.addEventListener("click", addNewPlayer);

  function addNewPlayer() {
    let name = document.querySelector("#name");
    let playerRow = document.createElement("tr");
    let playerName = document.createElement("th");
    playerRow.appendChild(playerName);
    playerName.textContent = name.value.toUpperCase();
    for (i = 1; i < 10; i++) {
      let holeNumbers = document.createElement("td");
      holeNumbers.textContent = 0;
      playerRow.appendChild(holeNumbers);
    }
    let out = document.createElement("th");
    out.textContent = 0;
    playerRow.appendChild(out);
    for (i = 10; i < 19; i++) {
      let holeNumbers = document.createElement("td");
      holeNumbers.textContent = 0;
      playerRow.appendChild(holeNumbers);
    }
    let inText = document.createElement("th");
    inText.textContent = 0;
    playerRow.appendChild(inText);
    let total = document.createElement("th");
    total.textContent = 0;
    playerRow.appendChild(total);

    table.appendChild(playerRow);
  }

  table.appendChild(holesRow);
  table.appendChild(createRow(courses, "yards", teeIndex));
  table.appendChild(createRow(courses, "par", teeIndex));
  table.appendChild(createRow(courses, "hcp", teeIndex));
  // table.appendChild(player1);
}

function createRow(courses, rowName, teeIndex) {
  let dataRow = document.createElement("tr");
  let dataTitle = document.createElement("th");
  dataTitle.textContent = rowName.toUpperCase();
  dataRow.appendChild(dataTitle);
  let outSum = 0;
  let inSum = 0;

  // OUT LOOP
  for (let i = 0; i < 9; i++) {
    let dataCellOut = document.createElement("td");
    dataCellOut.textContent = courses.holes[i].teeBoxes[teeIndex][rowName];
    outSum += Number(courses.holes[i].teeBoxes[teeIndex][rowName]);
    dataRow.appendChild(dataCellOut);
  }

  let outSumCell = document.createElement("th");
  outSumCell.textContent = outSum;
  dataRow.appendChild(outSumCell);

  // IN LOOP
  for (let i = 9; i < 18; i++) {
    let dataCellIn = document.createElement("td");
    dataCellIn.textContent = courses.holes[i].teeBoxes[teeIndex][rowName];
    inSum += Number(courses.holes[i].teeBoxes[teeIndex][rowName]);
    dataRow.appendChild(dataCellIn);
  }

  let inSumCell = document.createElement("th");
  inSumCell.textContent = inSum;
  dataRow.appendChild(inSumCell);

  let totalCell = document.createElement("th");
  totalCell.textContent = outSum + inSum;
  dataRow.appendChild(totalCell);

  return dataRow;
}

//adding players
class Player {
  constructor(name, id = randomID(), scores = new Array(18).fill(0)) {
    this.name = name;
    this.id = id;
    this.scores = scores;
  }
}

function randomID() {
  let id = Math.floor(Math.random() * 100);
  return id;
}

// function calculateScores() {
//   const holeInputs = document.querySelectorAll(".hole");
//   let outScore = 0;
//   let inScore = 0;
//   let total = 0;

//   // Iterate through the hole inputs
//   holeInputs.forEach((input) => {
//     const score = parseInt(input.value) || 0; // Convert input value to integer, default to 0 if not a number
//     total += score;

//     // Check if hole is in front 9 (holes 1-9) or back 9 (holes 10-18)
//     if (input.id.startsWith("hole") && parseInt(input.id.substr(4)) <= 9) {
//       outScore += score;
//     } else {
//       inScore += score;
//     }
//   });
//   console.log(holeInputs.values);

//   // Update the out, in, and total score fields
//   document.getElementById("outScore").value = outScore;
//   document.getElementById("inScore").value = inScore;
//   document.getElementById("total").value = total;
// }
// calculateScores()

/*********************************** FUTURE BRAINSTORMING *************************************/

// player 1 default
// add button to add more players
// push empty players
// each td contains only an input with classList.add(`player${playerNum}

// input

/*
let scores = [ array of scores: the hole number is the index of scores array + 1 ]
for (let i=0; i<scores.length; i++) {
  td.textContent = `Hole number ${i + 1}: ${scores[i]}`;
}



// The Player constructor can only be called if you have the full array of scores
let player1 = new Player('name', scores);
players.push(player1);

function getNextId() {
  // iterate through the players array and find the highest id number
  // return maxId + 1
  // MUST RETURN A NUMBER because it's called in the Player constructor as the default value for id
}
*/
