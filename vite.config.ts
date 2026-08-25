import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';
import { GoogleGenAI } from '@google/genai';

function geminiApiDevPlugin() {
  return {
    name: 'gemini-api-dev-plugin',
    configureServer(server: any) {
      server.middlewares.use('/api/gemini/tadabbur', async (req: any, res: any) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end('Method Not Allowed');
          return;
        }

        let body = '';
        req.on('data', (chunk: any) => {
          body += chunk;
        });

        req.on('end', async () => {
          try {
            const { prompt, verseText, surahName } = JSON.parse(body || '{}');
            const apiKey = process.env.GEMINI_API_KEY;

            if (!apiKey) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'GEMINI_API_KEY غير متوفر في البيئة' }));
              return;
            }

            const ai = new GoogleGenAI({
              apiKey,
              httpOptions: {
                headers: {
                  'User-Agent': 'aistudio-build',
                },
              },
            });

            const systemInstruction = `أنت مساعد إسلامي خبير وموثوق متخصص في تدبر القرآن الكريم والتفسير الميسر بأسلوب إيماني راقٍ بأسلوب واضح وموجز ومفيد.`;

            const userPrompt = verseText
              ? `تدبر الآية الكريمة من سورة ${surahName || ''}:\n"${verseText}"\n${prompt || 'ما هي الهدايات والدروس والعبر الإيمانية والعملية المستفادة؟'}`
              : prompt;

            const response = await ai.models.generateContent({
              model: 'gemini-3.6-flash',
              contents: userPrompt,
              config: {
                systemInstruction,
              },
            });

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ text: response.text }));
          } catch (error: any) {
            console.error('Dev Gemini API error:', error);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: error?.message || 'حدث خطأ بالاتصال مع الذكاء الاصطناعي' }));
          }
        });
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), geminiApiDevPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
