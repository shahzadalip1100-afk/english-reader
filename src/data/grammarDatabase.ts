/**
 * 100 English Grammar & Spoken Topics Definition
 * Includes 12 Tenses, Daily Spoken Dialogues, and Full Grammar Spectrum.
 */

export type GrammarCategory = 
  | 'tenses' 
  | 'spoken' 
  | 'parts-of-speech' 
  | 'prepositions' 
  | 'articles' 
  | 'sentence-structure' 
  | 'voice-narration' 
  | 'conditionals' 
  | 'advanced';

export interface GrammarTopicMeta {
  id: number;
  title: string;
  urduTitle: string;
  category: GrammarCategory;
  categoryUrdu: string;
  difficulty: 'Easy' | 'Medium' | 'Challenge';
  descriptionUrdu: string;
  descriptionEng: string;
  badgeColor: string;
  ruleUrdu: string;
}

export const GRAMMAR_TOPICS_100: GrammarTopicMeta[] = [
  // ==========================================
  // 12 TENSES GAMES (تمام 12 ٹینسز - گیم 1 تا 12)
  // ==========================================
  {
    id: 1,
    title: 'Game 1: Present Simple Tense',
    urduTitle: 'گیم 1: فعل حال مطلق (Present Simple Tense)',
    category: 'tenses',
    categoryUrdu: '12 ٹینسز گیمز',
    difficulty: 'Easy',
    descriptionEng: 'Master daily habits, general facts, and s/es rules with He/She/It.',
    descriptionUrdu: 'روزمرہ عادات، عالمگیر سچائیاں اور He/She/It کے ساتھ s/es کے قواعد۔',
    badgeColor: 'bg-indigo-600',
    ruleUrdu: 'فعل کی پہلی فارم استعمال ہوتی ہے۔ واحد فاعل (He, She, It) کے ساتھ فعل میں s یا es کا اضافہ ہوتا ہے۔'
  },
  {
    id: 2,
    title: 'Game 2: Present Continuous Tense',
    urduTitle: 'گیم 2: فعل حال جاری (Present Continuous Tense)',
    category: 'tenses',
    categoryUrdu: '12 ٹینسز گیمز',
    difficulty: 'Easy',
    descriptionEng: 'Actions happening right now using Is, Am, Are + Verb-ing.',
    descriptionUrdu: 'اس وقت جاری کام: Is, Am, Are کے بعد پہلی فارم کے ساتھ -ing لگانا۔',
    badgeColor: 'bg-indigo-600',
    ruleUrdu: 'I کے ساتھ am، واحد فاعل کے ساتھ is اور جمع کے ساتھ are لگا کر فعل میں -ing لگایا جاتا ہے۔'
  },
  {
    id: 3,
    title: 'Game 3: Present Perfect Tense',
    urduTitle: 'گیم 3: فعل حال مکمل (Present Perfect Tense)',
    category: 'tenses',
    categoryUrdu: '12 ٹینسز گیمز',
    difficulty: 'Medium',
    descriptionEng: 'Completed actions with present result using Has/Have + 3rd form.',
    descriptionUrdu: 'کام جو مکمل ہو چکا ہو: Has/Have کے ساتھ فعل کی تیسری فارم (3rd Form)۔',
    badgeColor: 'bg-indigo-600',
    ruleUrdu: 'He, She, It کے ساتھ has اور I, We, You, They کے ساتھ have لگا کر فعل کی تیسری فارم استعمال کریں۔'
  },
  {
    id: 4,
    title: 'Game 4: Present Perfect Continuous Tense',
    urduTitle: 'گیم 4: فعل حال مکمل جاری (Present Perfect Continuous)',
    category: 'tenses',
    categoryUrdu: '12 ٹینسز گیمز',
    difficulty: 'Medium',
    descriptionEng: 'Actions started in the past and still continuing with Since & For.',
    descriptionUrdu: 'ماضی سے جاری کام: Has been / Have been + -ing کے ساتھ Since اور For کا درست استعمال۔',
    badgeColor: 'bg-indigo-600',
    ruleUrdu: 'مقررہ وقت (صبح، 2 بجے) کے لیے Since اور دورانیے (دو گھنٹے، تین دن) کے لیے For آتا ہے۔'
  },
  {
    id: 5,
    title: 'Game 5: Past Simple Tense',
    urduTitle: 'گیم 5: فعل ماضی مطلق (Past Simple Tense)',
    category: 'tenses',
    categoryUrdu: '12 ٹینسز گیمز',
    difficulty: 'Easy',
    descriptionEng: 'Finished past actions using 2nd form of verbs (Went, Saw, Played).',
    descriptionUrdu: 'گزرے ہوئے وقت کی بات: فعل کی دوسری فارم (2nd Form) اور سوالیہ/منفی میں Did۔',
    badgeColor: 'bg-indigo-600',
    ruleUrdu: 'مثبت جملوں میں صرف 2nd Form آتی ہے۔ منفی اور سوالیہ میں Did کے بعد ہمیشہ 1st Form لگتی ہے۔'
  },
  {
    id: 6,
    title: 'Game 6: Past Continuous Tense',
    urduTitle: 'گیم 6: فعل ماضی جاری (Past Continuous Tense)',
    category: 'tenses',
    categoryUrdu: '12 ٹینسز گیمز',
    difficulty: 'Easy',
    descriptionEng: 'Actions continuing at a point in the past with Was/Were + -ing.',
    descriptionUrdu: 'ماضی میں جاری کام: Was/Were کے ساتھ فعل کی -ing والی شکل۔',
    badgeColor: 'bg-indigo-600',
    ruleUrdu: 'I, He, She, It کے ساتھ was اور We, You, They کے ساتھ were آتا ہے۔'
  },
  {
    id: 7,
    title: 'Game 7: Past Perfect Tense',
    urduTitle: 'گیم 7: فعل ماضی مکمل (Past Perfect Tense)',
    category: 'tenses',
    categoryUrdu: '12 ٹینسز گیمز',
    difficulty: 'Medium',
    descriptionEng: 'Action completed before another past event using Had + 3rd form.',
    descriptionUrdu: 'ماضی بعید: کسی دوسرے کام سے پہلے مکمل ہو جانے والا فعل (Had + 3rd form)۔',
    badgeColor: 'bg-indigo-600',
    ruleUrdu: 'تمام فاعلوں کے ساتھ Had لگا کر فعل کی تیسری فارم (Past Participle) استعمال ہوتی ہے۔'
  },
  {
    id: 8,
    title: 'Game 8: Past Perfect Continuous Tense',
    urduTitle: 'گیم 8: فعل ماضی مکمل جاری (Past Perfect Continuous)',
    category: 'tenses',
    categoryUrdu: '12 ٹینسز گیمز',
    difficulty: 'Challenge',
    descriptionEng: 'Past duration leading up to another point with Had been + -ing.',
    descriptionUrdu: 'ماضی میں کچھ عرصے تک جاری رہنے والا کام (Had been + -ing + Since/For)۔',
    badgeColor: 'bg-indigo-600',
    ruleUrdu: 'Had been کے بعد فعل کی پہلی فارم میں -ing لگائیں اور وقت کے لیے Since یا For چنیں۔'
  },
  {
    id: 9,
    title: 'Game 9: Future Simple Tense',
    urduTitle: 'گیم 9: فعل مستقبل مطلق (Future Simple Tense)',
    category: 'tenses',
    categoryUrdu: '12 ٹینسز گیمز',
    difficulty: 'Easy',
    descriptionEng: 'Future predictions, decisions, and promises with Will + 1st form.',
    descriptionUrdu: 'آنے والے وقت کے ارادے اور پیشین گوئیاں: Will / Shall + پہلی فارم۔',
    badgeColor: 'bg-indigo-600',
    ruleUrdu: 'مستقبل کے جملے میں Will کے بعد ہمیشہ فعل کی پہلی فارم (Base form) آتی ہے۔'
  },
  {
    id: 10,
    title: 'Game 10: Future Continuous Tense',
    urduTitle: 'گیم 10: فعل مستقبل جاری (Future Continuous Tense)',
    category: 'tenses',
    categoryUrdu: '12 ٹینسز گیمز',
    difficulty: 'Medium',
    descriptionEng: 'Actions that will be ongoing in future using Will be + -ing.',
    descriptionUrdu: 'مستقبل میں کسی خاص وقت پر جاری رہنے والا کام (Will be + -ing)۔',
    badgeColor: 'bg-indigo-600',
    ruleUrdu: 'Will be لگا کر فعل میں -ing لگائیں جیسے: She will be sleeping at 10 PM.'
  },
  {
    id: 11,
    title: 'Game 11: Future Perfect Tense',
    urduTitle: 'گیم 11: فعل مستقبل مکمل (Future Perfect Tense)',
    category: 'tenses',
    categoryUrdu: '12 ٹینسز گیمز',
    difficulty: 'Challenge',
    descriptionEng: 'Actions that will be finished by a future time: Will have + 3rd form.',
    descriptionUrdu: 'مستقبل میں کسی معینہ وقت تک کام کا مکمل ہو جانا (Will have + 3rd form)۔',
    badgeColor: 'bg-indigo-600',
    ruleUrdu: 'Will have کے بعد فعل کی تیسری فارم استعمال کریں جیسے: By tomorrow, I will have finished.'
  },
  {
    id: 12,
    title: 'Game 12: Future Perfect Continuous Tense',
    urduTitle: 'گیم 12: فعل مستقبل مکمل جاری (Future Perfect Continuous)',
    category: 'tenses',
    categoryUrdu: '12 ٹینسز گیمز',
    difficulty: 'Challenge',
    descriptionEng: 'Ongoing future duration: Will have been + -ing with For time.',
    descriptionUrdu: 'مستقبل میں کسی نقطے تک جاری رہنے کا دورانیہ (Will have been + -ing)۔',
    badgeColor: 'bg-indigo-600',
    ruleUrdu: 'Will have been + 1st form + ing + for کا استعمال ہوتا ہے۔'
  },

  // ==========================================
  // SPOKEN ENGLISH & CONVERSATIONS (روزمرہ بول چال - گیم 13 تا 25)
  // ==========================================
  {
    id: 13,
    title: 'Game 13: Spoken Greetings & Introductions',
    urduTitle: 'گیم 13: بول چال 1: سلام، تعارف اور احوال پرسی',
    category: 'spoken',
    categoryUrdu: 'روزمرہ بول چال',
    difficulty: 'Easy',
    descriptionEng: 'Learn natural ways to say hello, ask names, and introduce yourself.',
    descriptionUrdu: 'انگریزی میں سلام کہنا، نام پوچھنا اور اپنے بارے میں بتانا۔',
    badgeColor: 'bg-amber-600',
    ruleUrdu: 'رسمی گفتگو میں "Nice to meet you" اور "How do you do" جبکہ عام گفتگو میں "Hey, what\'s up?" بولا جاتا ہے۔'
  },
  {
    id: 14,
    title: 'Game 14: Polite Requests & Permissions',
    urduTitle: 'گیم 14: بول چال 2: شائستہ درخواست اور اجازت طلب کرنا',
    category: 'spoken',
    categoryUrdu: 'روزمرہ بول چال',
    difficulty: 'Easy',
    descriptionEng: 'Using May I, Could you, Would you please in daily life.',
    descriptionUrdu: 'ادب و احترام سے بات کرنا: May I, Could you please, Excuse me کا استعمال۔',
    badgeColor: 'bg-amber-600',
    ruleUrdu: 'اجازت کے لیے "May I..." اور مدد مانگنے کے لیے "Could you please..." سب سے شائستہ انداز ہے۔'
  },
  {
    id: 15,
    title: 'Game 15: Home & Family Conversations',
    urduTitle: 'گیم 15: بول چال 3: گھر میں والدین اور بہن بھائیوں سے گفتگو',
    category: 'spoken',
    categoryUrdu: 'روزمرہ بول چال',
    difficulty: 'Easy',
    descriptionEng: 'Everyday talk at home: meals, waking up, helping parents.',
    descriptionUrdu: 'گھر کے معمولات: کھانا مانگنا، وقت پوچھنا اور امی ابو سے بات چیت۔',
    badgeColor: 'bg-amber-600',
    ruleUrdu: 'گھریلو گفتگو میں آسان، روزمرہ جملے جیسے "I am hungry", "Pass me the water" بولے جاتے ہیں۔'
  },
  {
    id: 16,
    title: 'Game 16: Classroom & School Conversations',
    urduTitle: 'گیم 16: بول چال 4: کلاس روم اور اساتذہ سے گفتگو',
    category: 'spoken',
    categoryUrdu: 'روزمرہ بول چال',
    difficulty: 'Easy',
    descriptionEng: 'Asking questions to teachers, borrowing a pen, talking to classmates.',
    descriptionUrdu: 'کلاس میں استاد سے سوال پوچھنا، چھٹی کی درخواست اور پینسل مانگنا۔',
    badgeColor: 'bg-amber-600',
    ruleUrdu: 'کلاس میں استاد سے پوچھنے کے لیے "May I come in, teacher?", "Could you explain this again?" بولیں۔'
  },
  {
    id: 17,
    title: 'Game 17: Shopping & Market Conversations',
    urduTitle: 'گیم 17: بول چال 5: دکان اور بازار میں خریداری کی بول چال',
    category: 'spoken',
    categoryUrdu: 'روزمرہ بول چال',
    difficulty: 'Medium',
    descriptionEng: 'Asking prices, sizes, discounts, and paying the bill.',
    descriptionUrdu: 'قیمت پوچھنا ("How much is this?"), چھوٹ مانگنا اور بل ادا کرنا۔',
    badgeColor: 'bg-amber-600',
    ruleUrdu: 'کسی بھی چیز کی قیمت معلوم کرنے کے لیے سب سے عام فقرہ "How much does this cost?" ہے۔'
  },
  {
    id: 18,
    title: 'Game 18: Restaurant & Food Ordering Talk',
    urduTitle: 'گیم 18: بول چال 6: ریسٹورنٹ اور ہوٹل میں کھانے کا آرڈر دینا',
    category: 'spoken',
    categoryUrdu: 'روزمرہ بول چال',
    difficulty: 'Medium',
    descriptionEng: 'Ordering food, asking for menu, water, and the bill politely.',
    descriptionUrdu: 'مینو کارڈ مانگنا، کھانا آرڈر کرنا اور بل طلب کرنے کے فقرے۔',
    badgeColor: 'bg-amber-600',
    ruleUrdu: 'کھانے کے آرڈر کے لیے "I would like to have..." یا "Can I get..." بولا جاتا ہے۔'
  },
  {
    id: 19,
    title: 'Game 19: Asking & Giving Directions in the City',
    urduTitle: 'گیم 19: بول چال 7: گلی اور راستے پوچھنے کی بول چال',
    category: 'spoken',
    categoryUrdu: 'روزمرہ بول چال',
    difficulty: 'Medium',
    descriptionEng: 'Turn left, go straight, cross the road, where is the bus stop.',
    descriptionUrdu: 'راستہ پوچھنا اور بتانا: بائیں مڑیں، سیدھے جائیں، مسجد یا پارک کہاں ہے۔',
    badgeColor: 'bg-amber-600',
    ruleUrdu: 'راستہ پوچھنے کا شائستہ طریقہ: "Excuse me, where is the nearest hospital?" ہے۔'
  },
  {
    id: 20,
    title: 'Game 20: Doctor Clinic & Health Talk',
    urduTitle: 'گیم 20: بول چال 8: ڈاکٹر اور کلینک پر بیماری کی گفتگو',
    category: 'spoken',
    categoryUrdu: 'روزمرہ بول چال',
    difficulty: 'Medium',
    descriptionEng: 'Explaining headache, fever, cough, and taking medicine.',
    descriptionUrdu: 'بخار، سر درد، کھانسی اور دوائی کے بارے میں ڈاکٹر سے بات چیت۔',
    badgeColor: 'bg-amber-600',
    ruleUrdu: 'تکلیف بتانے کے لیے: "I have a severe headache", "I feel dizzy" جیسے فقرے استعمال ہوتے ہیں۔'
  },
  {
    id: 21,
    title: 'Game 21: Telephone & Voice Call English',
    urduTitle: 'گیم 21: بول چال 9: فون کال پر بات چیت اور پیغامات',
    category: 'spoken',
    categoryUrdu: 'روزمرہ بول چال',
    difficulty: 'Medium',
    descriptionEng: 'Answering calls, holding the line, leaving messages, bad connection.',
    descriptionUrdu: 'فون اٹھانا، ہولڈ کروانا، کال کٹ جانے پر دوبارہ ملانا اور پیغام دینا۔',
    badgeColor: 'bg-amber-600',
    ruleUrdu: 'فون پر اپنا تعارف کروانے کے لیے بولتے ہیں: "Hello, this is Ali speaking."'
  },
  {
    id: 22,
    title: 'Game 22: Weather & Small Talk',
    urduTitle: 'گیم 22: بول چال 10: موسم پر گفتگو اور روزمرہ گپ شپ',
    category: 'spoken',
    categoryUrdu: 'روزمرہ بول چال',
    difficulty: 'Easy',
    descriptionEng: 'Talking about sunny, rainy, freezing days, and friendly chats.',
    descriptionUrdu: 'گرمی، سردی، بارش اور دوستوں سے ہلکی پھلکی دلچسپ گپ شپ۔',
    badgeColor: 'bg-amber-600',
    ruleUrdu: 'موسم کا تبصرہ انگریزی میں سب سے مقبول آئس بریکر ہے جیسے: "It is quite chilly today, isn\'t it?"'
  },
  {
    id: 23,
    title: 'Game 23: Expressing Thanks, Apology & Sympathy',
    urduTitle: 'گیم 23: بول چال 11: شکریہ، معذرت اور ہمدردی کے فقرے',
    category: 'spoken',
    categoryUrdu: 'روزمرہ بول چال',
    difficulty: 'Easy',
    descriptionEng: 'Saying thank you, sorry for being late, my condolences, cheer up.',
    descriptionUrdu: 'دیر سے آنے پر معذرت، کسی کا احسان ماننا اور مشکل میں دلاسہ دینا۔',
    badgeColor: 'bg-amber-600',
    ruleUrdu: 'ہمدردی کے لیے "I am truly sorry to hear that" اور شکریہ پر "You are always welcome" بولیں۔'
  },
  {
    id: 24,
    title: 'Game 24: Travel, Bus & Airport English',
    urduTitle: 'گیم 24: بول چال 12: بس، ریل گاڑی اور ائیرپورٹ کا سفر',
    category: 'spoken',
    categoryUrdu: 'روزمرہ بول چال',
    difficulty: 'Medium',
    descriptionEng: 'Ticket counter, boarding gate, luggage, asking departure time.',
    descriptionUrdu: 'ٹکٹ خریدنا، بورڈنگ پاس لینا، سامان اور گاڑی روانگی کا وقت پوچھنا۔',
    badgeColor: 'bg-amber-600',
    ruleUrdu: 'روانگی کا وقت پوچھنے کے لیے: "What time does the train depart?" بولیں۔'
  },
  {
    id: 25,
    title: 'Game 25: Hobbies, Sports & Weekend Talk',
    urduTitle: 'گیم 25: بول چال 13: مشاغل، کھیل اور چھٹیوں کی گفتگو',
    category: 'spoken',
    categoryUrdu: 'روزمرہ بول چال',
    difficulty: 'Easy',
    descriptionEng: 'Discussing favorite games, books, weekend plans, and hobbies.',
    descriptionUrdu: 'پسندیدہ کھیل، کتابیں اور چھٹی کے دن سیر و تفریح کے منصوبے۔',
    badgeColor: 'bg-amber-600',
    ruleUrdu: 'مشاغل پوچھنے کے لیے: "What do you like to do in your free time?" استعمال کریں۔'
  },

  // ==========================================
  // PARTS OF SPEECH IN DEPTH (گیم 26 تا 40)
  // ==========================================
  {
    id: 26,
    title: 'Game 26: Proper vs Common Nouns',
    urduTitle: 'گیم 26: اسم معرفہ اور اسم نکرہ (Proper vs Common)',
    category: 'parts-of-speech',
    categoryUrdu: 'اجزائے کلام (Parts of Speech)',
    difficulty: 'Easy',
    descriptionEng: 'Capitalization of names, cities, days vs general nouns.',
    descriptionUrdu: 'خاص ناموں (Lahore, Ali, Monday) اور عام ناموں (city, boy, day) کی پہچان۔',
    badgeColor: 'bg-emerald-600',
    ruleUrdu: 'Proper Noun کا پہلا حرف ہمیشہ بڑا (Capital) لکھا جاتا ہے۔'
  },
  {
    id: 27,
    title: 'Game 27: Countable vs Uncountable Nouns',
    urduTitle: 'گیم 27: گنے جانے والے اور نہ گنے جانے والے اسم',
    category: 'parts-of-speech',
    categoryUrdu: 'اجزائے کلام (Parts of Speech)',
    difficulty: 'Medium',
    descriptionEng: 'Countable (Apple, Pen) vs Uncountable (Milk, Water, Sugar, Advice).',
    descriptionUrdu: 'جنہیں گنا جا سکے (Pen/Pens) بمقابلہ جنہیں گنا نہ جا سکے (Water/Information)۔',
    badgeColor: 'bg-emerald-600',
    ruleUrdu: 'Uncountable nouns کے ساتھ a/an نہیں لگتا اور ان کی جمع (plural -s) نہیں بنتی۔'
  },
  {
    id: 28,
    title: 'Game 28: Collective Nouns Master',
    urduTitle: 'گیم 28: اسم جمع (Collective Nouns - جھنڈ، گروہ)',
    category: 'parts-of-speech',
    categoryUrdu: 'اجزائے کلام (Parts of Speech)',
    difficulty: 'Medium',
    descriptionEng: 'Herd of cows, flock of birds, swarm of bees, pack of wolves.',
    descriptionUrdu: 'گروہ کے نام: پرندوں کا جھنڈ (Flock)، بھیڑوں کا ریوڑ (Herd)، مکھیوں کا چھتہ۔',
    badgeColor: 'bg-emerald-600',
    ruleUrdu: 'افراد یا جانوروں کے مجموعے کو ظاہر کرنے والا لفظ Collective Noun کہلاتا ہے۔'
  },
  {
    id: 29,
    title: 'Game 29: Abstract Nouns Explorer',
    urduTitle: 'گیم 29: اسم کیفیت یا احساس (Abstract Nouns)',
    category: 'parts-of-speech',
    categoryUrdu: 'اجزائے کلام (Parts of Speech)',
    difficulty: 'Medium',
    descriptionEng: 'Qualities, emotions, ideas: Honesty, Courage, Wisdom, Happiness.',
    descriptionUrdu: 'جنہیں چھوا نہ جا سکے صرف محسوس کیا جائے: سچائی، بہادری، دانشمندی، پیار۔',
    badgeColor: 'bg-emerald-600',
    ruleUrdu: 'جذبات، خوبیوں یا حالتوں کے نام Abstract Nouns کہلاتے ہیں۔'
  },
  {
    id: 30,
    title: 'Game 30: Personal Pronouns (Subject & Object)',
    urduTitle: 'گیم 30: اسم ضمیر فاعلی اور مفعولی (I vs Me, He vs Him)',
    category: 'parts-of-speech',
    categoryUrdu: 'اجزائے کلام (Parts of Speech)',
    difficulty: 'Easy',
    descriptionEng: 'Subject pronouns (I, He, They) vs Object pronouns (Me, Him, Them).',
    descriptionUrdu: 'فاعل بن کر آنے والے (He, She) اور مفعول بن کر آنے والے (Him, Her, Them)۔',
    badgeColor: 'bg-emerald-600',
    ruleUrdu: 'فعل سے پہلے Subject Pronoun (I, We, He) اور فعل کے بعد Object Pronoun (Me, Us, Him) آتا ہے۔'
  },
  {
    id: 31,
    title: 'Game 31: Possessive Pronouns & Adjectives',
    urduTitle: 'گیم 31: ملکیت ظاہر کرنے والے ضمائر (My vs Mine)',
    category: 'parts-of-speech',
    categoryUrdu: 'اجزائے کلام (Parts of Speech)',
    difficulty: 'Medium',
    descriptionEng: 'My, Your, Our vs Mine, Yours, Ours, Theirs.',
    descriptionUrdu: 'ملکیت بتانے کے دو انداز: "This is my book" بمقابلہ "This book is mine"۔',
    badgeColor: 'bg-emerald-600',
    ruleUrdu: 'My, Your کے بعد اسم لازمی آتا ہے، جبکہ Mine, Yours اکیلے جملے کے آخر میں آتے ہیں۔'
  },
  {
    id: 32,
    title: 'Game 32: Reflexive & Emphatic Pronouns',
    urduTitle: 'گیم 32: خود والے ضمائر (Myself, Himself, Themselves)',
    category: 'parts-of-speech',
    categoryUrdu: 'اجزائے کلام (Parts of Speech)',
    difficulty: 'Medium',
    descriptionEng: 'Myself, Yourself, Himself, Herself, Itself, Ourselves.',
    descriptionUrdu: 'جب فاعل اور مفعول ایک ہی ہوں: "I hurt myself", "He did it himself"۔',
    badgeColor: 'bg-emerald-600',
    ruleUrdu: 'واحد کے لیے -self اور جمع کے لیے -selves کا اضافہ کیا جاتا ہے۔'
  },
  {
    id: 33,
    title: 'Game 33: Action Verbs: Transitive & Intransitive',
    urduTitle: 'گیم 33: فعل لازم اور متعدی (Transitive vs Intransitive)',
    category: 'parts-of-speech',
    categoryUrdu: 'اجزائے کلام (Parts of Speech)',
    difficulty: 'Challenge',
    descriptionEng: 'Verbs that need a direct object (Read a book) vs stand alone (Sleep).',
    descriptionUrdu: 'جن افعال کو مفعول کی ضرورت ہو اور جنہیں ضرورت نہ ہو۔',
    badgeColor: 'bg-emerald-600',
    ruleUrdu: 'اگر فعل کے بعد "What" یا "Whom" کا جواب موجود ہو تو وہ Transitive Verb ہوتا ہے۔'
  },
  {
    id: 34,
    title: 'Game 34: Helping Verbs (Be, Do, Have)',
    urduTitle: 'گیم 34: بنیادی امدادی افعال (Is, Am, Are, Was, Were, Do, Have)',
    category: 'parts-of-speech',
    categoryUrdu: 'اجزائے کلام (Parts of Speech)',
    difficulty: 'Easy',
    descriptionEng: 'Primary auxiliary verbs that build tenses and questions.',
    descriptionUrdu: 'جملے کا زمانہ اور سوال بنانے والے بنیادی امدادی افعال۔',
    badgeColor: 'bg-emerald-600',
    ruleUrdu: 'امدادی افعال اصل فعل کی مدد کر کے زمانہ اور جملے کی حالت واضح کرتے ہیں۔'
  },
  {
    id: 35,
    title: 'Game 35: Modal Verbs of Ability & Possibility',
    urduTitle: 'گیم 35: صلاحیت اور امکان کے افعال (Can, Could, May, Might)',
    category: 'parts-of-speech',
    categoryUrdu: 'اجزائے کلام (Parts of Speech)',
    difficulty: 'Medium',
    descriptionEng: 'Can (present ability), Could (past ability), May/Might (possibility).',
    descriptionUrdu: 'صلاحیت (کر سکتا ہے) اور امکان (شاید بارش ہو جائے) ظاہر کرنا۔',
    badgeColor: 'bg-emerald-600',
    ruleUrdu: 'تمام ماڈل وربز کے بعد ہمیشہ فعل کی پہلی فارم (Bare Infinitive) لگائی جاتی ہے۔'
  },
  {
    id: 36,
    title: 'Game 36: Modal Verbs of Duty & Advice',
    urduTitle: 'گیم 36: فرض اور نصیحت کے افعال (Should, Must, Ought to)',
    category: 'parts-of-speech',
    categoryUrdu: 'اجزائے کلام (Parts of Speech)',
    difficulty: 'Medium',
    descriptionEng: 'Should (good advice), Must (strict obligation), Need not.',
    descriptionUrdu: 'نصیحت کرنا (Should) اور لازمی پابندی یا فرض ظاہر کرنا (Must)۔',
    badgeColor: 'bg-emerald-600',
    ruleUrdu: 'نصیحت کے لیے Should اور قانونی یا انتہائی لازمی فرض کے لیے Must استعمال ہوتا ہے۔'
  },
  {
    id: 37,
    title: 'Game 37: Degrees of Adjectives',
    urduTitle: 'گیم 37: صفت کے درجے (Positive, Comparative, Superlative)',
    category: 'parts-of-speech',
    categoryUrdu: 'اجزائے کلام (Parts of Speech)',
    difficulty: 'Medium',
    descriptionEng: 'Tall -> Taller -> Tallest; Beautiful -> More beautiful -> Most beautiful.',
    descriptionUrdu: 'ایک، دو کا موازنہ (Than کے ساتھ) اور سب سے بڑھ کر (The کے ساتھ)۔',
    badgeColor: 'bg-emerald-600',
    ruleUrdu: 'دو چیزوں کے موازنے میں 2nd ڈگری + than اور سب سے موازنے میں The + 3rd ڈگری آتی ہے۔'
  },
  {
    id: 38,
    title: 'Game 38: Adverbs of Manner (-ly)',
    urduTitle: 'گیم 38: کام کرنے کے انداز کے متعلقات فعل (Quickly, Slowly, Bravely)',
    category: 'parts-of-speech',
    categoryUrdu: 'اجزائے کلام (Parts of Speech)',
    difficulty: 'Medium',
    descriptionEng: 'How actions happen: Quickly, softly, carefully, happily.',
    descriptionUrdu: 'کام کیسے ہوا؟ صفت میں -ly لگا کر طریقہ ظاہر کرنا۔',
    badgeColor: 'bg-emerald-600',
    ruleUrdu: 'Adverb of Manner سوال "How?" (کیسے؟) کا جواب دیتا ہے۔'
  },
  {
    id: 39,
    title: 'Game 39: Adverbs of Time, Place & Frequency',
    urduTitle: 'گیم 39: وقت، جگہ اور تکرار کے متعلقات فعل (Always, Never, Soon)',
    category: 'parts-of-speech',
    categoryUrdu: 'اجزائے کلام (Parts of Speech)',
    difficulty: 'Medium',
    descriptionEng: 'Always, often, never, yesterday, everywhere, here, there.',
    descriptionUrdu: 'کام کب ہوا، کہاں ہوا اور کتنی بار ہوتا ہے (Always, Sometimes, Never)۔',
    badgeColor: 'bg-emerald-600',
    ruleUrdu: 'Adverbs of frequency عام طور پر اصل فعل سے پہلے اور Helping verb کے بعد آتے ہیں۔'
  },
  {
    id: 40,
    title: 'Game 40: Coordinating Conjunctions (FANBOYS)',
    urduTitle: 'گیم 40: حروف عطف (For, And, Nor, But, Or, Yet, So)',
    category: 'parts-of-speech',
    categoryUrdu: 'اجزائے کلام (Parts of Speech)',
    difficulty: 'Medium',
    descriptionEng: 'Connect words and independent clauses using FANBOYS.',
    descriptionUrdu: 'دو لفظوں یا مکمل جملوں کو ملانے والے کلمات (And, But, Or, So)۔',
    badgeColor: 'bg-emerald-600',
    ruleUrdu: 'تضاد کے لیے But، اضافے کے لیے And اور نتیجے کے لیے So استعمال کیا جاتا ہے۔'
  },

  // ==========================================
  // ARTICLES & DETERMINERS (گیم 41 تا 48)
  // ==========================================
  {
    id: 41,
    title: 'Game 41: Indefinite Articles (A vs An)',
    urduTitle: 'گیم 41: حروف تنکیر (A بمقابلہ An - واول آواز کے اصول)',
    category: 'articles',
    categoryUrdu: 'آرٹیکلز اور اشارے',
    difficulty: 'Easy',
    descriptionEng: 'A before consonant sounds; An before vowel sounds (An hour, An apple).',
    descriptionUrdu: 'حرف نہیں بلکہ آواز دیکھیں: An honest man, A university.',
    badgeColor: 'bg-teal-600',
    ruleUrdu: 'فیصلہ آواز پر ہوتا ہے: اگر آواز واول (الف یا عین جیسی) ہو تو An لگے گا خواہ حرف کچھ بھی ہو۔'
  },
  {
    id: 42,
    title: 'Game 42: Definite Article (The vs Zero Article)',
    urduTitle: 'گیم 42: حرف تعریف (The کا صحیح استعمال اور کہاں نہیں لگے گا)',
    category: 'articles',
    categoryUrdu: 'آرٹیکلز اور اشارے',
    difficulty: 'Medium',
    descriptionEng: 'When to use "The" (Rivers, Unique objects) and when NOT to use it.',
    descriptionUrdu: 'دریاؤں، سمندروں اور مخصوص چیزوں کے ساتھ The، مگر عام کھانوں، کھیلوں کے ساتھ نہیں۔',
    badgeColor: 'bg-teal-600',
    ruleUrdu: 'The Sun, The Indus River درست ہے، لیکن The Cricket یا The Breakfast نہیں بولتے۔'
  },
  {
    id: 43,
    title: 'Game 43: Demonstrative Determiners',
    urduTitle: 'گیم 43: اسمائے اشارہ (This, That, These, Those)',
    category: 'articles',
    categoryUrdu: 'آرٹیکلز اور اشارے',
    difficulty: 'Easy',
    descriptionEng: 'This/These (near) vs That/Those (far away).',
    descriptionUrdu: 'نزدیک کی واحد و جمع چیزیں (This/These) اور دور کی چیزیں (That/Those)۔',
    badgeColor: 'bg-teal-600',
    ruleUrdu: 'قریب کی ایک چیز This، قریب کی کئی چیزیں These، دور کی ایک چیز That، دور کی کئی Those۔'
  },
  {
    id: 44,
    title: 'Game 44: Quantifiers (Some vs Any)',
    urduTitle: 'گیم 44: مقدار و تعداد (Some بمقابلہ Any کا اصول)',
    category: 'articles',
    categoryUrdu: 'آرٹیکلز اور اشارے',
    difficulty: 'Easy',
    descriptionEng: 'Some in positive statements; Any in questions and negatives.',
    descriptionUrdu: 'مثبت جملوں میں Some اور منفی یا سوالیہ جملوں میں Any کا استعمال۔',
    badgeColor: 'bg-teal-600',
    ruleUrdu: 'مثبت: "I have some milk"، منفی: "I don\'t have any milk"، سوال: "Do you have any sugar?"'
  },
  {
    id: 45,
    title: 'Game 45: Quantifiers (Many vs Much)',
    urduTitle: 'گیم 45: تعداد اور مقدار (Many بمقابلہ Much)',
    category: 'articles',
    categoryUrdu: 'آرٹیکلز اور اشارے',
    difficulty: 'Medium',
    descriptionEng: 'Many with countable plural nouns; Much with uncountable nouns.',
    descriptionUrdu: 'گنے جانے والے ناموں کے ساتھ Many اور غیر شمار پذیر چیزوں کے ساتھ Much۔',
    badgeColor: 'bg-teal-600',
    ruleUrdu: 'Many books, Many friends (گنے جا سکتے ہیں)؛ Much water, Much time (گنے نہیں جا سکتے)۔'
  },
  {
    id: 46,
    title: 'Game 46: Quantifiers (Few vs Little)',
    urduTitle: 'گیم 46: برائے نام مقدار (Few بمقابلہ Little)',
    category: 'articles',
    categoryUrdu: 'آرٹیکلز اور اشارے',
    difficulty: 'Challenge',
    descriptionEng: 'Few (scarcely any countable) vs Little (scarcely any uncountable).',
    descriptionUrdu: 'Few (نہ ہونے کے برابر تعداد) اور Little (نہ ہونے کے برابر مقدار)۔',
    badgeColor: 'bg-teal-600',
    ruleUrdu: 'A few اور A little کا مطلب کچھ ہے، جبکہ صرف Few اور Little منفی یعنی نہ ہونے کے برابر ہے۔'
  },
  {
    id: 47,
    title: 'Game 47: Distributives (Each vs Every)',
    urduTitle: 'گیم 47: انفرادی اشارے (Each بمقابلہ Every)',
    category: 'articles',
    categoryUrdu: 'آرٹیکلز اور اشارے',
    difficulty: 'Medium',
    descriptionEng: 'Each (individual focus in a small group) vs Every (all members).',
    descriptionUrdu: 'گروہ کے ہر ایک فرد پر الگ الگ فوکس کرنا، دونوں کے ساتھ واحد فعل آتا ہے۔',
    badgeColor: 'bg-teal-600',
    ruleUrdu: 'Each child has a pen (واحد فعل has آتا ہے)۔'
  },
  {
    id: 48,
    title: 'Game 48: Either vs Neither',
    urduTitle: 'گیم 48: دو میں سے ایک یا کوئی بھی نہیں (Either / Neither)',
    category: 'articles',
    categoryUrdu: 'آرٹیکلز اور اشارے',
    difficulty: 'Medium',
    descriptionEng: 'Either (one of the two) vs Neither (not this one, not that one).',
    descriptionUrdu: 'Either... or (یا یہ یا وہ) اور Neither... nor (نہ یہ اور نہ وہ)۔',
    badgeColor: 'bg-teal-600',
    ruleUrdu: 'Neither کے ساتھ جملے میں دوسرا منفی لفظ (not) نہیں لگایا جاتا۔'
  },

  // ==========================================
  // PREPOSITIONS IN DEPTH (گیم 49 تا 56)
  // ==========================================
  {
    id: 49,
    title: 'Game 49: Prepositions of Place (In, On, At)',
    urduTitle: 'گیم 49: جگہ کے حروف جار (In, On, At)',
    category: 'prepositions',
    categoryUrdu: 'حروف جار (Prepositions)',
    difficulty: 'Easy',
    descriptionEng: 'At a point (at home), In an enclosed space (in room), On a surface (on desk).',
    descriptionUrdu: 'نقطہ یا عمارت (At)، اندرونی جگہ (In)، اور کسی سطح کے اوپر (On)۔',
    badgeColor: 'bg-blue-600',
    ruleUrdu: 'At the door, In Pakistan/In the box, On the table/On the wall.'
  },
  {
    id: 50,
    title: 'Game 50: Prepositions of Time (In, On, At)',
    urduTitle: 'گیم 50: وقت کے حروف جار (In, On, At)',
    category: 'prepositions',
    categoryUrdu: 'حروف جار (Prepositions)',
    difficulty: 'Easy',
    descriptionEng: 'At clock times (at 5 PM), On days/dates (on Monday), In months/years (in 2026).',
    descriptionUrdu: 'گھڑی کے وقت کے ساتھ At، دنوں اور تاریخوں کے ساتھ On، اور مہینوں سالوں کے ساتھ In۔',
    badgeColor: 'bg-blue-600',
    ruleUrdu: 'At 7 o\'clock, On Friday, In July, In 2026.'
  },
  {
    id: 51,
    title: 'Game 51: Prepositions of Direction (To, Into, Towards)',
    urduTitle: 'گیم 51: سمت اور حرکت کے حروف جار (To, Into, Onto, Towards)',
    category: 'prepositions',
    categoryUrdu: 'حروف جار (Prepositions)',
    difficulty: 'Medium',
    descriptionEng: 'Motion into water/room (Into), towards a target, onto a surface.',
    descriptionUrdu: 'کسی چیز کے اندر حرکت کر کے جانا (Jumped into the river)۔',
    badgeColor: 'bg-blue-600',
    ruleUrdu: 'پہلے سے اندر ہو تو In، اگر باہر سے اندر حرکت کر کے داخل ہو تو Into لگاتے ہیں۔'
  },
  {
    id: 52,
    title: 'Game 52: Position Prepositions (Above, Below, Over, Under)',
    urduTitle: 'گیم 52: اونچائی اور گہرائی (Above, Below, Over, Under)',
    category: 'prepositions',
    categoryUrdu: 'حروف جار (Prepositions)',
    difficulty: 'Medium',
    descriptionEng: 'Over vs Above (covering vs higher level); Under vs Below.',
    descriptionUrdu: 'اوپر اور نیچے کا درست تعلق: چھتری سر کے اوپر (Over), ہوائی جہاز بادلوں سے اوپر (Above)۔',
    badgeColor: 'bg-blue-600',
    ruleUrdu: 'اگر کسی چیز کو ڈھانپتے ہوئے اوپر ہو تو Over، اگر سطح کی سطح بلند ہو تو Above۔'
  },
  {
    id: 53,
    title: 'Game 53: Prepositions (Between vs Among)',
    urduTitle: 'گیم 53: درمیان میں (Between بمقابلہ Among کا اصول)',
    category: 'prepositions',
    categoryUrdu: 'حروف جار (Prepositions)',
    difficulty: 'Easy',
    descriptionEng: 'Between two people or objects; Among three or more.',
    descriptionUrdu: 'دو چیزوں یا افراد کے درمیان Between، دو سے زیادہ کے درمیان Among۔',
    badgeColor: 'bg-blue-600',
    ruleUrdu: 'Between Ali and Ahmad (دو افراد)؛ Among all the students (کئی افراد)۔'
  },
  {
    id: 54,
    title: 'Game 54: Prepositions of Duration (Since vs For)',
    urduTitle: 'گیم 54: مدت اور نقطہ آغاز (Since بمقابلہ For)',
    category: 'prepositions',
    categoryUrdu: 'حروف جار (Prepositions)',
    difficulty: 'Medium',
    descriptionEng: 'Since for starting point (since morning); For for total duration (for 3 days).',
    descriptionUrdu: 'کام شروع ہونے کا نام (Since morning/1990) اور کل مدت (For two hours)۔',
    badgeColor: 'bg-blue-600',
    ruleUrdu: 'گھڑی کی گنتی یا دنوں کی تعداد کے ساتھ For، جبکہ دن، مہینے یا سال کے نام کے ساتھ Since۔'
  },
  {
    id: 55,
    title: 'Game 55: Prepositional Collocations (Fixed Prepositions)',
    urduTitle: 'گیم 55: مخصوص حروف جار (Good at, Afraid of, Listen to)',
    category: 'prepositions',
    categoryUrdu: 'حروف جار (Prepositions)',
    difficulty: 'Challenge',
    descriptionEng: 'Good at English, afraid of spiders, interested in science, listen to music.',
    descriptionUrdu: 'وہ الفاظ جن کے بعد ہمیشہ ایک مخصوص preposition ہی لگتی ہے۔',
    badgeColor: 'bg-blue-600',
    ruleUrdu: 'کبھی "good in English" نہیں کہتے بلکہ "good at English" درست ہے۔'
  },
  {
    id: 56,
    title: 'Game 56: Prepositions (By vs With)',
    urduTitle: 'گیم 56: ذریعہ اور آلہ (By بمقابلہ With کا استعمال)',
    category: 'prepositions',
    categoryUrdu: 'حروف جار (Prepositions)',
    difficulty: 'Medium',
    descriptionEng: 'By agent/transport (by car, by Shakespeare) vs With instrument (with a knife).',
    descriptionUrdu: 'کام کرنے والے یا سواری کے ساتھ By، جبکہ ہاتھ کے اوزار یا آلے کے ساتھ With۔',
    badgeColor: 'bg-blue-600',
    ruleUrdu: 'Cut the apple with a knife (آلہ)، Travel by train (سواری)۔'
  },

  // ==========================================
  // SENTENCE STRUCTURE & GRAMMAR MECHANICS (گیم 57 تا 68)
  // ==========================================
  {
    id: 57,
    title: 'Game 57: Subject, Verb, Object (S-V-O) Order',
    urduTitle: 'گیم 57: جملے کی بنیادی ترتیب (فاعل، فعل اور مفعول)',
    category: 'sentence-structure',
    categoryUrdu: 'جملے کی ساخت اور قواعد',
    difficulty: 'Easy',
    descriptionEng: 'English word order: Subject first, then Verb, then Object.',
    descriptionUrdu: 'اردو میں فاعل مفعول فعل ہوتا ہے، مگر انگریزی میں فاعل + فعل + مفعول (SVO) ہوتا ہے۔',
    badgeColor: 'bg-cyan-600',
    ruleUrdu: 'The boy (S) kicked (V) the ball (O).'
  },
  {
    id: 58,
    title: 'Game 58: Subject-Verb Agreement Master',
    urduTitle: 'گیم 58: فاعل اور فعل کا مطابقت کا قانون (Agreement)',
    category: 'sentence-structure',
    categoryUrdu: 'جملے کی ساخت اور قواعد',
    difficulty: 'Medium',
    descriptionEng: 'Singular subjects take singular verbs; plural subjects take plural verbs.',
    descriptionUrdu: 'واحد فاعل کے ساتھ واحد فعل (is/has/runs) اور جمع کے ساتھ جمع فعل (are/have/run)۔',
    badgeColor: 'bg-cyan-600',
    ruleUrdu: 'The list of items IS long (سبجیکٹ list ہے items نہیں)۔'
  },
  {
    id: 59,
    title: 'Game 59: Affirmative to Negative Sentences',
    urduTitle: 'گیم 59: مثبت جملوں کو منفی جملوں میں تبدیل کرنا',
    category: 'sentence-structure',
    categoryUrdu: 'جملے کی ساخت اور قواعد',
    difficulty: 'Easy',
    descriptionEng: 'Using Do not, Does not, Did not, Is not, Will not.',
    descriptionUrdu: 'امداد فعل کے بعد Not لگانا اور Does/Did کے بعد 1st form بحال کرنا۔',
    badgeColor: 'bg-cyan-600',
    ruleUrdu: 'He plays -> He does NOT play (does لگنے پر plays کا s ختم ہو جاتا ہے)۔'
  },
  {
    id: 60,
    title: 'Game 60: Yes/No Question Formation',
    urduTitle: 'گیم 60: کیا والے سوالیہ جملے بنانا (Interrogative)',
    category: 'sentence-structure',
    categoryUrdu: 'جملے کی ساخت اور قواعد',
    difficulty: 'Easy',
    descriptionEng: 'Move helping verb to the beginning: Are you ready? Did he come?',
    descriptionUrdu: 'امدادی فعل (Is, Are, Do, Does, Did, Will) کو جملے کے شروع میں لانا۔',
    badgeColor: 'bg-cyan-600',
    ruleUrdu: 'She is happy -> Is she happy? He knows -> Does he know?'
  },
  {
    id: 61,
    title: 'Game 61: Wh- Questions (Who, What, Where, When, Why, How)',
    urduTitle: 'گیم 61: سوالیہ کلمات کے درست سوالات (Wh- Family)',
    category: 'sentence-structure',
    categoryUrdu: 'جملے کی ساخت اور قواعد',
    difficulty: 'Medium',
    descriptionEng: 'Asking about people (Who), things (What), places (Where), reasons (Why).',
    descriptionUrdu: 'کون، کیا، کہاں، کب، کیوں اور کیسے کے سوالات کی صحیح ترتیب۔',
    badgeColor: 'bg-cyan-600',
    ruleUrdu: 'Wh- لفظ + Helping verb + Subject + Main verb: Where do you live?'
  },
  {
    id: 62,
    title: 'Game 62: Question Tags (Isn\'t it? Don\'t you?)',
    urduTitle: 'گیم 62: توثیقی سوالیہ دم چھلے (Question Tags)',
    category: 'sentence-structure',
    categoryUrdu: 'جملے کی ساخت اور قواعد',
    difficulty: 'Challenge',
    descriptionEng: 'Positive statement + Negative tag; Negative statement + Positive tag.',
    descriptionUrdu: 'بات کی تصدیق کرنا: "You are a student, aren\'t you?"',
    badgeColor: 'bg-cyan-600',
    ruleUrdu: 'اگر جملہ مثبت ہو تو ٹیگ منفی ہوگا، اور اگر جملہ منفی ہو تو ٹیگ مثبت ہوگا۔'
  },
  {
    id: 63,
    title: 'Game 63: Compound Sentences (Connecting Independent Clauses)',
    urduTitle: 'گیم 63: مرکب جملے بنانا (Compound Sentences)',
    category: 'sentence-structure',
    categoryUrdu: 'جملے کی ساخت اور قواعد',
    difficulty: 'Medium',
    descriptionEng: 'Joining two complete thoughts with a comma and conjunction.',
    descriptionUrdu: 'دو مکمل خیالات کو کومے اور حرف عطف (and, but, so) سے ملانا۔',
    badgeColor: 'bg-cyan-600',
    ruleUrdu: 'I wanted to go, but it was raining heavily.'
  },
  {
    id: 64,
    title: 'Game 64: Complex Sentences & Subordinate Clauses',
    urduTitle: 'گیم 64: پیچیدہ جملے (Because, Although, Unless, When)',
    category: 'sentence-structure',
    categoryUrdu: 'جملے کی ساخت اور قواعد',
    difficulty: 'Challenge',
    descriptionEng: 'Main clause + dependent clause that starts with a subordinating conjunction.',
    descriptionUrdu: 'ایک اصل جملہ اور اس پر انحصار کرنے والا ماتحت جملہ ملانا۔',
    badgeColor: 'bg-cyan-600',
    ruleUrdu: 'Although he worked hard, he could not win.'
  },
  {
    id: 65,
    title: 'Game 65: Imperative Sentences (Commands & Advice)',
    urduTitle: 'گیم 65: حکمیہ اور نصحیت آمیز جملے (Imperatives)',
    category: 'sentence-structure',
    categoryUrdu: 'جملے کی ساخت اور قواعد',
    difficulty: 'Easy',
    descriptionEng: 'Sentences starting directly with a verb: Open the door, Please sit down.',
    descriptionUrdu: 'حکم دینا یا التجا کرنا: فعل سے ابتدا (فاعل You چھپا ہوتا ہے)۔',
    badgeColor: 'bg-cyan-600',
    ruleUrdu: 'منفی حکم کے لیے شروع میں "Don\'t" لگائیں جیسے: Don\'t touch that.'
  },
  {
    id: 66,
    title: 'Game 66: Exclamatory Sentences (Joy, Wonder, Surprise)',
    urduTitle: 'گیم 66: استعجابیہ جملے (What a beautiful flower! How fast he runs!)',
    category: 'sentence-structure',
    categoryUrdu: 'جملے کی ساخت اور قواعد',
    difficulty: 'Easy',
    descriptionEng: 'Expressing strong emotion ending with an exclamation mark (!).',
    descriptionUrdu: 'حیرت، خوشی یا غم کا اچانک اظہار مع استعجابیہ نشان (!).',
    badgeColor: 'bg-cyan-600',
    ruleUrdu: 'What a + Adjective + Noun! جیسے: What a lovely garden!'
  },
  {
    id: 67,
    title: 'Game 67: Punctuation & Capitalization Rules',
    urduTitle: 'گیم 67: رموز اوقاف (Full stop, Comma, Apostrophe, Capitals)',
    category: 'sentence-structure',
    categoryUrdu: 'جملے کی ساخت اور قواعد',
    difficulty: 'Medium',
    descriptionEng: 'Capital letters for I, names; Apostrophes for possession and contractions.',
    descriptionUrdu: 'کومے کا صحیح مقام اور اپاسٹروفی (\'s) کا ملکیت اور تخفیف میں استعمال۔',
    badgeColor: 'bg-cyan-600',
    ruleUrdu: 'علی کی کتاب: Ali\'s book؛ اور تخفیف: Don\'t (Do not)۔'
  },
  {
    id: 68,
    title: 'Game 68: Relative Pronouns (Who, Which, That, Whose)',
    urduTitle: 'گیم 68: موصولہ ضمائر (Who انسان کے لیے، Which بے جان کے لیے)',
    category: 'sentence-structure',
    categoryUrdu: 'جملے کی ساخت اور قواعد',
    difficulty: 'Challenge',
    descriptionEng: 'Who for persons, Which for animals/things, Whose for possession.',
    descriptionUrdu: 'دو جملوں کو جوڑنے والے الفاظ: "The boy WHO is standing there"۔',
    badgeColor: 'bg-cyan-600',
    ruleUrdu: 'انسان کے لیے Who، بے جان چیزوں اور جانوروں کے لیے Which یا That آتا ہے۔'
  },

  // ==========================================
  // ACTIVE & PASSIVE VOICE (گیم 69 تا 75)
  // ==========================================
  {
    id: 69,
    title: 'Game 69: Active to Passive: Present Simple',
    urduTitle: 'گیم 69: معروف سے مجہول (Present Simple: is/am/are + 3rd form)',
    category: 'voice-narration',
    categoryUrdu: 'ایکٹو پیسیو اور ڈائریکٹ ان ڈائریکٹ',
    difficulty: 'Medium',
    descriptionEng: 'He writes a letter -> A letter IS WRITTEN by him.',
    descriptionUrdu: 'مفعول کو فاعل بنائیں، is/am/are لگائیں اور فعل کی تیسری فارم لگائیں۔',
    badgeColor: 'bg-purple-600',
    ruleUrdu: 'پیسیو وائس کے ہر جملے میں ہمیشہ فعل کی تیسری فارم (3rd form) ہی لگتی ہے۔'
  },
  {
    id: 70,
    title: 'Game 70: Active to Passive: Past Simple',
    urduTitle: 'گیم 70: معروف سے مجہول (Past Simple: was/were + 3rd form)',
    category: 'voice-narration',
    categoryUrdu: 'ایکٹو پیسیو اور ڈائریکٹ ان ڈائریکٹ',
    difficulty: 'Medium',
    descriptionEng: 'She baked a cake -> A cake WAS BAKED by her.',
    descriptionUrdu: 'ماضی کے جملوں میں was یا were کے بعد 3rd form کا استعمال۔',
    badgeColor: 'bg-purple-600',
    ruleUrdu: 'مفعول واحد ہو تو was، جمع ہو تو were لگا کر 3rd form لگائیں۔'
  },
  {
    id: 71,
    title: 'Game 71: Active to Passive: Continuous Tenses (Being)',
    urduTitle: 'گیم 71: جاری ٹینسز کا پیسیو وائس (Being + 3rd form)',
    category: 'voice-narration',
    categoryUrdu: 'ایکٹو پیسیو اور ڈائریکٹ ان ڈائریکٹ',
    difficulty: 'Challenge',
    descriptionEng: 'They are building a bridge -> A bridge is BEING BUILT.',
    descriptionUrdu: 'جاری کاموں میں امدادی فعل کے بعد Being لگا کر 3rd form لگائی جاتی ہے۔',
    badgeColor: 'bg-purple-600',
    ruleUrdu: 'is/am/are/was/were کے بعد "being" کا اضافہ ضروری ہے۔'
  },
  {
    id: 72,
    title: 'Game 72: Active to Passive: Perfect Tenses (Been)',
    urduTitle: 'گیم 72: مکمل ٹینسز کا پیسیو وائس (Been + 3rd form)',
    category: 'voice-narration',
    categoryUrdu: 'ایکٹو پیسیو اور ڈائریکٹ ان ڈائریکٹ',
    difficulty: 'Challenge',
    descriptionEng: 'He has finished the work -> The work has BEEN FINISHED.',
    descriptionUrdu: 'Has/Have/Had کے بعد Been کا اضافہ کر کے پیسیو بنایا جاتا ہے۔',
    badgeColor: 'bg-purple-600',
    ruleUrdu: 'has been / have been / had been + 3rd form.'
  },
  {
    id: 73,
    title: 'Game 73: Active to Passive: Modals & Future (Be + 3rd form)',
    urduTitle: 'گیم 73: فیوچر اور ماڈل وربز کا پیسیو (Will be / Can be + 3rd form)',
    category: 'voice-narration',
    categoryUrdu: 'ایکٹو پیسیو اور ڈائریکٹ ان ڈائریکٹ',
    difficulty: 'Medium',
    descriptionEng: 'You can do this -> This CAN BE DONE by you.',
    descriptionUrdu: 'Can, Could, May, Must, Will کے بعد Be لگا کر 3rd form لگائیں۔',
    badgeColor: 'bg-purple-600',
    ruleUrdu: 'Modal + be + 3rd form: It must be cleaned.'
  },
  {
    id: 74,
    title: 'Game 74: Direct to Indirect Speech: Pronoun Rules',
    urduTitle: 'گیم 74: بلاواسطہ سے بالواسطہ (ضمیروں کی تبدیلی SON اصول)',
    category: 'voice-narration',
    categoryUrdu: 'ایکٹو پیسیو اور ڈائریکٹ ان ڈائریکٹ',
    difficulty: 'Challenge',
    descriptionEng: 'First person changes by Subject; Second person by Object; Third no change.',
    descriptionUrdu: 'I کو He/She میں، We کو They میں اور You کو مفعول کے مطابق تبدیل کرنا۔',
    badgeColor: 'bg-purple-600',
    ruleUrdu: '1st person فاعل کے مطابق، 2nd person مفعول کے مطابق، 3rd person میں کوئی تبدیلی نہیں۔'
  },
  {
    id: 75,
    title: 'Game 75: Direct to Indirect Speech: Tense Shifts',
    urduTitle: 'گیم 75: زمانے کی تبدیلی (Present سے Past میں تبدیلی)',
    category: 'voice-narration',
    categoryUrdu: 'ایکٹو پیسیو اور ڈائریکٹ ان ڈائریکٹ',
    difficulty: 'Challenge',
    descriptionEng: 'Present simple becomes past simple; Is/am becomes was; Will becomes would.',
    descriptionUrdu: 'اگر باہر Said ہو تو اندر کا زمانہ ماضی میں بدل جاتا ہے۔',
    badgeColor: 'bg-purple-600',
    ruleUrdu: 'He said, "I am tired" -> He said that he WAS tired.'
  },

  // ==========================================
  // CONDITIONALS & CLAUSES (گیم 76 تا 80)
  // ==========================================
  {
    id: 76,
    title: 'Game 76: Zero Conditional (Scientific Truths)',
    urduTitle: 'گیم 76: زیرو کنڈیشنل (سائنسی حقائق: If + Present, Present)',
    category: 'conditionals',
    categoryUrdu: 'شرطیہ جملے (Conditionals)',
    difficulty: 'Easy',
    descriptionEng: 'If you heat ice, it melts. (Always true in reality).',
    descriptionUrdu: 'قدرتی اور سائنسی سچائیاں: دونوں حصوں میں فعل حال مطلق آتا ہے۔',
    badgeColor: 'bg-rose-600',
    ruleUrdu: 'If + Present Simple, Present Simple.'
  },
  {
    id: 77,
    title: 'Game 77: First Conditional (Real Possibilities)',
    urduTitle: 'گیم 77: فرسٹ کنڈیشنل (حقیقی امکان: If + Present, Will + Verb)',
    category: 'conditionals',
    categoryUrdu: 'شرطیہ جملے (Conditionals)',
    difficulty: 'Medium',
    descriptionEng: 'If it rains tomorrow, we will stay at home.',
    descriptionUrdu: 'مستقبل کا حقیقی امکان: شرط میں Present Simple اور نتیجے میں Will۔',
    badgeColor: 'bg-rose-600',
    ruleUrdu: 'کبھی بھی If والے حصے میں Will نہیں لگتا: If you STUDY hard, you WILL pass.'
  },
  {
    id: 78,
    title: 'Game 78: Second Conditional (Imaginary Dreams)',
    urduTitle: 'گیم 78: سیکنڈ کنڈیشنل (خیالی یا غیر حقیقی: If + Past, Would + Verb)',
    category: 'conditionals',
    categoryUrdu: 'شرطیہ جملے (Conditionals)',
    difficulty: 'Challenge',
    descriptionEng: 'If I had wings, I would fly across the clouds.',
    descriptionUrdu: 'خواہشات اور مفروضے: شرط میں Past Simple اور نتیجے میں Would۔',
    badgeColor: 'bg-rose-600',
    ruleUrdu: 'If I WERE rich, I WOULD help everyone (خیالی باتوں میں I کے ساتھ were لگتا ہے)۔'
  },
  {
    id: 79,
    title: 'Game 79: Third Conditional (Past Regrets)',
    urduTitle: 'گیم 79: تھرڈ کنڈیشنل (ماضی کا پچھتاوا: If + Had + 3rd, Would have + 3rd)',
    category: 'conditionals',
    categoryUrdu: 'شرطیہ جملے (Conditionals)',
    difficulty: 'Challenge',
    descriptionEng: 'If he had worked hard, he would have passed.',
    descriptionUrdu: 'ماضی کا پچھتاوا جو اب نہیں ہو سکتا (Had + 3rd, would have + 3rd)۔',
    badgeColor: 'bg-rose-600',
    ruleUrdu: 'If you had arrived on time, we would have caught the train.'
  },
  {
    id: 80,
    title: 'Game 80: Unless vs If Not',
    urduTitle: 'گیم 80: شرط منفی (Unless کا صحیح استعمال)',
    category: 'conditionals',
    categoryUrdu: 'شرطیہ جملے (Conditionals)',
    difficulty: 'Medium',
    descriptionEng: 'Unless means "if not". Do not use double negatives.',
    descriptionUrdu: 'Unless کا مطلب ہی "اگر نہ" ہے، اس لیے اس کے ساتھ Not نہیں لگایا جاتا۔',
    badgeColor: 'bg-rose-600',
    ruleUrdu: 'Unless you hurry up, you will miss the bus (درست)۔'
  },

  // ==========================================
  // ADVANCED GRAMMAR & COMMON ERRORS (گیم 81 تا 100)
  // ==========================================
  {
    id: 81,
    title: 'Game 81: Gerunds vs Infinitives',
    urduTitle: 'گیم 81: اسم مصدر بمقابلہ امر (Swimming vs To Swim)',
    category: 'advanced',
    categoryUrdu: 'ایڈوانس گرائمر اور فائنل چیلنج',
    difficulty: 'Medium',
    descriptionEng: 'Gerund (-ing acting as noun) vs Infinitive (To + verb).',
    descriptionUrdu: 'فعل کی -ing والی اسم صورت (Reading is good) بمقابلہ To + Verb۔',
    badgeColor: 'bg-violet-600',
    ruleUrdu: 'کچھ افعال کے بعد Gerund آتا ہے (Enjoy swimming) اور کچھ کے بعد Infinitive (Want to learn)۔'
  },
  {
    id: 82,
    title: 'Game 82: Irregular Plurals Challenge',
    urduTitle: 'گیم 82: غیر روایتی جمع کے الفاظ (Foot->Feet, Tooth->Teeth)',
    category: 'advanced',
    categoryUrdu: 'ایڈوانس گرائمر اور فائنل چیلنج',
    difficulty: 'Easy',
    descriptionEng: 'Mouse -> Mice, Person -> People, Child -> Children, Cactus -> Cacti.',
    descriptionUrdu: 'جن کی جمع بنانے کے لیے صرف -s نہیں لگایا جاتا بلکہ اندرونی ہجے بدلتے ہیں۔',
    badgeColor: 'bg-violet-600',
    ruleUrdu: 'One woman -> Two women; One ox -> Two oxen.'
  },
  {
    id: 83,
    title: 'Game 83: Masculine & Feminine Gender Nouns',
    urduTitle: 'گیم 83: مذکر اور مؤنث (King/Queen, Hero/Heroine)',
    category: 'advanced',
    categoryUrdu: 'ایڈوانس گرائمر اور فائنل چیلنج',
    difficulty: 'Easy',
    descriptionEng: 'Nephew/Niece, Uncle/Aunt, Bull/Cow, Stallion/Mare.',
    descriptionUrdu: 'انسانوں اور جانوروں کے نر اور مادہ کے مخصوص انگریزی نام۔',
    badgeColor: 'bg-violet-600',
    ruleUrdu: 'Prince -> Princess, Emperor -> Empress, Actor -> Actress.'
  },
  {
    id: 84,
    title: 'Game 84: Common Prefixes (Un-, Dis-, Im-, Re-)',
    urduTitle: 'گیم 84: سابقے (الفاظ کے شروع میں جوڑ کر نیا لفظ بنانا)',
    category: 'advanced',
    categoryUrdu: 'ایڈوانس گرائمر اور فائنل چیلنج',
    difficulty: 'Medium',
    descriptionEng: 'Happy -> Unhappy, Agree -> Disagree, Possible -> Impossible, Write -> Rewrite.',
    descriptionUrdu: 'لفظ کے شروع میں Un-, Dis-, Re- لگا کر معنی الٹنا یا دہرانا۔',
    badgeColor: 'bg-violet-600',
    ruleUrdu: 'Un- اور Dis- عام طور پر لفظ کو متضاد (منفی) بنا دیتے ہیں۔'
  },
  {
    id: 85,
    title: 'Game 85: Common Suffixes (-ful, -less, -able, -ment)',
    urduTitle: 'گیم 85: لاحقے (الفاظ کے آخر میں جوڑ کر اسم یا صفت بنانا)',
    category: 'advanced',
    categoryUrdu: 'ایڈوانس گرائمر اور فائنل چیلنج',
    difficulty: 'Medium',
    descriptionEng: 'Care -> Careful / Careless, Enjoy -> Enjoyable, Develop -> Development.',
    descriptionUrdu: 'آخر میں -ful, -less لگا کر لفظ کی قسم (صفت یا اسم) تبدیل کرنا۔',
    badgeColor: 'bg-violet-600',
    ruleUrdu: 'Helpful (مددگار) بمقابلہ Helpless (بے بس)۔'
  },
  {
    id: 86,
    title: 'Game 86: Homophones Confusions (There, Their, They\'re)',
    urduTitle: 'گیم 86: ہم آواز مگر مختلف معانی الفاظ (Homophones)',
    category: 'advanced',
    categoryUrdu: 'ایڈوانس گرائمر اور فائنل چیلنج',
    difficulty: 'Medium',
    descriptionEng: 'There (place), Their (belonging), They\'re (they are); To, Too, Two.',
    descriptionUrdu: 'ایک جیسی آواز لیکن ہجے اور معنی بالکل الگ۔',
    badgeColor: 'bg-violet-600',
    ruleUrdu: 'There is a cat (وہاں)؛ It is their house (ان کا)؛ They\'re reading (وہ پڑھ رہے ہیں)۔'
  },
  {
    id: 87,
    title: 'Game 87: Everyday Phrasal Verbs in Context',
    urduTitle: 'گیم 87: روزمرہ فریزل وربز (Give up, Look after, Turn on)',
    category: 'advanced',
    categoryUrdu: 'ایڈوانس گرائمر اور فائنل چیلنج',
    difficulty: 'Medium',
    descriptionEng: 'Verb + Preposition with special meaning: Wake up, Look forward to.',
    descriptionUrdu: 'فعل اور حرف جار مل کر نیا معنی دیتے ہیں جیسے Look after کا مطلب دیکھ بھال کرنا ہے۔',
    badgeColor: 'bg-violet-600',
    ruleUrdu: 'Give up کا مطلب ہمت ہارنا یا ترک کرنا ہے۔'
  },
  {
    id: 88,
    title: 'Game 88: Everyday English Idioms & Proverbs',
    urduTitle: 'گیم 88: مشہور انگریزی ضرب الامثال اور محاورات',
    category: 'advanced',
    categoryUrdu: 'ایڈوانس گرائمر اور فائنل چیلنج',
    difficulty: 'Medium',
    descriptionEng: 'Piece of cake (very easy), Once in a blue moon (very rare).',
    descriptionUrdu: 'لفظی نہیں بلکہ محاوراتی معنی: "Piece of cake" کا مطلب بہت آسان کام ہے۔',
    badgeColor: 'bg-violet-600',
    ruleUrdu: 'A blessing in disguise (بظاہر مشکل مگر حقیقت میں رحمت)۔'
  },
  {
    id: 89,
    title: 'Game 89: Silent Letters Mastery (K, W, B, G, H)',
    urduTitle: 'گیم 89: خاموش حروف کی پہچان (Knife, Write, Doubt, Honest)',
    category: 'advanced',
    categoryUrdu: 'ایڈوانس گرائمر اور فائنل چیلنج',
    difficulty: 'Easy',
    descriptionEng: 'Words with letters written but not pronounced.',
    descriptionUrdu: 'وہ حروف جو لکھے جاتے ہیں مگر بولے نہیں جاتے۔',
    badgeColor: 'bg-violet-600',
    ruleUrdu: 'Knife میں K سائلنٹ ہے، Write میں W سائلنٹ ہے، Honest میں H سائلنٹ ہے۔'
  },
  {
    id: 90,
    title: 'Game 90: English Contractions (I\'m, Won\'t, Can\'t, It\'s)',
    urduTitle: 'گیم 90: مخففات (Contractions: I will -> I\'ll, Do not -> Don\'t)',
    category: 'advanced',
    categoryUrdu: 'ایڈوانس گرائمر اور فائنل چیلنج',
    difficulty: 'Easy',
    descriptionEng: 'Shortening two words into one with an apostrophe.',
    descriptionUrdu: 'دو لفظوں کو ملا کر چھوٹا کرنا اور اپاسٹروفی لگانا۔',
    badgeColor: 'bg-violet-600',
    ruleUrdu: 'Will not کا مخفف Won\'t ہوتا ہے۔ It\'s کا مطلب It is ہے جبکہ Its کا مطلب اس کا ہے۔'
  },
  {
    id: 91,
    title: 'Game 91: Spot the Common Grammar Mistake',
    urduTitle: 'گیم 91: عام غلطیوں کی درستگی (Spot the Mistake)',
    category: 'advanced',
    categoryUrdu: 'ایڈوانس گرائمر اور فائنل چیلنج',
    difficulty: 'Challenge',
    descriptionEng: 'Identify errors: "He don\'t know" vs "He doesn\'t know".',
    descriptionUrdu: 'امتحانی غلطیوں کو پکڑیں اور صحیح جملہ منتخب کریں۔',
    badgeColor: 'bg-violet-600',
    ruleUrdu: 'He/She/It کے ساتھ Don\'t لگانا غلط ہے، ہمیشہ Doesn\'t آتا ہے۔'
  },
  {
    id: 92,
    title: 'Game 92: Preposition Challenge: At vs In vs On',
    urduTitle: 'گیم 92: حروف جار کا سپریم ٹیسٹ (At vs In vs On Challenge)',
    category: 'advanced',
    categoryUrdu: 'ایڈوانس گرائمر اور فائنل چیلنج',
    difficulty: 'Challenge',
    descriptionEng: 'Rapid test of tricky time and place prepositions.',
    descriptionUrdu: 'وقت اور جگہ کے سب سے الجھا دینے والے prepositions کا فوری ٹیسٹ۔',
    badgeColor: 'bg-violet-600',
    ruleUrdu: 'At night, In the morning, On Sunday morning.'
  },
  {
    id: 93,
    title: 'Game 93: Double Negative Elimination',
    urduTitle: 'گیم 93: دوہری نفی کا خاتمہ (Double Negatives)',
    category: 'advanced',
    categoryUrdu: 'ایڈوانس گرائمر اور فائنل چیلنج',
    difficulty: 'Medium',
    descriptionEng: 'Avoid: "I don\'t know nothing" -> "I don\'t know anything".',
    descriptionUrdu: 'ایک جملے میں دو منفی الفاظ لگانے کی غلطی سے بچنا۔',
    badgeColor: 'bg-violet-600',
    ruleUrdu: 'انگریزی میں نفی کے ساتھ Nothing کے بجائے Anything آتا ہے۔'
  },
  {
    id: 94,
    title: 'Game 94: Fast Tense Transformer',
    urduTitle: 'گیم 94: تیز رفتار ٹینس ٹرانسفارمر (حال سے ماضی و مستقبل)',
    category: 'advanced',
    categoryUrdu: 'ایڈوانس گرائمر اور فائنل چیلنج',
    difficulty: 'Challenge',
    descriptionEng: 'Convert sentences swiftly across Present, Past, and Future.',
    descriptionUrdu: 'ایک ہی جملے کو مختلف زمانوں میں تیزی سے تبدیل کرنے کی مشق۔',
    badgeColor: 'bg-violet-600',
    ruleUrdu: 'I eat (حال) -> I ate (ماضی) -> I will eat (مستقبل)۔'
  },
  {
    id: 95,
    title: 'Game 95: Connectors & Transition Words',
    urduTitle: 'گیم 95: ربط پیدا کرنے والے کلمات (However, Therefore, Moreover)',
    category: 'advanced',
    categoryUrdu: 'ایڈوانس گرائمر اور فائنل چیلنج',
    difficulty: 'Challenge',
    descriptionEng: 'Writing connectors that link paragraphs and ideas logically.',
    descriptionUrdu: 'نتیجہ (Therefore)، تضاد (However)، اور اضافہ (Moreover) کے الفاظ۔',
    badgeColor: 'bg-violet-600',
    ruleUrdu: 'Therefore کا مطلب اس لیے/نتیجتاً ہے اور However کا مطلب تاہم/لیکن ہے۔'
  },
  {
    id: 96,
    title: 'Game 96: Direct to Indirect: Commands & Requests',
    urduTitle: 'گیم 96: ان ڈائریکٹ میں احکامات اور التجا (Told to, Requested to)',
    category: 'advanced',
    categoryUrdu: 'ایڈوانس گرائمر اور فائنل چیلنج',
    difficulty: 'Challenge',
    descriptionEng: 'He said, "Please help me" -> He requested me to help him.',
    descriptionUrdu: 'حکم یا التجا کو To + Verb کے ساتھ رپورٹ کرنا۔',
    badgeColor: 'bg-violet-600',
    ruleUrdu: 'منفی حکم میں "Not to" لگاتے ہیں جیسے: He told me not to shout.'
  },
  {
    id: 97,
    title: 'Game 97: English Grammar Riddles',
    urduTitle: 'گیم 97: گرائمر کی ذہین پہیلیاں (Grammar Brain Teasers)',
    category: 'advanced',
    categoryUrdu: 'ایڈوانس گرائمر اور فائنل چیلنج',
    difficulty: 'Medium',
    descriptionEng: 'Solve clever riddles based on parts of speech and sentence rules.',
    descriptionUrdu: 'اسم، فعل اور حروف کے متعلق دلچسپ پہیلیاں بوجھیں۔',
    badgeColor: 'bg-violet-600',
    ruleUrdu: 'ذہانت اور گرائمر کا امتزاج: میں ایکشن دکھاتا ہوں مگر اسم نہیں، میں کیا ہوں؟ (Verb)'
  },
  {
    id: 98,
    title: 'Game 98: Synonym & Antonym Mastery',
    urduTitle: 'گیم 98: ہم معنی اور متضاد الفاظ کا جامع مقابلہ',
    category: 'advanced',
    categoryUrdu: 'ایڈوانس گرائمر اور فائنل چیلنج',
    difficulty: 'Medium',
    descriptionEng: 'Broaden your vocabulary with elegant synonyms and exact opposites.',
    descriptionUrdu: 'بہترین الفاظ کا ذخیرہ: Huge = Enormous, Courageous = Brave.',
    badgeColor: 'bg-violet-600',
    ruleUrdu: 'بہترین بول چال اور تحریر کے لیے ایک ہی لفظ کو بار بار دہرانے کے بجائے مترادفات چنیں۔'
  },
  {
    id: 99,
    title: 'Game 99: Ultimate Spoken & Dialogue Blitz',
    urduTitle: 'گیم 99: تیز رفتار بول چال اور مکالماتی چیلنج',
    category: 'advanced',
    categoryUrdu: 'ایڈوانس گرائمر اور فائنل چیلنج',
    difficulty: 'Challenge',
    descriptionEng: 'Quick responses to daily situations with speed and accuracy.',
    descriptionUrdu: 'روزمرہ حالات میں فوراً مناسب انگریزی جملے کا انتخاب کریں۔',
    badgeColor: 'bg-violet-600',
    ruleUrdu: 'موقع کے لحاظ سے بالکل نیچرل اور مناسب انگریزی جواب چنیں۔'
  },
  {
    id: 100,
    title: 'Game 100: Grand Master Grammar Championship',
    urduTitle: 'گیم 100: گرینڈ ماسٹر چیمپئن شپ مع گولڈ ٹرافی (Gold Trophy)',
    category: 'advanced',
    categoryUrdu: 'ایڈوانس گرائمر اور فائنل چیلنج',
    difficulty: 'Challenge',
    descriptionEng: 'The final ultimate 100th game covering all grammar pillars! Win the Gold Trophy.',
    descriptionUrdu: 'تمام 100 گیمز کا فائنل ماسٹر ٹیسٹ! 20 سوالات حل کر کے گولڈ ٹرافی جیتیں۔',
    badgeColor: 'bg-amber-500',
    ruleUrdu: 'مکمل انگریزی گرائمر، 12 ٹینسز اور بول چال پر مکمل عبور کا فائنل سرٹیفکیٹ۔'
  }
];
