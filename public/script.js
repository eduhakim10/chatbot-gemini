/**
 * Hyundai Summarecon Bekasi - Chatbot Frontend Logic
 * Sesuai materi Hacktiv8 Sesi 3 (Node.js + Express + Gemini AI)
 */

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements sesuai materi slide hal 37 & 40
  const form = document.getElementById('chat-form');
  const input = document.getElementById('user-input');
  const chatBox = document.getElementById('chat-box');
  const initialBotTime = document.getElementById('initial-bot-time');
  const sendBtn = document.getElementById('send-btn');

  // Modal elements
  const modal = document.getElementById('dealer-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalTrigger = document.getElementById('dealer-info-modal-trigger');
  const headerProfileBtn = document.getElementById('header-profile-btn');
  const callDealerBtn = document.getElementById('call-dealer-btn');
  const clearChatBtn = document.getElementById('clear-chat-btn');
  const quickChips = document.querySelectorAll('.chip-item');

  // Inisialisasi riwayat percakapan (Multi-turn conversation history)
  let conversationHistory = [];

  // Set waktu pesan pembuka bot
  if (initialBotTime) {
    initialBotTime.textContent = getCurrentTime();
  }

  // Focus pada input
  if (input) {
    input.focus();
  }

  /**
   * Helper: Dapatkan format waktu jam:menit sekarang (misal: 08:30)
   */
  function getCurrentTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  /**
   * Helper: Format Markdown sederhana menjadi HTML yang aman
   */
  function formatMarkdown(text) {
    if (!text) return '';

    // Sanitasi HTML dasar
    let safe = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Format Bold: **teks**
    safe = safe.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Format Italic: *teks* atau _teks_
    safe = safe.replace(/\*(.*?)\*/g, '<em>$1</em>');
    safe = safe.replace(/_(.*?)_/g, '<em>$1</em>');

    // Format Links [teks](url)
    safe = safe.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

    // Format Bullet Points: baris yang diawali dengan * atau -
    const lines = safe.split('\n');
    let formattedHtml = '';
    let inList = false;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      if (line.startsWith('* ') || line.startsWith('- ')) {
        if (!inList) {
          formattedHtml += '<ul>';
          inList = true;
        }
        formattedHtml += `<li>${line.substring(2)}</li>`;
      } else if (/^\d+\.\s/.test(line)) {
        if (inList) {
          formattedHtml += '</ul>';
          inList = false;
        }
        // Numbered list item
        formattedHtml += `<p style="margin-left: 12px; margin-bottom: 4px;"><strong>${line.match(/^\d+\./)[0]}</strong> ${line.replace(/^\d+\.\s*/, '')}</p>`;
      } else {
        if (inList) {
          formattedHtml += '</ul>';
          inList = false;
        }
        if (line === '') {
          formattedHtml += '<br>';
        } else {
          formattedHtml += `<p>${line}</p>`;
        }
      }
    }

    if (inList) {
      formattedHtml += '</ul>';
    }

    return formattedHtml;
  }

  /**
   * Menambahkan pesan ke chat-box
   */
  function appendMessage(sender, text) {
    const row = document.createElement('div');
    row.classList.add('message-row', sender === 'user' ? 'user-row' : 'bot-row');

    const msg = document.createElement('div');
    msg.classList.add('message', sender === 'user' ? 'message-user' : 'message-bot');

    const timeStr = getCurrentTime();

    if (sender === 'user') {
      msg.innerHTML = `
        <div class="message-content">${escapeHTML(text)}</div>
        <div class="message-meta">
          <span class="message-time">${timeStr}</span>
          <span class="double-tick" title="Terkirim">
            <svg viewBox="0 0 16 15" width="16" height="15" fill="none">
              <path d="M15.01 3.316l-7.79 7.79-3.21-3.21.708-.707 2.502 2.502 7.082-7.082.708.707z" fill="currentColor"/>
              <path d="M12.01 3.316l-7.79 7.79-3.21-3.21.708-.707 2.502 2.502 7.082-7.082.708.707z" fill="currentColor"/>
            </svg>
          </span>
        </div>
      `;
    } else {
      msg.innerHTML = `
        <div class="message-sender-name">Hyundai Summarecon Bekasi</div>
        <div class="message-content">${formatMarkdown(text)}</div>
        <div class="message-meta">
          <span class="message-time">${timeStr}</span>
        </div>
      `;
    }

    row.appendChild(msg);
    chatBox.appendChild(row);
    chatBox.scrollTop = chatBox.scrollHeight;
    return msg;
  }

  /**
   * Menampilkan pesan "Thinking..." bot sementara (Sesuai slide 37 & 42)
   */
  function createThinkingMessage() {
    const row = document.createElement('div');
    row.classList.add('message-row', 'bot-row', 'thinking-row');

    const msg = document.createElement('div');
    msg.classList.add('message', 'message-bot', 'typing-bubble');
    msg.innerHTML = `
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
      <span class="typing-text">Hyundai Summarecon Bekasi is thinking...</span>
    `;

    row.appendChild(msg);
    chatBox.appendChild(row);
    chatBox.scrollTop = chatBox.scrollHeight;

    return {
      rowElement: row,
      msgElement: msg,
      replaceWith: (responseText) => {
        msg.classList.remove('typing-bubble');
        const timeStr = getCurrentTime();
        msg.innerHTML = `
          <div class="message-sender-name">Hyundai Summarecon Bekasi</div>
          <div class="message-content">${formatMarkdown(responseText)}</div>
          <div class="message-meta">
            <span class="message-time">${timeStr}</span>
          </div>
        `;
        row.classList.remove('thinking-row');
        chatBox.scrollTop = chatBox.scrollHeight;
      }
    };
  }

  function escapeHTML(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  /**
   * Mengirim pesan user ke API backend (/api/chat)
   * Sesuai alur pada Slide 29, 37, 39, 42
   */
  async function handleSendMessage(messageText) {
    const userMessage = messageText || input.value.trim();
    if (!userMessage) return;

    // 1. Tampilkan pesan user di chat box
    appendMessage('user', userMessage);
    input.value = '';
    input.disabled = true;
    if (sendBtn) sendBtn.disabled = true;

    // 2. Tambahkan ke riwayat percakapan
    conversationHistory.push({
      role: 'user',
      text: userMessage
    });

    // 3. Tampilkan pesan bot sementara "Thinking..."
    const thinkingMsg = createThinkingMessage();

    try {
      // 4. Kirim POST request ke /api/chat sesuai spek slide materi
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          conversation: conversationHistory
        })
      });

      if (!response.ok) {
        let serverErrorMsg = `Server error (${response.status})`;
        try {
          const errJson = await response.json();
          if (errJson && errJson.error) serverErrorMsg = errJson.error;
          else if (errJson && errJson.message) serverErrorMsg = errJson.message;
        } catch (_) {}
        throw new Error(serverErrorMsg);
      }

      const data = await response.json();

      // 5. Ganti pesan "Thinking..." dengan balasan AI dari property result
      if (data && data.result) {
        thinkingMsg.replaceWith(data.result);
        // Simpan respons bot ke riwayat percakapan untuk multi-turn
        conversationHistory.push({
          role: 'model',
          text: data.result
        });
      } else {
        thinkingMsg.replaceWith('Sorry, no response received.');
      }
    } catch (error) {
      console.error('Error saat menghubungi endpoint /api/chat:', error);
      let displayError = 'Failed to get response from server.';
      if (error.message && error.message.includes('Failed to fetch')) {
        displayError = 'Koneksi ke server terputus. Server Node.js (http://localhost:3000) sedang offline/restart. Silakan jalankan `npm start` kembali.';
      } else if (error.message) {
        displayError = `${error.message}`;
      }
      thinkingMsg.replaceWith(displayError);
    } finally {
      input.disabled = false;
      if (sendBtn) sendBtn.disabled = false;
      input.focus();
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  }

  // Event Listener Form Submit (Sesuai slide 37 & 40)
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    handleSendMessage();
  });

  // Event Listener Quick Action Chips
  quickChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const prompt = chip.getAttribute('data-prompt');
      if (prompt) {
        input.value = prompt;
        handleSendMessage(prompt);
      }
    });
  });

  // Modal Open & Close Listeners
  function openModal() {
    if (modal) {
      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
    }
  }

  function closeModal() {
    if (modal) {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
    }
  }

  if (headerProfileBtn) headerProfileBtn.addEventListener('click', openModal);
  if (modalTrigger) modalTrigger.addEventListener('click', openModal);
  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  if (callDealerBtn) {
    callDealerBtn.addEventListener('click', () => {
      window.open('tel:02129578900', '_self');
    });
  }

  // Clear Chat History
  if (clearChatBtn) {
    clearChatBtn.addEventListener('click', () => {
      if (confirm('Bersihkan riwayat percakapan chat?')) {
        conversationHistory = [];
        // Sisakan pesan awal pembuka
        const systemNotices = chatBox.querySelectorAll('.message-row, .thinking-row');
        systemNotices.forEach(node => node.remove());

        // Buat ulang pesan selamat datang
        const timeStr = getCurrentTime();
        const row = document.createElement('div');
        row.classList.add('message-row', 'bot-row');
        row.innerHTML = `
          <div class="message message-bot">
            <div class="message-sender-name">Hyundai Summarecon Bekasi</div>
            <div class="message-content">
              Percakapan telah diatur ulang. Ada informasi unit Hyundai, jadwal servis, atau test drive yang dapat kami bantu untuk Anda?
            </div>
            <div class="message-meta">
              <span class="message-time">${timeStr}</span>
            </div>
          </div>
        `;
        chatBox.appendChild(row);
        chatBox.scrollTop = chatBox.scrollHeight;
      }
    });
  }
});
