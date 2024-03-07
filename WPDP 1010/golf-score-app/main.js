async function getAvailableGolfCourses() {
  try {
    let response = await fetch(
      "https://exquisite-pastelito-9d4dd1.netlify.app/golfapi/courses.json"
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    let courses = await response.json();

    let courseOptionsHtml = "";
    courses.forEach((course) => {
      courseOptionsHtml += `<option value="${course.id}">${course.name}</option>`;
    });

    document.getElementById("course-select").innerHTML = courseOptionsHtml;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

let holeBoxSelect = document.querySelector("#hole-box-select");
let teeBoxSelect = document.querySelector("#tee-box-select");

//FIXME:
async function getGolfCourseDetails(golfCourseId) {
  try {
    let response = await fetch(
      `https://exquisite-pastelito-9d4dd1.netlify.app/golfapi/course${golfCourseId}.json`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    let courses = await response.json();
    let holeBoxSelectHtml = "";
    let teeBoxSelectHtml = "";

    //dropdown has hole numbers
    courses.holes.forEach((hole, idx) => {
      holeBoxSelectHtml += `<option value="${idx}">${hole.hole}</option>`;

      //second dropdown has courses (types)
      courses.holes[0].teeBoxes.forEach((teeBox, index) => {
        teeBoxSelectHtml += `<option value="${index}">
        ${teeBox.teeType.toUpperCase()}</option>`;
      });
      holeBoxSelect.innerHTML = holeBoxSelectHtml;
      teeBoxSelect.innerHTML = teeBoxSelectHtml;
      // let table = document.querySelector(".table");
      // holeNumberColumn = document.createElement("td");
      // hole.textContent = hole.teeTypeId;
      // yardNumberColumn = document.createElement("td");
      // yardNumberColumn.textContent = hole.yard;

      // table.appendChild(holeNumberColumn);
      // console.log(hole);
    });

    console.log("course selected: ", courses);

    // holeBoxSelect.innerHTML = holeBoxSelectHtml;
    // teeBoxSelect.innerHTML = teeBoxSelectHtml;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Event listener for the course selection change
document
  .getElementById("course-select")
  .addEventListener("change", function () {
    // Get the selected course ID
    const selectedCourseId = this.value;
    // console.log(selectedCourseId);

    // Call the function to get details for the selected course
    getGolfCourseDetails(selectedCourseId);
  });

// Call the function to get the list of available golf courses
getAvailableGolfCourses();

// Event listener for the hole selection change
holeBoxSelect.addEventListener("change", function () {
  // Get the selected hole ID
  const selectedCourseHoleId = this.value;
  console.log(selectedCourseHoleId);

  // Call the function to get details for the selected course
  getGolfCourseDetails(selectedCourseHoleId);
});

// Call the function to get the list of available golf courses
getAvailableGolfCourses();
// function populateTable() {}
