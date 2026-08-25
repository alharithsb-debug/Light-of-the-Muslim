export interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: 'Meccan' | 'Medinan';
  page: number;
}

export interface Ayah {
  number: number;
  text: string;
  numberInSurah: number;
  juz: number;
  page: number;
  surahNumber: number;
  surahName: string;
  translationAr?: string;
  tafsirMuyassar?: string;
}

export interface DailyVerse {
  id: string;
  surahNumber: number;
  surahName: string;
  ayahNumber: number;
  text: string;
  translation: string;
  tafsir: string;
  theme: string;
  audioUrl: string;
}

// Full 114 Surahs list metadata
export const SURAHS: Surah[] = [
  { number: 1, name: "الفاتحة", englishName: "Al-Fatiha", englishNameTranslation: "The Opening", numberOfAyahs: 7, revelationType: "Meccan", page: 1 },
  { number: 2, name: "البقرة", englishName: "Al-Baqarah", englishNameTranslation: "The Cow", numberOfAyahs: 286, revelationType: "Medinan", page: 2 },
  { number: 3, name: "آل عمران", englishName: "Aal-Imran", englishNameTranslation: "The Family of Imran", numberOfAyahs: 200, revelationType: "Medinan", page: 50 },
  { number: 4, name: "النساء", englishName: "An-Nisa", englishNameTranslation: "The Women", numberOfAyahs: 176, revelationType: "Medinan", page: 77 },
  { number: 5, name: "المائدة", englishName: "Al-Ma'idah", englishNameTranslation: "The Table Spread", numberOfAyahs: 120, revelationType: "Medinan", page: 106 },
  { number: 6, name: "الأنعام", englishName: "Al-An'am", englishNameTranslation: "The Cattle", numberOfAyahs: 165, revelationType: "Meccan", page: 128 },
  { number: 7, name: "الأعراف", englishName: "Al-A'raf", englishNameTranslation: "The Heights", numberOfAyahs: 206, revelationType: "Meccan", page: 151 },
  { number: 8, name: "الأنفال", englishName: "Al-Anfal", englishNameTranslation: "The Spoils of War", numberOfAyahs: 75, revelationType: "Medinan", page: 177 },
  { number: 9, name: "التوبة", englishName: "At-Tawbah", englishNameTranslation: "The Repentance", numberOfAyahs: 129, revelationType: "Medinan", page: 187 },
  { number: 10, name: "يونس", englishName: "Yunus", englishNameTranslation: "Jonah", numberOfAyahs: 109, revelationType: "Meccan", page: 208 },
  { number: 11, name: "هود", englishName: "Hud", englishNameTranslation: "Hud", numberOfAyahs: 123, revelationType: "Meccan", page: 221 },
  { number: 12, name: "يوسف", englishName: "Yusuf", englishNameTranslation: "Joseph", numberOfAyahs: 111, revelationType: "Meccan", page: 235 },
  { number: 13, name: "الرعد", englishName: "Ar-Ra'd", englishNameTranslation: "The Thunder", numberOfAyahs: 43, revelationType: "Medinan", page: 249 },
  { number: 14, name: "إبراهيم", englishName: "Ibrahim", englishNameTranslation: "Abraham", numberOfAyahs: 52, revelationType: "Meccan", page: 255 },
  { number: 15, name: "الحجر", englishName: "Al-Hijr", englishNameTranslation: "The Rocky Tract", numberOfAyahs: 99, revelationType: "Meccan", page: 262 },
  { number: 16, name: "النحل", englishName: "An-Nahl", englishNameTranslation: "The Bee", numberOfAyahs: 128, revelationType: "Meccan", page: 267 },
  { number: 17, name: "الإسراء", englishName: "Al-Isra", englishNameTranslation: "The Night Journey", numberOfAyahs: 111, revelationType: "Meccan", page: 282 },
  { number: 18, name: "الكهف", englishName: "Al-Kahf", englishNameTranslation: "The Cave", numberOfAyahs: 110, revelationType: "Meccan", page: 293 },
  { number: 19, name: "مريم", englishName: "Maryam", englishNameTranslation: "Mary", numberOfAyahs: 98, revelationType: "Meccan", page: 305 },
  { number: 20, name: "طه", englishName: "Taha", englishNameTranslation: "Ta-Ha", numberOfAyahs: 135, revelationType: "Meccan", page: 312 },
  { number: 21, name: "الأنبياء", englishName: "Al-Anbiya", englishNameTranslation: "The Prophets", numberOfAyahs: 112, revelationType: "Meccan", page: 322 },
  { number: 22, name: "الحج", englishName: "Al-Hajj", englishNameTranslation: "The Pilgrimage", numberOfAyahs: 78, revelationType: "Medinan", page: 332 },
  { number: 23, name: "المؤمنون", englishName: "Al-Mu'minun", englishNameTranslation: "The Believers", numberOfAyahs: 118, revelationType: "Meccan", page: 342 },
  { number: 24, name: "النور", englishName: "An-Nur", englishNameTranslation: "The Light", numberOfAyahs: 64, revelationType: "Medinan", page: 350 },
  { number: 25, name: "الفرقان", englishName: "Al-Furqan", englishNameTranslation: "The Criterion", numberOfAyahs: 77, revelationType: "Meccan", page: 359 },
  { number: 26, name: "الشعراء", englishName: "Ash-Shu'ara", englishNameTranslation: "The Poets", numberOfAyahs: 227, revelationType: "Meccan", page: 367 },
  { number: 27, name: "النمل", englishName: "An-Naml", englishNameTranslation: "The Ant", numberOfAyahs: 93, revelationType: "Meccan", page: 377 },
  { number: 28, name: "القصص", englishName: "Al-Qasas", englishNameTranslation: "The Stories", numberOfAyahs: 88, revelationType: "Meccan", page: 385 },
  { number: 29, name: "العنكبوت", englishName: "Al-Ankabut", englishNameTranslation: "The Spider", numberOfAyahs: 69, revelationType: "Meccan", page: 396 },
  { number: 30, name: "الروم", englishName: "Ar-Rum", englishNameTranslation: "The Romans", numberOfAyahs: 60, revelationType: "Meccan", page: 404 },
  { number: 31, name: "لقمان", englishName: "Luqman", englishNameTranslation: "Luqman", numberOfAyahs: 34, revelationType: "Meccan", page: 411 },
  { number: 32, name: "السجدة", englishName: "As-Sajdah", englishNameTranslation: "The Prostration", numberOfAyahs: 30, revelationType: "Meccan", page: 415 },
  { number: 33, name: "الأحزاب", englishName: "Al-Ahzab", englishNameTranslation: "The Combined Forces", numberOfAyahs: 73, revelationType: "Medinan", page: 418 },
  { number: 34, name: "سبأ", englishName: "Saba", englishNameTranslation: "Sheba", numberOfAyahs: 54, revelationType: "Meccan", page: 428 },
  { number: 35, name: "فاطر", englishName: "Fatir", englishNameTranslation: "Originator", numberOfAyahs: 45, revelationType: "Meccan", page: 434 },
  { number: 36, name: "يس", englishName: "Ya-Sin", englishNameTranslation: "Ya Sin", numberOfAyahs: 83, revelationType: "Meccan", page: 440 },
  { number: 37, name: "الصافات", englishName: "As-Saffat", englishNameTranslation: "Those who set the Ranks", numberOfAyahs: 182, revelationType: "Meccan", page: 446 },
  { number: 38, name: "ص", englishName: "Sad", englishNameTranslation: "The Letter Sad", numberOfAyahs: 88, revelationType: "Meccan", page: 453 },
  { number: 39, name: "الزمر", englishName: "Az-Zumar", englishNameTranslation: "The Troops", numberOfAyahs: 75, revelationType: "Meccan", page: 458 },
  { number: 40, name: "غافر", englishName: "Ghafir", englishNameTranslation: "The Forgiver", numberOfAyahs: 85, revelationType: "Meccan", page: 467 },
  { number: 41, name: "فصلت", englishName: "Fussilat", englishNameTranslation: "Explained in Detail", numberOfAyahs: 54, revelationType: "Meccan", page: 477 },
  { number: 42, name: "الشورى", englishName: "Ash-Shuraa", englishNameTranslation: "The Consultation", numberOfAyahs: 53, revelationType: "Meccan", page: 483 },
  { number: 43, name: "الزخرف", englishName: "Az-Zukhruf", englishNameTranslation: "The Ornaments of Gold", numberOfAyahs: 89, revelationType: "Meccan", page: 489 },
  { number: 44, name: "الدخان", englishName: "Ad-Dukhan", englishNameTranslation: "The Smoke", numberOfAyahs: 59, revelationType: "Meccan", page: 496 },
  { number: 45, name: "الجاثية", englishName: "Al-Jathiyah", englishNameTranslation: "The Crouching", numberOfAyahs: 37, revelationType: "Meccan", page: 499 },
  { number: 46, name: "الأحقاف", englishName: "Al-Ahqaf", englishNameTranslation: "The Wind-Curved Sandhills", numberOfAyahs: 35, revelationType: "Meccan", page: 502 },
  { number: 47, name: "محمد", englishName: "Muhammad", englishNameTranslation: "Muhammad", numberOfAyahs: 38, revelationType: "Medinan", page: 507 },
  { number: 48, name: "الفتح", englishName: "Al-Fath", englishNameTranslation: "The Victory", numberOfAyahs: 29, revelationType: "Medinan", page: 511 },
  { number: 49, name: "الحجرات", englishName: "Al-Hujurat", englishNameTranslation: "The Dwellings", numberOfAyahs: 18, revelationType: "Medinan", page: 515 },
  { number: 50, name: "ق", englishName: "Qaf", englishNameTranslation: "The Letter Qaf", numberOfAyahs: 45, revelationType: "Meccan", page: 518 },
  { number: 51, name: "الذاريات", englishName: "Adh-Dhariyat", englishNameTranslation: "The Winnowing Winds", numberOfAyahs: 60, revelationType: "Meccan", page: 520 },
  { number: 52, name: "الطور", englishName: "At-Tur", englishNameTranslation: "The Mount", numberOfAyahs: 49, revelationType: "Meccan", page: 523 },
  { number: 53, name: "النجم", englishName: "An-Najm", englishNameTranslation: "The Star", numberOfAyahs: 62, revelationType: "Meccan", page: 526 },
  { number: 54, name: "القمر", englishName: "Al-Qamar", englishNameTranslation: "The Moon", numberOfAyahs: 55, revelationType: "Meccan", page: 528 },
  { number: 55, name: "الرحمن", englishName: "Ar-Rahman", englishNameTranslation: "The Beneficent", numberOfAyahs: 78, revelationType: "Medinan", page: 531 },
  { number: 56, name: "الواقعة", englishName: "Al-Waqi'ah", englishNameTranslation: "The Inevitable", numberOfAyahs: 96, revelationType: "Meccan", page: 534 },
  { number: 57, name: "الحديد", englishName: "Al-Hadid", englishNameTranslation: "The Iron", numberOfAyahs: 29, revelationType: "Medinan", page: 537 },
  { number: 58, name: "المجادلة", englishName: "Al-Mujadila", englishNameTranslation: "The Pleading Woman", numberOfAyahs: 22, revelationType: "Medinan", page: 542 },
  { number: 59, name: "الحشر", englishName: "Al-Hashr", englishNameTranslation: "The Exile", numberOfAyahs: 24, revelationType: "Medinan", page: 545 },
  { number: 60, name: "الممتحنة", englishName: "Al-Mumtahanah", englishNameTranslation: "She that is to be examined", numberOfAyahs: 13, revelationType: "Medinan", page: 549 },
  { number: 61, name: "الصف", englishName: "As-Saff", englishNameTranslation: "The Ranks", numberOfAyahs: 14, revelationType: "Medinan", page: 551 },
  { number: 62, name: "الجمعة", englishName: "Al-Jumu'ah", englishNameTranslation: "The Congregation", numberOfAyahs: 11, revelationType: "Medinan", page: 553 },
  { number: 63, name: "المنافقون", englishName: "Al-Munafiqun", englishNameTranslation: "The Hypocrites", numberOfAyahs: 11, revelationType: "Medinan", page: 554 },
  { number: 64, name: "التغابن", englishName: "At-Taghabun", englishNameTranslation: "The Mutual Disillusion", numberOfAyahs: 18, revelationType: "Medinan", page: 556 },
  { number: 65, name: "الطلاق", englishName: "At-Talaq", englishNameTranslation: "The Divorce", numberOfAyahs: 12, revelationType: "Medinan", page: 558 },
  { number: 66, name: "التحريم", englishName: "At-Tahrim", englishNameTranslation: "The Prohibition", numberOfAyahs: 12, revelationType: "Medinan", page: 560 },
  { number: 67, name: "الملك", englishName: "Al-Mulk", englishNameTranslation: "The Sovereignty", numberOfAyahs: 30, revelationType: "Meccan", page: 562 },
  { number: 68, name: "القلم", englishName: "Al-Qalam", englishNameTranslation: "The Pen", numberOfAyahs: 52, revelationType: "Meccan", page: 564 },
  { number: 69, name: "الحاقة", englishName: "Al-Haqqah", englishNameTranslation: "The Inevitable Reality", numberOfAyahs: 52, revelationType: "Meccan", page: 566 },
  { number: 70, name: "المعارج", englishName: "Al-Ma'arij", englishNameTranslation: "The Ascending Stairways", numberOfAyahs: 44, revelationType: "Meccan", page: 568 },
  { number: 71, name: "نوح", englishName: "Nuh", englishNameTranslation: "Noah", numberOfAyahs: 28, revelationType: "Meccan", page: 570 },
  { number: 72, name: "الجن", englishName: "Al-Jinn", englishNameTranslation: "The Jinn", numberOfAyahs: 28, revelationType: "Meccan", page: 572 },
  { number: 73, name: "المزمل", englishName: "Al-Muzzammil", englishNameTranslation: "The Enshrouded One", numberOfAyahs: 20, revelationType: "Meccan", page: 574 },
  { number: 74, name: "المدثر", englishName: "Al-Muddaththir", englishNameTranslation: "The Cloaked One", numberOfAyahs: 56, revelationType: "Meccan", page: 575 },
  { number: 75, name: "القيامة", englishName: "Al-Qiyamah", englishNameTranslation: "The Resurrection", numberOfAyahs: 40, revelationType: "Meccan", page: 577 },
  { number: 76, name: "الإنسان", englishName: "Al-Insan", englishNameTranslation: "Man", numberOfAyahs: 31, revelationType: "Medinan", page: 578 },
  { number: 77, name: "المرسلات", englishName: "Al-Mursalat", englishNameTranslation: "The Emissaries", numberOfAyahs: 50, revelationType: "Meccan", page: 580 },
  { number: 78, name: "النبأ", englishName: "An-Naba", englishNameTranslation: "The Tidings", numberOfAyahs: 40, revelationType: "Meccan", page: 582 },
  { number: 79, name: "النازعات", englishName: "An-Nazi'at", englishNameTranslation: "Those who drag forth", numberOfAyahs: 46, revelationType: "Meccan", page: 583 },
  { number: 80, name: "عبس", englishName: "Abasa", englishNameTranslation: "He Frowned", numberOfAyahs: 42, revelationType: "Meccan", page: 585 },
  { number: 81, name: "التكوير", englishName: "At-Takwir", englishNameTranslation: "The Overthrowing", numberOfAyahs: 29, revelationType: "Meccan", page: 586 },
  { number: 82, name: "الانفطار", englishName: "Al-Infitar", englishNameTranslation: "The Cleaving", numberOfAyahs: 19, revelationType: "Meccan", page: 587 },
  { number: 83, name: "المطففين", englishName: "Al-Mutaffifin", englishNameTranslation: "Defrauding", numberOfAyahs: 36, revelationType: "Meccan", page: 587 },
  { number: 84, name: "الانشقاق", englishName: "Al-Inshiqaq", englishNameTranslation: "The Splitting Open", numberOfAyahs: 25, revelationType: "Meccan", page: 589 },
  { number: 85, name: "البروج", englishName: "Al-Buruj", englishNameTranslation: "The Mansions of the Stars", numberOfAyahs: 22, revelationType: "Meccan", page: 590 },
  { number: 86, name: "الطارق", englishName: "At-Tariq", englishNameTranslation: "The Morning Star", numberOfAyahs: 17, revelationType: "Meccan", page: 591 },
  { number: 87, name: "الأعلى", englishName: "Al-A'la", englishNameTranslation: "The Most High", numberOfAyahs: 19, revelationType: "Meccan", page: 591 },
  { number: 88, name: "الغاشية", englishName: "Al-Ghashiyah", englishNameTranslation: "The Overwhelming Event", numberOfAyahs: 26, revelationType: "Meccan", page: 592 },
  { number: 89, name: "الفجر", englishName: "Al-Fajr", englishNameTranslation: "The Dawn", numberOfAyahs: 30, revelationType: "Meccan", page: 593 },
  { number: 90, name: "البلد", englishName: "Al-Balad", englishNameTranslation: "The City", numberOfAyahs: 20, revelationType: "Meccan", page: 594 },
  { number: 91, name: "الشمس", englishName: "Ash-Shams", englishNameTranslation: "The Sun", numberOfAyahs: 15, revelationType: "Meccan", page: 595 },
  { number: 92, name: "الليل", englishName: "Al-Layl", englishNameTranslation: "The Night", numberOfAyahs: 21, revelationType: "Meccan", page: 595 },
  { number: 93, name: "الضحى", englishName: "Ad-Duhaa", englishNameTranslation: "The Morning Hours", numberOfAyahs: 11, revelationType: "Meccan", page: 596 },
  { number: 94, name: "الشرح", englishName: "Ash-Sharh", englishNameTranslation: "The Relief", numberOfAyahs: 8, revelationType: "Meccan", page: 596 },
  { number: 95, name: "التين", englishName: "At-Tin", englishNameTranslation: "The Fig", numberOfAyahs: 8, revelationType: "Meccan", page: 597 },
  { number: 96, name: "العلق", englishName: "Al-Alaq", englishNameTranslation: "The Clot", numberOfAyahs: 19, revelationType: "Meccan", page: 597 },
  { number: 97, name: "القدر", englishName: "Al-Qadr", englishNameTranslation: "The Power", numberOfAyahs: 5, revelationType: "Meccan", page: 598 },
  { number: 98, name: "البينة", englishName: "Al-Bayyinah", englishNameTranslation: "The Clear Proof", numberOfAyahs: 8, revelationType: "Medinan", page: 598 },
  { number: 99, name: "الزلزلة", englishName: "Az-Zalzalah", englishNameTranslation: "The Earthquake", numberOfAyahs: 8, revelationType: "Medinan", page: 599 },
  { number: 100, name: "العاديات", englishName: "Al-Adiyat", englishNameTranslation: "The Courser", numberOfAyahs: 11, revelationType: "Meccan", page: 599 },
  { number: 101, name: "القارعة", englishName: "Al-Qari'ah", englishNameTranslation: "The Calamity", numberOfAyahs: 11, revelationType: "Meccan", page: 600 },
  { number: 102, name: "التكاثر", englishName: "At-Takathur", englishNameTranslation: "The Rivalry in world increase", numberOfAyahs: 8, revelationType: "Meccan", page: 600 },
  { number: 103, name: "العصر", englishName: "Al-Asr", englishNameTranslation: "The Declining Day", numberOfAyahs: 3, revelationType: "Meccan", page: 601 },
  { number: 104, name: "الهمزة", englishName: "Al-Humazah", englishNameTranslation: "The Traducer", numberOfAyahs: 9, revelationType: "Meccan", page: 601 },
  { number: 105, name: "الفيل", englishName: "Al-Fil", englishNameTranslation: "The Elephant", numberOfAyahs: 5, revelationType: "Meccan", page: 601 },
  { number: 106, name: "قريش", englishName: "Quraysh", englishNameTranslation: "Quraysh", numberOfAyahs: 4, revelationType: "Meccan", page: 602 },
  { number: 107, name: "الماعون", englishName: "Al-Ma'un", englishNameTranslation: "Small Kindnesses", numberOfAyahs: 7, revelationType: "Meccan", page: 602 },
  { number: 108, name: "الكوثر", englishName: "Al-Kawthar", englishNameTranslation: "Abundance", numberOfAyahs: 3, revelationType: "Meccan", page: 602 },
  { number: 109, name: "الكافرون", englishName: "Al-Kafirun", englishNameTranslation: "The Disbelievers", numberOfAyahs: 6, revelationType: "Meccan", page: 603 },
  { number: 110, name: "النصر", englishName: "An-Nasr", englishNameTranslation: "The Divine Support", numberOfAyahs: 3, revelationType: "Medinan", page: 603 },
  { number: 111, name: "المسد", englishName: "Al-Masad", englishNameTranslation: "The Palm Fiber", numberOfAyahs: 5, revelationType: "Meccan", page: 603 },
  { number: 112, name: "الإخلاص", englishName: "Al-Ikhlas", englishNameTranslation: "The Sincerity", numberOfAyahs: 4, revelationType: "Meccan", page: 604 },
  { number: 113, name: "الفلق", englishName: "Al-Falaq", englishNameTranslation: "The Daybreak", numberOfAyahs: 5, revelationType: "Meccan", page: 604 },
  { number: 114, name: "الناس", englishName: "An-Nas", englishNameTranslation: "Mankind", numberOfAyahs: 6, revelationType: "Meccan", page: 604 }
];

// Curated list of daily reminder verses with tafsir and themes
export const DAILY_VERSES: DailyVerse[] = [
  {
    id: "v1",
    surahNumber: 2,
    surahName: "البقرة",
    ayahNumber: 152,
    text: "فَاذْكُرُونِي أَذْكُرْكُمْ وَاشْكُرُوا لِي وَلَا تَكْفُرُونِ",
    translation: "So remember Me; I will remember you. And be grateful to Me and do not deny Me.",
    tafsir: "أمر الله تعالى عباده بذكر العبادة والطاعة، ووعدهم بذكر الثواب والمغفرة، والحث على الشكر على نعمه العظيمة وحظر جحودها.",
    theme: "الذكر والشكر",
    audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/159.mp3"
  },
  {
    id: "v2",
    surahNumber: 2,
    surahName: "البقرة",
    ayahNumber: 186,
    text: "وَإِذَا سَأَلَكَ عِبَادِي عَنِّي فَإِنِّي قَرِيبٌ ۖ أُجِيبُ دَعْوَةَ الدَّاعِ إِذَا دَعَانِ ۖ فَلْيَسْتَجِيبُوا لِي وَلْيُؤْمِنُوا بِي لَعَلَّهُمْ يَرْشُدُونَ",
    translation: "And when My servants ask you concerning Me, indeed I am near. I respond to the invocation of the supplicant when he calls upon Me.",
    tafsir: "بشارة عظيمة بقرب الله تعالى من عباده وسماعه لدعائهم وإجابته لهم دون واسطة، مع التكليف بالطاعة والإيمان لترشيد حياتهم.",
    theme: "الدعاء والرجاء",
    audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/193.mp3"
  },
  {
    id: "v3",
    surahNumber: 2,
    surahName: "البقرة",
    ayahNumber: 286,
    text: "لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا ۚ لَهَا مَا كَسَبَتْ وَعَلَيْهَا مَا اكْتَسَبَتْ",
    translation: "Allah does not charge a soul except with that within its capacity.",
    tafsir: "رحمة الله بعباده وتيسيره للشرع، فلا يكلف أحداً فوق طاقته، وكل إنسان يثاب على خيره ويحاسب على كسبه.",
    theme: "الرحمة والتيسير",
    audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/293.mp3"
  },
  {
    id: "v4",
    surahNumber: 13,
    surahName: "الرعد",
    ayahNumber: 28,
    text: "الَّذِينَ آمَنُوا وَتَطْمَئِنُّ قُلُوبُهُم بِذِكْرِ اللَّهِ ۗ أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ",
    translation: "Those who have believed and whose hearts are assured by the remembrance of Allah. Unquestionably, by the remembrance of Allah hearts are assured.",
    tafsir: "القلوب لا تسكن ولا تطمئن ولا تذهب حيرتها إلا بذكر الله والتعلق به والرضا بقضائه وقدره.",
    theme: "طمأنينة القلب",
    audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/1735.mp3"
  },
  {
    id: "v5",
    surahNumber: 94,
    surahName: "الشرح",
    ayahNumber: 5,
    text: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا ۝ إِنَّ مَعَ الْعُسْرِ يُسْرًا",
    translation: "For indeed, with hardship [will be] ease. Indeed, with hardship [will be] ease.",
    tafsir: "وعد إلهي مؤكد بتفريج الكروب وجلاء الغم، فلن يغلب عسر واحد يسرين، وفي هذا تبشير بالفرج القريب.",
    theme: "الأمل والفرج",
    audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/6095.mp3"
  },
  {
    id: "v6",
    surahNumber: 65,
    surahName: "الطلاق",
    ayahNumber: 3,
    text: "وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ ۚ إِنَّ اللَّهَ بَالِغُ أَمْرِهِ",
    translation: "And whoever relies upon Allah - then He is sufficient for him. Indeed, Allah will accomplish His purpose.",
    tafsir: "من فوض أموره إلى الله واستند إلى قدرته كفاه الله ما أهمه ووفر له أسبابه وبلّغه مراده بأمر الله القاطع.",
    theme: "التوكل على الله",
    audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/5225.mp3"
  },
  {
    id: "v7",
    surahNumber: 39,
    surahName: "الزمر",
    ayahNumber: 53,
    text: "قُلْ يَا عِبَادِيَ الَّذِينَ أَسْرَفُوا عَلَىٰ أَنفُسِهِمْ لَا تَقْنَطُوا مِن رَّحْمَةِ اللَّهِ ۚ إِنَّ اللَّهَ يَغْفِرُ الذُّنُوبَ جَمِيعًا ۚ إِنَّهُ هُوَ الْغَفُورُ الرَّحِيمُ",
    translation: "Say, 'O My servants who have transgressed against themselves [by sinning], do not despair of the mercy of Allah. Indeed, Allah forgives all sins.'",
    tafsir: "أرجى آية في كتاب الله للذين أسرفوا بالذنوب، تدعو إلى التوبة والرجوع إلى الله دون يأس أو قنوط.",
    theme: "التوبة والمغفرة",
    audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/4111.mp3"
  },
  {
    id: "v8",
    surahNumber: 3,
    surahName: "آل عمران",
    ayahNumber: 139,
    text: "وَلَا تَهِنُوا وَلَا تَحْزَنُوا وَأَنتُمُ الْأَعْلَوْنَ إِن كُنتُم مُّؤْمِنِينَ",
    translation: "So do not weaken and do not grieve, and you will be superior if you are [true] believers.",
    tafsir: "نداء رفع الروح المعنوية وتثبيت الإيمان؛ فالإيمان يعطي العزة والرفعة والتمكين ولا داعي للحزن أو الوهن.",
    theme: "العزة واليقين",
    audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/432.mp3"
  }
];

// Fallback verses for Quran Reader (e.g., Al-Fatiha, Ayatal Kursi, Al-Ikhlas)
export const POPULAR_SURAHS_DATA: Record<number, Ayah[]> = {
  1: [
    { number: 1, surahNumber: 1, surahName: "الفاتحة", numberInSurah: 1, juz: 1, page: 1, text: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ", tafsirMuyassar: "أبتدئ قراءتي باسم الله مستعيناً به، والرحمن الرحيم اسمان من أسماء الله الحسنى." },
    { number: 2, surahNumber: 1, surahName: "الفاتحة", numberInSurah: 2, juz: 1, page: 1, text: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ", tafsirMuyassar: "الثناء الكامل لله تعالى مالك جميع الخلق وخالقهم ومدبر أمورهم." },
    { number: 3, surahNumber: 1, surahName: "الفاتحة", numberInSurah: 3, juz: 1, page: 1, text: "الرَّحْمَٰنِ الرَّحِيمِ", tafsirMuyassar: "الذي وسعت رحمته كل شيء، والخاص بالرحمة لعباده المؤمنين." },
    { number: 4, surahNumber: 1, surahName: "الفاتحة", numberInSurah: 4, juz: 1, page: 1, text: "مَالِكِ يَوْمِ الدِّينِ", tafsirMuyassar: "المالك والدَيّان المتصرف يوم الجزاء والحساب." },
    { number: 5, surahNumber: 1, surahName: "الفاتحة", numberInSurah: 5, juz: 1, page: 1, text: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ", tafsirMuyassar: "نخصك وحدك بالعبادة والطاعة ونستعين بك وحدك في كل أمورنا." },
    { number: 6, surahNumber: 1, surahName: "الفاتحة", numberInSurah: 6, juz: 1, page: 1, text: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ", tafsirMuyassar: "وفقنا وارشدنا ويثبتنا على الطريق الواضح المستطيل وهو الإسلام." },
    { number: 7, surahNumber: 1, surahName: "الفاتحة", numberInSurah: 7, juz: 1, page: 1, text: "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ", tafsirMuyassar: "طريق النبيين والصديقين والشهداء، غير طريق المغضوب عليهم وهم اليهود ومن شابههم، ولا الضالين وهم النصارى." }
  ],
  112: [
    { number: 6222, surahNumber: 112, surahName: "الإخلاص", numberInSurah: 1, juz: 30, page: 604, text: "قُلْ هُوَ اللَّهُ أَحَدٌ", tafsirMuyassar: "قل أيها الرسول: هو الله المتفرد بالإلوهية والربوبية والأسماء والصفات." },
    { number: 6223, surahNumber: 112, surahName: "الإخلاص", numberInSurah: 2, juz: 30, page: 604, text: "اللَّهُ الصَّمَدُ", tafsirMuyassar: "الله الذي يقصد في الحوائج كلها، الكامل في صفاته." },
    { number: 6224, surahNumber: 112, surahName: "الإخلاص", numberInSurah: 3, juz: 30, page: 604, text: "لَمْ يَلِدْ وَلَمْ يُولَدْ", tafsirMuyassar: "ليس له ولد ولا والد ولا كفء." },
    { number: 6225, surahNumber: 112, surahName: "الإخلاص", numberInSurah: 4, juz: 30, page: 604, text: "وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ", tafsirMuyassar: "ولم يكن له مماثلاً أو مساوياً أحد من خلقه." }
  ],
  113: [
    { number: 6226, surahNumber: 113, surahName: "الفلق", numberInSurah: 1, juz: 30, page: 604, text: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ", tafsirMuyassar: "قل ألوذ وأعتصم برب الصبح والفجر." },
    { number: 6227, surahNumber: 113, surahName: "الفلق", numberInSurah: 2, juz: 30, page: 604, text: "مِن شَرِّ مَا خَلَقَ", tafsirMuyassar: "من شر جميع المخلوقات وأذاها." },
    { number: 6228, surahNumber: 113, surahName: "الفلق", numberInSurah: 3, juz: 30, page: 604, text: "وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ", tafsirMuyassar: "ومن شر الليل إذا أظلم ودخل نوره." },
    { number: 6229, surahNumber: 113, surahName: "الفلق", numberInSurah: 4, juz: 30, page: 604, text: "وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ", tafsirMuyassar: "ومن شر الساحرات اللاتي ينفثن في العقد للاضرار." },
    { number: 6230, surahNumber: 113, surahName: "الفلق", numberInSurah: 5, juz: 30, page: 604, text: "وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ", tafsirMuyassar: "ومن شر حاقد يتمنى زوال النعمة عن غيره." }
  ],
  114: [
    { number: 6231, surahNumber: 114, surahName: "الناس", numberInSurah: 1, juz: 30, page: 604, text: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ", tafsirMuyassar: "قل ألوذ وألجأ برب البشر وخالقهم ومدبر أمورهم." },
    { number: 6232, surahNumber: 114, surahName: "الناس", numberInSurah: 2, juz: 30, page: 604, text: "مَلِكِ النَّاسِ", tafsirMuyassar: "ملكهم المتصرف فيهم بمالكيته المطلقة." },
    { number: 6233, surahNumber: 114, surahName: "الناس", numberInSurah: 3, juz: 30, page: 604, text: "إِلَٰهِ النَّاسِ", tafsirMuyassar: "معبودهم الحق الذي لا معبود سواه." },
    { number: 6234, surahNumber: 114, surahName: "الناس", numberInSurah: 4, juz: 30, page: 604, text: "مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ", tafsirMuyassar: "من شر الشيطان الذي يوسوس عند الغفلة ويخنس عند ذكر الله." },
    { number: 6235, surahNumber: 114, surahName: "الناس", numberInSurah: 5, juz: 30, page: 604, text: "الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ", tafsirMuyassar: "الذي يبث الشر والشكوك في صدور الناس." },
    { number: 6236, surahNumber: 114, surahName: "الناس", numberInSurah: 6, juz: 30, page: 604, text: "مِنَ الْجِنَّةِ وَالنَّاسِ", tafsirMuyassar: "سواء كان الوسواس من شياطين الجن أو شياطين الإنس." }
  ]
};
