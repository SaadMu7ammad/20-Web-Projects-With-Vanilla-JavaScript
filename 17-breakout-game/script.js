const showRulesBtn = document.querySelector('.rules-btn');
const hideRulesBtn = document.querySelector('.close-btn');
const bar = document.querySelector('.rules-bar');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const loserBtn = document.querySelector('.again-btn-loser');

let score = 0;
let requestId;
// create ball
const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: 10, //radius
  speed: 4,
  dx: 4,
  dy: -4,
};
// draw ball on canvas
function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
  ctx.fillStyle = '#0095dd';
  ctx.fill();
  ctx.closePath();
}

// create paddle
const paddle = {
  x: canvas.width / 2 - 50,
  y: canvas.height - 20,
  width: 100,
  height: 10,
  speed: 4,
  dx: 0,
};
// draw padddle on canvas
function drawPaddle() {
  ctx.beginPath();
  ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
  ctx.fillStyle = '#0095dd';
  ctx.fill();
  ctx.closePath();
}

//draw score on canvas
function drawScore() {
  ctx.beginPath();
  ctx.font = '25px Arial';
  ctx.fillText(`score: ${score}`, canvas.width - 105, 30);
  ctx.closePath();
}

//break
const brickRow = 5;
const brickCol = 9;

//create brick
const brick = {
  width: 70,
  height: 20,
  marginRight: 10,
  offsetX: 45,
  offsetY: 60,
  visible: true,
};
//all bricks width=720-10=710 the last margin right from 800 the width of canvas so the gap on left and right must be 40
// Create bricks
const bricks = [];
for (let i = 0; i < brickCol; i++) {
  bricks[i] = [];
  for (let j = 0; j < brickRow; j++) {
    const x = i * (brick.width + brick.marginRight) + brick.offsetX;
    const y = j * (brick.height + brick.marginRight) + brick.offsetY;
    bricks[i][j] = { x, y, ...brick };
  }
}
//draw break
// function drawBick() {
//   ctx.beginPath();
//   ctx.fillRect(brick.width, brick.height, 70, 25);
//   ctx.fillStyle = '#0095dd';
//   ctx.fill();
//   ctx.closePath();
// }

// Draw bricks on canvas
function drawBricks() {
  // console.log(bricks);
  bricks.forEach((column) => {
    column.forEach((brick) => {
      ctx.beginPath();
      ctx.rect(brick.x, brick.y, brick.width, brick.height);
      ctx.fillStyle = brick.visible ? '#0095dd' : 'transparent';
      ctx.fill();
      ctx.closePath();
    });
  });
} //draw everything

function removeBricks() {
  bricks.forEach((column) => {
    column.forEach((brick) => {
      brick.visible = 'false';
    });
  });
}

function draw() {
  //clr canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddle();
  drawScore();
  drawBricks();
}
function movePaddle() {
  paddle.x += paddle.dx;
  //stop the paddle when it goes to the right corner of canvas
  if (paddle.x + paddle.width >= canvas.width) {
    paddle.x = canvas.width - paddle.width;
  }
  if (paddle.x <= 0) {
    paddle.x = 0;
  }
}
function moveBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;

  // Wall collision (right/left)
  if (ball.x + ball.size >= canvas.width || ball.x - ball.size <= 0) {
    ball.dx *= -1;
  }

  // Wall collision (top/bottom)
  if (ball.y + ball.size >= canvas.height || ball.y - ball.size <= 0) {
    ball.dy *= -1;
  }

  if (ball.y + ball.size >= canvas.height) {
    document.querySelector('.loser').classList.add('show');
    // ball.x = 0;
    // ball.y = 0;
    cancelAnimationFrame(requestId);

    document.querySelector('.again-btn-loser').addEventListener('click', () => {
      window.location.reload();
    });
    // reDrawBricks();
  }
  if (score === brickCol * brickRow) {
    document.querySelector('.winner').classList.add('show');
    // reDrawBricks();

    cancelAnimationFrame(requestId);
    document
      .querySelector('.again-btn-winner')
      .addEventListener('click', () => {
        window.location.reload();
      });
  }
  // Paddle collision
  if (
    ball.x - ball.size >= paddle.x && //left side of ball with the left of paddle
    ball.x + ball.size <= paddle.x + paddle.width && //right side of ball with the right end of paddle
    ball.y + ball.size >= paddle.y //bottm side of ball
  ) {
    ball.dy = -ball.speed;
  }
  // Brick collision
  bricks.forEach((column) => {
    column.forEach((brick) => {
      if (brick.visible) {
        if (
          ball.x - ball.size > brick.x && // left brick side check
          ball.x + ball.size < brick.x + brick.width && // right brick side check
          ball.y + ball.size > brick.y && // top brick side check
          ball.y - ball.size < brick.y + brick.height // bottom brick side check
        ) {
          ball.dy *= -1;
          brick.visible = false;
          score++;
        }
      }
    });
  });
}
//update canvas animations
function update() {
  requestId = requestAnimationFrame(update);
  movePaddle();
  moveBall();
  draw();
}
update();

// Keydown event
function keyDown(e) {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    paddle.dx = paddle.speed; //to right
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    paddle.dx = -paddle.speed; //to left
  }
  // console.log('dow');
}

// Keyup event
function keyUp(e) {
  if (
    e.key === 'Right' ||
    e.key === 'ArrowRight' ||
    e.key === 'Left' ||
    e.key === 'ArrowLeft'
  ) {
    paddle.dx = 0; //stop the movements
  }
  // console.log('up');
}

// Keyboard event handlers
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

showRulesBtn.addEventListener('click', () => {
  bar.classList.toggle('show');

  window.addEventListener('click', handleClickOutside);
});
hideRulesBtn.addEventListener('click', () => {
  bar.classList.toggle('show');
  window.removeEventListener('click', handleClickOutside);
});
//close the side bar after showing it by clicking anywhere except the sidebar itself
function handleClickOutside(e) {
  // console.log(e.target);
  if (e.target !== bar && e.target !== showRulesBtn) {
    //another way !bar.contains(e.target)
    bar.classList.remove('show');
    window.removeEventListener('click', handleClickOutside);
  }
}
