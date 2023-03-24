const video = document.getElementById('vid');
const _play = document.getElementById('play');
const _stop = document.getElementById('stop');
const progress = document.getElementById('progress');
const timestamp = document.getElementById('timeId');

// Play & pause video by click on any where of video
function toggleVideoStatus() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function updateProgress() {
  progress.value = (video.currentTime / video.duration) * 100;
  //   timestamp.textContent = Math.floor(video.currentTime/60);
  let mins = Math.floor(video.currentTime / 60);
  let secs = Math.floor(video.currentTime % 60);
  timestamp.textContent = `${mins}:${secs}`;
}
function setVidProgress() {
  video.currentTime = (progress.value * video.duration) / 100;
}
//play btn
function updatePlayIcon() {
//   toggleVideoStatus();
  if (video.paused) {
    play.innerHTML = '<i class="fa-solid fa-play"></i>';
  } else {
    play.innerHTML = '<i class="fa-solid fa-pause"></i>';
  }
}
function stopVideo() {
  video.currentTime = 0;
  video.pause();
}
// Event listeners
video.addEventListener('click', toggleVideoStatus);
video.addEventListener('pause', updatePlayIcon);//if the video paused update the icons
video.addEventListener('play', updatePlayIcon);//if the video played update the icons
video.addEventListener('timeupdate', updateProgress);

_play.addEventListener('click', toggleVideoStatus);//click on play btn
_stop.addEventListener('click', stopVideo);//stop vide and reset the cursor

progress.addEventListener('change', setVidProgress);//change the time by user clicking
