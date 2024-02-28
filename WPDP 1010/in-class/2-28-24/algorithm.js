// Example possible interview question by Trevor M
// Create a function that will determine if a string of characters has the correct number of {, }, (, ), [, and ] characters and that they are in the correct order.
// Simply return true or false
// Bonus: return an array of words or group of characters that  are contained within the matching characters
const isBalanced = (str) => {
  if (!str) return false;
  const stack = new Stack();
  const open = ["{", "(", "["];
  const close = ["}", ")", "]"];
  const matches = {
    "{": "}",
    "(": ")",
    "[": "]",
  };
  
  const words = [];

  for (let i = 0; i < str.length; i++) {
    if (open.includes(str[i])) {
      words[words.length] = "";
      stack.push(str[i]);
    } else if (close.includes(str[i])) {
      if (matches[stack.pop()] !== str[i]) {
        console.log("not balanced", str[i]);
        return false;
      }
    } else {
      words[words.length - 1] += str[i];
    }
  }

  return words;
};