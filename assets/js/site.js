document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('[data-nav-toggle]');
  const navLinks = document.querySelector('[data-nav-links]');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('show');
      navToggle.setAttribute('aria-expanded', navLinks.classList.contains('show') ? 'true' : 'false');
    });

    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => navLinks.classList.remove('show'));
    });
  }

  document.querySelectorAll('.faq-btn').forEach((button) => {
    button.addEventListener('click', () => {
      const item = button.closest('.faq-item');
      const content = item.querySelector('.faq-content');
      const isOpen = item.classList.contains('open');

      item.classList.toggle('open', !isOpen);
      button.setAttribute('aria-expanded', String(!isOpen));
      if (content) {
        content.hidden = isOpen;
      }
    });
  });

  const track = document.querySelector('[data-slider-track]');
  const dots = Array.from(document.querySelectorAll('[data-slide-dot]'));
  if (track && dots.length) {
    let current = 0;

    const setSlide = (index) => {
      current = index;
      track.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
        dot.setAttribute('aria-current', i === index ? 'true' : 'false');
      });
    };

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => setSlide(index));
    });

    setInterval(() => {
      setSlide((current + 1) % dots.length);
    }, 6000);
  }

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealItems.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14 });

    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('visible'));
  }

  const form = document.querySelector('#contact-form');
  const status = document.querySelector('#form-status');
  if (form) {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      if (status) {
        status.textContent = 'Submitting your request...';
      }

      const gotcha = form.querySelector('input[name="_gotcha"]');
      if (gotcha && gotcha.value) {
        if (status) {
          status.textContent = 'Submission blocked.';
        }
        return;
      }

      try {
        const payload = new FormData(form);
        const response = await fetch(form.action, {
          method: form.method || 'POST',
          headers: { Accept: 'application/json' },
          body: payload,
        });

        if (response.ok) {
          form.reset();
          if (status) {
            status.textContent = 'Thank you. We received your request and will contact you shortly.';
          }
        } else {
          if (status) {
            status.textContent = 'Unable to submit right now. Please call or text for immediate service.';
          }
        }
      } catch (error) {
        if (status) {
          status.textContent = 'Network error. Please call or text for immediate service.';
        }
      }
    });
  }
});
