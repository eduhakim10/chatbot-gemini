# 🚗 Hyundai Summarecon Bekasi - AI Chatbot Assistant (WhatsApp Business UI)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green.svg)](https://nodejs.org/)
[![Google Gemini](https://img.shields.io/badge/Google%20Gemini-1.5%20Flash-blue.svg)](https://aistudio.google.com/)
[![Express.js](https://img.shields.io/badge/Express.js-4.x-lightgrey.svg)](https://expressjs.com/)

Aplikasi Chatbot Representatif Resmi **Hyundai Summarecon Bekasi** yang dibangun menggunakan **Google Gemini AI (`gemini-1.5-flash`)**, **Node.js**, **Express**, dan **Vanilla JavaScript**. Aplikasi ini dilengkapi antarmuka autentik bertema **WhatsApp Business Web & Mobile**, lengkap dengan header verifikasi resmi, bubble percakapan WhatsApp dengan indikator centang dua biru (`✓✓`), balasan profesional terstruktur, quick-action chips, serta modal profil dealer resmi.

Proyek ini dirancang agar **ramah bagi pemrogram pemula (beginner-friendly)** yang ingin belajar cara mengintegrasikan Large Language Model (LLM) ke dalam aplikasi web nyata, mengelola *System Instruction*, menerapkan *Guardrails*, dan menguji API via Postman.

---

## 🌟 Fitur Utama

1. **Arsitektur Chatbot & REST API Modern**:
   - Struktur modular: Backend Express melayani antarmuka statis dari folder `public/` (`index.html`, `style.css`, `script.js`).
   - Endpoint utama: `POST /api/chat` menerima multi-turn context payload `{ conversation: [...] }` dan mengembalikan `{ result: "..." }`.
   - Menggunakan SDK resmi Google Gen AI (`@google/genai`) dengan parameter `systemInstruction` dan `temperature`.
   - Integrasi elemen UI yang bersih dan responsif: `#chat-box`, `#chat-form`, dan `#user-input`.

2. **Konteks Spesifik Dealer Hyundai Summarecon Bekasi**:
   - **Alamat Resmi**: Jl. Bulevar Ahmad Yani, Blok VA No. 1-2, Kawasan Sentra Summarecon Bekasi, Kota Bekasi 17142.
   - **Jam Operasional**:
     - *Showroom*: Senin – Sabtu: 08.30 – 19.00 WIB | Minggu & Hari Libur: 09.00 – 17.00 WIB.
     - *Bengkel Resmi (Service & Spare Parts)*: Senin – Jumat: 08.00 – 16.30 WIB | Sabtu: 08.00 – 15.00 WIB (Minggu Tutup).
   - **Line-up Produk**: Hyundai Creta & Creta Alpha, Stargazer & Stargazer X, All New Santa Fe (Hybrid & Gasoline), Palisade, All New Kona Electric (Baterai produksi lokal, jarak tempuh hingga 600+ km), Ioniq 5 / 5 N, Ioniq 6, dan Staria.
   - **Layanan Purna Jual & Garansi**: Garansi baterai EV 8 tahun / 160.000 KM, garansi kendaraan 3–4 tahun, gratis jasa servis 5 tahun, fasilitas EV Ultra Fast Charger, serta layanan booking test drive.

3. **Gaya Komunikasi & Guardrail (Batasan)**:
   - **Model AI**: `gemini-1.5-flash` (cepat, hemat kuota, efisien, dan responsif).
   - **Tone of Voice**: Profesional, formal, terstruktur, santun, dan objektif (standar perwakilan resmi Hyundai Motors Indonesia, tanpa bahasa gaul/slang).
   - **Guardrail Konteks**: Menolak secara sopan dan profesional setiap pertanyaan yang berada di luar topik dealer Hyundai.

4. **Antarmuka WhatsApp Chat**:
   - Header hijau khas WhatsApp (`#008069`) dengan avatar dealer, badge centang hijau resmi terverifikasi, dan status "Online".
   - Wallpaper chat bertekstur *doodle pattern* khas WhatsApp (`#efeae2`).
   - Quick action chips (Alamat, Mobil Listrik EV, Santa Fe, Stargazer, Test Drive, Booking Servis, Simulasi Kredit).
   - Bubble chat pengguna (hijau muda dengan centang dua biru `✓✓` dan waktu pesan) & bubble chat bot (putih).
   - Animasi indikator mengetik WhatsApp ("Thinking...").
   - Modal drawer profil dealer lengkap dengan tautan langsung ke Google Maps dan kontak WhatsApp Sales.

---

## 🏗️ Penjelasan Arsitektur Backend

Di dalam repositori ini terdapat dua berkas backend. Berikut penjelasannya agar tidak membingungkan pemula:

| File | Status | Modul | SDK Gemini | Deskripsi |
| :--- | :---: | :---: | :---: | :--- |
| **`index.js`** | **AKTIF (Utama)** | **ES Module** (`import`) | `@google/genai` | **Server utama yang dijalankan oleh `npm start`**. Menyajikan frontend WhatsApp di folder `public/`, menyediakan endpoint `POST /api/chat`, fitur upload gambar (`/api/upload`), info dealer (`/api/dealer-info`), health check (`/api/health`), rate limiter, dan guardrail keamanan. |
| **`server.js` & `src/`** | *Alternatif / Referensi* | **CommonJS** (`require`) | `@google/generative-ai` | Versi REST API murni (tanpa UI frontend) yang menyediakan endpoint session-based (`/api/chat/session`) dengan penyimpanan memori (`Map`). Disimpan sebagai bahan referensi arsitektur modular bagi yang ingin mempelajari pengelolaan multi-sesi percakapan. |

> [!NOTE]
> Untuk menjalankan proyek ini secara normal, Anda cukup menggunakan `npm start` atau `npm run dev`. File yang dieksekusi secara otomatis adalah **`index.js`**.

---

## 📁 Struktur Direktori

```text
gemini-chatbot/
├── node_modules/                      # Dependensi Node.js
├── public/                            # File statis frontend (WhatsApp UI)
│   ├── assets/
│   │   └── hyundai_showroom.jpg       # Foto fasad showroom dealer
│   ├── index.html                     # Halaman chat WhatsApp (#chat-box, #chat-form, #user-input)
│   ├── script.js                      # Client-side JavaScript (Fetch POST /api/chat)
│   └── style.css                      # Styling WhatsApp Web & Mobile responsive
├── src/                               # (Referensi) Modul backend CommonJS multi-sesi
│   ├── gemini.js                      # Handler SDK @google/generative-ai
│   └── routes.js                      # Definisi rute session REST API
├── .env                               # Konfigurasi lokal (rahasia, tidak di-commit ke Git)
├── .env.example                       # Contoh template konfigurasi environment
├── .gitignore                         # Berkas/folder yang diabaikan Git
├── Gemini_Chatbot.postman_collection.json # Koleksi Postman siap import
├── index.js                           # BACKEND UTAMA (Express + @google/genai + Static Serve)
├── server.js                          # Backend alternatif CommonJS
├── package.json                       # Konfigurasi dependensi & skrip npm
├── LICENSE                            # Lisensi Open Source (MIT)
└── README.md                          # Dokumentasi panduan lengkap
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

# Model Gemini yang digunakan (default: gemini-1.5-flash)
GEMINI_MODEL=gemini-1.5-flash
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
🤖 Model Gemini: gemini-1.5-flash
🔒 Mode Keamanan: Rate Limiter & Guardrails Aktif
🌐 URL Aplikasi: http://localhost:3000
💬 Endpoint Chat: POST http://localhost:3000/api/chat
====================================================
```

### 5. Buka di Browser

Buka peramban (Chrome, Edge, Safari, Firefox) dan akses:
👉 **`http://localhost:3000`**

Anda akan langsung disambut oleh tampilan chat WhatsApp resmi Hyundai Summarecon Bekasi dan dapat langsung mengirimkan pesan atau memilih quick reply chips!

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
    "result": "Selamat pagi/siang. Terima kasih telah menghubungi Layanan Informasi Resmi Hyundai Summarecon Bekasi.\n\nAlamat dealer kami berada di:\nJl. Bulevar Ahmad Yani, Blok VA No. 1-2, Kawasan Sentra Summarecon Bekasi, Kota Bekasi 17142.\n\nLini kendaraan yang tersedia antara lain:\n1. Hyundai Creta & Creta Alpha\n2. Hyundai Stargazer & Stargazer X\n3. All New Santa Fe (Hybrid & Gasoline)\n4. Hyundai Palisade\n5. All New Kona Electric & Ioniq Series..."
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
| 3 | *"Saya ingin mencoba test drive Santa Fe Hybrid, bagaimana caranya?"* | Menjelaskan syarat booking test drive dan mengarahkan ke formulir kontak WhatsApp sales resmi. |
| 4 | *"Apakah ada fasilitas pengisian daya cepat (Ultra Fast Charger) di dealer ini?"* | Mengonfirmasi ketersediaan fasilitas EV Ultra Fast Charger di Hyundai Summarecon Bekasi. |

### B. Pertanyaan Uji Guardrail / Di Luar Konteks (Out-of-Scope — Harus Ditolak Sopan)

| No | Pertanyaan Pengguna | Ekspektasi Respons AI |
| :-: | :--- | :--- |
| 1 | *"Tuliskan puisi cinta 4 bait tentang senja."* | **Menolak dengan sopan**: *"Mohon maaf, sebagai Virtual Assistant resmi Hyundai Summarecon Bekasi, saya hanya dapat membantu memberikan informasi seputar produk, layanan, servis, dan penjualan kendaraan Hyundai..."* |
| 2 | *"Berapa harga mobil Toyota Avanza atau Honda HR-V terbaru?"* | **Menolak dengan sopan**: Menolak memberikan informasi merk lain dan menawarkan lini produk setara dari Hyundai (misal: Stargazer atau Creta). |
| 3 | *"Siapa yang memenangkan pemilihan presiden tahun ini?"* | **Menolak dengan sopan**: Menegaskan fokus chatbot khusus pada layanan otomotif dealer Hyundai Summarecon Bekasi. |
| 4 | *"Bantu saya menulis kode program Python untuk scraping web."* | **Menolak dengan sopan**: Tidak melayani tugas umum di luar operasional dealer Hyundai. |

---

## 🛠️ Tutorial: Mengubah Chatbot untuk Bisnis Lain

Ingin mengubah chatbot ini untuk bisnis Anda sendiri (misalnya kedai kopi, klinik gigi, toko pakaian, atau restoran)? Cukup ubah **`systemInstruction`** di file [`index.js`](./index.js)!

### Langkah 1: Buka File `index.js`
Buka file `index.js`, lalu cari baris deklarasi konstanta `HYUNDAI_SYSTEM_INSTRUCTION` (sekitar baris ke-50).

### Langkah 2: Pahami 4 Elemen Utama System Instruction
Sebuah instruksi sistem yang baik terdiri dari 4 bagian:
1. **Identitas & Peran**: Siapa nama bot dan peran virtualnya.
2. **Gaya Komunikasi (Tone of Voice)**: Sopan, santai, ceria, formal, atau persuasif.
3. **Basis Pengetahuan (Knowledge Base)**: Alamat, jam buka, daftar produk/layanan, harga, dan nomor kontak.
4. **Guardrail (Batasan)**: Hal apa saja yang dilarang atau harus ditolak.

### Langkah 3: Contoh Penggantian — Kedai Kopi "Kopi Senja Utama"

Ganti isi variabel instruksi pada `index.js` menjadi seperti contoh berikut:

```javascript
// Ganti HYUNDAI_SYSTEM_INSTRUCTION di index.js
const KEDAI_KOPI_SYSTEM_INSTRUCTION = `Anda adalah Barista Virtual ramah dari "Kopi Senja Utama".

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

Lalu sesuaikan pemanggilan `systemInstruction` pada fungsi pemanggilan model di baris endpoint `/api/chat`.

### Langkah 4: Sesuaikan Data Tampilan Frontend (Opsional)
Buka file [`public/index.html`](./public/index.html) untuk mengubah judul, nama profil di header WhatsApp, foto profil di folder `public/assets/`, serta teks pada Quick Action Chips.

### Langkah 5: Restart Server
Jika Anda menjalankan `npm run dev`, server akan otomatis me-reload kode baru Anda!

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
- **Penyebab**: Nama model pada `GEMINI_MODEL` di file `.env` salah ketik atau menggunakan nama model yang belum tersedia/sudah dipensiunkan oleh Google.
- **Solusi**:
  Gunakan nama model stabil resmi yang didukung:
  ```env
  GEMINI_MODEL=gemini-1.5-flash
  ```
  Opsi model lain yang valid: `gemini-2.0-flash` atau `gemini-1.5-pro`.

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
  <i>Inovasi Otomotif bersama Hyundai Motors Indonesia & Google Gemini AI.</i>
</p>
