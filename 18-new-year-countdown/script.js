const days = document.querySelector('.days');
const hours = document.querySelector('.hours');
const minutes = document.querySelector('.minutes');
const seconds = document.querySelector('.seconds');
const countdown = document.querySelector('.count-down');
const year = document.querySelector('.year');
const loading = document.querySelector('.loading');

const currentYear = new Date().getFullYear();

const newYearTime = new Date(`January 01 ${currentYear + 1}`);

// Update countdown time
function updateCountdown() {
  const currentTime = new Date();
  // console.log(currentTime);
  // console.log(newYearTime);
  const diff = newYearTime - currentTime; //diff in ms

  const d = Math.floor(diff / 1000 / 60 / 60 / 24);
  const h = Math.floor(diff / 1000 / 60 / 60) % 24;
  const m = Math.floor(diff / 1000 / 60) % 60;
  const s = Math.floor(diff / 1000) % 60;

  // Add values to DOM
  days.innerHTML = d;
  hours.innerHTML = h < 10 ? '0' + h : h;
  minutes.innerHTML = m < 10 ? '0' + m : m;
  seconds.innerHTML = s < 10 ? '0' + s : s;
  document.querySelector('.coming-year').innerHTML=newYearTime.getFullYear()
}
updateCountdown();
setInterval(updateCountdown, 1000);

setTimeout(() => {
  // loading.remove()
  loading.style.display='none';
  countdown.style.display = 'flex';
}, 1000);
