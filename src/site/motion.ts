// Site-wide motion: scroll reveals (with a fallback for browsers without
// scroll-driven animations, e.g. Safari), staggered grids, count-up stats,
// scroll progress, card tilt, magnetic buttons and a soft cursor glow.
const reduce = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const scrollTimeline = typeof CSS !== 'undefined' && CSS.supports('animation-timeline: view()');

let started = false;
export function startMotion() {
  if (started) return;
  started = true;
  const root = document.documentElement;
  if (reduce()) { root.classList.add('motion-off'); return; }
  if (!scrollTimeline) root.classList.add('js-io');

  // ---- reveal on scroll (fallback) + stagger + count-up ----
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      const el = e.target as HTMLElement;
      el.classList.add('in');
      if (el.dataset.count) countUp(el);
      io.unobserve(el);
    }
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

  const prep = (scope: ParentNode) => {
    scope.querySelectorAll<HTMLElement>('.svc, .steps, .stats, .wgrid, .quizgrid, .masonry, .tnav > div').forEach((g) => {
      Array.from(g.children).forEach((c, i) => (c as HTMLElement).style.setProperty('--i', String(i % 6)));
    });
    scope.querySelectorAll<HTMLElement>('.rv, .rv-scale, .stg, .svc, .steps, .stats, .quizgrid, [data-count]').forEach((el) => {
      if (el.dataset.mo) return;
      el.dataset.mo = '1';
      io.observe(el);
    });
    // count-up: any "182%"-style number inside the stats grid
    scope.querySelectorAll<HTMLElement>('.stats *').forEach((el) => {
      if (el.children.length || el.dataset.count) return;
      const m = /^(\d{1,4})(%|\+|x)?$/.exec((el.textContent || '').trim());
      if (!m) return;
      el.dataset.count = m[1];
      el.dataset.suffix = m[2] || '';
      el.textContent = '0' + (m[2] || '');
      io.observe(el);
    });
    if (finePointer()) {
      scope.querySelectorAll<HTMLElement>('.wt .frame, .card, .opt').forEach(tilt);
      scope.querySelectorAll<HTMLElement>('.btn, .tarrow').forEach(magnet);
    }
  };
  prep(document);
  new MutationObserver((muts) => {
    for (const m of muts) m.addedNodes.forEach((n) => { if (n instanceof HTMLElement) prep(n.parentElement || n); });
  }).observe(document.body, { childList: true, subtree: true });

  // ---- scroll progress bar ----
  const bar = document.createElement('div');
  bar.className = 'scroll-bar iri-line';
  bar.setAttribute('aria-hidden', 'true');
  document.body.appendChild(bar);
  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = `scaleX(${h > 0 ? window.scrollY / h : 0})`;
      root.classList.toggle('scrolled', window.scrollY > 40);
      ticking = false;
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---- cursor glow ----
  if (finePointer()) {
    const glow = document.createElement('div');
    glow.className = 'cursor-glow';
    glow.setAttribute('aria-hidden', 'true');
    document.body.appendChild(glow);
    let x = innerWidth / 2, y = innerHeight / 2, gx = x, gy = y;
    window.addEventListener('pointermove', (e) => { x = e.clientX; y = e.clientY; glow.style.opacity = '1'; }, { passive: true });
    document.addEventListener('pointerleave', () => { glow.style.opacity = '0'; });
    const loop = () => {
      gx += (x - gx) * 0.12; gy += (y - gy) * 0.12;
      glow.style.transform = `translate3d(${gx - 220}px, ${gy - 220}px, 0)`;
      requestAnimationFrame(loop);
    };
    loop();
  }
}

function countUp(el: HTMLElement) {
  const to = Number(el.dataset.count), suf = el.dataset.suffix || '';
  const t0 = performance.now(), dur = 1600;
  const step = (t: number) => {
    const p = Math.min(1, (t - t0) / dur);
    const eased = 1 - Math.pow(1 - p, 4);
    el.textContent = Math.round(to * eased) + suf;
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

function tilt(el: HTMLElement) {
  if (el.dataset.tilt) return;
  el.dataset.tilt = '1';
  el.classList.add('tilt');
  el.addEventListener('pointermove', (e) => {
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty('--rx', `${(-py * 6).toFixed(2)}deg`);
    el.style.setProperty('--ry', `${(px * 7).toFixed(2)}deg`);
    el.style.setProperty('--gx', `${((px + 0.5) * 100).toFixed(1)}%`);
    el.style.setProperty('--gy', `${((py + 0.5) * 100).toFixed(1)}%`);
  });
  el.addEventListener('pointerleave', () => { el.style.setProperty('--rx', '0deg'); el.style.setProperty('--ry', '0deg'); });
}

function magnet(el: HTMLElement) {
  if (el.dataset.mag) return;
  el.dataset.mag = '1';
  el.addEventListener('pointermove', (e) => {
    const r = el.getBoundingClientRect();
    el.style.translate = `${((e.clientX - r.left - r.width / 2) * 0.18).toFixed(1)}px ${((e.clientY - r.top - r.height / 2) * 0.28).toFixed(1)}px`;
  });
  el.addEventListener('pointerleave', () => { el.style.translate = '0 0'; });
}
