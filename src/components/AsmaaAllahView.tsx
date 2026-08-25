import React, { useState } from 'react';
import { ASMAA_ALLAH, NameOfAllah } from '../data/asmaaAllah';
import { Search, Sparkles, X, Info } from 'lucide-react';

export const AsmaaAllahView: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedName, setSelectedName] = useState<NameOfAllah | null>(null);

  const filteredNames = ASMAA_ALLAH.filter(
    (n) => n.name.includes(search) || n.transliteration.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-teal-900 via-emerald-900 to-stone-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" />
              <span>أسماء الله الحسنى</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold">ولله الأسماء الحسنى فادعوه بها</h2>
            <p className="text-xs sm:text-sm text-stone-200 mt-1">
              تعرّف على المعاني العميقة والفيوضات الإيمانية لأسماء الله الحسنى التسعة والتسعين
            </p>
          </div>

          <div className="relative w-full md:w-72">
            <Search className="absolute right-3.5 top-3 w-4 h-4 text-stone-400" />
            <input
              type="text"
              placeholder="ابحث في الأسماء والمعاني..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pr-10 pl-4 py-2 bg-white/10 text-white placeholder-stone-300 border border-white/20 rounded-xl text-xs focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Grid View of 99 Names */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {filteredNames.map((item) => (
          <div
            key={item.number}
            onClick={() => setSelectedName(item)}
            className="group bg-white dark:bg-stone-900 p-4 rounded-2xl border border-amber-200/50 dark:border-stone-800 hover:border-emerald-500 text-center cursor-pointer shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
          >
            <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 font-mono">
              #{item.number}
            </span>
            <h3 className="font-quran text-2xl font-bold text-stone-900 dark:text-stone-100 group-hover:text-emerald-600 my-2">
              {item.name}
            </h3>
            <p className="text-[11px] text-stone-500 dark:text-stone-400 font-light truncate">
              {item.transliteration}
            </p>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {selectedName && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-100 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-amber-200/50 dark:border-stone-800 animate-fadeIn text-center space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-stone-200 dark:border-stone-800">
              <span className="text-xs font-mono font-bold text-emerald-600">اسم الله #{selectedName.number}</span>
              <button
                onClick={() => setSelectedName(null)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-2">
              <h2 className="font-quran text-5xl font-bold text-emerald-700 dark:text-emerald-400 mb-1">
                {selectedName.name}
              </h2>
              <p className="text-sm font-semibold text-stone-500 dark:text-stone-400">{selectedName.transliteration}</p>
            </div>

            <div className="bg-amber-50 dark:bg-stone-800/60 p-4 rounded-2xl border border-amber-200/50 dark:border-stone-700 text-xs sm:text-sm text-stone-700 dark:text-stone-200 leading-relaxed text-right">
              <p className="font-bold text-emerald-800 dark:text-emerald-300 mb-1 flex items-center gap-1">
                <Info className="w-4 h-4" /> المعنى والمغزى الإيماني:
              </p>
              <p>{selectedName.meaningAr}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
