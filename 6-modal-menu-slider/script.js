const toggleNav = document.querySelector('.toggle');
const openSign = document.querySelector('.signup');
const closeSign = document.querySelector('.close');
const modal = document.querySelector('.modal-container');

//toggle nav
toggleNav.addEventListener('click', () => {
  document.body.classList.toggle('show-nav');
});

//show modal
openSign.addEventListener('click', () => {
  modal.classList.add('show-modal');
});

closeSign.addEventListener('click', () => {
  modal.classList.remove('show-modal');
});
modal.addEventListener('click', () => {
  modal.classList.remove('show-modal');
});
