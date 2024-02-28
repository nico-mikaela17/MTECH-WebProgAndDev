let numbersArray = [1, 2, 3, 4, 5];

numbersArray.forEach((number,index,array) => array[index]= number**2)
console.log(numbersArray); 

// let squaredArr = numbersArray.map(number => number**2)
// console.log(squaredArr); 
