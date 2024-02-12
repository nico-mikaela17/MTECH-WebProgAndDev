function multiplyMatrices1(matrixA, matrixB) {
  let resultMatrix = [[], []];
  // your code here
  for (let i = 0; i < matrixA.length; i++) {
    resultMatrix[i] = [];

    for (let j = 0; j < matrixB[0].length; j++) {
      let sum = 0;

      for (let k = 0; k < matrixA[0].length; k++) {
        sum += matrixA[i][k] * matrixB[k][j];
      }
      resultMatrix[i][j] = sum;
    }
  }
  return resultMatrix;
}
// let answer = multiplyMatrices(
//   [
//     [1, 2],
//     [3, 4],
//   ],
//   [
//     [5, 6],
//     [7, 8],
//   ]
// );
// answerArray == [[19, 22], [43, 50]];

console.log(
  multiplyMatrices1(
    [
      [1, 2],
      [3, 4],
    ],
    [
      [5, 6],
      [7, 8],
    ]
  )
);
