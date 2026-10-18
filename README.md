# PyBox Arcade - Media Pembelajaran Python Tergamifikasi

**PyBox Arcade** adalah media pembelajaran interaktif berbasis web yang dirancang khusus untuk materi **Dasar Pemrograman Python** (Variabel, Tipe Data `int`/`float`/`str`/`bool`, dan Operasi Aritmatika). Media ini dirancang untuk siswa SMA Kelas X (Informatika Fase E) dengan mengadopsi estetika serta psikologi desain interaktif modern yang bersih, taktil, dan responsif.

---

## Fitur Utama

1. **Slide-Over Navigation Drawer**:
   - Menu navigasi geser (slide-in) dari sisi kanan layar dengan animasi transisi yang mulus.
   - Menampilkan 4 kartu modul pembelajaran dengan penjelasan fungsi dan tujuan belajar yang ringkas dan terstruktur.

2. **Transisi dan Animasi Dinamis**:
   - Setiap perpindahan antar-modul dan kemunculan elemen dilengkapi dengan animasi berbasis Framer Motion (`AnimatePresence`).
   - Tampilan bersih tanpa elemen yang membingungkan atau visual berlebih.

3. **Komponen Taktil dan Suara Interaktif**:
   - Tombol dan kartu interaktif dengan efek elevasi taktil (`border-b-4` dan micro-interaction saat ditekan).
   - Efek suara berbasis Web Audio API (chiptune pop, ding, dan umpan balik suara ramah) yang berjalan 100% offline tanpa unduhan aset audio eksternal.

4. **Karakter Panduan Interaktif: "Pyto"**:
   - Maskot vektor SVG dengan status emosi dinamis untuk memberikan umpan balik dan tips belajar secara bersahabat.

---

## 4 Modul Interaktif PyBox

1. **Modul 1: Gudang Memori RAM (Kotak Variabel)**
   - Validator penamaan variabel Python secara real-time (mencegah spasi, awalan angka, simbol ilegal, dan reserved keywords).
   - Visualisasi rak slot memori RAM (`0x01`, `0x02`, dll) dengan demonstrasi konsep re-assignment nilai variabel.

2. **Modul 2: Sortir Tipe Data Arcade**
   - 10 kartu soal interaktif bertingkat dengan tombol corong klasifikasi tipe data.
   - Membedakan konsep nilai pemula: `"16"` vs `16`, `0.0` vs `0`, dan `"False"` vs `False`.

3. **Modul 3: Alkimia Operator Aritmatika**
   - Eksplorasi 7 operator Python (`+`, `-`, `*`, `/`, `//`, `%`, `**`).
   - Penjelasan edukatif `ZeroDivisionError`.
   - Komparator: membedakan penggabungan teks (`"10" + "5" = "105"`) versus penjumlahan numerik (`10 + 5 = 15`).

4. **Modul 4: Cyber Terminal Sandbox**
   - Simulasi eksekusi terminal interaktif untuk 3 program mandiri:
     1. Program Sambutan dan Penghitung Usia Otomatis.
     2. Program Kalkulator 4 Operasi.
     3. Program Ambang Batas Kelulusan Logika Boolean (>= 75).
   - Kartu refleksi pemahaman konsep pemrograman.

---

## Cara Menjalankan Media

### 1. Cara Paling Praktis (100% Offline / Luring)
Cukup buka berkas berikut di File Explorer:
* **`dist/index.html`** atau jalankan **`buka_game.bat`** (Windows)  
*(Seluruh kode React, Tailwind, ikon, suara, dan animasi telah dibundel menjadi 1 berkas tunggal mandiri yang dapat dibuka langsung di browser Chrome, Edge, atau Firefox tanpa instalasi Node.js).*

### 2. Mode Pengembangan (Development Server)
Jika ingin memodifikasi komponen atau kode sumber:
```bash
npm install
npm run dev
```
Buka URL lokal yang muncul (biasanya `http://localhost:5173`) di browser.

Untuk membuat bundel produksi mandiri terbaru:
```bash
npm run build
```

---

## Tech Stack
* **Bundler & Tooling**: Vite & vite-plugin-singlefile
* **Framework**: React 19 (TypeScript)
* **Styling**: Tailwind CSS v4
* **Animations**: Framer Motion
* **Icons**: Lucide Icons
* **Audio Engine**: Web Audio API Sound Synthesizer (Zero-Network Dependency)
