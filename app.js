(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const menuButton = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.mobile-nav');
  const dialog = document.querySelector('.teaser-modal');
  let lastModalTrigger = null;

  function closeMenu(restoreFocus = false) {
    menu.hidden = true;
    menuButton.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
    if (restoreFocus) menuButton.focus();
  }

  menuButton.addEventListener('click', () => {
    const opening = menu.hidden;
    menu.hidden = !opening;
    menuButton.setAttribute('aria-expanded', String(opening));
    document.body.classList.toggle('menu-open', opening);
  });
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => closeMenu()));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !menu.hidden) closeMenu(true);
  });
  window.matchMedia('(min-width: 761px)').addEventListener('change', event => {
    if (event.matches) closeMenu();
  });

  document.querySelectorAll('[data-open-teaser]').forEach(button => {
    button.addEventListener('click', () => {
      lastModalTrigger = button;
      dialog.showModal();
      document.body.style.overflow = 'hidden';
    });
  });
  dialog.querySelector('.modal-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.body.style.overflow = '';
    lastModalTrigger?.focus();
  });

  const gallery = document.querySelector('[data-gallery]');
  const stage = gallery.querySelector('.scene-stage');
  const track = gallery.querySelector('.scene-track');
  const scenes = [...gallery.querySelectorAll('.scene')];
  const previous = gallery.querySelector('[data-scene-prev]');
  const next = gallery.querySelector('[data-scene-next]');
  const current = gallery.querySelector('[data-scene-current]');
  const title = gallery.querySelector('[data-scene-title]');
  const subtitle = gallery.querySelector('[data-scene-subtitle]');
  const status = gallery.querySelector('[data-scene-status]');
  let index = -1;
  let top = 0;
  let distance = 1;
  let width = 0;
  let frame = 0;
  let announcement;
  let touchStart = null;

  function setScene(nextIndex) {
    if (nextIndex === index) return;
    index = nextIndex;
    const scene = scenes[index];
    title.textContent = scene.dataset.title;
    subtitle.textContent = scene.dataset.subtitle;
    current.textContent = String(index + 1).padStart(2, '0');
    previous.disabled = index === 0;
    next.disabled = index === scenes.length - 1;
    scenes.forEach((item, itemIndex) => item.setAttribute('aria-hidden', String(itemIndex !== index)));
    // Preload the next scene before it enters the viewport.
    for (const adjacent of [index - 1, index, index + 1]) {
      if (scenes[adjacent]) scenes[adjacent].querySelector('img').loading = 'eager';
    }
    clearTimeout(announcement);
    announcement = setTimeout(() => {
      status.textContent = 'Cenário ' + (index + 1) + ' de ' + scenes.length + ': ' + scene.dataset.title + ', ' + scene.dataset.subtitle;
    }, 240);
  }

  function draw() {
    frame = 0;
    if (reducedMotion.matches) {
      setScene(Math.max(0, Math.min(scenes.length - 1, Math.round(track.scrollLeft / Math.max(1, width)))));
      return;
    }
    const progress = Math.max(0, Math.min(1, (window.scrollY - top) / distance));
    track.style.transform = 'translate3d(' + (-progress * (scenes.length - 1) * width) + 'px,0,0)';
    setScene(Math.round(progress * (scenes.length - 1)));
  }
  function schedule() {
    if (!frame) frame = requestAnimationFrame(draw);
  }
  function measure() {
    top = gallery.getBoundingClientRect().top + window.scrollY;
    width = stage.clientWidth;
    distance = Math.max(1, gallery.offsetHeight - stage.offsetHeight);
    schedule();
  }
  function configure() {
    document.documentElement.classList.toggle('gallery-enhanced', !reducedMotion.matches);
    track.style.transform = '';
    track.scrollLeft = 0;
    index = -1;
    measure();
  }
  function goToScene(target) {
    const safeIndex = Math.max(0, Math.min(scenes.length - 1, target));
    if (reducedMotion.matches) {
      track.scrollTo({ left: safeIndex * width, behavior: 'instant' });
      setScene(safeIndex);
    } else {
      window.scrollTo({ top: top + safeIndex / (scenes.length - 1) * distance, behavior: 'smooth' });
    }
  }

  previous.addEventListener('click', () => goToScene(index - 1));
  next.addEventListener('click', () => goToScene(index + 1));
  stage.addEventListener('keydown', event => {
    if (event.target.closest('a, button')) return;
    const targets = { ArrowLeft: index - 1, ArrowRight: index + 1, Home: 0, End: scenes.length - 1 };
    if (!(event.key in targets)) return;
    event.preventDefault();
    goToScene(targets[event.key]);
  });
  stage.addEventListener('touchstart', event => {
    if (event.target.closest('a, button')) return;
    touchStart = { x: event.touches[0].clientX, y: event.touches[0].clientY };
  }, { passive: true });
  stage.addEventListener('touchend', event => {
    if (!touchStart || reducedMotion.matches) return;
    const dx = event.changedTouches[0].clientX - touchStart.x;
    const dy = event.changedTouches[0].clientY - touchStart.y;
    if (Math.abs(dx) > 65 && Math.abs(dx) > Math.abs(dy) * 1.5) goToScene(index + (dx < 0 ? 1 : -1));
    touchStart = null;
  }, { passive: true });

  window.addEventListener('scroll', schedule, { passive: true });
  track.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', measure, { passive: true });
  window.addEventListener('load', measure, { once: true });
  reducedMotion.addEventListener('change', configure);
  new ResizeObserver(measure).observe(stage);
  document.fonts.ready.then(measure);
  configure();

  // Progressive enhancement: content and gallery work even if the animation library is unavailable.
  if (window.gsap && !reducedMotion.matches) {
    window.gsap.from('.hero-center > *', { opacity: 0, y: 16, duration: 1, stagger: .12, ease: 'power2.out', clearProps: 'all' });
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        window.gsap.fromTo(entry.target, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: .85, ease: 'power2.out', clearProps: 'all' });
        observer.unobserve(entry.target);
      });
    }, { threshold: .12 });
    document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
    reducedMotion.addEventListener('change', event => {
      if (event.matches) {
        observer.disconnect();
        window.gsap.killTweensOf('.reveal, .hero-center > *');
        window.gsap.set('.reveal, .hero-center > *', { clearProps: 'all' });
      }
    });
  }
})();
