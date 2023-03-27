const seatsWithScreen = document.querySelector('.seatsWithScreen');
const changeOnUiPrice = document.querySelector('#total');
const changeOnUi = document.querySelector('#count');
const selectedMovie = document.getElementById('movie'); //the price of each movie in the select
const seats = document.querySelectorAll('.col .seat:not(.occupied');//all seats not occupied
showUi();
//get data from local storage and show it
function showUi(){
  const selectedSeats =JSON.parse(localStorage.getItem('selectedSeatsArr'));
console.log(selectedSeats);
}
//save selected movie indx and price
function setMovieData(indx,val) {
  localStorage.setItem('selectedMoviendex',JSON.stringify(indx));
  localStorage.setItem('Price',JSON.stringify(val));

}
function countSelectedSeats() {
  const selectedSeats = seatsWithScreen.querySelectorAll('.col .seat.selected');
  //   console.log(c.length);
  // console.log(selectedSeats);
  changeOnUi.textContent = selectedSeats.length;
  //   selectedSeatsonsole.log(changeOnUi);
  changeOnUiPrice.innerText =
    selectedSeats.length * parseInt(selectedMovie.value);
  // console.log(+selectedMovie.value);
  const seatsIndx = [...selectedSeats].map((seat) => {
    // console.log(seat);
    // console.log( [...seats].indexOf(seat));
    return [...seats].indexOf(seat);
  });
  console.log(seatsIndx);
  localStorage.setItem('selectedSeatsArr',JSON.stringify(seatsIndx));
}

//movie select update
selectedMovie.addEventListener('change', (e) => {
  countSelectedSeats(e.target.s);
  console.log(e.target.selectedIndex,e.target.value);
 setMovieData(e.target.selectedIndex,+e.target.value);
});

//seat event click
seatsWithScreen.addEventListener('click', (ev) => {
  if (ev.target.classList == 'seat' || ev.target.classList == 'seat selected') {
    ev.target.classList.toggle('selected');
    countSelectedSeats();
  }
});

