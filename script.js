/* ============================================================
   RISHI SHASHIKANTH — JARVIS PORTFOLIO
   script.js
   ============================================================ */

/* ---------- Navbar scroll effect ---------- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

/* ---------- Mobile hamburger ---------- */
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobile-nav');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileNav.classList.toggle('open');
});

mobileNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileNav.classList.remove('open');
  });
});

/* ---------- Active nav on scroll ---------- */
const sections   = document.querySelectorAll('section[id]');
const navLinks   = document.querySelectorAll('.nav-links a, .nav-mobile a');

const observerNav = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => observerNav.observe(s));

/* ---------- Typewriter ---------- */
const roles = [
  'AI/ML Engineer',
  'Full-Stack Developer',
  'Automation Builder',
  'GenAI Enthusiast',
  'Director @ AccoFAI LLP',
];

let roleIdx = 0, charIdx = 0, deleting = false;
const typeEl = document.getElementById('typewriter');

function typeLoop() {
  const current = roles[roleIdx];
  if (!deleting && charIdx <= current.length) {
    typeEl.textContent = current.slice(0, charIdx++);
    setTimeout(typeLoop, 80);
  } else if (!deleting && charIdx > current.length) {
    deleting = true;
    setTimeout(typeLoop, 2000);
  } else if (deleting && charIdx > 0) {
    typeEl.textContent = current.slice(0, --charIdx);
    setTimeout(typeLoop, 40);
  } else {
    deleting = false;
    roleIdx  = (roleIdx + 1) % roles.length;
    setTimeout(typeLoop, 300);
  }
}
typeLoop();

/* ---------- Skill bars (IntersectionObserver) ---------- */
const skillObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
        bar.style.width = bar.dataset.pct + '%';
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-group').forEach(g => skillObserver.observe(g));

/* ---------- Copy email ---------- */
const emailRow = document.getElementById('email-row');
const copyHint = document.getElementById('copy-hint');
if (emailRow) {
  emailRow.addEventListener('click', () => {
    navigator.clipboard.writeText('rishi.s1575@gmail.com').then(() => {
      copyHint.textContent = '✓ COPIED';
      copyHint.style.color = 'var(--green)';
      setTimeout(() => {
        copyHint.textContent = '↗';
        copyHint.style.color = '';
      }, 2000);
    });
  });
}

/* ---------- Smooth scroll for all anchor links ---------- */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

/* ---------- Theme Toggle ---------- */
const themeToggle = document.getElementById('theme-toggle');
const themeIcon   = document.getElementById('theme-icon');
const themeLabel  = document.getElementById('theme-label');

function applyTheme(warm) {
  if (warm) {
    document.body.setAttribute('data-theme', 'warm');
    themeIcon.textContent  = '🌙';
    themeLabel.textContent = 'DARK';
  } else {
    document.body.removeAttribute('data-theme');
    themeIcon.textContent  = '☀️';
    themeLabel.textContent = 'WARM';
  }
}

// Load saved preference
const savedTheme = localStorage.getItem('portfolio-theme');
applyTheme(savedTheme === 'warm');

themeToggle.addEventListener('click', () => {
  const isWarm = document.body.getAttribute('data-theme') === 'warm';
  applyTheme(!isWarm);
  localStorage.setItem('portfolio-theme', !isWarm ? 'warm' : 'dark');
});

/* ---------- Fade-in on scroll (sections) ---------- */
const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.fade-in').forEach(el => {
  fadeObserver.observe(el);
});
