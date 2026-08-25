import React, { useState, useEffect } from 'react';
import { Clock, Navigation, MapPin, Volume2, Check, RefreshCw } from 'lucide-react';
import { MAJOR_CITIES, CityLocation, PrayerTimesData, getPrayerTimes, getNextPrayer, calculateQiblaDirection } from '../services/prayerTimesService';
import { playAdhanTone } from '../services/notificationService';

export const PrayerTimes: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<CityLocation>(MAJOR_CITIES[0]); // Default Makkah
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [playingAdhan, setPlayingAdhan] = useState(false);
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    const fetchTimes = async () => {
      setLoading(true);
      const times = await getPrayerTimes(selectedCity);
      setPrayerTimes(times);
      setLoading(false);
    };
    fetchTimes();
  }, [selectedCity]);

  const handleDetectLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setUserCoords({ lat, lng });

          const customCity: CityLocation = {
            nameAr: "موقعي الحالي 📍",
            nameEn: "My Location",
            lat,
            lng,
            timeZone: "auto"
          };
          setSelectedCity(customCity);
        },
        (err) => {
          alert("تعذر الوصول للموقع الجغرافي، يمكنك اختيار مدينتك من القائمة.");
        }
      );
    }
  };

  const handlePlayAdhan = () => {
    setPlayingAdhan(true);
    playAdhanTone();
    setTimeout(() => setPlayingAdhan(false), 3000);
  };

  const qiblaAngle = calculateQiblaDirection(selectedCity.lat, selectedCity.lng);
  const nextPrayerInfo = prayerTimes ? getNextPrayer(prayerTimes) : null;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-teal-900 via-emerald-900 to-stone-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider mb-1">
              <Clock className="w-4 h-4" />
              <span>مواقيت الصلاة واتجاه القبلة</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold">حافظ على صلاتك في أوقاتها</h2>
            <p className="text-xs sm:text-sm text-stone-200 mt-1">
              حساب دقيق لمواقيت الصلاة الخمس مع بوصلة القبلة التفاعلية وتنبيهات الأذان
            </p>
          </div>

          {/* City Selector */}
          <div className="flex flex-wrap items-center gap-2 bg-white/10 p-2 rounded-2xl border border-white/10">
            <MapPin className="w-4 h-4 text-amber-300" />
            <select
              value={selectedCity.nameAr}
              onChange={(e) => {
                const found = MAJOR_CITIES.find((c) => c.nameAr === e.target.value);
                if (found) setSelectedCity(found);
              }}
              className="bg-transparent text-white text-xs font-bold focus:outline-none cursor-pointer"
            >
              {MAJOR_CITIES.map((city) => (
                <option key={city.nameAr} value={city.nameAr} className="bg-stone-900 text-white">
                  {city.nameAr} ({city.nameEn})
                </option>
              ))}
            </select>

            <button
              onClick={handleDetectLocation}
              className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 rounded-xl text-[11px] font-bold text-white transition-colors"
              title="تحديد موثوق لموقعك عبر الجي بي إس"
            >
              تحديد موقعي
            </button>
          </div>
        </div>
      </div>

      {/* Next Prayer Countdown Card */}
      {nextPrayerInfo && (
        <div className="bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 text-stone-950 rounded-3xl p-6 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4 border border-amber-400/50">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-stone-950/20 flex items-center justify-center font-bold text-xl">
              🕌
            </div>
            <div>
              <p className="text-xs font-bold text-stone-900/80 uppercase">الصلاة القادمة</p>
              <h3 className="text-2xl font-black">{nextPrayerInfo.nameAr} — {nextPrayerInfo.time}</h3>
              <p className="text-xs font-semibold text-stone-950">{nextPrayerInfo.remainingText}</p>
            </div>
          </div>

          <button
            onClick={handlePlayAdhan}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold shadow-md transition-all ${
              playingAdhan
                ? 'bg-stone-950 text-amber-400 animate-pulse'
                : 'bg-stone-950 text-white hover:bg-stone-900'
            }`}
          >
            <Volume2 className="w-4 h-4 text-amber-400" />
            <span>{playingAdhan} {playingAdhan ? 'جاري تشغيل تكبيرات الأذان...' : 'سمّعني صوت الأذان'}</span>
          </button>
        </div>
      )}

      {/* Grid of All 6 Prayer Times */}
      {loading ? (
        <div className="py-12 text-center text-xs text-stone-500 font-semibold">
          جاري حساب مواقيت الصلاة لمدينة {selectedCity.nameAr}...
        </div>
      ) : prayerTimes ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { name: "الفجر", time: prayerTimes.fajr, icon: "🌅" },
            { name: "الشروق", time: prayerTimes.sunrise, icon: "☀️" },
            { name: "الظهر", time: prayerTimes.dhuhr, icon: "🌤️" },
            { name: "العصر", time: prayerTimes.asr, icon: "🌤️" },
            { name: "المغرب", time: prayerTimes.maghrib, icon: "🌇" },
            { name: "العشاء", time: prayerTimes.isha, icon: "🌙" }
          ].map((item) => (
            <div
              key={item.name}
              className={`p-4 rounded-2xl border text-center transition-all ${
                nextPrayerInfo?.nameAr.includes(item.name)
                  ? 'bg-emerald-600 text-white border-emerald-500 shadow-md scale-105'
                  : 'bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-100 border-amber-200/50 dark:border-stone-800'
              }`}
            >
              <span className="text-2xl mb-1 block">{item.icon}</span>
              <p className="text-xs font-bold opacity-80">{item.name}</p>
              <p className="text-xl font-black mt-1 font-mono">{item.time}</p>
            </div>
          ))}
        </div>
      ) : null}

      {/* Qibla Compass Card */}
      <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-8 border border-amber-200/50 dark:border-stone-800 shadow-xs flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-3 max-w-md text-right">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
            <Navigation className="w-3.5 h-3.5" />
            <span>اتجاه القبلة نحو الكعبة المشرفة</span>
          </div>
          <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100">
            زاوية القبلة: {Math.round(qiblaAngle)}° درجة من الشمال
          </h3>
          <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
            تم الحساب بالنسبة لـ {selectedCity.nameAr}. قم بتوجيه أعلى جهازك نحو مؤشر الكعبة الخضراء لضبط اتجاه القبلة بدقة.
          </p>
        </div>

        {/* Visual Compass Graphic */}
        <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full border-4 border-amber-300 dark:border-stone-700 bg-amber-50/50 dark:bg-stone-800/80 flex items-center justify-center shadow-inner">
          {/* North Label */}
          <span className="absolute top-2 text-xs font-bold text-stone-400">N</span>
          <span className="absolute bottom-2 text-xs font-bold text-stone-400">S</span>
          <span className="absolute right-2 text-xs font-bold text-stone-400">E</span>
          <span className="absolute left-2 text-xs font-bold text-stone-400">W</span>

          {/* Rotating Qibla Needle */}
          <div
            className="absolute inset-0 flex items-center justify-center transition-transform duration-700"
            style={{ transform: `rotate(${qiblaAngle}deg)` }}
          >
            <div className="w-1 bg-gradient-to-t from-transparent via-emerald-500 to-emerald-600 h-24 rounded-full shadow-md flex items-start justify-center">
              <div className="w-8 h-8 rounded-full bg-stone-950 text-amber-300 text-[10px] font-bold flex items-center justify-center shadow-md border-2 border-emerald-400 -mt-4">
                🕋
              </div>
            </div>
          </div>

          <div className="w-4 h-4 rounded-full bg-amber-500 ring-4 ring-white dark:ring-stone-900" />
        </div>
      </div>
    </div>
  );
};
