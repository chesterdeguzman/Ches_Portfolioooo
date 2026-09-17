const gate = document.getElementById('songGate');
const audio = document.getElementById('introAudio');
const playBtn = document.getElementById('playIntro');
const progressWrap = document.getElementById('introProgress');
const progressBar = document.getElementById('progressBar');
const audioState = document.getElementById('audioState');
const audioTime = document.getElementById('audioTime');
const audioNote = document.getElementById('audioNote');
const finishSongBtn = document.getElementById('finishSong');
const access = document.getElementById('accessTransition');
const site = document.getElementById('siteShell');

const fmt = (seconds) => {
  if (!Number.isFinite(seconds)) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
};

async function startSong() {
  try {
    progressWrap.hidden = false;
    finishSongBtn.hidden = false;
    playBtn.classList.add('playing');
    playBtn.querySelector('b').textContent = '❚❚';
    playBtn.querySelector('span').textContent = 'Playing “Puwede Ka Ba?”';
    audioState.textContent = 'playing';
    audioNote.textContent = 'Stay here for the song. The page unlocks when it ends ♡';
    await audio.play();
  } catch (err) {
    playBtn.classList.remove('playing');
    playBtn.querySelector('b').textContent = '▶';
    playBtn.querySelector('span').textContent = 'Try playing again';
    audioState.textContent = 'audio blocked';
    audioNote.textContent = 'Your browser blocked playback. Tap the button again.';
  }
}

playBtn.addEventListener('click', () => {
  if (audio.paused) startSong();
  else {
    audio.pause();
    playBtn.classList.remove('playing');
    playBtn.querySelector('b').textContent = '▶';
    playBtn.querySelector('span').textContent = 'Resume “Puwede Ka Ba?”';
    audioState.textContent = 'paused';
  }
});

audio.addEventListener('play', () => { audioState.textContent = 'playing'; });
audio.addEventListener('timeupdate', () => {
  audioTime.textContent = fmt(audio.currentTime);
  if (audio.duration) progressBar.style.width = `${(audio.currentTime / audio.duration) * 100}%`;
});
audio.addEventListener('error', () => {
  audioState.textContent = 'audio unavailable';
  audioNote.textContent = 'The song file could not be loaded. Make sure assets/puwede-ka-ba.mp3 stays with this website.';
});

audio.addEventListener('ended', unlockSequence);

finishSongBtn.addEventListener('click', () => {
  audio.pause();
  unlockSequence();
});

let isUnlocking = false;
function unlockSequence() {
  if (isUnlocking) return;
  isUnlocking = true;
  gate.classList.add('hide');
  setTimeout(() => {
    gate.style.display = 'none';
    access.classList.add('show');
    access.setAttribute('aria-hidden', 'false');
    const lines = [...document.querySelectorAll('.access-line')];
    lines.forEach((line, i) => setTimeout(() => line.classList.add('visible'), 550 + i * 650));
    setTimeout(() => {
      access.classList.remove('show');
      access.setAttribute('aria-hidden', 'true');
      site.classList.add('unlocked');
      site.setAttribute('aria-hidden', 'false');
      document.body.classList.remove('site-locked');
      initReveals();
      window.scrollTo({ top: 0, behavior: 'instant' });
    }, 3100);
  }, 650);
}

function initReveals() {
  const revealEls = document.querySelectorAll('.reveal:not(.visible)');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach((el) => observer.observe(el));
}

document.getElementById('beginBtn').addEventListener('click', () => {
  document.getElementById('letter').scrollIntoView({ behavior: 'smooth' });
});


// Original Ches-site interactions after direct merge
function toggleOriginalMenu() {
  const root = document.querySelector('.original-site-embedded');
  if (!root) return;
  const menu = root.querySelector('.menu-links');
  const icon = root.querySelector('.hamburger-icon');
  if (menu) menu.classList.toggle('open');
  if (icon) icon.classList.toggle('open');
}

function toggleOriginalReadMore() {
  const root = document.querySelector('.original-site-embedded');
  if (!root) return;
  const content = root.querySelector('#more-about');
  const button = root.querySelector('.read-more-btn');
  if (!content || !button) return;
  content.classList.toggle('show');
  button.innerText = content.classList.contains('show') ? 'Show Less ♡' : 'Read More ♡';
}
