const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const routes = require('./src/routes');

// Inisialisasi konfigurasi environment
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Request logger sederhana
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`);
  });
  next();
});

// Root Endpoint - Info & Panduan Singkat Postman
app.get('/', (req, res) => {
  res.json({
    name: 'Gemini Chatbot API',
    version: '1.0.0',
    description: 'API Chatbot bertenaga Google Gemini. Siap diuji langsung melalui Postman!',
    endpoints: {
      healthCheck: {
        method: 'GET',
        url: `http://localhost:${PORT}/api/health`,
        description: 'Cek status service dan konfigurasi API Key',
      },
      simpleChat: {
        method: 'POST',
        url: `http://localhost:${PORT}/api/chat`,
        description: 'Kirim pesan chat (stateless)',
        sampleBody: {
          message: 'Halo Gemini! Ceritakan lelucon singkat tentang programmer.',
        },
      },
      sessionChat: {
        method: 'POST',
        url: `http://localhost:${PORT}/api/chat/session`,
        description: 'Chat interaktif dengan memory percakapan berkelanjutan',
        sampleBody: {
          sessionId: 'user-01',
          message: 'Nama saya Budi dan saya suka kopi hitam.',
        },
      },
      getSessionHistory: {
        method: 'GET',
        url: `http://localhost:${PORT}/api/chat/session/:sessionId`,
        description: 'Lihat riwayat percakapan session',
      },
      deleteSession: {
        method: 'DELETE',
        url: `http://localhost:${PORT}/api/chat/session/:sessionId`,
        description: 'Reset session',
      },
    },
    quickSetup: {
      step1: 'Buka file .env di folder project',
      step2: 'Isi GEMINI_API_KEY dengan API key Gemini Anda',
      step3: 'Langsung tembak endpoint POST /api/chat di Postman!',
    },
  });
});

// Mount API routes
app.use('/api', routes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: `Endpoint ${req.method} ${req.originalUrl} tidak ditemukan. Silakan akses GET / untuk melihat daftar endpoint.`,
  });
});

// Centralized Error Handler
app.use((err, req, res, next) => {
  console.error('[Error]', err.message || err);

  const statusCode = err.status || (err.message && err.message.includes('API_KEY') ? 400 : 500);

  // Parsing error dari Google Generative AI
  let errorMessage = err.message || 'Terjadi kesalahan internal pada server.';
  if (err.message && err.message.includes('API_KEY_INVALID')) {
    errorMessage = 'GEMINI_API_KEY yang dimasukkan di .env tidak valid. Pastikan API Key disalin dengan benar dari Google AI Studio.';
  } else if (err.message && err.message.includes('RESOURCE_EXHAUSTED')) {
    errorMessage = 'Limit / Kuota API Key Gemini telah tercapai. Coba gunakan model lain atau tunggu beberapa saat.';
  }

  res.status(statusCode).json({
    success: false,
    error: errorMessage,
    code: err.code || 'INTERNAL_ERROR',
  });
});

// Jalankan Server
const server = app.listen(PORT, () => {
  console.log('====================================================');
  console.log(`🚀 Gemini Chatbot Service BERHASIL AKTIF!`);
  console.log(`📡 URL: http://localhost:${PORT}`);
  console.log(`🩺 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`💬 Chat Endpoint: POST http://localhost:${PORT}/api/chat`);
  console.log('====================================================');
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM diterima, menutup server...');
  server.close(() => {
    console.log('Server ditutup dengan aman.');
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT diterima, menutup server...');
  server.close(() => {
    console.log('Server ditutup dengan aman.');
  });
});
