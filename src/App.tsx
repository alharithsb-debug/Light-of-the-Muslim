import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { DailyVerseCard } from './components/DailyVerseCard';
import { QuranReader } from './components/QuranReader';
import { PrayerTimes } from './components/PrayerTimes';
import { AthkarSection } from './components/AthkarSection';
import { AsmaaAllahView } from './components/AsmaaAllahView';
import { IslamicRadioView } from './components/IslamicRadioView';
import { AiTadabburView } from './components/AiTadabburView';
import { NotificationSettingsModal } from './components/NotificationSettingsModal';
import { AudioPlayerBar } from './components/AudioPlayerBar';
import { DAILY_VERSES, DailyVerse } from './data/quranData';
import { NotificationSettings, getDefaultSettings, saveNotificationSettings, sendBrowserNotification } from './services/notificationService';
import { BookOpen, Clock, HeartHandshake, Sparkles, Radio, ShieldCheck, Heart, Share2, Compass } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState('home');
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('noor_theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Daily Verse & Notification Settings
  const [currentVerseIndex, setCurrentVerseIndex] = useState(0);
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>(getDefaultSettings);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);

  // Audio Player State
  const [playingAudioUrl, setPlayingAudioUrl] = useState<string | null>(null);
  const [playingAudioTitle, setPlayingAudioTitle] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // AI Tadabbur Context State
  const [aiVerseContext, setAiVerseContext] = useState<{ text: string; surah: string } | null>(null);

  const activeVerse: DailyVerse = DAILY_VERSES[currentVerseIndex % DAILY_VERSES.length];

  // Dark mode effect
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('noor_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('noor_theme', 'light');
    }
  }, [darkMode]);

  // Background Notification Scheduler Simulation & Check
  useEffect(() => {
    saveNotificationSettings(notificationSettings);

    if (!notificationSettings.dailyVerseEnabled) return;

    // Interval check every minute for scheduled time notification trigger
    const interval = setInterval(() => {
      const now = new Date();
      const currentHoursMins = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
      if (currentHoursMins === notificationSettings.scheduledTime) {
        sendBrowserNotification(
          `تطبيق نور - آية اليوم (سورة ${activeVerse.surahName})`,
          `"﴿ ${activeVerse.text} ﴾"`
        );
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [notificationSettings, activeVerse]);

  // Audio Playback Handlers
  const handlePlayAudio = (url: string, title: string) => {
    if (playingAudioUrl === url) {
      setIsPlaying(!isPlaying);
    } else {
      setPlayingAudioUrl(url);
      setPlayingAudioTitle(title);
      setIsPlaying(true);
    }
  };

  const handleNextVerse = () => {
    setCurrentVerseIndex((prev) => (prev + 1) % DAILY_VERSES.length);
  };

  const handleAskAi = (verseText: string, surahName: string) => {
    setAiVerseContext({ text: verseText, surah: surahName });
    setCurrentTab('ai');
  };

  return (
    <div className="min-h-screen bg-amber-50/40 dark:bg-stone-950 text-stone-800 dark:text-stone-100 font-cairo transition-colors duration-300 pb-24">
      {/* Header Navbar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        openNotificationSettings={() => setIsNotificationModalOpen(true)}
        notificationEnabled={notificationSettings.dailyVerseEnabled}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
        {/* Tab 1: Home (الرئيسية) */}
        {currentTab === 'home' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Daily Quran Verse Reminder Card */}
            <DailyVerseCard
              verse={activeVerse}
              onNextVerse={handleNextVerse}
              onPlayAudio={handlePlayAudio}
              isPlaying={isPlaying && playingAudioUrl === activeVerse.audioUrl}
              onAskAi={handleAskAi}
              openNotificationSettings={() => setIsNotificationModalOpen(true)}
              scheduledTime={notificationSettings.scheduledTime}
              onTimeChange={(time) =>
                setNotificationSettings((prev) => ({ ...prev, scheduledTime: time }))
              }
            />

            {/* Quick Feature Hub Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div
                onClick={() => setCurrentTab('quran')}
                className="bg-white dark:bg-stone-900 p-6 rounded-3xl border border-amber-200/50 dark:border-stone-800 hover:border-emerald-500 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer group flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-transform">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-stone-800 px-2.5 py-1 rounded-full">114 سورة</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-stone-900 dark:text-stone-100 group-hover:text-emerald-600 transition-colors">القرآن الكريم كامل</h3>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">تلاوة وتفسير وقراءة بخط عثماني واضح</p>
                </div>
              </div>

              <div
                onClick={() => setCurrentTab('prayer')}
                className="bg-white dark:bg-stone-900 p-6 rounded-3xl border border-amber-200/50 dark:border-stone-800 hover:border-emerald-500 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer group flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-transform">
                    <Clock className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-stone-800 px-2.5 py-1 rounded-full">الأذان والقبلة</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-stone-900 dark:text-stone-100 group-hover:text-emerald-600 transition-colors">الصلاة واتجاه القبلة</h3>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">حساب دقيق لمواقيت الصلوات الخمس والقبلة</p>
                </div>
              </div>

              <div
                onClick={() => setCurrentTab('athkar')}
                className="bg-white dark:bg-stone-900 p-6 rounded-3xl border border-amber-200/50 dark:border-stone-800 hover:border-emerald-500 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer group flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-teal-100 dark:bg-teal-950/80 text-teal-700 dark:text-teal-300 flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-transform">
                    <HeartHandshake className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-stone-800 px-2.5 py-1 rounded-full">حصن المسلم</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-stone-900 dark:text-stone-100 group-hover:text-emerald-600 transition-colors">الأذكار والمسبحة</h3>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">أذكار الصباح والمساء ومسبحة إلكترونية</p>
                </div>
              </div>

              <div
                onClick={() => setCurrentTab('ai')}
                className="bg-gradient-to-br from-emerald-800 to-teal-900 text-white p-6 rounded-3xl border border-emerald-600/40 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer group flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-400 text-stone-950 flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-transform">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold text-stone-900 bg-amber-300 px-2.5 py-1 rounded-full">ذكاء اصطناعي</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-amber-200">تدبر القرآن AI</h3>
                  <p className="text-xs text-stone-200 mt-1">تفسير تفاعلي وإجابات على الاستفسارات</p>
                </div>
              </div>
            </div>

            {/* Featured Daily Dhikr / Inspiration Section */}
            <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-8 border border-amber-200/50 dark:border-stone-800 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-right max-w-xl">
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
                  فضل الذكر والتسبيح
                </span>
                <h3 className="font-quran text-2xl font-bold text-stone-900 dark:text-stone-100">
                  "أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ"
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                  اجعل لسانك رطباً بذكر الله طوال يومك. المسبحة الإلكترونية بالتطبيق تساعدك على إحصاء تسبيحاتك وأذكارك اليومية بسهولة.
                </p>
              </div>

              <button
                onClick={() => setCurrentTab('athkar')}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-bold text-xs sm:text-sm shadow-md transition-colors shrink-0"
              >
                افتح المسبحة الإلكترونية 📿
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Full Quran Reader (القرآن الكريم) */}
        {currentTab === 'quran' && (
          <div className="animate-fadeIn">
            <QuranReader
              onPlayAudio={handlePlayAudio}
              isPlaying={isPlaying}
              currentPlayingUrl={playingAudioUrl || undefined}
              onAskAi={handleAskAi}
            />
          </div>
        )}

        {/* Tab 3: Prayer Times & Qibla (الصلاة والقبلة) */}
        {currentTab === 'prayer' && (
          <div className="animate-fadeIn">
            <PrayerTimes />
          </div>
        )}

        {/* Tab 4: Athkar & Digital Tasbih (الأذكار والمسبحة) */}
        {currentTab === 'athkar' && (
          <div className="animate-fadeIn">
            <AthkarSection />
          </div>
        )}

        {/* Tab 5: 99 Names of Allah (أسماء الله الحسنى) */}
        {currentTab === 'asmaa' && (
          <div className="animate-fadeIn">
            <AsmaaAllahView />
          </div>
        )}

        {/* Tab 6: Islamic Radio & Recitations (الإذاعة والتلاوات) */}
        {currentTab === 'radio' && (
          <div className="animate-fadeIn">
            <IslamicRadioView
              onPlayAudio={handlePlayAudio}
              isPlaying={isPlaying}
              currentPlayingUrl={playingAudioUrl || undefined}
            />
          </div>
        )}

        {/* Tab 7: AI Quran Tadabbur (تدبر بالذكاء الاصطناعي) */}
        {currentTab === 'ai' && (
          <div className="animate-fadeIn">
            <AiTadabburView
              initialVerseText={aiVerseContext?.text}
              initialSurahName={aiVerseContext?.surah}
            />
          </div>
        )}
      </main>

      {/* Persistent Audio Player Bar */}
      <AudioPlayerBar
        url={playingAudioUrl}
        title={playingAudioTitle}
        isPlaying={isPlaying}
        onTogglePlay={() => setIsPlaying(!isPlaying)}
        onClose={() => {
          setIsPlaying(false);
          setPlayingAudioUrl(null);
        }}
      />

      {/* Notification Settings Modal Dialog */}
      <NotificationSettingsModal
        isOpen={isNotificationModalOpen}
        onClose={() => setIsNotificationModalOpen(false)}
        settings={notificationSettings}
        onSave={(newSettings) => setNotificationSettings(newSettings)}
      />

      {/* Simple Footer */}
      <footer className="mt-16 border-t border-amber-200/50 dark:border-stone-800 py-8 text-center text-xs text-stone-500 dark:text-stone-400 space-y-2">
        <p className="font-semibold text-emerald-800 dark:text-emerald-400">تطبيق نور - التطبيق الإسلامي الشامل</p>
        <p>صدقة جارية • جميع الحقوق محفوظة لجميع المسلمين</p>
      </footer>
    </div>
  );
}
