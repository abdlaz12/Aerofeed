// src/pages/api/ai/analyze.js

const MODELS = [
  "gemini-2.5-flash",
  "gemini-2.0-flash",
  "gemini-2.0-flash-lite"
];

// ⏳ Delay helper
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// 🔁 Fetch dengan retry + fallback
async function fetchWithFallback(API_KEY, finalPrompt, maxRetries = 2) {
  for (const model of MODELS) {
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1/models/${model}:generateContent`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-goog-api-key": API_KEY,
            },
            body: JSON.stringify({
              contents: [
                {
                  parts: [{ text: finalPrompt }],
                },
              ],
              generationConfig: {
                maxOutputTokens: 200,
                temperature: 0.7,
              },
            }),
          }
        );

        const data = await response.json();

        // ✅ Success
        if (response.ok) {
          console.log(`✅ Berhasil pakai model: ${model}`);
          return data;
        }

        // 🔁 Handle retryable errors
        if ([503, 429].includes(response.status)) {
          console.log(
            `⚠️ Model ${model} attempt ${attempt + 1} gagal (${response.status}), retry...`
          );
          await delay(1000 * (attempt + 1)); // exponential delay
          continue;
        }

        // ❌ Error lain
        throw new Error(data.error?.message || "Unknown error");

      } catch (err) {
        console.log(`❌ Error di model ${model}:`, err.message);

        if (attempt === maxRetries) {
          console.log(`⏭️ Pindah ke model berikutnya...`);
        }
      }
    }
  }

  throw new Error("Semua model sedang sibuk / quota habis.");
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { ph, temp, fish_species, prompt: userPrompt } = req.body;

  const API_KEY = process.env.GEMINI_API_KEY;

  if (!API_KEY) {
    return res.status(500).json({
      success: false,
      message: "API Key Gemini tidak ditemukan di .env.local",
    });
  }

  const finalPrompt =
    userPrompt ||
    `
Anda adalah AI aquaculture expert untuk sistem AeroFeed.

Data:
- Ikan: ${fish_species || "Umum"}
- pH Air: ${ph || "--"}
- Suhu: ${temp || "--"}°C

Tugas:
1. Nilai apakah kondisi NORMAL atau BERBAHAYA
2. Jelaskan jika ada yang tidak ideal
3. Berikan 1 saran praktis

Jawaban maksimal 2 kalimat, singkat dan jelas.
`;

  try {
    const data = await fetchWithFallback(API_KEY, finalPrompt);

    const aiResponseText =
      data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!aiResponseText) {
      throw new Error("AI tidak memberikan jawaban yang valid.");
    }

    return res.status(200).json({
      success: true,
      analysis: aiResponseText,
    });

  } catch (error) {
    console.error("🚨 Gemini Final Error:", error.message);

    // 🔥 UX friendly response
    return res.status(200).json({
      success: false,
      analysis:
        "AI sedang sibuk saat ini. Silakan coba lagi dalam beberapa detik 🙏",
    });
  }
}