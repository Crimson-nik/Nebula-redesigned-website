/* =============================================
   NEBULAA.AI REDESIGNED — JavaScript
   Handles: navbar, modals, scroll animations, mobile menu
   ============================================= */

// ————————————————————————————————————
// NAVBAR — Scroll effect
// ————————————————————————————————————
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ————————————————————————————————————
// MOBILE MENU
// ————————————————————————————————————
const mobileToggle = document.getElementById('mobileToggle');
const navLinks = document.getElementById('navLinks');

mobileToggle.addEventListener('click', () => {
  navLinks.classList.toggle('mobile-open');
});

// Close mobile menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('mobile-open');
  });
});

// ————————————————————————————————————
// SCROLL REVEAL ANIMATIONS (Enhanced)
// ————————————————————————————————————
const revealSelectors = '.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-blur, .reveal-glow, .reveal-rotate, .reveal-flip';
const revealElements = document.querySelectorAll(revealSelectors);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// Stagger children: when a stagger-children container enters view,
// add 'visible' class to each direct child with a small delay
const staggerContainers = document.querySelectorAll('.stagger-children');
const staggerObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const children = entry.target.children;
      Array.from(children).forEach((child, i) => {
        setTimeout(() => {
          child.classList.add('visible');
        }, i * 100);
      });
      staggerObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
});

staggerContainers.forEach(el => staggerObserver.observe(el));

// ————————————————————————————————————
// SMOOTH SCROLL for anchor links
// ————————————————————————————————————
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ————————————————————————————————————
// TRIAL MODAL — Simple email sign-up (FIX for complex sign-up)
// ————————————————————————————————————
const trialModal = document.getElementById('trialModal');
const trialStep1 = document.getElementById('trialStep1');
const trialStep2 = document.getElementById('trialStep2');
const trialStep1Indicator = document.getElementById('trialStep1Indicator');
const trialStep2Indicator = document.getElementById('trialStep2Indicator');

function openTrialModal() {
  trialModal.classList.add('active');
  document.body.style.overflow = 'hidden';
  // Reset to step 1
  trialStep1.style.display = 'block';
  trialStep2.style.display = 'none';
  trialStep1Indicator.classList.add('active');
  trialStep2Indicator.classList.remove('active');
}

function closeTrialModal() {
  trialModal.classList.remove('active');
  document.body.style.overflow = '';
}

function handleTrialStep1(e) {
  e.preventDefault();
  // Move to step 2 — optional company details
  trialStep1.style.display = 'none';
  trialStep2.style.display = 'block';
  trialStep1Indicator.classList.remove('active');
  trialStep2Indicator.classList.add('active');
}

function handleTrialStep2(e) {
  e.preventDefault();
  showSuccessMessage('Account created! Redirecting to dashboard...');
  setTimeout(() => closeTrialModal(), 2000);
}

function skipTrialStep2() {
  showSuccessMessage('Account created! Redirecting to dashboard...');
  setTimeout(() => closeTrialModal(), 2000);
}

// ————————————————————————————————————
// DEMO MODAL — Book a Demo
// ————————————————————————————————————
const demoModal = document.getElementById('demoModal');

function openDemoModal() {
  demoModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeDemoModal() {
  demoModal.classList.remove('active');
  document.body.style.overflow = '';
}

function handleDemoSubmit(e) {
  e.preventDefault();
  showSuccessMessage('Demo request submitted! We\'ll be in touch within 24 hours.');
  setTimeout(() => closeDemoModal(), 2000);
}

// ————————————————————————————————————
// QUICK START FORM (footer CTA)
// ————————————————————————————————————
function handleQuickStart(e) {
  e.preventDefault();
  const email = document.getElementById('ctaEmail').value;
  if (email) {
    // Pre-fill trial modal email and open it
    document.getElementById('trialEmail').value = email;
    openTrialModal();
  }
}

// ————————————————————————————————————
// SUCCESS MESSAGE TOAST
// ————————————————————————————————————
function showSuccessMessage(message) {
  // Remove existing toast if any
  const existing = document.querySelector('.success-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'success-toast';
  toast.innerHTML = `<span>✅</span> ${message}`;
  toast.style.cssText = `
    position: fixed;
    bottom: 32px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(16, 185, 129, 0.15);
    border: 1px solid rgba(16, 185, 129, 0.3);
    color: #10b981;
    padding: 14px 28px;
    border-radius: 9999px;
    font-size: 0.9rem;
    font-weight: 600;
    font-family: 'Inter', sans-serif;
    z-index: 3000;
    display: flex;
    align-items: center;
    gap: 8px;
    animation: toastIn 0.4s ease;
    backdrop-filter: blur(12px);
  `;
  document.body.appendChild(toast);

  // Add animation keyframes
  if (!document.getElementById('toastStyles')) {
    const style = document.createElement('style');
    style.id = 'toastStyles';
    style.textContent = `
      @keyframes toastIn {
        from { opacity: 0; transform: translateX(-50%) translateY(20px); }
        to { opacity: 1; transform: translateX(-50%) translateY(0); }
      }
    `;
    document.head.appendChild(style);
  }

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ————————————————————————————————————
// CLOSE MODALS on overlay click
// ————————————————————————————————————
trialModal.addEventListener('click', (e) => {
  if (e.target === trialModal) closeTrialModal();
});

demoModal.addEventListener('click', (e) => {
  if (e.target === demoModal) closeDemoModal();
});

// Close modals on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeTrialModal();
    closeDemoModal();
  }
});

// ————————————————————————————————————
// COUNTER ANIMATION for metrics
// ————————————————————————————————————
function animateCounters() {
  const counters = document.querySelectorAll('.metric-value');
  counters.forEach(counter => {
    const text = counter.textContent;
    // Only animate if it contains a number
    const match = text.match(/(\d+)/);
    if (!match) return;

    const target = parseInt(match[1]);
    const suffix = text.replace(match[1], '');
    let current = 0;
    const duration = 2000;
    const step = Math.ceil(target / (duration / 16));

    const updateCounter = () => {
      current += step;
      if (current >= target) {
        counter.textContent = text; // restore original
        return;
      }
      counter.textContent = current + suffix;
      requestAnimationFrame(updateCounter);
    };

    updateCounter();
  });
}

// Trigger counter animation when section is visible
const metricsRow = document.querySelector('.metrics-row');
if (metricsRow) {
  const metricsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        metricsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  metricsObserver.observe(metricsRow);
}
