const msg = document.getElementById('msg');

const randomNum = getRandNum();

console.log(randomNum);

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new window.SpeechRecognition();

//start recognition
recognition.start();

//when no speaking start it again to be works continous
recognition.addEventListener('end', () => recognition.start());

//capture user guess
function onSpeak(e) {
  let txt = +e.results[0][0].transcript;
  console.log(txt);
  msg.innerHTML = `
  <div>You said: </div>
  <span class="box">${txt}</span>
`;
  checkNumber(txt);
}
function checkNumber(txt) {
  const num = txt;
  // Check if valid number
  if (Number.isNaN(num)) {
    msg.innerHTML += '<div>That is not a valid number</div>';
    return;
  }
  // Check in range
  if (num > 100 || num < 1) {
    msg.innerHTML += '<div>Number must be between 1 and 100</div>';
    return;
  }
  // Check number
  if (num === randomNum) {
    document.body.innerHTML = `
      <h2>Congrats! You have guessed the number! <br><br>
      It was ${num}</h2>
      <button class="play-again" id="play-again">Play Again</button>
    `;
  } else if (num > randomNum) {
    msg.innerHTML += '<div>GO LOWER <i class=fa-solid fa-arrow-down></i></div>';
  } else {
    msg.innerHTML += '<div>GO HIGHER <i class=fa-solid fa-arrow-up></i></div>';
  }
}
//result
recognition.addEventListener('result', onSpeak);
function getRandNum() {
  return Math.floor(Math.random() * 100) + 1;
}

document.body.addEventListener('click', e => {
  if (e.target.id == 'play-again') {
    window.location.reload();
  }
});