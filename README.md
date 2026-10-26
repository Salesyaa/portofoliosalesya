# 🌸 Portofolio Salesya — Pink Cute Portfolio Website

Website portofolio personal dengan tema pink imut, responsif, dan penuh animasi. Dibuat menggunakan HTML, CSS murni, dan JavaScript vanilla.

---

## 🎨 Desain & Tema

| Properti | Detail |
|---|---|
| Warna Utama | Pink (`#FF6B9D`, `#FFB3C6`, `#FFC0CB`) |
| Warna Aksen | Lavender (`#C9B8FF`), Putih (`#FFF0F5`) |
| Tipografi | Google Fonts — *Nunito* (body), *Playfair Display* (heading) |
| Gaya Desain | Kawaii/Pastel, Glassmorphism, Soft Shadow |
| Animasi | Fade-in scroll, Floating icons, Typing text, Sparkle particles |

---

## 📁 Struktur Folder

```
portofolio_salesya/
│
├── index.html                  ← Halaman utama (single-page)
│
├── css/
│   ├── style.css               ← Style utama & variabel warna
│   ├── animations.css          ← Semua keyframe & transisi animasi
│   └── responsive.css          ← Media queries untuk mobile/tablet
│
├── js/
│   ├── main.js                 ← Logic utama (scroll, navigasi, dll)
│   ├── carousel.js             ← Komponen carousel foto pengalaman
│   ├── particles.js            ← Animasi sparkle/partikel latar
│   └── typewriter.js           ← Efek ketik teks otomatis
│
└── assets/
    ├── img/
    │   ├── profile/
    │   │   └── foto_profile.jpg        ← Foto profil utama
    │   ├── experience/
    │   │   ├── exp1/
    │   │   │   ├── doc1.jpg            ← Foto dokumentasi pengalaman 1
    │   │   │   └── doc2.jpg
    │   │   ├── exp2/
    │   │   │   ├── doc1.jpg
    │   │   │   └── doc2.jpg
    │   │   └── exp3/
    │   │       └── doc1.jpg
    │   ├── certificates/
    │   │   ├── cert1.jpg               ← Foto sertifikat
    │   │   └── cert2.jpg
    │   └── icons/
    │       └── favicon.ico
    └── barcode/
        └── barcode_contact.png         ← QR Code / barcode kontak
```

---

## 📄 Seksi Halaman (`index.html`)

### 1. 🏠 Navbar
- Logo / nama singkat
- Menu navigasi: Tentang | Pendidikan | Pengalaman | Sertifikat | Kontak
- Hamburger menu (mobile)
- Sticky + blur saat scroll

### 2. 🌸 Hero Section
- Foto profil melingkar dengan border pink animasi
- Nama lengkap + gelar/profesi
- Efek *typewriter* untuk deskripsi singkat
- Tombol "Lihat Portofolio" & "Hubungi Saya"
- Background dengan partikel/bunga beterbangan

### 3. 👩 Tentang Saya (About / Biodata)
- Foto + info singkat (nama, TTL, jurusan, universitas)
- Paragraf deskripsi diri
- Info tambahan: Hobi, Keahlian (progress bar lucu)
- Animasi fade-in saat di-scroll

### 4. 🎓 Pendidikan (Education)
- Timeline vertikal dengan ikon sekolah/universitas
- Setiap item: Nama institusi, jurusan, tahun masuk–lulus, deskripsi singkat
- Warna bergantian pink & lavender
- Animasi slide-in kiri/kanan

### 5. 💼 Pengalaman (Experience)
- Setiap pengalaman ditampilkan sebagai *card*
- Setiap card memiliki:
  - Judul & posisi
  - Periode waktu
  - Deskripsi pekerjaan/kegiatan
  - **Carousel foto dokumentasi** (prev/next + dot indicator)
- Animasi hover tilt card

### 6. 🏆 Sertifikat (Certificates)
- Grid / masonry layout foto sertifikat
- Efek hover zoom + overlay info nama sertifikat & tahun
- Modal/lightbox saat diklik (tampil besar)
- Filter berdasarkan kategori (opsional)

### 7. 📬 Kontak (Contact)
- Form kontak sederhana (nama, email, pesan)
- Link sosial media dengan ikon animasi:
  - 📧 Email → `mailto:` link
  - 📸 Instagram → link profil IG
  - 💼 LinkedIn → link profil LinkedIn
- **QR Code / Barcode** yang bisa di-scan untuk vCard / link profil
- Animasi bounce ikon sosmed

### 8. 🌸 Footer
- Teks copyright
- Ikon hati animasi
- Kembali ke atas (scroll-to-top button)

---

## 🛠️ Fitur Teknis

| Fitur | Implementasi |
|---|---|
| Animasi Scroll | Intersection Observer API |
| Carousel Gambar | Vanilla JS (tanpa library) |
| Efek Typewriter | Vanilla JS interval |
| Partikel Latar | Canvas API atau CSS keyframe |
| Modal Sertifikat | Vanilla JS + CSS transition |
| Navigasi Aktif | JS scroll listener |
| Responsive | CSS Media Queries (Mobile-first) |
| Smooth Scroll | CSS `scroll-behavior: smooth` |

---

## 🚀 Cara Menjalankan

1. Buka folder di editor (VS Code, dll)
2. Ganti file foto di `assets/img/` sesuai kebutuhan
3. Edit informasi di `index.html` (nama, pendidikan, pengalaman, dll)
4. Buka `index.html` di browser — selesai! ✨

---

## 📝 Catatan Pengembangan

- Semua gambar placeholder akan diganti dengan foto asli
- QR Code bisa dibuat gratis di [qr-code-generator.com](https://www.qr-code-generator.com/)
- Warna bisa dikustomisasi lewat CSS variable di `css/style.css` bagian `:root`

---

*Dibuat dengan 💖 dan banyak ☕*
