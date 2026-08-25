import React, { useState } from 'react';
import { Sparkles, Send, Bot, User, BookOpen, RefreshCw, AlertCircle } from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  time: string;
}

interface AiTadabburViewProps {
  initialVerseText?: string;
  initialSurahName?: string;
}

export const AiTadabburView: React.FC<AiTadabburViewProps> = ({
  initialVerseText,
  initialSurahName,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm0',
      sender: 'ai',
      text: initialVerseText
        ? `أهلاً بك! لقد اخترت تدبر الآية الكريمة من سورة ${initialSurahName || ''}:\n"﴿ ${initialVerseText} ﴾"\n\nكيف يمكنني مساعدتك في بيان تفسيرها، هداياتها، أو فوائدها العمليات؟`
        : 'السلام عليكم ورحمة الله وبركاته! أنا مساعدك الذكي لتدبر القرآن الكريم، التفسير الميسر، الفقه العام، والإجابة عن استفساراتك الإسلامية بأسلوب إيماني رصين وسليم. كيف يمكنني إفادتك اليوم؟',
      time: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const samplePrompts = [
    "ما هي الهدايات والدروس المستفادة من آية الكرسي؟",
    "تفسير قوله تعالى: (فَإِنَّ مَعَ الْعُسْرِ يُسْرًا)",
    "كيف أتدبر القرآن الكريم بفاعلية في حياتي اليومية؟",
    "آيات قرآنية تحث على الصبر والتوكل على الله",
  ];

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/gemini/tadabbur', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: query,
          verseText: initialVerseText,
          surahName: initialSurahName
        })
      });

      const data = await response.json();
      const aiReplyText = data.text || data.error || 'عذراً، حدث خطأ أثناء إعداد الإجابة. يرجى المحاولة مرة أخرى.';

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: aiReplyText,
        time: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err: any) {
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: 'عذراً، يتعذر الاتصال بالخادم الآن. يرجى التأكد من الاتصال بالإنترنت والمحاولة مجدداً.',
        time: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Banner */}
      <div className="bg-gradient-to-r from-amber-600 via-emerald-800 to-teal-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-xl bg-amber-400 text-stone-950">
            <Sparkles className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-200">تدبر بالذكاء الاصطناعي</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold">المساعد الذكي لتدبر القرآن الكريم</h2>
        <p className="text-xs sm:text-sm text-stone-200 mt-1">
          اطرح أي سؤال حول تفاسير الآيات، الإعجاز البياني، أو الفوائد التربوية والإيمانية
        </p>
      </div>

      {/* Suggested Prompts */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        {samplePrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(prompt)}
            className="px-3.5 py-2 bg-white dark:bg-stone-900 border border-amber-200/60 dark:border-stone-800 hover:border-emerald-500 rounded-2xl text-xs font-semibold text-stone-700 dark:text-stone-300 whitespace-nowrap shadow-xs transition-all"
          >
            ✨ {prompt}
          </button>
        ))}
      </div>

      {/* Chat Messages Container */}
      <div className="bg-white dark:bg-stone-900 rounded-3xl border border-amber-200/50 dark:border-stone-800 p-4 sm:p-6 shadow-xs min-h-[400px] max-h-[550px] overflow-y-auto space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div
              className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 ${
                msg.sender === 'user'
                  ? 'bg-amber-500 text-stone-950 font-bold'
                  : 'bg-emerald-600 text-white shadow-xs'
              }`}
            >
              {msg.sender === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
            </div>

            <div
              className={`max-w-[85%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                msg.sender === 'user'
                  ? 'bg-amber-500 text-stone-950 font-semibold rounded-tl-none'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-100 rounded-tr-none border border-stone-200/60 dark:border-stone-700/60'
              }`}
            >
              <p>{msg.text}</p>
              <span className="text-[10px] opacity-60 block mt-2 font-mono text-left">{msg.time}</span>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-3 text-xs text-stone-500 font-semibold py-2">
            <div className="w-7 h-7 rounded-xl bg-emerald-600 text-white flex items-center justify-center animate-spin">
              <Sparkles className="w-4 h-4" />
            </div>
            <span>جاري صياغة التفسير والتدبر عبر الذكاء الاصطناعي...</span>
          </div>
        )}
      </div>

      {/* Input Field */}
      <div className="flex items-center gap-2 bg-white dark:bg-stone-900 p-2 rounded-2xl border border-amber-200/60 dark:border-stone-800 shadow-md">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="اكتب آية أو سؤالاً إسلامياً لتدبره..."
          className="flex-1 bg-transparent px-4 py-2 text-xs sm:text-sm text-stone-800 dark:text-stone-100 focus:outline-none"
        />
        <button
          onClick={() => handleSend()}
          disabled={loading || !input.trim()}
          className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold rounded-xl text-xs shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <span>إرسال</span>
          <Send className="w-3.5 h-3.5 rotate-180" />
        </button>
      </div>
    </div>
  );
};
