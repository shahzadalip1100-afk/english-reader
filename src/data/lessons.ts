/**
 * Preloaded offline interactive lessons & storybooks for children.
 * Each lesson has page-by-page illustrations, English sentences, and Urdu translations.
 */

export interface SentenceItem {
  id: string;
  english: string;
  urdu: string;
}

export interface StoryPage {
  pageNumber: number;
  image: string;
  title?: string;
  urduTitle?: string;
  sentences: SentenceItem[];
}

export interface StoryLesson {
  id: string;
  title: string;
  urduTitle: string;
  level: 'Level 1: Phonics' | 'Level 2: Easy Reader' | 'Level 3: Short Stories' | 'Custom Created';
  levelUrdu: string;
  coverImage: string;
  description: string;
  descriptionUrdu: string;
  isCustom?: boolean;
  pages: StoryPage[];
}

export const PRELOADED_STORIES: StoryLesson[] = [
  {
    id: 'fox-forest',
    title: 'The Clever Little Fox',
    urduTitle: 'چالاک اور پیاری لومڑی',
    level: 'Level 2: Easy Reader',
    levelUrdu: 'سطح ۲: آسان ریڈر',
    coverImage: '/src/assets/images/story_fox_forest_1791978751306.jpg',
    description: 'A friendly little fox explores the sunny forest with fluttering butterflies.',
    descriptionUrdu: 'ایک مہربان چھوٹی لومڑی جو سرسبز جنگل میں تتلیوں کے ساتھ وقت گزارتی ہے۔',
    pages: [
      {
        pageNumber: 1,
        image: '/src/assets/images/story_fox_forest_1791978751306.jpg',
        title: 'Meeting in the Forest',
        urduTitle: 'جنگل میں ملاقات',
        sentences: [
          {
            id: 's1-1',
            english: 'Once upon a time, a clever little fox lived in a green forest.',
            urdu: 'ایک دفعہ کا ذکر ہے کہ ایک ہوشیار چھوٹی لومڑی سرسبز جنگل میں رہتی تھی۔'
          },
          {
            id: 's1-2',
            english: 'The little fox had bright orange fur and a fluffy white tail.',
            urdu: 'چھوٹی لومڑی کے چمکیلے نارنجی بال اور ایک نرم و ملائم سفید دم تھی۔'
          },
          {
            id: 's1-3',
            english: 'Every morning, the warm sun shines through the tall trees.',
            urdu: 'ہر صبح، گرم سورج اونچے درختوں کے درمیان چمکتا ہے۔'
          },
          {
            id: 's1-4',
            english: 'Colorful butterflies dance in the soft cool breeze.',
            urdu: 'رنگ برنگی تتلیاں ہلکی ٹھنڈی ہوا میں رقص کرتی ہیں۔'
          },
          {
            id: 's1-5',
            english: 'The fox smiles and says, "Good morning beautiful world!"',
            urdu: 'لومڑی مسکراتی ہے اور کہتی ہے، "صبح بخیر اے خوبصورت دنیا!"'
          }
        ]
      },
      {
        pageNumber: 2,
        image: '/src/assets/images/story_fox_forest_1791978751306.jpg',
        title: 'Kindness to All Animals',
        urduTitle: 'تمام جانوروں سے حسن سلوک',
        sentences: [
          {
            id: 's1-6',
            english: 'The fox walks along the winding stone path.',
            urdu: 'لومڑی مڑتی ہوئی پتھریلی پگڈنڈی پر چلتی ہے۔'
          },
          {
            id: 's1-7',
            english: 'She helps a little bird find fresh seeds on the green grass.',
            urdu: 'وہ ایک چھوٹے پرندے کی سبز گھاس پر تازہ بیج تلاش کرنے میں مدد کرتی ہے۔'
          },
          {
            id: 's1-8',
            english: 'All the forest friends love the clever little fox.',
            urdu: 'جنگل کے تمام دوست اس چالاک اور مہربان لومڑی سے محبت کرتے ہیں۔'
          },
          {
            id: 's1-9',
            english: 'Kindness makes every friend happy and joyful.',
            urdu: 'مہربانی اور ہمدردی ہر دوست کو خوش اور مسرور بنا دیتی ہے۔'
          }
        ]
      }
    ]
  },
  {
    id: 'flower-garden',
    title: 'My Colorful Flower Garden',
    urduTitle: 'میرا خوبصورت اور رنگین باغ',
    level: 'Level 1: Phonics',
    levelUrdu: 'سطح ۱: بنیادی فونکس اور الفاظ',
    coverImage: '/src/assets/images/story_flower_garden_1791978751489.jpg',
    description: 'Learn names of colors, flowers, bees, and nature under a bright cheerful sun.',
    descriptionUrdu: 'کھلتے ہوئے پھولوں، شہد کی مکھیوں اور پیارے رنگوں کے نام سیکھیں۔',
    pages: [
      {
        pageNumber: 1,
        image: '/src/assets/images/story_flower_garden_1791978751489.jpg',
        title: 'Flowers Blooming Everywhere',
        urduTitle: 'ہر طرف مہکتے پھول',
        sentences: [
          {
            id: 's2-1',
            english: 'Look at our big green garden.',
            urdu: 'ہمارے بڑے سرسبز باغ کی طرف دیکھیے۔'
          },
          {
            id: 's2-2',
            english: 'Red roses bloom near the wooden arch.',
            urdu: 'لکڑی کی محراب کے قریب سرخ گلاب کھلے ہیں۔'
          },
          {
            id: 's2-3',
            english: 'The bright yellow sunflowers look at the morning sun.',
            urdu: 'روشن پیلے سورج مکھی صبح کے سورج کو تکتے ہیں۔'
          },
          {
            id: 's2-4',
            english: 'A busy little bee drinks sweet honey from the petals.',
            urdu: 'ایک مصروف چھوٹی شہد کی مکھی پتیوں سے میٹھا رس چوستی ہے۔'
          },
          {
            id: 's2-5',
            english: 'We give fresh water to every plant.',
            urdu: 'ہم ہر پودے کو تازہ اور ٹھنڈا پانی دیتے ہیں۔'
          }
        ]
      }
    ]
  },
  {
    id: 'school-friends',
    title: 'A Happy Day at School',
    urduTitle: 'سکول کا ایک خوشگوار دن',
    level: 'Level 2: Easy Reader',
    levelUrdu: 'سطح ۲: آسان ریڈر',
    coverImage: '/src/assets/images/story_school_friends_1791978752825.jpg',
    description: 'Two best friends walk to school, carry books, and enjoy learning together.',
    descriptionUrdu: 'دو پکے دوست سکول جاتے ہیں، کتابیں پڑھتے ہیں اور اکٹھے سیکھتے ہیں۔',
    pages: [
      {
        pageNumber: 1,
        image: '/src/assets/images/story_school_friends_1791978752825.jpg',
        title: 'Walking with Friends',
        urduTitle: 'دوستوں کے ساتھ روانگی',
        sentences: [
          {
            id: 's3-1',
            english: 'Today is a bright and happy morning.',
            urdu: 'آج ایک روشن اور پرمسرت صبح ہے۔'
          },
          {
            id: 's3-2',
            english: 'Ali and Sara walk to school hand in hand.',
            urdu: 'علی اور سارہ ہاتھ میں ہاتھ ڈالے سکول کی طرف جا رہے ہیں۔'
          },
          {
            id: 's3-3',
            english: 'They carry colorful school bags full of story books and pencils.',
            urdu: 'انہوں نے کہانیوں کی کتابوں اور پنسلوں سے بھرے رنگین بستے اٹھا رکھے ہیں۔'
          },
          {
            id: 's3-4',
            english: 'The kind teacher smiles and welcomes all students.',
            urdu: 'مہربان استاد مسکرا کر تمام بچوں کو خوش آمدید کہتے ہیں۔'
          },
          {
            id: 's3-5',
            english: 'Reading and writing together makes learning fun!',
            urdu: 'ایک ساتھ پڑھنا اور لکھنا سیکھنے کو بہت پرلطف بنا دیتا ہے!'
          }
        ]
      }
    ]
  },
  {
    id: 'golden-stars',
    title: 'The Golden Moon and Twinkling Stars',
    urduTitle: 'سنہرا چاند اور چمکتے ستارے',
    level: 'Level 3: Short Stories',
    levelUrdu: 'سطح ۳: چھوٹی کہانیاں',
    coverImage: '/src/assets/images/story_golden_stars_1791978754021.jpg',
    description: 'A gentle bedtime story about the night sky, sleepy village, and peaceful dreams.',
    descriptionUrdu: 'رات کے آسمان، پرسکون گاؤں اور پیارے خوابوں کے بارے میں ایک نرم کہانی۔',
    pages: [
      {
        pageNumber: 1,
        image: '/src/assets/images/story_golden_stars_1791978754021.jpg',
        title: 'Night Sky Wonders',
        urduTitle: 'رات کے آسمان کے نظارے',
        sentences: [
          {
            id: 's4-1',
            english: 'When the night comes, the deep blue sky fills with light.',
            urdu: 'جب رات آتی ہے تو گہرا نیلا آسمان روشنی سے بھر جاتا ہے۔'
          },
          {
            id: 's4-2',
            english: 'A golden crescent moon smiles down on the quiet town.',
            urdu: 'ایک سنہرا ہلال چاند پرامن بستی پر مسکرا رہا ہے۔'
          },
          {
            id: 's4-3',
            english: 'Tiny bright stars twinkle like diamonds in the sky.',
            urdu: 'چھوٹے چمکدار ستارے آسمان میں ہیروں کی طرح جگمگاتے ہیں۔'
          },
          {
            id: 's4-4',
            english: 'Children close their eyes and dream sweet dreams.',
            urdu: 'بچے اپنی آنکھیں بند کرتے ہیں اور پیارے میٹھے خواب دیکھتے ہیں۔'
          },
          {
            id: 's4-5',
            english: 'Good night everyone, sleep tight and wake up happy.',
            urdu: 'سب کو شب بخیر، چین کی نیند سوئیں اور خوشی کے ساتھ بیدار ہوں۔'
          }
        ]
      }
    ]
  }
];

const LOCAL_STORAGE_CUSTOM_STORIES_KEY = 'kids_reader_custom_stories_v1';

/**
 * Load user created custom stories from localStorage
 */
export function getStoredCustomStories(): StoryLesson[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_CUSTOM_STORIES_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (err) {
    console.warn('Failed to load custom stories from localStorage', err);
    return [];
  }
}

/**
 * Save a custom story to localStorage
 */
export function saveCustomStory(story: StoryLesson): boolean {
  try {
    const existing = getStoredCustomStories();
    const updated = [story, ...existing.filter(s => s.id !== story.id)];
    localStorage.setItem(LOCAL_STORAGE_CUSTOM_STORIES_KEY, JSON.stringify(updated));
    return true;
  } catch (err) {
    console.error('Failed to save custom story to localStorage', err);
    return false;
  }
}

/**
 * Delete a custom story from localStorage
 */
export function deleteCustomStory(storyId: string): boolean {
  try {
    const existing = getStoredCustomStories();
    const filtered = existing.filter(s => s.id !== storyId);
    localStorage.setItem(LOCAL_STORAGE_CUSTOM_STORIES_KEY, JSON.stringify(filtered));
    return true;
  } catch (err) {
    console.error('Failed to delete custom story', err);
    return false;
  }
}
