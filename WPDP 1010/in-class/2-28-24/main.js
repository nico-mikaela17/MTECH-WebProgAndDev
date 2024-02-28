let numbersArray = [1, 2, 3, 4, 5];

numbersArray.forEach((number, index, array) => (array[index] = number ** 2));
// console.log(numbersArray);

let studentObject = {
  name: "Alice",
  age: 20,
  grade: "A",
  subjects: ["Math", "Science"],
};

studentObject.subjects.push("Spanish");
// console.log(studentObject, studentObject.subjects); // Check if the original object is updated with the new subject
