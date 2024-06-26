// add event listeners to buttons
const leftButton = document.querySelector("#left");
const rightButton = document.querySelector("#right");
const primeNumberIterator = getPrimeNumberIterator();

leftButton.addEventListener("click", handleLeftButtonClick);
rightButton.addEventListener("click", handleRightButtonClick);

function handleLeftButtonClick() {
  const newNumber = primeNumberIterator.previous();
  updateDisplayPrimeNumber(newNumber);
}

function handleRightButtonClick() {
  const newNumber = primeNumberIterator.next();
  updateDisplayPrimeNumber(newNumber);
}

function updateDisplayPrimeNumber(number) {
  const displayElement = document.querySelector("#primeNumDisplay");

  displayElement.textContent = number;
}
function getPrimeNumberIterator() {
  const listOfPrimeNumbers = [2];
  let currentIndex = 0;

  return {
    previous: () => {
      currentIndex = Math.max(currentIndex - 1, 0);

      return listOfPrimeNumbers[currentIndex];
    },
    next: () => {
      currentIndex = Math.min(currentIndex + 1, listOfPrimeNumbers.length);

      if (currentIndex >= listOfPrimeNumbers.length) {
        const lastIndexInArray = listOfPrimeNumbers.length - 1;
        const lastPrimeNumberInArray = listOfPrimeNumbers[lastIndexInArray];
        const nextPrimeNumber = getNextPrimeNumber(lastPrimeNumberInArray);
        listOfPrimeNumbers.push(nextPrimeNumber);
      }

      return listOfPrimeNumbers[currentIndex];
    },
  };
}

function isAPrimeNumber(number) {
  for (let i = 2; i <= Math.sqrt(number); i++) {
    const hasRemainder = number % i === 0;

    if (hasRemainder) return false;
  }

  return true;
}

function getNextPrimeNumber(currentPrimeNumber) {
  let numberToTest = currentPrimeNumber + 1;

  while (!isAPrimeNumber(numberToTest)) {
    numberToTest += 1;
  }

  return numberToTest;
}
