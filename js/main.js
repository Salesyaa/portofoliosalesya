/* ========================================
   PORTOFOLIO SALESYA — Main JS
   🌸 Navbar, Scroll, Reveal, Modal, Form
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollReveal();
  initSkillBars();
  initCertModal();
  initScrollTop();
  initContactForm();
  initActiveNav();
  initHamburger();
});

/* ============================================================
   1. NAVBAR — Scroll effect & hamburger
   ============================================================ */
function initNavbar() {
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });
}

function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');

  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', open);
    hamburger.classList.toggle('is-open', open);

    // Animate hamburger bars
    const bars = hamburger.querySelectorAll('span');
    if (open) {
      bars[0].style.transform = 'translateY(8px) rotate(45deg)';
      bars[1].style.opacity   = '0';
      bars[2].style.transform = 'translateY(-8px) rotate(-45deg)';
    } else {
      bars[0].style.transform = '';
      bars[1].style.opacity   = '';
      bars[2].style.transform = '';
    }
  });

  // Close menu on link click
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.setAttribute('aria-expanded', false);
      hamburger.classList.remove('is-open');
      const bars = hamburger.querySelectorAll('span');
      bars[0].style.transform = '';
      bars[1].style.opacity   = '';
      bars[2].style.transform = '';
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('open');
    }
  });
}

/* ============================================================
   2. ACTIVE NAV LINK on scroll
   ============================================================ */
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, {
    rootMargin: `-${parseInt(getComputedStyle(document.documentElement).getPropertyValue('--navbar-h')) + 20}px 0px -60% 0px`
  });

  sections.forEach(s => observer.observe(s));
}

/* ============================================================
   3. SCROLL REVEAL — Intersection Observer
   ============================================================ */
function initScrollReveal() {
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // animate once
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealEls.forEach(el => observer.observe(el));
}

/* ============================================================
   4. SKILL BARS — Fill on scroll
   ============================================================ */
function initSkillBars() {
  const fills = document.querySelectorAll('.skill-fill');
  if (!fills.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el  = entry.target;
        const pct = el.dataset.pct || '0';
        el.style.width = pct + '%';
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  fills.forEach(f => observer.observe(f));
}

/* ============================================================
   5. CERTIFICATE MODAL / LIGHTBOX
   ============================================================ */
function initCertModal() {
  const modal    = document.getElementById('cert-modal');
  const modalImg = document.getElementById('cert-modal-img');
  const modalTitle = document.getElementById('cert-modal-title');
  const modalSub   = document.getElementById('cert-modal-sub');
  const closeBtn   = document.getElementById('cert-modal-close');
  const backdrop   = document.getElementById('cert-modal-backdrop');

  if (!modal) return;

  // Open
  document.querySelectorAll('.cert-card').forEach(card => {
    card.addEventListener('click', () => {
      const img   = card.dataset.img   || '';
      const title = card.dataset.title || '';
      const sub   = card.dataset.sub   || '';

      modalImg.src        = img;
      modalImg.alt        = title;
      modalTitle.textContent = title;
      modalSub.textContent   = sub;

      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  // Close
  const closeFn = () => {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  };

  closeBtn.addEventListener('click', closeFn);
  backdrop.addEventListener('click', closeFn);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeFn();
  });
}

/* ============================================================
   6. SCROLL TO TOP BUTTON
   ============================================================ */
function initScrollTop() {
  const btn = document.getElementById('scroll-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ============================================================
   7. CONTACT FORM — Simple validation & feedback
   ============================================================ */

function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;

    const name = form.querySelector('#cf-name').value.trim();
    const email = form.querySelector('#cf-email').value.trim();
    const msg = form.querySelector('#cf-message').value.trim();

    if (!name || !email || !msg) {
      showToast('Harap lengkapi semua field 🌸', 'warn');
      return;
    }

    if (!isValidEmail(email)) {
      showToast('Email tidak valid 😅', 'warn');
      return;
    }

    btn.disabled = true;
    btn.innerHTML = '⏳ Mengirim...';

    try {
      const response = await fetch(
        'https://formspree.io/f/xeaaajow',
        {
          method: 'POST',
          body: new FormData(form),
          headers: {
            Accept: 'application/json'
          }
        }
      );

      const result = await response.json();

      if (!response.ok) {
        const errorMessage = result.errors
          ? result.errors.map(err => err.message).join(', ')
          : 'Formspree gagal menerima pesan.';

        throw new Error(errorMessage);
      }

      showToast('Pesan berhasil dikirim! Terima kasih 💖', 'success');
      form.reset();

    } catch (error) {
      console.error('Formspree error:', error);

      showToast(
        'Pesan gagal dikirim. Silakan coba lagi.',
        'warn'
      );

    } finally {
      btn.disabled = false;
      btn.innerHTML = originalText;
    }
  });
}


function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* ============================================================
   8. TOAST NOTIFICATION
   ============================================================ */
function showToast(message, type = 'success') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;

  Object.assign(toast.style, {
    position:     'fixed',
    bottom:       '30px',
    left:         '50%',
    transform:    'translateX(-50%) translateY(20px)',
    background:   type === 'success' ? 'var(--gradient-pink)' : '#FFB347',
    color:        'white',
    padding:      '12px 24px',
    borderRadius: 'var(--radius-full)',
    fontFamily:   'var(--font-body)',
    fontWeight:   '700',
    fontSize:     '0.92rem',
    boxShadow:    'var(--shadow-md)',
    zIndex:       '9999',
    opacity:      '0',
    transition:   'all 0.3s ease',
    whiteSpace:   'nowrap',
  });

  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.style.opacity   = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';
  });

  setTimeout(() => {
    toast.style.opacity   = '0';
    toast.style.transform = 'translateX(-50%) translateY(20px)';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}
