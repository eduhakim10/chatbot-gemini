# 💬 Simulasi AI Chatbot Customer Service Otomotif (WhatsApp Business UI)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green.svg)](https://nodejs.org/)
[![Google Gemini](https://img.shields.io/badge/Google%20Gemini-3.5%20Flash%20Lite-blue.svg)](https://aistudio.google.com/)
[![Express.js](https://img.shields.io/badge/Express.js-4.x-lightgrey.svg)](https://expressjs.com/)

Simulasi chatbot layanan pelanggan dealer mobil menggunakan **Google Gemini AI (`gemini-3.5-flash-lite`)**, **Node.js**, **Express**, dan **Vanilla JavaScript**, dengan studi kasus informasi dealer **Hyundai Summarecon Bekasi**. Proyek ini dilengkapi antarmuka interaktif bertema **WhatsApp Business Web & Mobile** (tampilan simulasi verifikasi bisnis, bubble percakapan WhatsApp dengan indikator centang dua biru `✓✓`, quick-action chips, serta drawer informasi dealer).

Proyek ini dirancang agar **ramah bagi pemrogram pemula (beginner-friendly)** yang ingin belajar cara mengintegrasikan Large Language Model (LLM) ke dalam aplikasi web nyata, mengelola *System Instruction*, menerapkan *Guardrails*, dan menguji API via Postman.

> [!IMPORTANT]
> **Penafian Hukum (Disclaimer):**
> Proyek ini dibuat secara independen murni untuk **tujuan edukasi dan pembelajaran**. Proyek ini **tidak berafiliasi, tidak disponsori, dan tidak mewakili secara resmi** PT Hyundai Motors Indonesia, Google LLC, maupun WhatsApp / Meta Platforms Inc. Seluruh merek dagang dan nama dagang adalah milik pemegang hak cipta masing-masing.

---

## 🌟 Fitur Utama

1. **Arsitektur Chatbot & REST API Modern**:
   - Struktur modular: Backend Express melayani antarmuka statis dari folder `public/` (`index.html`, `style.css`, `script.js`).
   - Endpoint utama: `POST /api/chat` menerima multi-turn context payload `{ conversation: [...] }` dan mengembalikan `{ result: "..." }`.
   - Menggunakan SDK resmi Google Gen AI (`@google/genai`) dengan parameter `systemInstruction` dan `temperature`.
   - Integrasi elemen UI yang bersih dan responsif: `#chat-box`, `#chat-form`, dan `#user-input`.

2. **Konteks Studi Kasus Dealer Hyundai Summarecon Bekasi**:
   - **Alamat**: Jl. Bulevar Ahmad Yani, Blok VA No. 1-2, Kawasan Sentra Summarecon Bekasi, Kota Bekasi 17142.
   - **Jam Operasional**:
     - *Showroom*: Senin – Sabtu: 08.30 – 19.00 WIB | Minggu & Hari Libur: 09.00 – 17.00 WIB.
     - *Bengkel Resmi (Service & Spare Parts)*: Senin – Jumat: 08.00 – 16.30 WIB | Sabtu: 08.00 – 15.00 WIB (Minggu Tutup).
   - **Line-up Produk**: Hyundai Creta & Creta Alpha, Stargazer & Stargazer X, All New Santa Fe (Hybrid & Gasoline), Palisade, All New Kona Electric (Baterai produksi lokal, jarak tempuh hingga 600+ km), Ioniq 5 / 5 N, Ioniq 6, dan Staria.
   - **Layanan Purna Jual & Garansi**: Garansi baterai EV 8 tahun / 160.000 KM, garansi kendaraan 3–4 tahun, gratis jasa servis 5 tahun, fasilitas EV Ultra Fast Charger, serta layanan booking test drive.

3. **Gaya Komunikasi & Guardrail (Batasan)**:
   - **Model AI**: `gemini-3.5-flash-lite` (cepat, hemat kuota, efisien, dan responsif).
   - **Tone of Voice**: Profesional, formal, terstruktur, santun, dan objektif (standar representatif layanan pelanggan dealership otomotif, tanpa bahasa gaul/slang).
   - **Guardrail Konteks**: Menolak secara sopan dan profesional setiap pertanyaan yang berada di luar topik dealer Hyundai.

4. **Antarmuka WhatsApp Chat**:
   - Header hijau khas WhatsApp (`#008069`) dengan avatar dealer, badge centang hijau simulasi bisnis terverifikasi, dan status "Online".
   - Wallpaper chat bertekstur *doodle pattern* khas WhatsApp (`#efeae2`).
   - Quick action chips (Alamat, Mobil Listrik EV, Santa Fe, Stargazer, Test Drive, Booking Servis, Simulasi Kredit).
   - Bubble chat pengguna (hijau muda dengan centang dua biru `✓✓` dan waktu pesan) & bubble chat bot (putih).
   - Animasi indikator mengetik WhatsApp ("Thinking...").
   - Modal drawer informasi studi kasus dealer lengkap dengan tautan ke Google Maps.

---

## 🏗️ Penjelasan Arsitektur Backend

Di dalam repositori ini, kode backend utama dan materi referensi telah dipisahkan secara rapi agar tidak membingungkan pemula:

| Lokasi / Berkas | Status | Modul | SDK Gemini | Deskripsi |
| :--- | :---: | :---: | :---: | :--- |
| **`index.js`** *(Root)* | **AKTIF (Utama & Siap Pakai)** | **ES Module** (`import`) | `@google/genai` | **Server utama yang dijalankan oleh `npm start`**. Menyajikan frontend WhatsApp di folder `public/`, menyediakan endpoint `POST /api/chat`, fitur upload gambar (`/generate-from-image`), info dealer (`/api/dealer-info`), health check (`/api/health`), rate limiter, guardrail keamanan, dan *automatic fallback*. |
| **`examples/modular-commonjs-backend/`** | *Referensi Pembelajaran* | **CommonJS** (`require`) | `@google/generative-ai` | Contoh arsitektur REST API modular terpisah dengan multi-session in-memory (`Map`). Dipisahkan ke folder referensi mandiri lengkap dengan `package.json` tersendiri agar tidak menimbulkan konflik format modul (*ESM vs CommonJS*). |

> [!NOTE]
> Untuk menjalankan proyek web ini, pemula cukup menjalankan perintah **`npm start`** atau **`npm run dev`** di folder root proyek. File yang dieksekusi secara otomatis adalah **`index.js`**.

---

## 📁 Struktur Direktori

```text
gemini-chatbot/
├── node_modules/                          # Dependensi Node.js
├── public/                                # File statis frontend (WhatsApp UI)
│   ├── assets/
│   │   └── hyundai_showroom.jpg           # Foto fasad showroom dealer
│   ├── index.html                         # Halaman chat WhatsApp (#chat-box, #chat-form, #user-input)
│   ├── script.js                          # Client-side JavaScript (Fetch POST /api/chat)
│   └── style.css                          # Styling WhatsApp Web & Mobile responsive
├── examples/                              # Folder materi pembelajaran/referensi terpisah
│   └── modular-commonjs-backend/          # Contoh REST API modular CommonJS (require)
│       ├── package.json                   # Konfigurasi CommonJS tersendiri
│       ├── server.js                      # Entry point server referensi
│       ├── README.md                      # Panduan menjalankan contoh modular
│       └── src/
│           ├── gemini.js                  # Service wrapper SDK Google Generative AI
│           └── routes.js                  # Router endpoint modular
├── .env                                   # Konfigurasi lokal (rahasia, tidak di-commit ke Git)
├── .env.example                           # Contoh template konfigurasi environment
├── .gitignore                             # Berkas/folder yang diabaikan Git
├── Gemini_Chatbot.postman_collection.json # Koleksi Postman siap import
├── index.js                               # BACKEND UTAMA (Express + @google/genai + Static Serve)
├── package.json                           # Konfigurasi dependensi & skrip npm ("type": "module")
├── LICENSE                                # Lisensi Open Source (MIT)
└── README.md                              # Dokumentasi panduan lengkap
```

---

## 🚀 Panduan Memulai Cepat (Langkah demi Langkah)

Ikuti langkah-langkah di bawah ini untuk menjalankan proyek di komputer lokal:

### 1. Clone Repository

Buka Terminal (macOS/Linux) atau Git Bash / Command Prompt (Windows), lalu jalankan:

```bash
git clone https://github.com/eduhakim10/chatbot-gemini.git
cd chatbot-gemini
```

### 2. Install Dependensi

Pastikan Anda telah memasang **Node.js versi 18 atau lebih baru** (`node -v`). Kemudian pasang seluruh dependensi:

```bash
npm install
```

### 3. Salin & Siapkan File Konfigurasi Environment (`.env`)

Salin berkas contoh `.env.example` menjadi `.env`:

- **Di macOS / Linux:**
  ```bash
  cp .env.example .env
  ```
- **Di Windows (Command Prompt):**
  ```cmd
  copy .env.example .env
  ```
- **Di Windows (PowerShell):**
  ```powershell
  Copy-Item .env.example .env
  ```

Buka file `.env` yang baru dibuat menggunakan text editor (VS Code, Notepad, dll.), lalu isi API Key Anda:

```env
PORT=3000

# Dapatkan API Key gratis di: https://aistudio.google.com/app/apikey
GEMINI_API_KEY=MASUKKAN_GEMINI_API_KEY_ANDA_DI_SINI

# Model Gemini yang digunakan (default: gemini-3.5-flash-lite)
GEMINI_MODEL=gemini-3.5-flash-lite
```

> [!TIP]
> **Cara Mendapatkan Gemini API Key Gratis:**
> 1. Kunjungi [Google AI Studio](https://aistudio.google.com/).
> 2. Masuk menggunakan akun Google Anda.
> 3. Klik tombol **"Get API key"** lalu pilih **"Create API key"**.
> 4. Salin kunci API yang dihasilkan dan tempelkan pada nilai `GEMINI_API_KEY=` di file `.env`.

### 4. Jalankan Aplikasi

Jalankan server dalam mode standar:

```bash
npm start
```

Atau dalam mode development (otomatis me-restart server setiap ada perubahan kode file):

```bash
npm run dev
```

Jika berhasil, terminal akan menampilkan:

```text
====================================================
🛡️ Hyundai Summarecon Bekasi Chatbot Server Aktif
🤖 Model Gemini: gemini-3.5-flash-lite
🔒 Mode Keamanan: Rate Limiter & Guardrails Aktif
🌐 URL Aplikasi: http://localhost:3000
💬 Endpoint Chat: POST http://localhost:3000/api/chat
====================================================
```

### 5. Buka di Browser

Buka peramban (Chrome, Edge, Safari, Firefox) dan akses:
👉 **`http://localhost:3000`**

Anda akan langsung disambut oleh tampilan simulasi chat WhatsApp Hyundai Summarecon Bekasi dan dapat langsung mengirimkan pesan atau memilih quick reply chips!

---

## 📮 Pengujian API Menggunakan Postman

Proyek ini telah dilengkapi file koleksi Postman siap pakai: [**`Gemini_Chatbot.postman_collection.json`**](./Gemini_Chatbot.postman_collection.json).

### Cara Import ke Postman:
1. Buka aplikasi **Postman**.
2. Klik tombol **Import** pada pojok kiri atas jendela Postman.
3. Seret (*drag and drop*) file [`Gemini_Chatbot.postman_collection.json`](./Gemini_Chatbot.postman_collection.json) dari folder proyek Anda, atau klik **Files** dan pilih file tersebut.
4. Koleksi *"Hyundai Summarecon Bekasi Chatbot API"* akan muncul di panel koleksi sebelah kiri.

### Contoh Request Utama (`POST /api/chat`)
- **Method**: `POST`
- **URL**: `http://localhost:3000/api/chat`
- **Headers**:
  ```text
  Content-Type: application/json
  ```
- **Body (raw JSON)**:
  ```json
  {
    "conversation": [
      {
        "role": "user",
        "text": "Di mana alamat dealer Hyundai Summarecon Bekasi dan mobil apa saja yang ready?"
      }
    ]
  }
  ```
- **Contoh Response (200 OK)**:
  ```json
  {
    "result": "Selamat pagi/siang. Terima kasih telah menghubungi Layanan Informasi Hyundai Summarecon Bekasi.\n\nAlamat dealer kami berada di:\nJl. Bulevar Ahmad Yani, Blok VA No. 1-2, Kawasan Sentra Summarecon Bekasi, Kota Bekasi 17142.\n\nLini kendaraan yang tersedia antara lain:\n1. Hyundai Creta & Creta Alpha\n2. Hyundai Stargazer & Stargazer X\n3. All New Santa Fe (Hybrid & Gasoline)\n4. Hyundai Palisade\n5. All New Kona Electric & Ioniq Series..."
  }
  ```

---

## 🧪 Contoh Pertanyaan untuk Menguji Bot (Konteks & Guardrail)

Gunakan daftar pertanyaan berikut untuk memverifikasi apakah System Instruction dan Guardrail AI bekerja sesuai harapan:

### A. Pertanyaan Dalam Konteks (In-Scope — Harap Dijawab Akurat)

| No | Pertanyaan Pengguna | Ekspektasi Respons AI |
| :-: | :--- | :--- |
| 1 | *"Berapa tahun garansi baterai untuk mobil listrik Hyundai Kona Electric?"* | Menjelaskan secara presisi: garansi baterai 8 tahun atau 160.000 KM. |
| 2 | *"Apakah bengkel resmi buka hari Minggu?"* | Menegaskan bahwa bengkel tutup hari Minggu (Senin–Jumat: 08.00–16.30 WIB, Sabtu: 08.00–15.00 WIB), namun showroom tetap buka (09.00–17.00 WIB). |
| 3 | *"Saya ingin mencoba test drive Santa Fe Hybrid, bagaimana caranya?"* | Menjelaskan syarat booking test drive dan mengarahkan ke kontak WhatsApp konsultasi. |
| 4 | *"Apakah ada fasilitas pengisian daya cepat (Ultra Fast Charger) di dealer ini?"* | Mengonfirmasi ketersediaan fasilitas EV Ultra Fast Charger di Hyundai Summarecon Bekasi. |

### B. Pertanyaan Uji Guardrail / Di Luar Konteks (Out-of-Scope — Harus Ditolak Sopan)

| No | Pertanyaan Pengguna | Ekspektasi Respons AI |
| :-: | :--- | :--- |
| 1 | *"Tuliskan puisi cinta 4 bait tentang senja."* | **Menolak dengan sopan**: *"Mohon maaf, sebagai perwakilan layanan informasi Hyundai Summarecon Bekasi, kami hanya dapat membantu memberikan informasi seputar produk, layanan, servis, dan penjualan kendaraan Hyundai..."* |
| 2 | *"Berapa harga mobil Toyota Avanza atau Honda HR-V terbaru?"* | **Menolak dengan sopan**: Menolak memberikan informasi merk lain dan menawarkan lini produk setara dari Hyundai (misal: Stargazer atau Creta). |
| 3 | *"Siapa yang memenangkan pemilihan presiden tahun ini?"* | **Menolak dengan sopan**: Menegaskan fokus chatbot khusus pada layanan informasi dealer Hyundai Summarecon Bekasi. |
| 4 | *"Bantu saya menulis kode program Python untuk scraping web."* | **Menolak dengan sopan**: Tidak melayani tugas umum di luar operasional dealer Hyundai. |

---

## 🛠️ Tutorial: Mengubah Chatbot untuk Bisnis Lain

Ingin mengubah chatbot ini untuk bisnis Anda sendiri (misalnya kedai kopi, klinik gigi, toko pakaian, atau restoran)? Cukup ubah **`SYSTEM_INSTRUCTION`** di file [`index.js`](./index.js)!

### Langkah 1: Buka File `index.js`
Buka file `index.js`, lalu cari baris deklarasi konstanta `SYSTEM_INSTRUCTION` (sekitar baris ke-70).

> [!TIP]
> **PENTING UNTUK PEMULA (Agar Terhindar dari Error):**
> 1. Anda **CUKUP MENGGANTI ISI TEKS** di dalam tanda kutip backtick (`` `...` ``).
> 2. **Tetap gunakan nama variabel `SYSTEM_INSTRUCTION`** (jangan diubah namanya). Dengan begitu, pemanggilan `systemInstruction: SYSTEM_INSTRUCTION` di endpoint `POST /api/chat` (sekitar baris ke-335) akan langsung bekerja otomatis tanpa perlu menyentuh baris kode lainnya dan terhindar dari error variabel tidak ditemukan (*ReferenceError*).
> 3. *(Opsional)* Jika Anda ingin mengganti nama variabelnya, misalnya menjadi `KEDAI_KOPI_SYSTEM_INSTRUCTION`, Anda **wajib** mengubah baris pemanggilannya di dalam endpoint `/api/chat` agar menggunakan nama variabel yang sama:
>    ```javascript
>    // Di dalam app.post('/api/chat', ...):
>    systemInstruction: KEDAI_KOPI_SYSTEM_INSTRUCTION
>    ```

### Langkah 2: Pahami 4 Elemen Utama System Instruction
Sebuah instruksi sistem yang baik terdiri dari 4 bagian:
1. **Identitas & Peran**: Siapa nama bot dan peran virtualnya.
2. **Gaya Komunikasi (Tone of Voice)**: Sopan, santai, ceria, formal, atau persuasif.
3. **Basis Pengetahuan (Knowledge Base)**: Alamat, jam buka, daftar produk/layanan, harga, dan nomor kontak.
4. **Guardrail (Batasan)**: Hal apa saja yang dilarang atau harus ditolak.

### Langkah 3: Contoh Penggantian — Kedai Kopi "Kopi Senja Utama"

Cukup ganti teks isi konstanta `SYSTEM_INSTRUCTION` pada `index.js` menjadi seperti contoh berikut:

```javascript
// Ganti isi teks konstanta SYSTEM_INSTRUCTION di index.js:
const SYSTEM_INSTRUCTION = `Anda adalah Barista Virtual ramah dari "Kopi Senja Utama".

GAYA KOMUNIKASI:
1. Ramah, hangat, santai tapi tetap sopan (gunakan sapaan "Kak" atau "Teman Senja").
2. Gunakan emoji secukupnya (☕, ✨, 🥐).

INFORMASI KEDAI KOPI:
- Alamat: Jl. Melati No. 12, Tebet, Jakarta Selatan.
- Jam Buka: Setiap hari pukul 08.00 – 22.00 WIB.
- Menu Andalan:
  1. Kopi Susu Senja (Espresso + Gula Aren + Susu Segar) - Rp 20.000
  2. Caramel Cold Brew - Rp 28.000
  3. Croissant Butter - Rp 18.000
- Fasilitas: Free Wi-Fi 100 Mbps, Stop Kontak di setiap meja, Ruang Ber-AC & Smoking Area Outdoor.
- Pemesanan Online: Melalui GoFood, GrabFood, atau WhatsApp di 0812-3456-7890.

BATASAN (GUARDRAIL):
- Tolak dengan ramah pertanyaan yang tidak berhubungan dengan kedai kopi, menu, fasilitas, atau kopi.`;
```

Endpoint `/api/chat` di `index.js` sudah secara default membaca variabel `SYSTEM_INSTRUCTION`, sehingga perubahan Anda langsung aktif!

### Langkah 4: Sesuaikan Data Tampilan Frontend (Opsional)
Buka file [`public/index.html`](./public/index.html) untuk mengubah judul, nama profil di header WhatsApp, foto profil di folder `public/assets/`, serta teks pada Quick Action Chips agar selaras dengan bisnis Anda.

### Langkah 5: Simpan & Jalankan Ulang
Jika Anda menjalankan via `npm run dev`, server akan otomatis mendeteksi perubahan dan me-reload. Jika menggunakan `npm start`, matikan server terlebih dahulu (`Ctrl + C`) lalu jalankan kembali `npm start`.

---

## ❓ Troubleshooting (Mengatasi Kendala Umum)

Berikut rangkuman solusi kendala yang sering dialami oleh pemrogram pemula:

### 1. Error: `API_KEY_INVALID` atau Status `400 / 403`
- **Penyebab**: File `.env` belum dibuat, atau `GEMINI_API_KEY` masih berisi nilai default `YOUR_GEMINI_API_KEY_HERE`, atau API Key memiliki spasi/salah salin.
- **Solusi**:
  1. Pastikan nama file adalah persis `.env` (bukan `.env.example` atau `.env.txt`).
  2. Dapatkan API Key baru secara gratis di [Google AI Studio](https://aistudio.google.com/app/apikey).
  3. Pastikan tidak ada spasi tambahan di depan atau di belakang kunci API.

### 2. Error: `models/... is not found for API version` atau Status `404`
- **Penyebab**: Nama model pada `GEMINI_MODEL` di file `.env` salah ketik atau menggunakan nama model yang sudah dipensiunkan oleh Google pada endpoint API akun Anda.
- **Solusi**:
  Gunakan nama model stabil terbaru yang didukung oleh SDK `@google/genai`:
  ```env
  GEMINI_MODEL=gemini-3.5-flash-lite
  ```
  Opsi model lain yang valid: `gemini-3.8-flash` atau `gemini-1.5-flash` (tergantung versi API akun Google AI Studio Anda). Kode backend server juga telah dilengkapi *automatic fallback* ke `gemini-3.5-flash-lite` jika model yang Anda tentukan mengalami status 404.

### 3. Error: `RESOURCE_EXHAUSTED` atau Status `429 Too Many Requests`
- **Penyebab**: Melebihi batasan kuota gratis (Free Tier Rate Limit) dari Google Gemini API (umumnya 15 permintaan per menit / RPM).
- **Solusi**:
  1. Tunggu 1 hingga 2 menit sebelum mengirimkan pesan baru.
  2. Jangan mengirim pesan secara *spamming* atau beruntun dalam hitungan detik.
  3. Buat API Key cadangan dari akun Google yang berbeda untuk keperluan testing lokal intensif.

### 4. Error: `EADDRINUSE: address already in use :::3000`
- **Penyebab**: Port `3000` sedang digunakan oleh proses Node.js lain yang belum ditutup.
- **Solusi**:
  - Matikan proses Node.js yang berjalan di terminal lain, atau
  - Ubah port di file `.env` menjadi port lain, misalnya `PORT=3001`, lalu akses `http://localhost:3001`.

---

## 📜 Lisensi

Proyek ini dirilis di bawah lisensi terbuka [**MIT License**](./LICENSE). Anda bebas mengunduh, mempelajari, memodifikasi, dan menggunakannya baik untuk keperluan belajar, tugas kuliah, materi pengajaran, maupun proyek komersial.

---

<p align="center">
  Dibuat dengan ❤️ untuk pembelajaran komunitas pengembang & programmer pemula.<br>
  <i>Simulasi implementasi LLM Gemini AI pada studi kasus layanan pelanggan otomotif.</i>
</p>
