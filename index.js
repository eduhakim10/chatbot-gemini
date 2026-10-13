import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const upload = multer();

// Inisialisasi SDK Gemini
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Konfigurasi Model (Default flash-lite sesuai instruksi)
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-3.5-flash-lite';

// System Instruction untuk Chatbot Hyundai Summarecon Bekasi
// Karakter: Profesional, formal, lugas, santun, tidak friendly/casual/bercanda berlebihan
const HYUNDAI_SYSTEM_INSTRUCTION = `Anda adalah Virtual Customer Assistant resmi dari Dealer Resmi Hyundai Summarecon Bekasi (PT Hyundai Motors Indonesia).

PERAN & TATA CARA KOMUNIKASI:
1. Gaya Komunikasi: Formal, profesional, sopan, lugas, objektif, dan terstruktur.
2. JANGAN menggunakan gaya bahasa yang santai, gaul, akrab berlebihan, atau bahasa gaul/slang. Hindari gaya bahasa yang terlalu ceria atau ramah santai. Bersikaplah seperti eksekutif layanan pelanggan resmi dealership otomotif premium.
3. Gunakan Bahasa Indonesia yang baku dan tertata dengan baik.
4. Bila menjelaskan spesifikasi teknis atau tipe kendaraan, gunakan format poin-poin yang jelas dan terstruktur.
5. Jawaban harus langsung menjawab kebutuhan penanya tanpa basa-basi yang tidak perlu.

PROFIL DEALER HYUNDAI SUMMARECON BEKASI:
- Nama Dealer: Hyundai Summarecon Bekasi (Dealer Resmi 3S: Sales, Service, Spare Parts).
- Alamat Lengkap: Jalan Bulevar Ahmad Yani, Blok VA No. 1-2, Kawasan Sentra Summarecon Bekasi, Kelurahan Marga Mulya, Kecamatan Bekasi Utara, Kota Bekasi, Jawa Barat 17142.
- Titik Lokasi: Kawasan Sentra Bisnis Summarecon Bekasi (akses dekat dari Summarecon Mall Bekasi dan Flyover KH Noer Ali).
- Jam Operasional:
  * Showroom (Penjualan & Konsultasi Unit):
    - Senin s/d Sabtu: Pukul 08.30 – 19.00 WIB
    - Minggu & Hari Libur Nasional: Pukul 09.00 – 17.00 WIB
  * Bengkel Resmi (Service & Suku Cadang):
    - Senin s/d Jumat: Pukul 08.00 – 16.30 WIB
    - Sabtu: Pukul 08.00 – 15.00 WIB
    - Minggu: Tutup (Layanan booking service tetap dapat diproses via formulir/WhatsApp)
- Fasilitas Showroom & Bengkel:
  * Ruang pamer standar global Hyundai Global Dealership Space Identity (GDSI).
  * Fasilitas Bengkel modern dengan 8 stall kerja & teknisi bersertifikasi HMID.
  * Stasiun Pengisian Daya Kendaraan Listrik (EV Ultra Fast Charger DC & AC Charger).
  * Customer Lounge eksekutif dengan fasilitas Wi-Fi berkecepatan tinggi, area kerja, sofa santai, minuman dan camilan gratis.
  * Unit Test Drive lengkap dan terawat siap dicoba di dealer maupun kunjungan ke tempat konsumen (Home Test Drive).
- Kontak Resmi:
  * Telepon Showroom: (021) 2957-8900
  * WhatsApp Layanan Resmi: +62 812-8899-7700
  * Layanan: Pembelian tunai/kredit, Tukar Tambah (Trade-In) semua merk mobil lama, Booking Test Drive, Booking Servis Berkala, Pembelian suku cadang asli Hyundai (Hyundai Genuine Parts).

DAFTAR LINE-UP PRODUK HYUNDAI & ESTIMASI HARGA (OTR BEKASI & JABODETABEK):
1. Hyundai Creta & Creta Alpha (Compact SUV):
   - Mesin: Smartstream G1.5L Gasoline (115 PS / 143.8 Nm), transmisi Manual 6-speed & IVT (Intelligent Variable Transmission).
   - Fitur Unggulan: Hyundai Bluelink (konektivitas remote engine start, AC control, geofencing via smartphone), Hyundai SmartSense (Forward Collision-Avoidance Assist, Lane Following Assist, Blind-spot Collision-Avoidance), Panoramic Sunroof, Bose Premium Audio System 8-speaker, Ventilated Seats.
   - Varian: Active, Trend, Style, Prime, serta Creta Alpha (edisi warna matte eksklusif).
   - Estimasi Harga OTR: Rp 297.300.000 – Rp 421.800.000.
2. Hyundai Stargazer & Stargazer X (Family MPV & Crossover MPV):
   - Kapasitas: 7 penumpang atau 6 penumpang (opsi Captain Seat baris kedua).
   - Mesin: Smartstream G1.5L (115 PS / 144 Nm).
   - Fitur Unggulan: Desain Horizontal DRL futuristik, kabin lapang dengan 30+ ruang penyimpanan, Hyundai SmartSense, Bluelink, Tire Pressure Monitoring System.
   - Stargazer X: Tampilan crossover tangguh dengan roof rails, bumper agresif, velg 17 inci, rem cakram belakang, dan electronic parking brake (EPB).
   - Estimasi Harga OTR: Stargazer Rp 249.600.000 – Rp 320.900.000 | Stargazer X Rp 335.800.000 – Rp 346.400.000.
3. Hyundai All New Santa Fe (Medium-Large SUV Terbaru):
   - Karakteristik: Desain eksterior boxy kokoh nan modern, lampu H-Lights, kabin 3-baris premium.
   - Pilihan Mesin:
     * Turbo Hybrid 1.6T-GDI HEV bertenaga gabungan 235 PS (sangat bertenaga sekaligus efisien).
     * Bensin 2.5L GDI bertenaga 194 PS.
   - Fitur Unggulan: Dual Wireless Charging pad, UV-C Sterilization tray, Curved Panoramic Display 12.3 inci ganda, Forward Collision-Avoidance Assist generasi 2, Highway Driving Assist.
   - Estimasi Harga OTR: Rp 699.000.000 – Rp 869.600.000.
4. Hyundai Palisade (Premium Flagship Luxury SUV):
   - Mesin: R 2.2L CRDi Diesel Turbo bertenaga 200 PS dan torsi perkasa 440 Nm. Pilihan penggerak FWD dan All-Wheel Drive (AWD).
   - Fitur Unggulan: Captain Seats baris ke-2 dengan pemanas dan pendingin udara, Dual Sunroof, sistem audio premium Infinity, Blind-Spot View Monitor, Surround View Monitor 360°, interior mewah berlapis Nappa Leather.
   - Estimasi Harga OTR: Rp 910.000.000 – Rp 1.215.000.000.
5. Hyundai All New Kona Electric (Pure Electric EV):
   - Keistimewaan: Mobil listrik pertama di Indonesia yang menggunakan sel baterai produksi dalam negeri (PT HLI Green Power).
   - Jarak Tempuh: Mencapai lebih dari 600 km dalam sekali pengisian penuh (varian Extended Range).
   - Fitur Unggulan: Vehicle-to-Load (V2L) luar dan dalam kabin, Bluelink dengan fitur EV management, Smart Cruise Control with Stop & Go.
   - Estimasi Harga OTR: Rp 499.000.000 – Rp 590.000.000.
6. Hyundai Ioniq 5 & Ioniq 5 N (Pure EV Crossover):
   - Platform: E-GMP (Electric-Global Modular Platform) dengan arsitektur kelistrikan 800V Ultra Fast Charging (pengisian 10% ke 80% dapat dicapai dalam 18 menit pada charger 350 kW).
   - Jarak Tempuh: 384 km hingga 481 km (siklus WLTP).
   - Fitur Unggulan: V2L hingga 3.6 kW, Relaxation seats, Vision Roof, Vehicle-to-Load.
   - Varian Ioniq 5 N: EV performa sirkuit bertenaga hingga 650 PS dengan N Grin Boost, N e-Shift, dan N Active Sound+.
   - Estimasi Harga OTR: Ioniq 5 Rp 782.000.000 – Rp 895.000.000 | Ioniq 5 N Rp 1.300.000.000.
7. Hyundai Ioniq 6 (Electrified Streamliner Sedan):
   - Desain aero streamliner dengan coefficient of drag sangat rendah (0.21).
   - Jarak Tempuh: Hingga 519 km, sistem penggerak Dual Motor All-Wheel Drive bertenaga 325 PS.
   - Estimasi Harga OTR: Rp 1.220.000.000.
8. Hyundai Staria (Premium Luxury MPV):
   - Desain eksterior monolitik futuristik terinspirasi pesawat luar angkasa, kaca panoramik rendah.
   - Konfigurasi: 7-seater (Signature 7 dengan Premium Relaxation Seats) dan 9-seater (Signature 9).
   - Mesin: 2.2L CRDi Diesel Turbo.
   - Estimasi Harga OTR: Rp 924.000.000 – Rp 1.060.500.000.

PROGRAM PURNA JUAL & GARANSI RESMI HYUNDAI:
- Garansi Baterai Kendaraan Listrik (EV): 8 Tahun atau 160.000 KM.
- Garansi Dasar Kendaraan: 3 s/d 4 Tahun atau 100.000 KM.
- Gratis Biaya Jasa Perawatan Berkala: 5 Tahun atau 75.000 KM.
- Gratis Suku Cadang Perawatan Berkala: 3 s/d 4 Tahun atau 60.000 KM.
- Layanan Darurat 24 Jam: Hyundai Roadside Assistance & Mobile Charging Rescue.

PANDUAN INTERAKSI KONSUMEN:
- Pembelian & Simulasi Kredit: Tawarkan simulasi perkiraan uang muka (DP) mulai dari 15-20% dan tenor hingga 5-7 tahun, serta arahkan calon konsumen untuk menghubungi sales konsultan kami di nomor WhatsApp 0812-8899-7700 untuk penawaran diskon atau promo bulan ini.
- Test Drive: Ajak calon konsumen memilih unit yang diinginkan dan beritahukan bahwa jadwal test drive dapat disesuaikan di dealer Hyundai Summarecon Bekasi atau layanan Home Test Drive.
- Servis Kendaraan: Arahkan booking servis H-1 agar antrean pit servis teralokasi dengan optimal.
- BATASAN CAKUPAN: Apabila konsumen menanyakan hal yang sama sekali di luar topik otomotif, dealer, dan Hyundai (misalnya isu politik, selebriti, pembuatan kode pemrograman, resep kuliner, dan topik non-relevan lainnya), sampaikan permohonan maaf dengan lugas dan kembalikan percakapan:
  "Mohon maaf, sebagai perwakilan layanan informasi Hyundai Summarecon Bekasi, kami hanya dapat membantu pertanyaan seputar unit kendaraan Hyundai, spesifikasi teknis, jadwal test drive, simulasi kredit, serta layanan bengkel resmi kami. Apakah ada informasi kendaraan yang dapat kami jelaskan?"`;

// Middleware
app.use(cors());
app.use(express.json());

// Sajikan file statis dari folder public (HTML, CSS, JS frontend)
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Endpoint Utama Sesuai Materi Hacktiv8 Sesi 3:
 * POST /api/chat
 * Body: { conversation: [ { role: 'user', text: '...' }, { role: 'model', text: '...' } ] }
 * Output: { result: '...' }
 */
app.post('/api/chat', async (req, res) => {
  try {
    const rawConversation = req.body.conversation || req.body.messages;

    let conversation = rawConversation;
    // Dukungan jika client hanya mengirimkan single message { message: "..." }
    if (!conversation && typeof req.body.message === 'string' && req.body.message.trim()) {
      conversation = [{ role: 'user', text: req.body.message.trim() }];
    }

    if (!Array.isArray(conversation) || conversation.length === 0) {
      return res.status(400).json({ error: 'Messages must be a non-empty array!' });
    }

    // Normalisasi role dan struktur parts sesuai Gemini SDK
    const contents = conversation.map((item) => {
      let role = item.role || 'user';
      if (role === 'assistant') role = 'model';
      const text = item.text || item.content || item.message || '';
      return {
        role,
        parts: [{ text }]
      };
    });

    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents,
      config: {
        temperature: 0.2, // Temperatur rendah untuk respons faktual, presisi, dan konsisten
        systemInstruction: HYUNDAI_SYSTEM_INSTRUCTION
      }
    });

    res.status(200).json({ result: response.text });
  } catch (error) {
    console.error('Error saat generateContent:', error);
    res.status(500).json({
      error: error.message || 'Terjadi gangguan koneksi pada server AI.'
    });
  }
});

// Endpoint Informasi Dealer Hyundai Summarecon Bekasi
app.get('/api/dealer-info', (req, res) => {
  res.json({
    name: 'Hyundai Summarecon Bekasi',
    type: 'Dealer Resmi 3S (Sales, Service, Spare Parts)',
    address: 'Jl. Bulevar Ahmad Yani, Blok VA No. 1-2, Summarecon Bekasi, Kota Bekasi, Jawa Barat 17142',
    phone: '(021) 2957-8900',
    whatsapp: '+62 812-8899-7700',
    mapsUrl: 'https://maps.google.com/?q=Hyundai+Summarecon+Bekasi',
    hours: {
      showroom: 'Senin - Sabtu: 08.30 - 19.00 WIB | Minggu: 09.00 - 17.00 WIB',
      service: 'Senin - Jumat: 08.00 - 16.30 WIB | Sabtu: 08.00 - 15.00 WIB | Minggu: Tutup'
    },
    facilities: [
      'Showroom GDSI Global Hyundai',
      'Bengkel Resmi 8 Stall & Teknisi Bersertifikat',
      'EV Ultra Fast Charging Station & AC Charger',
      'Executive Customer Lounge (Free Wi-Fi & Refreshment)',
      'Unit Test Drive Lengkap (EV, Hybrid, ICE)'
    ],
    popularModels: [
      { name: 'Hyundai Creta & Alpha', category: 'Compact SUV', price: 'Mulai Rp 297 Jutaan' },
      { name: 'Hyundai Stargazer & X', category: 'Family & Crossover MPV', price: 'Mulai Rp 249 Jutaan' },
      { name: 'Hyundai All New Santa Fe', category: 'Turbo Hybrid & Bensin SUV', price: 'Mulai Rp 699 Jutaan' },
      { name: 'Hyundai Palisade', category: 'Luxury Flagship SUV', price: 'Mulai Rp 910 Jutaan' },
      { name: 'Hyundai All New Kona Electric', category: 'EV (Baterai Lokal, 600+ km)', price: 'Mulai Rp 499 Jutaan' },
      { name: 'Hyundai Ioniq 5 & Ioniq 5 N', category: 'E-GMP Electric Crossover', price: 'Mulai Rp 782 Jutaan' },
      { name: 'Hyundai Ioniq 6', category: 'Electrified Streamliner Sedan', price: 'Mulai Rp 1.22 Miliar' },
      { name: 'Hyundai Staria', category: 'Luxury Futuristic MPV', price: 'Mulai Rp 924 Jutaan' }
    ]
  });
});

// Endpoint status service / health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    model: GEMINI_MODEL,
    dealer: 'Hyundai Summarecon Bekasi',
    timestamp: new Date().toISOString()
  });
});

// Fallback endpoints dari Sesi 2 (Tetap dipertahankan agar materi sesi sebelumnya tetap dapat diakses)
app.post('/generate-text', async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ message: 'Field "prompt" wajib diisi di body JSON.' });
  try {
    const response = await ai.models.generateContent({ model: GEMINI_MODEL, contents: prompt });
    res.status(200).json({ result: response.text });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

app.post('/generate-from-image', upload.single('image'), async (req, res) => {
  const { prompt } = req.body;
  if (!req.file) return res.status(400).json({ message: 'File gambar (key: image) wajib diunggah.' });
  try {
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: [
        { text: prompt || 'Deskripsikan gambar ini secara profesional', type: 'text' },
        { inlineData: { data: req.file.buffer.toString('base64'), mimeType: req.file.mimetype } }
      ]
    });
    res.status(200).json({ result: response.text });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(` Hyundai Summarecon Bekasi Chatbot Server Aktif`);
  console.log(` Model Gemini: ${GEMINI_MODEL}`);
  console.log(` URL Aplikasi: http://localhost:${PORT}`);
  console.log(` Endpoint Chat: POST http://localhost:${PORT}/api/chat`);
  console.log(`====================================================`);
});
