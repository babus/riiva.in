// ===== Cursor Glow (single rAF, throttled) =====
const cursorGlow = document.getElementById('cursor-glow');
let mouseX = 0, mouseY = 0, glowX = 0, glowY = 0;

// Only track mouse on non-touch devices
if (window.matchMedia('(pointer: fine)').matches) {
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }, { passive: true });

  function updateGlow() {
    glowX += (mouseX - glowX) * 0.1;
    glowY += (mouseY - glowY) * 0.1;
    cursorGlow.style.transform = `translate(${glowX - 200}px, ${glowY - 200}px)`;
    requestAnimationFrame(updateGlow);
  }
  updateGlow();
} else {
  cursorGlow.style.display = 'none';
}

// ===== GSAP Entrance Animations =====
const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

tl.to('.logo', {
  opacity: 1,
  y: 0,
  duration: 1,
  delay: 0.3,
})
.to('.logo-tagline', {
  opacity: 1,
  y: 0,
  duration: 0.8,
}, '-=0.5')
.to('.glass-card', {
  opacity: 1,
  y: 0,
  scale: 1,
  duration: 1.2,
  ease: 'power3.out',
}, '-=0.4')
.to('.marquee-section', {
  opacity: 1,
  duration: 0.8,
}, '-=0.4')
.to('.socials', {
  opacity: 1,
  y: 0,
  duration: 0.8,
}, '-=0.4')
.to('.copyright', {
  opacity: 0.5,
  duration: 0.6,
}, '-=0.3');

// ===== Countdown Timer =====
const launchDate = new Date();
launchDate.setDate(launchDate.getDate() + 7);

const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');

function updateCountdown() {
  const diff = launchDate - Date.now();

  if (diff <= 0) {
    daysEl.textContent = '00';
    hoursEl.textContent = '00';
    minutesEl.textContent = '00';
    secondsEl.textContent = '00';
    return;
  }

  daysEl.textContent = String(Math.floor(diff / 86400000)).padStart(2, '0');
  hoursEl.textContent = String(Math.floor((diff / 3600000) % 24)).padStart(2, '0');
  minutesEl.textContent = String(Math.floor((diff / 60000) % 60)).padStart(2, '0');
  secondsEl.textContent = String(Math.floor((diff / 1000) % 60)).padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000);

// ===== Email Form =====
document.getElementById('notify-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = e.target.querySelector('.btn-notify');
  const btnText = btn.querySelector('.btn-text');
  const input = e.target.querySelector('input');
  const originalText = btnText.textContent;

  btnText.textContent = 'Thank you!';

  setTimeout(() => {
    btnText.textContent = originalText;
    input.value = '';
  }, 3000);
});

// ===== Glass card tilt (desktop only, lightweight) =====
if (window.matchMedia('(pointer: fine)').matches) {
  const glassCard = document.querySelector('.glass-card');

  glassCard.addEventListener('mousemove', (e) => {
    const rect = glassCard.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    glassCard.style.transform = `perspective(800px) rotateY(${x * 3}deg) rotateX(${-y * 3}deg)`;
  });

  glassCard.addEventListener('mouseleave', () => {
    glassCard.style.transition = 'transform 0.5s ease-out';
    glassCard.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg)';
    setTimeout(() => { glassCard.style.transition = ''; }, 500);
  });
}
