const main = document.querySelector('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];

//add objects to the arr
function addData(obj) {
  data.push(obj);
  updateUi();
}
function updateUi() {
  main.innerHTML = `<h2><strong>Person</strong> Wealth</h2>`;
  data.forEach((d) => {
    const El = document.createElement('div');
    El.classList.add('person');
    El.innerHTML = `<strong>${d.name}</strong>${formatMoney(d.money)}`;
    main.appendChild(El);
  });
}
//format Money
function formatMoney(num) {
  return '$' + num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}
function double() {
  data.map((d) => {
    d.money *= 2;
  });
  updateUi();
}
function sortBy() {
  data.sort(function (a, b) {
    return b.money - a.money;
  });
  updateUi();
}
function showMillionaires() {
  data = data.filter((d) => d.money >= 1000000);
  updateUi();
}
function calcTotal() {
  // let tot = 0;
  // data.forEach((d) => {
  //   tot += d.money;
  // });
 let total= data.reduce((inital, currentValue) => inital + currentValue.money, 0);
  console.log(formatMoney(total));
  const special = document.createElement('div');
  special.classList.add('special');
  special.innerHTML = `<strong>Total Wealth</strong>${formatMoney(total)}`;
  main.appendChild(special);
}
// Fetch random user and add money
async function getRandomUser() {
  const res = await fetch('https://randomuser.me/api');
  const data = await res.json();
  const user = data.results[0];
  console.log(user.name);
  //create an obj to store each of in the data array
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };

  addData(newUser);
}

addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', double);
sortBtn.addEventListener('click', sortBy);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', calcTotal);
