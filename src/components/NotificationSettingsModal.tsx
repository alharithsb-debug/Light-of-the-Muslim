import React, { useState } from 'react';
import { X, Bell, Volume2, Clock, Check, Sparkles, ShieldCheck } from 'lucide-react';
import { NotificationSettings, requestNotificationPermission, sendBrowserNotification, playIslamicChimeSound } from '../services/notificationService';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: NotificationSettings;
  onSave: (newSettings: NotificationSettings) => void;
}

export const NotificationSettingsModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  settings,
  onSave,
}) => {
  const [localSettings, setLocalSettings] = useState<NotificationSettings>(settings);
  const [permissionGranted, setPermissionGranted] = useState<boolean>(
    'Notification' in window && Notification.permission === 'granted'
  );
  const [testSuccess, setTestSuccess] = useState(false);

  if (!isOpen) return null;

  const handleToggle = (key: keyof NotificationSettings) => {
    setLocalSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleRequestPermission = async () => {
    const granted = await requestNotificationPermission();
    setPermissionGranted(granted);
  };

  const handleSave = () => {
    onSave(localSettings);
    onClose();
  };

  const handleTestNotification = () => {
    playIslamicChimeSound();
    sendBrowserNotification('تطبيق نور - اختبار التنبيهات', 'التنبيهات في الخلفية تعمل بنجاح! تقبل الله طاعاتكم.');
    setTestSuccess(true);
    setTimeout(() => setTestSuccess(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-100 rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-amber-200/50 dark:border-stone-800 animate-fadeIn">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-200 dark:border-stone-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-stone-900 dark:text-stone-100">إعدادات التنبيهات والتذكير اليومي</h3>
              <p className="text-xs text-stone-500 dark:text-stone-400">إدارة التنبيهات في الخلفية والأصوات</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Browser Permission Banner */}
        <div className="mt-4 p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 text-xs text-amber-900 dark:text-amber-200 font-medium">
            <ShieldCheck className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
            <span>
              {permissionGranted
                ? 'إذن التنبيهات مفعّل في المتصفح'
                : 'يتطلب إرسال التنبيهات تفعيل إذن المتصفح'}
            </span>
          </div>
          {!permissionGranted && (
            <button
              onClick={handleRequestPermission}
              className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-stone-950 rounded-xl text-xs font-bold transition-colors shadow-xs"
            >
              سماح بالتنبيهات
            </button>
          )}
        </div>

        {/* Options List */}
        <div className="mt-5 space-y-4">
          {/* Daily Verse Toggle & Scheduled Time */}
          <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200/60 dark:border-stone-700/60 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-sm text-stone-900 dark:text-stone-100">تنبيه آية اليوم القرآنية</p>
                <p className="text-xs text-stone-500 dark:text-stone-400">إرسال إشعار يومي بآية خاشعة مع تفسيرها وتلاوتها</p>
              </div>
              <input
                type="checkbox"
                checked={localSettings.dailyVerseEnabled}
                onChange={() => handleToggle('dailyVerseEnabled')}
                className="w-5 h-5 accent-emerald-600 rounded cursor-pointer"
              />
            </div>

            {localSettings.dailyVerseEnabled && (
              <div className="flex items-center justify-between pt-2 border-t border-stone-200/40 dark:border-stone-700/40">
                <span className="text-xs font-semibold text-stone-700 dark:text-stone-300">وقت التذكير اليومي:</span>
                <input
                  type="time"
                  value={localSettings.scheduledTime}
                  onChange={(e) => setLocalSettings((prev) => ({ ...prev, scheduledTime: e.target.value }))}
                  className="bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-xl px-3 py-1 text-xs font-bold text-stone-800 dark:text-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            )}
          </div>

          {/* Prayer Adhan Alerts */}
          <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200/60 dark:border-stone-700/60 flex items-center justify-between">
            <div>
              <p className="font-bold text-sm text-stone-900 dark:text-stone-100">تنبيهات أوقات الصلاة الأذان</p>
              <p className="text-xs text-stone-500 dark:text-stone-400">تنبيه صوتي عند حلول وقت الصلاة</p>
            </div>
            <input
              type="checkbox"
              checked={localSettings.prayerAdhanEnabled}
              onChange={() => handleToggle('prayerAdhanEnabled')}
              className="w-5 h-5 accent-emerald-600 rounded cursor-pointer"
            />
          </div>

          {/* Athkar Reminders */}
          <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200/60 dark:border-stone-700/60 flex items-center justify-between">
            <div>
              <p className="font-bold text-sm text-stone-900 dark:text-stone-100">التذكير بأذكار الصباح والمساء</p>
              <p className="text-xs text-stone-500 dark:text-stone-400">إشعار عند الشروق والغروب لقراءة الأذكار</p>
            </div>
            <input
              type="checkbox"
              checked={localSettings.athkarRemindersEnabled}
              onChange={() => handleToggle('athkarRemindersEnabled')}
              className="w-5 h-5 accent-emerald-600 rounded cursor-pointer"
            />
          </div>

          {/* Sound Effects */}
          <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200/60 dark:border-stone-700/60 flex items-center justify-between">
            <div>
              <p className="font-bold text-sm text-stone-900 dark:text-stone-100">تفعيل الصوت والنغمات الإسلامية</p>
              <p className="text-xs text-stone-500 dark:text-stone-400">تشغيل نغمة هادئة أو تكبيرات الأذان عند الإشعار</p>
            </div>
            <input
              type="checkbox"
              checked={localSettings.soundEnabled}
              onChange={() => handleToggle('soundEnabled')}
              className="w-5 h-5 accent-emerald-600 rounded cursor-pointer"
            />
          </div>
        </div>

        {/* Action Controls */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-stone-200 dark:border-stone-800">
          <button
            onClick={handleTestNotification}
            className="flex items-center gap-2 px-4 py-2 bg-stone-200 dark:bg-stone-800 hover:bg-stone-300 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 rounded-xl text-xs font-bold transition-colors"
          >
            <Bell className="w-4 h-4 text-emerald-600" />
            <span>اختبار التنبيه الآن</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-stone-500 hover:text-stone-700 dark:text-stone-400 dark:hover:text-stone-200 text-xs font-semibold"
            >
              إلغاء
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-md transition-colors"
            >
              <Check className="w-4 h-4" />
              <span>حفظ الإعدادات</span>
            </button>
          </div>
        </div>

        {testSuccess && (
          <div className="mt-3 text-center text-xs text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/60 py-2 rounded-xl">
            ✓ تم إرسال الإشعار التجريبي مع الصوت!
          </div>
        )}
      </div>
    </div>
  );
};
