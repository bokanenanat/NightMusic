/* ====================== Java Script ====================== */
document.querySelectorAll(".btn-download").forEach((btnDon) => {
  const parent = btnDon.parentElement;
  const music = parent.querySelector(".track");
  btnDon.href = music.src;
});

let statusPlay = false;
let currentMusic = null;
document.querySelectorAll(".btn-play").forEach((btnPlay) => {
  btnPlay.addEventListener("click", () => {
    btnPlay.style.background = '#fa0';
    btnPlay.style.boxShadow = '0 0 15px #fa0';
    const musicID = btnPlay.dataset.track;
    const music = document.getElementById(musicID);
    const parent = btnPlay.parentElement;
    if (currentMusic&&currentMusic!==music) {
      currentMusic.pause();
      parent.querySelector(".icon-play").classList.remove("fa-pause");
      parent.querySelector(".icon-play").classList.add("fa-play");
      const lastParent = currentMusic.parentElement;
      lastParent.querySelector(".icon-play").classList.remove("fa-pause");
      lastParent.querySelector(".icon-play").classList.add("fa-play");
      const lastBtnPlay = lastParent.querySelector('.btn-play');
      lastBtnPlay.style.boxShadow = '';
      lastBtnPlay.style.background = '';
      
      statusPlay = false;
    }
    const timeMusic = parent.querySelector('.time-music');
    function shortTime(duration,current) {
      if(duration>=60) {
        let remainderDuration = Math.floor(duration%60);
        let timeDuration = Math.floor(duration / 60);
        let remainderCurrent = Math.floor(current % 60);
        let timeCurrent = Math.floor(current / 60);
        return timeCurrent+':'+remainderCurrent+'/'+timeDuration+':'+remainderDuration;
      }
    }
    if (!statusPlay) {
      music.play();
      statusPlay = true;
      currentMusic = music;
      music.addEventListener("timeupdate", () => {
        const prugress = (music.currentTime / music.duration) * 100;
        parent.querySelector(".audio-bar-fill").style.width = `${prugress}%`;
        timeMusic.textContent = shortTime(music.duration,music.currentTime);
      });
      parent.querySelector(".icon-play").classList.remove("fa-play");
      parent.querySelector(".icon-play").classList.add("fa-pause");
      statusPlay = true;
    } else if (statusPlay === true) {
      music.pause();
      parent.querySelector(".icon-play").classList.remove("fa-pause");
      parent.querySelector(".icon-play").classList.add("fa-play");
      statusPlay = false;
    }
  });
});
document.querySelectorAll(".btn-show-text-music").forEach((textBtn) => {
  textBtn.addEventListener("click", () => {
    const parent = textBtn.parentElement;
    const sectionText = parent.querySelector(".section-text-music");
    sectionText.style.display = 'grid';
    parent.querySelector('.btn-close-section-text').addEventListener('click',()=>{
      sectionText.style.display = 'none';
    });
    
  });
});
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;

    this.moveX = (Math.random() - 0.5) * 0.5;
    this.moveY = (Math.random() - 0.5) * 0.5;

    this.opacity = Math.random() * 0.6 + 0.2;
    this.size = Math.random() * 1.2;

    this.color = `rgba(255, 150, 0, ${this.opacity})`;
  }

  update() {
    this.x += this.moveX;
    this.y += this.moveY;

    if (this.x > canvas.width || this.x < 0) {
      this.moveX *= -1;
    }

    if (this.y > canvas.height || this.y < 0) {
      this.moveY *= -1;
    }
  }

  draw() {
    ctx.beginPath();

    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

for (let i = 0; i < 90; i++) {
  particles.push(new Particle());
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p) => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animate);
}
animate();
