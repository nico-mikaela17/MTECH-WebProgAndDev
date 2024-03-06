let ingredients = [
  "flour",
  "sugar",
  "butter",
  "eggs",
  "vanilla extract",
  "baking powder",
  "salt",
  "chocolate chips",
  "milk",
  "cocoa powder",
];

let mostImportantIngredient = "butter";

function findWhereMostImportantIngredientIs(arr, value) {
  let startIndex = 0;
  let endIndex = arr.length - 1;
  let midpoint = Math.floor((startIndex + endIndex) / 2);
  if (arr.length !== 0) {
    while (arr[midpoint] !== value) {
      if (value < arr[midpoint]) {
        endIndex = midpoint - 1;
      } else if (value > arr[midpoint]) {
        startIndex = midpoint + 1;
      }
      midpoint = Math.floor((startIndex + endIndex) / 2);
    }
    
  }

  return midpoint;
}

console.log(
  `${mostImportantIngredient} can be found at index ${midpoint} in the ingredients' list`
);
