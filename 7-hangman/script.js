const wordEl = document.querySelector('.word');
const wrongLettersEl = document.querySelector('.wrong-letters-container');
const playAgainBtn = document.querySelector('.play-btn');
const popup = document.querySelector('.popup-container');
const notification = document.querySelector('.notification-container');
const finalMessage = document.querySelector('.final-msg');

const bodyParts = document.querySelectorAll('.part-man');

const words = ['application', 'programming', 'interface', 'wizard'];

let selectedWord = words[Math.floor(Math.random() * 4)]; // * words.length;
console.log(selectedWord);
const correctLetters = [];
const wrongLetters = [];
//show hidden word
let arrletters;
function displayWord() {
  arrletters = [...selectedWord];

  // for (let i = 0; i < arrletters.length; i++) {
  //     // wordEl.innerHTML+=`<div class="letter">${arrletters[i]}</div>`
  // }
  // if(correctLetters.includes())
  wordEl.innerHTML = '';
  arrletters.forEach((letter) => {
    wordEl.innerHTML += `<div class="letter">${
      correctLetters.includes(letter) ? letter : ''
    }</div>`;
  });
  const innerWord = wordEl.innerText.replace(/\n/g, ''); //regular expression  g-> globally wherever it's found.
  // console.log(wordEl.innerText);
  // console.log(innerWord);
  if (innerWord === selectedWord) {
    finalMessage.innerText = 'Congratulations You Won!';
    popup.classList.toggle('show');
  }
}
function showNotification() {
  notification.classList.add('show');
  setTimeout(() => {
    notification.classList.remove('show');
  }, 2000);
}
function WrongLetter(letter) {
  if (wrongLetters.length < 6) {
    notification.classList.remove('show');
    wrongLetters.push(letter);
    wrongLettersEl.innerHTML += ` <span>${letter}</span>,`;
    console.log('wrong');
    // try {
    bodyParts[wrongLetters.length - 1].classList.add('show');
    //  }
  }
}
//key press
window.addEventListener('keydown', (ev) => {
  if (wrongLetters.length < 6) {//to stop the code run again after losing
    if (ev.keyCode >= 65 && ev.keyCode <= 90) {
      const letter = ev.key;
      console.log(letter);
      if (selectedWord.includes(letter) && !correctLetters.includes(letter)) {
        correctLetters.push(letter);
        notification.classList.remove('show');
        displayWord();
      } else if (correctLetters.includes(letter)) {
        showNotification();
      } else if (
        !selectedWord.includes(letter) &&
        !wrongLetters.includes(letter)
      ) {
        WrongLetter(letter);
        if (wrongLetters.length === 6) {
          finalMessage.innerText = 'You Lost :(';
          popup.classList.add('show');
        }
      }
    }
  }
});
displayWord();
console.log(arrletters);
playAgainBtn.addEventListener('click', () => {
  location.reload();
});
