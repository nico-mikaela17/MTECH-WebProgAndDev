async function getAvailableGolfCourses() {
  return fetch(
    "https://exquisite-pastelito-9d4dd1.netlify.app/golfapi/courses.json",
    { mode: "no-cors" }
  ).then(function (response) {
    return response.json();
  });
}

async function getGolfCourseDetails(golfCourseId) {
  return fetch(
    `https://exquisite-pastelito-9d4dd1.netlify.app/golfapi/course${golfCourseId}.json`,
    { mode: "no-cors" }
  ).then(function (response) {
    return response.json();
  });
}

//generate the dropdown options
let courseSelect = document.querySelector("#course-select");
let courseOptionsHtml = "";
fetch("https://exquisite-pastelito-9d4dd1.netlify.app/golfapi/courses.json")
  .then((response) => response.json())
  .then((courses) => {
    console.log(courses);

    courses.forEach((course) => {
      courseOptionsHtml += `<option value="${course.id}">${course.name}</option>`;
    });

    courseSelect.innerHTML = courseOptionsHtml;
  })
  .catch((error) => console.error("Error fetching data:", error));

// let teeBoxSelectHtml = ''
// teeBoxes.forEach(function (teeBox, index) {
//    teeBoxSelectHtml += `<option value="${index}">${teeBox.teeType.toUpperCase()}, ${
//      teeBox.totalYards
//    } yards</option>`
// });

// let teeBoxSelect = document.querySelector('#tee-box-select')
// teeBoxSelect.innerHTML = teeBoxSelectHtml;
