// Connection Campout — main.js

// ---- NAV SCROLL BEHAVIOR ----
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
}, { passive: true });

// ---- MOBILE MENU ----
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const mobileClose = document.getElementById('mobile-close');
const mobileLinks = document.querySelectorAll('.mobile-link');

function openMenu() {
  mobileMenu.classList.add('open');
  mobileMenu.removeAttribute('aria-hidden');
  document.body.style.overflow = 'hidden';
}
function closeMenu() {
  mobileMenu.classList.remove('open');
  mobileMenu.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

if (hamburger) hamburger.addEventListener('click', openMenu);
if (mobileClose) mobileClose.addEventListener('click', closeMenu);
mobileLinks.forEach(link => link.addEventListener('click', closeMenu));

// ---- SCROLL REVEAL ----
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

reveals.forEach(el => observer.observe(el));

// ---- EMAIL SIGNUP FORM (mailto) ----
// When someone submits the form, it opens a pre-filled email to somuchhousemusic@gmail.com
// so you receive their address directly in your inbox.

const signupForm = document.getElementById('signup-form');
if (signupForm) {
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = signupForm.querySelector('input[type="email"]');
    const email = emailInput.value.trim();
    if (!email) return;

    // Open mailto — lands in your inbox with their address ready to save
    const subject = encodeURIComponent('Connection Campout — New Signup');
    const body = encodeURIComponent(
      'New email list signup from the website:\n\n' + email + '\n\nAdd this address to your list.'
    );
    window.location.href = `mailto:somuchhousemusic@gmail.com?subject=${subject}&body=${body}`;

    // Show confirmation to the visitor
    showSignupSuccess(signupForm, email);
  });
}

function showSignupSuccess(form, email) {
  form.innerHTML = `
    <p style="
      color: var(--color-primary);
      font-weight: 600;
      font-size: var(--text-base);
      text-align: center;
      padding: var(--space-4) 0;
    ">
      ✓ You're on the list! We'll be in touch at <em>${email}</em>
    </p>`;
}

// ---- APPLICATION FORMS ----
const appForms = document.querySelectorAll('.application-form');
appForms.forEach(form => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const success = form.nextElementSibling;
    if (success && success.classList.contains('form-success')) {
      form.style.display = 'none';
      success.style.display = 'block';
      success.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
});

// ---- ADD REVEAL CLASS TO SECTIONS ----
document.addEventListener('DOMContentLoaded', () => {
  const targets = document.querySelectorAll(
    '.section-header, .exp-card, .info-card, .involve-card, .ticket-card, .lineup-tease, .signup-inner'
  );
  targets.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${(i % 4) * 80}ms`;
  });

  // Re-observe after adding classes
  const newReveals = document.querySelectorAll('.reveal');
  newReveals.forEach(el => observer.observe(el));
});
