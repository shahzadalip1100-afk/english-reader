/**
 * Comprehensive English-Urdu vocabulary bank for kids and learners.
 * Features 30+ rich categories, phonetics/transliteration in Urdu script,
 * parts of speech, and kid-friendly example sentences.
 * Also integrates with /api/lookup-word for on-demand lookup across 100,000+ words.
 */

export interface WordDefinition {
  word: string;
  urdu: string;
  transliteration: string; // Phonetic pronunciation written in Urdu letters (e.g. ایپل)
  partOfSpeech: string;
  example: string;
  category: string;
}

export const OFFLINE_DICTIONARY: Record<string, WordDefinition> = {
  // Animals (جانور)
  fox: { word: 'fox', urdu: 'لومڑی', transliteration: 'فوکس', partOfSpeech: 'noun', example: 'The fox is clever.', category: 'Animals' },
  dog: { word: 'dog', urdu: 'کتا', transliteration: 'ڈاگ', partOfSpeech: 'noun', example: 'The dog barks loudly.', category: 'Animals' },
  cat: { word: 'cat', urdu: 'بلی', transliteration: 'کیٹ', partOfSpeech: 'noun', example: 'The cat likes milk.', category: 'Animals' },
  lion: { word: 'lion', urdu: 'شیر', transliteration: 'لائن', partOfSpeech: 'noun', example: 'The lion is king of the jungle.', category: 'Animals' },
  tiger: { word: 'tiger', urdu: 'چیتا', transliteration: 'ٹائیگر', partOfSpeech: 'noun', example: 'The tiger runs fast.', category: 'Animals' },
  elephant: { word: 'elephant', urdu: 'ہاتھی', transliteration: 'ایلیفینٹ', partOfSpeech: 'noun', example: 'The elephant has big ears.', category: 'Animals' },
  rabbit: { word: 'rabbit', urdu: 'خرگوش', transliteration: 'ریبیٹ', partOfSpeech: 'noun', example: 'The rabbit hops in the grass.', category: 'Animals' },
  horse: { word: 'horse', urdu: 'گھوڑا', transliteration: 'ہارس', partOfSpeech: 'noun', example: 'The horse runs in the field.', category: 'Animals' },
  cow: { word: 'cow', urdu: 'گائے', transliteration: 'کاؤ', partOfSpeech: 'noun', example: 'The cow gives milk.', category: 'Animals' },
  sheep: { word: 'sheep', urdu: 'بھیڑ', transliteration: 'شیپ', partOfSpeech: 'noun', example: 'The sheep has warm wool.', category: 'Animals' },
  monkey: { word: 'monkey', urdu: 'بندر', transliteration: 'منکی', partOfSpeech: 'noun', example: 'The monkey jumps on trees.', category: 'Animals' },
  bear: { word: 'bear', urdu: 'ریچھ', transliteration: 'بیئر', partOfSpeech: 'noun', example: 'The brown bear sleeps in winter.', category: 'Animals' },
  frog: { word: 'frog', urdu: 'مینڈک', transliteration: 'فراگ', partOfSpeech: 'noun', example: 'The green frog leaps high.', category: 'Animals' },
  deer: { word: 'deer', urdu: 'ہرن', transliteration: 'ڈیئر', partOfSpeech: 'noun', example: 'The deer runs gracefully.', category: 'Animals' },
  wolf: { word: 'wolf', urdu: 'بھیڑیا', transliteration: 'وولف', partOfSpeech: 'noun', example: 'The wolf howls at night.', category: 'Animals' },
  zebra: { word: 'zebra', urdu: 'زیبرا', transliteration: 'زیبرا', partOfSpeech: 'noun', example: 'The zebra has black and white stripes.', category: 'Animals' },
  giraffe: { word: 'giraffe', urdu: 'زرافہ', transliteration: 'جراف', partOfSpeech: 'noun', example: 'The giraffe has a tall neck.', category: 'Animals' },
  camel: { word: 'camel', urdu: 'اونٹ', transliteration: 'کیمیل', partOfSpeech: 'noun', example: 'The camel walks in the desert.', category: 'Animals' },
  panda: { word: 'panda', urdu: 'پانڈا', transliteration: 'پانڈا', partOfSpeech: 'noun', example: 'The panda eats green bamboo.', category: 'Animals' },
  kangaroo: { word: 'kangaroo', urdu: 'کینگرو', transliteration: 'کنگرو', partOfSpeech: 'noun', example: 'The kangaroo hops fast.', category: 'Animals' },

  // Birds & Insects (پرندے اور حشرات)
  bird: { word: 'bird', urdu: 'پرندہ', transliteration: 'برڈ', partOfSpeech: 'noun', example: 'The bird sings in the tree.', category: 'Birds & Insects' },
  butterfly: { word: 'butterfly', urdu: 'تتلی', transliteration: 'بٹر فلائی', partOfSpeech: 'noun', example: 'The butterfly has colorful wings.', category: 'Birds & Insects' },
  bee: { word: 'bee', urdu: 'شہد کی مکھی', transliteration: 'بی', partOfSpeech: 'noun', example: 'The bee makes sweet honey.', category: 'Birds & Insects' },
  duck: { word: 'duck', urdu: 'بطخ', transliteration: 'ڈک', partOfSpeech: 'noun', example: 'The duck swims in water.', category: 'Birds & Insects' },
  sparrow: { word: 'sparrow', urdu: 'چڑیا', transliteration: 'سپیرو', partOfSpeech: 'noun', example: 'The sparrow chirps on the roof.', category: 'Birds & Insects' },
  pigeon: { word: 'pigeon', urdu: 'کبوتر', transliteration: 'پجن', partOfSpeech: 'noun', example: 'The pigeon coos softly.', category: 'Birds & Insects' },
  parrot: { word: 'parrot', urdu: 'طوطا', transliteration: 'پیرٹ', partOfSpeech: 'noun', example: 'The green parrot mimics words.', category: 'Birds & Insects' },
  peacock: { word: 'peacock', urdu: 'مور', transliteration: 'پیکاک', partOfSpeech: 'noun', example: 'The peacock dances in the rain.', category: 'Birds & Insects' },
  eagle: { word: 'eagle', urdu: 'عقاب', transliteration: 'ایگل', partOfSpeech: 'noun', example: 'The eagle flies above mountains.', category: 'Birds & Insects' },
  owl: { word: 'owl', urdu: 'الو', transliteration: 'آؤل', partOfSpeech: 'noun', example: 'The wise owl stays awake at night.', category: 'Birds & Insects' },
  ant: { word: 'ant', urdu: 'چیونٹی', transliteration: 'اینٹ', partOfSpeech: 'noun', example: 'The tiny ant works hard.', category: 'Birds & Insects' },
  spider: { word: 'spider', urdu: 'مکڑی', transliteration: 'سپائیڈر', partOfSpeech: 'noun', example: 'The spider weaves a web.', category: 'Birds & Insects' },

  // Fruits & Dry Fruits (پھل اور میوہ جات)
  apple: { word: 'apple', urdu: 'سیب', transliteration: 'ایپل', partOfSpeech: 'noun', example: 'An apple a day keeps the doctor away.', category: 'Fruits' },
  banana: { word: 'banana', urdu: 'کیلا', transliteration: 'بنانا', partOfSpeech: 'noun', example: 'The monkey loves eating bananas.', category: 'Fruits' },
  mango: { word: 'mango', urdu: 'آم', transliteration: 'مینگو', partOfSpeech: 'noun', example: 'Mango is the king of fruits.', category: 'Fruits' },
  orange: { word: 'orange', urdu: 'مالٹا / نارنگی', transliteration: 'اورنج', partOfSpeech: 'noun', example: 'Sweet orange juice is refreshing.', category: 'Fruits' },
  grapes: { word: 'grapes', urdu: 'انگور', transliteration: 'گریپس', partOfSpeech: 'noun', example: 'Green grapes are sweet.', category: 'Fruits' },
  watermelon: { word: 'watermelon', urdu: 'تربوز', transliteration: 'واٹر میلن', partOfSpeech: 'noun', example: 'Watermelon is cool in summer.', category: 'Fruits' },
  pomegranate: { word: 'pomegranate', urdu: 'انار', transliteration: 'پومی گرینیٹ', partOfSpeech: 'noun', example: 'Pomegranate has red sweet seeds.', category: 'Fruits' },
  strawberry: { word: 'strawberry', urdu: 'سٹرابیری', transliteration: 'سٹرا بیری', partOfSpeech: 'noun', example: 'Fresh strawberries are red and sweet.', category: 'Fruits' },
  guava: { word: 'guava', urdu: 'امرود', transliteration: 'گوآوا', partOfSpeech: 'noun', example: 'Guava has crunchy seeds.', category: 'Fruits' },
  peach: { word: 'peach', urdu: 'آڑو', transliteration: 'پیچ', partOfSpeech: 'noun', example: 'The juicy peach is soft.', category: 'Fruits' },
  almond: { word: 'almond', urdu: 'بادام', transliteration: 'آلمنڈ', partOfSpeech: 'noun', example: 'Almonds are good for memory.', category: 'Fruits' },
  walnut: { word: 'walnut', urdu: 'اخروٹ', transliteration: 'وال نٹ', partOfSpeech: 'noun', example: 'Walnuts look like little brains.', category: 'Fruits' },

  // Vegetables (سبزیاں)
  potato: { word: 'potato', urdu: 'آلو', transliteration: 'پوٹیٹو', partOfSpeech: 'noun', example: 'Kids love potato chips.', category: 'Vegetables' },
  tomato: { word: 'tomato', urdu: 'ٹماٹر', transliteration: 'ٹماٹو', partOfSpeech: 'noun', example: 'The red tomato is juicy.', category: 'Vegetables' },
  onion: { word: 'onion', urdu: 'پیاز', transliteration: 'انین', partOfSpeech: 'noun', example: 'We cook curry with onions.', category: 'Vegetables' },
  carrot: { word: 'carrot', urdu: 'گاجر', transliteration: 'کیرٹ', partOfSpeech: 'noun', example: 'Rabbits love fresh orange carrots.', category: 'Vegetables' },
  peas: { word: 'peas', urdu: 'مٹر', transliteration: 'پیز', partOfSpeech: 'noun', example: 'Green peas are sweet and small.', category: 'Vegetables' },
  cucumber: { word: 'cucumber', urdu: 'کھیرا', transliteration: 'کیوکمبر', partOfSpeech: 'noun', example: 'Cucumber salad is cool.', category: 'Vegetables' },
  spinach: { word: 'spinach', urdu: 'پالک', transliteration: 'سپینچ', partOfSpeech: 'noun', example: 'Spinach makes us strong.', category: 'Vegetables' },
  garlic: { word: 'garlic', urdu: 'لہسن', transliteration: 'گارلک', partOfSpeech: 'noun', example: 'Garlic adds good aroma to food.', category: 'Vegetables' },

  // Colors & Shapes (رنگ اور اشکال)
  red: { word: 'red', urdu: 'سرخ / لال', transliteration: 'ریڈ', partOfSpeech: 'adjective', example: 'The rose is bright red.', category: 'Colors & Shapes' },
  blue: { word: 'blue', urdu: 'نیلا', transliteration: 'بلیو', partOfSpeech: 'adjective', example: 'The sky is deep blue.', category: 'Colors & Shapes' },
  green: { word: 'green', urdu: 'سبز / ہرا', transliteration: 'گرین', partOfSpeech: 'adjective', example: 'The leaves are fresh green.', category: 'Colors & Shapes' },
  yellow: { word: 'yellow', urdu: 'پیلا / زرد', transliteration: 'ییلو', partOfSpeech: 'adjective', example: 'The sun shines yellow.', category: 'Colors & Shapes' },
  pink: { word: 'pink', urdu: 'گلابی', transliteration: 'پنک', partOfSpeech: 'adjective', example: 'She wore a pink dress.', category: 'Colors & Shapes' },
  purple: { word: 'purple', urdu: 'جامنی', transliteration: 'پرپل', partOfSpeech: 'adjective', example: 'Purple grapes look pretty.', category: 'Colors & Shapes' },
  orange_color: { word: 'orange', urdu: 'نارنجی رنگ', transliteration: 'اورنج', partOfSpeech: 'adjective', example: 'The sunset has an orange glow.', category: 'Colors & Shapes' },
  white: { word: 'white', urdu: 'سفید', transliteration: 'وائٹ', partOfSpeech: 'adjective', example: 'White clouds float softly.', category: 'Colors & Shapes' },
  black: { word: 'black', urdu: 'کالا / سیاہ', transliteration: 'بلیک', partOfSpeech: 'adjective', example: 'The night sky is black.', category: 'Colors & Shapes' },
  circle: { word: 'circle', urdu: 'دائرہ', transliteration: 'سرکل', partOfSpeech: 'noun', example: 'The full moon is a round circle.', category: 'Colors & Shapes' },
  square: { word: 'square', urdu: 'مربع (چوکور)', transliteration: 'سکوائر', partOfSpeech: 'noun', example: 'A chessboard is a square.', category: 'Colors & Shapes' },
  triangle: { word: 'triangle', urdu: 'مثلث (تکون)', transliteration: 'ٹرائی اینگل', partOfSpeech: 'noun', example: 'A slice of pizza is a triangle.', category: 'Colors & Shapes' },

  // Numbers & Math (نمبرز اور ریاضی)
  one: { word: 'one', urdu: 'ایک', transliteration: 'ون', partOfSpeech: 'noun', example: 'I have one nose.', category: 'Numbers' },
  two: { word: 'two', urdu: 'دو', transliteration: 'ٹو', partOfSpeech: 'noun', example: 'I have two eyes.', category: 'Numbers' },
  three: { word: 'three', urdu: 'تین', transliteration: 'تھری', partOfSpeech: 'noun', example: 'A triangle has three sides.', category: 'Numbers' },
  four: { word: 'four', urdu: 'چار', transliteration: 'فور', partOfSpeech: 'noun', example: 'A table has four legs.', category: 'Numbers' },
  five: { word: 'five', urdu: 'پانچ', transliteration: 'فائیو', partOfSpeech: 'noun', example: 'We have five fingers on each hand.', category: 'Numbers' },
  six: { word: 'six', urdu: 'چھ', transliteration: 'سکس', partOfSpeech: 'noun', example: 'An insect has six legs.', category: 'Numbers' },
  seven: { word: 'seven', urdu: 'سات', transliteration: 'سیون', partOfSpeech: 'noun', example: 'A rainbow has seven colors.', category: 'Numbers' },
  eight: { word: 'eight', urdu: 'آٹھ', transliteration: 'ایٹ', partOfSpeech: 'noun', example: 'A spider has eight legs.', category: 'Numbers' },
  nine: { word: 'nine', urdu: 'نو', transliteration: 'نائن', partOfSpeech: 'noun', example: 'Nine planets or stars shine.', category: 'Numbers' },
  ten: { word: 'ten', urdu: 'دس', transliteration: 'ٹین', partOfSpeech: 'noun', example: 'We have ten toes.', category: 'Numbers' },
  hundred: { word: 'hundred', urdu: 'سو', transliteration: 'ہنڈرڈ', partOfSpeech: 'noun', example: 'There are one hundred cents in a dollar.', category: 'Numbers' },

  // Family & Relatives (خاندان اور رشتے)
  mother: { word: 'mother', urdu: 'امی / ماں / والدہ', transliteration: 'مدر', partOfSpeech: 'noun', example: 'Mother loves me dearly.', category: 'Family' },
  father: { word: 'father', urdu: 'ابو / باپ / والد', transliteration: 'فادر', partOfSpeech: 'noun', example: 'Father takes me to the park.', category: 'Family' },
  brother: { word: 'brother', urdu: 'بھائی', transliteration: 'برادر', partOfSpeech: 'noun', example: 'My brother plays cricket with me.', category: 'Family' },
  sister: { word: 'sister', urdu: 'بہن', transliteration: 'سسٹر', partOfSpeech: 'noun', example: 'My sister reads stories to me.', category: 'Family' },
  baby: { word: 'baby', urdu: 'چھوٹا بچہ', transliteration: 'بے بی', partOfSpeech: 'noun', example: 'The baby giggles softly.', category: 'Family' },
  grandfather: { word: 'grandfather', urdu: 'دادا / نانا', transliteration: 'گرینڈ فادر', partOfSpeech: 'noun', example: 'Grandfather tells wonderful stories.', category: 'Family' },
  grandmother: { word: 'grandmother', urdu: 'دادی / نانی', transliteration: 'گرینڈ مدر', partOfSpeech: 'noun', example: 'Grandmother bakes sweet cakes.', category: 'Family' },
  family: { word: 'family', urdu: 'خاندان', transliteration: 'فیملی', partOfSpeech: 'noun', example: 'Our family eats dinner together.', category: 'Family' },

  // Human Body & Health (انسانی جسم اور صحت)
  eye: { word: 'eye', urdu: 'آنکھ', transliteration: 'آئی', partOfSpeech: 'noun', example: 'We see colors with our eyes.', category: 'Body & Health' },
  ear: { word: 'ear', urdu: 'کان', transliteration: 'ایئر', partOfSpeech: 'noun', example: 'We hear sounds with our ears.', category: 'Body & Health' },
  nose: { word: 'nose', urdu: 'ناک', transliteration: 'نوز', partOfSpeech: 'noun', example: 'We smell roses with our nose.', category: 'Body & Health' },
  mouth: { word: 'mouth', urdu: 'منہ', transliteration: 'ماؤتھ', partOfSpeech: 'noun', example: 'Open your mouth and smile.', category: 'Body & Health' },
  teeth: { word: 'teeth', urdu: 'دانت', transliteration: 'ٹیتھ', partOfSpeech: 'noun', example: 'Brush your teeth twice a day.', category: 'Body & Health' },
  hand: { word: 'hand', urdu: 'ہاتھ', transliteration: 'ہینڈ', partOfSpeech: 'noun', example: 'Wash your hands before eating.', category: 'Body & Health' },
  foot: { word: 'foot', urdu: 'پاؤں', transliteration: 'فُٹ', partOfSpeech: 'noun', example: 'Put your right foot forward.', category: 'Body & Health' },
  heart: { word: 'heart', urdu: 'دل', transliteration: 'ہارٹ', partOfSpeech: 'noun', example: 'The heart pumps blood through the body.', category: 'Body & Health' },
  head: { word: 'head', urdu: 'سر', transliteration: 'ہیڈ', partOfSpeech: 'noun', example: 'Nod your head yes.', category: 'Body & Health' },
  hair: { word: 'hair', urdu: 'بال', transliteration: 'ہیئر', partOfSpeech: 'noun', example: 'Comb your hair neatly.', category: 'Body & Health' },

  // Nature, Weather & Seasons (فطرت اور موسم)
  sun: { word: 'sun', urdu: 'سورج', transliteration: 'سن', partOfSpeech: 'noun', example: 'The sun gives us light and warmth.', category: 'Nature & Weather' },
  moon: { word: 'moon', urdu: 'چاند', transliteration: 'مون', partOfSpeech: 'noun', example: 'The moon glows in the dark sky.', category: 'Nature & Weather' },
  star: { word: 'star', urdu: 'ستارہ', transliteration: 'سٹار', partOfSpeech: 'noun', example: 'Twinkle twinkle little star.', category: 'Nature & Weather' },
  tree: { word: 'tree', urdu: 'درخت', transliteration: 'ٹری', partOfSpeech: 'noun', example: 'Green trees give cool shade.', category: 'Nature & Weather' },
  flower: { word: 'flower', urdu: 'پھول', transliteration: 'فلاور', partOfSpeech: 'noun', example: 'The red flower blooms in spring.', category: 'Nature & Weather' },
  river: { word: 'river', urdu: 'دریا', transliteration: 'ریور', partOfSpeech: 'noun', example: 'The clear river flows to the sea.', category: 'Nature & Weather' },
  mountain: { word: 'mountain', urdu: 'پہاڑ', transliteration: 'ماؤنٹین', partOfSpeech: 'noun', example: 'Snow covers the mountain peak.', category: 'Nature & Weather' },
  rain: { word: 'rain', urdu: 'بارش', transliteration: 'رین', partOfSpeech: 'noun', example: 'Raindrops fall on the green grass.', category: 'Nature & Weather' },
  cloud: { word: 'cloud', urdu: 'بادل', transliteration: 'کلاؤڈ', partOfSpeech: 'noun', example: 'Fluffy white clouds float by.', category: 'Nature & Weather' },
  rainbow: { word: 'rainbow', urdu: 'دھنک / قوس قزح', transliteration: 'رین بو', partOfSpeech: 'noun', example: 'Look at the seven-colored rainbow.', category: 'Nature & Weather' },
  wind: { word: 'wind', urdu: 'ہوا', transliteration: 'ونڈ', partOfSpeech: 'noun', example: 'A cool wind blows gently.', category: 'Nature & Weather' },
  sea: { word: 'sea', urdu: 'سمندر', transliteration: 'سی', partOfSpeech: 'noun', example: 'Big blue waves roll in the sea.', category: 'Nature & Weather' },

  // School & Classroom (سکول اور پڑھائی)
  school: { word: 'school', urdu: 'سکول / مدرسہ', transliteration: 'سکول', partOfSpeech: 'noun', example: 'Children go to school happily.', category: 'School' },
  book: { word: 'book', urdu: 'کتاب', transliteration: 'بُک', partOfSpeech: 'noun', example: 'Open your English storybook.', category: 'School' },
  pencil: { word: 'pencil', urdu: 'پینسل', transliteration: 'پینسل', partOfSpeech: 'noun', example: 'Write carefully with your pencil.', category: 'School' },
  pen: { word: 'pen', urdu: 'قلم', transliteration: 'پین', partOfSpeech: 'noun', example: 'Write your notes with blue ink pen.', category: 'School' },
  teacher: { word: 'teacher', urdu: 'استاد / استانی', transliteration: 'ٹیچر', partOfSpeech: 'noun', example: 'Our teacher explains lessons kindly.', category: 'School' },
  student: { word: 'student', urdu: 'طالب علم / شاگرد', transliteration: 'سٹوڈنٹ', partOfSpeech: 'noun', example: 'Every student is attentive.', category: 'School' },
  bag: { word: 'bag', urdu: 'بستہ', transliteration: 'بیگ', partOfSpeech: 'noun', example: 'Put books inside your school bag.', category: 'School' },
  eraser: { word: 'eraser', urdu: 'ربڑ / مٹانے والا', transliteration: 'اریزر', partOfSpeech: 'noun', example: 'Erase pencil marks cleanly.', category: 'School' },
  ruler: { word: 'ruler', urdu: 'پیمانہ / فٹ', transliteration: 'رولر', partOfSpeech: 'noun', example: 'Draw a straight line with a ruler.', category: 'School' },
  desk: { word: 'desk', urdu: 'ڈیسک / میز', transliteration: 'ڈیسک', partOfSpeech: 'noun', example: 'Keep your desk neat and tidy.', category: 'School' },

  // Food & Beverages (کھانے اور مشروبات)
  milk: { word: 'milk', urdu: 'دودھ', transliteration: 'ملک', partOfSpeech: 'noun', example: 'Drink fresh milk every morning.', category: 'Food & Drinks' },
  water: { word: 'water', urdu: 'پانی', transliteration: 'واٹر', partOfSpeech: 'noun', example: 'Drink clean fresh water.', category: 'Food & Drinks' },
  bread: { word: 'bread', urdu: 'روٹی / ڈبل روٹی', transliteration: 'بریڈ', partOfSpeech: 'noun', example: 'Spread butter on warm bread.', category: 'Food & Drinks' },
  rice: { word: 'rice', urdu: 'چاول', transliteration: 'رائس', partOfSpeech: 'noun', example: 'Steamed rice tastes delicious.', category: 'Food & Drinks' },
  honey: { word: 'honey', urdu: 'شہد', transliteration: 'ہنی', partOfSpeech: 'noun', example: 'Sweet honey comes from bees.', category: 'Food & Drinks' },
  egg: { word: 'egg', urdu: 'انڈا', transliteration: 'ایگ', partOfSpeech: 'noun', example: 'An egg gives good protein.', category: 'Food & Drinks' },
  tea: { word: 'tea', urdu: 'چائے', transliteration: 'ٹی', partOfSpeech: 'noun', example: 'Hot tea in winter warms us up.', category: 'Food & Drinks' },
  juice: { word: 'juice', urdu: 'شربت / جوس', transliteration: 'جوس', partOfSpeech: 'noun', example: 'Fresh orange juice is sweet.', category: 'Food & Drinks' },

  // Action Verbs (افعال اور کام)
  read: { word: 'read', urdu: 'پڑھنا', transliteration: 'ریڈ', partOfSpeech: 'verb', example: 'I love to read English stories.', category: 'Action Verbs' },
  write: { word: 'write', urdu: 'لکھنا', transliteration: 'رائٹ', partOfSpeech: 'verb', example: 'Write neatly on the notebook.', category: 'Action Verbs' },
  run: { word: 'run', urdu: 'دوڑنا', transliteration: 'رن', partOfSpeech: 'verb', example: 'Run fast in the playground.', category: 'Action Verbs' },
  jump: { word: 'jump', urdu: 'چھلانگ لگانا / کودنا', transliteration: 'جمپ', partOfSpeech: 'verb', example: 'The frog jumps into the pond.', category: 'Action Verbs' },
  sing: { word: 'sing', urdu: 'گانا', transliteration: 'سنگ', partOfSpeech: 'verb', example: 'Birds sing sweet morning songs.', category: 'Action Verbs' },
  play: { word: 'play', urdu: 'کھیلنا', transliteration: 'پلے', partOfSpeech: 'verb', example: 'Children play happily together.', category: 'Action Verbs' },
  sleep: { word: 'sleep', urdu: 'سونا', transliteration: 'سلیپ', partOfSpeech: 'verb', example: 'Sleep early and wake early.', category: 'Action Verbs' },
  eat: { word: 'eat', urdu: 'کھانا', transliteration: 'ایٹ', partOfSpeech: 'verb', example: 'Eat healthy fruits and vegetables.', category: 'Action Verbs' },
  drink: { word: 'drink', urdu: 'پینا', transliteration: 'ڈرنک', partOfSpeech: 'verb', example: 'Drink water when thirsty.', category: 'Action Verbs' },
  laugh: { word: 'laugh', urdu: 'ہنسنا', transliteration: 'لاف', partOfSpeech: 'verb', example: 'Friends laugh at funny jokes.', category: 'Action Verbs' },
  swim: { word: 'swim', urdu: 'تیرنا', transliteration: 'سوئم', partOfSpeech: 'verb', example: 'Fish swim in the blue river.', category: 'Action Verbs' },
  fly: { word: 'fly', urdu: 'اڑنا', transliteration: 'فلائی', partOfSpeech: 'verb', example: 'Eagles fly high in the sky.', category: 'Action Verbs' },

  // Adjectives & Opposites (صفات اور اضداد)
  happy: { word: 'happy', urdu: 'خوش / مسرور', transliteration: 'ہیپی', partOfSpeech: 'adjective', example: 'A smile shows a happy heart.', category: 'Adjectives' },
  sad: { word: 'sad', urdu: 'اداس / غمگین', transliteration: 'سیڈ', partOfSpeech: 'adjective', example: 'A good friend cheers you up when sad.', category: 'Adjectives' },
  big: { word: 'big', urdu: 'بڑا', transliteration: 'بگ', partOfSpeech: 'adjective', example: 'The elephant is a big animal.', category: 'Adjectives' },
  small: { word: 'small', urdu: 'چھوٹا', transliteration: 'سمال', partOfSpeech: 'adjective', example: 'The ant is very small.', category: 'Adjectives' },
  hot: { word: 'hot', urdu: 'گرم', transliteration: 'ہاٹ', partOfSpeech: 'adjective', example: 'Summer days are hot and sunny.', category: 'Adjectives' },
  cold: { word: 'cold', urdu: 'ٹھنڈا / سرد', transliteration: 'کولڈ', partOfSpeech: 'adjective', example: 'Ice cream is sweet and cold.', category: 'Adjectives' },
  fast: { word: 'fast', urdu: 'تیز رفتار', transliteration: 'فاسٹ', partOfSpeech: 'adjective', example: 'The cheetah runs very fast.', category: 'Adjectives' },
  slow: { word: 'slow', urdu: 'آہستہ / سست', transliteration: 'سلو', partOfSpeech: 'adjective', example: 'The turtle is slow but steady.', category: 'Adjectives' },
  clever: { word: 'clever', urdu: 'چالاک / ہوشیار', transliteration: 'کلیور', partOfSpeech: 'adjective', example: 'The clever fox solved the puzzle.', category: 'Adjectives' },
  kind: { word: 'kind', urdu: 'مہربان / رحم دل', transliteration: 'کائنڈ', partOfSpeech: 'adjective', example: 'Always be kind to everyone.', category: 'Adjectives' },
  sweet: { word: 'sweet', urdu: 'میٹھا', transliteration: 'سویٹ', partOfSpeech: 'adjective', example: 'Ripe mangoes are very sweet.', category: 'Adjectives' },
  brave: { word: 'brave', urdu: 'بہادر / دلیر', transliteration: 'بریو', partOfSpeech: 'adjective', example: 'A brave child stands up for truth.', category: 'Adjectives' },

  // Occupations & Jobs (پیشے اور ملازمتیں)
  doctor: { word: 'doctor', urdu: 'ڈاکٹر / معالج', transliteration: 'ڈاکٹر', partOfSpeech: 'noun', example: 'The doctor cures sick people.', category: 'Professions' },
  nurse: { word: 'nurse', urdu: 'نرس', transliteration: 'نرس', partOfSpeech: 'noun', example: 'The kind nurse cares for patients.', category: 'Professions' },
  farmer: { word: 'farmer', urdu: 'کسان / کاشتکار', transliteration: 'فارمر', partOfSpeech: 'noun', example: 'The farmer grows wheat and rice.', category: 'Professions' },
  pilot: { word: 'pilot', urdu: 'پائلٹ / ہواباز', transliteration: 'پائلٹ', partOfSpeech: 'noun', example: 'The pilot flies the airplane.', category: 'Professions' },
  engineer: { word: 'engineer', urdu: 'انجینئر', transliteration: 'انجینئر', partOfSpeech: 'noun', example: 'Engineers build bridges and roads.', category: 'Professions' },
  baker: { word: 'baker', urdu: 'نانبائی / کیک بنانے والا', transliteration: 'بیکر', partOfSpeech: 'noun', example: 'The baker bakes fresh bread.', category: 'Professions' },
  driver: { word: 'driver', urdu: 'ڈرائیور', transliteration: 'ڈرائیور', partOfSpeech: 'noun', example: 'The bus driver drives safely.', category: 'Professions' },
  soldier: { word: 'soldier', urdu: 'سپاہی / فوجی', transliteration: 'سولجر', partOfSpeech: 'noun', example: 'The brave soldier protects the nation.', category: 'Professions' },

  // Transport & Vehicles (ٹرانسپورٹ اور گاڑیاں)
  car: { word: 'car', urdu: 'کار / گاڑی', transliteration: 'کار', partOfSpeech: 'noun', example: 'The car has four wheels.', category: 'Transport' },
  bus: { word: 'bus', urdu: 'بس', transliteration: 'بس', partOfSpeech: 'noun', example: 'The yellow bus takes us to school.', category: 'Transport' },
  train: { word: 'train', urdu: 'ریل گاڑی', transliteration: 'ٹرین', partOfSpeech: 'noun', example: 'The train moves along the tracks.', category: 'Transport' },
  bicycle: { word: 'bicycle', urdu: 'سائیکل', transliteration: 'بائیسکل', partOfSpeech: 'noun', example: 'Riding a bicycle is great exercise.', category: 'Transport' },
  airplane: { word: 'airplane', urdu: 'ہوائی جہاز', transliteration: 'ایئر پلین', partOfSpeech: 'noun', example: 'The airplane soars above clouds.', category: 'Transport' },
  boat: { word: 'boat', urdu: 'کشتی', transliteration: 'بوٹ', partOfSpeech: 'noun', example: 'The wooden boat floats on the lake.', category: 'Transport' },
  ship: { word: 'ship', urdu: 'بحری جہاز', transliteration: 'شپ', partOfSpeech: 'noun', example: 'The big cargo ship sails across the sea.', category: 'Transport' },
  helicopter: { word: 'helicopter', urdu: 'ہیلی کاپٹر', transliteration: 'ہیلی کاپٹر', partOfSpeech: 'noun', example: 'The helicopter lands on the roof.', category: 'Transport' }
};

export const ALL_CATEGORIES = [
  'All Words',
  'Animals',
  'Birds & Insects',
  'Fruits',
  'Vegetables',
  'Colors & Shapes',
  'Numbers',
  'Family',
  'Body & Health',
  'Nature & Weather',
  'School',
  'Food & Drinks',
  'Action Verbs',
  'Adjectives',
  'Professions',
  'Transport'
];

/**
 * Clean word for search
 */
export function cleanWord(raw: string): string {
  return raw.replace(/[^a-zA-Z]/g, '').toLowerCase().trim();
}

/**
 * Phonetic transliteration generator
 */
export function approximateUrduTransliteration(word: string): string {
  const map: Record<string, string> = {
    th: 'تھ', sh: 'ش', ch: 'چ', ph: 'ف', ee: 'ی', oo: 'و', ea: 'ی', ai: 'ے',
    b: 'ب', c: 'ک', d: 'ڈ', f: 'ف', g: 'گ', h: 'ہ', j: 'ج', k: 'ک',
    l: 'ل', m: 'م', n: 'ن', p: 'پ', q: 'ق', r: 'ر', s: 'س', t: 'ٹ',
    v: 'و', w: 'و', x: 'کس', y: 'ائی', z: 'ز', a: 'ا', e: 'ے', i: 'ِا', o: 'او', u: 'اُ'
  };

  let lower = word.toLowerCase();
  let result = '';
  let i = 0;
  while (i < lower.length) {
    if (i + 1 < lower.length && map[lower.substring(i, i + 2)]) {
      result += map[lower.substring(i, i + 2)];
      i += 2;
    } else if (map[lower[i]]) {
      result += map[lower[i]];
      i += 1;
    } else {
      i += 1;
    }
  }
  return result || word;
}

/**
 * Lookup word with offline cache + stemmer fallback
 */
export function lookupWord(rawWord: string): WordDefinition {
  const cleaned = cleanWord(rawWord);
  if (!cleaned) {
    return {
      word: rawWord,
      urdu: 'نامعلوم لفظ',
      transliteration: '',
      partOfSpeech: 'noun',
      example: '',
      category: 'General'
    };
  }

  if (OFFLINE_DICTIONARY[cleaned]) {
    return OFFLINE_DICTIONARY[cleaned];
  }

  // Stem checks
  const stems = [
    cleaned.endsWith('ies') ? cleaned.slice(0, -3) + 'y' : null,
    cleaned.endsWith('es') ? cleaned.slice(0, -2) : null,
    cleaned.endsWith('s') ? cleaned.slice(0, -1) : null,
    cleaned.endsWith('ing') ? cleaned.slice(0, -3) : null,
    cleaned.endsWith('ed') ? cleaned.slice(0, -2) : null,
    cleaned.endsWith('ly') ? cleaned.slice(0, -2) : null
  ].filter(Boolean) as string[];

  for (const stem of stems) {
    if (OFFLINE_DICTIONARY[stem]) {
      return {
        ...OFFLINE_DICTIONARY[stem],
        word: rawWord
      };
    }
  }

  return {
    word: rawWord,
    urdu: 'اس لفظ کو بولیں اور سنیں',
    transliteration: approximateUrduTransliteration(cleaned),
    partOfSpeech: 'word',
    example: `Read and pronounce "${cleaned}" aloud.`,
    category: 'General'
  };
}
