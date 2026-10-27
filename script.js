/* ==========================================================================
   DeepStone — etkileşimler
   ========================================================================== */
(() => {
  'use strict';

  /* ------------------------------------------------------------------------
     AYARLAR — WhatsApp numarasını yalnızca buradan değiştirin.
     Ülke kodu ile, başında + veya 0 olmadan, sadece rakam: 905XXXXXXXXX
     ------------------------------------------------------------------------ */
  const CONFIG = {
    // Yedek değerler; gerçek değerler katalog.js → ayarlar bölümünden gelir.
    whatsappNumber: '905000000000',
    storeName: 'DeepStone',
    hoursText: 'Hafta içi 10:00–20:00',
    shippingText: 'Türkiye geneli, 1–3 iş günü',
    currency: 'TRY',
    maxQty: 10,
  };

  /* ------------------------------------------------------------------------
     Veri
     ------------------------------------------------------------------------ */
  // Tüm içerik katalog.js dosyasından okunur (bkz. readKatalog).
  let FAMILIES = {};
  let COLLECTIONS = {};
  let PRODUCTS = [];
  let HOME = [];
  let byId = {};
  let HERO_ID = '';
  let STRIP = null;
  const BRAND_IMAGE = 'images/marka/koleksiyon.webp';

  const famOf = (p) => FAMILIES[p.family] || { label: 'Diğer', color: '#4c6a5e', tint: '#e5e7e1', mood: '', image: '' };
  const colOf = (p) => COLLECTIONS[p.collection] || null;

  /* ------------------------------------------------------------------------
     Yardımcılar
     ------------------------------------------------------------------------ */
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const canHover = window.matchMedia('(hover: hover)');

  const priceFmt = new Intl.NumberFormat('tr-TR', { style: 'currency', currency: CONFIG.currency, maximumFractionDigits: 0 });
  const fmt = (n) => priceFmt.format(n);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const fr = (s) => `<span lang="${/^DeepStone/.test(s) ? 'en' : 'fr'}">${esc(s)}</span>`;
  const normalize = (s) => String(s)
    .toLocaleLowerCase('tr')
    .replace(/[çğıöşüâî]/g, (c) => ({ ç: 'c', ğ: 'g', ı: 'i', ö: 'o', ş: 's', ü: 'u', â: 'a', î: 'i' }[c]));
  const minPrice = (p) => Math.min(...p.sizes.map((s) => s.price));
  const ICON = (id) => `<svg class="icon" aria-hidden="true"><use href="#${id}"/></svg>`;

  /* ------------------------------------------------------------------------
     Şişe illüstrasyonu (SVG)
     ------------------------------------------------------------------------ */
  const METALS = {
    silver: ['#7a7e84', '#f5f6f7', '#bcc0c5', '#5f6368'],
    black: ['#0b0b0c', '#4a4a4e', '#1c1c1e', '#050505'],
    bordeaux: ['#330c13', '#8e3647', '#5b1a26', '#260810'],
    green: ['#10241e', '#4f7064', '#1e3a31', '#0c1c17'],
    wood: ['#3f2a1d', '#a47e5e', '#6b4a33', '#33211a'],
    ivory: ['#c9c0b0', '#fffdf8', '#ebe4d6', '#b3a996'],
  };
  const rr = (x, y, w, h, r) =>
    `M${x + r} ${y}H${x + w - r}Q${x + w} ${y} ${x + w} ${y + r}V${y + h - r}Q${x + w} ${y + h} ${x + w - r} ${y + h}H${x + r}Q${x} ${y + h} ${x} ${y + h - r}V${y + r}Q${x} ${y} ${x + r} ${y}Z`;
  const SHAPES = {
    column: { d: rr(78, 110, 84, 182, 10), T: 110, B: 292, L: 78, R: 162, lw: 56 },
    flask: { d: 'M40 212A80 80 0 1 0 200 212A80 80 0 1 0 40 212Z', T: 132, B: 292, L: 40, R: 200, lw: 70 },
    square: { d: rr(58, 128, 124, 164, 14), T: 128, B: 292, L: 58, R: 182, lw: 72 },
    facet: { d: 'M74 130H166L186 150V272L166 292H74L54 272V150Z', T: 130, B: 292, L: 54, R: 186, lw: 72 },
    arch: { d: 'M74 292V172A46 46 0 0 1 166 172V284Q166 292 158 292H82Q74 292 74 284Z', T: 126, B: 292, L: 74, R: 166, lw: 60 },
  };

  let svgUid = 0;
  const DEFAULT_BOTTLE = { shape: 'column', cap: 'block', capMetal: 'black', collar: 'silver', liquid: ['#e8dcc8', '#9c8466'], fill: 0.72 };
  function bottleSVG(p) {
    const b = p.bottle || DEFAULT_BOTTLE;
    const s = SHAPES[b.shape] || SHAPES.column;
    const id = `b${++svgUid}`;
    const cx = 120;
    const collarY = s.T - 18;
    const m = METALS[b.capMetal] || METALS.silver;
    const c = METALS[b.collar] || METALS.silver;
    const liquidTop = s.T + (s.B - s.T) * (1 - b.fill);
    let cap = '';
    switch (b.cap) {
      case 'block': cap = `<path d="${rr(cx - 35, collarY - 56, 70, 56, 4)}" fill="url(#${id}m)"/>`; break;
      case 'tall': cap = `<path d="${rr(cx - 22, collarY - 84, 44, 84, 3)}" fill="url(#${id}m)"/>`; break;
      case 'sphere': cap = `<circle cx="${cx}" cy="${collarY - 31}" r="33" fill="url(#${id}m)"/><circle cx="${cx - 11}" cy="${collarY - 42}" r="8" fill="#fff" opacity=".22"/>`; break;
      case 'disc': cap = `<path d="${rr(cx - 14, collarY - 36, 28, 16, 3)}" fill="url(#${id}m)"/><path d="${rr(cx - 48, collarY - 22, 96, 22, 4)}" fill="url(#${id}m)"/>`; break;
      case 'facet': cap = `<path d="M${cx - 22} ${collarY}L${cx - 34} ${collarY - 22}L${cx - 22} ${collarY - 60}H${cx + 22}L${cx + 34} ${collarY - 22}L${cx + 22} ${collarY}Z" fill="url(#${id}m)"/><path d="M${cx - 34} ${collarY - 22}H${cx + 34}" stroke="#fff" stroke-opacity=".2"/>`; break;
    }
    const labelY = b.shape === 'flask' ? 212 : (s.T + s.B) / 2 + 12;
    const lw = s.lw;
    return `<svg viewBox="0 0 240 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${esc(p.name)} şişesi">
<defs>
<linearGradient id="${id}m" x1="0" x2="1"><stop offset="0" stop-color="${m[0]}"/><stop offset=".35" stop-color="${m[1]}"/><stop offset=".6" stop-color="${m[2]}"/><stop offset="1" stop-color="${m[3]}"/></linearGradient>
<linearGradient id="${id}c" x1="0" x2="1"><stop offset="0" stop-color="${c[0]}"/><stop offset=".4" stop-color="${c[1]}"/><stop offset="1" stop-color="${c[3]}"/></linearGradient>
<linearGradient id="${id}l" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${b.liquid[0]}" stop-opacity=".92"/><stop offset="1" stop-color="${b.liquid[1]}"/></linearGradient>
<linearGradient id="${id}g" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset=".25" stop-color="#fff" stop-opacity=".12"/><stop offset=".75" stop-color="#fff" stop-opacity=".05"/><stop offset="1" stop-color="#fff" stop-opacity=".35"/></linearGradient>
<radialGradient id="${id}s" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#000" stop-opacity=".26"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>
<clipPath id="${id}k"><path d="${s.d}"/></clipPath>
</defs>
<ellipse cx="${cx}" cy="300" rx="${(s.R - s.L) / 2 + 26}" ry="10" fill="url(#${id}s)"/>
<path d="${s.d}" fill="#fff" fill-opacity=".35"/>
<g clip-path="url(#${id}k)">
<rect x="0" y="${liquidTop}" width="240" height="${s.B - liquidTop}" fill="url(#${id}l)"/>
<rect x="0" y="${liquidTop}" width="240" height="2" fill="#fff" opacity=".45"/>
<rect x="0" y="${s.B - 14}" width="240" height="14" fill="#fff" opacity=".2"/>
<rect x="0" y="0" width="240" height="320" fill="url(#${id}g)"/>
<rect x="${s.L + 10}" y="${s.T + 14}" width="7" height="${s.B - s.T - 40}" rx="3.5" fill="#fff" opacity=".55"/>
<rect x="${s.R - 14}" y="${s.T + 24}" width="3" height="${s.B - s.T - 70}" rx="1.5" fill="#fff" opacity=".35"/>
</g>
<path d="${s.d}" fill="none" stroke="#1c201d" stroke-opacity=".16"/>
<rect x="${cx - lw / 2}" y="${labelY - 21}" width="${lw}" height="42" rx="2" fill="#f9f7f3" fill-opacity=".92" stroke="#1c201d" stroke-opacity=".08"/>
<text x="${cx}" y="${labelY - 4}" text-anchor="middle" font-family="Jost, Arial, sans-serif" font-size="6" letter-spacing="1.6" fill="#1e3a31">DEEPSTONE</text>
<text x="${cx}" y="${labelY + 12}" text-anchor="middle" font-family="Jost, Arial, sans-serif" font-size="11" font-weight="300" letter-spacing="1" fill="#1c201d">N° ${p.no}</text>
<path d="${rr(cx - 18, collarY, 36, 20, 2)}" fill="url(#${id}c)"/>
${cap}
</svg>`;
  }

  /* Duyarlı fotoğraf: doğru boyutta, tembel yüklenen, kırılırsa yedek gösteren */
  const imgUrl = (id, w, h) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=72`;
  function photoTag(id, alt, { ratio = 1.25, sizes = '(max-width: 640px) 100vw, 33vw', eager = false, cls = 'art__img' } = {}) {
    if (!id) return '';
    if (!/^\d{10,}-[\w-]+$/.test(id)) {
      const url = id;
      return `<img class="${cls}" src="${esc(url)}" alt="${esc(alt)}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async" data-photo>`;
    }
    const widths = [320, 480, 720, 960, 1280];
    const srcset = widths.map((w) => `${imgUrl(id, w, Math.round(w * ratio))} ${w}w`).join(', ');
    return `<img class="${cls}" src="${imgUrl(id, 720, Math.round(720 * ratio))}" srcset="${srcset}" sizes="${sizes}"
      width="720" height="${Math.round(720 * ratio)}" alt="${esc(alt)}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async" data-photo>`;
  }

  function artHTML(p, opts = {}) {
    const photo = p.image;
    return `<span class="art ${photo ? 'has-img' : ''} ${opts.cls || ''}" style="--tint:${p.tint};--deep:${p.deep}">
      <span class="art__glow"></span>
      ${photo ? photoTag(photo, `${p.name} parfüm şişesi`, { ratio: opts.ratio || 1.25, sizes: opts.sizes, eager: opts.eager }) : ''}
      <span class="art__bottle art__fallback">${bottleSVG(p)}</span>
      <span class="art__shade" aria-hidden="true"></span>
      ${opts.num === false ? '' : `<span class="art__num">N° ${p.no}</span>`}
    </span>`;
  }

  /* Fotoğraf yüklenince yumuşakça belirsin; yüklenemezse yedek görsel gösterilsin */
  document.addEventListener('load', (e) => {
    if (e.target.matches && e.target.matches('img[data-photo]')) e.target.classList.add('is-loaded');
  }, true);
  document.addEventListener('error', (e) => {
    const img = e.target;
    if (!(img.matches && img.matches('img[data-photo]'))) return;
    const box = img.closest('.art, .photo');
    if (box) box.classList.add('no-img');
    img.remove();
  }, true);

  function miniHTML(p, attr) {
    const fam = famOf(p);
    return `<button type="button" class="mini" ${attr}="${p.id}">
      ${artHTML(p, { num: false, ratio: 1, sizes: '160px' })}
      <span class="mini__text"><span class="mini__name">${esc(p.name)}</span>
      <span class="mini__meta">${fam.label} · <b>${fmt(minPrice(p))}</b></span></span>
    </button>`;
  }

  /* ------------------------------------------------------------------------
     WhatsApp
     ------------------------------------------------------------------------ */
  const waNumberValid = () => /^\d{10,15}$/.test(CONFIG.whatsappNumber);
  const waUrl = (text) => `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`;
  function buildMessage(p, sizeIdx, qty) {
    if (!p) return `Merhaba ${CONFIG.storeName},\n\nParfümleriniz hakkında bilgi almak istiyorum.\n\nİlgilendiğim koku tipi: \nNot: \n\nTeşekkürler.`;
    const size = p.sizes[sizeIdx];
    return [
      `Merhaba ${CONFIG.storeName},`, '',
      'Aşağıdaki parfümü sipariş etmek istiyorum:', '',
      `• Parfüm: ${p.name} (${p.brand})`,
      `• Boyut: ${size.ml} ml`,
      `• Adet: ${qty}`,
      `• Birim fiyat: ${fmt(size.price)}`,
      `• Toplam: ${fmt(size.price * qty)}`, '',
      'Teslimat şehri: ', 'Not: ', '', 'Teşekkürler.',
    ].join('\n');
  }

  /* Bildirim */
  const toastEl = $('#toast');
  let toastTimer;
  function toast(msg, isError = false) {
    toastEl.textContent = msg;
    toastEl.classList.toggle('is-error', isError);
    toastEl.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('is-visible'), 2800);
  }

  /* ------------------------------------------------------------------------
     Kaydırmayla görünme: öğe ekrana girdiğinde canlanır (dokunmatikte de)
     ------------------------------------------------------------------------ */
  let ioAlive = false;
  const revealIO = 'IntersectionObserver' in window
    ? new IntersectionObserver((entries) => {
      ioAlive = true;
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-in');
        revealIO.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.06 })
    : null;
  function armReveals(scope) {
    $$('[data-reveal]', scope).forEach((el) => {
      el.classList.remove('is-in');
      if (revealIO) revealIO.observe(el);
      else el.classList.add('is-in');
    });
    // Gözlemci hiç yanıt vermezse (eski/kısıtlı tarayıcı) içerik gizli kalmasın
    setTimeout(() => {
      if (!ioAlive) $$('[data-reveal]', scope).forEach((el) => el.classList.add('is-in'));
    }, 1500);
  }

  /* ------------------------------------------------------------------------
     Görünüm yönlendirici — aynı sayfada geçiş (#/parfumler vb.)
     ------------------------------------------------------------------------ */
  const VIEWS = {
    anasayfa: 'DeepStone — Niş Parfüm Atölyesi',
    parfumler: 'Parfümler — DeepStone',
    koleksiyonlar: 'Koleksiyonlar — DeepStone',
    rehber: 'Koku Rehberi — DeepStone',
    hakkimizda: 'Hakkımızda — DeepStone',
  };
  const root = document.documentElement;
  const header = $('#site-header');
  const indicator = $('.nav__indicator');
  let currentView = null;
  let leaveTimer;

  function moveIndicator() {
    const active = $(`.nav__list a[data-route="${currentView}"]`);
    if (!active || !active.offsetParent) { indicator.classList.remove('is-ready'); return; }
    const navBox = $('.nav').getBoundingClientRect();
    const box = active.getBoundingClientRect();
    const w = Math.max(18, box.width - 28);
    indicator.style.width = `${w}px`;
    indicator.style.transform = `translateX(${box.left - navBox.left + (box.width - w) / 2}px)`;
    indicator.classList.add('is-ready');
  }

  function parseRoute() {
    const name = location.hash.replace(/^#\/?/, '').split('?')[0];
    return VIEWS[name] ? name : 'anasayfa';
  }

  function showView(name, { focus = true } = {}) {
    if (name === currentView) return;
    const next = $(`#view-${name}`);
    const prev = currentView && $(`#view-${currentView}`);
    clearTimeout(leaveTimer);
    $$('.view.is-leaving').forEach((v) => { v.classList.remove('is-leaving'); v.hidden = true; });

    const enter = () => {
      if (prev) { prev.classList.remove('is-leaving'); prev.hidden = true; }
      armReveals(next);
      next.hidden = false;
      window.scrollTo(0, 0);
      if (focus) {
        const h = $('h1', next);
        if (h && h.tabIndex === -1) h.focus({ preventScroll: true });
      }
    };
    if (prev && !reduceMotion.matches) {
      prev.classList.add('is-leaving');
      leaveTimer = setTimeout(enter, 190);
    } else {
      enter();
    }

    currentView = name;
    document.title = VIEWS[name];
    $$('[data-route]').forEach((a) => {
      if (a.dataset.route === name) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
    moveIndicator();
  }

  function go(name) {
    const hash = name === 'anasayfa' ? '#/' : `#/${name}`;
    if (location.hash === hash || (name === 'anasayfa' && !location.hash)) showView(name);
    else location.hash = hash;
  }

  window.addEventListener('hashchange', () => {
    if (location.hash === '#main') return;
    showView(parseRoute());
  });
  window.addEventListener('resize', moveIndicator, { passive: true });

  let scrollTick = false;
  window.addEventListener('scroll', () => {
    if (scrollTick) return;
    scrollTick = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      header.classList.toggle('is-scrolled', y > 8);
      if (currentView === 'anasayfa' && !reduceMotion.matches && y < 1000) {
        root.style.setProperty('--scroll', String(Math.round(y)));
      }
      scrollTick = false;
    });
  }, { passive: true });

  /* Hero: imlece göre hafif derinlik */
  const heroArt = $('.hero__art');
  if (heroArt && canHover.matches && !reduceMotion.matches) {
    const hero = $('.hero');
    hero.addEventListener('pointermove', (e) => {
      const r = hero.getBoundingClientRect();
      heroArt.style.setProperty('--px', (((e.clientX - r.left) / r.width) - 0.5).toFixed(3));
      heroArt.style.setProperty('--py', (((e.clientY - r.top) / r.height) - 0.5).toFixed(3));
    });
    hero.addEventListener('pointerleave', () => {
      heroArt.style.setProperty('--px', 0);
      heroArt.style.setProperty('--py', 0);
    });
  }

  /* ------------------------------------------------------------------------
     Mobil menü
     ------------------------------------------------------------------------ */
  const menuBtn = $('.menu-toggle');
  const menu = $('#mobile-menu');
  const menuOpen = () => menuBtn.getAttribute('aria-expanded') === 'true';
  function openMenu() {
    menu.hidden = false;
    void menu.offsetWidth;
    menu.classList.add('is-open');
    menuBtn.setAttribute('aria-expanded', 'true');
    $('.menu-toggle__label').textContent = 'Kapat';
    document.body.classList.add('is-locked');
    $('a', menu).focus({ preventScroll: true });
  }
  function closeMenu(returnFocus = true) {
    if (!menuOpen()) return;
    menu.classList.remove('is-open');
    menuBtn.setAttribute('aria-expanded', 'false');
    $('.menu-toggle__label').textContent = 'Menü';
    document.body.classList.remove('is-locked');
    const done = () => { if (!menu.classList.contains('is-open')) menu.hidden = true; };
    reduceMotion.matches ? done() : setTimeout(done, 320);
    if (returnFocus) menuBtn.focus({ preventScroll: true });
  }
  menuBtn.addEventListener('click', () => (menuOpen() ? closeMenu() : openMenu()));
  menu.addEventListener('click', (e) => { if (e.target.closest('a')) closeMenu(false); });
  document.addEventListener('keydown', (e) => {
    if (!menuOpen()) return;
    if (e.key === 'Escape') closeMenu();
    if (e.key === 'Tab') {
      const f = [menuBtn, ...$$('a, button', menu)];
      const i = f.indexOf(document.activeElement);
      if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); }
    }
  });
  window.matchMedia('(min-width: 961px)').addEventListener('change', (e) => {
    if (e.matches) closeMenu(false);
    moveIndicator();
  });

  /* ------------------------------------------------------------------------
     Ana sayfa: öne çıkanlar
     ------------------------------------------------------------------------ */
  function fcardHTML(p, i) {
    const fam = famOf(p);
    const lead = i === 0;
    return `<article class="fcard ${lead ? 'fcard--lead' : 'fcard--side'}" data-reveal style="--d:${120 + i * 100}ms">
      <button type="button" class="fcard__media" data-open-product="${p.id}" aria-label="${esc(p.name)} detaylarını gör">${artHTML(p, { ratio: lead ? 1.08 : 1.4, sizes: lead ? '(max-width: 960px) 100vw, 50vw' : '(max-width: 640px) 100vw, 25vw' })}</button>
      <div class="fcard__body">
        <p class="fcard__brand">${fr(p.brand)}</p>
        <h3 class="fcard__name">${esc(p.name)}</h3>
        ${lead ? `<p class="fcard__desc">${esc(p.short)}</p>` : ''}
        <div class="fcard__meta">
          <span class="tag" style="--dot:${fam.color}">${fam.label}</span>
          <span class="price">${fmt(minPrice(p))} <small>/ ${p.sizes[0].ml} ml’den</small></span>
        </div>
        ${lead ? `<div class="fcard__actions">
          <button type="button" class="btn btn--ghost btn--sm" data-open-product="${p.id}">Detaylar</button>
          <button type="button" class="btn btn--wa btn--sm" data-order="${p.id}">${ICON('i-wa')} Sipariş ver</button>
        </div>` : ''}
      </div>
    </article>`;
  }

  function linkAttrs(link) {
    const l = String(link || '').trim();
    if (!l) return null;
    if (l === 'whatsapp') return { tag: 'button', attrs: 'type="button" data-wa-general' };
    if (byId[l]) return { tag: 'button', attrs: `type="button" data-open-product="${esc(l)}"` };
    const ext = /^https?:\/\//.test(l);
    return { tag: 'a', attrs: `href="${esc(l)}"${ext ? ' target="_blank" rel="noopener"' : ''}` };
  }

  function promoHTML(ad) {
    const btn = linkAttrs(ad.link);
    return `<section class="promo${ad.image ? '' : ' promo--text'}" data-reveal aria-label="${esc(ad.title)}">
      ${ad.image ? `<div class="promo__media photo">${photoTag(ad.image, ad.title, { ratio: 0.75, sizes: '(max-width: 960px) 100vw, 50vw', cls: 'photo__img' })}</div>` : ''}
      <div class="promo__body">
        ${ad.eyebrow ? `<p class="label label--light">${esc(ad.eyebrow)}</p>` : ''}
        <h2 class="promo__title">${esc(ad.title)}</h2>
        ${ad.text ? `<p class="promo__text">${esc(ad.text)}</p>` : ''}
        ${btn && ad.button ? `<${btn.tag} class="btn btn--light" ${btn.attrs}>${esc(ad.button)} ${ICON('i-arrow')}</${btn.tag}>` : ''}
      </div>
    </section>`;
  }

  function renderHome() {
    const box = $('#home-sections');
    let firstProducts = true;
    box.innerHTML = HOME.map((sec, si) => {
      if (sec.type === 'ilan') return promoHTML(sec.ilan);
      const items = sec.products.map((id) => byId[id]).filter(Boolean);
      if (!items.length) return '';
      const editorial = sec.layout === 'editorial' && items.length === 3;
      const showAll = firstProducts;
      firstProducts = false;
      return `<section class="home-featured" aria-label="${esc(sec.title)}">
        <header class="block-head" data-reveal>
          <div>
            ${sec.eyebrow ? `<p class="label">${esc(sec.eyebrow)}</p>` : ''}
            <h2 class="block-head__title">${esc(sec.title)}</h2>
          </div>
          ${showAll ? `<a class="link-arrow" href="#/parfumler">Tüm parfümler ${ICON('i-arrow')}</a>` : ''}
        </header>
        ${editorial
          ? `<div class="featured">${items.map((p, i) => fcardHTML(p, i)).join('')}</div>`
          : `<div class="grid grid--row">${items.map((p, i) => cardHTML(p, i, 'std', `h${si}`)).join('')}</div>`}
      </section>`;
    }).join('');
  }

  function renderStrip() {
    const el = $('#serit');
    if (!STRIP || STRIP.goster === false || !STRIP.metin) { el.hidden = true; return; }
    let closed = false;
    try { closed = sessionStorage.getItem('ds-serit') === STRIP.metin; } catch { /* yok say */ }
    if (closed) { el.hidden = true; return; }
    const btn = linkAttrs(STRIP.link);
    $('.serit__text', el).innerHTML = btn
      ? `<${btn.tag} class="serit__link" ${btn.attrs}>${esc(STRIP.metin)} ${ICON('i-arrow')}</${btn.tag}>`
      : esc(STRIP.metin);
    el.hidden = false;
    $('.serit__close', el).onclick = () => {
      el.hidden = true;
      try { sessionStorage.setItem('ds-serit', STRIP.metin); } catch { /* yok say */ }
    };
  }

  function renderHero() {
    const firstSection = HOME.find((h) => h.type !== 'ilan');
    const p = byId[HERO_ID] || byId[firstSection?.products[0]] || PRODUCTS[0];
    if (!p) return;
    $('#hero-bottle').innerHTML = `<span class="photo hero__photo">${photoTag(p.image, `${p.name} parfüm şişesi`, { ratio: 1.3, sizes: '(max-width: 960px) 60vw, 380px', eager: true, cls: 'photo__img' })}</span>`;
    const notes = [...p.top, ...p.heart, ...p.base];
    $$('.hero__notes li').forEach((li, i) => { li.textContent = notes[[2, 0, 4][i]] || notes[i] || ''; li.hidden = !li.textContent; });
    const cap = $('.hero__caption');
    $('span', cap).textContent = `N° ${p.no} · ${p.concentration}`;
    const btn = $('button', cap);
    btn.dataset.openProduct = p.id;
    btn.firstChild.textContent = `${p.name}'i incele `;
  }

  /* ------------------------------------------------------------------------
     Koleksiyonlar
     ------------------------------------------------------------------------ */
  function renderCollections() {
    const rail = $('#collections-rail');
    rail.classList.toggle('collections--grid', Object.keys(COLLECTIONS).length > 3);
    rail.innerHTML = Object.entries(COLLECTIONS).map(([key, col], i) => {
      const items = PRODUCTS.filter((p) => p.collection === key);
      return `<article class="collection${i === 0 ? ' is-active' : ''}" data-reveal style="--c-bg:${col.bg};--c-fg:${col.fg};--d:${i * 110}ms">
        <div class="collection__top">
          <span class="collection__index">0${i + 1}</span>
          <span class="collection__count">${items.length} koku</span>
        </div>
        <div class="collection__photo photo" aria-hidden="true">${photoTag(col.image, '', { ratio: 1.3, sizes: '(max-width: 960px) 100vw, 50vw', cls: 'photo__img' })}</div>
        <div class="collection__bottom">
          <h2 class="collection__name">${esc(col.name)}</h2>
          <p class="collection__tagline">${esc(col.tagline)}</p>
          <button type="button" class="collection__cta" data-filter-collection="${key}">Kokuları gör ${ICON('i-arrow')}</button>
        </div>
      </article>`;
    }).join('');
    const panels = $$('.collection', rail);
    const activate = (el) => panels.forEach((x) => x.classList.toggle('is-active', x === el));
    panels.forEach((el) => {
      el.addEventListener('mouseenter', () => canHover.matches && activate(el));
      el.addEventListener('focusin', () => activate(el));
    });
  }

  /* ------------------------------------------------------------------------
     Koku rehberi
     ------------------------------------------------------------------------ */
  let activeProfile = 'odunsu';
  function renderGuideTabs() {
    const list = $('#profiles-tabs');
    list.innerHTML = Object.entries(FAMILIES).map(([key, f]) => {
      const n = PRODUCTS.filter((p) => p.family === key).length;
      const sel = key === activeProfile;
      return `<button type="button" class="guide-tab" role="tab" id="tab-${key}" aria-controls="profiles-panel"
        aria-selected="${sel}" tabindex="${sel ? 0 : -1}" data-profile="${key}" style="--f-color:${f.color}">
        <span class="guide-tab__bar" aria-hidden="true"></span>
        <span class="guide-tab__name">${f.label}</span>
        <span class="guide-tab__count">${n} koku</span>
      </button>`;
    }).join('');
    const tabs = $$('.guide-tab', list);
    let hoverTimer;
    tabs.forEach((t) => {
      t.addEventListener('click', () => selectProfile(t.dataset.profile));
      t.addEventListener('mouseenter', () => {
        if (!canHover.matches) return;
        clearTimeout(hoverTimer);
        hoverTimer = setTimeout(() => selectProfile(t.dataset.profile), 160);
      });
      t.addEventListener('mouseleave', () => clearTimeout(hoverTimer));
    });
    list.addEventListener('keydown', (e) => {
      const keys = ['ArrowDown', 'ArrowRight', 'ArrowUp', 'ArrowLeft', 'Home', 'End'];
      if (!keys.includes(e.key)) return;
      e.preventDefault();
      const i = tabs.findIndex((t) => t.dataset.profile === activeProfile);
      let n = i;
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') n = (i + 1) % tabs.length;
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') n = (i - 1 + tabs.length) % tabs.length;
      if (e.key === 'Home') n = 0;
      if (e.key === 'End') n = tabs.length - 1;
      selectProfile(tabs[n].dataset.profile);
      tabs[n].focus();
    });
  }

  function selectProfile(key) {
    if (!FAMILIES[key] || key === activeProfile) return;
    activeProfile = key;
    $$('.guide-tab').forEach((t) => {
      const sel = t.dataset.profile === key;
      t.setAttribute('aria-selected', String(sel));
      t.tabIndex = sel ? 0 : -1;
      if (sel && !canHover.matches) t.scrollIntoView({ block: 'nearest', inline: 'center', behavior: reduceMotion.matches ? 'auto' : 'smooth' });
    });
    renderGuidePanel();
  }

  function renderGuidePanel() {
    const f = FAMILIES[activeProfile];
    const items = PRODUCTS.filter((p) => p.family === activeProfile);
    const panel = $('#profiles-panel');
    panel.setAttribute('aria-labelledby', `tab-${activeProfile}`);
    panel.style.setProperty('--f-color', f.color);
    panel.style.setProperty('--f-tint', f.tint);
    panel.innerHTML = `<div class="gp">
      <div class="gp__photo photo">${photoTag(f.image, `${f.label} koku ailesini anlatan fotoğraf`, { ratio: 0.42, sizes: '(max-width: 960px) 100vw, 55vw', cls: 'photo__img' })}</div>
      <p class="gp__mood">${f.mood}</p>
      <h2 class="gp__title">${esc(f.title)}</h2>
      <p class="gp__desc">${esc(f.desc)}</p>
      <ul class="gp__notes" aria-label="Karakteristik notalar">${f.notes.map((n) => `<li>${esc(n)}</li>`).join('')}</ul>
      <div class="gp__matches">${items.map((p) => miniHTML(p, 'data-open-product')).join('')}</div>
      <div class="gp__actions"><button type="button" class="btn btn--green" data-filter-family="${activeProfile}">${f.label} kokuları listele ${ICON('i-arrow')}</button></div>
    </div>`;
  }

  /* ------------------------------------------------------------------------
     Katalog
     ------------------------------------------------------------------------ */
  const state = { family: 'all', collection: 'all', query: '', sort: 'featured' };
  const grid = $('#catalog-grid');
  const emptyEl = $('#catalog-empty');
  const countEl = $('#result-count');
  const searchInput = $('#search-input');
  const sortSelect = $('#sort-select');
  const filtersEl = $('#filters');
  const LAYOUT = ['wide', 'std', 'std', 'std off', 'std', 'std', 'wide', 'std', 'std off', 'std'];

  function facetItem({ group, value, label, count, color, tint, mood }) {
    const checked = state[group] === value;
    return `<button type="button" class="facet-item" role="radio" aria-checked="${checked}" tabindex="${checked ? 0 : -1}"
      data-facet="${group}" data-value="${value}" style="--c:${color};--tint:${tint}">
      <span class="facet-item__bar" aria-hidden="true"></span>
      <span class="facet-item__name">${label}</span>
      <span class="facet-item__count">${count}</span>
      ${mood ? `<span class="facet-item__mood">${mood}</span>` : ''}
    </button>`;
  }

  function renderFacets() {
    $('#family-list').innerHTML = [
      facetItem({ group: 'family', value: 'all', label: 'Tümü', count: PRODUCTS.length, color: 'var(--green)', tint: 'var(--green-soft)', mood: 'Bütün koku aileleri' }),
      ...Object.entries(FAMILIES).map(([k, f]) => facetItem({
        group: 'family', value: k, label: f.label, count: PRODUCTS.filter((p) => p.family === k).length, color: f.color, tint: f.tint, mood: f.mood,
      })),
    ].join('');
    $('#collection-list').innerHTML = [
      facetItem({ group: 'collection', value: 'all', label: 'Tüm koleksiyonlar', count: PRODUCTS.length, color: 'var(--green)', tint: 'var(--green-soft)' }),
      ...Object.entries(COLLECTIONS).map(([k, c]) => facetItem({
        group: 'collection', value: k, label: c.name, count: PRODUCTS.filter((p) => p.collection === k).length, color: c.bg, tint: c.tint,
      })),
    ].join('');
  }

  function syncFacets() {
    $$('.facet-item').forEach((b) => {
      const on = state[b.dataset.facet] === b.dataset.value;
      b.setAttribute('aria-checked', String(on));
      b.tabIndex = on ? 0 : -1;
    });
    const active = (state.family !== 'all') + (state.collection !== 'all') + (state.query.trim() ? 1 : 0);
    const badge = $('#filters-badge');
    badge.hidden = !active;
    badge.textContent = active;
    $('#clear-all').hidden = !active;
  }

  function getResults() {
    const q = normalize(state.query.trim());
    const list = PRODUCTS.filter((p) => {
      if (state.family !== 'all' && p.family !== state.family) return false;
      if (state.collection !== 'all' && p.collection !== state.collection) return false;
      if (!q) return true;
      const hay = normalize([p.name, p.brand, famOf(p).label, colOf(p)?.name || '', ...p.top, ...p.heart, ...p.base, p.short].join(' '));
      return q.split(/\s+/).every((w) => hay.includes(w));
    });
    const sorters = {
      featured: (a, b) => a.no.localeCompare(b.no),
      'price-asc': (a, b) => minPrice(a) - minPrice(b),
      'price-desc': (a, b) => minPrice(b) - minPrice(a),
      name: (a, b) => a.name.localeCompare(b.name, 'tr'),
    };
    return list.sort(sorters[state.sort] || sorters.featured);
  }

  function cardHTML(p, i, layout, prefix = 'c') {
    const fam = famOf(p);
    const wide = layout.includes('wide');
    const off = layout.includes('off');
    const notesId = `notes-${prefix}-${p.id}`;
    const pyramid = `
      <div><dt>Üst</dt><dd>${p.top.map(esc).join(', ')}</dd></div>
      <div><dt>Orta</dt><dd>${p.heart.map(esc).join(', ')}</dd></div>
      <div><dt>Dip</dt><dd>${p.base.map(esc).join(', ')}</dd></div>`;
    return `<article class="card${wide ? ' card--wide' : ''}${off ? ' card--offset' : ''}" data-reveal style="--d:${(i % 3) * 90}ms" data-id="${p.id}">
      <div class="card__media">
        ${artHTML(p)}
        <button type="button" class="card__open-media" data-open-product="${p.id}" aria-label="${esc(p.name)} detaylarını gör"></button>
        <span class="tag card__family" style="--dot:${fam.color}">${fam.label}</span>
        <button type="button" class="card__notes-toggle" aria-expanded="false" aria-controls="${notesId}" data-notes-toggle>Notalar</button>
        <div class="card__notes" id="${notesId}"><dl>${pyramid}</dl></div>
      </div>
      <div class="card__body">
        <p class="card__brand">${fr(p.brand)} · N° ${p.no}</p>
        <h3 class="card__name"><button type="button" data-open-product="${p.id}">${esc(p.name)}</button></h3>
        <p class="card__desc">${esc(p.short)}</p>
        ${wide ? `<dl class="card__pyramid">${pyramid}</dl>` : ''}
        <div class="card__foot">
          <span class="price">${fmt(minPrice(p))} <small>/ ${p.sizes.map((s) => s.ml).join('–')} ml</small></span>
          <div class="card__actions">
            <button type="button" class="details-mini" data-open-product="${p.id}">Detay</button>
            <button type="button" class="wa-mini" data-order="${p.id}" aria-label="${esc(p.name)} için WhatsApp ile sipariş ver">${ICON('i-wa')} Sipariş</button>
          </div>
        </div>
      </div>
    </article>`;
  }

  function renderCatalog() {
    const results = getResults();
    grid.setAttribute('aria-busy', 'false');
    grid.innerHTML = results.map((p, i) => cardHTML(p, i, LAYOUT[i % LAYOUT.length])).join('');
    armReveals(grid);
    const empty = results.length === 0;
    emptyEl.hidden = !empty;
    grid.hidden = empty;
    if (empty) {
      $('#empty-text').textContent = state.query.trim()
        ? `“${state.query.trim()}” için sonuç yok. Farklı bir nota deneyin ya da filtreleri temizleyin; aradığınızı bize yazarsanız en yakın kokuyu önerelim.`
        : 'Bu filtre kombinasyonunda koku yok. Filtreleri temizleyin ya da bize yazın; size uygun kokuyu birlikte bulalım.';
    }
    const parts = [];
    if (state.family !== 'all') parts.push(FAMILIES[state.family].label);
    if (state.collection !== 'all') parts.push(COLLECTIONS[state.collection].name);
    if (state.query.trim()) parts.push(`“${esc(state.query.trim())}”`);
    countEl.innerHTML = `<strong>${results.length} parfüm</strong>${parts.length ? ' · ' + parts.join(' · ') : ''}`;
    syncFacets();
  }

  function setFilter(patch, navigate = false) {
    Object.assign(state, patch);
    if ('query' in patch && searchInput.value !== state.query) searchInput.value = state.query;
    renderCatalog();
    if (navigate) go('parfumler');
  }

  filtersEl.addEventListener('click', (e) => {
    const item = e.target.closest('.facet-item');
    if (item) setFilter({ [item.dataset.facet]: item.dataset.value });
  });
  filtersEl.addEventListener('keydown', (e) => {
    const item = e.target.closest('.facet-item');
    if (!item || !['ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft'].includes(e.key)) return;
    e.preventDefault();
    const items = $$('.facet-item', item.parentElement);
    const i = items.indexOf(item);
    const n = items[(i + (e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : -1) + items.length) % items.length];
    setFilter({ [n.dataset.facet]: n.dataset.value });
    $(`.facet-item[data-facet="${n.dataset.facet}"][data-value="${n.dataset.value}"]`).focus();
  });
  $('.filters__toggle').addEventListener('click', (e) => {
    const open = !filtersEl.classList.contains('is-open');
    filtersEl.classList.toggle('is-open', open);
    e.currentTarget.setAttribute('aria-expanded', String(open));
  });

  let searchTimer;
  searchInput.addEventListener('input', () => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => setFilter({ query: searchInput.value }), 120);
  });
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && searchInput.value) { e.stopPropagation(); setFilter({ query: '' }); }
  });
  sortSelect.addEventListener('change', () => setFilter({ sort: sortSelect.value }));
  const resetAll = () => setFilter({ family: 'all', collection: 'all', query: '' });
  $('#clear-all').addEventListener('click', resetAll);
  $('#reset-filters').addEventListener('click', () => { resetAll(); searchInput.focus(); });

  document.addEventListener('click', (e) => {
    const t = e.target.closest('[data-notes-toggle]');
    if (!t) return;
    const card = t.closest('.card');
    const open = !card.classList.contains('is-revealed');
    $$('.card.is-revealed', card.parentElement).forEach((c) => {
      if (c !== card) { c.classList.remove('is-revealed'); const b = $('[data-notes-toggle]', c); b.setAttribute('aria-expanded', 'false'); b.textContent = 'Notalar'; }
    });
    card.classList.toggle('is-revealed', open);
    t.setAttribute('aria-expanded', String(open));
    t.textContent = open ? 'Kapat' : 'Notalar';
  });

  /* ------------------------------------------------------------------------
     Diyaloglar
     ------------------------------------------------------------------------ */
  const productDialog = $('#product-dialog');
  const orderDialog = $('#order-dialog');
  function unlockScroll() {
    if (!productDialog.open && !orderDialog.open && !menuOpen()) document.body.classList.remove('is-locked');
  }
  function showDialog(d) {
    if (typeof d.showModal !== 'function') d.setAttribute('open', '');
    else if (!d.open) d.showModal();
    document.body.classList.add('is-locked');
  }
  function closeDialog(d) {
    if (!d.open || d.classList.contains('is-closing')) return;
    if (reduceMotion.matches) { d.close(); unlockScroll(); return; }
    d.classList.add('is-closing');
    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      d.classList.remove('is-closing');
      d.close();
      unlockScroll();
    };
    d.addEventListener('animationend', (e) => { if (e.target === d) finish(); });
    setTimeout(finish, 320);
  }
  [productDialog, orderDialog].forEach((d) => {
    d.addEventListener('cancel', (e) => { e.preventDefault(); closeDialog(d); });
    d.addEventListener('close', unlockScroll);
    d.addEventListener('click', (e) => {
      if (e.target === d || e.target.closest('[data-close]')) closeDialog(d);
    });
  });

  /* Ürün detayı */
  let pdState = { id: null, size: 0 };
  function openProduct(id, sizeIdx) {
    const p = byId[id];
    if (!p) { toast('Bu ürün bulunamadı.', true); return; }
    if (sizeIdx == null || !p.sizes[sizeIdx]) sizeIdx = 0;
    pdState = { id, size: sizeIdx };
    const fam = famOf(p);
    const col = colOf(p);
    const similar = [
      ...PRODUCTS.filter((x) => x.id !== p.id && x.family === p.family),
      ...PRODUCTS.filter((x) => x.id !== p.id && x.family !== p.family && x.collection === p.collection),
    ].slice(0, 3);

    $('#product-dialog-body').innerHTML = `
      <button class="icon-btn pd__close" type="button" data-close aria-label="Kapat">${ICON('i-close')}</button>
      <div class="pd__media">${artHTML(p, { ratio: 1.2, sizes: '(max-width: 960px) 100vw, 45vw' })}</div>
      <div class="pd__body" style="--f-color:${fam.color}">
        <header class="pd__head">
          <p class="pd__brand">${fr(p.brand)} · N° ${p.no}</p>
          <h2 class="pd__name" id="pd-name">${esc(p.name)}</h2>
          <div class="pd__tags">
            <span class="tag" style="--dot:${fam.color}">${fam.label}</span>
            ${col ? `<span class="tag" style="--dot:${col.bg}">${esc(col.name)}</span>` : ''}
            <span class="tag" style="--dot:var(--line-2)">${fr(p.concentration)}</span>
          </div>
        </header>
        <p class="pd__desc">${esc(p.short)} ${esc(p.story)}</p>
        <dl class="pyramid" aria-label="Koku notaları">
          <div class="pyramid__item"><dt>Üst</dt><dd>${p.top.map(esc).join(', ')}</dd></div>
          <div class="pyramid__item"><dt>Orta</dt><dd>${p.heart.map(esc).join(', ')}</dd></div>
          <div class="pyramid__item"><dt>Dip</dt><dd>${p.base.map(esc).join(', ')}</dd></div>
        </dl>
        <div class="pd__buy">
          <div class="pd__buy-row">
            <div class="seg" role="radiogroup" aria-label="Boyut">
              ${p.sizes.map((s, i) => `<label><input type="radio" name="pd-size" value="${i}" ${i === sizeIdx ? 'checked' : ''}><span>${s.ml} ml</span></label>`).join('')}
            </div>
            <span class="pd__price" id="pd-price" aria-live="polite">${fmt(p.sizes[sizeIdx].price)}</span>
          </div>
          <button type="button" class="btn btn--wa" id="pd-order">${ICON('i-wa')} WhatsApp ile sipariş ver</button>
          <p class="pd__fine">Mesajınız hazır gelir, göndermeden önce düzenleyebilirsiniz. Her siparişe 2 numune hediye.</p>
        </div>
        ${similar.length ? `<div class="pd__similar"><h3>Benzer kokular</h3><ul>${similar.map((s) => `<li>${miniHTML(s, 'data-switch-product')}</li>`).join('')}</ul></div>` : ''}
      </div>`;

    $$('input[name="pd-size"]', productDialog).forEach((r) => r.addEventListener('change', () => {
      pdState.size = Number(r.value);
      $('#pd-price').textContent = fmt(p.sizes[pdState.size].price);
    }));
    $('#pd-order').addEventListener('click', () => openOrder(p.id, pdState.size));
    showDialog(productDialog);
    const body = $('.pd__body', productDialog);
    if (body) body.scrollTop = 0;
    $('.pd', productDialog).scrollTop = 0;
  }
  productDialog.addEventListener('click', (e) => {
    const b = e.target.closest('[data-switch-product]');
    if (b) openProduct(b.dataset.switchProduct);
  });

  /* Sipariş mesajı */
  const od = { product: null, size: 0, qty: 1, dirty: false, msg: $('#od-message'), send: $('#od-send'), error: $('#od-error'), hint: $('#od-hint') };
  function refreshOrderLink() {
    let err = '';
    if (!waNumberValid()) err = 'WhatsApp numarası henüz ayarlanmamış. Mesajı kopyalayıp bize iletebilirsiniz.';
    else if (!od.msg.value.trim()) err = 'Mesaj boş olamaz. Mesajı yeniden oluşturabilir ya da kendi notunuzu yazabilirsiniz.';
    od.error.textContent = err;
    od.error.hidden = !err;
    if (err) { od.send.setAttribute('aria-disabled', 'true'); od.send.setAttribute('href', '#'); }
    else { od.send.removeAttribute('aria-disabled'); od.send.setAttribute('href', waUrl(od.msg.value)); }
  }
  function updateOrderSummary() {
    const p = od.product;
    if (!p) return;
    const price = p.sizes[od.size].price;
    $('#od-qty').textContent = od.qty;
    $('#od-total').textContent = fmt(price * od.qty);
    $('[data-qty="-1"]', orderDialog).disabled = od.qty <= 1;
    $('[data-qty="1"]', orderDialog).disabled = od.qty >= CONFIG.maxQty;
    $('#od-price-line').textContent = `${p.sizes[od.size].ml} ml · ${fmt(price)}`;
  }
  function regenerate() {
    od.msg.value = buildMessage(od.product, od.size, od.qty);
    od.dirty = false;
    od.hint.hidden = true;
    refreshOrderLink();
  }
  function optionsChanged() {
    updateOrderSummary();
    if (od.dirty) od.hint.hidden = false;
    else regenerate();
  }
  function openOrder(id, sizeIdx = 0) {
    const p = id ? byId[id] : null;
    od.product = p;
    od.size = p ? Math.min(sizeIdx, p.sizes.length - 1) : 0;
    od.qty = 1;
    $('#od-title').textContent = p ? 'Mesajınızı gözden geçirin' : 'Bize yazın';
    $('#od-options').hidden = !p;
    if (p) {
      $('#od-product').innerHTML = `${artHTML(p, { cls: 'od__thumb', num: false, ratio: 1.2, sizes: '80px' })}
        <div><small>${fr(p.brand)} · N° ${p.no}</small><strong>${esc(p.name)}</strong><small id="od-price-line"></small></div>`;
      $('#od-sizes').innerHTML = p.sizes.map((s, i) =>
        `<label><input type="radio" name="od-size" value="${i}" ${i === od.size ? 'checked' : ''}><span>${s.ml} ml · ${fmt(s.price)}</span></label>`).join('');
      updateOrderSummary();
    } else {
      $('#od-product').innerHTML = `<span class="art od__thumb" style="--tint:var(--green-soft)"><span class="art__bottle" style="place-items:center;color:var(--wa)"><svg class="icon" style="width:28px;height:28px" aria-hidden="true"><use href="#i-wa"/></svg></span></span>
        <div><small>Danışma</small><strong>Koku önerisi, numune ya da sipariş</strong><small>${esc(CONFIG.hoursText)} yanıt veriyoruz</small></div>`;
    }
    regenerate();
    showDialog(orderDialog);
    od.msg.scrollTop = 0;
    if (canHover.matches) setTimeout(() => { od.msg.focus({ preventScroll: true }); od.msg.setSelectionRange(0, 0); }, 30);
  }
  $('#od-sizes').addEventListener('change', (e) => {
    if (e.target.name !== 'od-size') return;
    od.size = Number(e.target.value);
    optionsChanged();
  });
  orderDialog.addEventListener('click', (e) => {
    const q = e.target.closest('[data-qty]');
    if (!q) return;
    const next = Math.max(1, Math.min(CONFIG.maxQty, od.qty + Number(q.dataset.qty)));
    if (next === od.qty) return;
    od.qty = next;
    optionsChanged();
  });
  od.msg.addEventListener('input', () => { od.dirty = true; refreshOrderLink(); });
  $('#od-regenerate').addEventListener('click', regenerate);
  $('#order-form').addEventListener('submit', (e) => e.preventDefault());
  od.send.addEventListener('click', (e) => {
    if (od.send.getAttribute('aria-disabled') === 'true') { e.preventDefault(); refreshOrderLink(); od.msg.focus(); return; }
    toast('WhatsApp açılıyor… Mesajı orada da düzenleyebilirsiniz.');
    setTimeout(() => { closeDialog(orderDialog); if (productDialog.open) closeDialog(productDialog); }, 400);
  });
  $('#od-copy').addEventListener('click', async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(od.msg.value);
      else { od.msg.select(); if (!document.execCommand('copy')) throw new Error('copy'); od.msg.setSelectionRange(0, 0); }
      toast('Mesaj panoya kopyalandı.');
    } catch {
      toast('Kopyalanamadı. Mesajı seçip elle kopyalayabilirsiniz.', true);
    }
  });

  /* ------------------------------------------------------------------------
     Genel tıklama yönlendirmesi
     ------------------------------------------------------------------------ */
  document.addEventListener('click', (e) => {
    const t = e.target.closest('[data-open-product],[data-order],[data-wa-general],[data-filter-collection],[data-filter-family]');
    if (!t || t.closest('#product-dialog [data-switch-product]')) return;
    if (t.hasAttribute('data-open-product')) openProduct(t.dataset.openProduct);
    else if (t.hasAttribute('data-order')) openOrder(t.dataset.order);
    else if (t.hasAttribute('data-wa-general')) { closeMenu(false); openOrder(null); }
    else if (t.hasAttribute('data-filter-collection')) setFilter({ collection: t.dataset.filterCollection, family: 'all', query: '' }, true);
    else if (t.hasAttribute('data-filter-family')) setFilter({ family: t.dataset.filterFamily, collection: 'all', query: '' }, true);
  });

  /* ------------------------------------------------------------------------
     Başlat
     ------------------------------------------------------------------------ */
  /* ------------------------------------------------------------------------
     katalog.js okuma — Türkçe alanları sitenin iç yapısına çevirir, hataları toplar
     ------------------------------------------------------------------------ */
  const warnings = [];
  const list = (v) => (Array.isArray(v) ? v : String(v || '').split(',')).map((x) => String(x).trim()).filter(Boolean);

  function readKatalog() {
    const K = window.KATALOG;
    if (!K || !Array.isArray(K.parfumler)) {
      const err = window.__katalogHata;
      throw new Error(err
        ? `katalog.js dosyasında yazım hatası var (satır ${err.satir}): ${err.mesaj}`
        : 'katalog.js dosyası okunamadı. Dosyada eksik tırnak, virgül ya da parantez olabilir.');
    }
    const a = K.ayarlar || {};
    Object.assign(CONFIG, {
      whatsappNumber: String(a.whatsapp || CONFIG.whatsappNumber).replace(/\D/g, ''),
      storeName: a.magazaAdi || CONFIG.storeName,
      hoursText: a.calismaSaatleri || CONFIG.hoursText,
      shippingText: a.kargo || CONFIG.shippingText,
    });

    FAMILIES = {};
    (K.aileler || []).forEach((f) => {
      if (!f || !f.kod) return;
      FAMILIES[f.kod] = {
        label: f.ad || f.kod, color: f.renk || '#4c6a5e', tint: f.acikTon || '#e5e7e1', mood: f.karakter || '',
        title: f.baslik || '', desc: f.aciklama || '', notes: list(f.notalar), image: f.gorsel || `images/kategoriler/${f.kod}.webp`,
      };
    });
    COLLECTIONS = {};
    (K.koleksiyonlar || []).forEach((c) => {
      if (!c || !c.kod || c.goster === false) return;
      COLLECTIONS[c.kod] = {
        name: c.ad || c.kod, tagline: c.aciklama || '', bg: c.renk || '#23433a', fg: c.yaziRengi || '#f2efe9',
        tint: c.acikTon || '#e6e1d9', image: c.gorsel || `images/kategoriler/${c.kod}.webp`,
      };
    });

    const seen = new Set();
    PRODUCTS = [];
    K.parfumler.forEach((p) => {
      if (!p || p.goster === false) return;
      if (!p.kod) { warnings.push(`Kodu olmayan bir parfüm atlandı (${p.ad || 'adsız'}).`); return; }
      if (seen.has(p.kod)) { warnings.push(`“${p.kod}” kodu iki kez kullanılmış; ikincisi atlandı.`); return; }
      seen.add(p.kod);
      const sizes = Object.entries(p.fiyatlar || {})
        .map(([ml, price]) => ({ ml: Number(ml), price: Number(String(price).replace(/[^\d.]/g, '')) }))
        .filter((x) => x.ml > 0 && x.price > 0).sort((x, y) => x.ml - y.ml);
      if (!sizes.length) { warnings.push(`“${p.ad || p.kod}” için geçerli fiyat yok, gösterilmiyor.`); return; }
      if (p.aile && !FAMILIES[p.aile]) warnings.push(`“${p.ad || p.kod}”: “${p.aile}” adında bir koku ailesi yok.`);
      if (p.koleksiyon && !COLLECTIONS[p.koleksiyon]) warnings.push(`“${p.ad || p.kod}”: “${p.koleksiyon}” adında bir koleksiyon yok.`);
      PRODUCTS.push({
        id: p.kod, no: String(PRODUCTS.length + 1).padStart(2, '0'), name: p.ad || p.kod, brand: p.seri || 'DeepStone',
        family: p.aile || '', collection: p.koleksiyon || '', concentration: p.yogunluk || 'Eau de Parfum', sizes,
        top: list(p.ust), heart: list(p.orta), base: list(p.dip), short: p.kisa || '', story: p.hikaye || '',
        tint: p.zemin || '#17130f', deep: p.koyuZemin || '#0b0908', image: p.gorsel || `images/parfumler/${p.kod}.webp`,
      });
    });
    byId = Object.fromEntries(PRODUCTS.map((p) => [p.id, p]));

    const ads = {};
    (K.ilanlar || []).forEach((x) => {
      if (!x || !x.kod || x.goster === false) return;
      ads[x.kod] = { title: x.baslik || '', eyebrow: x.ustYazi || '', text: x.metin || '', image: x.gorsel || '', button: x.buton || '', link: x.link || '' };
    });
    const home = K.anaSayfa || {};
    HERO_ID = home.vitrin || '';
    if (HERO_ID && !byId[HERO_ID]) warnings.push(`Ana sayfa vitrini: “${HERO_ID}” kodlu parfüm yok.`);
    HOME = (home.bolumler || []).map((b) => {
      if (!b) return null;
      if (b.ilan) {
        if (!ads[b.ilan]) { if (!(K.ilanlar || []).some((x) => x && x.kod === b.ilan)) warnings.push(`Ana sayfa: “${b.ilan}” kodlu ilan yok.`); return null; }
        return { type: 'ilan', ilan: ads[b.ilan] };
      }
      const products = list(b.parfumler);
      products.filter((id) => !byId[id]).forEach((id) => warnings.push(`Ana sayfa “${b.baslik || ''}” bölümü: “${id}” kodlu parfüm yok.`));
      if (b.duzen === 'dergi' && products.filter((id) => byId[id]).length !== 3) warnings.push(`Ana sayfa “${b.baslik || ''}”: dergi düzeni tam 3 parfüm ister, satır düzeninde gösteriliyor.`);
      return { type: 'products', title: b.baslik || '', eyebrow: b.ustYazi || '', layout: b.duzen === 'dergi' ? 'editorial' : 'row', products };
    }).filter(Boolean);
    STRIP = K.duyuruSeridi || null;
    if (!FAMILIES[activeProfile]) activeProfile = Object.keys(FAMILIES)[0] || '';
  }

  /* Bilgisayarınızda açarken katalog.js'teki hataları ekranda göster (yayındaki sitede gizli) */
  async function checkImages() {
    const paths = new Map();
    PRODUCTS.forEach((p) => p.image && paths.set(p.image, `“${p.name}” fotoğrafı`));
    Object.values(FAMILIES).forEach((f) => f.image && paths.set(f.image, `“${f.label}” ailesinin fotoğrafı`));
    Object.values(COLLECTIONS).forEach((c) => c.image && paths.set(c.image, `“${c.name}” koleksiyonunun fotoğrafı`));
    HOME.filter((h) => h.type === 'ilan' && h.ilan.image).forEach((h) => paths.set(h.ilan.image, `“${h.ilan.title}” ilanının görseli`));
    await Promise.all([...paths].map(([src, label]) => new Promise((done) => {
      const img = new Image();
      img.onload = done;
      img.onerror = () => { warnings.push(`${label} bulunamadı: ${src}`); done(); };
      img.src = src;
    })));
  }

  async function showWarnings() {
    const local = location.protocol === 'file:' || /^(localhost|127\.0\.0\.1)$/.test(location.hostname);
    if (local) await checkImages();
    if (warnings.length) console.warn(`katalog.js uyarıları:\n- ${warnings.join('\n- ')}`);
    if (!warnings.length || !local) return;
    const box = document.createElement('aside');
    box.className = 'dev-warn';
    box.setAttribute('role', 'status');
    box.innerHTML = `<strong>katalog.js kontrolü: ${warnings.length} uyarı</strong><ul>${warnings.map((w) => `<li>${esc(w)}</li>`).join('')}</ul>
      <small>Bu kutu yalnızca sitenizi kendi bilgisayarınızda açtığınızda görünür.</small>
      <button type="button" aria-label="Kapat">×</button>`;
    $('button', box).onclick = () => box.remove();
    document.body.appendChild(box);
  }

  function applySettings() {
    $$('[data-setting="hours"]').forEach((el) => { el.textContent = CONFIG.hoursText; });
    $$('[data-setting="shipping"]').forEach((el) => { el.textContent = CONFIG.shippingText; });
    $$('[data-setting="store"]').forEach((el) => { el.textContent = CONFIG.storeName; });
  }

  async function init() {
    $('#about-art').innerHTML = `<span class="photo about__photo">${photoTag(BRAND_IMAGE, 'DeepStone parfüm koleksiyonu', { ratio: 0.8, sizes: '(max-width: 960px) 100vw, 40vw', cls: 'photo__img' })}</span>`;
    $('#year').textContent = new Date().getFullYear();

    // İlk görünüm hemen gösterilsin, veri gelince içerik dolsun
    const first = parseRoute();
    $$('.view').forEach((v) => { v.hidden = v.dataset.view !== first; });
    showView(first, { focus: false });

    readKatalog();
    applySettings();
    renderStrip();
    renderHero();
    renderHome();
    renderCollections();
    renderGuideTabs();
    renderGuidePanel();
    renderFacets();
    renderCatalog();
    armReveals(document);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(moveIndicator);
    showWarnings();
  }

  window.__deepstoneReady = true;
  init().catch((err) => {
    console.error(err);
    root.classList.remove('js');
    grid.hidden = true;
    $('#catalog-error').hidden = false;
    $('#catalog-error p').textContent = err.message;
    countEl.textContent = '';
    const bar = document.createElement('div');
    bar.className = 'dev-warn dev-warn--error';
    bar.setAttribute('role', 'alert');
    bar.innerHTML = `<strong>Site içeriği yüklenemedi</strong><p>${esc(err.message)}</p><small>Son yaptığınız değişikliği katalog.js dosyasında kontrol edin.</small>`;
    document.body.appendChild(bar);
  });
})();
