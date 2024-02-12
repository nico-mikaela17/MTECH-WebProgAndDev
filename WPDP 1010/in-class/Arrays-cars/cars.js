// Create an array named cars, assign some values to it, and display the array in an html document
// Display the second item of the cars array.
// Change the first item of cars to "Tesla" by referring to the index number, and display the whole array.
// Use the length property to display the number of array items in cars
// Use the length property to add a new item to cars: "Mercedes"

let carList = document.querySelector("#carList");

let cars = [
  { make: "Ford", model: "Mustang", year: 2020 },
  { make: "Hyundai", model: "Sonata", year: 2010 },
  { make: "Ford", model: "F-150", year: 2022 },
  { make: "Toyota", model: "Camry", year: 2015 },
];

let text = "<ul>";

for (let i = 0; i < cars.length; i++) {
  text += "<li>" + cars[i] + "</li>";
}

text += "</ul>";

carList.innerHTML = text

console.log(cars[2]);

cars[0].make = "Tesla";

console.log(cars[0]);

console.log("Number of cars in this list: ", cars.length);

cars[cars.length] = "Honda";
console.log(cars);
