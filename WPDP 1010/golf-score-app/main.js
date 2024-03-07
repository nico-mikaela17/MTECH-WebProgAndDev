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
    courseOptionsHtml += `<option value="" selected>Choose Course</option>`;
    courses.forEach((course) => {
      courseOptionsHtml += `<option value="${course.id}">${course.name}</option>`;
    });

    document.getElementById("course-select").innerHTML = courseOptionsHtml;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

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

    let teeBoxSelectHtml = "";
    teeBoxSelectHtml += `<option value="" selected>Choose Difficulty</option>`;

    let seenTeeBoxes = new Set();

    //dropdown
    courses.holes[0].teeBoxes.forEach((teeBox, index) => {
      teeBoxSelectHtml += seenTeeBoxes.has(teeBox)
        ? ""
        : `<option value="${index}">${teeBox.teeType.toUpperCase()}</option>`;

      seenTeeBoxes.add(teeBox);
    });

    teeBoxSelect.innerHTML = teeBoxSelectHtml;
    teeBoxSelect.addEventListener("change", populateTable);

    function populateTable() {
      let table = document.querySelector(".table");
      table.innerHTML = "";
      let holesRow = document.createElement("tr");

      let holeTitle = document.createElement("th");
      holeTitle.textContent = "Holes";

      holesRow.appendChild(holeTitle);

      //create the 1-9 numbers
      for (i = 0; i < 10; i++) {
        let holeNumbers = document.createElement("td");
        holeNumbers.textContent = i;
        holesRow.appendChild(holeNumbers);
      }

      let out = document.createElement("th");
      out.textContent = "Out";
      holesRow.appendChild(out);

      // let selectedTee = teeBoxSelect.value;
      table.appendChild(holesRow);

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
    }
    console.log("course selected: ", courses);
  } catch (error) {
    // holeBoxSelect.innerHTML = holeBoxSelectHtml;
    // teeBoxSelect.innerHTML = teeBoxSelectHtml;
    console.error("Error fetching data:", error);
  }
}

// Event listener for the course selection change
document
  .getElementById("course-select")
  .addEventListener("change", function () {
    teeBoxSelect.classList.remove("hidden");

    // Get the selected course ID
    let selectedCourseId = this.value;
    // console.log(selectedCourseId);

    // Call the function to get details for the selected course
    getGolfCourseDetails(selectedCourseId);
  });

// Call the function to get the list of available golf courses
getAvailableGolfCourses();
