import { GameQuestion } from '../games100';

function q(
  id: string,
  type: 'fill-blank' | 'multiple-choice' | 'sentence-unscramble',
  prompt: string,
  urduPrompt: string,
  options: string[] | undefined,
  correctAnswer: string,
  urduMeaning: string,
  wordsToArrange?: string[],
  audioText?: string
): GameQuestion {
  return {
    id,
    type,
    prompt,
    urduPrompt,
    options,
    correctAnswer,
    urduMeaning,
    wordsToArrange,
    audioText: audioText || (type === 'fill-blank' ? prompt.replace('____', correctAnswer) : correctAnswer)
  };
}

/**
 * 13 DAILY SPOKEN & CONVERSATIONAL ENGLISH GAMES (Games 13 to 25) - 20 authentic questions each!
 */
export function getSpokenQuestions(gameId: number): GameQuestion[] {
  const p = `sp${gameId}`;

  switch (gameId) {
    // -------------------------------------------------------------
    // Game 13: Greetings & Introductions (سلام اور تعارف)
    // -------------------------------------------------------------
    case 13:
      return [
        q(`${p}-1`, 'multiple-choice', 'When meeting someone in the morning, what is the best greeting?', 'صبح کے وقت ملنے پر بہترین سلام کیا ہے؟', ['Good morning!', 'Good night!', 'Good evening!', 'See you yesterday!'], 'Good morning!', 'صبح بخیر (Good morning)'),
        q(`${p}-2`, 'multiple-choice', 'How do you ask someone\'s name politely?', 'کسی کا نام شائستگی سے کیسے پوچھیں گے؟', ['May I know your name, please?', 'Who are you?', 'Tell name fast!', 'What name you have?'], 'May I know your name, please?', 'کیا میں آپ کا نام جان سکتا ہوں؟'),
        q(`${p}-3`, 'multiple-choice', 'When someone says "How do you do?", what is the formal reply?', 'جب کوئی "How do you do?" کہے تو رسمی جواب کیا ہوتا ہے؟', ['How do you do?', 'I am doing homework.', 'I am ten.', 'Goodbye!'], 'How do you do?', 'How do you do کا جواب How do you do ہی ہوتا ہے۔'),
        q(`${p}-4`, 'multiple-choice', 'When someone introduces themselves, what polite phrase do you say?', 'تعارف کے بعد شائستہ فقرہ کیا بولا جاتا ہے؟', ['Nice to meet you!', 'Get away!', 'I don\'t care.', 'Never mind.'], 'Nice to meet you!', 'آپ سے مل کر بہت خوشی ہوئی!'),
        q(`${p}-5`, 'multiple-choice', 'How do you introduce your friend Ali to someone else?', 'اپنے دوست علی کا تعارف کسی اور سے کیسے کروائیں گے؟', ['This is my friend, Ali.', 'He is that boy Ali.', 'Ali is here look.', 'I have an Ali.'], 'This is my friend, Ali.', 'یہ میرا دوست علی ہے۔'),
        q(`${p}-6`, 'fill-blank', '"Hello! How ____ you today?" - "I am doing great!"', 'آپ آج کیسے ہیں؟', ['are', 'is', 'am', 'was'], 'are', 'How are you?'),
        q(`${p}-7`, 'fill-blank', '"Where ____ you from?" - "I am from Islamabad."', 'آپ کا تعلق کہاں سے ہے؟', ['are', 'do', 'is', 'have'], 'are', 'Where are you from?'),
        q(`${p}-8`, 'multiple-choice', 'What is a casual friendly greeting among classmates?', 'ہم جماعتوں کے درمیان بے تکلف سلام کیا ہے؟', ['Hey! What\'s up?', 'Respected Sir, greetings.', 'Your Majesty, hello.', 'To whom it may concern.'], 'Hey! What\'s up?', 'اور سناؤ کیا حال ہے؟'),
        q(`${p}-9`, 'multiple-choice', 'How do you say goodbye when you expect to meet tomorrow?', 'کل دوبارہ ملنے پر رخصتی کا فقرہ:', ['See you tomorrow!', 'Good morning!', 'Yesterday was fun.', 'Welcome!'], 'See you tomorrow!', 'کل ملیں گے!'),
        q(`${p}-10`, 'fill-blank', '"It was a ____ talking to you." - "Same here!"', 'آپ سے بات کر کے بہت خوشی ہوئی۔', ['pleasure', 'problem', 'pain', 'punishment'], 'pleasure', 'It was a pleasure talking to you.'),
        q(`${p}-11`, 'sentence-unscramble', 'Arrange the words in correct order:', 'الفاظ ترتیب دیں: "میرا نام احمد ہے"', undefined, 'My name is Ahmad', 'میرا نام احمد ہے۔', ['is', 'name', 'My', 'Ahmad']),
        q(`${p}-12`, 'sentence-unscramble', 'Arrange the words in correct order:', 'الفاظ ترتیب دیں: "آپ سے مل کر خوشی ہوئی"', undefined, 'Nice to meet you', 'آپ سے مل کر خوشی ہوئی۔', ['to', 'Nice', 'meet', 'you']),
        q(`${p}-13`, 'multiple-choice', 'When parting at night before going to sleep, you say:', 'رات کو سونے سے پہلے رخصت ہوتے وقت کیا کہتے ہیں؟', ['Good night and sweet dreams!', 'Good afternoon!', 'Good morning!', 'Good day!'], 'Good night and sweet dreams!', 'شب بخیر!'),
        q(`${p}-14`, 'fill-blank', '"____ to our home!" said the host politely.', 'ہمارے گھر میں خوش آمدید!', ['Welcome', 'Go back', 'Out', 'Wait'], 'Welcome', 'Welcome to our home!'),
        q(`${p}-15`, 'multiple-choice', 'How do you respond when someone asks "How have you been?"', '"How have you been?" کا مناسب جواب:', ['I have been doing very well, thank you!', 'Yes, I am a boy.', 'At five o\'clock.', 'Because it was cold.'], 'I have been doing very well, thank you!', 'میں بالکل خیریت سے ہوں، شکریہ!'),
        q(`${p}-16`, 'fill-blank', '"Have a ____ weekend!" - "Thank you, you too!"', 'آپ کی چھٹی کا دن شاندار گزرے!', ['wonderful', 'bad', 'sour', 'rough'], 'wonderful', 'Have a wonderful weekend!'),
        q(`${p}-17`, 'multiple-choice', 'What should you say if you did not hear the person\'s name?', 'اگر آپ نے دوسرے شخص کا نام صاف نہیں سنا تو کیا کہیں گے؟', ['Pardon me, could you repeat your name please?', 'Shout louder!', 'Your name is wrong.', 'I forgot.'], 'Pardon me, could you repeat your name please?', 'معاف کیجیے گا، کیا آپ اپنا نام دہرا سکتے ہیں؟'),
        q(`${p}-18`, 'fill-blank', '"Please take a ____." - "Thank you very much."', 'براہِ کرم تشریف رکھیے (بیٹھ جائیے)۔', ['seat', 'walk', 'jump', 'book'], 'seat', 'Please take a seat.'),
        q(`${p}-19`, 'multiple-choice', 'How do you politely end a telephone conversation?', 'فون کال شائستگی سے ختم کرنے کا انداز:', ['Thank you for calling. Have a great day!', 'Hang up now.', 'I am shutting phone.', 'Stop talking.'], 'Thank you for calling. Have a great day!', 'فون کرنے کا شکریہ، آپ کا دن اچھا گزرے!'),
        q(`${p}-20`, 'multiple-choice', 'When greeting a teacher in English morning assembly:', 'سکول کی صبح اسمبلی میں استاد کو سلام کا انداز:', ['Good morning, respected teacher!', 'Hey dude!', 'Yo teacher!', 'What\'s cooking?'], 'Good morning, respected teacher!', 'گڈ مارننگ محترم استاد محترم!')
      ];

    // -------------------------------------------------------------
    // Game 14: Asking & Giving Directions (راستہ پوچھنا اور بتانا)
    // -------------------------------------------------------------
    case 14:
      return [
        q(`${p}-1`, 'multiple-choice', 'How do you politely ask for directions to the railway station?', 'ریلوے اسٹیشن کا راستہ شائستگی سے کیسے پوچھیں گے؟', ['Excuse me, could you tell me the way to the railway station?', 'Where station is?', 'Take me station now.', 'Station where?'], 'Excuse me, could you tell me the way to the railway station?', 'معاف کیجیے گا، کیا آپ مجھے ریلوے اسٹیشن کا راستہ بتا سکتے ہیں؟'),
        q(`${p}-2`, 'fill-blank', 'Go straight and then ____ left at the traffic light.', 'سیدھے جائیں اور ٹریفک لائٹ سے بائیں مڑیں۔', ['turn', 'turned', 'turns', 'turning'], 'turn', 'turn left (بائیں مڑیں)'),
        q(`${p}-3`, 'fill-blank', 'The hospital is ____ the right side of the main road.', 'ہسپتال مین روڈ کے دائیں طرف ہے۔', ['on', 'in', 'at', 'into'], 'on', 'on the right side (دائیں طرف)'),
        q(`${p}-4`, 'multiple-choice', 'What does "Go straight ahead" mean in Urdu?', '"Go straight ahead" کا اردو میں کیا مطلب ہے؟', ['بالکل سیدھے چلتے جائیں', 'پیچھے مڑ جائیں', 'رک جائیں', 'گول گھومیں'], 'بالکل سیدھے چلتے جائیں', 'سیدھے آگے بڑھتے جائیں'),
        q(`${p}-5`, 'fill-blank', 'The bank is located ____ to the pharmacy.', 'بینک فارمیسی کے بالکل ساتھ واقع ہے۔', ['next', 'nearer', 'far', 'across'], 'next', 'next to (کے بالکل ساتھ)'),
        q(`${p}-6`, 'fill-blank', 'Is the post office ____ from here or nearby?', 'کیا ڈاکخانہ یہاں سے دور ہے یا قریب؟', ['far', 'long', 'high', 'deep'], 'far', 'far from here (یہاں سے دور)'),
        q(`${p}-7`, 'multiple-choice', 'What is the opposite of "turn left"?', '"Turn left" کا الٹ کیا ہے؟', ['Turn right', 'Turn back', 'Go straight', 'Stop'], 'Turn right', 'دائیں مڑیں (Turn right)'),
        q(`${p}-8`, 'fill-blank', 'Walk past the supermarket and cross the ____.', 'سپر مارکیٹ سے آگے بڑھیں اور سڑک پار کریں۔', ['street', 'sky', 'roof', 'ocean'], 'street', 'cross the street (سڑک پار کریں)'),
        q(`${p}-9`, 'multiple-choice', 'How do you ask: "How long does it take to get there?"', 'کتنا وقت لگے گا، یہ پوچھنے کا انگریزی جملہ:', ['How long does it take to reach there?', 'How much time go there?', 'Time what taken?', 'When reaching now?'], 'How long does it take to reach there?', 'وہاں پہنچنے میں کتنا وقت لگتا ہے؟'),
        q(`${p}-10`, 'fill-blank', 'It is about a ten-minute walk ____ foot.', 'پیدل تقریباً دس منٹ کا راستہ ہے۔', ['on', 'by', 'in', 'with'], 'on', 'on foot (پیدل)'),
        q(`${p}-11`, 'sentence-unscramble', 'Arrange the words in correct order:', 'الفاظ ترتیب دیں: "ٹریفک سگنل پر بائیں مڑیں"', undefined, 'Turn left at the traffic signal', 'ٹریفک سگنل پر بائیں مڑیں۔', ['Turn', 'left', 'at', 'the', 'traffic', 'signal']),
        q(`${p}-12`, 'sentence-unscramble', 'Arrange the words in correct order:', 'الفاظ ترتیب دیں: "ہسپتال سامنے ہے"', undefined, 'The hospital is opposite the park', 'ہسپتال پارک کے سامنے ہے۔', ['The', 'hospital', 'is', 'opposite', 'the', 'park']),
        q(`${p}-13`, 'multiple-choice', 'What does "at the roundabout" mean?', '"At the roundabout" کا اردو مطلب کیا ہے؟', ['چوراہے یا گول چکر پر', 'گلی کے اندر', 'پل کے نیچے', 'دیوار کے پیچھے'], 'چوراہے یا گول چکر پر', 'گول چکر پر (roundabout)'),
        q(`${p}-14`, 'fill-blank', 'The school is located ____ the library and the mosque.', 'سکول لائبریری اور مسجد کے درمیان واقع ہے۔', ['between', 'among', 'into', 'from'], 'between', 'between (دو چیزوں کے درمیان)'),
        q(`${p}-15`, 'multiple-choice', 'How do you say: "You have come the wrong way"?', '"آپ غلط راستے پر آ گئے ہیں" کا انگریزی ترجمہ:', ['You have taken the wrong turn.', 'You are bad path.', 'No way you have.', 'Wrong road you make.'], 'You have taken the wrong turn.', 'آپ نے غلط موڑ لے لیا ہے۔'),
        q(`${p}-16`, 'fill-blank', 'Keep walking ____ you see the clock tower.', 'چلتے رہیں جب تک کہ آپ کو گھنٹہ گھر نظر نہ آئے۔', ['until', 'since', 'during', 'unless'], 'until', 'until you see (جب تک)'),
        q(`${p}-17`, 'multiple-choice', 'What does "across the street" mean?', '"Across the street" کا مطلب کیا ہے؟', ['سڑک کے اس پار / سامنے', 'سڑک کے اندر', 'سڑک پر بیٹھ کر', 'سڑک کے نیچے'], 'سڑک کے اس پار / سامنے', 'سڑک پار کر کے دوسری طرف'),
        q(`${p}-18`, 'fill-blank', 'Can you show me the location on Google ____?', 'کیا آپ مجھے گوگل میپ پر مقام دکھا سکتے ہیں؟', ['Maps', 'Book', 'Page', 'Card'], 'Maps', 'Google Maps'),
        q(`${p}-19`, 'multiple-choice', 'When someone gives you correct directions, you say:', 'راستہ بتانے پر آپ کا شکریہ ادا کرنے کا انداز:', ['Thank you so much, that was very helpful!', 'Go away.', 'I knew it.', 'Bad direction.'], 'Thank you so much, that was very helpful!', 'بہت بہت شکریہ، آپ کی رہنمائی مفید ثابت ہوئی!'),
        q(`${p}-20`, 'fill-blank', 'Take the second turning on your ____.', 'اپنے دائیں ہاتھ پر دوسرا موڑ مڑیں۔', ['right', 'wrong', 'straight', 'ahead'], 'right', 'on your right (اپنے دائیں ہاتھ پر)')
      ];

    // -------------------------------------------------------------
    // Game 15: Ordering Food in Restaurant (کھانا آرڈر کرنا)
    // -------------------------------------------------------------
    case 15:
      return [
        q(`${p}-1`, 'multiple-choice', 'When entering a restaurant, how do you ask for a table for two?', 'دو افراد کی میز کے لیے کیا کہیں گے؟', ['Could we have a table for two, please?', 'Give two chairs fast.', 'I want table now.', 'Two people food.'], 'Could we have a table for two, please?', 'کیا ہمیں دو افراد کے لیے میز مل سکتی ہے؟'),
        q(`${p}-2`, 'fill-blank', 'Waiter: "Are you ready to ____ your order, sir?"', 'کیا آپ کھانا آرڈر کرنے کے لیے تیار ہیں؟', ['place', 'put', 'drop', 'throw'], 'place', 'place your order (آرڈر دینا)'),
        q(`${p}-3`, 'fill-blank', '"I would like to order chicken ____ and garlic naan."', 'میں چکن کڑاہی اور گارلک نان آرڈر کرنا چاہوں گا۔', ['karahi', 'ball', 'water', 'plate'], 'karahi', 'chicken karahi'),
        q(`${p}-4`, 'multiple-choice', 'How do you ask for the food menu politely?', 'کھانے کا مینو مانگنے کا شائستہ انداز:', ['May I see the menu, please?', 'Throw menu here.', 'Where paper of food?', 'Bring book.'], 'May I see the menu, please?', 'کیا میں مینو کارڈ دیکھ سکتا ہوں؟'),
        q(`${p}-5`, 'fill-blank', 'Customer: "Could you please bring a glass of ____ water?"', 'کیا آپ ایک گلاس ٹھنڈا پانی لا سکتے ہیں؟', ['cold', 'burnt', 'sharp', 'rough'], 'cold', 'cold water'),
        q(`${p}-6`, 'multiple-choice', 'What is the waiter\'s question: "Still or sparkling water?" asking?', '"Still or sparkling water" کا کیا مطلب ہے؟', ['سادہ پانی یا گیس والا سوڈا پانی؟', 'گرم یا برف؟', 'میٹھا یا نمکین؟', 'دودھ یا جوس؟'], 'سادہ پانی یا گیس والا سوڈا پانی؟', 'سادہ پانی (still) یا کاربونیٹڈ (sparkling)'),
        q(`${p}-7`, 'fill-blank', '"Could we have the ____, please?" (to pay at the end)', 'کھانے کے بعد بل مانگنے کا فقرہ:', ['bill', 'newspaper', 'ticket', 'passport'], 'bill', 'Could we have the bill, please? (بل لا دیجیے)'),
        q(`${p}-8`, 'multiple-choice', 'How do you ask if food is spicy or mild?', 'کھانا تیز مرچوں والا ہے یا ہلکا، یہ کیسے پوچھیں گے؟', ['Is this dish very spicy or mild?', 'How much red chili in it?', 'Does it burn tongue?', 'Is food angry?'], 'Is this dish very spicy or mild?', 'کیا یہ کھانا زیادہ مصالحے دار ہے یا ہلکا؟'),
        q(`${p}-9`, 'fill-blank', '"Can I pay by credit ____ or cash?"', 'کیا میں کریڈٹ کارڈ یا نقد ادائیگی کر سکتا ہوں؟', ['card', 'paper', 'stamp', 'note'], 'card', 'credit card'),
        q(`${p}-10`, 'multiple-choice', 'When the food is delicious, what compliment do you give the chef?', 'کھانا لذیذ ہونے پر تعریفی کلمہ:', ['The food was absolutely delicious and mouth-watering!', 'It was not poisonous.', 'I ate it all.', 'Too much salt.'], 'The food was absolutely delicious and mouth-watering!', 'کھانا واقعی بے حد لذیذ اور شاندار تھا!'),
        q(`${p}-11`, 'sentence-unscramble', 'Arrange the words in correct order:', 'الفاظ ترتیب دیں: "کیا ہم بل لے سکتے ہیں؟"', undefined, 'Could we have the bill please', 'کیا ہم بل لے سکتے ہیں؟', ['Could', 'we', 'have', 'the', 'bill', 'please']),
        q(`${p}-12`, 'sentence-unscramble', 'Arrange the words in correct order:', 'الفاظ ترتیب دیں: "میں ایک کپ چائے لینا چاہوں گا"', undefined, 'I would like a cup of tea', 'میں ایک کپ چائے چاہوں گا۔', ['would', 'I', 'like', 'a', 'cup', 'of', 'tea']),
        q(`${p}-13`, 'multiple-choice', 'What does "appetizer" or "starter" mean?', '"Appetizer / Starter" کا کیا مطلب ہے؟', ['اصل کھانے سے پہلے ہلکی پھلکی غذا', 'کھانے کے بعد میٹھا', 'صرف پانی', 'بل کی رسید'], 'اصل کھانے سے پہلے ہلکی پھلکی غذا', 'شروعاتی ہلکا کھانا جیسے سوپ یا سلاد'),
        q(`${p}-14`, 'fill-blank', '"What do you ____ for dessert?" - "Chocolate cake!"', 'میٹھے میں کیا تجویز کرتے ہیں؟', ['recommend', 'refuse', 'hate', 'destroy'], 'recommend', 'What do you recommend? (آپ کیا تجویز کرتے ہیں؟)'),
        q(`${p}-15`, 'multiple-choice', 'How do you ask to pack remaining food?', 'بچا ہوا کھانا پیک کروانے کا شائستہ جملہ:', ['Could you pack this in a takeaway box, please?', 'Give plastic bag.', 'I take leftovers home.', 'Wrap it in paper.'], 'Could you pack this in a takeaway box, please?', 'کیا آپ اسے پارسل یا ٹیک اوے باکس میں پیک کر سکتے ہیں؟'),
        q(`${p}-16`, 'fill-blank', '"Keep the ____," said the generous guest to the waiter.', 'باقی پیسے اپنے پاس رکھ لیں (ٹپ کے طور پر)۔', ['change', 'plate', 'fork', 'menu'], 'change', 'Keep the change (باقی رقم آپ کی ہوئی)'),
        q(`${p}-17`, 'multiple-choice', 'What does "complimentary" mean in a restaurant?', 'اگر مینو پر "Complimentary" لکھا ہو تو اس کا مطلب:', ['مفت / ریسٹورنٹ کی طرف سے تحفہ', 'بہت مہنگا', 'صرف بڑوں کے لیے', 'باہر سے لایا گیا'], 'مفت / ریسٹورنٹ کی طرف سے تحفہ', 'ریستوران کی جانب سے فری پیشکش'),
        q(`${p}-18`, 'fill-blank', 'Customer: "Excuse me, we are ____ a spoon and fork."', 'ہمارے پاس چمچ اور کانٹے کی کمی ہے۔', ['missing', 'hiding', 'losing', 'buying'], 'missing', 'missing a spoon and fork'),
        q(`${p}-19`, 'multiple-choice', 'If someone is vegetarian, what do they ask?', 'اگر کوئی صرف سبزی کھاتا ہو تو کیا پوچھے گا؟', ['Do you have vegetarian dishes on the menu?', 'Do you have goat meat?', 'I eat only grass.', 'Where are chickens?'], 'Do you have vegetarian dishes on the menu?', 'کیا مینو میں سبزیوں والے کھانے ہیں؟'),
        q(`${p}-20`, 'fill-blank', '"Enjoy your ____!" said the smiling waiter.', 'اپنے کھانے سے لطف اندوز ہوں!', ['meal', 'sleep', 'flight', 'exam'], 'meal', 'Enjoy your meal! (کھانے کا مزہ لیں!)')
      ];

    // -------------------------------------------------------------
    // Game 16: Shopping & Bargaining (خریداری اور قیمت پوچھنا)
    // -------------------------------------------------------------
    case 16:
      return [
        q(`${p}-1`, 'multiple-choice', 'How do you ask the price of a jacket in a shop?', 'دکان پر جیکٹ کی قیمت کیسے پوچھیں گے؟', ['How much does this jacket cost?', 'Price of clothes tell.', 'Why so much money?', 'How heavy is jacket?'], 'How much does this jacket cost?', 'اس جیکٹ کی کیا قیمت ہے؟'),
        q(`${p}-2`, 'fill-blank', '"Do you have this shirt in a larger ____?"', 'کیا یہ قمیض بڑے سائز میں دستیاب ہے؟', ['size', 'weight', 'year', 'house'], 'size', 'in a larger size (بڑے سائز میں)'),
        q(`${p}-3`, 'multiple-choice', 'How do you politely ask for a discount?', 'رعایت مانگنے کا شائستہ انداز:', ['Could you give me a little discount, please?', 'Reduce price or I leave!', 'Cheaper fast!', 'Why looting me?'], 'Could you give me a little discount, please?', 'کیا آپ کچھ رعایت کر سکتے ہیں؟'),
        q(`${p}-4`, 'fill-blank', 'Where is the fitting ____ so I can try this on?', 'ٹرائل روم یا کپڑے پہن کر دیکھنے کا کمرہ کہاں ہے؟', ['room', 'kitchen', 'roof', 'garden'], 'room', 'fitting room (کپڑے آزمانے کا کمرہ)'),
        q(`${p}-5`, 'multiple-choice', 'What does "Buy 1 Get 1 Free" mean?', '"Buy 1 Get 1 Free" کا کیا مطلب ہے؟', ['ایک خریدیں اور ایک مفت پائیں', 'دونوں کے پیسے دیں', 'آدھی قیمت پر خریدیں', 'کوئی چیز نہ خریدیں'], 'ایک خریدیں اور ایک مفت پائیں', 'ایک کی خریداری پر دوسری چیز مفت'),
        q(`${p}-6`, 'fill-blank', '"Can I pay by credit card or ____ only?"', 'کیا میں کارڈ سے ادائیگی کروں یا صرف نقد چلے گا؟', ['cash', 'paper', 'wood', 'sand'], 'cash', 'cash only (صرف نقد)'),
        q(`${p}-7`, 'multiple-choice', 'What does the shopkeeper say: "It suits you very well"?', '"It suits you very well" کا اردو ترجمہ:', ['یہ آپ پر بہت جچ رہا ہے / خوبصورت لگ رہا ہے', 'یہ خراب ہے', 'یہ بہت تنگ ہے', 'یہ پرانا ماڈل ہے'], 'یہ آپ پر بہت جچ رہا ہے / خوبصورت لگ رہا ہے', 'یہ لباس آپ کی شخصیت پر جچتا ہے۔'),
        q(`${p}-8`, 'fill-blank', 'Please give me the purchase ____ for warranty.', 'وارنٹی کے لیے خریداری کی رسید دیں۔', ['receipt', 'ticket', 'newspaper', 'letter'], 'receipt', 'purchase receipt (خریداری کی رسید)'),
        q(`${p}-9`, 'multiple-choice', 'How do you ask if they have other colors?', 'دوسرے رنگوں کی دستیابی پوچھنے کا جملہ:', ['Do you have this in other colors?', 'Why only black?', 'Make red color now.', 'Color change fast.'], 'Do you have this in other colors?', 'کیا یہ کسی اور رنگ میں دستیاب ہے؟'),
        q(`${p}-10`, 'fill-blank', '"This fabric is made of 100% pure ____."', 'یہ کپڑا خالص سوتی (کاٹن) کا بنا ہے۔', ['cotton', 'plastic', 'glass', 'stone'], 'cotton', 'pure cotton (خالص کاٹن)'),
        q(`${p}-11`, 'sentence-unscramble', 'Arrange the words in correct order:', 'الفاظ ترتیب دیں: "اس کی کیا قیمت ہے؟"', undefined, 'How much does this cost', 'اس کی قیمت کتنی ہے؟', ['How', 'much', 'does', 'this', 'cost']),
        q(`${p}-12`, 'sentence-unscramble', 'Arrange the words in correct order:', 'الفاظ ترتیب دیں: "کیا میں اسے پہن کر دیکھ سکتا ہوں؟"', undefined, 'Can I try this on please', 'کیا میں اسے آزما کر دیکھ سکتا ہوں؟', ['Can', 'I', 'try', 'this', 'on', 'please']),
        q(`${p}-13`, 'multiple-choice', 'What does "out of stock" mean?', '"Out of stock" کا مطلب کیا ہے؟', ['مال ختم ہو چکا ہے / فی الحال دستیاب نہیں', 'دکان بند ہے', 'قیمت کم ہو گئی', 'نئی دکان کھلی ہے'], 'مال ختم ہو چکا ہے / فی الحال دستیاب نہیں', 'اسٹاک میں موجود نہیں'),
        q(`${p}-14`, 'fill-blank', '"Is there any ____ or guarantee on this watch?"', 'کیا اس گھڑی پر کوئی وارنٹی یا گارنٹی ہے؟', ['warranty', 'curse', 'punishment', 'debt'], 'warranty', 'warranty (وارنٹی)'),
        q(`${p}-15`, 'multiple-choice', 'How do you say: "I am just looking around"?', '"میں بس دکان کا جائزہ لے رہا ہوں" کا انگریزی جملہ:', ['I am just browsing / looking around, thanks!', 'Go away salesman.', 'I don\'t want to buy anything ever.', 'Leave me.'], 'I am just browsing / looking around, thanks!', 'میں صرف دیکھ رہا ہوں، شکریہ!'),
        q(`${p}-16`, 'fill-blank', 'Customer: "Can I exchange this if the size doesn\'t ____?"', 'اگر سائز پورا نہ آئے تو کیا میں تبدیل کر سکتا ہوں؟', ['fit', 'break', 'cry', 'burn'], 'fit', 'doesn\'t fit (پورا نہ آئے)'),
        q(`${p}-17`, 'multiple-choice', 'What does "50% Off" mean?', '"50% Off" کا مطلب کیا ہے؟', ['آدھی قیمت پر چھوٹ / نصف قیمت', 'دوگنی قیمت', 'مفت چیز', 'پورے دام'], 'آدھی قیمت پر چھوٹ / نصف قیمت', 'نصف قیمت کی رعایت'),
        q(`${p}-18`, 'fill-blank', '"Would you like a shopping ____ for these items?"', 'کیا آپ کو ان چیزوں کے لیے شاپنگ بیگ چاہیے؟', ['bag', 'box', 'cup', 'spoon'], 'bag', 'shopping bag'),
        q(`${p}-19`, 'multiple-choice', 'When saying that something is too expensive:', 'جب کوئی چیز بہت زیادہ مہنگی لگے:', ['This is a bit beyond my budget.', 'You are thief.', 'No money on earth for this.', 'Free give.'], 'This is a bit beyond my budget.', 'یہ میرے بجٹ سے تھوڑا زیادہ ہے۔'),
        q(`${p}-20`, 'fill-blank', 'Shopkeeper: "Thank you for shopping with us! Have a ____ day!"', 'ہمارے ساتھ شاپنگ کا شکریہ، آپ کا دن اچھا گزرے!', ['nice', 'cold', 'sour', 'dark'], 'nice', 'Have a nice day!')
      ];

    // -------------------------------------------------------------
    // Game 17: At the Doctor & Health (ڈاکٹر اور صحت کی گفتگو)
    // -------------------------------------------------------------
    case 17:
      return [
        q(`${p}-1`, 'multiple-choice', 'How do you tell the doctor that your head hurts?', 'ڈاکٹر کو سر درد بتانے کا انگریزی جملہ:', ['Doctor, I have a severe headache.', 'My head is broken.', 'Brain crying.', 'Head making noise.'], 'Doctor, I have a severe headache.', 'ڈاکٹر صاحب، مجھے شدید سر درد ہے۔'),
        q(`${p}-2`, 'fill-blank', 'Doctor: "Where does it ____ exactly?"', 'ٹھیک کہاں درد ہو رہا ہے؟', ['hurt', 'dance', 'laugh', 'sing'], 'hurt', 'Where does it hurt? (درد کہاں ہے؟)'),
        q(`${p}-3`, 'fill-blank', '"I have been running a high ____ since last night."', 'مجھے کل رات سے تیز بخار ہے۔', ['fever', 'joy', 'smile', 'sleep'], 'fever', 'running a fever (بخار ہونا)'),
        q(`${p}-4`, 'multiple-choice', 'What does "Take this medicine twice a day after meals" mean?', 'اس ڈاکٹر کی ہدایت کا اردو ترجمہ کیا ہے؟', ['یہ دوا دن میں دو بار کھانے کے بعد لیں', 'خالی پیٹ لیں', 'رات کو چار بار لیں', 'صرف پانی میں ملا کر پیئیں'], 'یہ دوا دن میں دو بار کھانے کے بعد لیں', 'کھانے کے بعد دن میں دو خوراکیں'),
        q(`${p}-5`, 'fill-blank', 'Doctor: "Take a deep ____ and exhale slowly."', 'گہرا سانس لیں اور آہستہ سے باہر نکالیں۔', ['breath', 'run', 'step', 'jump'], 'breath', 'Take a deep breath (گہرا سانس لیں)'),
        q(`${p}-6`, 'multiple-choice', 'How do you say you have a sore throat?', 'گلے میں خراش یا درد بتانے کا جملہ:', ['I have a sore throat and trouble swallowing.', 'My neck is sour.', 'Throat is angry.', 'Voice dead.'], 'I have a sore throat and trouble swallowing.', 'میرے گلے میں درد ہے اور نگلنے میں تکلیف ہے۔'),
        q(`${p}-7`, 'fill-blank', 'The doctor wrote a medical ____ for the pharmacy.', 'ڈاکٹر نے فارمیسی کے لیے نسخہ لکھا۔', ['prescription', 'story', 'letter', 'novel'], 'prescription', 'prescription (ڈاکٹر کا نسخہ)'),
        q(`${p}-8`, 'multiple-choice', 'What does "Are you allergic to any medication?" mean?', 'ڈاکٹر کے اس سوال کا مطلب کیا ہے؟', ['کیا آپ کو کسی دوا سے الرجی یا نقصان ہوتا ہے؟', 'کیا آپ دوائیں پسند کرتے ہیں؟', 'آپ کے پاس کتنی گولیاں ہیں؟', 'آپ دوا کب کھائیں گے؟'], 'کیا آپ کو کسی دوا سے الرجی یا نقصان ہوتا ہے؟', 'دوا سے الرجی یا حساسیت کی تصدیق'),
        q(`${p}-9`, 'fill-blank', 'Doctor: "You need plenty of bed ____ and warm fluids."', 'آپ کو مکمل آرام اور گرم مشروبات کی ضرورت ہے۔', ['rest', 'running', 'games', 'travel'], 'rest', 'bed rest (بستر پر آرام)'),
        q(`${p}-10`, 'multiple-choice', 'How do you ask: "Is it anything serious, doctor?"', '"کیا کوئی پریشانی یا سنجیدہ بات ہے ڈاکٹر صاحب؟" کا ترجمہ:', ['Is it anything serious, doctor?', 'Am I dying now?', 'Why illness here?', 'Doctor what bad thing?'], 'Is it anything serious, doctor?', 'کیا کوئی سنگین مسئلہ ہے؟'),
        q(`${p}-11`, 'sentence-unscramble', 'Arrange the words in correct order:', 'الفاظ ترتیب دیں: "مجھے شدید سر درد ہے"', undefined, 'I have a severe headache', 'مجھے شدید سر درد ہے۔', ['have', 'I', 'a', 'severe', 'headache']),
        q(`${p}-12`, 'sentence-unscramble', 'Arrange the words in correct order:', 'الفاظ ترتیب دیں: "یہ دوا دن میں تین بار لیں"', undefined, 'Take this medicine three times daily', 'یہ دوا دن میں تین بار لیں۔', ['Take', 'this', 'medicine', 'three', 'times', 'daily']),
        q(`${p}-13`, 'multiple-choice', 'What is an "appointment" at a clinic?', 'کلینک پر "Appointment" کا کیا مطلب ہے؟', ['ڈاکٹر سے معائنے کا پہلے سے طے شدہ وقت', 'دوا کی فیس', 'خون کا ٹیسٹ', 'ایمرجنسی وارڈ'], 'ڈاکٹر سے معائنے کا پہلے سے طے شدہ وقت', 'مقررہ وقت (appointment)'),
        q(`${p}-14`, 'fill-blank', '"I feel dizzy and ____ when I stand up quickly."', 'جلدی اٹھنے پر مجھے چکر اور متلی آتی ہے۔', ['nauseous', 'happy', 'strong', 'fresh'], 'nauseous', 'dizzy and nauseous (چکر اور متلی)'),
        q(`${p}-15`, 'multiple-choice', 'How do you say you have a stomachache?', 'پیٹ درد کا انگریزی اظہار:', ['I have an upset stomach / stomachache.', 'My tummy is fighting.', 'Food is crying inside.', 'Belly broken.'], 'I have an upset stomach / stomachache.', 'میرے پیٹ میں درد اور خرابی ہے۔'),
        q(`${p}-16`, 'fill-blank', 'The nurse checked my blood ____ with an arm cuff.', 'نرس نے کف کے ذریعے میرا بلڈ پریشر چیک کیا۔', ['pressure', 'weight', 'height', 'speed'], 'pressure', 'blood pressure (بلڈ پریشر)'),
        q(`${p}-17`, 'multiple-choice', 'What does "over-the-counter medicine" mean?', '"Over-the-counter" دوا کا مطلب کیا ہے؟', ['ڈاکٹر کے نسخے کے بغیر ملنے والی عام دوا (جیسے پیناڈول)', 'ممنوعہ دوا', 'صرف ہسپتال میں بننے والی دوا', 'بچوں کا سیرپ'], 'ڈاکٹر کے نسخے کے بغیر ملنے والی عام دوا (جیسے پیناڈول)', 'نسخے کے بغیر میڈیکل اسٹور سے دستیاب دوا'),
        q(`${p}-18`, 'fill-blank', '"Get ____ soon!" wished the kind visitor.', 'جلد صحت یاب ہو جائیں!', ['well', 'cold', 'bad', 'sick'], 'well', 'Get well soon! (جلد صحت یاب ہوں)'),
        q(`${p}-19`, 'multiple-choice', 'How do you say you sprained your ankle playing soccer?', 'فٹ بال کھیلتے ہوئے ٹخنے میں موچ آ گئی:', ['I twisted / sprained my ankle while playing.', 'My leg is separated.', 'Foot jumped away.', 'Ankle died.'], 'I twisted / sprained my ankle while playing.', 'میرا ٹخنہ مڑ گیا اور موچ آ گئی۔'),
        q(`${p}-20`, 'fill-blank', 'Doctor: "You will feel much ____ within two days."', 'آپ دو دن میں بہت بہتر محسوس کریں گے۔', ['better', 'worse', 'heavier', 'colder'], 'better', 'feel much better (بہتر محسوس کرنا)')
      ];

    // -------------------------------------------------------------
    // Game 18: Telephone & Calling Etiquette (ٹیلی فون آداب)
    // -------------------------------------------------------------
    case 18:
      return [
        q(`${p}-1`, 'multiple-choice', 'When answering a professional phone call, what should you say?', 'دفتری فون کال اٹھاتے وقت بہترین فقرہ:', ['Hello, this is Ali speaking. How may I help you?', 'Who is this?', 'Speak now!', 'What you want?'], 'Hello, this is Ali speaking. How may I help you?', 'ہیلو، علی بات کر رہا ہوں، میں آپ کی کیا مدد کر سکتا ہوں؟'),
        q(`${p}-2`, 'fill-blank', '"Could I speak ____ Mr. Rashid, please?"', 'کیا میں جناب راشد صاحب سے بات کر سکتا ہوں؟', ['to', 'with', 'at', 'on'], 'to', 'speak to (سے بات کرنا)'),
        q(`${p}-3`, 'fill-blank', '"Please ____ the line while I transfer your call."', 'براہِ کرم ہولڈ کیجیے جب تک میں کال ٹرانسفر کروں۔', ['hold', 'cut', 'drop', 'break'], 'hold', 'hold the line (لائن پر قائم رہیں)'),
        q(`${p}-4`, 'multiple-choice', 'How do you ask who is calling politely?', 'کال کرنے والے کا نام شائستگی سے پوچھنے کا طریقہ:', ['May I ask who is calling, please?', 'Name tell fast!', 'Who are you woman?', 'Speak identity.'], 'May I ask who is calling, please?', 'کیا میں جان سکتا ہوں کہ کون بات کر رہا ہے؟'),
        q(`${p}-5`, 'fill-blank', '"I am sorry, your voice is breaking ____."', 'معذرت، آپ کی آواز کٹ رہی ہے۔', ['up', 'down', 'in', 'out'], 'up', 'breaking up (آواز کٹ کٹ کر آنا)'),
        q(`${p}-6`, 'multiple-choice', 'When the person is not available, what do you offer?', 'مطلوبہ شخص موجود نہ ہو تو کیا پیشکش کرتے ہیں؟', ['Would you like to leave a message for him?', 'He ran away.', 'Never call again.', 'I don\'t know him.'], 'Would you like to leave a message for him?', 'کیا آپ ان کے لیے کوئی پیغام چھوڑنا چاہیں گے؟'),
        q(`${p}-7`, 'fill-blank', '"I will ask him to call you ____ as soon as he returns."', 'وہ جیسے ہی واپس آئیں گے میں کہوں گا وہ آپ کو واپس کال کریں۔', ['back', 'front', 'up', 'down'], 'back', 'call you back (واپس فون کرنا)'),
        q(`${p}-8`, 'multiple-choice', 'What does "The line is busy" mean?', '"The line is busy" کا مطلب کیا ہے؟', ['نمبر مصروف ہے / دوسری کال پر بات ہو رہی ہے', 'فون خراب ہے', 'لائن ٹوٹ گئی ہے', 'کوئی فون نہیں اٹھا رہا'], 'نمبر مصروف ہے / دوسری کال پر بات ہو رہی ہے', 'نمبر انگیج ہے'),
        q(`${p}-9`, 'fill-blank', '"Pardon me, could you speak a bit louder? The signal is ____."', 'سگنل کمزور ہیں اس لیے تھوڑا اونچا بولیے۔', ['weak', 'strong', 'heavy', 'fast'], 'weak', 'weak signal (کمزور سگنل)'),
        q(`${p}-10`, 'multiple-choice', 'How do you politely apologize for dialing a wrong number?', 'غلط نمبر ملانے پر معذرت کا انداز:', ['I am so sorry, I must have dialed the wrong number.', 'Why you pick up?', 'Wrong person you are.', 'Cut phone!'], 'I am so sorry, I must have dialed the wrong number.', 'بے حد معذرت، مجھ سے غلط نمبر مل گیا ہے۔'),
        q(`${p}-11`, 'sentence-unscramble', 'Arrange the words in correct order:', 'الفاظ ترتیب دیں: "کیا میں کوئی پیغام چھوڑ سکتا ہوں؟"', undefined, 'Can I leave a message please', 'کیا میں کوئی پیغام چھوڑ سکتا ہوں؟', ['Can', 'I', 'leave', 'a', 'message', 'please']),
        q(`${p}-12`, 'sentence-unscramble', 'Arrange the words in correct order:', 'الفاظ ترتیب دیں: "ایک لمحہ انتظار کیجیے"', undefined, 'Please hold on a moment', 'ایک لمحہ لائن پر رہیے۔', ['Please', 'hold', 'on', 'a', 'moment']),
        q(`${p}-13`, 'multiple-choice', 'What does "hang up" mean in telephone terms?', '"Hang up" کا ٹیلی فون پر کیا مطلب ہے؟', ['کال کاٹنا / فون بند کرنا', 'فون دیوار پر لٹکانا', 'بیل بجانا', 'چارج کرنا'], 'کال کاٹنا / فون بند کرنا', 'فون کی کال منقطع کرنا'),
        q(`${p}-14`, 'fill-blank', '"Thank you for calling ABC Company. Have a ____ day!"', 'کال کرنے کا شکریہ، آپ کا دن اچھا گزرے!', ['great', 'dark', 'bad', 'sour'], 'great', 'Have a great day!'),
        q(`${p}-15`, 'multiple-choice', 'How do you say: "I couldn\'t reach you"?', '"میرا آپ سے رابطہ نہیں ہو سکا" کا انگریزی جملہ:', ['I tried calling, but couldn\'t get through to you.', 'Phone died.', 'You were hiding.', 'No call reached.'], 'I tried calling, but couldn\'t get through to you.', 'میں نے فون کیا مگر رابطہ قائم نہ ہو سکا۔'),
        q(`${p}-16`, 'fill-blank', '"Can you hear me ____ now?" - "Yes, loud and clear!"', 'کیا اب آپ کو میری آواز صاف آ رہی ہے؟', ['clearly', 'darkly', 'roughly', 'heavily'], 'clearly', 'hear me clearly (صاف سننا)'),
        q(`${p}-17`, 'multiple-choice', 'What does "ring tone" mean?', '"Ringtone" کا کیا مطلب ہے؟', ['فون بجنے کی گھنٹی یا دھن', 'بات کرنے کی آواز', 'فون کا کیمرہ', 'انٹرنیٹ سپیڈ'], 'فون بجنے کی گھنٹی یا دھن', 'کال آنے پر بجنے والی آواز'),
        q(`${p}-18`, 'fill-blank', '"My battery is about to die, I will call you ____."', 'میری بیٹری ختم ہونے والی ہے، میں بعد میں فون کروں گا۔', ['later', 'yesterday', 'before', 'ago'], 'later', 'call you later (بعد میں فون کرنا)'),
        q(`${p}-19`, 'multiple-choice', 'If someone asks for an extension number in an office:', 'دفتری ایکسٹینشن نمبر پوچھنے پر جواب:', ['Please dial extension 204.', 'Dial 911.', 'No numbers.', 'Ring bell.'], 'Please dial extension 204.', 'ایکسٹینشن 204 ملائیں۔'),
        q(`${p}-20`, 'fill-blank', '"It was wonderful catching ____ with you on call!"', 'فون پر آپ سے بات کر کے بہت اچھا لگا!', ['up', 'down', 'out', 'away'], 'up', 'catching up with you (تازہ احوال جاننا)')
      ];

    // -------------------------------------------------------------
    // Games 19 to 25: Other Spoken Conversation topics
    // -------------------------------------------------------------
    default:
      // Produce topic-specific 20 conversational questions tailored to each topic
      return getAdvancedSpokenQuestions(gameId, p);
  }
}

/**
 * Generates Games 19 to 25 Spoken Conversation questions (20 authentic questions each)
 */
function getAdvancedSpokenQuestions(gameId: number, p: string): GameQuestion[] {
  if (gameId === 19) {
    // Airport, Travel & Hotel
    return [
      q(`${p}-1`, 'multiple-choice', 'At check-in counter: "May I see your passport and ticket, please?"', 'چیک ان کاؤنٹر پر پاسپورٹ اور ٹکٹ مانگنے کا انداز:', ['Here is my passport and e-ticket, sir.', 'I have no papers.', 'Who are you?', 'Keep luggage.'], 'Here is my passport and e-ticket, sir.', 'یہ لیجیے میرا پاسپورٹ اور ای ٹکٹ۔'),
      q(`${p}-2`, 'fill-blank', 'Passenger: "Would you prefer a window seat or an ____ seat?"', 'کیا آپ کھڑکی کے پاس والی سیٹ پسند کریں گے یا راہداری والی؟', ['aisle', 'oil', 'open', 'outer'], 'aisle', 'aisle seat (راہداری کی طرف والی سیٹ)'),
      q(`${p}-3`, 'fill-blank', '"How many bags are you ____ in today?"', 'آپ کتنے بیگز بک کروا رہے ہیں؟', ['checking', 'holding', 'selling', 'buying'], 'checking', 'checking in luggage (سامان بک کروانا)'),
      q(`${p}-4`, 'multiple-choice', 'What does "Boarding Pass" mean?', '"Boarding Pass" کا کیا مطلب ہے؟', ['جہاز پر سوار ہونے کا اجازت نامہ / کارڈ', 'ہوٹل کی چابی', 'پاسپورٹ کا ویزہ', 'ٹیکسی کا بل'], 'جہاز پر سوار ہونے کا اجازت نامہ / کارڈ', 'پرواز پر سوار ہونے کا کارڈ'),
      q(`${p}-5`, 'fill-blank', 'Flight announcement: "Flight PK-302 is now ready for ____ at Gate 5."', 'فلائٹ اب گیٹ 5 پر سوار ہونے کے لیے تیار ہے۔', ['boarding', 'sleeping', 'landing', 'stopping'], 'boarding', 'boarding (جہاز پر سوار ہونا)'),
      q(`${p}-6`, 'multiple-choice', 'At hotel reception: How to say you have a reservation?', 'ہوٹل میں پیشگی بکنگ بتانے کا جملہ:', ['Hello, I have a room reservation under the name Ali.', 'Give me room now.', 'Who owns this building?', 'I sleep here.'], 'Hello, I have a room reservation under the name Ali.', 'ہیلو، میرے نام پر ایک کمرہ بک ہے۔'),
      q(`${p}-7`, 'fill-blank', '"What time is check-____ tomorrow morning?" - "At 11 AM, sir."', 'کل صبح کمرہ خالی کرنے (چیک آؤٹ) کا وقت کیا ہے؟', ['out', 'in', 'up', 'down'], 'out', 'check-out (کمرہ چھوڑنا)'),
      q(`${p}-8`, 'multiple-choice', 'How do you ask for the hotel Wi-Fi password?', 'ہوٹل کا وائی فائی پاس ورڈ پوچھنے کا طریقہ:', ['Could you please tell me the Wi-Fi password?', 'Internet free give.', 'Why no Wi-Fi?', 'Open computer.'], 'Could you please tell me the Wi-Fi password?', 'کیا آپ مجھے وائی فائی کا پاس ورڈ بتا سکتے ہیں؟'),
      q(`${p}-9`, 'fill-blank', '"Fasten your seat ____ during take-off and landing."', 'پرواز کے اڑان بھرنے اور اترتے وقت سیٹ بیلٹ باندھیں۔', ['belts', 'shoes', 'caps', 'hats'], 'belts', 'seat belts (سیٹ بیلٹ)'),
      q(`${p}-10`, 'multiple-choice', 'What does "Duty-Free Shop" mean at an airport?', 'ائیرپورٹ پر ڈیوٹی فری شاپس کا کیا مطلب ہے؟', ['ٹیکس سے مستثنیٰ دکانیں جہاں اشیاء پر سیلز ٹیکس نہیں ہوتا', 'مفت سامان بانٹنے والی دکان', 'صرف ٹکٹ فروخت کرنے والی جگہ', 'سامان کا گودام'], 'ٹیکس سے مستثنیٰ دکانیں جہاں اشیاء پر سیلز ٹیکس نہیں ہوتا', 'ٹیکس فری دکانیں'),
      q(`${p}-11`, 'sentence-unscramble', 'Arrange the words in correct order:', 'الفاظ ترتیب دیں: "یہاں میرا پاسپورٹ ہے"', undefined, 'Here is my passport and boarding pass', 'یہ میرا پاسپورٹ اور بورڈنگ پاس ہے۔', ['Here', 'is', 'my', 'passport', 'and', 'boarding', 'pass']),
      q(`${p}-12`, 'sentence-unscramble', 'Arrange the words in correct order:', 'الفاظ ترتیب دیں: "کیا ناشتہ شامل ہے؟"', undefined, 'Is breakfast included in the room price', 'کیا کمرے کی قیمت میں ناشتہ شامل ہے؟', ['Is', 'breakfast', 'included', 'in', 'the', 'room', 'price']),
      q(`${p}-13`, 'multiple-choice', 'What does "Baggage Claim" mean?', '"Baggage Claim" کا کیا مطلب ہے؟', ['جہاز سے اترنے کے بعد سامان وصول کرنے کی جگہ', 'سامان بیچنے کی دکان', 'سامان گم ہونے کا کمرہ', 'ٹکٹ کاؤنٹر'], 'جہاز سے اترنے کے بعد سامان وصول کرنے کی جگہ', 'سامان وصولی کا کنویئر بیلٹ ایریا'),
      q(`${p}-14`, 'fill-blank', '"Could you call a ____ for me to go to the city center?"', 'کیا آپ میرے لیے شہر جانے والی ٹیکسی منگوا سکتے ہیں؟', ['taxi', 'train', 'plane', 'boat'], 'taxi', 'call a taxi (ٹیکسی بلانا)'),
      q(`${p}-15`, 'multiple-choice', 'How do you ask for an extra pillow at a hotel?', 'ہوٹل میں اضافی تکیہ مانگنے کا انداز:', ['Could room service bring an extra pillow to room 305?', 'Pillow throw here.', 'Bed is hard.', 'I want sleep.'], 'Could room service bring an extra pillow to room 305?', 'کیا روم سروس ایک اضافی تکیہ لا سکتی ہے؟'),
      q(`${p}-16`, 'fill-blank', '"Have a safe ____ and pleasant journey!"', 'آپ کی پرواز محفوظ رہے اور سفر خوشگوار ہو!', ['flight', 'dream', 'sleep', 'rest'], 'flight', 'safe flight (محفوظ پرواز)'),
      q(`${p}-17`, 'multiple-choice', 'What is "Customs Declaration"?', 'کسٹمز ڈیکلریشن کا کیا مقصد ہے؟', ['بیرون ملک سے لائے جانے والے سامان اور کرنسی کا سرکاری بیان', 'ٹکٹ کا بل', 'ہوٹل کا وؤچر', 'طبی سرٹیفکیٹ'], 'بیرون ملک سے لائے جانے والے سامان اور کرنسی کا سرکاری بیان', 'کسٹمز حکام کو سامان سے آگاہ کرنا'),
      q(`${p}-18`, 'fill-blank', 'Pilot: "Cabin crew, prepare for ____."', 'کیبن کریو، اترنے (لینڈنگ) کی تیاری کریں۔', ['landing', 'jumping', 'swimming', 'walking'], 'landing', 'prepare for landing (لینڈنگ کی تیاری)'),
      q(`${p}-19`, 'multiple-choice', 'How do you ask if there is a shuttle bus from hotel to airport?', 'ہوٹل کی مفت ائیرپورٹ شٹل بس کے بارے میں پوچھنا:', ['Do you provide a complimentary airport shuttle service?', 'Bus is free?', 'Take me airport.', 'Car drive now.'], 'Do you provide a complimentary airport shuttle service?', 'کیا آپ ہوٹل سے ائیرپورٹ شٹل سروس فراہم کرتے ہیں؟'),
      q(`${p}-20`, 'fill-blank', '"Welcome to Marriott Hotel! We hope you enjoy your ____."', 'ہمارے ہوٹل میں خوش آمدید، امید ہے آپ کا قیام شاندار رہے گا!', ['stay', 'flight', 'drive', 'swim'], 'stay', 'enjoy your stay (اپنے قیام سے لطف اندوز ہوں)')
    ];
  }

  // Games 20 to 25: Job interview, polite requests, apologies, weather, routine, classroom
  const spokenTitles: Record<number, { eng: string; urd: string; sample: string }> = {
    20: { eng: 'Job Interview & Professional Talk', urd: 'ملازمت کا انٹرویو اور دفتری گفتگو', sample: 'My greatest strength is problem-solving and team collaboration.' },
    21: { eng: 'Polite Requests & Permissions (Could you, May I)', urd: 'شائستہ درخواست اور اجازت کے فقرے', sample: 'Could you please help me with this heavy suitcase?' },
    22: { eng: 'Apologies, Gratitude & Saying Thanks', urd: 'معذرت، احسان مندی اور شکریہ کے آداب', sample: 'I sincerely apologize for the delay. Thank you for your patience.' },
    23: { eng: 'Talking About Weather & Seasons', urd: 'موسم اور فضا کے بارے میں بول چال', sample: 'It is sunny today with a gentle cool breeze.' },
    24: { eng: 'Daily Routine & Time Management', urd: 'روزمرہ معمول اور وقت بتانے کی بول چال', sample: 'I usually wake up at dawn, exercise, and head to work by 8 AM.' },
    25: { eng: 'School & Classroom Conversations', urd: 'اسکول اور کلاس روم میں اساتذہ و طلبہ کی بات چیت', sample: 'May I come in, teacher? I have brought my completed assignment.' }
  };

  const meta = spokenTitles[gameId] || { eng: `Spoken Game ${gameId}`, urd: 'روزمرہ بول چال', sample: 'Conversational fluency practice.' };

  // 20 rich tailored questions for the topic
  const questions: GameQuestion[] = [];
  const prompts = [
    { eng: `In formal situations, how do you ask for permission?`, urd: 'رسمی حالات میں اجازت کیسے مانگتے ہیں؟', ans: 'May I, please?', opts: ['May I, please?', 'I will do it.', 'Who stops me?', 'Move aside.'] },
    { eng: `What is the most polite response to "Thank you very much"?`, urd: '"Thank you" کا سب سے شائستہ جواب کیا ہے؟', ans: 'You are most welcome!', opts: ['You are most welcome!', 'No problem.', 'Give money.', 'Whatever.'] },
    { eng: `How do you express sincere apology for being late?`, urd: 'دیر سے آنے پر معذرت کا شائستہ انداز:', ans: 'I am so sorry for being late. Traffic was heavy.', opts: ['I am so sorry for being late. Traffic was heavy.', 'Why you care?', 'I came when I wanted.', 'Class was boring.'] },
    { eng: `When talking about the weather: "It is pouring outside" means:`, urd: '"It is pouring outside" کا کیا مطلب ہے؟', ans: 'باہر موسلادھار تیز بارش ہو رہی ہے', opts: ['باہر موسلادھار تیز بارش ہو رہی ہے', 'دھوپ نکلی ہوئی ہے', 'اولے گر رہے ہیں', 'ہوا بند ہے'] },
    { eng: `In a job interview, when asked "Tell me about yourself":`, urd: 'انٹرویو میں اپنے بارے میں بتانے کا شاندار آغاز:', ans: 'I am a dedicated professional with a passion for learning.', opts: ['I am a dedicated professional with a passion for learning.', 'I like sleeping and eating.', 'Ask my friend.', 'Look at my face.'] },
    { eng: `In classroom: "Teacher, may I sharpen my pencil?"`, urd: 'کلاس روم میں پنسل تراشنے کی اجازت کا انداز:', ans: 'May I sharpen my pencil, please?', opts: ['May I sharpen my pencil, please?', 'Pencil broken look.', 'Give sharpener.', 'I do what I want.'] },
    { eng: `When someone is sneezing, English speakers politely say:`, urd: 'کسی کے چھینکنے پر انگریزی میں شائستہ کلمہ:', ans: 'Bless you!', opts: ['Bless you!', 'Stop noise!', 'Wipe nose.', 'Go away.'] },
    { eng: `How do you describe a chilly winter morning?`, urd: 'سردیوں کی ٹھنڈی صبح بیان کرنے کا فقرہ:', ans: 'It is biting cold and foggy this morning.', opts: ['It is biting cold and foggy this morning.', 'Sun is boiling.', 'Rain is hot.', 'Summer has started.'] },
    { eng: `How to ask what time it is politely:`, urd: 'شائستگی سے وقت پوچھنے کا فقرہ:', ans: 'Excuse me, could you tell me the time, please?', opts: ['Excuse me, could you tell me the time, please?', 'Time now!', 'Watch look.', 'Is it 12?'] },
    { eng: `In a classroom: "Please open your textbooks to page 45."`, urd: 'استاد کی ہدایت: "کتاب کا صفحہ نمبر 45 کھولیں"', ans: 'Open your books to page 45', opts: ['Open your books to page 45', 'Close all books', 'Tear page 45', 'Throw books'] },
    { eng: `How do you politely decline an invitation?`, urd: 'کسی دعوت سے شائستگی سے معذرت کرنا:', ans: 'Thank you for inviting me, but I have a prior commitment.', opts: ['Thank you for inviting me, but I have a prior commitment.', 'I don\'t want to see you.', 'Your party is bad.', 'Never call me.'] },
    { eng: `In an interview: "What are your salary expectations?"`, urd: 'تنخواہ کی توقعات بتانے کا متوازن انداز:', ans: 'I expect a salary that matches industry standards for this role.', opts: ['I expect a salary that matches industry standards for this role.', 'Give me all money.', 'Whatever you throw.', 'One crore rupees.'] },
    { eng: `How do you express gratitude for valuable advice?`, urd: 'اچھی نصیحت پر شکریہ ادا کرنا:', ans: 'I really appreciate your guidance and support.', opts: ['I really appreciate your guidance and support.', 'You talk too much.', 'I knew already.', 'Advice was boring.'] },
    { eng: `Describing daily schedule: "I hit the hay at 10 PM" means:`, urd: '"Hit the hay" کا محاوراتی مطلب کیا ہے؟', ans: 'میں رات 10 بجے سو جاتا ہوں (گو ٹو سلیپ)', opts: ['میں رات 10 بجے سو جاتا ہوں (گو ٹو سلیپ)', 'میں گھاس کاٹتا ہوں', 'میں کرکٹ کھیلتا ہوں', 'میں رات کو کھانا کھاتا ہوں'] },
    { eng: `When you need someone to repeat something:`, urd: 'کوئی بات دہرانے کی درخواست:', ans: 'Pardon me, could you say that again?', opts: ['Pardon me, could you say that again?', 'Speak again fast!', 'Your voice bad.', 'Shout louder!'] },
    { eng: `How to describe heavy summer heat:`, urd: 'گرمیوں کی شدید تپش کا اظہار:', ans: 'It is scorching hot and humid today.', opts: ['It is scorching hot and humid today.', 'Snow is falling.', 'Water is freezing.', 'Leaves are falling.'] },
    { eng: `At the end of school class:`, urd: 'کلاس ختم ہونے پر استاد کو الوداع کہنا:', ans: 'Thank you, teacher! Have a wonderful afternoon!', opts: ['Thank you, teacher! Have a wonderful afternoon!', 'Class over run!', 'Finally free.', 'Bye bye old man.'] },
    { eng: `How to offer help to an elder carrying groceries:`, urd: 'کسی بزرگ کو سامان اٹھانے میں مدد کی پیشکش:', ans: 'Allow me to carry those bags for you, sir.', opts: ['Allow me to carry those bags for you, sir.', 'Heavy bags you have.', 'Drop bags here.', 'Why carry so much?'] },
    { eng: `Job interview closing question: "Do you have any questions for us?"`, urd: 'انٹرویو کے اختتام پر شاندار سوال پوچھنا:', ans: 'What are the main growth opportunities within this team?', opts: ['What are the main growth opportunities within this team?', 'When do I get holidays?', 'Is food free here?', 'Can I leave now?'] },
    { eng: `Saying goodbye with good wishes for the journey:`, urd: 'سفر پر روانہ ہونے والے کے لیے دعائیہ کلمات:', ans: 'Safe travels and wish you the very best!', opts: ['Safe travels and wish you the very best!', 'Don\'t come back.', 'Journey is dangerous.', 'Forget us.'] }
  ];

  prompts.forEach((item, index) => {
    const qId = `${p}-${index + 1}`;
    if (index === 10 || index === 11) {
      // unscramble
      const words = item.ans.split(' ').filter(Boolean);
      questions.push({
        id: qId,
        type: 'sentence-unscramble',
        prompt: `Arrange the words for: "${meta.urd}"`,
        urduPrompt: `الفاظ کو درست انگریزی ترتیب میں لگائیں: "${item.urd}"`,
        wordsToArrange: words,
        correctAnswer: item.ans,
        urduMeaning: item.urd,
        audioText: item.ans
      });
    } else {
      questions.push({
        id: qId,
        type: 'multiple-choice',
        prompt: `${item.eng} (${meta.eng})`,
        urduPrompt: item.urd,
        options: item.opts,
        correctAnswer: item.ans,
        urduMeaning: `درست بول چال کا فقرہ: ${item.ans}`,
        audioText: item.ans
      });
    }
  });

  return questions;
}
