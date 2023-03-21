const form = document.querySelector('form');
const userName = document.getElementById('usrName');
const email = document.getElementById('mail');
const pass1 = document.getElementById('pass');
const pass2 = document.getElementById('pass2');

function showErr(input, msg) {
  console.log(msg);
  const formCtrl = input.parentElement;
  console.log(formCtrl);
  // formCtrl.className='row error';
  formCtrl.classList.add('error');
  // formCtrl.className='row error visible small';
  formCtrl.classList.add('visible');
  formCtrl.classList.add('small');
  formCtrl.querySelector('small').innerText = msg;
  formCtrl.classList.remove('success');
}

function showSucces(input, msg) {
  console.log(msg);
  const formCtrl = input.parentElement;
  formCtrl.classList.add('success');
  formCtrl.classList.remove('visible');
  formCtrl.classList.remove('small');
  formCtrl.classList.remove('error');
}

//valid email
function isValidEmail(email) {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}
//event listeners
form.addEventListener('submit', function (e) {
  e.preventDefault();
  if (userName.value === '') {
    showErr(userName, 'usrname required');
  } else {
    showSucces(userName, 'success');
  }
  if (email.value === '') {
    showErr(email, 'email required');
  } else if (isValidEmail(email.value)) {
    showSucces(email, 'success');
  } else {
    showErr(email, 'not Valid Email');
  }
  if (pass1.value === '') {
    showErr(pass1, 'pass required');
  } else {
    showSucces(pass1, 'success');
  }
  if (pass2.value === '') {
    showErr(pass2, 'pass required');
  } else {
    showSucces(pass2, 'success');
  }
});
