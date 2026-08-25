import React from 'react';
import { RADIO_STATIONS, RadioStation } from '../data/islamicRadio';
import { Radio, Play, Pause, Volume2, Sparkles } from 'lucide-react';

interface RadioViewProps {
  onPlayAudio: (url: string, title: string) => void;
  isPlaying: boolean;
  currentPlayingUrl?: string;
}

export const IslamicRadioView: React.FC<RadioViewProps> = ({
  onPlayAudio,
  isPlaying,
  currentPlayingUrl,
}) => {
  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-stone-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider mb-1">
              <Radio className="w-4 h-4" />
              <span>الإذاعات والتلاوات القرآنية الخالدة</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold">بث مباشر لإذاعات كبار القراء</h2>
            <p className="text-xs sm:text-sm text-stone-200 mt-1">
              استمع على مدار الساعة لتلاوات خاشعة بصوت أشهر المقرئين وإذاعات القرآن الكريم
            </p>
          </div>
        </div>
      </div>

      {/* Stations Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {RADIO_STATIONS.map((station) => {
          const isThisPlaying = currentPlayingUrl === station.url && isPlaying;

          return (
            <div
              key={station.id}
              className={`p-6 rounded-3xl border transition-all duration-200 flex flex-col justify-between space-y-4 ${
                isThisPlaying
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 shadow-md ring-2 ring-emerald-500/30'
                  : 'bg-white dark:bg-stone-900 border-amber-200/50 dark:border-stone-800 shadow-xs hover:shadow-md'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-stone-800 text-emerald-700 dark:text-emerald-400 font-bold text-xl flex items-center justify-center shrink-0 border border-amber-200 dark:border-stone-700">
                  📻
                </div>
                <div>
                  <h3 className="font-bold text-base text-stone-900 dark:text-stone-100">{station.name}</h3>
                  <p className="text-xs text-amber-600 dark:text-amber-400 font-semibold">{station.reciter}</p>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 leading-relaxed">
                    {station.description}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-stone-200/40 dark:border-stone-800 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  بث حي أونلاين
                </span>

                <button
                  onClick={() => onPlayAudio(station.url, station.name)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs ${
                    isThisPlaying
                      ? 'bg-amber-400 text-stone-950 hover:bg-amber-300'
                      : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                  }`}
                >
                  {isThisPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{isThisPlaying ? 'إيقاف البث' : 'تشغيل البث'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
