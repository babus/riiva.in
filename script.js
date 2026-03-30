// ===== Cursor Glow (desktop only) =====
if (window.matchMedia('(pointer: fine)').matches) {
  const glow = document.getElementById('cursor-glow');
  let mx = 0, my = 0, gx = 0, gy = 0;

  window.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
  }, { passive: true });

  (function loop() {
    gx += (mx - gx) * 0.12;
    gy += (my - gy) * 0.12;
    glow.style.transform = `translate(${gx - 200}px, ${gy - 200}px)`;
    requestAnimationFrame(loop);
  })();
} else {
  document.getElementById('cursor-glow').style.display = 'none';
}

// ===== Countdown =====
// April 15, 2026 00:00:00 IST (UTC+5:30)
const launch = new Date('2026-04-15T00:00:00+05:30');

const d = document.getElementById('days');
const h = document.getElementById('hours');
const m = document.getElementById('minutes');
const s = document.getElementById('seconds');

function tick() {
  const diff = launch - Date.now();
  if (diff <= 0) { d.textContent = h.textContent = m.textContent = s.textContent = '00'; return; }
  d.textContent = String(Math.floor(diff / 86400000)).padStart(2, '0');
  h.textContent = String(Math.floor((diff / 3600000) % 24)).padStart(2, '0');
  m.textContent = String(Math.floor((diff / 60000) % 60)).padStart(2, '0');
  s.textContent = String(Math.floor((diff / 1000) % 60)).padStart(2, '0');
}
tick();
setInterval(tick, 1000);

// ===== Rotating Words =====
const rotateEl = document.getElementById('rotate-text');
const subtitleEl = document.getElementById('rotate-subtitle');

const phrases = ['Coming Soon', 'Almost There', 'Stay Tuned'];
const subtitles = [
  'Where timeless elegance meets you.',
  'Something beautiful is on its way.',
  'A new era of effortless beauty begins soon.'
];
let phraseIndex = 0;

setInterval(() => {
  rotateEl.style.opacity = '0';
  subtitleEl.style.opacity = '0';
  setTimeout(() => {
    phraseIndex = (phraseIndex + 1) % phrases.length;
    rotateEl.textContent = phrases[phraseIndex];
    subtitleEl.textContent = subtitles[phraseIndex];
    rotateEl.style.opacity = '1';
    subtitleEl.style.opacity = '0.65';
  }, 800);
}, 5000);

// ===== Email Form =====
document.getElementById('notify-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const btnText = e.target.querySelector('.btn-text');
  const input = e.target.querySelector('input');
  const orig = btnText.textContent;
  btnText.textContent = 'Thank you!';
  setTimeout(() => { btnText.textContent = orig; input.value = ''; }, 3000);
});

// ===== Glass card tilt (desktop only) =====
if (window.matchMedia('(pointer: fine)').matches) {
  const card = document.querySelector('.glass-card');

  card.addEventListener('mousemove', (e) => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `perspective(800px) rotateY(${x * 3}deg) rotateX(${-y * 3}deg)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transition = 'transform 0.4s ease-out';
    card.style.transform = '';
    setTimeout(() => { card.style.transition = ''; }, 400);
  });
}
