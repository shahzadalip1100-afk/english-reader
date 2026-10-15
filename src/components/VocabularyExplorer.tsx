import React, { useState } from 'react';
import { 
  Search, Volume2, Sparkles, Filter, BookOpen, 
  Plus, Loader2, Star, CheckCircle, ExternalLink, Volume1
} from 'lucide-react';
import { 
  OFFLINE_DICTIONARY, ALL_CATEGORIES, WordDefinition, 
  approximateUrduTransliteration, cleanWord 
} from '../data/dictionary';
import { speakWord } from '../utils/speech';

export const VocabularyExplorer: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All Words');
  const [alphabetFilter, setAlphabetFilter] = useState<string>('all');
  const [customWords, setCustomWords] = useState<Record<string, WordDefinition>>({});
  const [isSearchingOnline, setIsSearchingOnline] = useState(false);
  const [onlineLookupError, setOnlineLookupError] = useState<string | null>(null);

  // Combine preloaded and dynamically looked-up words
  const allWordsMap = { ...OFFLINE_DICTIONARY, ...customWords };
  const wordsList = Object.values(allWordsMap);

  const alphabetList = ['all', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')];

  const filteredWords = wordsList.filter(item => {
    const matchesCategory = selectedCategory === 'All Words' || item.category === selectedCategory;
    const matchesAlphabet = alphabetFilter === 'all' || item.word.toUpperCase().startsWith(alphabetFilter);
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || 
      item.word.toLowerCase().includes(q) ||
      item.urdu.includes(q) ||
      item.transliteration.includes(q);
    return matchesCategory && matchesAlphabet && matchesSearch;
  });

  const handlePlay = (word: string, rate: number = 0.85) => {
    speakWord(word, rate);
  };

  // Instant on-demand lookup for any of 100,000+ words
  const handleLookupAnyWord = async () => {
    const wordToFind = cleanWord(searchQuery);
    if (!wordToFind) return;

    // Already present?
    if (allWordsMap[wordToFind]) {
      speakWord(wordToFind);
      return;
    }

    setIsSearchingOnline(true);
    setOnlineLookupError(null);

    try {
      const response = await fetch('/api/lookup-word', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ word: wordToFind }),
      });

      if (!response.ok) {
        throw new Error('Word lookup failed');
      }

      const data = await response.json();
      if (data && data.word && data.urdu) {
        const newEntry: WordDefinition = {
          word: data.word,
          urdu: data.urdu,
          transliteration: data.transliteration || approximateUrduTransliteration(data.word),
          partOfSpeech: data.partOfSpeech || 'noun',
          example: data.example || `I learned the word ${data.word}.`,
          category: data.category || 'Vocabulary',
        };

        setCustomWords(prev => ({
          ...prev,
          [data.word.toLowerCase()]: newEntry
        }));

        speakWord(data.word, 0.85);
      } else {
        throw new Error('Invalid definition received');
      }
    } catch (err: any) {
      console.warn('Online lookup fallback to phonetics:', err);
      // Fallback local heuristic
      const fallbackEntry: WordDefinition = {
        word: wordToFind,
        urdu: 'نیا لفظ (الفاظ کی لغت میں شامل)',
        transliteration: approximateUrduTransliteration(wordToFind),
        partOfSpeech: 'word',
        example: `Read and practice pronouncing "${wordToFind}".`,
        category: 'Vocabulary',
      };
      setCustomWords(prev => ({
        ...prev,
        [wordToFind]: fallbackEntry
      }));
      speakWord(wordToFind);
    } finally {
      setIsSearchingOnline(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-800 via-indigo-700 to-amber-700 rounded-3xl p-6 sm:p-10 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-xs rounded-full text-xs font-semibold uppercase tracking-wider text-amber-200">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>100,000+ Words Bank & Categories · 1 لاکھ الفاظ کا خزانہ</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight font-english">
            Master English-Urdu Word Bank
          </h1>

          <p className="text-sm sm:text-base text-indigo-100 font-urdu leading-relaxed max-w-2xl" dir="rtl">
            جانور، پھل، سبزیاں، رنگ، گنتی، خاندان، اعضاء، پیشے اور فطرت سمیت درجنوں کیٹیگریز کے الفاظ! تلفظ (اردو رسم الخط میں)، اردو معنی، فونکس اور کسی بھی لفظ کی تلاش۔
          </p>
        </div>
      </div>

      {/* Search and Lookup Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Search Box */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleLookupAnyWord();
              }}
              placeholder="Search or type ANY English word (e.g. apple, butterfly, galaxy, kindness)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-english"
            />
          </div>

          {/* Instant 100,000 Words Lookup CTA Button */}
          {searchQuery.trim().length > 0 && (
            <button
              onClick={handleLookupAnyWord}
              disabled={isSearchingOnline}
              className="w-full sm:w-auto px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-xs transition-all active:scale-95 cursor-pointer whitespace-nowrap"
            >
              {isSearchingOnline ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Looking up...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Lookup in 100,000+ Words (تلاش کریں)</span>
                </>
              )}
            </button>
          )}

          <div className="text-xs text-slate-500 whitespace-nowrap shrink-0">
            Showing <strong className="text-slate-900">{filteredWords.length}</strong> words
          </div>
        </div>

        {/* Category Tabs */}
        <div className="space-y-1.5">
          <div className="text-2xs font-bold uppercase tracking-wider text-slate-400">
            Categories (کیٹیگریز):
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {ALL_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* A-Z Alphabet Filter */}
        <div className="space-y-1.5 border-t border-slate-100 pt-3">
          <div className="text-2xs font-bold uppercase tracking-wider text-slate-400">
            Alphabet Index (A to Z):
          </div>
          <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none">
            {alphabetList.map((letter) => (
              <button
                key={letter}
                onClick={() => setAlphabetFilter(letter)}
                className={`w-7 h-7 rounded-lg text-xs font-black shrink-0 transition-colors cursor-pointer flex items-center justify-center ${
                  alphabetFilter === letter
                    ? 'bg-amber-500 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {letter === 'all' ? 'All' : letter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Words Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredWords.map((item, idx) => (
          <div
            key={`${item.category}-${item.word}-${idx}`}
            className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs hover:shadow-md hover:border-amber-300 transition-all flex flex-col justify-between group"
          >
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors font-english tracking-tight">
                    {item.word}
                  </h3>
                  <div className="text-xs text-amber-800 font-urdu font-medium" dir="rtl">
                    تلفظ: {item.transliteration}
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  {/* Normal Audio */}
                  <button
                    onClick={() => handlePlay(item.word, 0.9)}
                    className="p-2 rounded-xl bg-slate-100 hover:bg-indigo-100 text-slate-700 hover:text-indigo-700 transition-colors cursor-pointer"
                    title="Normal Pronunciation (آواز سنیں)"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>

                  {/* Slow Phonics Audio */}
                  <button
                    onClick={() => handlePlay(item.word, 0.65)}
                    className="p-2 rounded-xl bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-700 transition-colors cursor-pointer text-xs font-bold"
                    title="Slow Phonics (آہستہ سنیں)"
                  >
                    <Volume1 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Urdu Translation Meaning with RTL */}
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-2.5 text-right" dir="rtl">
                <span className="text-xs text-slate-500 font-urdu block">معنی:</span>
                <span className="text-base font-bold text-slate-900 font-urdu">
                  {item.urdu}
                </span>
              </div>

              {/* Example Sentence */}
              {item.example && (
                <div className="text-xs text-slate-600 italic font-english bg-indigo-50/40 p-2 rounded-lg border border-indigo-100/50">
                  &ldquo;{item.example}&rdquo;
                </div>
              )}
            </div>

            {/* Footer with Category Tag */}
            <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-2xs text-slate-400">
              <span className="px-2 py-0.5 bg-slate-100 rounded-md font-medium text-slate-600">
                {item.category}
              </span>
              <span className="font-mono uppercase text-2xs">
                {item.partOfSpeech}
              </span>
            </div>
          </div>
        ))}
      </div>

      {filteredWords.length === 0 && (
        <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 p-8 space-y-4">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-lg font-bold text-slate-800">
            &ldquo;{searchQuery}&rdquo; کے لیے کوئی فوری محفوظ لفظ نہیں ملا
          </h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            آپ اس لفظ کو ہمارے 1 لاکھ الفاظ کے خزانے میں براہِ راست تلاش کر سکتے ہیں:
          </p>
          <button
            onClick={handleLookupAnyWord}
            disabled={isSearchingOnline}
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-sm shadow-md transition-all active:scale-95 cursor-pointer inline-flex items-center gap-2"
          >
            {isSearchingOnline ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4 text-amber-300" />
            )}
            <span>Lookup & Add &ldquo;{searchQuery}&rdquo; Now</span>
          </button>
        </div>
      )}
    </div>
  );
};
