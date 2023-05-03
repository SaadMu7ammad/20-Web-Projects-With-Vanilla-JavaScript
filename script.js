const container = document.querySelector('.container');
const txt = document.querySelector('.text');

breathAnimation();

function breathAnimation() {
    txt.innerText = 'Breathe In!';
  container.className = 'container grow';

  setTimeout(() => {
    txt.innerText = 'Hold';

    setTimeout(() => {
        txt.innerText = 'Breathe Out!';
      container.className = 'container shrink';
    }, 1500);
  }, 2900);
}
setInterval(breathAnimation, 9000);
