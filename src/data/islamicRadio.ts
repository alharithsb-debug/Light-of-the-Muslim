export interface RadioStation {
  id: string;
  name: string;
  reciter: string;
  url: string;
  description: string;
  imageUrl?: string;
}

export const RADIO_STATIONS: RadioStation[] = [
  {
    id: "r1",
    name: "إذاعة مشاري العفاسي",
    reciter: "الشيخ مشاري بن راشد العفاسي",
    url: "https://backup.qurango.net/radio/mishary_alafasi",
    description: "بث مباشر لتلاوات خاشعة بصوت الشيخ مشاري العفاسي"
  },
  {
    id: "r2",
    name: "إذاعة عبد الباسط عبد الصمد",
    reciter: "الشيخ عبد الباسط عبد الصمد",
    url: "https://backup.qurango.net/radio/abdulbasit_abdulsamad_mojawwad",
    description: "التلاوات المجودة الخالدة بصوت الشيخ عبد الباسط"
  },
  {
    id: "r3",
    name: "إذاعة محمود خليل الحصري",
    reciter: "الشيخ محمود خليل الحصري",
    url: "https://backup.qurango.net/radio/mahmoud_khalil_alhussary",
    description: "المصحف المعلم المتقن بصوت شيخ المقارئ المصرية"
  },
  {
    id: "r4",
    name: "إذاعة ماهر المعيقلي",
    reciter: "الشيخ ماهر المعيقلي",
    url: "https://backup.qurango.net/radio/maher_al_muaiqly",
    description: "تلاوات الحرم المكي الشريف بصوت الشيخ ماهر المعيقلي"
  },
  {
    id: "r5",
    name: "إذاعة القرآن الكريم - القاهرة",
    reciter: "إذاعة القرآن الكريم",
    url: "https://stream.radiojar.com/8s44vhq6b5atv",
    description: "البث الحي والمباشر لإذاعة القرآن الكريم بالقاهرة"
  },
  {
    id: "r6",
    name: "إذاعة سعود الشريم",
    reciter: "الشيخ سعود الشريم",
    url: "https://backup.qurango.net/radio/saud_alshuraim",
    description: "تلاوات مميزة بصوت الشيخ سعود الشريم"
  }
];
