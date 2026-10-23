# Contoh Referensi: Backend Modular Berbasis CommonJS (`require`)

Folder ini merupakan **materi referensi arsitektur terpisah** yang menunjukkan bagaimana menyusun REST API Node.js secara modular dengan pemisahan *controller*, *router*, dan *service*, serta menggunakan sistem modul **CommonJS** (`require() / module.exports`).

> [!NOTE]
> **Catatan Pemula:**
> Backend utama yang siap dijalankan langsung untuk aplikasi web dan WhatsApp UI adalah **`index.js`** yang terletak di direktori root proyek (`npm start`).
> File-file di dalam folder `examples/` ini **hanya disediakan sebagai bahan studi/referensi arsitektur kode**.

---

## 📂 Struktur Folder Referensi Ini

```text
examples/modular-commonjs-backend/
├── package.json        # Konfigurasi CommonJS ("type": "commonjs")
├── server.js           # Entry point Express CommonJS
└── src/
    ├── routes.js       # Router endpoint modular
    └── gemini.js       # Service wrapper SDK Google Generative AI
```

---

## 🛠️ Cara Menjalankan Contoh Ini Secara Terpisah

Jika Anda ingin mencoba menjalankan arsitektur ini secara independen:

1. Masuk ke folder ini melalui terminal:
   ```bash
   cd examples/modular-commonjs-backend
   ```

2. Pasang dependensi khusus untuk folder ini:
   ```bash
   npm install
   ```

3. Salin file `.env` dari root proyek (atau buat file `.env` baru yang berisi `GEMINI_API_KEY` Anda):
   ```bash
   cp ../../.env .env
   ```

4. Jalankan server:
   ```bash
   npm start
   ```

Server referensi ini akan aktif dan menyajikan endpoint API murni berbasis sesi tanpa antarmuka frontend HTML.
