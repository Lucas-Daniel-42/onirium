(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.primary-nav');
  const modal = document.querySelector('[data-teaser-modal]');
  const header = document.querySelector('[data-header]');
  const pointer = document.querySelector('.pointer');

  const characters = [
    {
      id: 'lucci', name: 'Lucci', role: 'Protagonista · A viajante',
      quote: '“Se o caminho desapareceu, talvez nunca tenha sido um caminho.”',
      description: 'Uma presença que atravessa Onirium em busca dos fragmentos que ainda reconhece. Sua história será revelada pela arte, pelo movimento e pelas escolhas do jogador.',
      trait: 'Persistência', link: 'Memória', state: 'Desperta'
    },
    {
      id: 'eco', name: 'Eco', role: 'Entidade · O vestígio',
      quote: '“Algumas vozes continuam falando depois que o sonho acaba.”',
      description: 'Uma figura provisória para demonstrar como novos personagens ocuparão a composição. Nome, retrato, descrição e atributos podem ser substituídos em um único bloco.',
      trait: 'Intuição', link: 'Silêncio', state: 'Latente'
    },
    {
      id: 'vigia', name: 'Vigia', role: 'Guardião · O limiar',
      quote: '“Toda porta se lembra de quem decidiu atravessá-la.”',
      description: 'Uma presença entre mundos, apresentada aqui como conteúdo demonstrativo. A interface foi preparada para receber a arte e a narrativa definitivas do projeto.',
      trait: 'Vigilância', link: 'Portal', state: 'Desconhecido'
    }
  ];
  let activeCharacter = 0;

  menuButton?.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!open));
    nav?.classList.toggle('is-open', !open);
  });

  nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    menuButton?.setAttribute('aria-expanded', 'false');
  }));

  document.querySelector('[data-open-teaser]')?.addEventListener('click', () => modal?.showModal());
  document.querySelector('[data-close-teaser]')?.addEventListener('click', () => modal?.close());
  modal?.addEventListener('click', (event) => {
    if (event.target === modal) modal.close();
  });

  const tabs = [...document.querySelectorAll('[data-character]')];
  const characterFields = {
    name: document.querySelector('[data-character-name]'),
    role: document.querySelector('[data-character-role]'),
    quote: document.querySelector('[data-character-quote]'),
    description: document.querySelector('[data-character-description]'),
    trait: document.querySelector('[data-character-trait]'),
    link: document.querySelector('[data-character-link]'),
    state: document.querySelector('[data-character-state]'),
    current: document.querySelector('[data-character-current]')
  };

  const renderCharacter = (index, animate = true) => {
    activeCharacter = (index + characters.length) % characters.length;
    const character = characters[activeCharacter];
    tabs.forEach((tab, tabIndex) => {
      const selected = tabIndex === activeCharacter;
      tab.classList.toggle('is-active', selected);
      tab.setAttribute('aria-selected', String(selected));
    });

    const applyContent = () => {
      Object.entries(characterFields).forEach(([key, element]) => {
        if (!element) return;
        element.textContent = key === 'current' ? String(activeCharacter + 1).padStart(2, '0') : character[key];
      });
      const silhouette = document.querySelector('.character-silhouette');
      silhouette?.setAttribute('aria-label', `Espaço reservado para a ilustração de ${character.name}`);
      document.querySelector('.character-hud')?.classList.toggle('is-hidden', character.id !== 'lucci');
    };

    if (animate && window.gsap && !reduceMotion) {
      window.gsap.to('.character-profile', { opacity: 0, y: 16, duration: .2, onComplete: () => {
        applyContent();
        window.gsap.to('.character-profile', { opacity: 1, y: 0, duration: .42, ease: 'power2.out' });
      }});
      window.gsap.fromTo('.character-silhouette', { filter: 'blur(8px)', scale: .96 }, { filter: 'blur(0px)', scale: 1, duration: .7, ease: 'power3.out' });
    } else {
      applyContent();
    }
  };

  tabs.forEach((tab, index) => tab.addEventListener('click', () => renderCharacter(index)));
  document.querySelector('[data-character-prev]')?.addEventListener('click', () => renderCharacter(activeCharacter - 1));
  document.querySelector('[data-character-next]')?.addEventListener('click', () => renderCharacter(activeCharacter + 1));

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      nav?.querySelectorAll('a').forEach((link) => link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`));
    });
  }, { rootMargin: '-42% 0px -48% 0px' });
  document.querySelectorAll('[data-section]').forEach((section) => sectionObserver.observe(section));

  window.addEventListener('scroll', () => header?.classList.toggle('is-scrolled', window.scrollY > 48), { passive: true });

  if (window.matchMedia('(pointer:fine)').matches && pointer) {
    window.addEventListener('mousemove', (event) => {
      pointer.classList.add('is-visible');
      pointer.style.transform = `translate(${event.clientX}px, ${event.clientY}px) translate(-50%, -50%)`;
    }, { passive: true });
    document.querySelectorAll('a, button').forEach((item) => {
      item.addEventListener('mouseenter', () => pointer.classList.add('is-active'));
      item.addEventListener('mouseleave', () => pointer.classList.remove('is-active'));
    });
  }

  if (reduceMotion || !window.gsap) return;

  window.gsap.registerPlugin(window.ScrollTrigger);
  const gsap = window.gsap;

  if (window.Lenis) {
    const lenis = new window.Lenis({ lerp: 0.085, smoothWheel: true });
    lenis.on('scroll', window.ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  gsap.from('.hero-logo', { opacity: 0, scale: .88, filter: 'blur(12px)', duration: 1.4, ease: 'power3.out', delay: .2 });
  gsap.from('.eyebrow, .hero-lede, .hero-actions', { opacity: 0, y: 24, duration: 1, stagger: .14, ease: 'power3.out', delay: .48 });
  gsap.from('.hero-poster', { opacity: 0, scale: 1.12, clipPath: 'polygon(48% 45%,52% 45%,52% 55%,48% 55%)', duration: 1.7, ease: 'power4.inOut', delay: .18 });
  gsap.from('.poster-orbit', { opacity: 0, scale: .72, rotate: -35, duration: 2, ease: 'power2.out', delay: .5 });

  gsap.timeline({
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.2 }
  })
    .to('.hero-poster', { scale: 1.12, rotate: -1.5, yPercent: 10 }, 0)
    .to('.poster-glyph', { scale: 1.22, rotate: 12 }, 0)
    .to('.hero-copy', { yPercent: -20, opacity: .16 }, 0)
    .to('.portal-seal', { rotate: 22, scale: 1.2, opacity: .25 }, 0)
    .to('.hero-ink-transition', { y: '-7rem' }, .35);

  gsap.from('.discover-intro > *', {
    scrollTrigger: { trigger: '.discover-intro', start: 'top 78%' },
    opacity: 0, y: 50, duration: 1.1, stagger: .15, ease: 'power3.out'
  });

  gsap.timeline({
    scrollTrigger: { trigger: '.discover-stage', start: 'top 78%', end: 'center 38%', scrub: 1 }
  })
    .from('.discover-poster', { clipPath: 'polygon(0 0, 4% 0, 0 100%, 0 100%)', rotate: -4 }, 0)
    .from('.discover-poster .poster-glyph', { scale: 1.35, rotate: -40 }, 0)
    .from('.discover-notes > *', { opacity: 0, x: 35, stagger: .08 }, .25);

  gsap.to('.memory-line', {
    xPercent: -12,
    scrollTrigger: { trigger: '.discover', start: 'top bottom', end: 'bottom top', scrub: 1.2 }
  });

  gsap.from('.world-heading > *', {
    scrollTrigger: { trigger: '.world-heading', start: 'top 80%' },
    opacity: 0, y: 46, stagger: .12, duration: 1, ease: 'power3.out'
  });

  window.ScrollTrigger.matchMedia({
    '(min-width: 901px)': () => {
      const track = document.querySelector('.world-track');
      const viewport = document.querySelector('.world-viewport');
      if (!track || !viewport) return;
      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth + window.innerWidth * .08);
      gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: '.world', start: 'top top', end: () => `+=${distance() + window.innerHeight * .8}`,
          pin: true, scrub: 1.1, invalidateOnRefresh: true,
          onUpdate: (self) => gsap.set('.world-progress span', { width: `${self.progress * 100}%` })
        }
      });
    },
    '(max-width: 900px)': () => {
      gsap.utils.toArray('.world-panel').forEach((panel) => gsap.from(panel, {
        scrollTrigger: { trigger: panel, start: 'top 82%' },
        opacity: 0, y: 55, duration: 1, ease: 'power3.out'
      }));
    }
  });

  gsap.from('.characters-heading > *', {
    scrollTrigger: { trigger: '.characters-heading', start: 'top 78%' },
    opacity: 0, y: 42, stagger: .12, duration: 1, ease: 'power3.out'
  });
  gsap.from('.character-silhouette', {
    scrollTrigger: { trigger: '.character-stage', start: 'top 72%' },
    clipPath: 'polygon(50% 48%, 53% 48%, 53% 52%, 50% 52%)', scale: 1.08,
    duration: 1.3, ease: 'power4.inOut'
  });
  gsap.from('.character-hud', {
    scrollTrigger: { trigger: '.character-stage', start: 'top 62%' },
    opacity: 0, x: -70, duration: 1, ease: 'power3.out'
  });
  gsap.to('.character-number', {
    yPercent: -18,
    scrollTrigger: { trigger: '.characters', start: 'top bottom', end: 'bottom top', scrub: 1 }
  });

  gsap.utils.toArray('.about-grid > *').forEach((column, index) => gsap.from(column, {
    scrollTrigger: { trigger: '.about-grid', start: 'top 78%' },
    opacity: 0, y: 55 + index * 15, duration: 1.1, delay: index * .1, ease: 'power3.out'
  }));
  gsap.from('.project-ledger > div', {
    scrollTrigger: { trigger: '.project-ledger', start: 'top 86%' },
    opacity: 0, y: 30, stagger: .1, duration: .75, ease: 'power2.out'
  });
  gsap.from('.footer-dream img', {
    scrollTrigger: { trigger: '.footer-dream', start: 'top 72%' },
    opacity: 0, scale: .82, filter: 'blur(12px)', duration: 1.4, ease: 'power3.out'
  });
})();
