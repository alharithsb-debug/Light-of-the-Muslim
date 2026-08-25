import React from 'react';
import { Moon, Sun, Bell, BookOpen, Clock, HeartHandshake, Radio, Sparkles, Home, Settings } from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  openNotificationSettings: () => void;
  notificationEnabled: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  darkMode,
  setDarkMode,
  openNotificationSettings,
  notificationEnabled,
}) => {
  const navItems = [
    { id: 'home', label: 'الرئيسية', icon: Home },
    { id: 'quran', label: 'القرآن الكريم', icon: BookOpen },
    { id: 'prayer', label: 'الصلاة والقبلة', icon: Clock },
    { id: 'athkar', label: 'الأذكار والمسبحة', icon: HeartHandshake },
    { id: 'asmaa', label: 'أسماء الله الحسنى', icon: Sparkles },
    { id: 'radio', label: 'الإذاعة والتلاوات', icon: Radio },
    { id: 'ai', label: 'تدبر بالذكاء الاصطناعي', icon: Sparkles },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-stone-900/90 backdrop-blur-md border-b border-amber-200/50 dark:border-stone-800 transition-colors duration-300 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            onClick={() => setCurrentTab('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-800 flex items-center justify-center text-amber-300 shadow-md group-hover:scale-105 transition-transform duration-200">
              <span className="font-quran text-2xl font-bold">ن</span>
            </div>
            <div>
              <h1 className="font-bold text-xl bg-gradient-to-r from-emerald-700 to-teal-900 dark:from-emerald-400 dark:to-teal-200 bg-clip-text text-transparent">
                تطبيق نُور
              </h1>
              <p className="text-[11px] text-stone-500 dark:text-stone-400 font-medium">التطبيق الإسلامي الشامل</p>
            </div>
          </div>

          {/* Nav Items - Desktop */}
          <nav className="hidden lg:flex items-center gap-1 bg-amber-50/60 dark:bg-stone-800/60 p-1.5 rounded-2xl border border-amber-200/40 dark:border-stone-700/50">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentTab(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'text-stone-600 dark:text-stone-300 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-amber-100/50 dark:hover:bg-stone-700/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-300' : ''}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Quick Actions (Theme & Notifications) */}
          <div className="flex items-center gap-2">
            <button
              onClick={openNotificationSettings}
              className="relative p-2.5 rounded-xl text-stone-700 dark:text-stone-200 hover:bg-amber-100 dark:hover:bg-stone-800 transition-colors border border-amber-200/40 dark:border-stone-700/50"
              title="إعدادات التنبيهات والتذكير اليومي"
            >
              <Bell className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              {notificationEnabled && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-amber-500 rounded-full ring-2 ring-white dark:ring-stone-900 animate-pulse" />
              )}
            </button>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2.5 rounded-xl text-stone-700 dark:text-stone-200 hover:bg-amber-100 dark:hover:bg-stone-800 transition-colors border border-amber-200/40 dark:border-stone-700/50"
              title={darkMode ? "الوضع النهاري" : "الوضع الليلي"}
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-amber-400" />
              ) : (
                <Moon className="w-5 h-5 text-stone-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Scrollbar */}
        <div className="lg:hidden flex items-center gap-1.5 overflow-x-auto py-2.5 border-t border-amber-100 dark:border-stone-800 no-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-amber-50/80 dark:bg-stone-800/80 text-stone-700 dark:text-stone-300 border border-amber-200/40 dark:border-stone-700/40'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
