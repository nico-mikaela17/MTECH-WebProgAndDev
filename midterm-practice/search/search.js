function search(text, searchTerm) {
  //split each word
  let words = text.split(" ");

  //create an array for the new words
  let wordsToReturn = [];

  for (i = 0; i < words.length; i++) {
    let currentWord = words[i].toLowerCase();
    if (currentWord.includes(searchTerm.toLowerCase())) {
      //add to the arrays
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