const seatsWithScreen = document.querySelector('.seatsWithScreen');
const changeOnUiPrice = document.querySelector('#total');
const changeOnUi = document.querySelector('#count');
const selectedMovie = document.getElementById('movie'); //the price of each movie in the select

function countSelectedSeats() {
  const c = seatsWithScreen.querySelectorAll('.seat.selected');
  //   console.log(c.length);
  changeOnUi.textContent = c.length;
  //   console.log(changeOnUi);
  changeOnUiPrice.innerText = c.length * parseInt(selectedMovie.value);
  // console.log(+selectedMovie.value);
}

//movie select update
selectedMovie.addEventListener('change', () => {
  countSelectedSeats();
});

//seat event click
seatsWithScreen.addEventListener('click', (ev) => {
  if (ev.target.classList == 'seat' || ev.target.classList == 'seat selected') {
    ev.target.classList.toggle('selected');
    countSelectedSeats();
  }
});
