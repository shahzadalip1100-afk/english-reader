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
 * 12 TENSES GAMES (Games 1 to 12) - 20 authentic questions each!
 */
export function getTensesQuestions(gameId: number): GameQuestion[] {
  const p = `t${gameId}`;

  switch (gameId) {
    // -------------------------------------------------------------
    // Game 1: Present Simple Tense (فعل حال مطلق)
    // -------------------------------------------------------------
    case 1:
      return [
        q(`${p}-1`, 'fill-blank', 'He ____ (play) cricket every Sunday morning.', 'وہ ہر اتوار کی صبح کرکٹ کھیلتا ہے۔', ['plays', 'play', 'playing', 'played'], 'plays', 'He plays cricket (واحد فاعل کے ساتھ s لگتا ہے)'),
        q(`${p}-2`, 'fill-blank', 'The sun ____ in the east.', 'سورج مشرق سے طلوع ہوتا ہے۔', ['rises', 'rise', 'rising', 'rose'], 'rises', 'The sun rises (قدرتی سچائی)'),
        q(`${p}-3`, 'fill-blank', 'They ____ (live) in a beautiful house in Lahore.', 'وہ لاہور میں رہتے ہیں۔', ['live', 'lives', 'living', 'lived'], 'live', 'They live (جمع فاعل کے ساتھ فعل کی پہلی فارم)'),
        q(`${p}-4`, 'fill-blank', 'She ____ not like cold tea.', 'وہ ٹھنڈی چائے پسند نہیں کرتی۔', ['does', 'do', 'is', 'has'], 'does', 'She does not like (واحد فاعل کے ساتھ does not)'),
        q(`${p}-5`, 'fill-blank', '____ you speak English fluently?', 'کیا آپ روانی سے انگریزی بولتے ہیں؟', ['Do', 'Does', 'Are', 'Is'], 'Do', 'Do you speak? (You کے ساتھ Do آتا ہے)'),
        q(`${p}-6`, 'fill-blank', 'Water ____ at 100 degrees Celsius.', 'پانی 100 ڈگری پر ابلتا ہے۔', ['boils', 'boil', 'boiling', 'boiled'], 'boils', 'Water boils (سائنسی حقیقت)'),
        q(`${p}-7`, 'fill-blank', 'My brother ____ (work) in a software company.', 'میرا بھائی سافٹ ویئر کمپنی میں کام کرتا ہے۔', ['works', 'work', 'working', 'worked'], 'works', 'My brother works'),
        q(`${p}-8`, 'fill-blank', 'Cats ____ milk eagerly.', 'بلیاں دودھ شوق سے پیتی ہیں۔', ['drink', 'drinks', 'drinking', 'drank'], 'drink', 'Cats drink (جمع اسم کے ساتھ s نہیں آتا)'),
        q(`${p}-9`, 'fill-blank', 'Ali always ____ (wake) up early at 6 AM.', 'علی ہمیشہ صبح 6 بجے جاگتا ہے۔', ['wakes', 'wake', 'waking', 'woke'], 'wakes', 'Ali wakes up early'),
        q(`${p}-10`, 'fill-blank', 'We ____ (go) to the library on Saturdays.', 'ہم ہفتے کے روز لائبریری جاتے ہیں۔', ['go', 'goes', 'going', 'went'], 'go', 'We go to the library'),
        q(`${p}-11`, 'sentence-unscramble', 'Arrange the words in correct order:', 'الفاظ ترتیب دیں: "وہ روزانہ کتابیں پڑھتی ہے"', undefined, 'She reads books every day', 'وہ روزانہ کتابیں پڑھتی ہے۔', ['reads', 'She', 'books', 'every', 'day']),
        q(`${p}-12`, 'sentence-unscramble', 'Arrange the words in correct order:', 'الفاظ ترتیب دیں: "ہم انگریزی سیکھتے ہیں"', undefined, 'We learn English happily', 'ہم خوشی سے انگریزی سیکھتے ہیں۔', ['learn', 'We', 'English', 'happily']),
        q(`${p}-13`, 'multiple-choice', 'Which sentence is grammatically CORRECT in Present Simple?', 'پریزنٹس سمپل کا درست جملہ منتخب کریں:', ['He speaks English very well.', 'He speak English very well.', 'He speaking English.', 'He does speaks English.'], 'He speaks English very well.', 'He کے ساتھ فعل میں s کا اضافہ ہوتا ہے۔'),
        q(`${p}-14`, 'multiple-choice', 'What is the negative form of "I know him"?', '"I know him" کا منفی جملہ کیا ہوگا؟', ['I do not know him.', 'I does not know him.', 'I not know him.', 'I am not know him.'], 'I do not know him.', 'I کے ساتھ do not آتا ہے۔'),
        q(`${p}-15`, 'fill-blank', 'Birds ____ nests in tall green trees.', 'پرندے درختوں میں گھونسلے بناتے ہیں۔', ['build', 'builds', 'building', 'built'], 'build', 'Birds build nests'),
        q(`${p}-16`, 'fill-blank', 'The train ____ at 9 o\'clock sharp.', 'ٹرین ٹھیک نو بجے روانہ ہوتی ہے۔', ['leaves', 'leave', 'leaving', 'left'], 'leaves', 'The train leaves'),
        q(`${p}-17`, 'fill-blank', 'Does he ____ (know) the correct answer?', 'کیا وہ درست جواب جانتا ہے؟', ['know', 'knows', 'knowing', 'knew'], 'know', 'Does کے بعد ہمیشہ پہلی فارم آتی ہے'),
        q(`${p}-18`, 'fill-blank', 'I ____ (brush) my teeth twice a day.', 'میں دن میں دو بار دانت صاف کرتا ہوں۔', ['brush', 'brushes', 'brushing', 'brushed'], 'brush', 'I brush my teeth'),
        q(`${p}-19`, 'fill-blank', 'Honesty ____ (bring) peace of mind.', 'ایمانداری دل کا سکون لاتی ہے۔', ['brings', 'bring', 'bringing', 'brought'], 'brings', 'Honesty brings peace'),
        q(`${p}-20`, 'multiple-choice', 'Choose the correct question format:', 'درست سوالیہ فارمیٹ چنیں:', ['Where do you live?', 'Where does you live?', 'Where you live?', 'Where are you live?'], 'Where do you live?', 'You کے ساتھ Do آتا ہے۔')
      ];

    // -------------------------------------------------------------
    // Game 2: Present Continuous Tense (فعل حال جاری)
    // -------------------------------------------------------------
    case 2:
      return [
        q(`${p}-1`, 'fill-blank', 'The baby is ____ (sleep) peacefully.', 'بچہ پرسکون سو رہا ہے۔', ['sleeping', 'sleeps', 'sleep', 'slept'], 'sleeping', 'is sleeping (جاری کام)'),
        q(`${p}-2`, 'fill-blank', 'Look! It is ____ (rain) heavily outside.', 'دیکھو! باہر تیز بارش ہو رہی ہے۔', ['raining', 'rains', 'rain', 'rained'], 'raining', 'It is raining'),
        q(`${p}-3`, 'fill-blank', 'I ____ (read) an interesting story right now.', 'میں اس وقت ایک دلچسپ کہانی پڑھ رہا ہوں۔', ['am reading', 'is reading', 'are reading', 'reads'], 'am reading', 'I am reading'),
        q(`${p}-4`, 'fill-blank', 'They ____ (play) football in the park.', 'وہ پارک میں فٹ بال کھیل رہے ہیں۔', ['are playing', 'is playing', 'am playing', 'plays'], 'are playing', 'They are playing'),
        q(`${p}-5`, 'fill-blank', 'Why ____ she crying loudly?', 'وہ کیوں رو رہی ہے؟', ['is', 'are', 'am', 'do'], 'is', 'Why is she crying?'),
        q(`${p}-6`, 'fill-blank', 'We ____ (prepare) for our exams today.', 'ہم آج اپنے امتحانات کی تیاری کر رہے ہیں۔', ['are preparing', 'is preparing', 'am preparing', 'prepares'], 'are preparing', 'We are preparing'),
        q(`${p}-7`, 'fill-blank', 'Listen! Someone is ____ (knock) at the door.', 'سنو! کوئی دروازے پر دستک دے رہا ہے۔', ['knocking', 'knock', 'knocks', 'knocked'], 'knocking', 'Someone is knocking'),
        q(`${p}-8`, 'fill-blank', 'The students ____ (listen) attentively to the teacher.', 'طلبہ استاد کو توجہ سے سن رہے ہیں۔', ['are listening', 'is listening', 'am listening', 'listens'], 'are listening', 'Students are listening'),
        q(`${p}-9`, 'fill-blank', 'Mother is ____ (cook) delicious biryani.', 'امی مزیدار بریانی پکا رہی ہیں۔', ['cooking', 'cooks', 'cook', 'cooked'], 'cooking', 'Mother is cooking'),
        q(`${p}-10`, 'fill-blank', 'Are you ____ (watch) the cricket match?', 'کیا آپ کرکٹ میچ دیکھ رہے ہیں؟', ['watching', 'watch', 'watches', 'watched'], 'watching', 'Are you watching?'),
        q(`${p}-11`, 'sentence-unscramble', 'Arrange the words in correct order:', 'الفاظ ترتیب دیں: "وہ خط لکھ رہا ہے"', undefined, 'He is writing a letter', 'وہ خط لکھ رہا ہے۔', ['writing', 'He', 'is', 'a', 'letter']),
        q(`${p}-12`, 'sentence-unscramble', 'Arrange the words in correct order:', 'الفاظ ترتیب دیں: "پرندے اڑ رہے ہیں"', undefined, 'Birds are flying in the sky', 'پرندے آسمان میں اڑ رہے ہیں۔', ['Birds', 'are', 'flying', 'in', 'the', 'sky']),
        q(`${p}-13`, 'multiple-choice', 'What is the negative of "They are laughing"?', '"They are laughing" کا منفی جملہ کیا ہے؟', ['They are not laughing.', 'They do not laughing.', 'They not laughing.', 'They are no laughing.'], 'They are not laughing.', 'are کے بعد not لگائیں۔'),
        q(`${p}-14`, 'fill-blank', 'The river is ____ (flow) smoothly down the valley.', 'دریا روانی سے بہہ رہا ہے۔', ['flowing', 'flows', 'flow', 'flowed'], 'flowing', 'The river is flowing'),
        q(`${p}-15`, 'fill-blank', 'Ali and Ahmad ____ (study) together.', 'علی اور احمد ایک ساتھ پڑھائی کر رہے ہیں۔', ['are studying', 'is studying', 'am studying', 'studies'], 'are studying', 'دو افراد کے لیے are studying'),
        q(`${p}-16`, 'fill-blank', 'The cold wind is ____ (blow) tonight.', 'آج رات ٹھنڈی ہوا چل رہی ہے۔', ['blowing', 'blows', 'blow', 'blew'], 'blowing', 'The wind is blowing'),
        q(`${p}-17`, 'fill-blank', 'I am not ____ (waste) my time.', 'میں اپنا وقت ضائع نہیں کر رہا ہوں۔', ['wasting', 'waste', 'wastes', 'wasted'], 'wasting', 'I am not wasting'),
        q(`${p}-18`, 'fill-blank', 'What are you ____ (do) here?', 'آپ یہاں کیا کر رہے ہیں؟', ['doing', 'do', 'does', 'done'], 'doing', 'What are you doing?'),
        q(`${p}-19`, 'fill-blank', 'The stars are ____ (twinkle) in the night sky.', 'رات کے آسمان پر ستارے چمک رہے ہیں۔', ['twinkling', 'twinkle', 'twinkles', 'twinkled'], 'twinkling', 'Stars are twinkling'),
        q(`${p}-20`, 'multiple-choice', 'Which verb does NOT usually take -ing form for continuous action?', 'کس فعل کے ساتھ عام طور پر -ing نہیں لگتا؟', ['Understand (سمجھنا)', 'Eat (کھانا)', 'Play (کھیلنا)', 'Run (دوڑنا)'], 'Understand (سمجھنا)', 'ذہنی حالت والے افعال جیسے understand, know کے ساتھ ing نہیں لگتا۔')
      ];

    // -------------------------------------------------------------
    // Game 3: Present Perfect Tense (فعل حال مکمل)
    // -------------------------------------------------------------
    case 3:
      return [
        q(`${p}-1`, 'fill-blank', 'I have ____ (finish) my homework.', 'میں اپنا ہوم ورک مکمل کر چکا ہوں۔', ['finished', 'finishes', 'finish', 'finishing'], 'finished', 'have finished (has/have + 3rd form)'),
        q(`${p}-2`, 'fill-blank', 'She has ____ (lose) her room key.', 'وہ اپنے کمرے کی چابی کھو چکی ہے۔', ['lost', 'lose', 'loses', 'losing'], 'lost', 'has lost'),
        q(`${p}-3`, 'fill-blank', 'They have ____ (win) the championship.', 'وہ چیمپئن شپ جیت چکے ہیں۔', ['won', 'win', 'wins', 'winning'], 'won', 'have won'),
        q(`${p}-4`, 'fill-blank', 'He has just ____ (arrive) at the airport.', 'وہ ابھی ابھی ائیرپورٹ پہنچا ہے۔', ['arrived', 'arrive', 'arrives', 'arriving'], 'arrived', 'has arrived'),
        q(`${p}-5`, 'fill-blank', 'Have you ever ____ (visit) Murree hills?', 'کیا آپ نے کبھی مری کی سیر کی ہے؟', ['visited', 'visit', 'visits', 'visiting'], 'visited', 'Have you visited?'),
        q(`${p}-6`, 'fill-blank', 'We have not ____ (see) this movie yet.', 'ہم نے ابھی تک یہ فلم نہیں دیکھی ہے۔', ['seen', 'saw', 'see', 'seeing'], 'seen', 'have not seen'),
        q(`${p}-7`, 'fill-blank', 'The train has already ____ (leave).', 'ٹرین پہلے ہی روانہ ہو چکی ہے۔', ['left', 'leave', 'leaves', 'leaving'], 'left', 'has already left'),
        q(`${p}-8`, 'fill-blank', 'Ahmad has ____ (break) his glasses.', 'احمد نے اپنا چشمہ توڑ دیا ہے۔', ['broken', 'broke', 'break', 'breaking'], 'broken', 'has broken'),
        q(`${p}-9`, 'fill-blank', 'Have they ____ (eat) their lunch?', 'کیا وہ دوپہر کا کھانا کھا چکے ہیں؟', ['eaten', 'ate', 'eat', 'eating'], 'eaten', 'Have they eaten?'),
        q(`${p}-10`, 'fill-blank', 'The sun has ____ (rise) in the sky.', 'سورج آسمان پر طلوع ہو چکا ہے۔', ['risen', 'rose', 'rise', 'rising'], 'risen', 'has risen'),
        q(`${p}-11`, 'sentence-unscramble', 'Arrange the words in correct order:', 'الفاظ ترتیب دیں: "میں چائے پی چکا ہوں"', undefined, 'I have drunk tea', 'میں چائے پی چکا ہوں۔', ['drunk', 'I', 'have', 'tea']),
        q(`${p}-12`, 'sentence-unscramble', 'Arrange the words in correct order:', 'الفاظ ترتیب دیں: "اس نے نیا بستہ خریدا ہے"', undefined, 'She has bought a new bag', 'اس نے نیا بستہ خریدا ہے۔', ['bought', 'She', 'has', 'a', 'new', 'bag']),
        q(`${p}-13`, 'multiple-choice', 'What is the 3rd form (Past Participle) of "Write"?', '"Write" کی تیسری فارم کیا ہے؟', ['Written', 'Wrote', 'Writes', 'Writing'], 'Written', 'Write -> Wrote -> Written'),
        q(`${p}-14`, 'multiple-choice', 'Which sentence correctly uses Present Perfect?', 'پریزنٹس پرفیکٹ کا درست جملہ کون سا ہے؟', ['He has written a story.', 'He have written a story.', 'He has write a story.', 'He has wrote a story.'], 'He has written a story.', 'He کے ساتھ has + 3rd form آتا ہے۔'),
        q(`${p}-15`, 'fill-blank', 'Scientists have ____ (discover) a new medicine.', 'سائنسدان نئی دوا دریافت کر چکے ہیں۔', ['discovered', 'discover', 'discovers', 'discovering'], 'discovered', 'have discovered'),
        q(`${p}-16`, 'fill-blank', 'Has she ____ (reply) to your email?', 'کیا اس نے ای میل کا جواب دیا ہے؟', ['replied', 'reply', 'replies', 'replying'], 'replied', 'Has she replied?'),
        q(`${p}-17`, 'fill-blank', 'I have ____ (know) him for five years.', 'میں اسے پانچ سال سے جانتا ہوں۔', ['known', 'knew', 'know', 'knowing'], 'known', 'have known'),
        q(`${p}-18`, 'fill-blank', 'The bell has ____ (ring). School is over.', 'گھنٹی بج چکی ہے۔', ['rung', 'rang', 'ring', 'ringing'], 'rung', 'has rung'),
        q(`${p}-19`, 'fill-blank', 'They have ____ (build) a new school here.', 'وہ یہاں نیا سکول بنا چکے ہیں۔', ['built', 'build', 'builds', 'building'], 'built', 'have built'),
        q(`${p}-20`, 'multiple-choice', 'What is the contraction for "He has"?', '"He has" کا مختصر روپ کیا ہے؟', ['He\'s', 'He\'d', 'He\'ll', 'He\'ve'], 'He\'s', 'He has = He\'s')
      ];

    // -------------------------------------------------------------
    // Game 4: Present Perfect Continuous Tense (فعل حال جاری مکمل)
    // -------------------------------------------------------------
    case 4:
      return [
        q(`${p}-1`, 'fill-blank', 'It has been ____ (rain) since morning.', 'صبح سے بارش ہو رہی ہے۔', ['raining', 'rained', 'rains', 'rain'], 'raining', 'has been raining (وقت کے ساتھ جاری کام)'),
        q(`${p}-2`, 'fill-blank', 'I have been living in this city ____ five years.', 'میں پانچ سال سے اس شہر میں رہ رہا ہوں۔', ['for', 'since', 'at', 'from'], 'for', 'مدت (duration) کے لیے for آتا ہے'),
        q(`${p}-3`, 'fill-blank', 'She has been waiting here ____ 2 o\'clock.', 'وہ دو بجے سے یہاں انتظار کر رہی ہے۔', ['since', 'for', 'in', 'on'], 'since', 'مخصوص وقت کے آغاز کے لیے since آتا ہے'),
        q(`${p}-4`, 'fill-blank', 'They ____ (work) in this factory since 2018.', 'وہ 2018 سے اس فیکٹری میں کام کر رہے ہیں۔', ['have been working', 'has been working', 'are working', 'were working'], 'have been working', 'They have been working'),
        q(`${p}-5`, 'fill-blank', 'How long ____ you been learning English?', 'آپ کتنے عرصے سے انگریزی سیکھ رہے ہیں؟', ['have', 'has', 'had', 'are'], 'have', 'How long have you been?'),
        q(`${p}-6`, 'fill-blank', 'He has been ____ (sleep) for three hours.', 'وہ تین گھنٹے سے سو رہا ہے۔', ['sleeping', 'sleep', 'sleeps', 'slept'], 'sleeping', 'has been sleeping'),
        q(`${p}-7`, 'fill-blank', 'We have been waiting for the bus ____ morning.', 'ہم صبح سے بس کا انتظار کر رہے ہیں۔', ['since', 'for', 'by', 'until'], 'since', 'since morning'),
        q(`${p}-8`, 'fill-blank', 'Ali ____ (study) hard for his tests since yesterday.', 'علی کل سے امتحانات کے لیے سخت محنت کر رہا ہے۔', ['has been studying', 'have been studying', 'is studying', 'studied'], 'has been studying', 'Ali has been studying'),
        q(`${p}-9`, 'fill-blank', 'The gardener has been watering plants ____ two hours.', 'مالی دو گھنٹے سے پودوں کو پانی دے رہا ہے۔', ['for', 'since', 'during', 'from'], 'for', 'for two hours'),
        q(`${p}-10`, 'fill-blank', 'Have you been ____ (exercise) regularly?', 'کیا آپ باقاعدگی سے ورزش کر رہے ہیں؟', ['exercising', 'exercise', 'exercises', 'exercised'], 'exercising', 'Have you been exercising?'),
        q(`${p}-11`, 'sentence-unscramble', 'Arrange the words in correct order:', 'الفاظ ترتیب دیں: "وہ صبح سے پڑھ رہا ہے"', undefined, 'He has been studying since morning', 'وہ صبح سے پڑھ رہا ہے۔', ['has', 'He', 'been', 'studying', 'since', 'morning']),
        q(`${p}-12`, 'sentence-unscramble', 'Arrange the words in correct order:', 'الفاظ ترتیب دیں: "ہم دو گھنٹے سے کھیل رہے ہیں"', undefined, 'We have been playing for two hours', 'ہم دو گھنٹے سے کھیل رہے ہیں۔', ['have', 'We', 'been', 'playing', 'for', 'two', 'hours']),
        q(`${p}-13`, 'multiple-choice', 'When do we use "SINCE" in this tense?', 'اس ٹینس میں "Since" کب استعمال ہوتا ہے؟', ['Point of starting time (مخصوص وقت کا آغاز)', 'Total duration of time (کل وقت کی مدت)', 'Only in future (صرف مستقبل میں)', 'Never (کبھی نہیں)'], 'Point of starting time (مخصوص وقت کا آغاز)', 'مخصوص وقت کے آغاز جیسے since morning, since 1990 کے لیے since آتا ہے۔'),
        q(`${p}-14`, 'multiple-choice', 'Which sentence is CORRECT?', 'درست جملہ منتخب کریں:', ['She has been cooking for an hour.', 'She have been cooking for an hour.', 'She has cooking for an hour.', 'She is been cooking for an hour.'], 'She has been cooking for an hour.', 'واحد کے ساتھ has been + ing آتا ہے۔'),
        q(`${p}-15`, 'fill-blank', 'The tap has been leaking ____ last night.', 'نل کل رات سے ٹپک رہا ہے۔', ['since', 'for', 'from', 'in'], 'since', 'since last night'),
        q(`${p}-16`, 'fill-blank', 'They have not been ____ (attend) classes recently.', 'وہ حال ہی میں کلاسوں میں نہیں آ رہے ہیں۔', ['attending', 'attend', 'attends', 'attended'], 'attending', 'have not been attending'),
        q(`${p}-17`, 'fill-blank', 'Ahmad and Bilal ____ (play) cricket for an hour.', 'احمد اور بلال ایک گھنٹے سے کرکٹ کھیل رہے ہیں۔', ['have been playing', 'has been playing', 'are playing', 'played'], 'have been playing', 'دو افراد کے لیے have been playing'),
        q(`${p}-18`, 'fill-blank', 'The birds have been chirping ____ sunrise.', 'پرندے طلوع آفتاب سے چہچہا رہے ہیں۔', ['since', 'for', 'on', 'at'], 'since', 'since sunrise'),
        q(`${p}-19`, 'fill-blank', 'Why has the baby been ____ (cry)?', 'بچہ کیوں روتا رہا ہے؟', ['crying', 'cry', 'cries', 'cried'], 'crying', 'has been crying'),
        q(`${p}-20`, 'multiple-choice', 'Choose "for" or "since" for "10 days":', '"10 days" کے لیے کیا آئے گا؟', ['For 10 days', 'Since 10 days', 'At 10 days', 'In 10 days'], 'For 10 days', 'دنوں کی تعداد مدت ہے اس لیے For آئے گا۔')
      ];

    // -------------------------------------------------------------
    // Game 5: Past Simple Tense (فعل ماضی مطلق)
    // -------------------------------------------------------------
    case 5:
      return [
        q(`${p}-1`, 'fill-blank', 'Yesterday, I ____ (go) to the bazaar.', 'کل میں بازار گیا تھا۔', ['went', 'go', 'goes', 'gone'], 'went', 'went (ماضی کے لیے 2nd form)'),
        q(`${p}-2`, 'fill-blank', 'She ____ (buy) a beautiful dress last week.', 'اس نے پچھلے ہفتے خوبصورت لباس خریدا۔', ['bought', 'buy', 'buys', 'buying'], 'bought', 'bought (buy کی 2nd form)'),
        q(`${p}-3`, 'fill-blank', 'They did not ____ (come) to the party.', 'وہ پارٹی میں نہیں آئے۔', ['come', 'came', 'comes', 'coming'], 'come', 'did not کے بعد ہمیشہ پہلی فارم آتی ہے'),
        q(`${p}-4`, 'fill-blank', '____ you watch the cricket match last night?', 'کیا آپ نے کل رات میچ دیکھا؟', ['Did', 'Do', 'Does', 'Have'], 'Did', 'Did you watch? (ماضی کا سوال)'),
        q(`${p}-5`, 'fill-blank', 'Columbus ____ (discover) America in 1492.', 'کولمبس نے 1492 میں امریکہ دریافت کیا۔', ['discovered', 'discover', 'discovers', 'discovering'], 'discovered', 'discovered'),
        q(`${p}-6`, 'fill-blank', 'We ____ (eat) delicious mangoes yesterday.', 'ہم نے کل مزیدار آم کھائے۔', ['ate', 'eat', 'eaten', 'eating'], 'ate', 'ate (eat کی 2nd form)'),
        q(`${p}-7`, 'fill-blank', 'The teacher ____ (praise) the hardworking student.', 'استاد نے محنتی طالب علم کی تعریف کی۔', ['praised', 'praise', 'praises', 'praising'], 'praised', 'praised'),
        q(`${p}-8`, 'fill-blank', 'He did not ____ (break) the window.', 'اس نے کھڑکی نہیں توڑی۔', ['break', 'broke', 'broken', 'breaking'], 'break', 'did not break'),
        q(`${p}-9`, 'fill-blank', 'Where did you ____ (find) this old coin?', 'آپ کو یہ پرانا سکہ کہاں سے ملا؟', ['find', 'found', 'finds', 'finding'], 'find', 'did find'),
        q(`${p}-10`, 'fill-blank', 'The bird ____ (fly) away from the cage.', 'پرندہ پنجرے سے اڑ گیا۔', ['flew', 'fly', 'flies', 'flown'], 'flew', 'flew (fly کی 2nd form)'),
        q(`${p}-11`, 'sentence-unscramble', 'Arrange the words in correct order:', 'الفاظ ترتیب دیں: "ہم نے چڑیا گھر کی سیر کی"', undefined, 'We visited the zoo yesterday', 'ہم نے کل چڑیا گھر کی سیر کی۔', ['visited', 'We', 'the', 'zoo', 'yesterday']),
        q(`${p}-12`, 'sentence-unscramble', 'Arrange the words in correct order:', 'الفاظ ترتیب دیں: "اس نے سوال حل کر لیا"', undefined, 'He solved the difficult question', 'اس نے مشکل سوال حل کر لیا۔', ['solved', 'He', 'the', 'difficult', 'question']),
        q(`${p}-13`, 'multiple-choice', 'What is the past simple (2nd form) of "Teach"?', '"Teach" کی دوسری فارم کیا ہے؟', ['Taught', 'Teached', 'Taughted', 'Teaching'], 'Taught', 'Teach -> Taught -> Taught'),
        q(`${p}-14`, 'multiple-choice', 'Which negative sentence is CORRECT in Past Simple?', 'ماضی کا کون سا منفی جملہ درست ہے؟', ['He did not play football.', 'He did not played football.', 'He not played football.', 'He was not play football.'], 'He did not play football.', 'did not کے بعد 1st form (play) آتی ہے۔'),
        q(`${p}-15`, 'fill-blank', 'Ali ____ (write) an interesting poem last year.', 'علی نے پچھلے سال ایک دلچسپ نظم لکھی۔', ['wrote', 'write', 'written', 'writing'], 'wrote', 'wrote (write کی 2nd form)'),
        q(`${p}-16`, 'fill-blank', 'The glass fell and ____ (break) into pieces.', 'گلاس گرا اور ٹکڑے ٹکڑے ہو گیا۔', ['broke', 'break', 'broken', 'breaks'], 'broke', 'broke'),
        q(`${p}-17`, 'fill-blank', 'Did they ____ (win) the trophy?', 'کیا وہ ٹرافی جیت گئے؟', ['win', 'won', 'wins', 'winning'], 'win', 'Did they win?'),
        q(`${p}-18`, 'fill-blank', 'She ____ (tell) me an amusing story.', 'اس نے مجھے ایک پرلطف کہانی سنائی۔', ['told', 'tell', 'tells', 'telling'], 'told', 'told (tell کی 2nd form)'),
        q(`${p}-19`, 'fill-blank', 'I ____ (see) an elephant on the road.', 'میں نے سڑک پر ایک ہاتھی دیکھا۔', ['saw', 'see', 'seen', 'sees'], 'saw', 'saw (see کی 2nd form)'),
        q(`${p}-20`, 'multiple-choice', 'Choose the correct question format for Past Simple:', 'ماضی کے لیے درست سوالیہ فقرہ:', ['Why did she cry?', 'Why did she cried?', 'Why she cried?', 'Why was she cry?'], 'Why did she cry?', 'did کے بعد 1st form آتی ہے۔')
      ];

    // -------------------------------------------------------------
    // Game 6: Past Continuous Tense (فعل ماضی جاری)
    // -------------------------------------------------------------
    case 6:
      return [
        q(`${p}-1`, 'fill-blank', 'I ____ (read) a book when the lights went out.', 'جب بجلی گئی تو میں کتاب پڑھ رہا تھا۔', ['was reading', 'were reading', 'am reading', 'read'], 'was reading', 'I was reading'),
        q(`${p}-2`, 'fill-blank', 'They ____ (play) cricket at 5 PM yesterday.', 'کل شام 5 بجے وہ کرکٹ کھیل رہے تھے۔', ['were playing', 'was playing', 'are playing', 'played'], 'were playing', 'They were playing'),
        q(`${p}-3`, 'fill-blank', 'She ____ (cook) dinner when guests arrived.', 'جب مہمان آئے تو وہ کھانا پکا رہی تھی۔', ['was cooking', 'were cooking', 'is cooking', 'cooked'], 'was cooking', 'She was cooking'),
        q(`${p}-4`, 'fill-blank', 'What ____ you doing when I called you?', 'جب میں نے کال کی تو آپ کیا کر رہے تھے؟', ['were', 'was', 'are', 'did'], 'were', 'What were you doing?'),
        q(`${p}-5`, 'fill-blank', 'The wind was ____ (blow) strongly last night.', 'کل رات تیز ہوا چل رہی تھی۔', ['blowing', 'blow', 'blows', 'blew'], 'blowing', 'was blowing'),
        q(`${p}-6`, 'fill-blank', 'We were not ____ (make) noise in the class.', 'ہم کلاس میں شور نہیں کر رہے تھے۔', ['making', 'make', 'makes', 'made'], 'making', 'were not making'),
        q(`${p}-7`, 'fill-blank', 'The dog was ____ (bark) at the stranger.', 'کتا اجنبی پر بھونک رہا تھا۔', ['barking', 'bark', 'barks', 'barked'], 'barking', 'was barking'),
        q(`${p}-8`, 'fill-blank', 'While father was driving, mother ____ (listen) to radio.', 'جب ابو گاڑی چلا رہے تھے، امی ریڈیو سن رہی تھیں۔', ['was listening', 'were listening', 'listens', 'listened'], 'was listening', 'was listening'),
        q(`${p}-9`, 'fill-blank', 'The children ____ (laugh) happily at the cartoon.', 'بچے کارٹون دیکھ کر ہنس رہے تھے۔', ['were laughing', 'was laughing', 'are laughing', 'laughed'], 'were laughing', 'Children were laughing'),
        q(`${p}-10`, 'fill-blank', 'Was it ____ (rain) when you left home?', 'کیا بارش ہو رہی تھی جب آپ گھر سے نکلے؟', ['raining', 'rain', 'rains', 'rained'], 'raining', 'Was it raining?'),
        q(`${p}-11`, 'sentence-unscramble', 'Arrange the words in correct order:', 'الفاظ ترتیب دیں: "وہ خط لکھ رہا تھا"', undefined, 'He was writing an important letter', 'وہ ایک اہم خط لکھ رہا تھا۔', ['writing', 'He', 'was', 'an', 'important', 'letter']),
        q(`${p}-12`, 'sentence-unscramble', 'Arrange the words in correct order:', 'الفاظ ترتیب دیں: "ہم دریا کے کنارے چل رہے تھے"', undefined, 'We were walking near the river', 'ہم دریا کے قریب چل رہے تھے۔', ['were', 'We', 'walking', 'near', 'the', 'river']),
        q(`${p}-13`, 'multiple-choice', 'Which subject takes "WAS" in Past Continuous?', 'کون سے فاعل کے ساتھ "was" آتا ہے؟', ['He, She, It, I (واحد فاعل اور I)', 'They, We, You (جمع فاعل اور You)', 'Both (دونوں)', 'None (کوئی نہیں)'], 'He, She, It, I (واحد فاعل اور I)', 'I, He, She, It اور واحد اسم کے ساتھ was آتا ہے۔'),
        q(`${p}-14`, 'multiple-choice', 'Which sentence is CORRECT?', 'درست جملہ منتخب کریں:', ['They were sleeping when the phone rang.', 'They was sleeping when the phone rang.', 'They were sleep when the phone rang.', 'They did sleeping when the phone rang.'], 'They were sleeping when the phone rang.', 'They کے ساتھ were + verb-ing آتا ہے۔'),
        q(`${p}-15`, 'fill-blank', 'The stars were ____ (shine) brightly.', 'ستارے چمک رہے تھے۔', ['shining', 'shine', 'shines', 'shone'], 'shining', 'were shining'),
        q(`${p}-16`, 'fill-blank', 'Why were they ____ (shout) in the street?', 'وہ گلی میں کیوں چیخ رہے تھے؟', ['shouting', 'shout', 'shouts', 'shouted'], 'shouting', 'were shouting'),
        q(`${p}-17`, 'fill-blank', 'I was ____ (think) about my upcoming exams.', 'میں اپنے امتحانات کے بارے میں سوچ رہا تھا۔', ['thinking', 'think', 'thinks', 'thought'], 'thinking', 'was thinking'),
        q(`${p}-18`, 'fill-blank', 'Ahmad ____ (not work) when the manager entered.', 'جب منیجر داخل ہوا تو احمد کام نہیں کر رہا تھا۔', ['was not working', 'were not working', 'is not working', 'not worked'], 'was not working', 'was not working'),
        q(`${p}-19`, 'fill-blank', 'The birds were ____ (sing) melodiously at dawn.', 'صبح سویرے پرندے میٹھے گیت گا رہے تھے۔', ['singing', 'sing', 'sings', 'sang'], 'singing', 'were singing'),
        q(`${p}-20`, 'multiple-choice', 'Choose the negative form:', 'منفی صورت چنیں:', ['We were not sleeping.', 'We was not sleeping.', 'We did not sleeping.', 'We not sleeping.'], 'We were not sleeping.', 'We were not sleeping.')
      ];

    // -------------------------------------------------------------
    // Game 7: Past Perfect Tense (فعل ماضی مکمل)
    // -------------------------------------------------------------
    case 7:
      return [
        q(`${p}-1`, 'fill-blank', 'The patient had died before the doctor ____ (arrive).', 'ڈاکٹر کے آنے سے پہلے مریض دم توڑ چکا تھا۔', ['arrived', 'arrive', 'arrives', 'arriving'], 'arrived', 'پہلا کام had + 3rd form، دوسرا کام 2nd form'),
        q(`${p}-2`, 'fill-blank', 'The train had already ____ (leave) when we reached the station.', 'ہمارے اسٹیشن پہنچنے سے پہلے ٹرین جا چکی تھی۔', ['left', 'leave', 'leaves', 'leaving'], 'left', 'had already left'),
        q(`${p}-3`, 'fill-blank', 'She had ____ (cook) dinner before father came home.', 'ابو کے آنے سے پہلے وہ کھانا پکا چکی تھی۔', ['cooked', 'cook', 'cooks', 'cooking'], 'cooked', 'had cooked'),
        q(`${p}-4`, 'fill-blank', 'I had never ____ (see) such a beautiful waterfall before.', 'میں نے پہلے کبھی اتنا خوبصورت آبشار نہیں دیکھا تھا۔', ['seen', 'saw', 'see', 'seeing'], 'seen', 'had seen'),
        q(`${p}-5`, 'fill-blank', 'They had already ____ (finish) the exam before time was up.', 'وقت ختم ہونے سے پہلے وہ امتحان ختم کر چکے تھے۔', ['finished', 'finish', 'finishes', 'finishing'], 'finished', 'had finished'),
        q(`${p}-6`, 'fill-blank', 'Had you ____ (meet) him before that party?', 'کیا آپ اس پارٹی سے پہلے اس سے مل چکے تھے؟', ['met', 'meet', 'meets', 'meeting'], 'met', 'Had you met?'),
        q(`${p}-7`, 'fill-blank', 'Ali realized he had ____ (forget) his keys at the office.', 'علی کو احساس ہوا کہ وہ چابیاں دفتر میں بھول آیا تھا۔', ['forgotten', 'forgot', 'forget', 'forgetting'], 'forgotten', 'had forgotten'),
        q(`${p}-8`, 'fill-blank', 'The rain had ____ (stop) before we started our journey.', 'سفر شروع کرنے سے پہلے بارش رک چکی تھی۔', ['stopped', 'stop', 'stops', 'stopping'], 'stopped', 'had stopped'),
        q(`${p}-9`, 'fill-blank', 'He had not ____ (study) hard, so he failed the test.', 'اس نے محنت نہیں کی تھی، اس لیے فیل ہو گیا۔', ['studied', 'study', 'studies', 'studying'], 'studied', 'had not studied'),
        q(`${p}-10`, 'fill-blank', 'We had ____ (live) in Karachi for ten years before moving to Lahore.', 'لاہور منتقل ہونے سے پہلے ہم دس سال کراچی رہ چکے تھے۔', ['lived', 'live', 'lives', 'living'], 'lived', 'had lived'),
        q(`${p}-11`, 'sentence-unscramble', 'Arrange the words in correct order:', 'الفاظ ترتیب دیں: "ٹرین جا چکی تھی"', undefined, 'The train had already left', 'ٹرین پہلے ہی جا چکی تھی۔', ['already', 'The', 'train', 'had', 'left']),
        q(`${p}-12`, 'sentence-unscramble', 'Arrange the words in correct order:', 'الفاظ ترتیب دیں: "سورج غروب ہو چکا تھا"', undefined, 'The sun had already set', 'سورج پہلے ہی غروب ہو چکا تھا۔', ['had', 'The', 'sun', 'already', 'set']),
        q(`${p}-13`, 'multiple-choice', 'Which auxiliary (helping) verb is used in Past Perfect for all subjects?', 'پاسٹ پرفیکٹ میں تمام فاعلوں کے ساتھ کون سا امدادی فعل آتا ہے؟', ['HAD (تمام کے ساتھ)', 'HAVE', 'HAS', 'WAS'], 'HAD (تمام کے ساتھ)', 'واحد اور جمع سب کے ساتھ HAD + 3rd form آتا ہے۔'),
        q(`${p}-14`, 'multiple-choice', 'Identify the correct Past Perfect sentence:', 'پاسٹ پرفیکٹ کا درست جملہ پہچانیں:', ['When I arrived, the match had begun.', 'When I arrived, the match has begun.', 'When I arrived, the match begun.', 'When I arrived, the match was begun.'], 'When I arrived, the match had begun.', 'had begun (پہلے مکمل ہوا کام)'),
        q(`${p}-15`, 'fill-blank', 'The bell had ____ (ring) before I reached school.', 'میرے سکول پہنچنے سے پہلے گھنٹی بج چکی تھی۔', ['rung', 'rang', 'ring', 'ringing'], 'rung', 'had rung'),
        q(`${p}-16`, 'fill-blank', 'Had they ____ (pay) the bill before leaving?', 'کیا انہوں نے جانے سے پہلے بل ادا کر دیا تھا؟', ['paid', 'pay', 'pays', 'paying'], 'paid', 'Had they paid?'),
        q(`${p}-17`, 'fill-blank', 'She was upset because she had ____ (lose) her purse.', 'وہ پریشان تھی کیونکہ اس کا پرس کھو گیا تھا۔', ['lost', 'lose', 'loses', 'losing'], 'lost', 'had lost'),
        q(`${p}-18`, 'fill-blank', 'The thief had fled before the police ____ (arrive).', 'پولیس کے پہنچنے سے پہلے چور فرار ہو چکا تھا۔', ['arrived', 'arrive', 'arriving', 'had arrived'], 'arrived', 'بعد والے کام کے لیے 2nd form (arrived)'),
        q(`${p}-19`, 'fill-blank', 'I had ____ (buy) the tickets a week in advance.', 'میں نے ایک ہفتہ پہلے ٹکٹ خرید لیے تھے۔', ['bought', 'buy', 'buys', 'buying'], 'bought', 'had bought'),
        q(`${p}-20`, 'multiple-choice', 'What is the negative of "He had done it"?', '"He had done it" کا منفی جملہ کیا ہے؟', ['He had not done it.', 'He has not done it.', 'He did not done it.', 'He had not do it.'], 'He had not done it.', 'had not done it')
      ];

    // -------------------------------------------------------------
    // Game 8: Past Perfect Continuous Tense (فعل ماضی جاری مکمل)
    // -------------------------------------------------------------
    case 8:
      return [
        q(`${p}-1`, 'fill-blank', 'He was tired because he had been ____ (run) for an hour.', 'وہ تھکا ہوا تھا کیونکہ وہ ایک گھنٹے سے دوڑ رہا تھا۔', ['running', 'run', 'runs', 'ran'], 'running', 'had been running (ماضی میں وقت کے ساتھ جاری کام)'),
        q(`${p}-2`, 'fill-blank', 'The ground was wet because it had been raining ____ night.', 'زمین گیلی تھی کیونکہ رات سے بارش ہو رہی تھی۔', ['since', 'for', 'at', 'in'], 'since', 'since night'),
        q(`${p}-3`, 'fill-blank', 'They had been waiting ____ two hours before the bus arrived.', 'بس آنے سے پہلے وہ دو گھنٹے سے انتظار کر رہے تھے۔', ['for', 'since', 'by', 'from'], 'for', 'for two hours'),
        q(`${p}-4`, 'fill-blank', 'She had been ____ (teach) in that school for five years before she moved.', 'منتقل ہونے سے پہلے وہ اس سکول میں پانچ سال سے پڑھا رہی تھی۔', ['teaching', 'teach', 'teaches', 'taught'], 'teaching', 'had been teaching'),
        q(`${p}-5`, 'fill-blank', 'How long had you been ____ (wait) there?', 'آپ وہاں کتنی دیر سے انتظار کر رہے تھے؟', ['waiting', 'wait', 'waits', 'waited'], 'waiting', 'had you been waiting?'),
        q(`${p}-6`, 'fill-blank', 'We had been ____ (look) for the lost keys all morning.', 'ہم پوری صبح سے گمشدہ چابیاں ڈھونڈ رہے تھے۔', ['looking', 'look', 'looks', 'looked'], 'looking', 'had been looking'),
        q(`${p}-7`, 'fill-blank', 'Ali was out of breath because he had been ____ (play) football.', 'علی کی سانس پھولی ہوئی تھی کیونکہ وہ فٹ بال کھیل رہا تھا۔', ['playing', 'play', 'plays', 'played'], 'playing', 'had been playing'),
        q(`${p}-8`, 'fill-blank', 'The machine had been working smoothly ____ 2015.', 'مشین 2015 سے عمدگی سے کام کر رہی تھی۔', ['since', 'for', 'at', 'in'], 'since', 'since 2015'),
        q(`${p}-9`, 'fill-blank', 'They had not been ____ (pay) attention to the warnings.', 'وہ تنبیہات پر توجہ نہیں دے رہے تھے۔', ['paying', 'pay', 'pays', 'paid'], 'paying', 'had not been paying'),
        q(`${p}-10`, 'fill-blank', 'Ahmad had been ____ (write) the novel for two years.', 'احمد دو سال سے وہ ناول لکھ رہا تھا۔', ['writing', 'write', 'writes', 'wrote'], 'writing', 'had been writing'),
        q(`${p}-11`, 'sentence-unscramble', 'Arrange the words in correct order:', 'الفاظ ترتیب دیں: "وہ دو گھنٹے سے پڑھ رہا تھا"', undefined, 'He had been studying for two hours', 'وہ دو گھنٹے سے پڑھ رہا تھا۔', ['had', 'He', 'been', 'studying', 'for', 'two', 'hours']),
        q(`${p}-12`, 'sentence-unscramble', 'Arrange the words in correct order:', 'الفاظ ترتیب دیں: "صبح سے بارش ہو رہی تھی"', undefined, 'It had been raining since morning', 'صبح سے بارش ہو رہی تھی۔', ['had', 'It', 'been', 'raining', 'since', 'morning']),
        q(`${p}-13`, 'multiple-choice', 'What formula defines Past Perfect Continuous?', 'پاسٹ پرفیکٹ کنٹینیوس کا کلیہ کیا ہے؟', ['Had been + Verb-ing + Since/For', 'Has been + Verb-ing', 'Was + Verb-ing', 'Had + 3rd form'], 'Had been + Verb-ing + Since/For', 'Had been + verb-ing + since/for'),
        q(`${p}-14`, 'multiple-choice', 'Which sentence is CORRECT?', 'درست جملہ منتخب کریں:', ['She had been sleeping for three hours before mother woke her.', 'She has been sleeping for three hours before mother woke her.', 'She had sleeping for three hours.', 'She was been sleeping for three hours.'], 'She had been sleeping for three hours before mother woke her.', 'had been sleeping'),
        q(`${p}-15`, 'fill-blank', 'His eyes were red because he had been ____ (stare) at the screen.', 'اس کی آنکھیں سرخ تھیں کیونکہ وہ سکرین پر گھور رہا تھا۔', ['staring', 'stare', 'stares', 'stared'], 'staring', 'had been staring'),
        q(`${p}-16`, 'fill-blank', 'Had they been ____ (live) there for a long time?', 'کیا وہ وہاں طویل عرصے سے رہ رہے تھے؟', ['living', 'live', 'lives', 'lived'], 'living', 'Had they been living?'),
        q(`${p}-17`, 'fill-blank', 'The birds had been singing ____ dawn.', 'پرندے فجر کے وقت سے چہچہا رہے تھے۔', ['since', 'for', 'on', 'at'], 'since', 'since dawn'),
        q(`${p}-18`, 'fill-blank', 'The artist had been ____ (paint) the portrait all afternoon.', 'مصور پوری دوپہر پورٹریٹ بناتا رہا تھا۔', ['painting', 'paint', 'paints', 'painted'], 'painting', 'had been painting'),
        q(`${p}-19`, 'fill-blank', 'We had been driving ____ six hours before we stopped.', 'رکنے سے پہلے ہم چھ گھنٹے سے گاڑی چلا رہے تھے۔', ['for', 'since', 'at', 'by'], 'for', 'for six hours'),
        q(`${p}-20`, 'multiple-choice', 'When is Past Perfect Continuous used?', 'یہ ٹینس کب استعمال ہوتا ہے؟', ['An ongoing action in the past before another past event', 'Something happening right now', 'A general truth', 'A future intention'], 'An ongoing action in the past before another past event', 'ماضی کے کسی واقعے سے پہلے جاری رہنے والے کام کے لیے۔')
      ];

    // -------------------------------------------------------------
    // Game 9: Future Simple Tense (فعل مستقبل مطلق)
    // -------------------------------------------------------------
    case 9:
      return [
        q(`${p}-1`, 'fill-blank', 'I ____ (call) you tomorrow morning.', 'میں آپ کو کل صبح فون کروں گا۔', ['will call', 'called', 'calling', 'calls'], 'will call', 'will call (مستقبل کے لیے will + 1st form)'),
        q(`${p}-2`, 'fill-blank', 'They will ____ (arrive) at 8 PM tonight.', 'وہ آج رات 8 بجے پہنچیں گے۔', ['arrive', 'arrived', 'arriving', 'arrives'], 'arrive', 'will کے بعد ہمیشہ پہلی فارم آتی ہے'),
        q(`${p}-3`, 'fill-blank', 'She will not ____ (forget) your kind help.', 'وہ آپ کی مہربانی کبھی نہیں بھولے گی۔', ['forget', 'forgot', 'forgotten', 'forgetting'], 'forget', 'will not forget'),
        q(`${p}-4`, 'fill-blank', '____ you come to my birthday party on Friday?', 'کیا آپ جمعہ کو میری سالگرہ کی تقریب میں آئیں گے؟', ['Will', 'Do', 'Did', 'Are'], 'Will', 'Will you come?'),
        q(`${p}-5`, 'fill-blank', 'Humans will ____ (travel) to Mars in the future.', 'انسان مستقبل میں مریخ کا سفر کریں گے۔', ['travel', 'travels', 'travelled', 'travelling'], 'travel', 'will travel'),
        q(`${p}-6`, 'fill-blank', 'We shall ____ (win) the match if we play united.', 'اگر ہم مل کر کھیلیں گے تو ہم میچ جیتیں گے۔', ['win', 'won', 'winning', 'wins'], 'win', 'shall win'),
        q(`${p}-7`, 'fill-blank', 'It will probably ____ (rain) tomorrow.', 'کل شاید بارش ہوگی۔', ['rain', 'rained', 'rains', 'raining'], 'rain', 'will rain'),
        q(`${p}-8`, 'fill-blank', 'The shops will ____ (open) at 10 AM.', 'دکانیں صبح 10 بجے کھلیں گی۔', ['open', 'opened', 'opening', 'opens'], 'open', 'will open'),
        q(`${p}-9`, 'fill-blank', 'I promise I will ____ (help) you with English.', 'میرا وعدہ ہے میں انگریزی میں آپ کی مدد کروں گا۔', ['help', 'helped', 'helps', 'helping'], 'help', 'will help'),
        q(`${p}-10`, 'fill-blank', 'Will they ____ (agree) to our terms?', 'کیا وہ ہماری شرائط پر راضی ہوں گے؟', ['agree', 'agreed', 'agrees', 'agreeing'], 'agree', 'Will they agree?'),
        q(`${p}-11`, 'sentence-unscramble', 'Arrange the words in correct order:', 'الفاظ ترتیب دیں: "ہم کل لاہور جائیں گے"', undefined, 'We will go to Lahore tomorrow', 'ہم کل لاہور جائیں گے۔', ['will', 'We', 'go', 'to', 'Lahore', 'tomorrow']),
        q(`${p}-12`, 'sentence-unscramble', 'Arrange the words in correct order:', 'الفاظ ترتیب دیں: "وہ نیا موبائل خریدے گا"', undefined, 'He will buy a new phone', 'وہ نیا موبائل خریدے گا۔', ['will', 'He', 'buy', 'a', 'new', 'phone']),
        q(`${p}-13`, 'multiple-choice', 'What is the short negative form (contraction) of "Will not"?', '"Will not" کا مختصر روپ کیا ہے؟', ['Won\'t', 'Willn\'t', 'Win\'t', 'Wouldn\'t'], 'Won\'t', 'Will not = Won\'t'),
        q(`${p}-14`, 'multiple-choice', 'Which sentence is CORRECT?', 'درست جملہ منتخب کریں:', ['She will pass the exam with high marks.', 'She will passed the exam with high marks.', 'She will passes the exam.', 'She will passing the exam.'], 'She will pass the exam with high marks.', 'will کے بعد 1st form آتی ہے۔'),
        q(`${p}-15`, 'fill-blank', 'The train will ____ (depart) on time.', 'ٹرین وقت پر روانہ ہوگی۔', ['depart', 'departed', 'departs', 'departing'], 'depart', 'will depart'),
        q(`${p}-16`, 'fill-blank', 'They will not ____ (tolerate) injustice.', 'وہ ناانصافی برداشت نہیں کریں گے۔', ['tolerate', 'tolerated', 'tolerates', 'tolerating'], 'tolerate', 'will not tolerate'),
        q(`${p}-17`, 'fill-blank', 'I think Pakistan will ____ (build) more solar plants.', 'میرے خیال میں پاکستان مزید سولر پلانٹس لگائے گا۔', ['build', 'built', 'builds', 'building'], 'build', 'will build'),
        q(`${p}-18`, 'fill-blank', 'Where will you ____ (stay) during the holidays?', 'چھٹیوں میں آپ کہاں قیام کریں گے؟', ['stay', 'stayed', 'stays', 'staying'], 'stay', 'Where will you stay?'),
        q(`${p}-19`, 'fill-blank', 'The doctor will ____ (examine) the patient shortly.', 'ڈاکٹر جلد مریض کا معائنہ کرے گا۔', ['examine', 'examined', 'examines', 'examining'], 'examine', 'will examine'),
        q(`${p}-20`, 'multiple-choice', 'Choose the correct question format:', 'درست سوالیہ انداز چنیں:', ['When will you return?', 'When you will return?', 'When return will you?', 'When will you returned?'], 'When will you return?', 'Wh-word + will + subject + 1st form')
      ];

    // -------------------------------------------------------------
    // Game 10: Future Continuous Tense (فعل مستقبل جاری)
    // -------------------------------------------------------------
    case 10:
      return [
        q(`${p}-1`, 'fill-blank', 'This time tomorrow, I will be ____ (fly) to London.', 'کل اس وقت میں لندن جا رہا ہوں گا۔', ['flying', 'fly', 'flies', 'flew'], 'flying', 'will be flying (مستقبل میں جاری کام)'),
        q(`${p}-2`, 'fill-blank', 'They will be ____ (play) football at 5 PM tomorrow.', 'کل شام 5 بجے وہ فٹ بال کھیل رہے ہوں گے۔', ['playing', 'play', 'plays', 'played'], 'playing', 'will be playing'),
        q(`${p}-3`, 'fill-blank', 'She will be ____ (prepare) dinner when we get home.', 'جب ہم گھر پہنچیں گے تو وہ کھانا تیار کر رہی ہوگی۔', ['preparing', 'prepare', 'prepares', 'prepared'], 'preparing', 'will be preparing'),
        q(`${p}-4`, 'fill-blank', 'Will you be ____ (use) your laptop tonight?', 'کیا آپ آج رات اپنا لیپ ٹاپ استعمال کر رہے ہوں گے؟', ['using', 'use', 'uses', 'used'], 'using', 'Will you be using?'),
        q(`${p}-5`, 'fill-blank', 'We will be ____ (celebrate) our victory tomorrow.', 'ہم کل اپنی فتح کا جشن منا رہے ہوں گے۔', ['celebrating', 'celebrate', 'celebrates', 'celebrated'], 'celebrating', 'will be celebrating'),
        q(`${p}-6`, 'fill-blank', 'The children will be ____ (sleep) by 10 PM.', 'دس بجے تک بچے سو رہے ہوں گے۔', ['sleeping', 'sleep', 'sleeps', 'slept'], 'sleeping', 'will be sleeping'),
        q(`${p}-7`, 'fill-blank', 'He will not be ____ (work) this weekend.', 'وہ اس ویک اینڈ پر کام نہیں کر رہا ہوگا۔', ['working', 'work', 'works', 'worked'], 'working', 'will not be working'),
        q(`${p}-8`, 'fill-blank', 'The birds will be ____ (chirp) in the morning.', 'صبح پرندے چہچہا رہے ہوں گے۔', ['chirping', 'chirp', 'chirps', 'chirped'], 'chirping', 'will be chirping'),
        q(`${p}-9`, 'fill-blank', 'What will you be ____ (do) tomorrow at noon?', 'کل دوپہر آپ کیا کر رہے ہوں گے؟', ['doing', 'do', 'does', 'done'], 'doing', 'will you be doing?'),
        q(`${p}-10`, 'fill-blank', 'The sun will be ____ (shine) brightly over the mountains.', 'سورج پہاڑوں پر چمک رہا ہوگا۔', ['shining', 'shine', 'shines', 'shone'], 'shining', 'will be shining'),
        q(`${p}-11`, 'sentence-unscramble', 'Arrange the words in correct order:', 'الفاظ ترتیب دیں: "ہم پڑھائی کر رہے ہوں گے"', undefined, 'We will be studying for exams', 'ہم امتحانات کے لیے پڑھائی کر رہے ہوں گے۔', ['will', 'We', 'be', 'studying', 'for', 'exams']),
        q(`${p}-12`, 'sentence-unscramble', 'Arrange the words in correct order:', 'الفاظ ترتیب دیں: "بارش ہو رہی ہوگی"', undefined, 'It will be raining in Murree', 'مری میں بارش ہو رہی ہوگی۔', ['will', 'It', 'be', 'raining', 'in', 'Murree']),
        q(`${p}-13`, 'multiple-choice', 'What is the structure of Future Continuous Tense?', 'فیوچر کنٹینیوس کی ساخت کیا ہے؟', ['Subject + Will be + Verb-ing', 'Subject + Will + Verb 1st', 'Subject + Will have + 3rd form', 'Subject + Is + Verb-ing'], 'Subject + Will be + Verb-ing', 'will be + verb-ing'),
        q(`${p}-14`, 'multiple-choice', 'Which sentence is CORRECT?', 'درست جملہ منتخب کریں:', ['At 9 AM tomorrow, Ali will be taking his exam.', 'At 9 AM tomorrow, Ali will taking his exam.', 'At 9 AM tomorrow, Ali will be take his exam.', 'At 9 AM tomorrow, Ali will be took his exam.'], 'At 9 AM tomorrow, Ali will be taking his exam.', 'will be taking'),
        q(`${p}-15`, 'fill-blank', 'I will be ____ (wait) for you at the airport terminal.', 'میں ائیرپورٹ ٹرمینل پر آپ کا انتظار کر رہا ہوں گا۔', ['waiting', 'wait', 'waits', 'waited'], 'waiting', 'will be waiting'),
        q(`${p}-16`, 'fill-blank', 'Will they be ____ (stay) at the Pearl Continental?', 'کیا وہ پرل کانٹینینٹل میں قیام کر رہے ہوں گے؟', ['staying', 'stay', 'stays', 'stayed'], 'staying', 'Will they be staying?'),
        q(`${p}-17`, 'fill-blank', 'She will not be ____ (watch) TV during study hours.', 'پڑھائی کے اوقات میں وہ ٹی وی نہیں دیکھ رہی ہوگی۔', ['watching', 'watch', 'watches', 'watched'], 'watching', 'will not be watching'),
        q(`${p}-18`, 'fill-blank', 'The stars will be ____ (twinkle) across the sky.', 'ستارے آسمان پر ٹمٹما رہے ہوں گے۔', ['twinkling', 'twinkle', 'twinkles', 'twinkled'], 'twinkling', 'will be twinkling'),
        q(`${p}-19`, 'fill-blank', 'Who will be ____ (host) the annual school function?', 'سکول کی سالانہ تقریب کی نظامت کون کر رہا ہوگا؟', ['hosting', 'host', 'hosts', 'hosted'], 'hosting', 'will be hosting'),
        q(`${p}-20`, 'multiple-choice', 'Negative contraction of "will not be":', '"Will not be" کا منفی فقرہ:', ['He won\'t be coming.', 'He will be not coming.', 'He not will be coming.', 'He will be no coming.'], 'He won\'t be coming.', 'won\'t be coming')
      ];

    // -------------------------------------------------------------
    // Game 11: Future Perfect Tense (فعل مستقبل مکمل)
    // -------------------------------------------------------------
    case 11:
      return [
        q(`${p}-1`, 'fill-blank', 'By next year, I will have ____ (complete) my graduation.', 'اگلے سال تک میں اپنی گریجویشن مکمل کر چکا ہوں گا۔', ['completed', 'complete', 'completes', 'completing'], 'completed', 'will have completed (will have + 3rd form)'),
        q(`${p}-2`, 'fill-blank', 'She will have ____ (reach) Islamabad by 5 PM.', 'شام 5 بجے تک وہ اسلام آباد پہنچ چکی ہوگی۔', ['reached', 'reach', 'reaches', 'reaching'], 'reached', 'will have reached'),
        q(`${p}-3`, 'fill-blank', 'They will have ____ (finish) the building by December.', 'دسمبر تک وہ عمارت مکمل کر چکے ہوں گے۔', ['finished', 'finish', 'finishes', 'finishing'], 'finished', 'will have finished'),
        q(`${p}-4`, 'fill-blank', 'By the time you wake up, I will have ____ (leave).', 'آپ کے جاگنے تک میں جا چکا ہوں گا۔', ['left', 'leave', 'leaves', 'leaving'], 'left', 'will have left'),
        q(`${p}-5`, 'fill-blank', 'The sun will have ____ (rise) before we begin our journey.', 'سفر شروع کرنے سے پہلے سورج طلوع ہو چکا ہوگا۔', ['risen', 'rose', 'rise', 'rising'], 'risen', 'will have risen'),
        q(`${p}-6`, 'fill-blank', 'Will they have ____ (solve) the crisis by next month?', 'کیا وہ اگلے ماہ تک بحران حل کر چکے ہوں گے؟', ['solved', 'solve', 'solves', 'solving'], 'solved', 'Will they have solved?'),
        q(`${p}-7`, 'fill-blank', 'We will have ____ (save) enough money for Hajj by next year.', 'اگلے سال تک ہم حج کے لیے رقم جمع کر چکے ہوں گے۔', ['saved', 'save', 'saves', 'saving'], 'saved', 'will have saved'),
        q(`${p}-8`, 'fill-blank', 'The doctor will have ____ (examine) all patients by noon.', 'دوپہر تک ڈاکٹر تمام مریضوں کا معائنہ کر چکا ہوگا۔', ['examined', 'examine', 'examines', 'examining'], 'examined', 'will have examined'),
        q(`${p}-9`, 'fill-blank', 'He will not have ____ (written) the report before Friday.', 'جمعہ سے پہلے وہ رپورٹ نہیں لکھ چکا ہوگا۔', ['written', 'wrote', 'write', 'writing'], 'written', 'will not have written'),
        q(`${p}-10`, 'fill-blank', 'By 10 PM, the train will have ____ (arrive) at the platform.', 'رات 10 بجے تک ٹرین پلیٹ فارم پر پہنچ چکی ہوگی۔', ['arrived', 'arrive', 'arrives', 'arriving'], 'arrived', 'will have arrived'),
        q(`${p}-11`, 'sentence-unscramble', 'Arrange the words in correct order:', 'الفاظ ترتیب دیں: "وہ کام ختم کر چکے ہوں گے"', undefined, 'They will have finished their work', 'وہ اپنا کام ختم کر چکے ہوں گے۔', ['will', 'They', 'have', 'finished', 'their', 'work']),
        q(`${p}-12`, 'sentence-unscramble', 'Arrange the words in correct order:', 'الفاظ ترتیب دیں: "ہم میچ جیت چکے ہوں گے"', undefined, 'We will have won the trophy', 'ہم ٹرافی جیت چکے ہوں گے۔', ['will', 'We', 'have', 'won', 'the', 'trophy']),
        q(`${p}-13`, 'multiple-choice', 'What is the structure of Future Perfect Tense?', 'فیوچر پرفیکٹ کی بناوٹ کیا ہے؟', ['Will have + 3rd form of verb', 'Will have been + ing', 'Will be + 3rd form', 'Has + 3rd form'], 'Will have + 3rd form of verb', 'will have + 3rd form'),
        q(`${p}-14`, 'multiple-choice', 'Which preposition is most commonly used with Future Perfect?', 'مستقبل کے اس ٹینس میں مقررہ وقت کے لیے کون سا لفظ آتا ہے؟', ['BY (جیسے: By next week, By 2026)', 'AT', 'SINCE', 'FOR'], 'BY (جیسے: By next week, By 2026)', 'مقررہ حد کے لیے "By" استعمال ہوتا ہے۔'),
        q(`${p}-15`, 'fill-blank', 'By tomorrow, they will have ____ (repair) the bridge.', 'کل تک وہ پل کی مرمت کر چکے ہوں گے۔', ['repaired', 'repair', 'repairs', 'repairing'], 'repaired', 'will have repaired'),
        q(`${p}-16`, 'fill-blank', 'Will she have ____ (cooked) the dinner before guests arrive?', 'کیا مہمانوں کے آنے سے پہلے وہ کھانا پکا چکی ہوگی؟', ['cooked', 'cook', 'cooks', 'cooking'], 'cooked', 'Will she have cooked?'),
        q(`${p}-17`, 'fill-blank', 'I will have ____ (read) this whole book by Sunday.', 'اتوار تک میں یہ پوری کتاب پڑھ چکا ہوں گا۔', ['read', 'reads', 'reading', 'reader'], 'read', 'will have read'),
        q(`${p}-18`, 'fill-blank', 'Scientists will have ____ (invent) cleaner energy by 2030.', '2030 تک سائنسدان صاف ستھری توانائی ایجاد کر چکے ہوں گے۔', ['invented', 'invent', 'invents', 'inventing'], 'invented', 'will have invented'),
        q(`${p}-19`, 'fill-blank', 'The students will have ____ (pass) their finals by June.', 'جون تک طلبہ اپنے امتحانات پاس کر چکے ہوں گے۔', ['passed', 'pass', 'passes', 'passing'], 'passed', 'will have passed'),
        q(`${p}-20`, 'multiple-choice', 'Choose the correct Future Perfect sentence:', 'درست جملہ منتخب کریں:', ['By sunset, the birds will have returned to nests.', 'By sunset, the birds will returned to nests.', 'By sunset, the birds will having returned.', 'By sunset, the birds will have return.'], 'By sunset, the birds will have returned to nests.', 'will have returned')
      ];

    // -------------------------------------------------------------
    // Game 12: Future Perfect Continuous Tense (فعل مستقبل جاری مکمل)
    // -------------------------------------------------------------
    case 12:
    default:
      return [
        q(`${p}-1`, 'fill-blank', 'By 2026, I will have been ____ (work) here for ten years.', '2026 تک میں یہاں دس سال سے کام کر رہا ہوں گا۔', ['working', 'worked', 'work', 'works'], 'working', 'will have been working'),
        q(`${p}-2`, 'fill-blank', 'Next month, she will have been living in this house ____ five years.', 'اگلے ماہ وہ اس گھر میں پانچ سال سے رہ رہی ہوگی۔', ['for', 'since', 'at', 'by'], 'for', 'for five years (مدت کے لیے)'),
        q(`${p}-3`, 'fill-blank', 'By 5 PM, they will have been ____ (play) cricket for four hours.', 'شام 5 بجے تک وہ چار گھنٹے سے کرکٹ کھیل رہے ہوں گے۔', ['playing', 'play', 'plays', 'played'], 'playing', 'will have been playing'),
        q(`${p}-4`, 'fill-blank', 'He will have been ____ (teach) English since 2015 by next December.', 'اگلے دسمبر تک وہ 2015 سے انگریزی پڑھا رہا ہوگا۔', ['teaching', 'teach', 'teaches', 'taught'], 'teaching', 'will have been teaching'),
        q(`${p}-5`, 'fill-blank', 'How long will you have been ____ (study) when you graduate?', 'جب آپ فارغ التحصیل ہوں گے تو کتنے عرصے سے پڑھ رہے ہوں گے؟', ['studying', 'study', 'studies', 'studied'], 'studying', 'will you have been studying?'),
        q(`${p}-6`, 'fill-blank', 'By tomorrow, it will have been raining ____ three straight days.', 'کل تک لگاتار تین دن سے بارش ہو رہی ہوگی۔', ['for', 'since', 'at', 'by'], 'for', 'for three days'),
        q(`${p}-7`, 'fill-blank', 'The workers will have been ____ (build) the bridge for two years.', 'مزدور دو سال سے پل تعمیر کر رہے ہوں گے۔', ['building', 'build', 'builds', 'built'], 'building', 'will have been building'),
        q(`${p}-8`, 'fill-blank', 'She will have been waiting ____ 2 o\'clock by the time the flight arrives.', 'فلائٹ آنے تک وہ دو بجے سے انتظار کر رہی ہوگی۔', ['since', 'for', 'in', 'on'], 'since', 'since 2 o\'clock'),
        q(`${p}-9`, 'fill-blank', 'Will they have been ____ (travel) for 24 hours by tomorrow?', 'کیا کل تک وہ 24 گھنٹے سے سفر کر رہے ہوں گے؟', ['travelling', 'travel', 'travels', 'travelled'], 'travelling', 'will have been travelling'),
        q(`${p}-10`, 'fill-blank', 'We will have been ____ (train) for months before the tournament begins.', 'ٹورنامنٹ شروع ہونے سے پہلے ہم مہینوں سے ٹریننگ کر رہے ہوں گے۔', ['training', 'train', 'trains', 'trained'], 'training', 'will have been training'),
        q(`${p}-11`, 'sentence-unscramble', 'Arrange the words in correct order:', 'الفاظ ترتیب دیں: "وہ دو گھنٹے سے انتظار کر رہا ہوگا"', undefined, 'He will have been waiting for two hours', 'وہ دو گھنٹے سے انتظار کر رہا ہوگا۔', ['will', 'He', 'have', 'been', 'waiting', 'for', 'two', 'hours']),
        q(`${p}-12`, 'sentence-unscramble', 'Arrange the words in correct order:', 'الفاظ ترتیب دیں: "ہم صبح سے سفر کر رہے ہوں گے"', undefined, 'We will have been travelling since morning', 'ہم صبح سے سفر کر رہے ہوں گے۔', ['will', 'We', 'have', 'been', 'travelling', 'since', 'morning']),
        q(`${p}-13`, 'multiple-choice', 'What is the full formula of Future Perfect Continuous Tense?', 'اس ٹینس کا مکمل کلیہ کیا ہے؟', ['Will have been + Verb-ing + For/Since', 'Will be + Verb-ing', 'Will have + 3rd form', 'Has been + Verb-ing'], 'Will have been + Verb-ing + For/Since', 'will have been + verb-ing + for/since'),
        q(`${p}-14`, 'multiple-choice', 'Which sentence is grammatically CORRECT?', 'درست جملہ منتخب کریں:', ['By next week, Ali will have been driving for 5 years.', 'By next week, Ali will been driving for 5 years.', 'By next week, Ali will have driving for 5 years.', 'By next week, Ali will have been drive.'], 'By next week, Ali will have been driving for 5 years.', 'will have been driving'),
        q(`${p}-15`, 'fill-blank', 'The doctor will have been operating on patients ____ five hours.', 'ڈاکٹر پانچ گھنٹے سے سرجری کر رہا ہوگا۔', ['for', 'since', 'by', 'at'], 'for', 'for five hours'),
        q(`${p}-16`, 'fill-blank', 'Will she have been ____ (practice) piano all morning?', 'کیا وہ پوری صبح سے پیانو کی مشق کر رہی ہوگی؟', ['practicing', 'practice', 'practices', 'practiced'], 'practicing', 'will she have been practicing?'),
        q(`${p}-17`, 'fill-blank', 'By autumn, the birds will have been flying south ____ weeks.', 'خزاں تک پرندے ہفتوں سے جنوب کی طرف اڑ رہے ہوں گے۔', ['for', 'since', 'at', 'in'], 'for', 'for weeks'),
        q(`${p}-18`, 'fill-blank', 'I will not have been ____ (sleep) for long when you arrive.', 'آپ کے آنے تک میں زیادہ دیر سے نہیں سو رہا ہوں گا۔', ['sleeping', 'sleep', 'sleeps', 'slept'], 'sleeping', 'will not have been sleeping'),
        q(`${p}-19`, 'fill-blank', 'By sunset, the farmer will have been harvesting crops ____ dawn.', 'غروب آفتاب تک کسان فجر سے فصل کاٹ رہا ہوگا۔', ['since', 'for', 'by', 'at'], 'since', 'since dawn'),
        q(`${p}-20`, 'multiple-choice', 'What does Future Perfect Continuous express?', 'یہ ٹینس کس چیز کا اظہار کرتا ہے؟', ['Ongoing duration of action up to a future reference point', 'A single instant in past', 'A routine fact today', 'A completed event yesterday'], 'Ongoing duration of action up to a future reference point', 'مستقبل کے کسی مقررہ وقت تک کسی کام کے جاری رہنے کی مدت۔')
      ];
  }
}
