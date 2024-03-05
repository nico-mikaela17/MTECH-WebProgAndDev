document.addEventListener('DOMContentLoaded', function () {
  // Wrap your code inside this event listener to ensure it runs after the DOM is fully loaded

  async function getAvailableGolfCourses() {
    try {
      let response = await fetch("https://exquisite-pastelito-9d4dd1.netlify.app/golfapi/courses.json");

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      let courses = await response.json();

      let courseOptionsHtml = '';
      courses.forEach((course) => {
        courseOptionsHtml += `<option value="${course.id}">${course.name}</option>`;
      });

      document.getElementById('course-select').innerHTML = courseOptionsHtml;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }


  //FIXME:
  async function getGolfCourseDetails(golfCourseId) {
    try {
      let response = await fetch(`https://exquisite-pastelito-9d4dd1.netlify.app/golfapi/course${golfCourseId}.json`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      let teeBoxes = await response.json();
      if (Array.isArray(teeBoxes)) {


      let teeBoxSelect = document.querySelector("#tee-box-select");
      let teeBoxSelectHtml = "";

      teeBoxes.forEach((teeBox, index) => {
        teeBoxSelectHtml += `<option value="${index}">${teeBox.teeType.toUpperCase()}, ${teeBox.totalYards} yards</option>`;
      });

      console.log(teeBoxes)
      
      teeBoxSelect.innerHTML = teeBoxSelectHtml;
      console.log(teeBoxSelectHtml);

    }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  // Event listener for the course selection change
  document.getElementById('course-select').addEventListener('change', function () {
    // Get the selected course ID
    const selectedCourseId = this.value;
    console.log(selectedCourseId)


    // Call the function to get details for the selected course
    getGolfCourseDetails(selectedCourseId);
  });

  // Call the function to get the list of available golf courses
  getAvailableGolfCourses();
});

