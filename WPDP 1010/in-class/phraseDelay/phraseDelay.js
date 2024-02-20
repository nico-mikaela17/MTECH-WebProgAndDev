
// another way using the button
// const div = document.getElementById("my_box");
// document.getElementById("start").addEventListener("click", typing);

// function typing() {
//   let phrase1 = "Hello";
//   let phrase2 = "World!";
//   let phrase = phrase1 + " " + phrase2;


//   for (let i = 0; i < phrase.length; i++) {
//     setTimeout(() => {
//       div.innerText += phrase[i];
//     }, i * 1000);
//   }
// }




const phrase = 'Hello World!';
const timeLapse = 500;
let i = 0;

const intervalId = setInterval(function() {
    const nextLetter = phrase[i];
    const displayElement = document.querySelector('#my_box');

    if (nextLetter) {
        displayElement.textContent = displayElement.textContent + nextLetter;
        i = i + 1;
    } else {
        console.log(intervalId, 'finished with interval')
        clearInterval(intervalId)
    }

    

    
}, timeLapse)