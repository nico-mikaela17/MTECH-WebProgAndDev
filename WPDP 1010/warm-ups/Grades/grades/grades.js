function changeGrade() {
  let inputNum = document.querySelector("input");
  let inputValue = Number(inputNum.value);
  console.log(inputValue);
  if (inputValue < 60) {
    grade = "F";
  } else if (60 <= inputValue && inputValue < 70) {
    grade = "D";
  } else if (70 <= inputValue && inputValue < 80) {
    grade = "C";
  } else if (80 <= inputValue && inputValue <= 90) {
    grade = "B";
  } else if (90 <= inputValue && inputValue <= 100) {
    grade = "A";
  } else {
    grade = "Number input needs to be 0 to 100";
  }
  return grade;
}

function afterClick() {
  let letterGrade = document.querySelector("div");
  letterGrade.textContent = changeGrade();
}

let checkBtn = document.querySelector("button");
checkBtn.addEventListener("click", afterClick);
