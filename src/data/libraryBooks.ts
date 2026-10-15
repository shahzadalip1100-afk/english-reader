/**
 * Digital Library Books Data & Storage Engine
 * Comprehensive curated English-Urdu books with multi-page chapters,
 * front page covers, full Urdu translations, and download support.
 */

export interface BookChapter {
  pageNumber: number;
  title: string;
  urduTitle: string;
  contentEnglish: string;
  contentUrdu: string;
  sentences: {
    id: string;
    english: string;
    urdu: string;
  }[];
}

export interface LibraryBook {
  id: string;
  title: string;
  urduTitle: string;
  author: string;
  authorUrdu: string;
  category: 'grammar' | 'spoken' | 'stories' | 'phonics' | 'science' | 'school' | 'custom';
  categoryLabelEng: string;
  categoryLabelUrdu: string;
  coverImage?: string; // Image URL or Base64
  coverTheme: 'royal-blue' | 'emerald-green' | 'crimson-ruby' | 'golden-amber' | 'deep-indigo' | 'midnight-space' | 'violet-purple';
  description: string;
  descriptionUrdu: string;
  pagesCount: number;
  fileSize: string;
  fileType: 'PDF' | 'Illustrated eBook' | 'Course Book' | 'Document';
  rating: number;
  level: 'Beginner' | 'Elementary' | 'Intermediate' | 'All Ages';
  publishedYear: string;
  featured?: boolean;
  isUserUploaded?: boolean;
  uploadedAt?: string;
  originalFileName?: string;
  fileDataUrl?: string; // For downloading uploaded file
  chapters: BookChapter[];
}

export const PRELOADED_BOOKS: LibraryBook[] = [
  {
    id: 'book-grammar-12-tenses',
    title: 'Complete English Grammar & 12 Tenses Handbook',
    urduTitle: 'مکمل انگلش گرامر اور تمام ۱۲ ٹینسز گائیڈ مع اردو تفہیم',
    author: 'Oxford Grammar & Language Institute',
    authorUrdu: 'آکسفورڈ گرامر اینڈ لینگویج انسٹیٹیوٹ',
    category: 'grammar',
    categoryLabelEng: 'Grammar & Tenses',
    categoryLabelUrdu: 'انگلش گرامر و ٹینسز',
    coverTheme: 'royal-blue',
    coverImage: '/src/assets/images/app_hero_reading_1791978753855.jpg',
    description: 'Master all 12 English tenses, active/passive voice, sentence formulas, and daily usage rules with clear Urdu explanations and examples.',
    descriptionUrdu: 'تمام ۱۲ ٹینسز، جملوں کی بناوٹ، امدادی افعال اور روزمرہ بول چال کے بنیادی اصول و ضوابط آسان اور سلیس اردو میں۔',
    pagesCount: 12,
    fileSize: '4.8 MB',
    fileType: 'PDF',
    rating: 5.0,
    level: 'Beginner',
    publishedYear: '2026 Edition',
    featured: true,
    chapters: [
      {
        pageNumber: 1,
        title: 'Present Simple Tense (فعل حال مطلق)',
        urduTitle: 'سبق ۱: پریزنٹ سمپل ٹینس کے بنیادی اصول اور پہچان',
        contentEnglish: 'The Present Simple tense is used to describe habits, daily routines, unchanging situations, and general truths. For singular subjects (He, She, It), we add -s or -es to the base verb.',
        contentUrdu: 'پریزنٹ سمپل ٹینس روزمرہ کے معمولات، عادات اور آفاقی سچائیوں کو بیان کرنے کے لیے استعمال ہوتا ہے۔ اردو میں اس کی پہچان کے آخر میں "تا ہے، تی ہے، تے ہیں" آتا ہے۔',
        sentences: [
          { id: 'g1-1', english: 'The sun rises in the east and sets in the west.', urdu: 'سورج مشرق سے طلوع ہوتا ہے اور مغرب میں غروب ہوتا ہے۔' },
          { id: 'g1-2', english: 'He reads an English book every morning.', urdu: 'وہ ہر صبح ایک انگریزی کتاب پڑھتا ہے۔' },
          { id: 'g1-3', english: 'Children go to school with joy and enthusiasm.', urdu: 'بچے خوشی اور جذبے کے ساتھ سکول جاتے ہیں۔' },
          { id: 'g1-4', english: 'She always speaks the truth.', urdu: 'وہ ہمیشہ سچ بولتی ہے۔' },
          { id: 'g1-5', english: 'Water boils at one hundred degrees Celsius.', urdu: 'پانی سو ڈگری سینٹی گریڈ پر ابلتا ہے۔' }
        ]
      },
      {
        pageNumber: 2,
        title: 'Present Continuous Tense (فعل حال جاری)',
        urduTitle: 'سبق ۲: پریزنٹ کنٹینیوئس ٹینس (جاری کاموں کا بیان)',
        contentEnglish: 'The Present Continuous tense describes actions that are happening right now at the moment of speaking. We use is, am, or are followed by the verb ending in -ing.',
        contentUrdu: 'پریزنٹ کنٹینیوئس ٹینس ان کاموں کو ظاہر کرتا ہے جو بولتے وقت جاری ہوں۔ اردو میں اس کی پہچان کے آخر میں "رہا ہے، رہی ہے، رہے ہیں" آتا ہے۔',
        sentences: [
          { id: 'g2-1', english: 'I am reading an interesting book right now.', urdu: 'میں اس وقت ایک دلچسپ کتاب پڑھ رہا ہوں۔' },
          { id: 'g2-2', english: 'The teacher is explaining the lesson clearly.', urdu: 'استاد سبق کو وضاحت کے ساتھ سمجھا رہے ہیں۔' },
          { id: 'g2-3', english: 'The birds are chirping happily in the garden.', urdu: 'باغ میں پرندے خوشی سے چہچہا رہے ہیں۔' },
          { id: 'g2-4', english: 'They are playing football on the green field.', urdu: 'وہ سرسبز میدان میں فٹ بال کھیل رہے ہیں۔' },
          { id: 'g2-5', english: 'The rain is falling softly on the roof.', urdu: 'چھت پر ہلکی ہلکی بارش برس رہی ہے۔' }
        ]
      },
      {
        pageNumber: 3,
        title: 'Present Perfect Tense (فعل حال مکمل)',
        urduTitle: 'سبق ۳: پریزنٹ پرفیکٹ ٹینس (مکمل شدہ کام)',
        contentEnglish: 'We use the Present Perfect tense to show an action that has just finished or has an effect on the present time. We use has or have with the third form of the verb.',
        contentUrdu: 'یہ ٹینس ایسے کام کے لیے استعمال ہوتا ہے جو ماضی میں شروع ہو کر حال ہی میں مکمل ہوا ہو۔ اردو میں اس کے آخر میں "چکا ہے، چکی ہے، چکا ہوں یا لیا ہے" آتا ہے۔',
        sentences: [
          { id: 'g3-1', english: 'I have finished my homework successfully.', urdu: 'میں نے اپنا ہوم ورک کامیابی سے مکمل کر لیا ہے۔' },
          { id: 'g3-2', english: 'She has written a beautiful letter to her friend.', urdu: 'اس نے اپنی دوست کو ایک خوبصورت خط لکھا ہے۔' },
          { id: 'g3-3', english: 'We have learned all twelve English tenses.', urdu: 'ہم نے تمام بارہ انگریزی ٹینسز سیکھ لیے ہیں۔' },
          { id: 'g3-4', english: 'The train has just arrived at the railway station.', urdu: 'ٹرین ابھی ریلوے اسٹیشن پر پہنچی ہے۔' }
        ]
      },
      {
        pageNumber: 4,
        title: 'Past Simple Tense (فعل ماضی مطلق)',
        urduTitle: 'سبق ۴: پاسٹ سمپل ٹینس (ماضی کی باتیں)',
        contentEnglish: 'The Past Simple tense describes an action that happened and was completed in the past. We use the second form of the verb for affirmative sentences.',
        contentUrdu: 'پاسٹ سمپل ٹینس ماضی میں مکمل ہونے والے کسی کام کو ظاہر کرتا ہے۔ اردو میں اس کے آخر میں "الف، چھوٹی ی، بڑی ے یا تھا، تھی، تھے" آتا ہے۔',
        sentences: [
          { id: 'g4-1', english: 'Yesterday, we visited the historical Lahore Fort.', urdu: 'کل ہم نے تاریخی شاہی قلعہ لاہور کی سیر کی۔' },
          { id: 'g4-2', english: 'The brave boy helped the blind man cross the road.', urdu: 'بہادر لڑکے نے نابینا شخص کی سڑک پار کرنے میں مدد کی۔' },
          { id: 'g4-3', english: 'The clever fox found fresh food in the forest.', urdu: 'ہوشیار لومڑی نے جنگل میں تازہ خوراک تلاش کر لی۔' },
          { id: 'g4-4', english: 'They won the final trophy in the championship.', urdu: 'انہوں نے چیمپئن شپ میں فائنل ٹرافی جیت لی۔' }
        ]
      },
      {
        pageNumber: 5,
        title: 'Future Simple Tense (فعل مستقبل مطلق)',
        urduTitle: 'سبق ۵: فیوچر سمپل ٹینس (آئندہ کے ارادے)',
        contentEnglish: 'The Future Simple tense expresses actions that will happen in the future. We use will followed by the base form of the verb.',
        contentUrdu: 'فیوچر سمپل ٹینس آئندہ وقت میں ہونے والے کاموں کے لیے استعمال ہوتا ہے۔ اردو میں اس کی پہچان کے آخر میں "گا، گی، گے" آتا ہے۔',
        sentences: [
          { id: 'g5-1', english: 'I will speak fluent English with confidence.', urdu: 'میں اعتماد کے ساتھ روانی سے انگریزی بولوں گا۔' },
          { id: 'g5-2', english: 'We will visit our grandparents this coming Sunday.', urdu: 'ہم آنے والے اتوار کو اپنے دادا دادی سے ملنے جائیں گے۔' },
          { id: 'g5-3', english: 'The government will build new schools for all children.', urdu: 'حکومت تمام بچوں کے لیے نئے اسکول تعمیر کرے گی۔' },
          { id: 'g5-4', english: 'Honesty and hard work will surely bring great success.', urdu: 'دیانت داری اور محنت یقیناً شاندار کامیابی لائے گی۔' }
        ]
      }
    ]
  },
  {
    id: 'book-spoken-1000-dialogues',
    title: '1000 Everyday English-Urdu Spoken Dialogues',
    urduTitle: 'روزمرہ بول چال کے ۱۰۰۰ اہم ترین فقرے مع با محاورہ اردو ترجمہ',
    author: 'Prof. Tariq Mahmood & Language Coaches',
    authorUrdu: 'پروفیسر طارق محمود و ماہرینِ لسانیات',
    category: 'spoken',
    categoryLabelEng: 'Spoken English',
    categoryLabelUrdu: 'روزمرہ انگریزی بول چال',
    coverTheme: 'emerald-green',
    coverImage: '/src/assets/images/story_school_friends_1791978752825.jpg',
    description: 'Instant practical English sentences for conversations at home, school, market, office, airport, and social gatherings.',
    descriptionUrdu: 'گھر، اسکول، بازار، ہسپتال، ہوائی اڈے اور روزمرہ زندگی میں اعتماد سے بولے جانے والے فقروں کا خزانہ۔',
    pagesCount: 15,
    fileSize: '5.2 MB',
    fileType: 'PDF',
    rating: 4.9,
    level: 'All Ages',
    publishedYear: '2026 Edition',
    featured: true,
    chapters: [
      {
        pageNumber: 1,
        title: 'Polite Greetings & First Meetings (شائستہ گفتگو اور تعارف)',
        urduTitle: 'باب ۱: سلام دعا اور باوقار تعارف کے اہم فقرے',
        contentEnglish: 'First impressions matter greatly. Learning how to greet people warmly and introduce yourself with confidence is the first step toward English fluency.',
        contentUrdu: 'پہلی ملاقات کا تاثر ہمیشہ یاد رہتا ہے۔ کسی سے شائستگی اور مسکراہٹ کے ساتھ ملنا اور اپنا تعارف کروانا روانی کا پہلا زینہ ہے۔',
        sentences: [
          { id: 'sp1-1', english: 'Hello! It is a true pleasure to meet you today.', urdu: 'ہیلو! آج آپ سے مل کر مجھے دلی خوشی ہوئی ہے۔' },
          { id: 'sp1-2', english: 'How have you been doing lately?', urdu: 'آج کل آپ کے کیا حالات ہیں؟ / آپ کیسے ہیں؟' },
          { id: 'sp1-3', english: 'May I know your good name, please?', urdu: 'کیا میں آپ کا اسم گرامی جان سکتا ہوں؟' },
          { id: 'sp1-4', english: 'Thank you very much for your wonderful hospitality.', urdu: 'آپ کی شاندار مہمان نوازی کا بہت بہت شکریہ۔' },
          { id: 'sp1-5', english: 'Have a wonderful and blessed day ahead!', urdu: 'آپ کا آگے کا دن بہت ہی شاندار اور بابرکت گزرے!' }
        ]
      },
      {
        pageNumber: 2,
        title: 'Shopping, Market & Asking Prices (بازار اور خریداری)',
        urduTitle: 'باب ۲: شاپنگ، قیمت پوچھنے اور خریداری کے جملے',
        contentEnglish: 'When visiting a store or supermarket, use these polite phrases to inquire about prices, sizes, discounts, and payment methods.',
        contentUrdu: 'جب آپ دکان یا سپر مارکیٹ جائیں تو قیمت پوچھنے، سائز معلوم کرنے اور ادائیگی کے لیے یہ جملے استعمال کریں۔',
        sentences: [
          { id: 'sp2-1', english: 'How much does this beautiful jacket cost?', urdu: 'اس خوبصورت جیکٹ کی قیمت کتنی ہے؟' },
          { id: 'sp2-2', english: 'Do you have this shirt in a medium size?', urdu: 'کیا آپ کے پاس یہ قمیض درمیانے (میڈیم) سائز میں دستیاب ہے؟' },
          { id: 'sp2-3', english: 'Could you please give me a slight discount on this?', urdu: 'کیا آپ مجھے اس پر کچھ رعایت (ڈسکاؤنٹ) دے سکتے ہیں؟' },
          { id: 'sp2-4', english: 'Can I pay through credit card or cash?', urdu: 'کیا میں کریڈٹ کارڈ سے ادائیگی کر سکتا ہوں یا نقد رقم سے؟' },
          { id: 'sp2-5', english: 'Please pack these items nicely in a paper bag.', urdu: 'براہ کرم ان چیزوں کو ایک اچھے کاغذی تھیلے میں پیک کر دیجیے۔' }
        ]
      },
      {
        pageNumber: 3,
        title: 'At the Doctor & Health Care (ڈاکٹر اور علاج معالجہ)',
        urduTitle: 'باب ۳: بیماری اور ڈاکٹر سے بات چیت کے فقرے',
        contentEnglish: 'Explaining physical symptoms clearly helps doctors make an accurate diagnosis. Learn these essential health terms.',
        contentUrdu: 'اپنی بیماری کی علامات کو واضح طور پر بیان کرنا ڈاکٹر کی صحیح تشخیص میں مدد دیتا ہے۔',
        sentences: [
          { id: 'sp3-1', english: 'I have had a severe headache since yesterday morning.', urdu: 'مجھے کل صبح سے شدید سر درد ہو رہا ہے۔' },
          { id: 'sp3-2', english: 'Please take this medicine twice daily after meals.', urdu: 'براہ کرم یہ دوائی دن میں دو بار کھانے کے بعد لیں۔' },
          { id: 'sp3-3', english: 'I am feeling much better now, thank you doctor.', urdu: 'میں اب کافی بہتر محسوس کر رہا ہوں، شکریہ ڈاکٹر صاحب۔' },
          { id: 'sp3-4', english: 'Drink plenty of warm water and take complete rest.', urdu: 'خوب گرم پانی پئیں اور مکمل آرام کریں۔' }
        ]
      }
    ]
  },
  {
    id: 'book-aesop-moral-fables',
    title: "Aesop's Illustrated Moral Fables for Children",
    urduTitle: 'ایسوپ کی تصویری اخلاقی کہانیاں مع سبق آموز اردو ترجمہ',
    author: 'Aesop & Classical Storytellers',
    authorUrdu: 'ایسوپ و قدیم داستان گو',
    category: 'stories',
    categoryLabelEng: 'Moral Stories',
    categoryLabelUrdu: 'بچوں کی اخلاقی کہانیاں',
    coverTheme: 'crimson-ruby',
    coverImage: '/src/assets/images/story_fox_forest_1791978751306.jpg',
    description: 'Timeless illustrated stories featuring animals that teach truth, humility, perseverance, friendship, and wisdom.',
    descriptionUrdu: 'جانوروں کے لازوال اور سبق آموز تصویری قصے جو سچائی، عاجزی، محنت اور دانائی کا درس دیتے ہیں۔',
    pagesCount: 10,
    fileSize: '6.1 MB',
    fileType: 'Illustrated eBook',
    rating: 5.0,
    level: 'Beginner',
    publishedYear: 'Illustrated Classic',
    featured: true,
    chapters: [
      {
        pageNumber: 1,
        title: 'The Tortoise and the Hare (کچھوا اور خرگوش)',
        urduTitle: 'کہانی ۱: تیز رفتار خرگوش اور باہمت کچھوے کا مقابلہ',
        contentEnglish: 'Once upon a time, a proud hare laughed at a slow-moving tortoise. The tortoise challenged the hare to a race across the green meadow. The hare ran fast and then fell asleep under a leafy tree. The steady tortoise kept walking step by step and won the race.',
        contentUrdu: 'ایک دفعہ کا ذکر ہے کہ ایک مغرور خرگوش نے آہستہ چلنے والے کچھوے کا مذاق اڑایا۔ کچھوے نے خرگوش کو دوڑ کا چیلنج دیا۔ خرگوش تیزی سے بھاگا اور درخت کے سائے میں سو گیا۔ کچھوا مسلسل چلتا رہا اور دوڑ جیت گیا۔',
        sentences: [
          { id: 'aes1-1', english: 'A proud hare boasted about how fast he could run.', urdu: 'ایک مغرور خرگوش اپنی تیز رفتاری پر فخر کیا کرتا تھا۔' },
          { id: 'aes1-2', english: 'The wise tortoise smiled and said, "Let us have a race."', urdu: 'دانا کچھوے نے مسکرا کر کہا، "آؤ ہم ایک دوڑ کا مقابلہ کرتے ہیں۔"' },
          { id: 'aes1-3', english: 'The hare took a nap, confident of his easy victory.', urdu: 'خرگوش اپنی آسان جیت پر پُراعتماد ہو کر نیند کی آغوش میں چلا گیا۔' },
          { id: 'aes1-4', english: 'Step by step, the determined tortoise reached the finish line.', urdu: 'قدم بہ قدم چلتے ہوئے باہمت کچھوا اختتامی لکیر تک پہنچ گیا۔' },
          { id: 'aes1-5', english: 'Moral: Slow and steady wins the race.', urdu: 'اخلاقی سبق: مستقل مزاجی اور مسلسل محنت ہی کامیابی کی ضمانت ہے۔' }
        ]
      },
      {
        pageNumber: 2,
        title: 'The Thirsty Crow (پیاسا کوا)',
        urduTitle: 'کہانی ۲: عقلمند پیاسا کوا اور گھڑے کا پانی',
        contentEnglish: 'On a hot summer afternoon, a thirsty crow searched everywhere for water. Finally, he spotted a tall clay pitcher with only a little water at the bottom. His beak could not reach the water. Thinking smartly, he picked small pebbles one by one and dropped them into the pitcher until the water rose to the brim.',
        contentUrdu: 'گرمیوں کی تپتی دوپہر میں ایک پیاسا کوا پانی کی تلاش میں اڑ رہا تھا۔ اسے مٹی کا ایک گھڑا ملا جس کی تہہ میں تھوڑا سا پانی تھا۔ کوے نے اپنی عقل کا استعمال کیا اور ایک ایک کر کے کنکر گھڑے میں ڈالے یہاں تک کہ پانی اوپر آگیا۔',
        sentences: [
          { id: 'aes2-1', english: 'A thirsty crow looked for water on a very hot day.', urdu: 'ایک پیاسا کوا شدید گرمی کے دن پانی تلاش کر رہا تھا۔' },
          { id: 'aes2-2', english: 'He found a pitcher, but the water was too low for his beak.', urdu: 'اسے ایک گھڑا ملا، مگر پانی اتنا نیچے تھا کہ اس کی چونچ نہ پہنچ سکی۔' },
          { id: 'aes2-3', english: 'He collected small pebbles and dropped them into the pot.', urdu: 'اس نے چھوٹے چھوٹے کنکر جمع کیے اور انہیں برتن میں گرایا۔' },
          { id: 'aes2-4', english: 'The water rose high, and the clever bird drank happily.', urdu: 'پانی اوپر چڑھ آیا، اور عقلمند پرندے نے جی بھر کر پانی پیا۔' },
          { id: 'aes2-5', english: 'Moral: Where there is a will, there is a way.', urdu: 'اخلاقی سبق: جہاں چاہ، وہاں راہ (محنت اور عقل ہر مشکل کو حل کر دیتی ہے)۔' }
        ]
      }
    ]
  },
  {
    id: 'book-phonics-sight-words',
    title: 'English Phonics & Sight Words Illustrated Masterclass',
    urduTitle: 'انگلش فونیکس اور بنیادی الفاظ کا تصویری قاعدہ مع درست تلفظ',
    author: 'Cambridge Early Reading Foundation',
    authorUrdu: 'کیمبرج ارلی ریڈنگ فاؤنڈیشن',
    category: 'phonics',
    categoryLabelEng: 'Phonics & Reading',
    categoryLabelUrdu: 'فونیکس و تلفظ کا قاعدہ',
    coverTheme: 'golden-amber',
    coverImage: '/src/assets/images/story_golden_stars_1791978754021.jpg',
    description: 'A complete step-by-step phonics reader teaching letters, vowel blends (sh, ch, th, ph), and 200 key sight words with Urdu phonetic spellings.',
    descriptionUrdu: 'حروف تہجی، حرفی آوازوں، جڑواں آوازوں (sh, ch, th) اور روزمرہ کے بنیادی انگریزی الفاظ کا تصویری گائیڈ۔',
    pagesCount: 8,
    fileSize: '3.9 MB',
    fileType: 'PDF',
    rating: 4.9,
    level: 'Beginner',
    publishedYear: '2026 Edition',
    chapters: [
      {
        pageNumber: 1,
        title: 'Short Vowels: A, E, I, O, U (مختصر مصوتی آوازیں)',
        urduTitle: 'سبق ۱: انگریزی حروف کی مختصر آوازیں اور الفاظ',
        contentEnglish: 'Vowels are the heart of the English language. Every English word must have at least one vowel sound. Learn how Cat, Bed, Pin, Top, and Sun sound clearly.',
        contentUrdu: 'حروف علت (Vowels) انگریزی زبان کی روح ہیں۔ ہر انگریزی لفظ میں کم از کم ایک واؤل کی آواز کا ہونا لازمی ہے۔',
        sentences: [
          { id: 'ph1-1', english: 'A is for Apple, crisp and red.', urdu: 'A سے Apple (سیب)، خستہ اور سرخ۔' },
          { id: 'ph1-2', english: 'E is for Elephant, big and kind.', urdu: 'E سے Elephant (ہاتھی)، بڑا اور مہربان۔' },
          { id: 'ph1-3', english: 'I is for Igloo, made of ice.', urdu: 'I سے Igloo (برف کا گھر)، برف سے بنا ہوا۔' },
          { id: 'ph1-4', english: 'O is for Orange, juicy and sweet.', urdu: 'O سے Orange (مالٹا)، رس بھرا اور میٹھا۔' },
          { id: 'ph1-5', english: 'U is for Umbrella, keeping us dry.', urdu: 'U سے Umbrella (چھتری)، جو ہمیں بارش میں خشک رکھتی ہے۔' }
        ]
      },
      {
        pageNumber: 2,
        title: 'Consonant Digraphs: SH, CH, TH, WH (مرکب آوازیں)',
        urduTitle: 'سبق ۲: مرکب حروف کی مشترکہ آوازیں',
        contentEnglish: 'When two letters join together to make a single new sound, we call it a digraph. SH sounds like "ش", CH sounds like "چ", and TH sounds like "تھ" or "د".',
        contentUrdu: 'جب دو حروف مل کر ایک نئی منفرد آواز بنائیں تو اسے ڈائیگراف کہتے ہیں، جیسے SH سے ش اور CH سے چ کی آواز نکلتی ہے۔',
        sentences: [
          { id: 'ph2-1', english: 'The ship sails smoothly on the blue sea.', urdu: 'بحری جہاز نیلے سمندر پر روانی سے تیرتا ہے۔' },
          { id: 'ph2-2', english: 'Children smile with cheerful bright faces.', urdu: 'بچے خوش و خرم اور چمکتے ہوئے چہروں سے مسکراتے ہیں۔' },
          { id: 'ph2-3', english: 'We thank our generous Creator every single day.', urdu: 'ہم ہر ایک دن اپنے سخی خالق کا شکر ادا کرتے ہیں۔' },
          { id: 'ph2-4', english: 'The white bird flies across the blue sky.', urdu: 'سفید پرندہ نیلے آسمان پر اڑتا ہے۔' }
        ]
      }
    ]
  },
  {
    id: 'book-junior-science-wonders',
    title: 'The Young Scientist: Wonders of Nature & Space',
    urduTitle: 'چھوٹا سائنسدان: نظام شمسی اور قدرت کے عجائبات',
    author: 'National Geographic Junior Science Team',
    authorUrdu: 'نیشنل جیوگرافک جونیئر سائنس ٹیم',
    category: 'science',
    categoryLabelEng: 'Science & Nature',
    categoryLabelUrdu: 'سائنس اور قدرت کے کمالات',
    coverTheme: 'midnight-space',
    coverImage: '/src/assets/images/story_golden_stars_1791978754021.jpg',
    description: 'Fascinating simple science facts about planets, the water cycle, living cells, and ocean life for young curious minds.',
    descriptionUrdu: 'سورج، چاند، سیاروں، بارش کے چکر اور سمندری مخلوقات کے بارے میں حیرت انگیز سائنسی معلومات آسان زبان میں۔',
    pagesCount: 11,
    fileSize: '5.6 MB',
    fileType: 'PDF',
    rating: 5.0,
    level: 'Intermediate',
    publishedYear: '2026 Edition',
    chapters: [
      {
        pageNumber: 1,
        title: 'The Solar System & Our Glowing Sun (ہمارا نظام شمسی)',
        urduTitle: 'باب ۱: سورج، زمین اور خلائی سیاروں کی کہانی',
        contentEnglish: 'Our Solar System consists of our shining Sun and eight planets orbiting around it. Earth is the third planet from the Sun and the only known home to living beings.',
        contentUrdu: 'ہمارا نظام شمسی ایک روشن سورج اور اس کے گرد گھومنے والے آٹھ سیاروں پر مشتمل ہے۔ زمین سورج سے تیسرا سیارہ ہے اور جانداروں کا واحد گھر ہے۔',
        sentences: [
          { id: 'sc1-1', english: 'The Sun gives us bright light and warm energy.', urdu: 'سورج ہمیں چمکدار روشنی اور زندگی بخش حرارت دیتا ہے۔' },
          { id: 'sc1-2', english: 'Earth takes three hundred sixty-five days to orbit the Sun.', urdu: 'زمین سورج کے گرد اپنا چکر تین سو پینسٹھ دنوں میں پورا کرتی ہے۔' },
          { id: 'sc1-3', english: 'The Moon shines brightly by reflecting sunlight at night.', urdu: 'چاند رات کے وقت سورج کی روشنی کو منعکس کر کے چمکتا ہے۔' },
          { id: 'sc1-4', english: 'Millions of twinkling stars fill the dark night sky.', urdu: 'لاکھوں چمکتے ہوئے ستارے تاریک رات کے آسمان کو جگمگاتے ہیں۔' }
        ]
      }
    ]
  },
  {
    id: 'book-primary-school-course',
    title: 'Primary School English Reader (Classes 3 to 5)',
    urduTitle: 'پرائمری سکول انگلش کورس بک مع مکمل اردو حل اور مشقیں',
    author: 'Textbook Curriculum & Board of Education',
    authorUrdu: 'پنجاب و قومی نصاب تعلیم بورڈ',
    category: 'school',
    categoryLabelEng: 'School Syllabus',
    categoryLabelUrdu: 'سکول کا درسی نصاب',
    coverTheme: 'deep-indigo',
    coverImage: '/src/assets/images/story_school_friends_1791978752825.jpg',
    description: 'Official standard school reading lessons with vocabulary questions, comprehension passages, and Urdu translations.',
    descriptionUrdu: 'سکول کے تیسری تا پانچویں جماعت کے امتحانی اسباق، پیراگراف اور ان کے مکمل اردو تراجم و سوال جواب۔',
    pagesCount: 14,
    fileSize: '4.5 MB',
    fileType: 'Course Book',
    rating: 4.8,
    level: 'Elementary',
    publishedYear: 'Syllabus 2026',
    chapters: [
      {
        pageNumber: 1,
        title: 'My Role Model Quaid-e-Azam (قائد اعظم محمد علی جناح)',
        urduTitle: 'سبق ۱: ہمارے عظیم قائد کی محنت، دیانت اور بصیرت',
        contentEnglish: 'Quaid-e-Azam Muhammad Ali Jinnah is the founding father of Pakistan. Through his unmatched dedication, honesty, and peaceful constitutional struggle, he gained an independent homeland for Muslims.',
        contentUrdu: 'قائد اعظم محمد علی جناح بانی پاکستان ہیں۔ انہوں نے اپنی بے مثال لگن، دیانت اور پرامن آئینی جدوجہد سے مسلمانوں کے لیے ایک آزاد وطن حاصل کیا۔',
        sentences: [
          { id: 'sch1-1', english: 'Quaid-e-Azam believed firmly in Unity, Faith, and Discipline.', urdu: 'قائد اعظم اتحاد، ایمان اور تنظیم کے اصولوں پر پختہ یقین رکھتے تھے۔' },
          { id: 'sch1-2', english: 'He worked day and night without caring for his health.', urdu: 'انہوں نے اپنی صحت کی پروا کیے بغیر دن رات محنت کی۔' },
          { id: 'sch1-3', english: 'We must follow his golden principles to make our country prosperous.', urdu: 'ہمیں اپنے ملک کو خوشحال بنانے کے لیے ان کے سنہری اصولوں پر عمل کرنا چاہیے۔' }
        ]
      }
    ]
  }
];

const STORAGE_KEY = 'kids_reader_library_books_v1';

export function getStoredLibraryBooks(): LibraryBook[] {
  if (typeof window === 'undefined') return PRELOADED_BOOKS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return PRELOADED_BOOKS;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      // Merge user custom books first, then preloaded
      const customOnes = parsed.filter((b: LibraryBook) => b.isUserUploaded);
      return [...customOnes, ...PRELOADED_BOOKS];
    }
  } catch (err) {
    console.error('Failed to load custom library books from storage', err);
  }
  return PRELOADED_BOOKS;
}

export function saveCustomLibraryBook(book: LibraryBook): LibraryBook[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    let existing: LibraryBook[] = [];
    if (raw) {
      try {
        existing = JSON.parse(raw);
      } catch (e) {
        existing = [];
      }
    }
    // Filter out if duplicate ID
    const updated = [book, ...existing.filter(b => b.id !== book.id)];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return [book, ...getStoredLibraryBooks().filter(b => b.id !== book.id)];
  } catch (err) {
    console.error('Failed to save library book', err);
    return getStoredLibraryBooks();
  }
}

export function deleteCustomLibraryBook(bookId: string): void {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const existing: LibraryBook[] = JSON.parse(raw);
    const updated = existing.filter(b => b.id !== bookId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to delete library book', err);
  }
}

/**
 * Downloads a book to user's computer:
 * 1. If it has a real fileDataUrl (e.g. uploaded PDF or document), triggers immediate native download of that file.
 * 2. If it's a digital eBook, compiles a clean, readable, print-ready HTML/PDF format with front page cover,
 *    chapters, English sentences and Urdu translations.
 */
export function downloadBookFile(book: LibraryBook): void {
  if (book.fileDataUrl) {
    const link = document.createElement('a');
    link.href = book.fileDataUrl;
    link.download = book.originalFileName || `${book.title.replace(/\s+/g, '_')}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return;
  }

  // Generate a formatted printable eBook document with Urdu Nastaliq font styling
  const bookHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${book.title} - Kids English Reader</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;700&family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap');
    body {
      font-family: 'Plus Jakarta Sans', sans-serif;
      margin: 0;
      padding: 30px;
      color: #1e293b;
      background: #ffffff;
      line-height: 1.6;
    }
    .cover {
      text-align: center;
      padding: 60px 20px;
      border: 6px double #334155;
      border-radius: 20px;
      margin-bottom: 50px;
      background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
      page-break-after: always;
    }
    .cover h1 {
      font-size: 32px;
      color: #0f172a;
      margin-bottom: 12px;
    }
    .cover h2 {
      font-family: 'Noto Nastaliq Urdu', serif;
      font-size: 24px;
      color: #b45309;
      margin-bottom: 20px;
      direction: rtl;
    }
    .cover .author {
      font-size: 16px;
      color: #475569;
      margin-top: 30px;
      font-weight: 600;
    }
    .chapter {
      margin-bottom: 40px;
      padding-bottom: 30px;
      border-bottom: 2px dashed #cbd5e1;
      page-break-inside: avoid;
    }
    .chapter-title {
      font-size: 22px;
      color: #1e40af;
      margin-bottom: 6px;
    }
    .chapter-urdu-title {
      font-family: 'Noto Nastaliq Urdu', serif;
      font-size: 18px;
      color: #b45309;
      direction: rtl;
      margin-bottom: 16px;
    }
    .sentence-card {
      margin-bottom: 14px;
      padding: 12px 16px;
      background: #f8fafc;
      border-left: 4px solid #3b82f6;
      border-radius: 8px;
    }
    .sentence-english {
      font-size: 17px;
      font-weight: 700;
      color: #0f172a;
      margin-bottom: 6px;
    }
    .sentence-urdu {
      font-family: 'Noto Nastaliq Urdu', serif;
      font-size: 15px;
      color: #334155;
      direction: rtl;
      line-height: 1.9;
    }
  </style>
</head>
<body>
  <div class="cover">
    <div style="font-size: 14px; text-transform: uppercase; letter-spacing: 2px; color: #4338ca; font-weight: 700; margin-bottom: 15px;">
      Kids English-Urdu Digital Library Edition
    </div>
    <h1>${book.title}</h1>
    <h2>${book.urduTitle}</h2>
    <p style="font-size: 16px; color: #475569; max-width: 600px; margin: 0 auto 20px;">${book.description}</p>
    <div class="author">
      Author / ادارہ تحریر: ${book.author} (${book.authorUrdu})
    </div>
    <div style="margin-top: 15px; font-size: 13px; color: #64748b;">
      Total Pages: ${book.chapters.length} · Level: ${book.level} · Downloaded from Kids English Reader
    </div>
  </div>

  ${book.chapters.map(ch => `
    <div class="chapter">
      <div class="chapter-title">Page ${ch.pageNumber}: ${ch.title}</div>
      <div class="chapter-urdu-title">${ch.urduTitle}</div>
      <p style="font-size: 15px; color: #334155; margin-bottom: 16px;">${ch.contentEnglish}</p>
      <p style="font-family: 'Noto Nastaliq Urdu', serif; font-size: 14px; color: #64748b; direction: rtl; margin-bottom: 20px;">${ch.contentUrdu}</p>
      
      <div style="margin-top: 15px;">
        ${ch.sentences.map(s => `
          <div class="sentence-card">
            <div class="sentence-english">${s.english}</div>
            <div class="sentence-urdu">${s.urdu}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('')}
</body>
</html>`;

  const blob = new Blob([bookHtml], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${book.title.replace(/[^a-zA-Z0-9]/g, '_')}_Complete_Book.html`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}
