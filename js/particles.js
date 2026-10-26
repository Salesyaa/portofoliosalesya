/* ========================================
   PORTOFOLIO SALESYA — Particles JS
   ✨ Floating sparkle/heart particles (Canvas)
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  let animFrame;

  // Resize canvas to fill parent
  function resize() {
    const hero = canvas.parentElement;
    canvas.width  = hero.offsetWidth;
    canvas.height = hero.offsetHeight;
  }

  window.addEventListener('resize', () => {
    resize();
    particles = createParticles();
  }, { passive: true });

  resize();

  // Particle shapes: heart, star, circle, dot
  const SHAPES = ['heart', 'star', 'circle', 'dot'];

  // Color palette (pink + lavender)
  const COLORS = [
    'rgba(255,107,157,',  // pink-400
    'rgba(255,179,198,',  // pink-200
    'rgba(201,184,255,',  // lavender-300
    'rgba(255,143,171,',  // pink-300
    'rgba(255,214,231,',  // pink-100
  ];

  function randomBetween(min, max) {
    return Math.random() * (max - min) + min;
  }

  function createParticle() {
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    return {
      x:      randomBetween(0, canvas.width),
      y:      randomBetween(0, canvas.height),
      size:   randomBetween(6, 18),
      alpha:  randomBetween(0.15, 0.55),
      speed:  randomBetween(0.2, 0.6),
      drift:  randomBetween(-0.3, 0.3),
      rot:    randomBetween(0, Math.PI * 2),
      rotSpd: randomBetween(-0.02, 0.02),
      shape:  SHAPES[Math.floor(Math.random() * SHAPES.length)],
      color,
      pulse:  randomBetween(0, Math.PI * 2),
      pulseSpd: randomBetween(0.02, 0.05),
    };
  }

  function createParticles() {
    const count = Math.max(20, Math.floor((canvas.width * canvas.height) / 14000));
    return Array.from({ length: count }, createParticle);
  }

  particles = createParticles();

  // Draw heart path
  function drawHeart(ctx, x, y, size) {
    const s = size * 0.7;
    ctx.beginPath();
    ctx.moveTo(x, y + s * 0.3);
    ctx.bezierCurveTo(x, y, x - s, y, x - s, y + s * 0.4);
    ctx.bezierCurveTo(x - s, y + s, x, y + s * 1.3, x, y + s * 1.6);
    ctx.bezierCurveTo(x, y + s * 1.3, x + s, y + s, x + s, y + s * 0.4);
    ctx.bezierCurveTo(x + s, y, x, y, x, y + s * 0.3);
    ctx.closePath();
  }

  // Draw 5-point star path
  function drawStar(ctx, x, y, outerR, innerR, points = 5) {
    let angle = -Math.PI / 2;
    const step = (Math.PI * 2) / points;
    ctx.beginPath();
    for (let i = 0; i < points * 2; i++) {
      const r = i % 2 === 0 ? outerR : innerR;
      ctx.lineTo(x + Math.cos(angle) * r, y + Math.sin(angle) * r);
      angle += step / 2;
    }
    ctx.closePath();
  }

  function drawParticle(p) {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);

    // Pulse alpha
    const alpha = p.alpha * (0.6 + 0.4 * Math.sin(p.pulse));
    ctx.fillStyle = p.color + alpha + ')';
    ctx.strokeStyle = 'none';

    switch (p.shape) {
      case 'heart':
        drawHeart(ctx, 0, -p.size / 2, p.size * 0.5);
        ctx.fill();
        break;

      case 'star':
        drawStar(ctx, 0, 0, p.size * 0.55, p.size * 0.22);
        ctx.fill();
        break;

      case 'circle':
        ctx.beginPath();
        ctx.arc(0, 0, p.size * 0.5, 0, Math.PI * 2);
        ctx.fill();
        break;

      case 'dot':
        ctx.beginPath();
        ctx.arc(0, 0, p.size * 0.25, 0, Math.PI * 2);
        ctx.fill();
        break;
    }

    ctx.restore();
  }

  function updateParticle(p) {
    p.y    -= p.speed;
    p.x    += p.drift;
    p.rot  += p.rotSpd;
    p.pulse += p.pulseSpd;

    // Wrap around
    if (p.y + p.size < 0)          p.y = canvas.height + p.size;
    if (p.x + p.size < 0)          p.x = canvas.width  + p.size;
    if (p.x - p.size > canvas.width) p.x = -p.size;
  }

  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      updateParticle(p);
      drawParticle(p);
    });
    animFrame = requestAnimationFrame(loop);
  }

  loop();

  // Pause when tab not visible (performance)
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(animFrame);
    } else {
      loop();
    }
  });
});
