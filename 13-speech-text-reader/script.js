const main = document.querySelector('main');
const voicesSelect = document.getElementById('voices');
const textarea = document.getElementById('text');
const readBtn = document.querySelector('.read-btn');
const toggleBtn = document.querySelector('.toggle-btn');
const closeBtn = document.querySelector('.close');
const body = document.querySelector('body');
const overlay = document.querySelector('.overlay');

const data = [
  {
    image: './img/drink.jpg',
    text: "I'm Thirsty",
  },
  {
    image: './img/food.jpg',
    text: "I'm Hungry",
  },
  {
    image: './img/tired.jpg',
    text: "I'm Tired",
  },
  {
    image: './img/hurt.jpg',
    text: "I'm Hurt",
  },
  {
    image: './img/happy.jpg',
    text: "I'm Happy",
  },
  {
    image: './img/angry.jpg',
    text: "I'm Angry",
  },
  {
    image: './img/sad.jpg',
    text: "I'm Sad",
  },
  {
    image: './img/scared.jpg',
    text: "I'm Scared",
  },
  {
    image: './img/outside.jpg',
    text: 'I Want To Go Outside',
  },
  {
    image: './img/home.jpg',
    text: 'I Want To Go Home',
  },
  {
    image: './img/school.jpg',
    text: 'I Want To Go To School',
  },
  {
    image: './img/grandma.jpg',
    text: 'I Want To Go To Grandmas',
  },
];
//the object resposible for speaking the text
const message = new SpeechSynthesisUtterance();

data.forEach(createBox);
function createBox(it) {
  //it is the object
  const box = document.createElement('div');
  // console.log(it);
  const { image, text } = it;
  // console.log(image);
  box.classList.add('box');
  box.innerHTML = `
  <img src=${image} alt="${text}" />
  <h2 class="info">${text}</h2>
  `;
  box.addEventListener('click', () => {
    message.text = text;
    speechSynthesis.speak(message);
    box.classList.add('active');
    setTimeout(() => box.classList.remove('active'), 900);
  });

  main.appendChild(box);
}

let voices = [];

function getVoices() {
  voices = speechSynthesis.getVoices();
  voices.forEach((voice) => {
    const option = document.createElement('option');

    option.value = voice.name;
    option.innerText = `${voice.name} ${voice.lang}`;

    voicesSelect.appendChild(option);
  });
}
toggleBtn.addEventListener('click', () => {
  document.querySelector('.reading-box').classList.add('show');
  // container.classList.toggle('shadow')
  overlay.classList.add('show');
});

overlay.addEventListener('click', () => {
  document.querySelector('.reading-box').classList.remove('show');
  // container.classList.toggle('shadow')
  overlay.classList.remove('show');
});
closeBtn.addEventListener('click', () => {
  document.querySelector('.reading-box').classList.remove('show');
  overlay.classList.remove('show');
});

document.querySelector('.reading-box').addEventListener('click', (event) => {
  event.stopPropagation();
});
speechSynthesis.addEventListener('voiceschanged', getVoices);

//change the voice
function setVoice(e) {
  message.voice = voices.find(v => v.name === e.target.value);
}
//read selected text
readBtn.addEventListener('click', () => {
  message.text = textarea.value;
  speechSynthesis.speak(message);

})
voicesSelect.addEventListener('change', setVoice);