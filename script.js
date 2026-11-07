/**
 * NovaSphere — Modern Website Interactive Logic
 * Features:
 *  - Light / Dark Mode Toggle with LocalStorage persistence
 *  - Responsive Mobile Navigation Drawer
 *  - Active Section Highlighting on Scroll
 *  - Interactive FAQ Accordion
 *  - Contact Form Validation & Toast Notification
 *  - Auto Footer Year
 */

document.addEventListener('DOMContentLoaded', () => {
  // ----------------------------------------------------
  // 1. Theme Switcher (Dark / Light Mode)
  // ----------------------------------------------------
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlRoot = document.documentElement;

  // Retrieve saved theme or detect system preference
  const savedTheme = localStorage.getItem('novasphere_theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme) {
    htmlRoot.setAttribute('data-theme', savedTheme);
  } else if (prefersDark) {
    htmlRoot.setAttribute('data-theme', 'dark');
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';

      htmlRoot.setAttribute('data-theme', newTheme);
      localStorage.setItem('novasphere_theme', newTheme);
    });
  }

  // ----------------------------------------------------
  // 2. Mobile Hamburger Navigation
  // ----------------------------------------------------
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      mobileToggle.classList.toggle('active');
      mobileToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close menu when clicking on any navigation link
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('open')) {
          navMenu.classList.remove('open');
          mobileToggle.classList.remove('active');
          mobileToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
        if (navMenu.classList.contains('open')) {
          navMenu.classList.remove('open');
          mobileToggle.classList.remove('active');
          mobileToggle.setAttribute('aria-expanded', 'false');
        }
      }
    });
  }

  // ----------------------------------------------------
  // 3. Active Link on Scroll (Intersection Observer)
  // ----------------------------------------------------
  const sections = document.querySelectorAll('section[id]');

  function updateActiveNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const matchingLink = document.querySelector(`.nav-menu a[href*="${sectionId}"]`);

      if (matchingLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          matchingLink.classList.add('active');
        } else {
          matchingLink.classList.remove('active');
        }
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });

  // ----------------------------------------------------
  // 4. Interactive FAQ Accordion
  // ----------------------------------------------------
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach((item) => {
    const questionBtn = item.querySelector('.faq-question');
    const answerPanel = item.querySelector('.faq-answer');

    if (questionBtn && answerPanel) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Optional: Close other open accordion items
        faqItems.forEach((otherItem) => {
          if (otherItem !== item && otherItem.classList.contains('active')) {
            otherItem.classList.remove('active');
            const otherBtn = otherItem.querySelector('.faq-question');
            const otherAnswer = otherItem.querySelector('.faq-answer');
            if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
            if (otherAnswer) otherAnswer.style.maxHeight = null;
          }
        });

        // Toggle current item
        if (isActive) {
          item.classList.remove('active');
          questionBtn.setAttribute('aria-expanded', 'false');
          answerPanel.style.maxHeight = null;
        } else {
          item.classList.add('active');
          questionBtn.setAttribute('aria-expanded', 'true');
          answerPanel.style.maxHeight = answerPanel.scrollHeight + 'px';
        }
      });
    }
  });

  // ----------------------------------------------------
  // 5. Toast Notification Utility
  // ----------------------------------------------------
  const toast = document.getElementById('toast');
  let toastTimeout;

  function showToast(message, duration = 3500) {
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add('show');

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, duration);
  }

  // ----------------------------------------------------
  // 6. Contact Form Validation & Submission
  // ----------------------------------------------------
  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const subjectInput = document.getElementById('subject');
      const messageInput = document.getElementById('message');

      let isValid = true;

      // Helper function for field errors
      function validateField(input, errorId, validatorFn, errorMessage) {
        const errorEl = document.getElementById(errorId);
        const parentGroup = input.closest('.form-group');

        if (!validatorFn(input.value.trim())) {
          if (errorEl) errorEl.textContent = errorMessage;
          if (parentGroup) parentGroup.classList.add('has-error');
          isValid = false;
        } else {
          if (errorEl) errorEl.textContent = '';
          if (parentGroup) parentGroup.classList.remove('has-error');
        }
      }

      // Name validation (min 2 chars)
      validateField(
        nameInput,
        'name-error',
        (val) => val.length >= 2,
        'Please enter at least 2 characters.'
      );

      // Email validation (standard regex)
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      validateField(
        emailInput,
        'email-error',
        (val) => emailRegex.test(val),
        'Please enter a valid email address.'
      );

      // Subject validation (min 3 chars)
      validateField(
        subjectInput,
        'subject-error',
        (val) => val.length >= 3,
        'Please enter a subject (min 3 characters).'
      );

      // Message validation (min 10 chars)
      validateField(
        messageInput,
        'message-error',
        (val) => val.length >= 10,
        'Please write a message with at least 10 characters.'
      );

      if (!isValid) return;

      // Simulate sending state
      if (submitBtn) {
        submitBtn.disabled = true;
        const originalContent = submitBtn.innerHTML;
        submitBtn.innerHTML = `<span>Sending...</span>`;

        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalContent;
          contactForm.reset();
          showToast('🎉 Thank you! Your message has been sent successfully.');
        }, 1000);
      }
    });

    // Real-time error removal when typing
    ['name', 'email', 'subject', 'message'].forEach((fieldId) => {
      const input = document.getElementById(fieldId);
      if (input) {
        input.addEventListener('input', () => {
          const parentGroup = input.closest('.form-group');
          const errorEl = document.getElementById(`${fieldId}-error`);
          if (parentGroup) parentGroup.classList.remove('has-error');
          if (errorEl) errorEl.textContent = '';
        });
      }
    });
  }

  // ----------------------------------------------------
  // 7. Auto-update Current Year
  // ----------------------------------------------------
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});

