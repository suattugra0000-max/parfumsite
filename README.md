# DeepStone — siteyi düzenleme rehberi

Sitenin bütün içeriği **tek bir dosyada**: `katalog.js`. Veritabanı, sunucu ya da program gerekmez.

```
site/
├─ index.html        Siteyi görmek için çift tıklayın
├─ katalog.js        ← DÜZENLEDİĞİNİZ TEK DOSYA (parfümler, ana sayfa, ilanlar, koleksiyonlar)
├─ images/
│  ├─ parfumler/     Parfüm fotoğrafları
│  ├─ kategoriler/   Koleksiyon ve koku ailesi fotoğrafları
│  ├─ ilanlar/       İlan görselleri
│  └─ marka/         Hakkımızda görseli
├─ styles.css        Tasarım (dokunmanıza gerek yok)
└─ script.js         Sitenin çalışması (dokunmanıza gerek yok)
```

## Nasıl çalışılır

1. `katalog.js`'e sağ tıklayın → **Birlikte aç** → **Not Defteri** (ya da VS Code).
2. Değişikliği yapın, **Ctrl + S** ile kaydedin.
3. `index.html`'e çift tıklayın (açıksa **F5** ile yenileyin).

Bir hata yaparsanız (yanlış kod, eksik fotoğraf, unutulmuş virgül) sitenin sol altında sarı ya da kırmızı bir kutu ne olduğunu söyler. Bu kutu yalnızca siteyi kendi bilgisayarınızda açtığınızda görünür; ziyaretçiler görmez.

---

## 1. Yeni parfüm eklemek

**a) Fotoğrafı koyun.** `images/parfumler/` klasörüne, parfümün kodu adıyla kaydedin. Örnek: `images/parfumler/gece-yolu.webp`.

> Kod: küçük harf, boşluk yerine tire, Türkçe karakter yok (`ç→c, ğ→g, ı→i, ö→o, ş→s, ü→u`).
> Fotoğraf `.jpg` ya da `.png` olabilir; o zaman parfüme `gorsel: 'images/parfumler/gece-yolu.jpg',` satırını ekleyin.

**b) `katalog.js`'te en alttaki `parfumler:` listesine** bu bloğu yapıştırın:

```js
    {
      kod: 'gece-yolu',
      ad: 'Gece Yolu',
      seri: 'DeepStone For Men',
      aile: 'odunsu',
      koleksiyon: 'gece',
      yogunluk: 'Eau de Parfum',
      fiyatlar: { 50: 2450, 100: 3650 },
      ust: ['Bergamot', 'Karabiber'],
      orta: ['Sedir', 'Lavanta'],
      dip: ['Vetiver', 'Misk'],
      kisa: 'Kartta görünen bir iki cümlelik açıklama.',
      hikaye: 'Ürün penceresinde görünen uzun açıklama.',
    },
```

- `aile` için yazılabilecek kodlar: `odunsu`, `fresh`, `baharatli`, `ciceksi`, `amber`
- `koleksiyon` için yazılabilecek kodlar: `gece`, `kiyi`, `bahce` (ya da sizin eklediğiniz yeni bir koleksiyon)
- Sadece 50 ml satıyorsanız fiyatı şöyle yazın: `fiyatlar: { 50: 2450 },`
- Bir parfümü silmeden gizlemek için bloğa `goster: false,` ekleyin.
- Parfümler sitede listedeki sırayla görünür; N° numarası sıraya göre otomatik verilir.

## 2. Ana sayfayı düzenlemek

`katalog.js` → **`anaSayfa`** bölümü:

```js
  anaSayfa: {
    vitrin: 'forbidden-pour-homme',     // açılıştaki büyük görselde hangi parfüm olsun
    bolumler: [
      { ustYazi: 'Bu mevsim', baslik: 'En çok sorulan üç koku', duzen: 'dergi', parfumler: ['forbidden-pour-homme', 'ocean-vortex', 'velvet-rose'] },
      { ilan: 'numune-seti' },
      { ustYazi: 'İmza koleksiyon', baslik: 'Forbidden serisi', duzen: 'satir', parfumler: ['forbidden', 'black-orion', 'shadow'] },
    ],
  },
```

- **Bir bölümdeki parfümleri değiştirmek:** `parfumler: [...]` içindeki kodları değiştirin.
- **Sırayı değiştirmek:** Satırları yukarı/aşağı taşıyın.
- **Yeni bölüm eklemek:** Bir satırı kopyalayıp başlığını ve parfümlerini değiştirin.
- **Bölümü kaldırmak:** Satırı silin.
- **Düzen seçenekleri:**
  - `duzen: 'dergi'` → 1 büyük + 2 küçük (tam 3 parfüm gerekir)
  - `duzen: 'satir'` → istediğiniz kadar parfüm, yan yana kartlar

## 3. İlan eklemek (kampanya, yeni ürün, duyuru)

**a)** İsterseniz görselini `images/ilanlar/` klasörüne koyun (ör. `images/ilanlar/kasim.webp`).

**b)** `katalog.js` → **`ilanlar:`** listesine bir blok ekleyin:

```js
    {
      kod: 'kasim-firsati',
      goster: true,
      ustYazi: 'Sadece bu ay',
      baslik: '100 ml\'lerde %15 indirim',
      metin: 'Kasım boyunca tüm 100 ml şişelerde geçerli.',
      gorsel: 'images/ilanlar/kasim.webp',
      buton: 'Parfümleri gör',
      link: '#/parfumler',
    },
```

**c)** İlanın ana sayfada görünmesi için `anaSayfa → bolumler` listesine istediğiniz yere şu satırı ekleyin:
```js
      { ilan: 'kasim-firsati' },
```

`link` için seçenekler:

| Yazdığınız | Butona basınca |
|---|---|
| `'#/parfumler'` | Parfümler sayfası (`#/koleksiyonlar`, `#/rehber`, `#/hakkimizda` da olur) |
| `'black-orion'` (bir parfüm kodu) | O parfümün penceresi açılır |
| `'whatsapp'` | WhatsApp mesaj penceresi açılır |
| `'https://…'` | Başka bir site yeni sekmede açılır |

- Görsel yazmazsanız ilan sadece metinden oluşur.
- İlanı geçici olarak kapatmak için `goster: false` yazın.

**Üstteki ince duyuru çubuğu:** `duyuruSeridi` bölümündeki `metin`'i değiştirin. Kapatmak için `goster: false` yazın.

## 4. Yeni koleksiyon eklemek

**a)** Koleksiyon fotoğrafını `images/kategoriler/<kod>.webp` adıyla koyun (ör. `images/kategoriler/kis.webp`).

**b)** `katalog.js` → **`koleksiyonlar:`** listesine ekleyin:

```js
    {
      kod: 'kis',
      ad: 'Kış Defteri',
      aciklama: 'Kar, kestane ve sıcak bir şömine.',
      renk: '#2b3a4a',          // panel rengi
      yaziRengi: '#f2efe9',
    },
```

**c)** Parfümleri bu koleksiyona bağlamak için ilgili parfümlerde `koleksiyon: 'kis',` yazın.

Koleksiyonlar sayfası 3'ten fazla koleksiyon olunca kendiliğinden ızgara düzenine geçer.

## 5. Fotoğraf değiştirmek

İlgili klasördeki dosyanın üzerine **aynı adla** yeni fotoğrafı kaydedin, sayfayı yenileyin (gerekirse **Ctrl + F5**).

- Parfümler: `images/parfumler/<parfüm kodu>.webp`
- Koleksiyon ve koku aileleri: `images/kategoriler/<kod>.webp`

En iyi görünüm için dikey (yaklaşık 4:5) ve en az 800 piksel genişliğinde fotoğraf kullanın.

## 6. WhatsApp numarası ve çalışma saatleri

`katalog.js`'in en başındaki **`ayarlar`** bölümünden değiştirin. Numarayı ülke koduyla ve sadece rakam olarak yazın, örneğin `'905321234567'`.

---

## Yazım kuralları (hata yapmamak için)

- Metinler tek tırnak içinde yazılır: `'Gece Yolu'`
- Metnin içinde kesme işareti varsa önüne `\` koyun: `'King\'s Path'`, `'WhatsApp\'tan'`
- Her bloğun sonundaki virgülü silmeyin: `},`
- `//` ile başlayan kısımlar açıklamadır, siteyi etkilemez.

## İnternette yayınlama (GitHub Pages)

Bu klasördeki her şeyi deponuza yükleyin: `index.html`, `katalog.js`, `styles.css`, `script.js` ve `images` klasörü. Ayarlar → Pages'ten **main** dalını seçin.

Sonraki değişikliklerde yalnızca değişen dosyayı (çoğunlukla `katalog.js` ve yeni fotoğraflar) yeniden yüklemeniz yeterli.
