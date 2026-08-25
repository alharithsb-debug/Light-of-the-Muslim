export interface NotificationSettings {
  dailyVerseEnabled: boolean;
  scheduledTime: string; // "08:00", "13:00", "20:00"
  prayerAdhanEnabled: boolean;
  athkarRemindersEnabled: boolean;
  soundEnabled: boolean;
}

const SETTINGS_KEY = 'noor_notification_settings';

export const getDefaultSettings = (): NotificationSettings => {
  const saved = localStorage.getItem(SETTINGS_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      // fallback
    }
  }
  return {
    dailyVerseEnabled: true,
    scheduledTime: "08:00",
    prayerAdhanEnabled: true,
    athkarRemindersEnabled: true,
    soundEnabled: true
  };
};

export const saveNotificationSettings = (settings: NotificationSettings) => {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
};

// Web Audio API Gentle Islamic Chime Sound Synthesizer
export const playIslamicChimeSound = () => {
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    
    // Play a gentle two-tone oriental harmonic chime (E4 -> A4 -> C#5)
    const notes = [329.63, 440.00, 554.37];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.25);
      
      gain.gain.setValueAtTime(0.01, ctx.currentTime + idx * 0.25);
      gain.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + idx * 0.25 + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.25 + 1.2);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(ctx.currentTime + idx * 0.25);
      osc.stop(ctx.currentTime + idx * 0.25 + 1.3);
    });
  } catch (err) {
    console.warn("Audio chime error:", err);
  }
};

// Play short adhan takbeer sound tone
export const playAdhanTone = () => {
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    
    const notes = [293.66, 369.99, 440.00, 587.33]; // D4, F#4, A4, D5
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.4);
      
      gain.gain.setValueAtTime(0.01, ctx.currentTime + idx * 0.4);
      gain.gain.exponentialRampToValueAtTime(0.25, ctx.currentTime + idx * 0.4 + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.4 + 1.8);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(ctx.currentTime + idx * 0.4);
      osc.stop(ctx.currentTime + idx * 0.4 + 2.0);
    });
  } catch (err) {
    console.warn("Adhan tone error:", err);
  }
};

export const requestNotificationPermission = async (): Promise<boolean> => {
  if (!('Notification' in window)) {
    return false;
  }
  if (Notification.permission === 'granted') {
    return true;
  }
  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }
  return false;
};

export const sendBrowserNotification = (title: string, body: string, icon = '📖') => {
  // Always play sound if enabled
  const settings = getDefaultSettings();
  if (settings.soundEnabled) {
    playIslamicChimeSound();
  }

  // Check Web Notification API
  if ('Notification' in window && Notification.permission === 'granted') {
    try {
      new Notification(title, {
        body,
        icon: 'https://cdn-icons-png.flaticon.com/512/2903/2903561.png',
        badge: 'https://cdn-icons-png.flaticon.com/512/2903/2903561.png',
        dir: 'rtl',
        lang: 'ar'
      });
    } catch {
      // Fallback
    }
  }
};
