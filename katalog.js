/* ==========================================================================
   DEEPSTONE — SİTENİN TÜM İÇERİĞİ BU DOSYADA
   ==========================================================================

   Bu dosyayı Not Defteri (sağ tık → Birlikte aç → Not Defteri) ya da VS Code ile
   açıp düzenleyin, kaydedin, sitede sayfayı yenileyin (F5). Hepsi bu kadar.

   KURALLAR (bunlara dikkat ederseniz hiçbir şey bozulmaz):
     • Metinleri tek tırnak '...' içinde yazın. Metnin içinde ' kullanmanız gerekirse
       önüne ters bölü koyun:  'King\'s Path'
     • Her bloğun sonundaki virgülü bırakın:  { ... },
     • // ile başlayan satırlar açıklamadır, siteyi etkilemez.

   BÖLÜMLER (aşağıda bu sırayla):
     1. AYARLAR       → WhatsApp numarası, çalışma saatleri
     2. DUYURU ŞERİDİ → Sitenin en üstündeki ince duyuru çubuğu
     3. ANA SAYFA     → Büyük görseldeki parfüm + ana sayfada sırayla görünen bölümler
     4. İLANLAR       → Kampanya / duyuru kartları (ana sayfaya eklenebilir)
     5. KOLEKSİYONLAR
     6. KOKU AİLELERİ
     7. PARFÜMLER
   ========================================================================== */

window.KATALOG = {

  /* ------------------------------------------------------------------------
     1. AYARLAR
     ------------------------------------------------------------------------ */
  ayarlar: {
    magazaAdi: 'DeepStone',
    whatsapp: '905000000000',            // Ülke koduyla, sadece rakam: 905321234567
    calismaSaatleri: 'Hafta içi 10:00–20:00',
    kargo: 'Türkiye geneli, 1–3 iş günü',
  },

  /* ------------------------------------------------------------------------
     2. DUYURU ŞERİDİ — sitenin en üstünde ince bir çubuk
        göster: false yaparsanız görünmez.
        link: '#/parfumler' (sayfa), bir parfümün kodu (ör. 'black-orion') ya da https://… adresi
     ------------------------------------------------------------------------ */
  duyuruSeridi: {
    goster: true,
    metin: 'Her siparişe 2 ml numune hediye · WhatsApp\'tan sipariş verin',
    link: '#/parfumler',
  },

  /* ------------------------------------------------------------------------
     3. ANA SAYFA
     vitrin: açılıştaki büyük görselde gösterilecek parfümün kodu.

     bolumler: ana sayfada yukarıdan aşağıya sırayla görünür. Sırasını değiştirmek
     için blokları yer değiştirin; kaldırmak için silin. İki tür bölüm var:

       a) Parfüm bölümü:
          { ustYazi: 'Bu mevsim', baslik: 'Başlık', duzen: 'satir', parfumler: ['kod1', 'kod2'] },
          duzen: 'dergi' → 1 büyük + 2 küçük (tam 3 parfüm)
                 'satir' → istediğiniz kadar parfüm, yan yana kartlar

       b) İlan: aşağıdaki İLANLAR listesinden birinin kodu
          { ilan: 'kasim-firsati' },
     ------------------------------------------------------------------------ */
  anaSayfa: {
    vitrin: 'forbidden-pour-homme',
    bolumler: [
      { ustYazi: 'Bu mevsim', baslik: 'En çok sorulan üç koku', duzen: 'dergi', parfumler: ['forbidden-pour-homme', 'ocean-vortex', 'velvet-rose'] },
      { ilan: 'numune-seti' },
      { ilan: 'forbidden-tanitim' },
      { ustYazi: 'İmza koleksiyon', baslik: 'Forbidden serisi', duzen: 'satir', parfumler: ['forbidden', 'black-orion', 'shadow', 'forbidden-pour-homme'] },
    ],
  },

  /* ------------------------------------------------------------------------
     4. İLANLAR — kampanya, yeni ürün, duyuru kartları
        Yeni ilan: bir bloğu kopyalayıp kodunu değiştirin, sonra ANA SAYFA →
        bolumler listesine { ilan: 'yeni-kod' }, satırını ekleyin.
        gorsel: images/ilanlar/ klasörüne koyduğunuz dosya (isteğe bağlı)
        goster: false → ilan gizlenir (silmeden saklayabilirsiniz)
     ------------------------------------------------------------------------ */
  ilanlar: [
    {
      kod: 'numune-seti',
      goster: true,
      ustYazi: 'Kararsız mısınız?',
      baslik: 'Önce deneyin: 3 kokuluk numune seti',
      metin: 'Seçtiğiniz üç kokudan 2 ml numune gönderelim, tende deneyin, sonra karar verin.',
      gorsel: 'images/marka/koleksiyon.webp',
      buton: 'WhatsApp\'tan isteyin',
      link: 'whatsapp',                 // 'whatsapp' → sipariş penceresini açar
    },
    {
      kod: 'forbidden-tanitim',
      goster: true,
      ustYazi: 'Yeni',
      baslik: 'Forbidden serisi çıktı',
      metin: 'Altın el bombası şişesiyle Forbidden Pour Homme ve yasak elma Forbidden şimdi koleksiyonda.',
      gorsel: 'images/parfumler/forbidden.webp',
      buton: 'Keşfet',
      link: 'forbidden-pour-homme',     // parfüm kodu → o parfümün penceresini açar
    },
  ],

  /* ------------------------------------------------------------------------
     5. KOLEKSİYONLAR — Koleksiyonlar sayfasındaki büyük paneller
        Yeni koleksiyon: bir bloğu kopyalayın, kod/ad/açıklama/görseli değiştirin.
        Parfümleri koleksiyona bağlamak için parfümlerdeki koleksiyon: 'kod' satırına yazın.
        gorsel boş bırakılırsa images/kategoriler/<kod>.webp kullanılır.
     ------------------------------------------------------------------------ */
  koleksiyonlar: [
    {
      kod: 'gece',
      ad: 'Gece Atölyesi',
      aciklama: 'Altın, duman ve kehribar. Forbidden serisi ve akşamdan sonra başlayan kokular.',
      gorsel: 'images/kategoriler/gece.webp',
      renk: '#4d1a24',        // panel rengi
      yaziRengi: '#f2efe9',
    },
    {
      kod: 'kiyi',
      ad: 'Kıyı Serisi',
      aciklama: 'Tuz, buz ve ıslak orman. Denizden dağa uzanan serin, temiz kokular.',
      gorsel: 'images/kategoriler/kiyi.webp',
      renk: '#23433a',        // panel rengi
      yaziRengi: '#f2efe9',
    },
    {
      kod: 'bahce',
      ad: 'Bahçe Defteri',
      aciklama: 'Kadife bir gül ve gece açan mor çiçekler. Bir bahçenin gündüzü ve gecesi.',
      gorsel: 'images/kategoriler/bahce.webp',
      renk: '#e4d9d4',        // panel rengi
      yaziRengi: '#1e3a31',
    },
  ],

  /* ------------------------------------------------------------------------
     6. KOKU AİLELERİ — Koku Rehberi ve parfüm filtresi
        gorsel boş bırakılırsa images/kategoriler/<kod>.webp kullanılır.
     ------------------------------------------------------------------------ */
  aileler: [
    {
      kod: 'odunsu',
      ad: 'Odunsu',
      renk: '#7a5a42',
      acikTon: '#e9e3da',
      karakter: 'Sıcak · kuru · sakin',
      baslik: 'Kuru tahta, sönmüş ateş, eski kitaplar.',
      aciklama: 'Sedir, vetiver ve meşe yosunu etrafında kurulan kokular. Tende yavaş açılır, saatlerce sakin bir iz bırakır. Sonbahar ve kış için doğal bir seçim; beyaz bir gömlekle yazın da şaşırtır.',
      notalar: ['Atlas sediri', 'Vetiver', 'Meşe yosunu', 'Sandal ağacı', 'Tütsü'],
      gorsel: 'images/kategoriler/odunsu.webp',
    },
    {
      kod: 'fresh',
      ad: 'Fresh',
      renk: '#3d6e68',
      acikTon: '#dfe7e3',
      karakter: 'Aydınlık · tuzlu · yeşil',
      baslik: 'Deniz kenarında kuruyan keten.',
      aciklama: 'Deniz tuzu, narenciye, nane ve lavanta. Yaz sabahları, ofis günleri ve serin bir ferahlık isteyen her an için.',
      notalar: ['Deniz tuzu', 'Bergamot', 'Nane', 'Lavanta', 'Beyaz misk'],
      gorsel: 'images/kategoriler/fresh.webp',
    },
    {
      kod: 'baharatli',
      ad: 'Baharatlı',
      renk: '#8e3b2a',
      acikTon: '#ece0da',
      karakter: 'Sıcak · keskin · karakterli',
      baslik: 'Bir çarşının en dar sokağı.',
      aciklama: 'Karabiber, kakule ve tarçın; altında deri, tütün ve oud. Forbidden serisinin karakteri: soğuk akşamlar ve iddialı anlar için.',
      notalar: ['Karabiber', 'Kakule', 'Safran', 'Tarçın', 'Deri'],
      gorsel: 'images/kategoriler/baharatli.webp',
    },
    {
      kod: 'ciceksi',
      ad: 'Çiçeksi',
      renk: '#8a3d55',
      acikTon: '#ece0e3',
      karakter: 'Pudralı · romantik · zarif',
      baslik: 'Kadife bir eldivenin içindeki çiçek.',
      aciklama: 'Gül, şakayık, menekşe ve lavanta; bazen pudralı ve zarif, bazen gece kadar koyu. Klişeden uzak, modern bir çiçek yorumu.',
      notalar: ['Damask gülü', 'Şakayık', 'Menekşe', 'Lavanta', 'Yasemin'],
      gorsel: 'images/kategoriler/ciceksi.webp',
    },
    {
      kod: 'amber',
      ad: 'Amber',
      renk: '#8c5a2b',
      acikTon: '#ebe3d9',
      karakter: 'Reçineli · sıcak · sarmalayıcı',
      baslik: 'Kış akşamı, yanan bir lamba.',
      aciklama: 'Labdanum, benzoin, vanilya ve tonka. Teni sıcak bir battaniye gibi saran, yakın mesafede hissedilen kokular.',
      notalar: ['Labdanum', 'Benzoin', 'Vanilya', 'Tonka', 'Bal'],
      gorsel: 'images/kategoriler/amber.webp',
    },
  ],

  /* ------------------------------------------------------------------------
     7. PARFÜMLER — sitede bu sırayla görünür (N° numarası sıradan otomatik verilir)

     YENİ PARFÜM EKLEMEK:
       1) Fotoğrafı images/parfumler/ klasörüne  <kod>.webp  adıyla koyun
          (ör. images/parfumler/gece-yolu.webp). .jpg / .png de olur: o zaman
          gorsel: 'images/parfumler/gece-yolu.jpg', satırını ekleyin.
       2) Aşağıdaki bir parfüm bloğunu kopyalayıp listenin sonuna yapıştırın.
       3) kod (boşluksuz, küçük harf, Türkçe karakter yok), ad, fiyatlar ve notaları değiştirin.
       4) Kaydedin, sayfayı yenileyin.

     aile:       KOKU AİLELERİ'ndeki kodlardan biri (odunsu, fresh, baharatli, ciceksi, amber)
     koleksiyon: KOLEKSİYONLAR'daki kodlardan biri (gece, kiyi, bahce) — boş bırakılabilir
     fiyatlar:   { ml: fiyat, ml: fiyat }   ör. { 50: 2450, 100: 3650 }
     goster:     false → parfüm siteden gizlenir
     ------------------------------------------------------------------------ */
  parfumler: [
    {
      kod: 'forbidden-pour-homme',
      ad: 'Forbidden Pour Homme',
      seri: 'DeepStone Forbidden',
      aile: 'baharatli',
      koleksiyon: 'gece',
      yogunluk: 'Eau de Parfum',
      fiyatlar: { 50: 3450, 100: 4950 },
      ust: ['Karabiber', 'Greyfurt'],
      orta: ['Tütün', 'Tarçın'],
      dip: ['Amber', 'Oud'],
      kisa: 'Markanın imza kokusu: patlayan bir baharat açılışı ve altın kadar sıcak bir dip.',
      hikaye: 'Altın bir el bombası gibi tasarlandı: ilk sıkımda keskin karabiber ve greyfurt, ardından tende yavaşça yanan tütün ve oud.',
    },
    {
      kod: 'forbidden',
      ad: 'Forbidden',
      seri: 'DeepStone Forbidden',
      aile: 'amber',
      koleksiyon: 'gece',
      yogunluk: 'Eau de Parfum',
      fiyatlar: { 50: 3250, 100: 4650 },
      ust: ['Kırmızı elma', 'Bergamot'],
      orta: ['Bal', 'Tarçın'],
      dip: ['Vanilya', 'Amber'],
      kisa: 'Yasak elma: parlak bir meyve, bal ve sıcak bir amber.',
      hikaye: 'Altın bir elmanın içine saklanmış bir koku. Parlak meyveyle açılır, bal ve tarçınla ısınır, vanilyalı bir amberle tende kalır.',
    },
    {
      kod: 'black-orion',
      ad: 'Black Orion',
      seri: 'DeepStone Forbidden',
      aile: 'baharatli',
      koleksiyon: 'gece',
      yogunluk: 'Extrait de Parfum',
      fiyatlar: { 50: 3250, 100: 4650 },
      ust: ['Karabiber', 'Kakule'],
      orta: ['Tütsü', 'Deri'],
      dip: ['Oud', 'Labdanum'],
      kisa: 'Gece yarısı gökyüzü kadar koyu: karabiber, tütsü ve dumanlı bir oud.',
      hikaye: 'Avcı takımyıldızının en parlak anına adandı. Keskin baharatla açılır, saatlerce tende kalan reçineli bir karanlığa iner.',
    },
    {
      kod: 'ocean-vortex',
      ad: 'Ocean Vortex',
      seri: 'DeepStone For Men',
      aile: 'fresh',
      koleksiyon: 'kiyi',
      yogunluk: 'Eau de Parfum',
      fiyatlar: { 50: 1950, 100: 2950 },
      ust: ['Deniz tuzu', 'Bergamot'],
      orta: ['Adaçayı', 'Lavanta'],
      dip: ['Ambergris akoru', 'Sedir'],
      kisa: 'Açık denizde bir dalganın içi: tuzlu, serin ve enerjik.',
      hikaye: 'Dalgaların kayalara çarptığı an. Deniz tuzu ve bergamotla parlak başlar, sedirli temiz bir dibe yerleşir.',
    },
    {
      kod: 'velvet-rose',
      ad: 'Velvet Rose',
      seri: 'DeepStone For Her',
      aile: 'ciceksi',
      koleksiyon: 'bahce',
      yogunluk: 'Eau de Parfum',
      fiyatlar: { 50: 2550, 100: 3750 },
      ust: ['Liçi', 'Pembe biber'],
      orta: ['Damask gülü', 'Şakayık'],
      dip: ['Misk', 'Kaşmir ağacı'],
      kisa: 'Kadife yapraklı bir gül: tatlı, pudralı ve zarif.',
      hikaye: 'Sabah toplanmış gül ve şakayık. Liçinin tatlılığı gülü hafifletir, misk ve kaşmir ağacı ona yumuşak bir iz bırakır.',
    },
    {
      kod: 'wild-terra',
      ad: 'Wild Terra',
      seri: 'DeepStone For Men',
      aile: 'odunsu',
      koleksiyon: 'kiyi',
      yogunluk: 'Eau de Parfum',
      fiyatlar: { 50: 2350, 100: 3450 },
      ust: ['Galbanum', 'Greyfurt'],
      orta: ['Meşe yosunu', 'Eğrelti otu'],
      dip: ['Vetiver', 'Sedir'],
      kisa: 'Yağmurdan sonra orman: ıslak toprak, yosun ve ağaç kabuğu.',
      hikaye: 'Ağaç kabuğundan oyulmuş bir şişe ve içinde ormanın kendisi. Yeşil galbanumla açılır, yosunlu ve odunsu bir derinliğe iner.',
    },
    {
      kod: 'lunar-elixir',
      ad: 'Lunar Elixir',
      seri: 'DeepStone Unisex',
      aile: 'amber',
      koleksiyon: 'gece',
      yogunluk: 'Extrait de Parfum',
      fiyatlar: { 50: 2950, 100: 4150 },
      ust: ['Bergamot', 'Pembe biber'],
      orta: ['İris', 'Beyaz çay'],
      dip: ['Benzoin', 'Beyaz misk'],
      kisa: 'Dolunayın gümüş ışığı: pudralı iris ve sıcak bir reçine.',
      hikaye: 'Kadın ya da erkek ayırmayan bir gece kokusu. İrisin serinliği benzoinin sıcaklığıyla buluşur.',
    },
    {
      kod: 'golden-amber',
      ad: 'Golden Amber',
      seri: 'DeepStone For Men',
      aile: 'amber',
      koleksiyon: 'gece',
      yogunluk: 'Eau de Parfum',
      fiyatlar: { 50: 3150, 100: 4400 },
      ust: ['Portakal kabuğu', 'Safran'],
      orta: ['Labdanum', 'Bal'],
      dip: ['Vanilya', 'Tonka'],
      kisa: 'Işıkta parlayan kehribar: bal, reçine ve sıcak vanilya.',
      hikaye: 'Kehribar taşlarının arasından doğan bir koku. Safranla parlar, labdanum ve balla koyulaşır, vanilyalı bir sıcaklıkla biter.',
    },
    {
      kod: 'shadow',
      ad: 'Shadow',
      seri: 'DeepStone Forbidden',
      aile: 'baharatli',
      koleksiyon: 'gece',
      yogunluk: 'Eau de Parfum',
      fiyatlar: { 50: 2950, 100: 4250 },
      ust: ['Kakule', 'Elemi'],
      orta: ['Tütün yaprağı', 'Deri'],
      dip: ['Huş katranı', 'Paçuli'],
      kisa: 'Dumanın arkasında kalan şey: deri, tütün ve koyu bir gölge.',
      hikaye: 'Keskin hatlı siyah bir şişe gibi net ve sessiz. Kakuleyle açılır, deri ve dumanlı huş katranıyla derinleşir.',
    },
    {
      kod: 'frost-legacy',
      ad: 'Frost Legacy',
      seri: 'DeepStone For Men',
      aile: 'fresh',
      koleksiyon: 'kiyi',
      yogunluk: 'Eau de Parfum',
      fiyatlar: { 50: 2150, 100: 3150 },
      ust: ['Nane', 'Kakule'],
      orta: ['Lavanta', 'Ardıç'],
      dip: ['Vetiver', 'Beyaz misk'],
      kisa: 'Kuzey rüzgârı gibi: buz serinliğinde, temiz ve keskin.',
      hikaye: 'Buzdan oyulmuş bir şişe. Nane ve kakuleyle ferahlatır, lavanta ve ardıçla temiz bir vetiver dibine iner.',
    },
    {
      kod: 'vanilla-noir',
      ad: 'Vanilla Noir',
      seri: 'DeepStone For Her',
      aile: 'amber',
      koleksiyon: 'gece',
      yogunluk: 'Eau de Parfum',
      fiyatlar: { 50: 2650, 100: 3850 },
      ust: ['Armut', 'Mandalina'],
      orta: ['Yasemin', 'Vanilya orkidesi'],
      dip: ['Burbon vanilyası', 'Sandal ağacı'],
      kisa: 'Karanlıkta sıcak bir vanilya: kremsi, tatlı ve sarmalayıcı.',
      hikaye: 'Burbon vanilyası ve yasemin. Meyveli bir açılıştan sonra kremsi, sandal ağaçlı bir sıcaklığa dönüşür.',
    },
    {
      kod: 'royal-oud',
      ad: 'Royal Oud',
      seri: 'DeepStone For Men',
      aile: 'odunsu',
      koleksiyon: 'gece',
      yogunluk: 'Extrait de Parfum',
      fiyatlar: { 50: 3450, 100: 4950 },
      ust: ['Safran', 'Elemi'],
      orta: ['Oud', 'Gül'],
      dip: ['Sandal ağacı', 'Amber'],
      kisa: 'Saray kapılarından yükselen duman: safran, gül ve asil bir oud.',
      hikaye: 'Siyah ve altının buluştuğu bir şişe. Safranla açılır, gül ve oudla yoğunlaşır, sandal ağacıyla uzun süre kalır.',
    },
    {
      kod: 'midnight-blossom',
      ad: 'Midnight Blossom',
      seri: 'DeepStone For Her',
      aile: 'ciceksi',
      koleksiyon: 'bahce',
      yogunluk: 'Eau de Parfum',
      fiyatlar: { 50: 2550, 100: 3750 },
      ust: ['Böğürtlen', 'Bergamot'],
      orta: ['Lavanta', 'Menekşe'],
      dip: ['Paçuli', 'Misk'],
      kisa: 'Gece açan mor çiçekler: lavanta, menekşe ve koyu meyveler.',
      hikaye: 'Mor bir kristal gibi parlayan bir koku. Böğürtlenle açılır, lavanta ve menekşeyle çiçeklenir, paçuliyle derinleşir.',
    },
    {
      kod: 'kings-path',
      ad: 'King\'s Path',
      seri: 'DeepStone For Men',
      aile: 'odunsu',
      koleksiyon: 'gece',
      yogunluk: 'Eau de Parfum',
      fiyatlar: { 50: 2950, 100: 4250 },
      ust: ['Kişniş', 'Pembe biber'],
      orta: ['Deri', 'Atlas sediri'],
      dip: ['Vetiver', 'Tütsü'],
      kisa: 'Taş bir yolda yürüyen kral: deri, sedir ve tütsü.',
      hikaye: 'Taçlı bir şişe ve kararlı bir koku. Baharatla açılır, deri ve sedirle güçlenir, tütsülü bir izle kalır.',
    },
  ],
};
