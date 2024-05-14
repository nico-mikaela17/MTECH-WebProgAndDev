function login() {
  fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: document.getElementById("username").value,
      password: document.getElementById("password").value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.errorMessage) {
        document.getElementById("serverMessage").innerHTML = data.errorMessage;
      } else {
        document.getElementById("serverMessage").innerHTML =
          "You are logged in";
        localStorage.setItem("myToken", data.token);
      }
    });
}

function getCourses() {
  fetch("/courses", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("myToken")}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.errorMessage) {
        document.getElementById("serverMessage").innerHTML = data.errorMessage;
      } else {
        document.getElementById("serverMessage").innerHTML = data.courses;
      }
    })
    .catch((err) => {
      document.getElementById("serverMessage").innerHTML = err.errorMessage;
    });
}

function logout() {
  localStorage.removeItem("myToken");
  document.getElementById("serverMessage").innerHTML = "You are logged out";
}
