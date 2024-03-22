const fruits = ["apple", "banana", "orange", "grape", "kiwi"];

//forEach

fruits.forEach((fruit) => console.log("Third fruit:", fruits[2]));

//map

let map1 = fruits.map((x) => x + "s");
console.log(map1);

//reduce
// [15, 16, 17, 18, 19].reduce((accumulator, currentValue) => accumulator + currentValue,
//   10,
// console.log(accumulator, currentValue)
// );
console.log(
  'reduce',
  fruits.reduce((counterForEachFruit, item) => {
    let lettersInEachWord = item.split("");
    lettersInEachWord.forEach((letter) => {
      let prevCount = counterForEachFruit[letter] || 0;
      counterForEachFruit[letter] = prevCount + 1;
    });
    return counterForEachFruit;
  }, {})
);
