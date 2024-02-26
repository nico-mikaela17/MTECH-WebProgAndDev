function search(text, searchTerm) {
  //split each word
  let words = text.split(" ");

  //create an array for the new words
  let wordsToReturn = [];

  //iterate through each word in the array
  for (i = 0; i < words.length; i++) {
    // Convert the current word to lowercase for case-insensitive comparison
    let currentWord = words[i].toLowerCase();
    // Check if the current word contains the search term (case-insensitive)
    if (currentWord.includes(searchTerm.toLowerCase())) {
      // Add the matching word to the result array
      wordsToReturn.push(words[i]);
    }
  }
  return wordsToReturn;
}

//another way
function search(text, searchTerm) {
  const words = text.split(" ");

  const result = words.filter((word) =>
    word.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return result;
}
