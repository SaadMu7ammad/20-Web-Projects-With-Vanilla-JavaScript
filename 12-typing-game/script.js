const hideBtn = document.querySelector('.btn button');
const bar = document.querySelector('.bar');
const box = document.querySelector('.box');
const word = document.querySelector('.third-sub-bar h2');
const textInput = document.querySelector('.third-sub-bar .txt');
const score = document.querySelector('.sec-sub-bar .score');
const time = document.querySelector('.sec-sub-bar .time');
const lvlSelect = document.querySelector('.bar select');

// List of words for game
const words = [
  'sigh',
  'tense',
  'airplane',
  'ball',
  'pies',
  'juice',
  'warlike',
  'bad',
  'north',
  'dependent',
  'steer',
  'silver',
  'highfalutin',
  'superficial',
  'quince',
  'eight',
  'feeble',
  'admit',
  'drag',
  'loving',
];
let mode = 'easy';
let randomWord;
let scoreNum = 0;
let timeNum = 10;
let increment = 5; //easy Mode
//focus on text when starting
textInput.focus();

//generate random words
const getRandomWord = () => words[Math.floor(Math.random() * words.length)];

//counting down
const timeInterval = setInterval(updateTime, 1000);

function updateTime() {
  console.log(timeNum);
  // timeNum--;
}
function updateTime() {
  if (timeNum === 1) {
    finish();
  }
  time.innerHTML = --timeNum + 's';
}
function finish() {
  box.innerHTML = ` <h1>Time ran out</h1>
  <p>Your final score is ${scoreNum}</p>
  <button onclick="window.location.reload()">Reload</button>`;
}
function addWordToDom() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}
function updateScore() {
  score.innerHTML = ++scoreNum;
}
textInput.addEventListener('input', (e) => {
  // console.log(e.target.value); //print when the user insert a new letter again
  const insertedWord = e.target.value;
  if (randomWord === insertedWord) {
    addWordToDom();
    textInput.value = '';
    updateScore();
    if (mode === 'easy') {
      increment = 5;
    } else if (mode === 'medium') {
      increment = 3;
    } else if (mode === 'hard') {
      increment = 1;
    }
    timeNum += increment;
    time.innerHTML = timeNum;
  }
});

lvlSelect.addEventListener('change', (e) => {
  if (e.target.value) {
    mode = e.target.value;
    console.log(mode);
  }
});
hideBtn.addEventListener('click', () => {
  bar.classList.toggle('hide');
});

addWordToDom();
