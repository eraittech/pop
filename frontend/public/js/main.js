/* Hey Pop Chips — Site JS
   Vanilla JS for animations, partials, mobile nav, etc. */

(function () {
  'use strict';

  // ---- Partial includes (header/footer) ----
  async function loadPartials() {
    const nodes = document.querySelectorAll('[data-include]');
    await Promise.all(Array.from(nodes).map(async (el) => {
      const name = el.getAttribute('data-include');
      try {
        const res = await fetch('/partials/' + name + '.html');
        const html = await res.text();
        el.outerHTML = html;
      } catch (e) {
        console.warn('Partial load failed:', name, e);
      }
    }));
    // After header/footer injected, wire up interactive bits.
    initHeader();
    initMobileNav();
    initBackToTop();
    initNewsletterFooter();
    // Re-run reveal observer to pick up newly added .reveal elements
    initReveal();
  }

  // ---------- Header ----------
  function initHeader() {
    const header = document.querySelector('.site-header');
    if (!header) return;
    const onScroll = () => {
      if (window.scrollY > 40) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    // Mark active link by pathname
    const path = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
    document.querySelectorAll('.nav-main a, .mobile-drawer a').forEach((a) => {
      const href = (a.getAttribute('href') || '').toLowerCase();
      if (href === path || (path === '' && href === 'index.html')) a.classList.add('active');
    });
  }

  // ---------- Mobile drawer ----------
  function initMobileNav() {
    const openBtn = document.querySelector('[data-testid="mobile-menu-open"]');
    const closeBtn = document.querySelector('[data-testid="mobile-menu-close"]');
    const drawer = document.querySelector('.mobile-drawer');
    const overlay = document.querySelector('.drawer-overlay');
    if (!openBtn || !drawer) return;
    const open = () => { drawer.classList.add('open'); overlay.classList.add('open'); document.body.style.overflow = 'hidden'; };
    const close = () => { drawer.classList.remove('open'); overlay.classList.remove('open'); document.body.style.overflow = ''; };
    openBtn.addEventListener('click', open);
    closeBtn && closeBtn.addEventListener('click', close);
    overlay && overlay.addEventListener('click', close);
    drawer.querySelectorAll('a').forEach((a) => a.addEventListener('click', close));
  }

  // ---------- Back to top ----------
  function initBackToTop() {
    const btn = document.querySelector('[data-testid="back-to-top"]');
    if (!btn) return;
    const onScroll = () => btn.classList.toggle('visible', window.scrollY > 400);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // ---------- Newsletter (footer) ----------
  function initNewsletterFooter() {
    document.querySelectorAll('form[data-testid="newsletter-form"]').forEach((form) => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = form.querySelector('input[type="email"]').value.trim();
        if (!email) return;
        const msg = form.querySelector('[data-testid="newsletter-status"]');
        if (msg) {
          msg.textContent = 'You’re in! Welcome to the Pop crew 🎉';
          msg.style.color = '#FFD600';
        }
        form.reset();
      });
    });
  }

  // ---------- Cookie banner ----------
  function initCookies() {
    const banner = document.querySelector('[data-testid="cookie-banner"]');
    if (!banner) return;
    if (localStorage.getItem('hpc_cookie_ok')) return;
    setTimeout(() => banner.classList.add('visible'), 1500);
    const ok = banner.querySelector('[data-testid="cookie-accept"]');
    ok && ok.addEventListener('click', () => {
      localStorage.setItem('hpc_cookie_ok', '1');
      banner.classList.remove('visible');
    });
  }

  // ---------- Loader ----------
  function initLoader() {
    const loader = document.querySelector('.page-loader');
    if (!loader) return;
    window.addEventListener('load', () => {
      setTimeout(() => loader.classList.add('hidden'), 400);
    });
  }

  // ---------- Scroll reveal (AOS-lite) ----------
  function initReveal() {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    document.querySelectorAll('.reveal:not(.is-visible)').forEach((el) => io.observe(el));
  }

  // ---------- Counter animation ----------
  function initCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    if (!counters.length) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseFloat(el.dataset.counter);
        const suffix = el.dataset.suffix || '';
        const duration = 1400;
        const start = performance.now();
        const tick = (now) => {
          const p = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          const val = target * eased;
          el.textContent = (target % 1 === 0 ? Math.round(val) : val.toFixed(1)) + suffix;
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        io.unobserve(el);
      });
    }, { threshold: 0.4 });
    counters.forEach((c) => io.observe(c));
  }

  // ---------- Init Swiper carousels ----------
  function initSwipers() {
    if (typeof Swiper === 'undefined') return;
    document.querySelectorAll('.swiper.testimonials-swiper').forEach((el) => {
      new Swiper(el, {
        slidesPerView: 1,
        spaceBetween: 24,
        pagination: { el: '.swiper-pagination', clickable: true },
        autoplay: { delay: 5000, disableOnInteraction: false },
        breakpoints: {
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        },
      });
    });
    document.querySelectorAll('.swiper.products-swiper').forEach((el) => {
      new Swiper(el, {
        slidesPerView: 1.1,
        spaceBetween: 24,
        pagination: { el: '.swiper-pagination', clickable: true },
        breakpoints: {
          640: { slidesPerView: 2.2 },
          1024: { slidesPerView: 3.2 },
        },
      });
    });
  }

  // ---------- GSAP enhancements (optional, no errors if absent) ----------
  function initGsap() {
    if (typeof gsap === 'undefined') return;
    if (window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

    // Hero floating chips parallax
    document.querySelectorAll('.hero-chip').forEach((el, i) => {
      gsap.to(el, {
        y: '+=18',
        rotate: '+=4',
        duration: 3 + i * 0.4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    });

    // Section heading reveals
    gsap.utils.toArray('.sec-head').forEach((sec) => {
      gsap.from(sec.children, {
        y: 30, opacity: 0, duration: 0.8, stagger: 0.08,
        scrollTrigger: { trigger: sec, start: 'top 80%' },
      });
    });
  }

  // ---------- Boot ----------
  document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    loadPartials();
    initReveal();
    initCounters();
    initSwipers();
    initGsap();
    initCookies();
  });
})();
