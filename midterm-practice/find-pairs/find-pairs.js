function findPairs(array) {
  let pairs = 0;
  for (let i = 0; i < array.length; i++) {
    let counter = 0;
    for (let j = 0; j < array.length; j++) {
      if (array[j] === i + 1) {
        counter += 1;
      }
    }
    if (counter >= 2) {
      pairs += Math.floor(counter / 2);
    }
  }
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

