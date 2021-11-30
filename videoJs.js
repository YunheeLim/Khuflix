const player = document.querySelector('.controller');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress_bar');
const toggle = player.querySelector('.toggle');
const skipBtns = player.querySelectorAll('[data-skip]');
const vol_ranges = player.querySelectorAll('.volume_ctr');
const timeElapsed = document.getElementById('time-elapsed');
const duration = document.getElementById('duration');

//full-screen
function openFullScreen(){
    if(video.requestFullscreen){
        video.requestFullscreen();
    }
}
// 재생 -> 멈춤 / 멈춤 -> 재생
function togglePlay() {
  if(video.paused){
      video.play();
  }else{
      video.pause();
  }
}

video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);

// 버튼 활성화 
function updateButton() {
  const icon = this.paused ? '►' : '❚❚';
  toggle.textContent = icon;
}

video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);

// 앞 뒤로 10 스킵
function skip() {
 video.currentTime += parseFloat(this.dataset.skip);
}
skipBtns.forEach(button => button.addEventListener('click', skip));

//음량 조절 
function RangeUpdate() {
  video[this.name] = this.value;
}

vol_ranges.forEach(range => range.addEventListener('change', RangeUpdate));
vol_ranges.forEach(range => range.addEventListener('mousemove', RangeUpdate));

// 프로그래스 바 
function Progress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}
video.addEventListener('timeupdate', Progress);

// 시간 체크 
function formatTime(timeInSeconds) {
    const result = new Date(timeInSeconds * 1000).toISOString().substr(11, 8);
  
    return {
      minutes: result.substr(3, 2),
      seconds: result.substr(6, 2),
    };
  };

function init(){
    const initDuration = Math.round(video.duration);
    const timeSet=formatTime(initDuration);
    duration.innerHTML= `${timeSet.minutes}:${timeSet.seconds}`;
    duration.setAttribute('datetime', `${time.minutes}m ${time.seconds}s`)
}

function updateTime() {
    const time = formatTime(Math.round(video.currentTime));
    timeElapsed.innerText = `${time.minutes}:${time.seconds}`;
    timeElapsed.setAttribute('datetime', `${time.minutes}m ${time.seconds}s`)
    
    
  }

video.addEventListener('loadedmetadata', init);
video.addEventListener('timeupdate', updateTime);

// 이동용
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));


