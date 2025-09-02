(function () {
  const slides = Array.from(document.querySelectorAll('.slide'));
  const dots = Array.from(document.querySelectorAll('.dot'));
  const prev = document.querySelector('.prev');
  const next = document.querySelector('.next');
  const slider = document.querySelector('.slider');

  let index = 0;
  let timer = null;
  const INTERVAL = 5000; // 5s

  function show(i) {
    slides[index].classList.remove('active');
    dots[index].classList.remove('active');
    index = (i + slides.length) % slides.length;
    slides[index].classList.add('active');
    dots[index].classList.add('active');
  }

  function play() {
    stop();
    timer = setInterval(() => show(index + 1), INTERVAL);
  }

  function stop() {
    if (timer) clearInterval(timer);
    timer = null;
  }

  prev.addEventListener('click', () => { show(index - 1); play(); });
  next.addEventListener('click', () => { show(index + 1); play(); });
  dots.forEach((d, i) => d.addEventListener('click', () => { show(i); play(); }));

  // Pause on hover
  slider.addEventListener('mouseenter', stop);
  slider.addEventListener('mouseleave', play);

  // Touch swipe
  let startX = 0;
  slider.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; stop(); }, {passive: true});
  slider.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 50) {
      if (dx < 0) show(index + 1);
      else show(index - 1);
    }
    play();
  });

  // Start autoplay
  play();
})();