import React, { useState } from 'react';
import { Volume2, VolumeX, BookOpen, Share2, Copy, Sparkles, Bell, Check, RefreshCw, Play, Pause, Bookmark, Info } from 'lucide-react';
import { DailyVerse } from '../data/quranData';
import { sendBrowserNotification, playIslamicChimeSound } from '../services/notificationService';

interface DailyVerseCardProps {
  verse: DailyVerse;
  onNextVerse: () => void;
  onPlayAudio: (url: string, title: string) => void;
  isPlaying: boolean;
  onAskAi: (verseText: string, surahName: string) => void;
  openNotificationSettings: () => void;
  scheduledTime: string;
  onTimeChange: (time: string) => void;
}

export const DailyVerseCard: React.FC<DailyVerseCardProps> = ({
  verse,
  onNextVerse,
  onPlayAudio,
  isPlaying,
  onAskAi,
  openNotificationSettings,
  scheduledTime,
  onTimeChange,
}) => {
  const [showTafsir, setShowTafsir] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [testNotificationSuccess, setTestNotificationSuccess] = useState(false);

  const handleCopy = () => {
    const textToCopy = `"${verse.text}"\n[سورة ${verse.surahName}: آية ${verse.ayahNumber}]\nتطبيق نور الإسلامي`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTestNotification = () => {
    playIslamicChimeSound();
    sendBrowserNotification(
      `تذكير بآية اليوم: سورة ${verse.surahName}`,
      `"${verse.text}"`
    );
    setTestNotificationSuccess(true);
    setTimeout(() => setTestNotificationSuccess(false), 3000);
  };

  return (
    <div className="relative bg-gradient-to-br from-emerald-900 via-teal-900 to-stone-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl overflow-hidden border border-emerald-700/50">
      {/* Decorative Islamic Background Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Tag & Controls */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
          <span className="text-xs font-bold px-3 py-1 bg-amber-400/20 text-amber-300 rounded-full border border-amber-400/30">
            تذكير آية اليوم
          </span>
          <span className="text-xs text-stone-300 font-medium">
            سورة {verse.surahName} (آية {verse.ayahNumber})
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={`p-2 rounded-xl transition-colors ${
              isBookmarked ? 'bg-amber-400 text-stone-900' : 'bg-white/10 text-stone-200 hover:bg-white/20'
            }`}
            title="حفظ الآية في المفضلة"
          >
            <Bookmark className="w-4 h-4" />
          </button>

          <button
            onClick={onNextVerse}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-medium transition-colors text-stone-200 border border-white/10"
            title="آية جديدة"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>آية أخرى</span>
          </button>
        </div>
      </div>

      {/* Core Quranic Verse Text */}
      <div className="relative z-10 text-center my-6 py-2 px-2">
        <p className="font-quran text-2xl sm:text-3xl lg:text-4xl text-amber-100 leading-relaxed sm:leading-loose tracking-wide">
          ﴿ {verse.text} ﴾
        </p>
        <p className="mt-4 text-xs sm:text-sm text-emerald-200/90 max-w-2xl mx-auto font-light leading-relaxed">
          {verse.translation}
        </p>
      </div>

      {/* Tafsir Accordion */}
      {showTafsir && (
        <div className="relative z-10 my-4 p-4 rounded-2xl bg-white/10 border border-white/15 text-stone-100 text-sm leading-relaxed animate-fadeIn">
          <div className="flex items-center gap-2 font-bold text-amber-300 mb-2">
            <Info className="w-4 h-4" />
            <span>التفسير الميسر:</span>
          </div>
          <p className="text-stone-200 text-xs sm:text-sm font-light">{verse.tafsir}</p>
        </div>
      )}

      {/* Main Action Buttons Bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/10">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => onPlayAudio(verse.audioUrl, `سورة ${verse.surahName} - آية ${verse.ayahNumber}`)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
              isPlaying
                ? 'bg-amber-400 text-stone-900 hover:bg-amber-300'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white'
            }`}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isPlaying ? 'إيقاف التلاوة' : 'استماع للتلاوة'}</span>
          </button>

          <button
            onClick={() => setShowTafsir(!showTafsir)}
            className="flex items-center gap-2 px-3.5 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-medium text-stone-200 transition-colors border border-white/10"
          >
            <BookOpen className="w-4 h-4 text-emerald-300" />
            <span>{showTafsir ? 'إخفاء التفسير' : 'التفسير الميسر'}</span>
          </button>

          <button
            onClick={() => onAskAi(verse.text, verse.surahName)}
            className="flex items-center gap-2 px-3.5 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold rounded-xl text-xs shadow-sm transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>تدبر بالذكاء الاصطناعي</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-xs text-stone-200 transition-colors border border-white/10"
            title="نسخ النص"
          >
            {copied ? <Check className="w-4 h-4 text-amber-300" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'تم النسخ' : 'نسخ'}</span>
          </button>

          <button
            onClick={handleCopy}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-xl text-stone-200 transition-colors border border-white/10"
            title="مشاركة الآية"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Background Notification Schedule & Testing Bar */}
      <div className="relative z-10 mt-6 pt-4 border-t border-white/10 bg-black/20 -mx-6 -mb-6 sm:-mx-8 sm:-mb-8 p-4 sm:p-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-300">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-stone-100">موعد التذكير اليومي في الخلفية</p>
            <p className="text-[11px] text-stone-300">يصلك إشعار بالآية وتلاوتها في وقتك المفضل</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={scheduledTime}
            onChange={(e) => onTimeChange(e.target.value)}
            className="bg-stone-800 text-stone-100 text-xs font-bold px-3 py-1.5 rounded-xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          >
            <option value="07:00">07:00 صباحاً</option>
            <option value="08:00">08:00 صباحاً</option>
            <option value="12:00">12:00 ظهراً</option>
            <option value="17:00">05:00 مساءً</option>
            <option value="20:00">08:00 مساءً</option>
            <option value="22:00">10:00 مساءً</option>
          </select>

          <button
            onClick={handleTestNotification}
            className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5"
          >
            <Bell className="w-3.5 h-3.5 text-amber-300" />
            <span>اختبار التنبيه الآن</span>
          </button>

          <button
            onClick={openNotificationSettings}
            className="p-1.5 bg-white/10 hover:bg-white/20 text-stone-300 rounded-xl transition-colors"
            title="إعدادات التنبيهات المتقدمة"
          >
            <Info className="w-4 h-4" />
          </button>
        </div>

        {testNotificationSuccess && (
          <div className="w-full text-center py-1.5 bg-emerald-500/30 text-emerald-200 text-xs font-semibold rounded-lg border border-emerald-400/40 animate-bounce">
            ✓ تم إرسال التنبيه واختبار النغمة بنجاح!
          </div>
        )}
      </div>
    </div>
  );
};
