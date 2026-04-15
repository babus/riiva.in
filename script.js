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

  // ===== Email Form =====
  var form = document.getElementById('notify-form');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      var btnText = e.target.querySelector('.btn-text');
      var input = e.target.querySelector('input');
      var email = input.value.trim();
      if (!email) return;

      btnText.textContent = 'Sending...';

      fetch('https://script.google.com/macros/s/AKfycbyGXzz_BbNIl5jklBm9QAQaguXgMDQq0tFwEOvWnglBYbIZfg1QvnQprnt1OpoJDq40/exec', {
        method: 'POST',
        body: JSON.stringify({ email: email })
      })
      .then(function() {
        btnText.textContent = 'Thank you!';
        input.value = '';
        setTimeout(function() { btnText.textContent = 'Subscribe'; }, 3000);
      })
      .catch(function() {
        btnText.textContent = 'Try again';
        setTimeout(function() { btnText.textContent = 'Subscribe'; }, 3000);
      });
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
