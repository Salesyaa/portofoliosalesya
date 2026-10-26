/* ========================================
   PORTOFOLIO SALESYA — Typewriter JS
   ✍️ Animated typewriter text effect
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  const el = document.getElementById('typewriter-text');
  if (!el) return;

  // Get phrases from data attribute, or use defaults
  const phrasesAttr = el.dataset.phrases;
  const phrases = phrasesAttr
    ? JSON.parse(phrasesAttr)
    : [
        'Mahasiswi Aktif 📚',
        'UI/UX Enthusiast 🎨',
        'Content Creator ✨',
        'Lifelong Learner 🌸',
      ];

  let phraseIdx = 0;
  let charIdx   = 0;
  let isDeleting = false;
  let pauseTimer = null;

  const TYPING_SPEED   = 80;   // ms per char (typing)
  const DELETING_SPEED = 45;   // ms per char (deleting)
  const PAUSE_END      = 1800; // ms pause at end of phrase
  const PAUSE_START    = 300;  // ms pause before next phrase

  function type() {
    const currentPhrase = phrases[phraseIdx];

    if (!isDeleting) {
      // Typing
      charIdx++;
      el.textContent = currentPhrase.substring(0, charIdx);

      if (charIdx === currentPhrase.length) {
        // Full phrase typed → pause then delete
        isDeleting = true;
        pauseTimer = setTimeout(type, PAUSE_END);
        return;
      }

      setTimeout(type, TYPING_SPEED);
    } else {
      // Deleting
      charIdx--;
      el.textContent = currentPhrase.substring(0, charIdx);

      if (charIdx === 0) {
        // Fully deleted → next phrase
        isDeleting = false;
        phraseIdx  = (phraseIdx + 1) % phrases.length;
        setTimeout(type, PAUSE_START);
        return;
      }

      setTimeout(type, DELETING_SPEED);
    }
  }

  // Start after a short delay
  setTimeout(type, 600);
});
