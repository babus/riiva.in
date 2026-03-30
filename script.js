document.addEventListener('DOMContentLoaded', () => {

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
      glow.style.transform = 'translate(' + (gx - 200) + 'px,' + (gy - 200) + 'px)';
      requestAnimationFrame(loop);
    })();
  } else {
    const glow = document.getElementById('cursor-glow');
    if (glow) glow.style.display = 'none';
  }

  // ===== Countdown =====
  // April 15, 2026 00:00:00 IST = April 14, 2026 18:30:00 UTC
  var launchTime = Date.UTC(2026, 3, 14, 18, 30, 0);

  var dEl = document.getElementById('days');
  var hEl = document.getElementById('hours');
  var mEl = document.getElementById('minutes');
  var sEl = document.getElementById('seconds');

  function pad(n) { return n < 10 ? '0' + n : '' + n; }

  function tick() {
    var diff = launchTime - Date.now();
    if (diff <= 0) {
      dEl.textContent = '00';
      hEl.textContent = '00';
      mEl.textContent = '00';
      sEl.textContent = '00';
      return;
    }
    dEl.textContent = pad(Math.floor(diff / 86400000));
    hEl.textContent = pad(Math.floor((diff / 3600000) % 24));
    mEl.textContent = pad(Math.floor((diff / 60000) % 60));
    sEl.textContent = pad(Math.floor((diff / 1000) % 60));
  }

  tick();
  setInterval(tick, 1000);

  // ===== Rotating Words =====
  var rotateEl = document.getElementById('rotate-text');
  var subtitleEl = document.getElementById('rotate-subtitle');

  if (rotateEl && subtitleEl) {
    var phrases = ['Coming Soon', 'Almost There', 'Stay Tuned'];
    var subtitles = [
      'Where timeless elegance meets you.',
      'Something beautiful is on its way.',
      'A new era of effortless beauty begins soon.'
    ];
    var phraseIndex = 0;
    var rotating = false;

    setInterval(function() {
      if (rotating) return;
      rotating = true;
      rotateEl.style.opacity = '0';
      subtitleEl.style.opacity = '0';
      setTimeout(function() {
        phraseIndex = (phraseIndex + 1) % phrases.length;
        rotateEl.textContent = phrases[phraseIndex];
        subtitleEl.textContent = subtitles[phraseIndex];
        rotateEl.style.opacity = '1';
        subtitleEl.style.opacity = '0.65';
        rotating = false;
      }, 800);
    }, 5000);
  }

  // ===== Email Form =====
  var form = document.getElementById('notify-form');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      var btnText = e.target.querySelector('.btn-text');
      var input = e.target.querySelector('input');
      var orig = btnText.textContent;
      btnText.textContent = 'Thank you!';
      setTimeout(function() { btnText.textContent = orig; input.value = ''; }, 3000);
    });
  }

  // ===== Glass card tilt (desktop only) =====
  if (window.matchMedia('(pointer: fine)').matches) {
    var card = document.querySelector('.glass-card');

    card.addEventListener('mousemove', function(e) {
      var r = card.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5;
      var y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = 'perspective(800px) rotateY(' + (x * 3) + 'deg) rotateX(' + (-y * 3) + 'deg)';
    });

    card.addEventListener('mouseleave', function() {
      card.style.transition = 'transform 0.4s ease-out';
      card.style.transform = '';
      setTimeout(function() { card.style.transition = ''; }, 400);
    });
  }

});
