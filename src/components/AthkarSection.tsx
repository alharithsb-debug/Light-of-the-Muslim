import React, { useState } from 'react';
import { ATHKAR_LIST, TASBIH_PRESETS, Thikr, TasbihPreset } from '../data/athkarData';
import { Check, RefreshCw, Volume2, Sparkles, HeartHandshake, CircleDot } from 'lucide-react';
import { playIslamicChimeSound } from '../services/notificationService';

export const AthkarSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'morning' | 'evening' | 'prayer' | 'sleep' | 'duas' | 'tasbih'>('morning');
  const [thikrCounts, setThikrCounts] = useState<Record<string, number>>({});
  
  // Digital Tasbih State
  const [selectedPreset, setSelectedPreset] = useState<TasbihPreset>(TASBIH_PRESETS[0]);
  const [tasbihCounter, setTasbihCounter] = useState(0);
  const [totalDailyTasbih, setTotalDailyTasbih] = useState(0);

  const categories = [
    { id: 'morning', label: 'أذكار الصباح' },
    { id: 'evening', label: 'أذكار المساء' },
    { id: 'prayer', label: 'أذكار الصلاة' },
    { id: 'sleep', label: 'أذكار النوم' },
    { id: 'duas', label: 'أدعية قرآنية' },
    { id: 'tasbih', label: 'المسبحة الإلكترونية 📿' },
  ];

  const handleThikrClick = (thikr: Thikr) => {
    const current = thikrCounts[thikr.id] || 0;
    if (current < thikr.count) {
      const next = current + 1;
      setThikrCounts((prev) => ({ ...prev, [thikr.id]: next }));
      if (next === thikr.count) {
        playIslamicChimeSound();
      }
    }
  };

  const resetThikrCount = (id: string) => {
    setThikrCounts((prev) => ({ ...prev, [id]: 0 }));
  };

  const handleTasbihTap = () => {
    const next = tasbihCounter + 1;
    setTasbihCounter(next);
    setTotalDailyTasbih((prev) => prev + 1);

    if (next >= selectedPreset.targetCount) {
      playIslamicChimeSound();
    }
  };

  const resetTasbih = () => {
    setTasbihCounter(0);
  };

  const currentCategoryAthkar = ATHKAR_LIST.filter((a) => a.category === activeCategory);

  return (
    <div className="space-y-6">
      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar border-b border-amber-200/50 dark:border-stone-800">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id as any)}
            className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
              activeCategory === cat.id
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 border border-amber-200/50 dark:border-stone-800 hover:bg-amber-100/50'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Digital Tasbih Counter Tab View */}
      {activeCategory === 'tasbih' ? (
        <div className="bg-gradient-to-br from-emerald-900 via-teal-900 to-stone-900 text-white rounded-3xl p-6 sm:p-10 text-center shadow-xl border border-emerald-700/50 space-y-8 relative overflow-hidden">
          {/* Preset Selection Dropdown */}
          <div className="max-w-md mx-auto space-y-2">
            <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">اختر الذكر للمسبحة</span>
            <select
              value={selectedPreset.id}
              onChange={(e) => {
                const found = TASBIH_PRESETS.find((p) => p.id === e.target.value);
                if (found) {
                  setSelectedPreset(found);
                  setTasbihCounter(0);
                }
              }}
              className="w-full bg-stone-800 text-amber-200 text-sm font-bold px-4 py-2.5 rounded-2xl border border-amber-400/30 focus:outline-none"
            >
              {TASBIH_PRESETS.map((p) => (
                <option key={p.id} value={p.id} className="bg-stone-900 text-white">
                  {p.name} (الهدف: {p.targetCount})
                </option>
              ))}
            </select>
          </div>

          {/* Dhikr Phrase Display */}
          <div className="space-y-2">
            <h2 className="font-quran text-3xl sm:text-4xl text-amber-100 font-bold leading-relaxed">
              {selectedPreset.text}
            </h2>
            <p className="text-xs text-emerald-200/90 max-w-lg mx-auto font-light">
              {selectedPreset.virtue}
            </p>
          </div>

          {/* Interactive Tap Orb Counter */}
          <div className="flex flex-col items-center justify-center space-y-4">
            <button
              onClick={handleTasbihTap}
              className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-gradient-to-tr from-amber-500 via-amber-400 to-emerald-500 text-stone-950 font-black flex flex-col items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all duration-150 border-8 border-white/10 group cursor-pointer"
            >
              <span className="text-5xl sm:text-6xl font-mono tracking-tight font-black">
                {tasbihCounter}
              </span>
              <span className="text-xs font-bold text-stone-900 mt-1 uppercase tracking-widest">
                الهدف: {selectedPreset.targetCount}
              </span>
              <span className="text-[10px] text-stone-800 font-semibold mt-1 bg-white/40 px-3 py-0.5 rounded-full">
                اضغط للتسبيح
              </span>
            </button>

            <div className="flex items-center gap-4 text-xs font-bold text-stone-300">
              <span>مجموع التسبيحات اليوم: <strong className="text-amber-300 font-mono text-sm">{totalDailyTasbih}</strong></span>
              <button
                onClick={resetTasbih}
                className="flex items-center gap-1 text-stone-400 hover:text-amber-300 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>إعادة ضبط الحساب</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Standard Athkar List */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentCategoryAthkar.map((thikr) => {
            const count = thikrCounts[thikr.id] || 0;
            const isCompleted = count >= thikr.count;

            return (
              <div
                key={thikr.id}
                className={`p-6 rounded-3xl border transition-all duration-200 space-y-4 flex flex-col justify-between ${
                  isCompleted
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400 dark:border-emerald-800 opacity-90'
                    : 'bg-white dark:bg-stone-900 border-amber-200/50 dark:border-stone-800 shadow-xs'
                }`}
              >
                {/* Text Content */}
                <div className="space-y-3">
                  <p className="font-quran text-lg sm:text-xl text-stone-900 dark:text-stone-100 leading-relaxed font-semibold">
                    {thikr.text}
                  </p>
                  {thikr.virtue && (
                    <p className="text-xs text-stone-500 dark:text-stone-400 bg-amber-50 dark:bg-stone-800/60 p-2.5 rounded-xl border border-amber-100 dark:border-stone-700/50">
                      ✨ {thikr.virtue}
                    </p>
                  )}
                </div>

                {/* Counter Control */}
                <div className="flex items-center justify-between pt-3 border-t border-stone-200/40 dark:border-stone-800">
                  <span className="text-xs text-stone-400 font-medium">{thikr.reference}</span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleThikrClick(thikr)}
                      disabled={isCompleted}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs shadow-xs transition-all ${
                        isCompleted
                          ? 'bg-emerald-600 text-white cursor-default'
                          : 'bg-amber-500 hover:bg-amber-400 text-stone-950 cursor-pointer active:scale-95'
                      }`}
                    >
                      {isCompleted ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>اكتمل الذكر ({thikr.count}/{thikr.count})</span>
                        </>
                      ) : (
                        <>
                          <CircleDot className="w-4 h-4" />
                          <span>تكرار ({count}/{thikr.count})</span>
                        </>
                      )}
                    </button>

                    {count > 0 && (
                      <button
                        onClick={() => resetThikrCount(thikr.id)}
                        className="p-2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 transition-colors"
                        title="إعادة المحاولة"
                      >
                        <RefreshCw className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
