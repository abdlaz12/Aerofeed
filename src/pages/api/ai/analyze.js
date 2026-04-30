// src/pages/api/ai/analyze.js
import dbConnect from '../../../lib/mongodb';
import SensorLog from '../../../models/SensorLog';
import Tank from '../../../models/Tank';

const MODELS = [
  "gemini-2.5-flash",
  "gemini-2.0-flash",
  "gemini-2.0-flash-lite"
];

// ⏳ Exponential backoff delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// 🔁 Fetch dengan retry + model fallback
async function fetchWithFallback(API_KEY, payload, maxRetries = 2) {
  for (const model of MODELS) {
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-goog-api-key": API_KEY,
            },
            body: JSON.stringify(payload),
          }
        );

        const data = await response.json();

        if (response.ok) {
          console.log(`✅ Berhasil dengan model: ${model}`);
          return data;
        }

        if ([503, 429].includes(response.status)) {
          console.warn(`⚠️ Model ${model} attempt ${attempt + 1} — status ${response.status}, retrying...`);
          await delay(1000 * (attempt + 1));
          continue;
        }

        throw new Error(data.error?.message || `HTTP ${response.status}`);

      } catch (err) {
        console.error(`❌ Error pada model ${model}:`, err.message);
        if (attempt === maxRetries) {
          console.warn(`⏭️ Pindah ke model berikutnya...`);
        }
      }
    }
  }

  throw new Error("Semua model Gemini sedang sibuk atau quota habis.");
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const API_KEY = process.env.GEMINI_API_KEY;
  if (!API_KEY) {
    return res.status(500).json({
      success: false,
      message: "API Key Gemini tidak ditemukan di .env.local",
    });
  }

  const { device_id, prompt: userPrompt } = req.body;

  // ──────────────────────────────────────────────
  // 1. AMBIL DATA REAL DARI DATABASE
  // ──────────────────────────────────────────────
  let sensorContext = null;
  let tankContext = null;

  if (device_id) {
    try {
      await dbConnect();

      // Ambil info tank (fish_species, threshold ph & temp)
      const tank = await Tank.findOne({ device_id: device_id.toUpperCase() });

      if (tank) {
        tankContext = tank;

        // Ambil 5 log sensor terbaru untuk histori
        const latestLogs = await SensorLog.find({ tank_id: tank._id })
          .sort({ timestamp: -1 })
          .limit(5)
          .lean();

        if (latestLogs.length > 0) {
          sensorContext = latestLogs;
        }
      }
    } catch (dbErr) {
      console.error("⚠️ DB Error (akan fallback ke prompt saja):", dbErr.message);
    }
  }

  // ──────────────────────────────────────────────
  // 2. BANGUN SYSTEM PROMPT YANG KAYA KONTEKS
  // ──────────────────────────────────────────────
  let systemInstruction = `Anda adalah AeroFeed Smart Assistant — seorang ahli akuakultur berbasis AI yang cerdas, ramah, dan berbicara dalam Bahasa Indonesia. 

Peran Anda:
- Membantu pembudidaya ikan mengoptimalkan kondisi air kolam/akuarium mereka
- Menganalisis data sensor pH dan suhu dari perangkat IoT Wokwi secara real-time
- Memberikan saran pakan, jadwal pemberian makan, dan peringatan dini kondisi berbahaya
- Menjawab pertanyaan umum tentang budidaya ikan air tawar maupun air laut

Panduan menjawab:
- Gunakan bahasa yang jelas, padat, dan mudah dipahami oleh petani ikan
- Jika ada data sensor: selalu cantumkan nilai pH/suhu dalam jawaban dan evaluasi apakah normal
- Jika kondisi berbahaya (di luar threshold): beri peringatan tegas dan langkah darurat
- Maksimum 3-4 kalimat untuk jawaban rutin, lebih panjang hanya jika ada kondisi darurat
- Jangan gunakan markdown di respons, cukup teks biasa`;

  let contextBlock = "";

  if (tankContext) {
    const latestSensor = sensorContext?.[0];
    const phStatus = latestSensor 
      ? (latestSensor.ph >= tankContext.ph_min && latestSensor.ph <= tankContext.ph_max ? "NORMAL ✅" : "BERBAHAYA ⚠️")
      : "Tidak diketahui";
    const tempStatus = latestSensor
      ? (latestSensor.temp >= tankContext.temp_min && latestSensor.temp <= tankContext.temp_max ? "NORMAL ✅" : "BERBAHAYA ⚠️")
      : "Tidak diketahui";

    const histori = sensorContext
      ? sensorContext.map((log, i) => {
          const ts = new Date(log.timestamp).toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' });
          return `  ${i === 0 ? '[TERBARU]' : `[${i + 1} log lalu]`} pH: ${log.ph?.toFixed(2)}, Suhu: ${log.temp?.toFixed(1)}°C — ${ts}`;
        }).join('\n')
      : "  Belum ada histori sensor.";

    contextBlock = `
=== DATA KONTEKS TANK REAL-TIME ===
Nama Tank    : ${tankContext.name}
Device ID    : ${tankContext.device_id}
Jenis Ikan   : ${tankContext.fish_species || 'Belum diatur'}
Kapasitas    : ${tankContext.capacity_liter ? tankContext.capacity_liter + ' liter' : 'Belum diatur'}

Threshold Aman:
  pH         : ${tankContext.ph_min} – ${tankContext.ph_max}
  Suhu       : ${tankContext.temp_min}°C – ${tankContext.temp_max}°C

Data Sensor Terbaru (dari Wokwi):
${histori}

Evaluasi Kondisi Saat Ini:
  Status pH  : ${phStatus} (${latestSensor?.ph?.toFixed(2) || '--'})
  Status Suhu: ${tempStatus} (${latestSensor?.temp?.toFixed(1) || '--'}°C)
===================================`;
  } else {
    contextBlock = `
=== KONTEKS SENSOR ===
Data sensor tidak tersedia untuk saat ini. Jawab berdasarkan pengetahuan umum akuakultur.
=====================`;
  }

  // ──────────────────────────────────────────────
  // 3. PANGGIL GEMINI DENGAN MULTI-TURN PROMPT
  // ──────────────────────────────────────────────
  const payload = {
    system_instruction: {
      parts: [{ text: systemInstruction }]
    },
    contents: [
      {
        role: "user",
        parts: [{ text: `${contextBlock}\n\nPertanyaan pengguna: ${userPrompt || "Bagaimana kondisi air kolam saya saat ini?"}` }]
      }
    ],
    generationConfig: {
      maxOutputTokens: 512,
      temperature: 0.7,
      topP: 0.9,
    },
  };

  try {
    const data = await fetchWithFallback(API_KEY, payload);

    const aiResponseText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!aiResponseText) {
      throw new Error("AI tidak memberikan jawaban yang valid.");
    }

    return res.status(200).json({
      success: true,
      analysis: aiResponseText.trim(),
      sensorUsed: sensorContext ? {
        ph: sensorContext[0]?.ph,
        temp: sensorContext[0]?.temp,
        timestamp: sensorContext[0]?.timestamp,
      } : null,
    });

  } catch (error) {
    console.error("🚨 Gemini Final Error:", error.message);
    return res.status(200).json({
      success: false,
      analysis: "AI sedang sibuk saat ini. Silakan coba lagi dalam beberapa detik 🙏",
    });
  }
}