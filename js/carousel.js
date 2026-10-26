/* ========================================
   PORTOFOLIO SALESYA — Carousel JS
   📸 Image carousel for experience cards
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  initAllCarousels();
});

function initAllCarousels() {
  const carousels = document.querySelectorAll('.exp-carousel');

  carousels.forEach(carousel => {
    const track  = carousel.querySelector('.carousel-track');
    const slides = carousel.querySelectorAll('.carousel-slide');
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');
    const dotsWrap = carousel.querySelector('.carousel-dots');

    if (!track || slides.length === 0) return;

    let current = 0;
    let autoTimer = null;
    const total = slides.length;

    // Create dots
    dotsWrap.innerHTML = '';
    const dots = [];
    for (let i = 0; i < total; i++) {
      const dot = document.createElement('button');
      dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', `Slide ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
      dots.push(dot);
    }

    function goTo(index) {
      // Clamp / wrap
      current = ((index % total) + total) % total;

      // Move track
      track.style.transform = `translateX(-${current * 100}%)`;

      // Update dots
      dots.forEach((d, i) => d.classList.toggle('active', i === current));
    }

    function goNext() { goTo(current + 1); }
    function goPrev() { goTo(current - 1); }

    // Button events
    if (nextBtn) nextBtn.addEventListener('click', () => { goNext(); resetAuto(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { goPrev(); resetAuto(); });

    // Keyboard support when focused
    carousel.setAttribute('tabindex', '0');
    carousel.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { goNext(); resetAuto(); }
      if (e.key === 'ArrowLeft')  { goPrev(); resetAuto(); }
    });

    // Touch / swipe support
    let touchStartX = 0;
    carousel.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });

    carousel.addEventListener('touchend', (e) => {
      const delta = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(delta) > 40) {
        if (delta > 0) goNext();
        else goPrev();
        resetAuto();
      }
    }, { passive: true });

    // Auto-play
    function startAuto() {
      autoTimer = setInterval(goNext, 3500);
    }

    function resetAuto() {
      clearInterval(autoTimer);
      startAuto();
    }

    // Only autoplay if multiple slides
    if (total > 1) {
      startAuto();

      // Pause on hover
      carousel.addEventListener('mouseenter', () => clearInterval(autoTimer));
      carousel.addEventListener('mouseleave', startAuto);
    } else {
      // Hide controls if only 1 slide
      if (prevBtn) prevBtn.style.display = 'none';
      if (nextBtn) nextBtn.style.display = 'none';
      dotsWrap.style.display = 'none';
    }

    // Init first slide
    goTo(0);
  });
}
