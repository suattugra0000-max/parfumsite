/* ==========================================================================
   Sillage İstanbul — etkileşimler
   ========================================================================== */
(() => {
  'use strict';

  /* ------------------------------------------------------------------------
     AYARLAR — WhatsApp numarasını yalnızca buradan değiştirin.
     Ülke kodu ile, başında + veya 0 olmadan, sadece rakam: 905XXXXXXXXX
     ------------------------------------------------------------------------ */
  const CONFIG = {
    whatsappNumber: '905000000000',
    storeName: 'Sillage İstanbul',
    currency: 'TRY',
    maxQty: 10,
  };

  /* ------------------------------------------------------------------------
     Veri
     ------------------------------------------------------------------------ */
  const FAMILIES = {
    odunsu: {
      label: 'Odunsu', color: '#7a5a42', tint: '#e9e3da',
      mood: 'Sıcak · kuru · sakin',
      title: 'Kuru tahta, sönmüş ateş, eski kitaplar.',
      desc: 'Sedir, vetiver ve meşe yosunu etrafında kurulan kokular. Tende yavaş açılır, saatlerce sakin bir iz bırakır. Sonbahar ve kış için doğal bir seçim; beyaz bir gömlekle yazın da şaşırtır.',
      notes: ['Atlas sediri', 'Vetiver', 'Meşe yosunu', 'Sandal ağacı', 'Tütsü'],
    },
    fresh: {
      label: 'Fresh', color: '#3d6e68', tint: '#dfe7e3',
      mood: 'Aydınlık · tuzlu · yeşil',
      title: 'Deniz kenarında kuruyan keten.',
      desc: 'Narenciye, deniz tuzu, yeşil yapraklar ve temiz misk. Yaz sabahları, ofis günleri ve “hiçbir şey sürmemiş ama güzel kokuyor” hissi için.',
      notes: ['Bergamot', 'Deniz tuzu', 'Neroli', 'İncir yaprağı', 'Beyaz misk'],
    },
    baharatli: {
      label: 'Baharatlı', color: '#8e3b2a', tint: '#ece0da',
      mood: 'Sıcak · keskin · karakterli',
      title: 'Bir çarşının en dar sokağı.',
      desc: 'Safran, kakule, karabiber ve tarçın; altında deri ve oud. Soğuk akşamlar ve iddialı anlar için. Bir iki sıkım yeterli.',
      notes: ['Safran', 'Kakule', 'Karabiber', 'Tarçın', 'Deri'],
    },
    ciceksi: {
      label: 'Çiçeksi', color: '#8a3d55', tint: '#ece0e3',
      mood: 'Pudralı · romantik · zarif',
      title: 'Kadife bir eldivenin içindeki çiçek.',
      desc: 'Gül, iris, yasemin ve tuberoz; bazen pudralı ve sessiz, bazen gece kadar yoğun. Klişeden uzak, modern bir çiçek yorumu.',
      notes: ['Isparta gülü', 'İris kökü', 'Yasemin', 'Tuberoz', 'Menekşe'],
    },
    amber: {
      label: 'Amber', color: '#8c5a2b', tint: '#ebe3d9',
      mood: 'Reçineli · sıcak · sarmalayıcı',
      title: 'Kış akşamı, yanan bir lamba.',
      desc: 'Labdanum, benzoin, vanilya ve tonka. Teni sıcak bir battaniye gibi saran, yakın mesafede hissedilen kokular.',
      notes: ['Labdanum', 'Benzoin', 'Vanilya', 'Tonka', 'Tütün yaprağı'],
    },
  };

  const COLLECTIONS = {
    gece: {
      name: 'Gece Atölyesi', bg: '#4d1a24', fg: '#f2efe9', tint: '#ecdfe0',
      tagline: 'Ateşin, tütsünün ve kehribarın saatleri. Akşam yemeğinden sonra başlayan kokular.',
    },
    kiyi: {
      name: 'Kıyı Serisi', bg: '#23433a', fg: '#f2efe9', tint: '#dde4de',
      tagline: 'Tuz, rüzgâr ve ıslak taş. Ege’den Karadeniz’e uzanan bir kıyı defteri.',
    },
    bahce: {
      name: 'Bahçe Defteri', bg: '#e4d9d4', fg: '#1e3a31', tint: '#ebe3df',
      tagline: 'İris, gül ve incir ağacının gölgesi. Bir bahçe duvarının iki yanı.',
    },
  };

  const PRODUCTS = [
    {
      id: 'kul-sedir', no: '01', name: 'Kül & Sedir', brand: 'Sillage Atelier',
      family: 'odunsu', collection: 'gece', concentration: 'Eau de Parfum',
      sizes: [{ ml: 50, price: 2450 }, { ml: 100, price: 3650 }],
      top: ['Pembe biber', 'Bergamot'], heart: ['Atlas sediri', 'Papirüs'], base: ['Vetiver', 'Tütsü'],
      short: 'Sönmüş bir şöminenin ertesi sabahı: kuru odun, ılık kül ve uzaktan gelen tütsü.',
      story: 'Kışın yakılan sobaların ertesi sabahki kokusunu hatırlamak için yapıldı. Atölyenin ilk formülü.',
      tint: '#e7e2db', deep: '#2b2320',
      bottle: { shape: 'column', cap: 'block', capMetal: 'black', collar: 'silver', liquid: ['#e0cdb0', '#8a6a4a'], fill: .72 },
    },
    {
      id: 'ege-tuzu', no: '02', name: 'Ege Tuzu', brand: 'Sillage Lumière',
      family: 'fresh', collection: 'kiyi', concentration: 'Eau de Parfum',
      sizes: [{ ml: 50, price: 1950 }, { ml: 100, price: 2950 }],
      top: ['Deniz tuzu', 'Limon kabuğu'], heart: ['Adaçayı', 'Nane yaprağı'], base: ['Deniz odunu', 'Ambrette'],
      short: 'Güneşte kuruyan keten bir gömlek; tenin üstünde ince bir tuz tabakası.',
      story: 'Bozcaada’da bir ağustos öğleden sonrası. Rüzgâr, kayalara vuran su ve yakınlarda biri adaçayı topluyor.',
      tint: '#dfe8e6', deep: '#16343a',
      bottle: { shape: 'square', cap: 'disc', capMetal: 'silver', collar: 'silver', liquid: ['#e2f2f3', '#7fb3b8'], fill: .8 },
    },
    {
      id: 'safran-carsisi', no: '03', name: 'Safran Çarşısı', brand: 'Sillage Noir',
      family: 'baharatli', collection: 'gece', concentration: 'Extrait de Parfum',
      sizes: [{ ml: 50, price: 2950 }, { ml: 100, price: 4250 }],
      top: ['Safran', 'Kakule'], heart: ['Isparta gülü', 'Tarçın'], base: ['Oud', 'Amber'],
      short: 'Mısır Çarşısı’nın kapanış saati: baharat tozu, gül suyu ve koyu bir oud.',
      story: 'Dükkânların kepenkleri inerken havada asılı kalan safran tozu. Gül baharatı yumuşatır; oud gece boyunca tende kalır.',
      tint: '#ebe0d9', deep: '#3a1610',
      bottle: { shape: 'facet', cap: 'facet', capMetal: 'bordeaux', collar: 'silver', liquid: ['#ea9f6a', '#7e2a1c'], fill: .7 },
    },
    {
      id: 'beyaz-iris', no: '04', name: 'Beyaz İris', brand: 'Sillage Lumière',
      family: 'ciceksi', collection: 'bahce', concentration: 'Eau de Parfum',
      sizes: [{ ml: 50, price: 2650 }, { ml: 100, price: 3850 }],
      top: ['Armut çiçeği', 'Aldehitler'], heart: ['İris kökü', 'Menekşe'], base: ['Süet', 'Beyaz misk'],
      short: 'Pudralı, serin ve sessiz. Kadife bir eldivenin içindeki çiçek.',
      story: 'Kurutulmuş iris kökü üç yıl dinlendirilir. Biz de onu bağırmadan, fısıltı gibi kullandık.',
      tint: '#e9e5e8', deep: '#3b3340',
      bottle: { shape: 'column', cap: 'sphere', capMetal: 'ivory', collar: 'silver', liquid: ['#f6f0f5', '#c9bccb'], fill: .75 },
    },
    {
      id: 'gece-yasemini', no: '05', name: 'Gece Yasemini', brand: 'Sillage Noir',
      family: 'ciceksi', collection: 'gece', concentration: 'Eau de Parfum',
      sizes: [{ ml: 50, price: 2750 }, { ml: 100, price: 3950 }],
      top: ['Mandalina', 'Yeşil notalar'], heart: ['Yasemin sambac', 'Tuberoz'], base: ['Vanilya', 'Sandal ağacı'],
      short: 'Bahçe kapısının yanındaki yasemin, gece yarısı en yoğun hâlinde.',
      story: 'Yasemin gündüz değil, gece açar. Tuberozla birlikte kremsi ve sıcak bir çiçek; sandal ağacıyla tende yumuşar.',
      tint: '#e6e3e4', deep: '#1d1a24',
      bottle: { shape: 'flask', cap: 'tall', capMetal: 'black', collar: 'silver', liquid: ['#f3e8d0', '#b98c55'], fill: .66 },
    },
    {
      id: 'bergamot-04', no: '06', name: 'Bergamot 04', brand: 'Sillage Lumière',
      family: 'fresh', collection: 'kiyi', concentration: 'Eau de Parfum',
      sizes: [{ ml: 50, price: 1950 }, { ml: 100, price: 2850 }],
      top: ['Bergamot', 'Greyfurt'], heart: ['Neroli', 'Siyah çay yaprağı'], base: ['Beyaz misk', 'Vetiver'],
      short: 'Sabah dördün çayı: parlak narenciye, üstünde hafif buruk bir çay yaprağı.',
      story: 'Dördüncü denemede bulduğumuz denge. Bergamotun acı kabuğunu çayın tanenleriyle yumuşattık.',
      tint: '#e3e8de', deep: '#22301c',
      bottle: { shape: 'column', cap: 'tall', capMetal: 'silver', collar: 'silver', liquid: ['#eef3d8', '#a7b77a'], fill: .78 },
    },
    {
      id: 'kehribar-saat', no: '07', name: 'Kehribar Saat', brand: 'Sillage Atelier',
      family: 'amber', collection: 'gece', concentration: 'Extrait de Parfum',
      sizes: [{ ml: 50, price: 3150 }, { ml: 100, price: 4400 }],
      top: ['Portakal kabuğu', 'Pembe biber'], heart: ['Labdanum', 'Benzoin'], base: ['Vanilya', 'Tonka'],
      short: 'Kış akşamı, yanan bir lamba ve sıcak bir kazak. Reçine, bal ve vanilya.',
      story: '%24 esans oranıyla Extrait yoğunluğunda. Labdanumun reçineli koyuluğu vanilyayla yumuşar.',
      tint: '#ebe2d8', deep: '#3a2210',
      bottle: { shape: 'arch', cap: 'sphere', capMetal: 'bordeaux', collar: 'silver', liquid: ['#eaa874', '#8a3f1e'], fill: .74 },
    },
    {
      id: 'karabiber-deri', no: '08', name: 'Karabiber & Deri', brand: 'Sillage Noir',
      family: 'baharatli', collection: 'gece', concentration: 'Eau de Parfum',
      sizes: [{ ml: 50, price: 2850 }, { ml: 100, price: 3950 }],
      top: ['Karabiber', 'Elemi'], heart: ['Deri', 'İris'], base: ['Huş katranı', 'Paçuli'],
      short: 'Yağmurda ıslanmış eski bir deri ceket; cebinde birkaç karabiber tanesi.',
      story: 'Dumanlı huş katranı ve yumuşak süet. İris, deriyi sertlikten kurtarıp neredeyse pudralı bir yere taşıyor.',
      tint: '#e4e0dd', deep: '#161213',
      bottle: { shape: 'square', cap: 'block', capMetal: 'black', collar: 'black', liquid: ['#6a473d', '#1d1110'], fill: .7 },
    },
    {
      id: 'islak-yosun', no: '09', name: 'Islak Yosun', brand: 'Sillage Lumière',
      family: 'odunsu', collection: 'kiyi', concentration: 'Eau de Parfum',
      sizes: [{ ml: 50, price: 2350 }, { ml: 100, price: 3450 }],
      top: ['Galbanum', 'Bergamot'], heart: ['Meşe yosunu', 'Eğrelti otu'], base: ['Vetiver', 'Paçuli'],
      short: 'Yağmurdan sonra orman zemini: yeşil, toprak ve gölge.',
      story: 'Karadeniz’de bir yayla yolu. Galbanumun keskin yeşili meşe yosununun nemli derinliğine iniyor.',
      tint: '#e0e6dd', deep: '#1d2619',
      bottle: { shape: 'flask', cap: 'block', capMetal: 'wood', collar: 'silver', liquid: ['#d3dcbb', '#4f6040'], fill: .7 },
    },
    {
      id: 'sampanya-gulu', no: '10', name: 'Şampanya Gülü', brand: 'Sillage Atelier',
      family: 'ciceksi', collection: 'bahce', concentration: 'Eau de Parfum',
      sizes: [{ ml: 50, price: 2550 }, { ml: 100, price: 3750 }],
      top: ['Pembe biber', 'Şampanya akoru'], heart: ['Isparta gülü', 'Liçi'], base: ['Misk', 'Kaşmir ağacı'],
      short: 'Köpüren bir kadeh ve sabah toplanmış gül. Hafif, ışıltılı, kutlama gibi.',
      story: 'Isparta’da mayıs sabahı toplanan güllerin özü. Şampanya akoru gülün ağırlığını alıp ona köpük veriyor.',
      tint: '#eee4e2', deep: '#3d1820',
      bottle: { shape: 'arch', cap: 'disc', capMetal: 'silver', collar: 'silver', liquid: ['#f6dcd6', '#cf8f86'], fill: .76 },
    },
    {
      id: 'tutun-kestane', no: '11', name: 'Tütün & Kestane', brand: 'Sillage Noir',
      family: 'amber', collection: 'gece', concentration: 'Extrait de Parfum',
      sizes: [{ ml: 50, price: 2950 }, { ml: 100, price: 4150 }],
      top: ['Rom', 'Tarçın'], heart: ['Tütün yaprağı', 'Kavrulmuş kestane'], base: ['Tonka', 'Vanilya'],
      short: 'Kasımda Beyoğlu: köşede kestane kebapçısı, bir sahafın pipo kokusu.',
      story: 'Kurutulmuş tütün yaprağının bal tonu ve kavrulmuş kestanenin tatlı dumanı. Tatlıya kaçmayan bir amber.',
      tint: '#e9e1d9', deep: '#2e1a12',
      bottle: { shape: 'square', cap: 'facet', capMetal: 'bordeaux', collar: 'black', liquid: ['#c58a5c', '#5a2a14'], fill: .72 },
    },
    {
      id: 'incir-golgesi', no: '12', name: 'İncir Gölgesi', brand: 'Sillage Lumière',
      family: 'fresh', collection: 'bahce', concentration: 'Eau de Parfum',
      sizes: [{ ml: 50, price: 2150 }, { ml: 100, price: 3150 }],
      top: ['İncir yaprağı', 'Yeşil notalar'], heart: ['İncir sütü', 'Hindistan cevizi'], base: ['Sedir', 'Misk'],
      short: 'Ağustos öğlesi bir incir ağacının altı: yeşil yaprak, sütlü meyve, serin gölge.',
      story: 'Bodrum’da bir bahçe duvarı. Yaprağın acı yeşili ile olgun meyvenin sütlü tatlılığı arasında bir yerde.',
      tint: '#e3e9de', deep: '#24301c',
      bottle: { shape: 'facet', cap: 'sphere', capMetal: 'silver', collar: 'silver', liquid: ['#e4ecce', '#8fa36a'], fill: .74 },
    },
  ];

  /* Gerçek fotoğraflar (Unsplash, ücretsiz lisans). Kendi ürün fotoğraflarınız
     hazır olduğunda yalnızca bu kimlikleri değiştirmeniz yeterli. */
  const PHOTOS = {
    'kul-sedir': '1720423514789-15a33e59fc81',
    'ege-tuzu': '1705899853374-d91c048b81d2',
    'safran-carsisi': '1617661338085-d1ec6a89a6d8',
    'beyaz-iris': '1666621630026-862eea07236c',
    'gece-yasemini': '1733660227163-01bc46e0d7d7',
    'bergamot-04': '1709551264866-4573279d4c3e',
    'kehribar-saat': '1638295916768-459f6cf440bc',
    'karabiber-deri': '1693960794377-b388be4227c2',
    'islak-yosun': '1594125311687-3b1b3eafa9f4',
    'sampanya-gulu': '1615108395437-df128ad79e80',
    'tutun-kestane': '1733660227168-444e3c751a1e',
    'incir-golgesi': '1705899844877-81bb0a0665c1',
  };
  const SCENES = {
    odunsu: '1583418007992-a8e33a92e7ad',
    fresh: '1704323020358-585b60e54a07',
    baharatli: '1643471672168-f4a4b6cfa440',
    ciceksi: '1565573349860-cbf26ef3f40f',
    amber: '1686043626878-9e391a70632d',
    gece: '1560543614-a3779ab6c1ca',
    kiyi: '1554826832-fbf0ea041815',
    bahce: '1572085313466-6710de8d7ba3',
    atelier: '1775380900469-702ebec74801',
  };

  const FEATURED = ['safran-carsisi', 'ege-tuzu', 'beyaz-iris'];
  const byId = Object.fromEntries(PRODUCTS.map((p) => [p.id, p]));

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
  const fr = (s) => `<span lang="fr">${esc(s)}</span>`;
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
  function bottleSVG(p) {
    const b = p.bottle;
    const s = SHAPES[b.shape];
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
<text x="${cx}" y="${labelY - 4}" text-anchor="middle" font-family="Jost, Arial, sans-serif" font-size="6.5" letter-spacing="2.4" fill="#1e3a31">SILLAGE</text>
<text x="${cx}" y="${labelY + 12}" text-anchor="middle" font-family="Jost, Arial, sans-serif" font-size="11" font-weight="300" letter-spacing="1" fill="#1c201d">N° ${p.no}</text>
<path d="${rr(cx - 18, collarY, 36, 20, 2)}" fill="url(#${id}c)"/>
${cap}
</svg>`;
  }

  /* Duyarlı fotoğraf: doğru boyutta, tembel yüklenen, kırılırsa yedek gösteren */
  const imgUrl = (id, w, h) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=72`;
  function photoTag(id, alt, { ratio = 1.25, sizes = '(max-width: 640px) 100vw, 33vw', eager = false, cls = 'art__img' } = {}) {
    const widths = [320, 480, 720, 960, 1280];
    const srcset = widths.map((w) => `${imgUrl(id, w, Math.round(w * ratio))} ${w}w`).join(', ');
    return `<img class="${cls}" src="${imgUrl(id, 720, Math.round(720 * ratio))}" srcset="${srcset}" sizes="${sizes}"
      width="720" height="${Math.round(720 * ratio)}" alt="${esc(alt)}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async" data-photo>`;
  }

  function artHTML(p, opts = {}) {
    const photo = PHOTOS[p.id];
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
    const fam = FAMILIES[p.family];
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
    anasayfa: 'Sillage İstanbul — Niş Parfüm Atölyesi',
    parfumler: 'Parfümler — Sillage İstanbul',
    koleksiyonlar: 'Koleksiyonlar — Sillage İstanbul',
    rehber: 'Koku Rehberi — Sillage İstanbul',
    hakkimizda: 'Hakkımızda — Sillage İstanbul',
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
  function renderFeatured() {
    $('#featured-grid').innerHTML = FEATURED.map((id, i) => {
      const p = byId[id];
      const fam = FAMILIES[p.family];
      return `<article class="fcard ${i === 0 ? 'fcard--lead' : 'fcard--side'}" data-reveal style="--d:${120 + i * 100}ms">
        <button type="button" class="fcard__media" data-open-product="${p.id}" aria-label="${esc(p.name)} detaylarını gör">${artHTML(p, { ratio: i === 0 ? 1.08 : 1.4, sizes: i === 0 ? '(max-width: 960px) 100vw, 50vw' : '(max-width: 640px) 100vw, 25vw' })}</button>
        <div class="fcard__body">
          <p class="fcard__brand">${fr(p.brand)}</p>
          <h3 class="fcard__name">${esc(p.name)}</h3>
          ${i === 0 ? `<p class="fcard__desc">${esc(p.short)}</p>` : ''}
          <div class="fcard__meta">
            <span class="tag" style="--dot:${fam.color}">${fam.label}</span>
            <span class="price">${fmt(minPrice(p))} <small>/ ${p.sizes[0].ml} ml’den</small></span>
          </div>
          ${i === 0 ? `<div class="fcard__actions">
            <button type="button" class="btn btn--ghost btn--sm" data-open-product="${p.id}">Detaylar</button>
            <button type="button" class="btn btn--wa btn--sm" data-order="${p.id}">${ICON('i-wa')} Sipariş ver</button>
          </div>` : ''}
        </div>
      </article>`;
    }).join('');
  }

  /* ------------------------------------------------------------------------
     Koleksiyonlar
     ------------------------------------------------------------------------ */
  function renderCollections() {
    const rail = $('#collections-rail');
    rail.innerHTML = Object.entries(COLLECTIONS).map(([key, col], i) => {
      const items = PRODUCTS.filter((p) => p.collection === key);
      return `<article class="collection${i === 0 ? ' is-active' : ''}" data-reveal style="--c-bg:${col.bg};--c-fg:${col.fg};--d:${i * 110}ms">
        <div class="collection__top">
          <span class="collection__index">0${i + 1}</span>
          <span class="collection__count">${items.length} koku</span>
        </div>
        <div class="collection__photo photo" aria-hidden="true">${photoTag(SCENES[key], '', { ratio: 1.3, sizes: '(max-width: 960px) 100vw, 50vw', cls: 'photo__img' })}</div>
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
      <div class="gp__photo photo">${photoTag(SCENES[activeProfile], `${f.label} koku ailesini anlatan fotoğraf`, { ratio: 0.42, sizes: '(max-width: 960px) 100vw, 55vw', cls: 'photo__img' })}</div>
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
      const hay = normalize([p.name, p.brand, FAMILIES[p.family].label, COLLECTIONS[p.collection].name, ...p.top, ...p.heart, ...p.base, p.short].join(' '));
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

  function cardHTML(p, i, layout) {
    const fam = FAMILIES[p.family];
    const wide = layout.includes('wide');
    const off = layout.includes('off');
    const notesId = `notes-${p.id}`;
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

  grid.addEventListener('click', (e) => {
    const t = e.target.closest('[data-notes-toggle]');
    if (!t) return;
    const card = t.closest('.card');
    const open = !card.classList.contains('is-revealed');
    $$('.card.is-revealed', grid).forEach((c) => {
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
  function openProduct(id, sizeIdx = 0) {
    const p = byId[id];
    if (!p) { toast('Bu ürün bulunamadı.', true); return; }
    pdState = { id, size: sizeIdx };
    const fam = FAMILIES[p.family];
    const col = COLLECTIONS[p.collection];
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
            <span class="tag" style="--dot:${col.bg}">${esc(col.name)}</span>
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
        <div><small>Danışma</small><strong>Koku önerisi, numune ya da sipariş</strong><small>Hafta içi 10:00–20:00 yanıt veriyoruz</small></div>`;
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
  function init() {
    $('#hero-bottle').innerHTML = `<span class="photo hero__photo">${photoTag(PHOTOS['kehribar-saat'], 'Kehribar Saat parfüm şişesi', { ratio: 1.3, sizes: '(max-width: 960px) 60vw, 380px', eager: true, cls: 'photo__img' })}</span>`;
    $('#about-art').innerHTML = `<span class="photo about__photo">${photoTag(SCENES.atelier, 'Atölye raflarında parfüm şişeleri', { ratio: 0.8, sizes: '(max-width: 960px) 100vw, 40vw', cls: 'photo__img' })}</span>`;
    $('#year').textContent = new Date().getFullYear();

    renderFeatured();
    renderCollections();
    renderGuideTabs();
    renderGuidePanel();
    renderFacets();
    renderCatalog();

    // İlk görünüm: geçiş animasyonu olmadan
    const first = parseRoute();
    $$('.view').forEach((v) => { v.hidden = v.dataset.view !== first; });
    showView(first, { focus: false });
    armReveals(document);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(moveIndicator);
  }

  try {
    init();
    window.__sillageReady = true;
  } catch (err) {
    console.error(err);
    root.classList.remove('js');
    grid.hidden = true;
    $('#catalog-error').hidden = false;
    countEl.textContent = '';
  }
})();
