const curr_from = document.querySelector('#curr_from');
const amount_from = document.querySelector('#amount-one');

const curr_to = document.querySelector('#curr_to');
const amount_to = document.querySelector('#amount-two');

const swapBtn = document.querySelector('button');
const rateElemnt = document.querySelector('.rate');

//fetch exchange rate and update the dom
function calculate() {
  const currencyFrom = curr_from.value;
  const currencyTo = curr_to.value;
  console.log(currencyFrom, currencyTo);
  fetch(`https://open.er-api.com/v6/latest/${currencyFrom}`)
    .then((d) => d.json())
    .then((data) => {
      // console.log(data);
      console.log(data.rates[currencyTo]);
     
      amount_to.value = (data.rates[currencyTo] * (amount_from.value)).toFixed(2);

      rateElemnt.innerText = `1 ${currencyFrom}=${data.rates[currencyTo]} ${currencyTo}`
    });
}
function swapCurr() {
  const temp = curr_to.value;
  curr_to.value = curr_from.value;
  curr_from.value = temp;
  calculate();
}

//event listeners
curr_from.addEventListener('change', calculate); //the selection
curr_to.addEventListener('change', calculate); //the selection

amount_from.addEventListener('input', calculate); //the selection
amount_to.addEventListener('input', calculate); //the selection



swapBtn.addEventListener('click', swapCurr);