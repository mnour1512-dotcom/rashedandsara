export type SeedGame = {
  id: string;
  type: "dragDrop" | "memory" | "arcadeCatch" | "wordPuzzle" | "decisionPath";
  title: string;
  prompt: string;
  difficulty: "easy" | "medium" | "hard";
  points: number;
  data: Record<string, unknown>;
  successMessage: string;
  retryMessage: string;
};

export type SeedEpisode = {
  id: string;
  order: number;
  title: string;
  fullTitle: string;
  description: string;
  lesson: string;
  ageGroup: string;
  videoId: string;
  thumbnailUrl: string;
  tags: string[];
  events: string[];
  games: SeedGame[];
};

type EpisodeCatalogItem = {
  id: string;
  order: number;
  title: string;
  fullTitle: string;
  description: string;
  lesson: string;
  ageGroup: string;
  videoId: string;
  tags: string[];
  events: string[];
};

const episodeCatalog: EpisodeCatalogItem[] = [
  {
    id: "ep1",
    order: 1,
    title: "رحلة للإبداع ومغامرة للتفكير",
    fullTitle: "راشد وسارة | رحلة للإبداع ومغامرة للتفكير | الحلقة 1",
    description: "حلقة افتتاحية تقدم عالم راشد وسارة وتدعو الأطفال للتفكير والإبداع.",
    lesson: "البدايات الجميلة تصنعها الأفكار الجديدة والشجاعة.",
    ageGroup: "5 - 15 سنة",
    videoId: "GNzRa3TZWGY",
    tags: ["الإبداع", "التفكير", "المغامرة"],
    events: ["بداية الرحلة", "اكتشاف العالم", "التفكير بهدوء", "مغامرة الإبداع"]
  },
  {
    id: "ep2",
    order: 2,
    title: "وقتي كنزي",
    fullTitle: "وقتي كنزي | كيف تنظم وقتك بذكاء؟",
    description: "حلقة تعلم الأطفال قيمة الوقت وكيفية تنظيمه للإنجاز براحة.",
    lesson: "تنظيم الوقت يساعد على الإنجاز ويمنح الطفل ثقة وهدوءًا.",
    ageGroup: "5 - 15 سنة",
    videoId: "zO9vi1isPzQ",
    tags: ["الوقت", "التنظيم", "الإنجاز"],
    events: ["معرفة قيمة الوقت", "تحديد الأولويات", "وضع جدول", "الإنجاز براحة"]
  },
  {
    id: "ep3",
    order: 3,
    title: "سر الأبطال!",
    fullTitle: "سر الأبطال! | الإخلاص طريق التفوق الحقيقي",
    description: "حلقة تؤكد أن الإخلاص في العمل هو طريق التفوق الحقيقي.",
    lesson: "الإخلاص يجعل العمل أجمل وأقوى ويقود إلى نتائج أفضل.",
    ageGroup: "5 - 15 سنة",
    videoId: "GBGV7DZHk6I",
    tags: ["الإخلاص", "التفوق", "الإتقان"],
    events: ["معرفة السر", "النية الصادقة", "إتقان العمل", "التفوق الحقيقي"]
  },
  {
    id: "ep4",
    order: 4,
    title: "صاروخ الأحلام",
    fullTitle: "صاروخ الأحلام | سر جديد من أسرار النجاح",
    description: "حلقة تشجع على تحويل الأحلام إلى أهداف وخطوات واضحة.",
    lesson: "الأحلام تحتاج إلى خطة وعمل حتى تنطلق نحو النجاح.",
    ageGroup: "5 - 15 سنة",
    videoId: "qK5FwJewTdk",
    tags: ["الأحلام", "الأهداف", "الخطة"],
    events: ["وجود حلم", "تحديد الهدف", "العمل اليومي", "الانطلاق نحو النجاح"]
  },
  {
    id: "ep5",
    order: 5,
    title: "أنجز اليوم تربح الغد",
    fullTitle: "أنجز اليوم | تربح الغد",
    description: "حلقة تشجع الطفل على الإنجاز اليومي وعدم التأجيل.",
    lesson: "كل مهمة تنجز اليوم تجعل الغد أسهل وأهدأ.",
    ageGroup: "5 - 15 سنة",
    videoId: "fuSk1seccl8",
    tags: ["الإنجاز", "اليوم", "الغد"],
    events: ["وجود مهمة", "البدء الآن", "إنهاء العمل", "الراحة في الغد"]
  },
  {
    id: "ep6",
    order: 6,
    title: "قوة السؤال!",
    fullTitle: "قوة السؤال! | كيف يجعلك السؤال أذكى؟",
    description: "حلقة تشجع الطفل على السؤال والفضول وعدم الخجل من التعلم.",
    lesson: "السؤال الذكي يفتح أبواب الفهم ويزيد الذكاء.",
    ageGroup: "5 - 15 سنة",
    videoId: "yMoOQkj_w7I",
    tags: ["السؤال", "الفضول", "التعلم"],
    events: ["شعور بالحيرة", "طرح السؤال", "البحث عن الجواب", "فهم أعمق"]
  },
  {
    id: "ep7",
    order: 7,
    title: "البطل الحقيقي!",
    fullTitle: "البطل الحقيقي! | الشجاعة في مواجهة المتنمر",
    description: "حلقة تعلم الطفل أن الشجاعة تكون بالحكمة وطلب الدعم.",
    lesson: "البطل الحقيقي يدافع عن نفسه والآخرين بحكمة لا بعنف.",
    ageGroup: "5 - 15 سنة",
    videoId: "HIhdIvg2x5o",
    tags: ["التنمر", "الشجاعة", "الدعم"],
    events: ["موقف تنمر", "خوف أولي", "تصرف شجاع", "طلب المساعدة"]
  },
  {
    id: "ep8",
    order: 8,
    title: "العطاء سر النجاح!",
    fullTitle: "العطاء سر النجاح! | كيف تجعل مساعدة الآخرين طريق نجاحك؟",
    description: "حلقة توضح أن مساعدة الآخرين تزيد الخير والنجاح.",
    lesson: "العطاء يترك أثرًا جميلًا ويصنع نجاحًا حقيقيًا.",
    ageGroup: "5 - 15 سنة",
    videoId: "zevraZmU7oQ",
    tags: ["العطاء", "المساعدة", "النجاح"],
    events: ["موقف يحتاج مساعدة", "لحظة تردد", "مبادرة بالعطاء", "نجاح وسعادة"]
  },
  {
    id: "ep9",
    order: 9,
    title: "الصديق الحقيقي!",
    fullTitle: "الصديق الحقيقي! | لماذا العزلة تُفقدنا السعادة؟",
    description: "حلقة تؤكد قيمة الصداقة الصحية وأثرها في السعادة.",
    lesson: "الصديق الحقيقي يشارك الخير ويخفف الحزن.",
    ageGroup: "5 - 15 سنة",
    videoId: "aZEpFYTntWg",
    tags: ["الصداقة", "السعادة", "الدعم"],
    events: ["الشعور بالوحدة", "البحث عن صديق", "المشاركة", "استعادة السعادة"]
  },
  {
    id: "ep10",
    order: 10,
    title: "السرقة تبدأ بخطوة صغيرة",
    fullTitle: "السرقة تبدأ بخطوة صغيرة! | السرقة تبدأ بالاستهانة؟",
    description: "حلقة تبين أن الخطأ الصغير إذا أُهمل قد يكبر ويؤذي صاحبه.",
    lesson: "الأمانة تبدأ من التفاصيل الصغيرة والرجوع عن الخطأ شجاعة.",
    ageGroup: "5 - 15 سنة",
    videoId: "NQmDF48wPQc",
    tags: ["الأمانة", "المسؤولية", "الخطأ"],
    events: ["استهانة بخطأ", "تكرار الخطأ", "اكتشاف العاقبة", "العودة إلى الأمانة"]
  },
  {
    id: "ep11",
    order: 11,
    title: "الصدق سفينة النجاة",
    fullTitle: "الصدق سفينة النجاة | هل أنت شجاع؟",
    description: "حلقة تربط بين الشجاعة والصدق وتوضح أن الحقيقة تنقذ الإنسان.",
    lesson: "الشجاعة الحقيقية هي قول الصدق وتحمل الموقف.",
    ageGroup: "5 - 15 سنة",
    videoId: "T90Boeow3Gc",
    tags: ["الصدق", "الشجاعة", "النجاة"],
    events: ["موقف صعب", "تردد", "قول الحقيقة", "راحة ونجاة"]
  },
  {
    id: "ep12",
    order: 12,
    title: "الصفر الحقيقي!",
    fullTitle: "الصفر الحقيقي! | لماذا يدمّر الغش مستقبلك؟",
    description: "حلقة تشرح أن الغش لا يصنع نجاحًا حقيقيًا.",
    lesson: "النجاح الحقيقي يبنى على الأمانة والاجتهاد لا على الغش.",
    ageGroup: "5 - 15 سنة",
    videoId: "u81CB7GWXOQ",
    tags: ["الغش", "الأمانة", "المستقبل"],
    events: ["إغراء الغش", "كشف الخطر", "اختيار الصدق", "النجاح الحقيقي"]
  },
  {
    id: "ep13",
    order: 13,
    title: "سر العباقرة!",
    fullTitle: "سر العباقرة! | هل النجاح بالذكاء أم بالاجتهاد؟",
    description: "حلقة تبين أن الاجتهاد والمثابرة أساس النجاح.",
    lesson: "المواظبة تصنع التفوق أكثر من الموهبة غير المستثمرة.",
    ageGroup: "5 - 15 سنة",
    videoId: "F1Z4WUZjqjE",
    tags: ["الاجتهاد", "المثابرة", "النجاح"],
    events: ["سؤال عن النجاح", "مقارنة الذكاء بالاجتهاد", "التدريب", "النتيجة"]
  },
  {
    id: "ep14",
    order: 14,
    title: "الطاولة الحزينة!",
    fullTitle: "الطاولة الحزينة! | لماذا نحافظ على ممتلكات المدرسة؟",
    description: "حلقة تربط احترام ممتلكات المدرسة بالمسؤولية والأمانة.",
    lesson: "المحافظة على ممتلكات المدرسة دليل احترام للمكان وللجميع.",
    ageGroup: "5 - 15 سنة",
    videoId: "q1nXsA7tjQo",
    tags: ["الممتلكات", "المدرسة", "المسؤولية"],
    events: ["إهمال الطاولة", "الحزن", "اكتشاف الخطأ", "المحافظة على الممتلكات"]
  },
  {
    id: "ep15",
    order: 15,
    title: "شرارة الغضب!",
    fullTitle: "شرارة الغضب! | كيف أتحكم في غضبي؟",
    description: "حلقة تعلم الطفل كيف يهدأ ويتصرف بعقل عند الغضب.",
    lesson: "ضبط الغضب يبدأ بالتوقف والهدوء واختيار الرد المناسب.",
    ageGroup: "5 - 15 سنة",
    videoId: "W9vtVrT0p6o",
    tags: ["الغضب", "الهدوء", "التحكم"],
    events: ["بداية الغضب", "ملاحظة الشرارة", "التهدئة", "التحكم في الرد"]
  },
  {
    id: "ep16",
    order: 16,
    title: "الكلمة الجارحة!",
    fullTitle: "الكلمة الجارحة! | لماذا تؤذي الغيبة قلوبنا؟",
    description: "حلقة تناقش أثر الغيبة والكلام المؤذي على القلوب والعلاقات.",
    lesson: "الكلمة الطيبة تحفظ القلوب، أما الجارحة فتؤذي الثقة.",
    ageGroup: "5 - 15 سنة",
    videoId: "cNSjX1uNJa0",
    tags: ["الكلمة الطيبة", "القلوب", "الصداقة"],
    events: ["قول كلمة جارحة", "حزن القلوب", "فهم الأثر", "اختيار الكلام الطيب"]
  },
  {
    id: "ep17",
    order: 17,
    title: "الشكوى الذكية!",
    fullTitle: "الشكوى الذكية! | متى أشتكي ومتى أتحمّل؟",
    description: "حلقة تعلم الفرق بين الشكوى المفيدة والتذمر غير النافع.",
    lesson: "التصرف الذكي هو اختيار الوقت والطريقة الصحيحة لطلب المساعدة.",
    ageGroup: "5 - 15 سنة",
    videoId: "OtENBf7QhDw",
    tags: ["الشكوى", "الحكمة", "المساعدة"],
    events: ["حدوث مشكلة", "التفكير", "طلب المساعدة", "حل المشكلة"]
  },
  {
    id: "ep18",
    order: 18,
    title: "الغابة العجيبة!",
    fullTitle: "الغابة العجيبة! | سر التركيز والتفوق في المدرسة",
    description: "حلقة تربط بين التركيز وإبعاد المشتتات والتفوق الدراسي.",
    lesson: "التركيز مهارة يمكن تدريبها بالهدوء وتحديد الهدف.",
    ageGroup: "5 - 15 سنة",
    videoId: "taG-WtEk6S8",
    tags: ["التركيز", "المدرسة", "المشتتات"],
    events: ["دخول الغابة", "ظهور المشتتات", "اختيار الهدوء", "الوصول إلى التفوق"]
  },
  {
    id: "ep19",
    order: 19,
    title: "وداعًا مدرستي؟!",
    fullTitle: "وداعًا مدرستي؟! | كيف نتغلب على كره المدرسة ونحب التعلم",
    description: "حلقة تعالج مشاعر كره المدرسة وتربطها بالتعلم والصداقة.",
    lesson: "حب التعلم يبدأ حين نرى المدرسة مكانًا للنمو والرفقة.",
    ageGroup: "5 - 15 سنة",
    videoId: "FFnI_0NCeK4",
    tags: ["المدرسة", "التعلم", "الأصدقاء"],
    events: ["الشعور بالضيق", "النقاش", "اكتشاف فوائد المدرسة", "تغيير النظرة"]
  },
  {
    id: "ep20",
    order: 20,
    title: "الخطة السرّية قبل الامتحان",
    fullTitle: "الخطة السرّية قبل الامتحان! | هل تنجح طريقة 30-5-30؟",
    description: "حلقة تركز على الاستعداد للامتحان بخطة ذكية وتنظيم المذاكرة.",
    lesson: "النجاح يحتاج خطة واضحة ومراجعة هادئة وثقة بالنفس.",
    ageGroup: "5 - 15 سنة",
    videoId: "mGc1inOFPaY",
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

function createDragDropGame(episode: SeedEpisode): SeedGame {
  const ordered = episode.events.slice(0, 4);
  const shuffled = [...ordered].reverse();

  return {
    id: `${episode.id}-g1`,
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

function createMemoryGame(episode: SeedEpisode): SeedGame {
  const entries = episode.tags.slice(0, 3).flatMap((tag) => [tag, tag]);

  return {
    id: `${episode.id}-g2`,
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

function createArcadeGame(episode: SeedEpisode): SeedGame {
  return {
    id: `${episode.id}-g3`,
    type: "arcadeCatch",
    title: `مغامرة ${episode.title}`,
    prompt: `قد راشد أو سارة والتقط عناصر ${episode.tags[0] || "النجاح"} وتجنب العناصر الخاطئة.`,
    difficulty: "medium",
    points: 25,
    data: {
      catcher: {
        playerLabel: episode.order % 2 === 0 ? "راشد" : "سارة",
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

function createWordPuzzleGame(episode: SeedEpisode): SeedGame {
  const answer = pickKeyword(episode.title, episode.tags);

  return {
    id: `${episode.id}-g4`,
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

function createDecisionGame(episode: SeedEpisode): SeedGame {
  const focusTag = episode.tags[0] || "الخير";

  return {
    id: `${episode.id}-g5`,
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

function createEpisode(item: (typeof episodeCatalog)[number]): SeedEpisode {
  const episode: SeedEpisode = {
    id: item.id,
    order: item.order,
    title: item.title,
    fullTitle: item.fullTitle,
    description: item.description,
    lesson: item.lesson,
    ageGroup: item.ageGroup,
    videoId: item.videoId,
    thumbnailUrl: `https://i.ytimg.com/vi/${item.videoId}/hqdefault.jpg`,
    tags: item.tags,
    events: item.events,
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

export const seedEpisodes: SeedEpisode[] = episodeCatalog
  .map(createEpisode)
  .sort((first, second) => first.order - second.order);