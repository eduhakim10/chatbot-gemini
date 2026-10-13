const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv');

// In-memory storage untuk chat sessions
const chatSessions = new Map();

/**
 * Mendapatkan API Key terbaru dari file .env atau process.env
 */
function getApiKey() {
  // Selalu reload dotenv agar jika user baru saja edit .env, perubahan langsung terbaca
  dotenv.config({ override: true });
  const key = process.env.GEMINI_API_KEY;
  if (!key || key.trim() === '' || key.trim() === 'YOUR_GEMINI_API_KEY_HERE') {
    return null;
  }
  return key.trim();
}

/**
 * Mendapatkan model Gemini yang dipilih
 */
function getModelName() {
  return process.env.GEMINI_MODEL || 'gemini-1.5-flash';
}

/**
 * Inisialisasi client Gemini
 */
function getGenAIClient() {
  const apiKey = getApiKey();
  if (!apiKey) {
    const error = new Error(
      'GEMINI_API_KEY belum diisi di file .env. Buka file .env lalu masukkan API key Anda pada GEMINI_API_KEY=...'
    );
    error.status = 400;
    error.code = 'API_KEY_MISSING';
    throw error;
  }
  return new GoogleGenerativeAI(apiKey);
}

/**
 * Normalisasi format history percakapan
 */
function normalizeHistory(history = []) {
  if (!Array.isArray(history)) return [];

  return history.map((item) => {
    let role = item.role || 'user';
    if (role === 'assistant') role = 'model';

    let parts = [];
    if (Array.isArray(item.parts)) {
      parts = item.parts;
    } else if (typeof item.text === 'string') {
      parts = [{ text: item.text }];
    } else if (typeof item.message === 'string') {
      parts = [{ text: item.message }];
    } else if (typeof item.content === 'string') {
      parts = [{ text: item.content }];
    }

    return { role, parts };
  });
}

/**
 * Chat satu kali (stateless) atau dengan history yang dikirimkan di payload
 */
async function sendMessage({ message, history = [], systemInstruction = null, modelName = null }) {
  if (!message || typeof message !== 'string' || message.trim() === '') {
    const err = new Error('Field "message" wajib diisi (string tidak boleh kosong).');
    err.status = 400;
    throw err;
  }

  const genAI = getGenAIClient();
  const selectedModel = modelName || getModelName();

  const modelOptions = {
    model: selectedModel,
  };

  if (systemInstruction) {
    modelOptions.systemInstruction = systemInstruction;
  }

  const model = genAI.getGenerativeModel(modelOptions);

  // Jika ada history, gunakan chat mode
  if (Array.isArray(history) && history.length > 0) {
    const formattedHistory = normalizeHistory(history);
    const chat = model.startChat({
      history: formattedHistory,
    });
    const result = await chat.sendMessage(message);
    const response = await result.response;
    return {
      reply: response.text(),
      model: selectedModel,
      historyCount: formattedHistory.length + 2,
    };
  }

  // Jika pesan tunggal tanpa history
  const result = await model.generateContent(message);
  const response = await result.response;
  return {
    reply: response.text(),
    model: selectedModel,
  };
}

/**
 * Chat berbasis session (stateful in-memory berdasarkan sessionId)
 */
async function sendSessionMessage({ sessionId, message, systemInstruction = null, modelName = null }) {
  if (!sessionId || typeof sessionId !== 'string') {
    const err = new Error('Field "sessionId" wajib diisi (string).');
    err.status = 400;
    throw err;
  }

  if (!message || typeof message !== 'string' || message.trim() === '') {
    const err = new Error('Field "message" wajib diisi (string).');
    err.status = 400;
    throw err;
  }

  const genAI = getGenAIClient();
  const selectedModel = modelName || getModelName();

  let session = chatSessions.get(sessionId);

  // Jika session belum ada, buat baru
  if (!session) {
    const modelOptions = {
      model: selectedModel,
    };
    if (systemInstruction) {
      modelOptions.systemInstruction = systemInstruction;
    }
    const model = genAI.getGenerativeModel(modelOptions);
    const chat = model.startChat({
      history: [],
    });
    session = {
      chat,
      createdAt: new Date(),
      lastActive: new Date(),
      messageCount: 0,
      systemInstruction,
      model: selectedModel,
    };
    chatSessions.set(sessionId, session);
  }

  session.lastActive = new Date();
  session.messageCount += 1;

  const result = await session.chat.sendMessage(message);
  const response = await result.response;

  // Dapatkan riwayat percakapan terkini dari session
  const history = await session.chat.getHistory();

  return {
    reply: response.text(),
    sessionId,
    model: session.model,
    messageCount: session.messageCount,
    historyTotal: history.length,
  };
}

/**
 * Dapatkan riwayat pesan suatu session
 */
async function getSessionHistory(sessionId) {
  const session = chatSessions.get(sessionId);
  if (!session) {
    return null;
  }
  const history = await session.chat.getHistory();
  return {
    sessionId,
    model: session.model,
    createdAt: session.createdAt,
    lastActive: session.lastActive,
    messageCount: session.messageCount,
    history: history.map((h) => ({
      role: h.role,
      text: h.parts.map((p) => p.text).join(' '),
    })),
  };
}

/**
 * Hapus session chat dari memory
 */
function deleteSession(sessionId) {
  const existed = chatSessions.has(sessionId);
  chatSessions.delete(sessionId);
  return existed;
}

/**
 * Daftar semua session yang aktif
 */
function listSessions() {
  const list = [];
  for (const [id, s] of chatSessions.entries()) {
    list.push({
      sessionId: id,
      createdAt: s.createdAt,
      lastActive: s.lastActive,
      messageCount: s.messageCount,
      model: s.model,
    });
  }
  return list;
}

module.exports = {
  getApiKey,
  getModelName,
  sendMessage,
  sendSessionMessage,
  getSessionHistory,
  deleteSession,
  listSessions,
};
