import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// API Endpoint for Gemini AI Quran Reflection & Answers
app.post('/api/gemini/tadabbur', async (req, res) => {
  try {
    const { prompt, verseText, surahName } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: 'GEMINI_API_KEY environment variable is missing.' });
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const systemInstruction = `أنت مساعد إسلامي خبير وموثوق متخصص في تدبر القرآن الكريم، التفسير الميسر، الفقه العام، والأذكار.
أجب باللغة العربية الفصحى الراقية بأسلوب إيماني رصين، واذكر الاستشهادات القرآنية والأحاديث الصحيحة مع إبراز الدروس والعبر المستفادة والتطبيقات العملية في حياة المسلم.`;

    const userPrompt = verseText
      ? `تدبر الآية الكريمة التالية من سورة ${surahName || ''}:\n"${verseText}"\n${prompt || 'ما هي الهدايات والعبر والفوائد الإيمانية والعملية المشتقة من هذه الآية؟'}`
      : prompt;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: userPrompt,
      config: {
        systemInstruction,
      },
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error('Gemini API Server Error:', error);
    res.status(500).json({ error: error?.message || 'حدث خطأ أثناء معالجة الطلب عبر الذكاء الاصطناعي.' });
  }
});

// Serve static Vite build files in production
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
