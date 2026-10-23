const express = require('express');
const {
  getApiKey,
  getModelName,
  sendMessage,
  sendSessionMessage,
  getSessionHistory,
  deleteSession,
  listSessions,
} = require('./gemini');

const router = express.Router();

/**
 * Health check endpoint
 * GET /api/health
 */
router.get('/health', (req, res) => {
  const apiKey = getApiKey();
  const isConfigured = Boolean(apiKey);

  res.json({
    status: 'ok',
    service: 'Gemini Chatbot API',
    apiKeyConfigured: isConfigured,
    model: getModelName(),
    message: isConfigured
      ? 'Service siap digunakan! GEMINI_API_KEY sudah terkonfigurasi.'
      : 'Service aktif, namun GEMINI_API_KEY belum diisi di file .env. Silakan isi API key Anda di .env.',
  });
});

/**
 * Simple Chat (Stateless / Payload-based history)
 * POST /api/chat
 * Body:
 * {
 *   "message": "Halo, siapa kamu?",
 *   "systemInstruction": "Optional: Kamu adalah asisten ramah...",
 *   "history": [ { "role": "user", "text": "..." }, { "role": "model", "text": "..." } ]
 * }
 */
router.post('/chat', async (req, res, next) => {
  try {
    const { message, history, systemInstruction, model } = req.body || {};

    const result = await sendMessage({
      message,
      history,
      systemInstruction,
      modelName: model,
    });

    res.json({
      success: true,
      data: {
        reply: result.reply,
        model: result.model,
      },
    });
  } catch (err) {
    next(err);
  }
});

/**
 * Stateful Session-based Chat (Memory persists across requests)
 * POST /api/chat/session
 * Body:
 * {
 *   "sessionId": "user-1",
 *   "message": "Nama saya Budi",
 *   "systemInstruction": "Optional system instruction"
 * }
 */
router.post('/chat/session', async (req, res, next) => {
  try {
    const { sessionId, message, systemInstruction, model } = req.body || {};

    const result = await sendSessionMessage({
      sessionId,
      message,
      systemInstruction,
      modelName: model,
    });

    res.json({
      success: true,
      data: {
        sessionId: result.sessionId,
        reply: result.reply,
        model: result.model,
        messageCount: result.messageCount,
        historyTotal: result.historyTotal,
      },
    });
  } catch (err) {
    next(err);
  }
});

/**
 * Ambil riwayat percakapan session tertentu
 * GET /api/chat/session/:sessionId
 */
router.get('/chat/session/:sessionId', async (req, res, next) => {
  try {
    const { sessionId } = req.params;
    const historyData = await getSessionHistory(sessionId);

    if (!historyData) {
      return res.status(404).json({
        success: false,
        error: `Session "${sessionId}" tidak ditemukan.`,
      });
    }

    res.json({
      success: true,
      data: historyData,
    });
  } catch (err) {
    next(err);
  }
});

/**
 * Hapus / reset session chat
 * DELETE /api/chat/session/:sessionId
 */
router.delete('/chat/session/:sessionId', (req, res) => {
  const { sessionId } = req.params;
  const deleted = deleteSession(sessionId);

  res.json({
    success: true,
    message: deleted
      ? `Session "${sessionId}" berhasil dihapus.`
      : `Session "${sessionId}" tidak ada atau sudah dihapus.`,
  });
});

/**
 * Daftar semua session yang sedang aktif di memory
 * GET /api/chat/sessions
 */
router.get('/chat/sessions', (req, res) => {
  const sessions = listSessions();
  res.json({
    success: true,
    total: sessions.length,
    data: sessions,
  });
});

module.exports = router;
