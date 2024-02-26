function findPairs(array) {
  //number of pairs
  let pairs = 0;
  //iterate through each number in the array
  for (let i = 0; i < array.length; i++) {
    //counter for the current number
    let counter = 0;

    //Check how many times the current number appears in the array
    for (let j = 0; j < array.length; j++) {
      if (array[j] === i + 1) {
        counter += 1;
      }
    }
    //If there are at least 2 occurrences of the number, calculate pairs
    if (counter >= 2) {
      pairs += Math.floor(counter / 2);
    }
  }
  // If there are any pairs, return the total count; otherwise, return -1
  if (pairs > 0) {
    return pairs;
  } else {
    return -1;
  }
}

// //if we set the return to 0
// function findPairs(array) {
//   if (array.length < 2) {
//       return 0;
//   } else {

//       let newArr = [];
//       let count = 0;
//       for (i = 0; i < array.length; i++) {
//           if (newArr.indexOf(array[i]) === -1) {
//               newArr.push(array[i]);
//           } else {
//               let index = newArr.indexOf(array[i]);
//               newArr.splice(index, 1);
//               count += 1;
//           };
//       };
//       return count;
//   };
// };
