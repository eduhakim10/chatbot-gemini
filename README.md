# 🚗 Hyundai Summarecon Bekasi - AI Chatbot Assistant (Hacktiv8 Sesi 3)

Aplikasi Chatbot Resmi **Hyundai Summarecon Bekasi** yang dibangun berbasis **Google Gemini AI (Flash-Lite)** menggunakan **Node.js, Express, dan Vanilla JavaScript**, sesuai dengan materi kurikulum **Hacktiv8: Pembuatan Chatbot Berbasis Gemini AI Model (Sesi 3)**.

Tampilan antarmuka (UI) dirancang dengan tema autentik **WhatsApp Business**, lengkap dengan header verifikasi resmi, bubble percakapan WhatsApp dengan indikator centang dua biru (`✓✓`), balasan profesional terstruktur, quick-action chips, serta modal profil dealer resmi.

---

## 🌟 Fitur Utama

1. **Sesuai Materi Hacktiv8 Sesi 3**:
   - Struktur folder sesuai slide: backend Express menyajikan file frontend statis dari folder `public/` (`index.html`, `style.css`, `script.js`).
   - Endpoint utama: `POST /api/chat` menerima `{ conversation: [...] }` dan mengembalikan `{ result: "..." }`.
   - Menggunakan SDK resmi `@google/genai` dengan konfigurasi `systemInstruction` dan `temperature`.
   - Menjaga ID elemen wajib: `#chat-box`, `#chat-form`, dan `#user-input`.
2. **Konteks Spesifik Dealer Hyundai Summarecon Bekasi**:
   - **Alamat Resmi**: Jl. Bulevar Ahmad Yani, Blok VA No. 1-2, Kawasan Sentra Summarecon Bekasi, Kota Bekasi 17142.
   - **Jam Operasional**:
     - *Showroom*: Senin – Sabtu: 08.30 – 19.00 WIB | Minggu & Libur: 09.00 – 17.00 WIB.
     - *Bengkel Resmi (Service & Spare Parts)*: Senin – Jumat: 08.00 – 16.30 WIB | Sabtu: 08.00 – 15.00 WIB (Minggu Tutup).
   - **Line-up Produk Lengkap**: Hyundai Creta & Alpha, Stargazer & X, All New Santa Fe (Hybrid & Bensin), Palisade, All New Kona Electric (baterai lokal, 600+ km), Ioniq 5 / 5 N, Ioniq 6, dan Staria.
   - **Layanan Purna Jual & Garansi**: Garansi baterai EV 8 tahun / 160.000 KM, garansi kendaraan 3-4 tahun, gratis jasa servis 5 tahun, fasilitas EV Ultra Fast Charger, dan booking test drive.
3. **Model & Gaya Komunikasi**:
   - **Model AI**: `gemini-3.5-flash-lite` (tier Flash-Lite cepat, efisien, dan responsif).
   - **Tone of Voice**: Profesional, formal, terstruktur, lugas, santun, dan objektif (standar representatif resmi Hyundai Motors Indonesia, tanpa gaya bahasa yang terlalu santai/gaul).
   - **Batasan (Guardrail)**: Secara sopan dan profesional menolak topik di luar otomotif/dealer Hyundai.
4. **Antarmuka WhatsApp Chat**:
   - WhatsApp header hijau (`#008069`) dengan avatar showroom, centang hijau terverifikasi, dan status "Online".
   - Wallpaper chat bertekstur khas WhatsApp doodle pattern (`#efeae2`).
   - Quick Replies bar (Chips: Alamat, EV, Santa Fe, Stargazer, Booking Test Drive, Servis, Promo Kredit).
   - Bubble chat bot (putih) dan bubble chat pengguna (hijau muda dengan centang dua biru dan jam pesan).
   - Animasi indikator mengetik WhatsApp ("Thinking...").
   - Modal drawer profil detail dealer & tombol direct link ke Google Maps dan WhatsApp Sales.

---

## 📁 Struktur Proyek

```text
gemini-chatbot/
├── node_modules/
├── public/
│   ├── assets/
│   │   └── hyundai_showroom.jpg   # Foto fasad showroom dealer
│   ├── index.html                 # Halaman utama chat WhatsApp
│   ├── script.js                  # Frontend client (fetch POST /api/chat)
│   └── style.css                  # Desain WhatsApp Web & Mobile
├── .env                           # GEMINI_API_KEY & GEMINI_MODEL
├── .env.example
├── .gitignore
├── index.js                       # Server Express & Google GenAI Handler
├── package.json
└── Gemini_Chatbot.postman_collection.json
```

---

## 🚀 Cara Menjalankan Aplikasi

### 1. Prasyarat
- Node.js versi 18+ sudah terpasang.
- Gemini API Key dari [Google AI Studio](https://aistudio.google.com/).

### 2. Konfigurasi Environment (`.env`)
Pastikan file `.env` berisi:
```env
PORT=3000
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
GEMINI_MODEL=gemini-3.5-flash-lite
```

### 3. Jalankan Server
```bash
npm start
```
Atau mode development watcher:
```bash
npm run dev
```

Server akan aktif di:
👉 **`http://localhost:3000`**

Buka tautan di atas melalui browser (Google Chrome / Safari) untuk mulai berinteraksi dengan antarmuka chat WhatsApp Hyundai Summarecon Bekasi!

---

## 📮 Pengujian API via Postman (Slide Hal 29 & 31)

Import file [`Gemini_Chatbot.postman_collection.json`](file:///Users/eduarifrahmanhakim/.gemini/antigravity-ide/scratch/gemini-chatbot/Gemini_Chatbot.postman_collection.json) ke aplikasi Postman.

### Request: `POST http://localhost:3000/api/chat`
**Headers:**
```text
Content-Type: application/json
```

**Body (raw JSON):**
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

**Response (200 OK):**
```json
{
  "result": "Selamat pagi/siang. Terima kasih telah menghubungi Layanan Informasi Resmi Hyundai Summarecon Bekasi...\n\nAlamat kami berlokasi di Jl. Bulevar Ahmad Yani, Blok VA No. 1-2, Summarecon Bekasi..."
}
```

---

## 📋 Endpoint Tambahan

- **`GET /api/dealer-info`**: Mengambil data profil JSON lengkap Hyundai Summarecon Bekasi (alamat, peta, fasilitas, jam buka).
- **`GET /api/health`**: Cek status server dan model aktif.
