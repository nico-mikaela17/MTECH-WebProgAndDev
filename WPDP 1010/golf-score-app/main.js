/************************* THE ORDER WE BE WORKING IN *****************************/

/*
  async function getAvailableGolfCourses() {
    fetch(url)
      .then(res => res.json())
      .then(courses => handleSelect(courses))
  }

  function handleSelect(courses) {
    // access first dropdown with document.querySelector
    // populate course select
    // add event listener
    let dropdown1 = document.getElementById("course-select")
    dropdown1.addEventListener("change", getGolfCourseDetails(dropdown1.value));
  }

  async function getGolfCourseDetails(id) {
    fetch(url w/ id)
      .then(res => res.json())
      .then(courses => handleSecondSelect(courses))
  }

  function handleSecondSelect(courses) {
    // unhides second dropdown
    // populate second dropdown
    // adds event listener on change
    // on change call populateTable(dropdown2.value)
  }

  function populateTable(details) {
    // use details data to populate golf table
  }
*/

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

/************************* THE ORIGINAL CODE IN THE EVENT HANDLER FUNCTION CALL *****************************/
// async function () {
//   teeBoxSelect.classList.remove("hidden");

//   // Get the selected course ID
//   let selectedCourseId = this.value;
//   // console.log(selectedCourseId);

//   // Call the function to get details for the selected course
//   await getGolfCourseDetails(selectedCourseId);
/***********************************************************************************************************/

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
    console.log("Course ID: ", courseSelect.value);
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
  teeBoxSelect.addEventListener("change", () => {
    console.log("TeeBox index selected: ", teeBoxSelect.value);
    populateTable(courses, teeBoxSelect.value);
  });
}

function populateTable(courses, teeBoxValue) {
  let table = document.querySelector(".table");
  table.classList.remove("hidden");
  table.innerHTML = "";

  //holes
  let holesRow = document.createElement("tr");
  let holeTitle = document.createElement("th");
  holeTitle.textContent = "Holes";
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

  table.appendChild(holesRow);
  table.appendChild(createRow(courses, "yards", teeIndex));
  table.appendChild(createRow(courses, "par", teeIndex));
  table.appendChild(createRow(courses, 'hcp', teeIndex));
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
