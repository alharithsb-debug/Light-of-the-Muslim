import React, { useState, useEffect } from 'react';
import { Search, BookOpen, Play, Pause, Volume2, Info, Bookmark, ChevronRight, Sliders, Type, Check, Sparkles } from 'lucide-react';
import { SURAHS, POPULAR_SURAHS_DATA, Ayah, Surah } from '../data/quranData';

interface QuranReaderProps {
  onPlayAudio: (url: string, title: string) => void;
  isPlaying: boolean;
  currentPlayingUrl?: string;
  onAskAi: (verseText: string, surahName: string) => void;
}

export const QuranReader: React.FC<QuranReaderProps> = ({
  onPlayAudio,
  isPlaying,
  currentPlayingUrl,
  onAskAi,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'Meccan' | 'Medinan'>('all');
  const [selectedSurah, setSelectedSurah] = useState<Surah | null>(null);
  const [ayahs, setAyahs] = useState<Ayah[]>([]);
  const [loadingAyahs, setLoadingAyahs] = useState(false);
  const [selectedReciter, setSelectedReciter] = useState('ar.alafasy');
  const [fontSize, setFontSize] = useState<'sm' | 'md' | 'lg' | 'xl'>('md');
  const [activeTafsirAyah, setActiveTafsirAyah] = useState<Ayah | null>(null);
  const [bookmarks, setBookmarks] = useState<number[]>([]);

  const reciters = [
    { id: 'ar.alafasy', name: 'مشاري العفاسي' },
    { id: 'ar.abdulbasitmurattal', name: 'عبد الباسط عبد الصمد' },
    { id: 'ar.husary', name: 'محمود خليل الحصري' },
    { id: 'ar.mahermuaiqly', name: 'ماهر المعيقلي' },
  ];

  // Filter Surahs list
  const filteredSurahs = SURAHS.filter((s) => {
    const matchesSearch = s.name.includes(searchQuery) || s.englishName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || s.revelationType === filterType;
    return matchesSearch && matchesType;
  });

  // Fetch Ayahs when a Surah is clicked
  useEffect(() => {
    if (!selectedSurah) return;

    const fetchSurahAyahs = async () => {
      setLoadingAyahs(true);
      try {
        const response = await fetch(`https://api.alquran.cloud/v1/surah/${selectedSurah.number}`);
        if (response.ok) {
          const data = await response.json();
          if (data.data?.ayahs) {
            const mappedAyahs: Ayah[] = data.data.ayahs.map((a: any) => ({
              number: a.number,
              numberInSurah: a.numberInSurah,
              text: a.text,
              juz: a.juz,
              page: a.page,
              surahNumber: selectedSurah.number,
              surahName: selectedSurah.name,
            }));
            setAyahs(mappedAyahs);
            setLoadingAyahs(false);
            return;
          }
        }
      } catch (err) {
        console.warn("API fetch error, using local surah fallback:", err);
      }

      // Offline local fallback if network error or popular surah
      if (POPULAR_SURAHS_DATA[selectedSurah.number]) {
        setAyahs(POPULAR_SURAHS_DATA[selectedSurah.number]);
      } else {
        // Generate placeholder verses if offline
        const fallbackAyahs: Ayah[] = Array.from({ length: Math.min(selectedSurah.numberOfAyahs, 15) }, (_, i) => ({
          number: selectedSurah.number * 1000 + i + 1,
          numberInSurah: i + 1,
          text: i === 0 && selectedSurah.number !== 9
            ? "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ"
            : `تلاوة وقراءة آيات سورة ${selectedSurah.name} - آية رقم ${i + 1}`,
          juz: 1,
          page: selectedSurah.page,
          surahNumber: selectedSurah.number,
          surahName: selectedSurah.name,
          tafsirMuyassar: `تفسير الآية ${i + 1} من سورة ${selectedSurah.name}`
        }));
        setAyahs(fallbackAyahs);
      }
      setLoadingAyahs(false);
    };

    fetchSurahAyahs();
  }, [selectedSurah]);

  const toggleBookmark = (ayahNumber: number) => {
    setBookmarks((prev) =>
      prev.includes(ayahNumber) ? prev.filter((b) => b !== ayahNumber) : [...prev, ayahNumber]
    );
  };

  const getAudioUrl = (surahNum: number, ayahInSurah: number) => {
    // Al Quran Cloud audio format
    return `https://cdn.islamic.network/quran/audio/128/${selectedReciter}/${surahNum * 1000 + ayahInSurah}.mp3`;
  };

  const getFontClass = () => {
    switch (fontSize) {
      case 'sm': return 'text-xl leading-relaxed';
      case 'md': return 'text-2xl leading-loose';
      case 'lg': return 'text-3xl leading-loose';
      case 'xl': return 'text-4xl leading-loose';
    }
  };

  return (
    <div className="space-y-6">
      {/* Search & Filter Bar */}
      {!selectedSurah ? (
        <div className="space-y-6">
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-emerald-800 to-teal-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-2xl pointer-events-none" />
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
              <div>
                <span className="text-xs font-bold text-amber-300 uppercase tracking-widest">المصحف الشريف</span>
                <h2 className="text-2xl sm:text-3xl font-bold mt-1">القرآن الكريم كاملاً (114 سورة)</h2>
                <p className="text-xs sm:text-sm text-stone-200 mt-1">
                  قراءة عثمانية مريحة مع التفسير الميسر والاستماع لأشهر القراء
                </p>
              </div>
              <div className="flex items-center gap-2 bg-white/10 p-2 rounded-2xl border border-white/10">
                <BookOpen className="w-8 h-8 text-amber-300" />
              </div>
            </div>
          </div>

          {/* Controls Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white dark:bg-stone-900 p-4 rounded-2xl border border-amber-200/50 dark:border-stone-800 shadow-xs">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="absolute right-3.5 top-3 w-4 h-4 text-stone-400" />
              <input
                type="text"
                placeholder="ابحث باسم السورة (مثال: الكهف، البقرة)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pr-10 pl-4 py-2 bg-amber-50/50 dark:bg-stone-800 border border-amber-200/60 dark:border-stone-700 rounded-xl text-xs sm:text-sm text-stone-800 dark:text-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Revelation Filter */}
            <div className="flex items-center gap-1.5 bg-amber-50/80 dark:bg-stone-800 p-1 rounded-xl border border-amber-200/40 dark:border-stone-700/50 self-start md:self-auto">
              <button
                onClick={() => setFilterType('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  filterType === 'all'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-stone-600 dark:text-stone-300 hover:text-emerald-700'
                }`}
              >
                الكل (114)
              </button>
              <button
                onClick={() => setFilterType('Meccan')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  filterType === 'Meccan'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-stone-600 dark:text-stone-300 hover:text-emerald-700'
                }`}
              >
                مكية 🕋
              </button>
              <button
                onClick={() => setFilterType('Medinan')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  filterType === 'Medinan'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-stone-600 dark:text-stone-300 hover:text-emerald-700'
                }`}
              >
                مدنية 🕌
              </button>
            </div>
          </div>

          {/* Surahs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredSurahs.map((surah) => (
              <div
                key={surah.number}
                onClick={() => setSelectedSurah(surah)}
                className="group bg-white dark:bg-stone-900 p-4 rounded-2xl border border-amber-200/50 dark:border-stone-800 hover:border-emerald-500 dark:hover:border-emerald-500 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer flex items-center justify-between"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-100/70 dark:bg-stone-800 text-emerald-800 dark:text-emerald-400 font-bold text-xs flex items-center justify-center border border-amber-200/60 dark:border-stone-700 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    {surah.number}
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-stone-900 dark:text-stone-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                      سورة {surah.name}
                    </h3>
                    <p className="text-[11px] text-stone-500 dark:text-stone-400">
                      {surah.revelationType === 'Meccan' ? 'مكية' : 'مدنية'} • {surah.numberOfAyahs} آية
                    </p>
                  </div>
                </div>
                <div className="text-stone-400 group-hover:text-emerald-600 transition-colors">
                  <ChevronRight className="w-5 h-5 rotate-180" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Single Surah Reader View */
        <div className="space-y-6">
          {/* Top Bar Navigation & Settings */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-stone-900 p-4 rounded-2xl border border-amber-200/50 dark:border-stone-800 shadow-xs">
            <button
              onClick={() => setSelectedSurah(null)}
              className="flex items-center gap-2 px-3.5 py-1.5 bg-amber-100 dark:bg-stone-800 hover:bg-amber-200 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 rounded-xl text-xs font-bold transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
              <span>العودة لفهرس السور</span>
            </button>

            <div className="flex items-center gap-2">
              {/* Reciter Picker */}
              <div className="flex items-center gap-1.5 text-xs text-stone-600 dark:text-stone-300">
                <Volume2 className="w-4 h-4 text-emerald-600" />
                <select
                  value={selectedReciter}
                  onChange={(e) => setSelectedReciter(e.target.value)}
                  className="bg-amber-50 dark:bg-stone-800 border border-amber-200 dark:border-stone-700 rounded-xl px-2.5 py-1 text-xs font-bold text-stone-800 dark:text-stone-200 focus:outline-none"
                >
                  {reciters.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Font Size Controls */}
              <div className="flex items-center gap-1 bg-amber-50 dark:bg-stone-800 p-1 rounded-xl border border-amber-200/50 dark:border-stone-700">
                <Type className="w-3.5 h-3.5 text-stone-500 mx-1" />
                {(['sm', 'md', 'lg', 'xl'] as const).map((size) => (
                  <button
                    key={size}
                    onClick={() => setFontSize(size)}
                    className={`px-2 py-0.5 rounded-lg text-[11px] font-bold uppercase transition-colors ${
                      fontSize === size ? 'bg-emerald-600 text-white' : 'text-stone-600 dark:text-stone-300'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Surah Header Card */}
          <div className="bg-gradient-to-br from-emerald-800 via-teal-900 to-stone-900 text-white rounded-3xl p-6 sm:p-8 text-center relative overflow-hidden shadow-lg border border-emerald-700/50">
            <h2 className="font-quran text-4xl sm:text-5xl font-bold text-amber-200 mb-2">
              سورة {selectedSurah.name}
            </h2>
            <p className="text-xs sm:text-sm text-stone-200">
              {selectedSurah.revelationType === 'Meccan' ? 'مكية' : 'مدنية'} • عدد آياتها: {selectedSurah.numberOfAyahs} • الصفحة: {selectedSurah.page}
            </p>

            {selectedSurah.number !== 9 && (
              <div className="mt-6 pt-4 border-t border-white/10 font-quran text-2xl text-amber-300">
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </div>
            )}
          </div>

          {/* Ayahs List */}
          {loadingAyahs ? (
            <div className="py-16 text-center space-y-3">
              <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-xs text-stone-500 font-semibold">جاري تحميل آيات سورة {selectedSurah.name}...</p>
            </div>
          ) : (
            <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-8 border border-amber-200/50 dark:border-stone-800 shadow-xs space-y-6">
              {ayahs.map((ayah) => {
                const audioUrl = getAudioUrl(selectedSurah.number, ayah.numberInSurah);
                const isThisPlaying = currentPlayingUrl === audioUrl && isPlaying;
                const bookmarked = bookmarks.includes(ayah.number);

                return (
                  <div
                    key={ayah.number}
                    className="p-5 rounded-2xl bg-amber-50/40 dark:bg-stone-800/40 border border-amber-100 dark:border-stone-800/80 hover:border-emerald-400/50 transition-all duration-200 space-y-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      {/* Ayah Number Badge */}
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 font-bold text-xs shrink-0 border border-emerald-300/40">
                        {ayah.numberInSurah}
                      </span>

                      {/* Verse Text */}
                      <p className={`font-quran font-medium text-stone-900 dark:text-stone-100 text-right flex-1 ${getFontClass()}`}>
                        {ayah.text}
                      </p>
                    </div>

                    {/* Ayah Interactive Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-stone-200/40 dark:border-stone-700/40">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onPlayAudio(audioUrl, `سورة ${selectedSurah.name} - آية ${ayah.numberInSurah}`)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                            isThisPlaying
                              ? 'bg-amber-400 text-stone-900'
                              : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                          }`}
                        >
                          {isThisPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                          <span>{isThisPlaying ? 'إيقاف' : 'استماع'}</span>
                        </button>

                        <button
                          onClick={() => setActiveTafsirAyah(activeTafsirAyah?.number === ayah.number ? null : ayah)}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-stone-700 dark:text-stone-300 rounded-xl text-xs font-medium transition-colors"
                        >
                          <Info className="w-3.5 h-3.5 text-emerald-600" />
                          <span>التفسير</span>
                        </button>

                        <button
                          onClick={() => onAskAi(ayah.text, selectedSurah.name)}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-800 dark:text-amber-300 rounded-xl text-xs font-bold transition-colors border border-amber-400/30"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                          <span>تدبر AI</span>
                        </button>
                      </div>

                      <button
                        onClick={() => toggleBookmark(ayah.number)}
                        className={`p-2 rounded-xl transition-colors ${
                          bookmarked ? 'bg-amber-400 text-stone-900' : 'text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
                        }`}
                        title="حفظ العلامة"
                      >
                        <Bookmark className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Tafsir Expandable Box */}
                    {activeTafsirAyah?.number === ayah.number && (
                      <div className="p-4 rounded-xl bg-amber-100/50 dark:bg-stone-800 text-xs text-stone-800 dark:text-stone-200 space-y-1 animate-fadeIn border border-amber-200 dark:border-stone-700">
                        <p className="font-bold text-emerald-800 dark:text-emerald-400">التفسير الميسر:</p>
                        <p>{ayah.tafsirMuyassar || 'تأمل هدايات هذه الآية الكريمة والعمل بمقتضاها في حياتك اليومية.'}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
