const balance = document.querySelector('.balance');
const money_plus = document.querySelector('.plus-income');
const money_minus = document.querySelector('.minus-expense');
const list = document.querySelector('.expand-list');
const form = document.querySelector('.form');
const text = document.querySelector('input[type=text]');
const amount = document.querySelector('input[type=number]');

// const dummyTransactions = [
//   { id: 1, text: 'Flower', amount: -20 },
//   { id: 2, text: 'Salary', amount: 300.3 },
//   { id: 3, text: 'Book', amount: -10 },
//   { id: 4, text: 'Camera', amount: 150.65 },
// ];

let transactions=[]; //= dummyTransactions;

// Generate random ID
function generateID() {
  return Math.floor(Math.random() * 100000000);
}
function insertTransaction(e) {
  e.preventDefault();
  if (text.value.trim() === '' || amount.value.trim() === '') {
    alert('Please add a text and amount');
  } else {
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: +amount.value,
    };
    console.log(transaction);
    transactions.push(transaction)
    updateBalance();
    init();
    text.value = '';
    amount.value = '';
  }

}
function updateBalance() {
  const amountArr = transactions.map((tr) => tr.amount);
  // console.log(amountArr);

  const TotalAmount = amountArr.reduce((sum, item) => sum + item, 0);

  const plus = amountArr
    .filter((it) => it > 0)
    .reduce((sum, item) => sum + item, 0);

  const minus = amountArr
    .filter((it) => it < 0)
    .reduce((sum, item) => sum + item, 0);

  money_plus.textContent = '$' + plus.toFixed(2);
  money_minus.textContent = '$' + minus.toFixed(2);
  balance.textContent = '$' + TotalAmount.toFixed(2);
}
function addTransaction(transaction) {
  const sign = transaction.amount < 0 ? '-' : '+';
  const item = document.createElement('li');
  item.classList.add(transaction.amount >= 0 ? 'plus' : 'minus');
  item.innerHTML = `<span>${transaction.text} </span>
  <span>${sign === '-' ? '' : '+'}${transaction.amount}</span>
  <button class="delbtn" onclick="removeTransaction(${transaction.id})">x</button>`;
  list.appendChild(item);
  updateBalance();
  // init();
}
function removeTransaction(id){
  transactions = transactions.filter(tr => tr.id !== id)
  init();
  updateBalance();
}
// addTransaction(transactions[0]);
// addTransaction(transactions[1]);
// addTransaction(transactions[2]);
// addTransaction(transactions[3]);

//forEach() is calling the addTransaction function for each element in the transactions array.
function init() {
  list.innerHTML = '';
  transactions.forEach(addTransaction);
}
form.addEventListener('submit', insertTransaction);

init();