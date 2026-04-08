import type { Episode, EpisodeProgress, EpisodeSummary, Game } from "@/lib/types";

type EpisodeRecord = {
  id: string;
  number: number;
  title: string;
  fullTitle: string;
  description: string;
  lesson: string;
  ageGroup: string;
  videoId: string;
  image: string;
  playLabel: string;
  routePath: string;
  tags: string[];
  events: string[];
};

const episodeRecords: EpisodeRecord[] = [
  {
    id: "ep1",
    number: 1,
    title: "رحلة للإبداع ومغامرة للتفكير",
    fullTitle: "راشد وسارة | رحلة للإبداع ومغامرة للتفكير | الحلقة 1",
    description: "حلقة افتتاحية تقدم عالم راشد وسارة وتدعو الأطفال للتفكير والإبداع.",
    lesson: "البدايات الجميلة تصنعها الأفكار الجديدة والشجاعة.",
    ageGroup: "5 - 15 سنة",
    videoId: "GNzRa3TZWGY",
    image: "https://i.ytimg.com/vi/GNzRa3TZWGY/hqdefault.jpg",
    playLabel: "العب الآن",
    routePath: "/episodes/ep1",
    tags: ["الإبداع", "التفكير", "المغامرة"],
    events: ["بداية الرحلة", "اكتشاف العالم", "التفكير بهدوء", "مغامرة الإبداع"]
  },
  {
    id: "ep2",
    number: 2,
    title: "وقتي كنزي",
    fullTitle: "وقتي كنزي | كيف تنظم وقتك بذكاء؟",
    description: "حلقة تعلم الأطفال قيمة الوقت وكيفية تنظيمه للإنجاز براحة.",
    lesson: "تنظيم الوقت يساعد على الإنجاز ويمنح الطفل ثقة وهدوءًا.",
    ageGroup: "5 - 15 سنة",
    videoId: "zO9vi1isPzQ",
    image: "https://i.ytimg.com/vi/zO9vi1isPzQ/hqdefault.jpg",
    playLabel: "العب الآن",
    routePath: "/episodes/ep2",
    tags: ["الوقت", "التنظيم", "الإنجاز"],
    events: ["معرفة قيمة الوقت", "تحديد الأولويات", "وضع جدول", "الإنجاز براحة"]
  },
  {
    id: "ep3",
    number: 3,
    title: "سر الأبطال!",
    fullTitle: "سر الأبطال! | الإخلاص طريق التفوق الحقيقي",
    description: "حلقة تؤكد أن الإخلاص في العمل هو طريق التفوق الحقيقي.",
    lesson: "الإخلاص يجعل العمل أجمل وأقوى ويقود إلى نتائج أفضل.",
    ageGroup: "5 - 15 سنة",
    videoId: "GBGV7DZHk6I",
    image: "https://i.ytimg.com/vi/GBGV7DZHk6I/hqdefault.jpg",
    playLabel: "العب الآن",
    routePath: "/episodes/ep3",
    tags: ["الإخلاص", "التفوق", "الإتقان"],
    events: ["معرفة السر", "النية الصادقة", "إتقان العمل", "التفوق الحقيقي"]
  },
  {
    id: "ep4",
    number: 4,
    title: "صاروخ الأحلام",
    fullTitle: "صاروخ الأحلام | سر جديد من أسرار النجاح",
    description: "حلقة تشجع على تحويل الأحلام إلى أهداف وخطوات واضحة.",
    lesson: "الأحلام تحتاج إلى خطة وعمل حتى تنطلق نحو النجاح.",
    ageGroup: "5 - 15 سنة",
    videoId: "qK5FwJewTdk",
    image: "https://i.ytimg.com/vi/qK5FwJewTdk/hqdefault.jpg",
    playLabel: "العب الآن",
    routePath: "/episodes/ep4",
    tags: ["الأحلام", "الأهداف", "الخطة"],
    events: ["وجود حلم", "تحديد الهدف", "العمل اليومي", "الانطلاق نحو النجاح"]
  },
  {
    id: "ep5",
    number: 5,
    title: "أنجز اليوم تربح الغد",
    fullTitle: "أنجز اليوم | تربح الغد",
    description: "حلقة تشجع الطفل على الإنجاز اليومي وعدم التأجيل.",
    lesson: "كل مهمة تنجز اليوم تجعل الغد أسهل وأهدأ.",
    ageGroup: "5 - 15 سنة",
    videoId: "fuSk1seccl8",
    image: "https://i.ytimg.com/vi/fuSk1seccl8/hqdefault.jpg",
    playLabel: "العب الآن",
    routePath: "/episodes/ep5",
    tags: ["الإنجاز", "اليوم", "الغد"],
    events: ["وجود مهمة", "البدء الآن", "إنهاء العمل", "الراحة في الغد"]
  },
  {
    id: "ep6",
    number: 6,
    title: "قوة السؤال!",
    fullTitle: "قوة السؤال! | كيف يجعلك السؤال أذكى؟",
    description: "حلقة تشجع الطفل على السؤال والفضول وعدم الخجل من التعلم.",
    lesson: "السؤال الذكي يفتح أبواب الفهم ويزيد الذكاء.",
    ageGroup: "5 - 15 سنة",
    videoId: "yMoOQkj_w7I",
    image: "https://i.ytimg.com/vi/yMoOQkj_w7I/hqdefault.jpg",
    playLabel: "العب الآن",
    routePath: "/episodes/ep6",
    tags: ["السؤال", "الفضول", "التعلم"],
    events: ["شعور بالحيرة", "طرح السؤال", "البحث عن الجواب", "فهم أعمق"]
  },
  {
    id: "ep7",
    number: 7,
    title: "البطل الحقيقي!",
    fullTitle: "البطل الحقيقي! | الشجاعة في مواجهة المتنمر",
    description: "حلقة تعلم الطفل أن الشجاعة تكون بالحكمة وطلب الدعم.",
    lesson: "البطل الحقيقي يدافع عن نفسه والآخرين بحكمة لا بعنف.",
    ageGroup: "5 - 15 سنة",
    videoId: "HIhdIvg2x5o",
    image: "https://i.ytimg.com/vi/HIhdIvg2x5o/hqdefault.jpg",
    playLabel: "العب الآن",
    routePath: "/episodes/ep7",
    tags: ["التنمر", "الشجاعة", "الدعم"],
    events: ["موقف تنمر", "خوف أولي", "تصرف شجاع", "طلب المساعدة"]
  },
  {
    id: "ep8",
    number: 8,
    title: "العطاء سر النجاح!",
    fullTitle: "العطاء سر النجاح! | كيف تجعل مساعدة الآخرين طريق نجاحك؟",
    description: "حلقة توضح أن مساعدة الآخرين تزيد الخير والنجاح.",
    lesson: "العطاء يترك أثرًا جميلًا ويصنع نجاحًا حقيقيًا.",
    ageGroup: "5 - 15 سنة",
    videoId: "zevraZmU7oQ",
    image: "https://i.ytimg.com/vi/zevraZmU7oQ/hqdefault.jpg",
    playLabel: "العب الآن",
    routePath: "/episodes/ep8",
    tags: ["العطاء", "المساعدة", "النجاح"],
    events: ["موقف يحتاج مساعدة", "لحظة تردد", "مبادرة بالعطاء", "نجاح وسعادة"]
  },
  {
    id: "ep9",
    number: 9,
    title: "الصديق الحقيقي!",
    fullTitle: "الصديق الحقيقي! | لماذا العزلة تُفقدنا السعادة؟",
    description: "حلقة تؤكد قيمة الصداقة الصحية وأثرها في السعادة.",
    lesson: "الصديق الحقيقي يشارك الخير ويخفف الحزن.",
    ageGroup: "5 - 15 سنة",
    videoId: "aZEpFYTntWg",
    image: "https://i.ytimg.com/vi/aZEpFYTntWg/hqdefault.jpg",
    playLabel: "العب الآن",
    routePath: "/episodes/ep9",
    tags: ["الصداقة", "السعادة", "الدعم"],
    events: ["الشعور بالوحدة", "البحث عن صديق", "المشاركة", "استعادة السعادة"]
  },
  {
    id: "ep10",
    number: 10,
    title: "السرقة تبدأ بخطوة صغيرة",
    fullTitle: "السرقة تبدأ بخطوة صغيرة! | السرقة تبدأ بالاستهانة؟",
    description: "حلقة تبين أن الخطأ الصغير إذا أُهمل قد يكبر ويؤذي صاحبه.",
    lesson: "الأمانة تبدأ من التفاصيل الصغيرة والرجوع عن الخطأ شجاعة.",
    ageGroup: "5 - 15 سنة",
    videoId: "NQmDF48wPQc",
    image: "https://i.ytimg.com/vi/NQmDF48wPQc/hqdefault.jpg",
    playLabel: "العب الآن",
    routePath: "/episodes/ep10",
    tags: ["الأمانة", "المسؤولية", "الخطأ"],
    events: ["استهانة بخطأ", "تكرار الخطأ", "اكتشاف العاقبة", "العودة إلى الأمانة"]
  },
  {
    id: "ep11",
    number: 11,
    title: "الصدق سفينة النجاة",
    fullTitle: "الصدق سفينة النجاة | هل أنت شجاع؟",
    description: "حلقة تربط بين الشجاعة والصدق وتوضح أن الحقيقة تنقذ الإنسان.",
    lesson: "الشجاعة الحقيقية هي قول الصدق وتحمل الموقف.",
    ageGroup: "5 - 15 سنة",
    videoId: "T90Boeow3Gc",
    image: "https://i.ytimg.com/vi/T90Boeow3Gc/hqdefault.jpg",
    playLabel: "العب الآن",
    routePath: "/episodes/ep11",
    tags: ["الصدق", "الشجاعة", "النجاة"],
    events: ["موقف صعب", "تردد", "قول الحقيقة", "راحة ونجاة"]
  },
  {
    id: "ep12",
    number: 12,
    title: "الصفر الحقيقي!",
    fullTitle: "الصفر الحقيقي! | لماذا يدمّر الغش مستقبلك؟",
    description: "حلقة تشرح أن الغش لا يصنع نجاحًا حقيقيًا.",
    lesson: "النجاح الحقيقي يبنى على الأمانة والاجتهاد لا على الغش.",
    ageGroup: "5 - 15 سنة",
    videoId: "u81CB7GWXOQ",
    image: "https://i.ytimg.com/vi/u81CB7GWXOQ/hqdefault.jpg",
    playLabel: "العب الآن",
    routePath: "/episodes/ep12",
    tags: ["الغش", "الأمانة", "المستقبل"],
    events: ["إغراء الغش", "كشف الخطر", "اختيار الصدق", "النجاح الحقيقي"]
  },
  {
    id: "ep13",
    number: 13,
    title: "سر العباقرة!",
    fullTitle: "سر العباقرة! | هل النجاح بالذكاء أم بالاجتهاد؟",
    description: "حلقة تبين أن الاجتهاد والمثابرة أساس النجاح.",
    lesson: "المواظبة تصنع التفوق أكثر من الموهبة غير المستثمرة.",
    ageGroup: "5 - 15 سنة",
    videoId: "F1Z4WUZjqjE",
    image: "https://i.ytimg.com/vi/F1Z4WUZjqjE/hqdefault.jpg",
    playLabel: "العب الآن",
    routePath: "/episodes/ep13",
    tags: ["الاجتهاد", "المثابرة", "النجاح"],
    events: ["سؤال عن النجاح", "مقارنة الذكاء بالاجتهاد", "التدريب", "النتيجة"]
  },
  {
    id: "ep14",
    number: 14,
    title: "الطاولة الحزينة!",
    fullTitle: "الطاولة الحزينة! | لماذا نحافظ على ممتلكات المدرسة؟",
    description: "حلقة تربط احترام ممتلكات المدرسة بالمسؤولية والأمانة.",
    lesson: "المحافظة على ممتلكات المدرسة دليل احترام للمكان وللجميع.",
    ageGroup: "5 - 15 سنة",
    videoId: "q1nXsA7tjQo",
    image: "https://i.ytimg.com/vi/q1nXsA7tjQo/hqdefault.jpg",
    playLabel: "العب الآن",
    routePath: "/episodes/ep14",
    tags: ["الممتلكات", "المدرسة", "المسؤولية"],
    events: ["إهمال الطاولة", "الحزن", "اكتشاف الخطأ", "المحافظة على الممتلكات"]
  },
  {
    id: "ep15",
    number: 15,
    title: "شرارة الغضب!",
    fullTitle: "شرارة الغضب! | كيف أتحكم في غضبي؟",
    description: "حلقة تعلم الطفل كيف يهدأ ويتصرف بعقل عند الغضب.",
    lesson: "ضبط الغضب يبدأ بالتوقف والهدوء واختيار الرد المناسب.",
    ageGroup: "5 - 15 سنة",
    videoId: "W9vtVrT0p6o",
    image: "https://i.ytimg.com/vi/W9vtVrT0p6o/hqdefault.jpg",
    playLabel: "العب الآن",
    routePath: "/episodes/ep15",
    tags: ["الغضب", "الهدوء", "التحكم"],
    events: ["بداية الغضب", "ملاحظة الشرارة", "التهدئة", "التحكم في الرد"]
  },
  {
    id: "ep16",
    number: 16,
    title: "الكلمة الجارحة!",
    fullTitle: "الكلمة الجارحة! | لماذا تؤذي الغيبة قلوبنا؟",
    description: "حلقة تناقش أثر الغيبة والكلام المؤذي على القلوب والعلاقات.",
    lesson: "الكلمة الطيبة تحفظ القلوب، أما الجارحة فتؤذي الثقة.",
    ageGroup: "5 - 15 سنة",
    videoId: "cNSjX1uNJa0",
    image: "https://i.ytimg.com/vi/cNSjX1uNJa0/hqdefault.jpg",
    playLabel: "العب الآن",
    routePath: "/episodes/ep16",
    tags: ["الكلمة الطيبة", "القلوب", "الصداقة"],
    events: ["قول كلمة جارحة", "حزن القلوب", "فهم الأثر", "اختيار الكلام الطيب"]
  },
  {
    id: "ep17",
    number: 17,
    title: "الشكوى الذكية!",
    fullTitle: "الشكوى الذكية! | متى أشتكي ومتى أتحمّل؟",
    description: "حلقة تعلم الفرق بين الشكوى المفيدة والتذمر غير النافع.",
    lesson: "التصرف الذكي هو اختيار الوقت والطريقة الصحيحة لطلب المساعدة.",
    ageGroup: "5 - 15 سنة",
    videoId: "OtENBf7QhDw",
    image: "https://i.ytimg.com/vi/OtENBf7QhDw/hqdefault.jpg",
    playLabel: "العب الآن",
    routePath: "/episodes/ep17",
    tags: ["الشكوى", "الحكمة", "المساعدة"],
    events: ["حدوث مشكلة", "التفكير", "طلب المساعدة", "حل المشكلة"]
  },
  {
    id: "ep18",
    number: 18,
    title: "الغابة العجيبة!",
    fullTitle: "الغابة العجيبة! | سر التركيز والتفوق في المدرسة",
    description: "حلقة تربط بين التركيز وإبعاد المشتتات والتفوق الدراسي.",
    lesson: "التركيز مهارة يمكن تدريبها بالهدوء وتحديد الهدف.",
    ageGroup: "5 - 15 سنة",
    videoId: "taG-WtEk6S8",
    image: "https://i.ytimg.com/vi/taG-WtEk6S8/hqdefault.jpg",
    playLabel: "العب الآن",
    routePath: "/episodes/ep18",
    tags: ["التركيز", "المدرسة", "المشتتات"],
    events: ["دخول الغابة", "ظهور المشتتات", "اختيار الهدوء", "الوصول إلى التفوق"]
  },
  {
    id: "ep19",
    number: 19,
    title: "وداعًا مدرستي؟!",
    fullTitle: "وداعًا مدرستي؟! | كيف نتغلب على كره المدرسة ونحب التعلم",
    description: "حلقة تعالج مشاعر كره المدرسة وتربطها بالتعلم والصداقة.",
    lesson: "حب التعلم يبدأ حين نرى المدرسة مكانًا للنمو والرفقة.",
    ageGroup: "5 - 15 سنة",
    videoId: "FFnI_0NCeK4",
    image: "https://i.ytimg.com/vi/FFnI_0NCeK4/hqdefault.jpg",
    playLabel: "العب الآن",
    routePath: "/episodes/ep19",
    tags: ["المدرسة", "التعلم", "الأصدقاء"],
    events: ["الشعور بالضيق", "النقاش", "اكتشاف فوائد المدرسة", "تغيير النظرة"]
  },
  {
    id: "ep20",
    number: 20,
    title: "الخطة السرّية قبل الامتحان",
    fullTitle: "الخطة السرّية قبل الامتحان! | هل تنجح طريقة 30-5-30؟",
    description: "حلقة تركز على الاستعداد للامتحان بخطة ذكية وتنظيم المذاكرة.",
    lesson: "النجاح يحتاج خطة واضحة ومراجعة هادئة وثقة بالنفس.",
    ageGroup: "5 - 15 سنة",
    videoId: "mGc1inOFPaY",
    image: "https://i.ytimg.com/vi/mGc1inOFPaY/hqdefault.jpg",
    playLabel: "العب الآن",
    routePath: "/episodes/ep20",
    tags: ["الامتحان", "الخطة", "الثقة"],
    events: ["وضع الخطة", "تقسيم الوقت", "المراجعة", "الدخول بثقة إلى الامتحان"]
  }
];

function normalizeWord(value: string) {
  return value
    .replace(/[!؟،,.|]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function scrambleWord(word: string) {
  const chars = [...word];
  for (let index = chars.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(((index + 3) * 7) % chars.length);
    [chars[index], chars[randomIndex]] = [chars[randomIndex], chars[index]];
  }
  if (chars.join("") === word) {
    chars.reverse();
  }
  return chars;
}

function pickKeyword(title: string, tags: string[]) {
  const singleTag = tags.find((tag) => !tag.includes(" "));
  if (singleTag) {
    return normalizeWord(singleTag);
  }

  const titleWord = title
    .split(" ")
    .map(normalizeWord)
    .find((word) => word.length >= 4);

  return titleWord || "نجاح";
}

function createDragDropGame(episode: Episode): Game {
  const ordered = episode.events.slice(0, 4);
  const shuffled = [...ordered].reverse();

  return {
    id: `${episode.id}-g1`,
    episodeId: episode.id,
    type: "dragDrop",
    title: `رتّب أحداث ${episode.title}`,
    prompt: "اسحب المراحل إلى ترتيبها الصحيح كما حدثت في الحلقة.",
    difficulty: "easy",
    points: 20,
    data: {
      draggableItems: shuffled.map((item, index) => ({
        id: `${episode.id}-drag-${index}`,
        label: item,
        targetId: `${episode.id}-target-${ordered.indexOf(item)}`
      })),
      targets: ordered.map((_, index) => ({
        id: `${episode.id}-target-${index}`,
        label: index === 0 ? "البداية" : index === ordered.length - 1 ? "النهاية" : `المرحلة ${index + 1}`
      }))
    },
    successMessage: "أحسنت! رتبت أحداث الحلقة بنجاح.",
    retryMessage: "حاول مرة أخرى ورتب المراحل من جديد."
  };
}

function createMemoryGame(episode: Episode): Game {
  const entries = episode.tags.slice(0, 3).flatMap((tag) => [tag, tag]);

  return {
    id: `${episode.id}-g2`,
    episodeId: episode.id,
    type: "memory",
    title: `ذاكرة ${episode.title}`,
    prompt: "اكشف الأزواج المتشابهة المرتبطة بأفكار الحلقة.",
    difficulty: "medium",
    points: 20,
    data: {
      memoryCards: entries.map((label, index) => ({
        id: `${episode.id}-memory-${index}`,
        label,
        pairKey: `${episode.id}-pair-${Math.floor(index / 2)}`
      }))
    },
    successMessage: "ممتاز يا بطل، أنهيت لعبة الذاكرة بنجاح.",
    retryMessage: "حاول مجددًا وتذكر أماكن البطاقات جيدًا."
  };
}

function createArcadeGame(episode: Episode): Game {
  const episodeNumber = typeof episode.number === "number" ? episode.number : episode.order;

  return {
    id: `${episode.id}-g3`,
    episodeId: episode.id,
    type: "arcadeCatch",
    title: `مغامرة ${episode.title}`,
    prompt: `قد راشد أو سارة والتقط عناصر ${episode.tags[0] || "النجاح"} وتجنب العناصر الخاطئة.`,
    difficulty: "medium",
    points: 25,
    data: {
      catcher: {
        playerLabel: episodeNumber % 2 === 0 ? "راشد" : "سارة",
        goodItems: episode.tags.slice(0, 4),
        badItems: ["تشتت", "فوضى", "تأجيل", "إهمال"],
        goal: 5,
        duration: 18
      }
    },
    successMessage: "رائع! جمعت العناصر الصحيحة في الوقت المناسب.",
    retryMessage: "أعد اللعب وركز على العناصر الصحيحة المرتبطة بالحلقة."
  };
}

function createWordPuzzleGame(episode: Episode): Game {
  const answer = pickKeyword(episode.title, episode.tags);

  return {
    id: `${episode.id}-g4`,
    episodeId: episode.id,
    type: "wordPuzzle",
    title: `لغز ${episode.title}`,
    prompt: "كوّن كلمة الحلقة الأساسية من الحروف المبعثرة.",
    difficulty: "hard",
    points: 15,
    data: {
      puzzle: {
        answer,
        scrambled: scrambleWord(answer),
        hint: episode.lesson
      }
    },
    successMessage: "تهانينا، لقد كوّنت كلمة الحلقة بنجاح.",
    retryMessage: "اقتربت، أعد ترتيب الحروف كما وردت في معنى الحلقة."
  };
}

function createDecisionGame(episode: Episode): Game {
  const focusTag = episode.tags[0] || "الخير";

  return {
    id: `${episode.id}-g5`,
    episodeId: episode.id,
    type: "decisionPath",
    title: `قرار الأبطال في ${episode.title}`,
    prompt: `ساعد راشد وسارة على اختيار القرار الأفضل المرتبط بموضوع ${focusTag}.`,
    difficulty: "easy",
    points: 20,
    data: {
      decision: {
        story: `كان راشد وسارة داخل موقف جديد من أحداث ${episode.title}. أي قرار سيساعدهما على النجاح؟`,
        choices: [
          {
            id: `${episode.id}-choice-1`,
            label: `يختاران التصرف الذي يعبر عن ${focusTag}`,
            outcome: `اختيار رائع! راشد وسارة تذكرا فكرة ${focusTag} ونجحا في التحدي.`,
            correct: true
          },
          {
            id: `${episode.id}-choice-2`,
            label: "يتسرعان بدون تفكير",
            outcome: "هذا القرار سريع لكنه لا يساعد على فهم رسالة الحلقة.",
            correct: false
          },
          {
            id: `${episode.id}-choice-3`,
            label: "يتوقفان قليلًا ثم يفكران بهدوء",
            outcome: "فكرة ممتازة، التفكير الهادئ يقرب راشد وسارة من الحل الصحيح.",
            correct: true
          }
        ]
      }
    },
    successMessage: "أحسنت! ساعدت راشد وسارة على اتخاذ القرار المناسب.",
    retryMessage: "حاول مرة أخرى وفكر في الفكرة الأساسية للحلقة."
  };
}

function buildEpisode(record: EpisodeRecord): Episode {
  const episode: Episode = {
    id: record.id,
    order: record.number,
    number: record.number,
    title: record.title,
    fullTitle: record.fullTitle,
    description: record.description,
    lesson: record.lesson,
    ageGroup: record.ageGroup,
    videoId: record.videoId,
    thumbnailUrl: record.image,
    image: record.image,
    playLabel: record.playLabel,
    gamePath: record.routePath,
    routePath: record.routePath,
    tags: [...record.tags],
    events: [...record.events],
    games: []
  };

  return {
    ...episode,
    games: [
      createDragDropGame(episode),
      createMemoryGame(episode),
      createArcadeGame(episode),
      createWordPuzzleGame(episode),
      createDecisionGame(episode)
    ]
  };
}

const stableEpisodes: Episode[] = episodeRecords
  .map(buildEpisode)
  .sort((first, second) => first.order - second.order);

export const sampleEpisodeMap = new Map(stableEpisodes.map((episode) => [episode.id, episode]));

export const sampleEpisodeSummaries: EpisodeSummary[] = stableEpisodes.map((episode) => ({
  id: episode.id,
  order: episode.order,
  number: episode.number,
  title: episode.title,
  description: episode.description,
  thumbnailUrl: episode.thumbnailUrl,
  image: episode.image,
  routePath: episode.routePath,
  gamePath: episode.gamePath,
  playLabel: episode.playLabel,
  tags: episode.tags,
  gamesCount: episode.games.length,
  progress: {
    completedGames: 0,
    totalGames: episode.games.length,
    score: 0
  }
}));

export function createEmptyProgress(episode: Episode): EpisodeProgress {
  const safeGames = Array.isArray(episode.games) ? episode.games : [];
  return {
    episodeId: episode.id,
    completedGames: 0,
    totalGames: safeGames.length,
    score: 0,
    maxScore: safeGames.reduce((sum, game) => sum + (typeof game.points === "number" ? game.points : 0), 0),
    percentage: 0,
    completed: false,
    answers: []
  };
}

export function getEpisodeSummaries(): EpisodeSummary[] {
  return [...sampleEpisodeSummaries].sort((first, second) => first.order - second.order);
}

export function getEpisodeById(id: string): Episode | null {
  const episode = sampleEpisodeMap.get(id);
  if (!episode) {
    return null;
  }
  return sanitizeEpisode(episode);
}

export function getEpisodeByRoutePath(routePath: string): Episode | null {
  const episode = stableEpisodes.find((item) => item.gamePath === routePath) || null;
  return episode ? sanitizeEpisode(episode) : null;
}

export function isValidEpisode(value: unknown): value is Episode {
  if (!value || typeof value !== "object") {
    return false;
  }

  const episode = value as Partial<Episode>;
  return (
    typeof episode.id === "string" &&
    typeof episode.title === "string" &&
    typeof episode.description === "string" &&
    typeof episode.thumbnailUrl === "string" &&
    Array.isArray(episode.tags) &&
    Array.isArray(episode.events) &&
    Array.isArray(episode.games)
  );
}

export function isValidEpisodeSummary(value: unknown): value is EpisodeSummary {
  if (!value || typeof value !== "object") {
    return false;
  }

  const episode = value as Partial<EpisodeSummary>;
  return (
    typeof episode.id === "string" &&
    typeof episode.title === "string" &&
    typeof episode.description === "string" &&
    typeof episode.thumbnailUrl === "string"
  );
}

export function sanitizeEpisodeList(value: unknown): EpisodeSummary[] {
  if (!Array.isArray(value)) {
    return getEpisodeSummaries();
  }

  const sanitized = value
    .filter(isValidEpisodeSummary)
    .map((episode) => ({
      ...episode,
      number: episode.number || episode.order,
      image: episode.image || episode.thumbnailUrl,
      routePath: episode.routePath || episode.gamePath || `/episodes/${episode.id}`,
      gamePath: episode.gamePath || `/episodes/${episode.id}`,
      playLabel: episode.playLabel || "العب الآن",
      tags: Array.isArray(episode.tags) ? episode.tags : [],
      gamesCount: typeof episode.gamesCount === "number" ? episode.gamesCount : 5
    }))
    .sort((first, second) => first.order - second.order);

  return sanitized.length ? sanitized : getEpisodeSummaries();
}

function isKnownGameType(type: unknown): type is Game["type"] {
  return (
    type === "dragDrop" ||
    type === "memory" ||
    type === "arcadeCatch" ||
    type === "wordPuzzle" ||
    type === "decisionPath" ||
    type === "fallback"
  );
}

function createFallbackGame(episode: Episode, index: number, reason?: string): Game {
  return {
    id: `${episode.id}-fallback-${index + 1}`,
    episodeId: episode.id,
    type: "fallback",
    title: `لعبة إضافية ${index + 1}`,
    prompt: reason || "هذه اللعبة قيد التجهيز، ويمكنك الانتقال إلى اللعبة التالية الآن.",
    difficulty: "easy",
    points: 0,
    data: {
      fallback: {
        message: "تعذر تحميل هذه اللعبة بشكل كامل الآن."
      }
    },
    successMessage: "أحسنت! يمكنك متابعة بقية الألعاب.",
    retryMessage: "هذه اللعبة ستتوفر بشكل أفضل بعد قليل."
  };
}

function sanitizeGame(game: unknown, episode: Episode, index: number): Game | null {
  if (!game || typeof game !== "object") {
    return createFallbackGame(episode, index, "تم اكتشاف لعبة غير مكتملة وتم استبدالها بشكل آمن.");
  }

  const candidate = game as Partial<Game>;
  const type = isKnownGameType(candidate.type) ? candidate.type : "fallback";
  const id = typeof candidate.id === "string" && candidate.id ? candidate.id : `${episode.id}-safe-${index + 1}`;
  const title = typeof candidate.title === "string" && candidate.title ? candidate.title : `لعبة ${index + 1}`;
  const prompt = typeof candidate.prompt === "string" && candidate.prompt ? candidate.prompt : "استمتع بتحدٍ جديد مع راشد وسارة.";
  const difficulty = candidate.difficulty === "easy" || candidate.difficulty === "medium" || candidate.difficulty === "hard"
    ? candidate.difficulty
    : "easy";
  const points = typeof candidate.points === "number" && Number.isFinite(candidate.points) ? candidate.points : 10;

  const safeGame: Game = {
    id,
    episodeId: episode.id,
    type,
    title,
    prompt,
    difficulty,
    points,
    data: candidate.data && typeof candidate.data === "object" ? candidate.data : {},
    successMessage:
      typeof candidate.successMessage === "string" && candidate.successMessage
        ? candidate.successMessage
        : "أحسنت! أكملت هذه اللعبة.",
    retryMessage:
      typeof candidate.retryMessage === "string" && candidate.retryMessage
        ? candidate.retryMessage
        : "حاول مرة أخرى بطريقة مختلفة."
  };

  if (type === "decisionPath") {
    const decision = safeGame.data.decision;
    if (
      !decision ||
      typeof decision.story !== "string" ||
      !Array.isArray(decision.choices) ||
      decision.choices.length === 0
    ) {
      return createFallbackGame(episode, index, "لعبة القرار غير مكتملة حاليًا، لذلك تم عرض بطاقة آمنة بدلًا منها.");
    }
  }

  if (type === "dragDrop") {
    const draggableItems = Array.isArray(safeGame.data.draggableItems) ? safeGame.data.draggableItems : [];
    const targets = Array.isArray(safeGame.data.targets) ? safeGame.data.targets : [];
    if (!draggableItems.length || !targets.length) {
      return createFallbackGame(episode, index, "تعذر تجهيز لعبة ترتيب الأحداث لهذه الحلقة.");
    }
  }

  if (type === "memory") {
    const memoryCards = Array.isArray(safeGame.data.memoryCards) ? safeGame.data.memoryCards : [];
    if (memoryCards.length < 2) {
      return createFallbackGame(episode, index, "تعذر تجهيز لعبة الذاكرة لهذه الحلقة.");
    }
  }

  if (type === "arcadeCatch") {
    const catcher = safeGame.data.catcher;
    if (
      !catcher ||
      !Array.isArray(catcher.goodItems) ||
      !Array.isArray(catcher.badItems) ||
      !catcher.goodItems.length ||
      typeof catcher.goal !== "number" ||
      typeof catcher.duration !== "number"
    ) {
      return createFallbackGame(episode, index, "تعذر تجهيز لعبة المغامرة الحركية لهذه الحلقة.");
    }
  }

  if (type === "wordPuzzle") {
    const puzzle = safeGame.data.puzzle;
    if (
      !puzzle ||
      typeof puzzle.answer !== "string" ||
      !Array.isArray(puzzle.scrambled) ||
      !puzzle.scrambled.length
    ) {
      return createFallbackGame(episode, index, "تعذر تجهيز لعبة الحروف لهذه الحلقة.");
    }
  }

  return safeGame;
}

export function sanitizeEpisode(episode: Episode): Episode {
  const safeEpisodeBase: Episode = {
    ...episode,
    order: typeof episode.order === "number" ? episode.order : episode.number || 0,
    number: typeof episode.number === "number" ? episode.number : episode.order,
    title: episode.title || "حلقة بدون عنوان",
    description: episode.description || "لا يوجد وصف متاح لهذه الحلقة الآن.",
    thumbnailUrl: episode.thumbnailUrl || episode.image || "/game-heroes-banner.png",
    image: episode.image || episode.thumbnailUrl || "/game-heroes-banner.png",
    playLabel: episode.playLabel || "العب الآن",
    gamePath: episode.gamePath || `/episodes/${episode.id}`,
    routePath: episode.routePath || episode.gamePath || `/episodes/${episode.id}`,
    tags: Array.isArray(episode.tags) ? episode.tags.filter(Boolean) : [],
    events: Array.isArray(episode.events) ? episode.events.filter(Boolean) : [],
    games: []
  };

  const rawGames = Array.isArray(episode.games) ? episode.games : [];
  const sanitizedGames = rawGames
    .map((game, index) => sanitizeGame(game, safeEpisodeBase, index))
    .filter((game): game is Game => Boolean(game))
    .slice(0, 5);

  while (sanitizedGames.length < 5) {
    sanitizedGames.push(createFallbackGame(safeEpisodeBase, sanitizedGames.length));
  }

  return {
    ...safeEpisodeBase,
    games: sanitizedGames
  };
}