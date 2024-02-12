// Write a function that multiplies the values of two arrays and returns a new array with the products.

let arr1 = [2, 4, 6];
let arr2 = [1, 3, 5];

//option1
function multiplyArrays1(arr1, arr2) {
  return arr1.map((value, index) => value * arr2[index]);
}
console.log("option1: ", multiplyArrays1(arr1, arr2));

//option2
function multiplyArrays2(arr1, arr2) {
  let resultArray = [];
  for (let i = 0; i < arr1.length; i++) {
    resultArray.push(arr1[i] * arr2[i]);
  }
  console.log("option2: ", resultArray);

  return resultArray;
}

//option3
function multiplyArrays3(arr1, arr2) {
  let longest = arr1.length > arr2.length ? arr1 : arr2;
  let shortest = arr1.length > arr2.length ? arr2 : arr1;
  return longest.map((value, index) => value * (shortest[index] || 1));
}
console.log("option3: ", multiplyArrays3(arr1, arr2));
