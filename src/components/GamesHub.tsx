import React, { useState, useEffect } from 'react';
import { 
  Trophy, Star, Volume2, ArrowLeft, RotateCcw, 
  CheckCircle2, XCircle, Search, Sparkles, Filter, 
  Play, Award, ArrowRight, HelpCircle, Layers, Check
} from 'lucide-react';
import { 
  ALL_100_GAMES, GameDefinition, GameQuestion, GameCategory 
} from '../data/games100';
import { speakSentence, speakWord } from '../utils/speech';

interface GamesHubProps {
  initialGameId?: number;
}

export const GamesHub: React.FC<GamesHubProps> = ({ initialGameId }) => {
  const [selectedGame, setSelectedGame] = useState<GameDefinition | null>(
    initialGameId ? ALL_100_GAMES.find(g => g.id === initialGameId) || null : null
  );
  const [selectedCategory, setSelectedCategory] = useState<GameCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Active game play state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [userArrangedWords, setUserArrangedWords] = useState<string[]>([]);
  const [remainingWords, setRemainingWords] = useState<string[]>([]);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [isGameFinished, setIsGameFinished] = useState(false);

  // Initialize words for sentence unscramble when question changes
  useEffect(() => {
    if (!selectedGame) return;
    const q = selectedGame.questions[currentQuestionIndex];
    if (q && q.type === 'sentence-unscramble' && q.wordsToArrange) {
      // Shuffle words initially
      const shuffled = [...q.wordsToArrange].sort(() => Math.random() - 0.5);
      setRemainingWords(shuffled);
      setUserArrangedWords([]);
    } else {
      setRemainingWords([]);
      setUserArrangedWords([]);
    }
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    setIsCorrect(false);
  }, [selectedGame, currentQuestionIndex]);

  // Launch a specific game
  const handleLaunchGame = (game: GameDefinition) => {
    setSelectedGame(game);
    setCurrentQuestionIndex(0);
    setScore(0);
    setIsGameFinished(false);
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
  };

  const handleReturnToCatalog = () => {
    setSelectedGame(null);
    setIsGameFinished(false);
  };

  const handlePlayAudio = (text: string) => {
    speakSentence(text, { rate: 0.85 });
  };

  // Word selection for sentence unscramble
  const handlePickWord = (word: string, index: number) => {
    if (isAnswerSubmitted) return;
    speakWord(word, 0.9);
    setUserArrangedWords(prev => [...prev, word]);
    setRemainingWords(prev => prev.filter((_, i) => i !== index));
  };

  const handleRemoveArrangedWord = (word: string, index: number) => {
    if (isAnswerSubmitted) return;
    setUserArrangedWords(prev => prev.filter((_, i) => i !== index));
    setRemainingWords(prev => [...prev, word]);
  };

  const handleResetArrangement = (q: GameQuestion) => {
    if (isAnswerSubmitted || !q.wordsToArrange) return;
    setRemainingWords([...q.wordsToArrange].sort(() => Math.random() - 0.5));
    setUserArrangedWords([]);
  };

  const handleCheckSentence = (q: GameQuestion) => {
    const constructed = userArrangedWords.join(' ').trim().toLowerCase();
    const target = q.correctAnswer.trim().toLowerCase();
    const correct = constructed === target;
    setIsCorrect(correct);
    setIsAnswerSubmitted(true);
    if (correct) {
      setScore(s => s + 1);
      speakSentence('Great job! ' + q.correctAnswer);
    } else {
      speakSentence('Let us learn: ' + q.correctAnswer);
    }
  };

  const handleSelectChoice = (choice: string, q: GameQuestion) => {
    if (isAnswerSubmitted) return;
    setSelectedAnswer(choice);
    setIsAnswerSubmitted(true);

    const correct = choice.trim().toLowerCase() === q.correctAnswer.trim().toLowerCase();
    setIsCorrect(correct);
    if (correct) {
      setScore(s => s + 1);
      speakSentence('Awesome! ' + (q.audioText || choice));
    } else {
      speakSentence('The correct answer is: ' + q.correctAnswer);
    }
  };

  const handleNextQuestion = () => {
    if (!selectedGame) return;
    if (currentQuestionIndex + 1 < selectedGame.questions.length) {
      setCurrentQuestionIndex(i => i + 1);
    } else {
      setIsGameFinished(true);
    }
  };

  // Filter games list
  const filteredGames = ALL_100_GAMES.filter(game => {
    const matchesCategory = selectedCategory === 'all' || game.category === selectedCategory;
    const query = searchQuery.toLowerCase().trim();
    if (!query) return matchesCategory;

    const matchesNumber = game.id.toString() === query || `game ${game.id}`.includes(query);
    const matchesTitle = 
      game.title.toLowerCase().includes(query) ||
      game.urduTitle.includes(query) ||
      game.descriptionEng.toLowerCase().includes(query) ||
      game.descriptionUrdu.includes(query) ||
      game.categoryUrdu.includes(query);

    return matchesCategory && (matchesNumber || matchesTitle);
  });

  const categoriesList: { key: GameCategory | 'all'; nameEng: string; nameUrdu: string }[] = [
    { key: 'all', nameEng: 'All 100 Games', nameUrdu: 'تمام 100 گیمز' },
    { key: 'tenses', nameEng: '12 English Tenses', nameUrdu: 'تمام 12 ٹینسز' },
    { key: 'spoken', nameEng: 'Daily Spoken English', nameUrdu: 'روزمرہ بول چال' },
    { key: 'parts-of-speech', nameEng: 'Parts of Speech', nameUrdu: 'اجزائے کلام' },
    { key: 'prepositions', nameEng: 'Prepositions', nameUrdu: 'حروف جار' },
    { key: 'articles', nameEng: 'Articles & Determiners', nameUrdu: 'آرٹیکلز اور اشارے' },
    { key: 'sentence-structure', nameEng: 'Sentence Structure', nameUrdu: 'جملے کی ساخت' },
    { key: 'voice-narration', nameEng: 'Voice & Narration', nameUrdu: 'معروف و مجہول' },
    { key: 'conditionals', nameEng: 'Conditionals', nameUrdu: 'شرطیہ جملے' },
    { key: 'advanced', nameEng: 'Advanced & Trophy', nameUrdu: 'ایڈوانس اور گولڈ ٹرافی' },
  ];

  // -------------------------------------------------------------
  // RENDER 1: ACTIVE GAME PLAYING SCREEN
  // -------------------------------------------------------------
  if (selectedGame) {
    const q = selectedGame.questions[currentQuestionIndex];
    const totalQuestions = selectedGame.questions.length;

    return (
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Top Control Bar with Back to Catalog Button */}
        <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <button
            onClick={handleReturnToCatalog}
            className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all active:scale-95 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-english">Back to All 100 Games</span>
            <span className="font-urdu text-xs" dir="rtl">(100 گیمز پر واپس)</span>
          </button>

          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-full">
              Game #{selectedGame.id}
            </span>
            <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-bold">
              <Star className="w-4 h-4 fill-emerald-500 text-emerald-500" />
              <span>Score: {score}/{totalQuestions}</span>
            </div>
          </div>
        </div>

        {/* Game Finished Screen */}
        {isGameFinished ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 text-center shadow-lg space-y-6 animate-in zoom-in-95 duration-200">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-100 text-amber-600 flex items-center justify-center shadow-inner">
              <Trophy className="w-10 h-10 animate-bounce" />
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1 text-amber-600 font-bold text-sm">
                <Sparkles className="w-4 h-4" />
                <span>شاباش! گیم مکمل ہو گئی</span>
              </div>
              <h2 className="text-3xl font-black text-slate-900 font-english">
                {selectedGame.title} Completed!
              </h2>
              <p className="text-lg text-slate-600 font-urdu" dir="rtl">
                آپ نے {totalQuestions} میں سے <strong className="text-emerald-600">{score}</strong> پوائنٹس حاصل کیے!
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <button
                onClick={() => handleLaunchGame(selectedGame)}
                className="flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-2xl shadow-md transition-all active:scale-95 cursor-pointer"
              >
                <RotateCcw className="w-5 h-5" />
                <span>Play Again (دوبارہ کھیلیں)</span>
              </button>

              {selectedGame.id < 100 && (
                <button
                  onClick={() => {
                    const next = ALL_100_GAMES.find(g => g.id === selectedGame.id + 1);
                    if (next) handleLaunchGame(next);
                  }}
                  className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  <span>Next Game #{selectedGame.id + 1} (اگلی گیم)</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              )}

              <button
                onClick={handleReturnToCatalog}
                className="flex items-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl transition-all active:scale-95 cursor-pointer"
              >
                <Layers className="w-5 h-5" />
                <span>Choose Another Game (دیگر گیمز)</span>
              </button>
            </div>
          </div>
        ) : q ? (
          /* Active Question Card */
          <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-8 space-y-6">
            
            {/* Header / Meta */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                  {selectedGame.categoryUrdu} · {selectedGame.title}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-english mt-0.5">
                  Question {currentQuestionIndex + 1} of {totalQuestions}
                </h3>
              </div>

              {/* Progress Bar */}
              <div className="w-full sm:w-48 bg-slate-100 rounded-full h-3 overflow-hidden">
                <div 
                  className="bg-indigo-600 h-full transition-all duration-300"
                  style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
                />
              </div>
            </div>

            {/* Urdu Prompt & English Prompt */}
            <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-5 space-y-2">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="text-lg font-bold text-amber-900 font-urdu text-right" dir="rtl">
                    {q.urduPrompt}
                  </div>
                  <div className="text-base font-semibold text-slate-800 font-english text-left" dir="ltr">
                    {q.prompt}
                  </div>
                </div>

                {/* Audio Button for Question */}
                {q.audioText && (
                  <button
                    onClick={() => handlePlayAudio(q.audioText || q.prompt)}
                    className="p-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white shadow-xs shrink-0 active:scale-90 transition-transform cursor-pointer"
                    title="آواز سنیں (Listen)"
                  >
                    <Volume2 className="w-6 h-6" />
                  </button>
                )}
              </div>
            </div>

            {/* Urdu Grammar Golden Rule Tip */}
            {selectedGame.ruleUrdu && (
              <div className="bg-indigo-50/80 border border-indigo-200/80 rounded-2xl p-3.5 text-xs font-urdu text-indigo-950 flex items-center gap-2.5 shadow-2xs" dir="rtl">
                <Sparkles className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>
                  <strong className="text-indigo-800 font-bold ml-1">گرامر کا اہم اصول:</strong>
                  {selectedGame.ruleUrdu}
                </span>
              </div>
            )}

            {/* ------------------------------------------- */}
            {/* QUESTION TYPE A: SENTENCE BUILDER / UNSCRAMBLE */}
            {/* ------------------------------------------- */}
            {q.type === 'sentence-unscramble' && (
              <div className="space-y-6 pt-2">
                {/* Sentence Construction Zone */}
                <div>
                  <div className="text-xs font-semibold text-slate-500 mb-2">
                    Constructed Sentence (یہاں الفاظ جوڑ کر جملہ بنائیں):
                  </div>
                  <div className="min-h-16 p-4 rounded-2xl border-2 border-dashed border-indigo-300 bg-indigo-50/50 flex flex-wrap items-center gap-2">
                    {userArrangedWords.length === 0 ? (
                      <span className="text-sm text-indigo-400 italic font-urdu" dir="rtl">
                        نیچے دیے گئے الفاظ پر کلک کریں تاکہ وہ ترتیب میں یہاں لگیں...
                      </span>
                    ) : (
                      userArrangedWords.map((word, idx) => (
                        <button
                          key={`${word}-${idx}`}
                          onClick={() => handleRemoveArrangedWord(word, idx)}
                          disabled={isAnswerSubmitted}
                          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-xs text-base transition-all transform active:scale-95 cursor-pointer"
                        >
                          {word}
                        </button>
                      ))
                    )}
                  </div>
                </div>

                {/* Available Word Pool */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-slate-500">
                      Available Words (الفاظ کا پول):
                    </span>
                    {!isAnswerSubmitted && userArrangedWords.length > 0 && (
                      <button
                        onClick={() => handleResetArrangement(q)}
                        className="text-xs text-amber-700 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Reset (دوبارہ شروع کریں)</span>
                      </button>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-2 p-3 bg-slate-50 rounded-2xl border border-slate-200">
                    {remainingWords.length === 0 && userArrangedWords.length > 0 ? (
                      <span className="text-xs text-slate-400">تمام الفاظ چن لیے گئے ہیں۔ اب چیک بٹن دبائیں۔</span>
                    ) : (
                      remainingWords.map((word, idx) => (
                        <button
                          key={`${word}-${idx}`}
                          onClick={() => handlePickWord(word, idx)}
                          disabled={isAnswerSubmitted}
                          className="px-4 py-2.5 bg-white hover:bg-amber-100 text-slate-800 font-extrabold rounded-xl border border-slate-300 shadow-xs text-base transition-all active:scale-90 cursor-pointer"
                        >
                          {word}
                        </button>
                      ))
                    )}
                  </div>
                </div>

                {/* Check Button for Sentence */}
                {!isAnswerSubmitted && (
                  <button
                    onClick={() => handleCheckSentence(q)}
                    disabled={userArrangedWords.length === 0}
                    className={`w-full py-3.5 rounded-2xl font-black text-white text-base shadow-md transition-all active:scale-98 flex items-center justify-center gap-2 ${
                      userArrangedWords.length > 0
                        ? 'bg-emerald-600 hover:bg-emerald-700 cursor-pointer'
                        : 'bg-slate-300 cursor-not-allowed'
                    }`}
                  >
                    <Check className="w-5 h-5" />
                    <span>Check Sentence (جملہ چیک کریں)</span>
                  </button>
                )}
              </div>
            )}

            {/* ------------------------------------------- */}
            {/* QUESTION TYPE B: FILL IN BLANK / MULTIPLE CHOICE */}
            {/* ------------------------------------------- */}
            {(q.type === 'fill-blank' || q.type === 'multiple-choice' || q.type === 'audio-pick') && q.options && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {q.options.map((option, idx) => {
                  const isChosen = selectedAnswer === option;
                  const isCorrectOption = option.trim().toLowerCase() === q.correctAnswer.trim().toLowerCase();

                  let buttonStyle = 'bg-white hover:bg-indigo-50 border-slate-200 text-slate-800 hover:border-indigo-400';
                  if (isAnswerSubmitted) {
                    if (isCorrectOption) {
                      buttonStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 ring-2 ring-emerald-500 font-black';
                    } else if (isChosen) {
                      buttonStyle = 'bg-rose-50 border-rose-500 text-rose-900 ring-2 ring-rose-500 font-black';
                    } else {
                      buttonStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectChoice(option, q)}
                      disabled={isAnswerSubmitted}
                      className={`p-4 rounded-2xl border-2 text-left transition-all flex items-center justify-between gap-3 shadow-xs ${buttonStyle} cursor-pointer active:scale-98`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-xs text-slate-600">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span className="text-base sm:text-lg font-bold">
                          {option}
                        </span>
                      </div>

                      {isAnswerSubmitted && isCorrectOption && (
                        <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                      )}
                      {isAnswerSubmitted && isChosen && !isCorrectOption && (
                        <XCircle className="w-6 h-6 text-rose-600 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Feedback & Next Button */}
            {isAnswerSubmitted && (
              <div className={`p-5 rounded-2xl border transition-all animate-in fade-in duration-200 ${
                isCorrect 
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-900' 
                  : 'bg-rose-50 border-rose-200 text-rose-900'
              }`}>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 font-black text-lg">
                      {isCorrect ? (
                        <>
                          <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                          <span>شاباش! بالکل درست جواب!</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-6 h-6 text-rose-600" />
                          <span>درست جواب ہے: {q.correctAnswer}</span>
                        </>
                      )}
                    </div>
                    {q.urduMeaning && (
                      <div className="text-sm font-urdu font-medium" dir="rtl">
                        ترجمہ: {q.urduMeaning}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={handleNextQuestion}
                    className="w-full sm:w-auto px-6 py-3 bg-slate-900 hover:bg-indigo-600 text-white font-black rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
                  >
                    <span>
                      {currentQuestionIndex + 1 < totalQuestions ? 'Next Question (اگلا سوال)' : 'View Results (نتیجہ دیکھیں)'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : null}
      </div>
    );
  }

  // -------------------------------------------------------------
  // RENDER 2: 100 GAMES DIRECTORY & CATALOG
  // -------------------------------------------------------------
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-700 rounded-3xl p-6 sm:p-10 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-xs rounded-full text-xs font-semibold uppercase tracking-wider text-amber-200">
            <Trophy className="w-4 h-4 text-amber-300" />
            <span>100 Interactive Educational Games · 100 تعلیمی گیمز</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight font-english">
            100 English Learning Games Arcade
          </h1>

          <p className="text-sm sm:text-base text-emerald-100 font-urdu leading-relaxed max-w-2xl" dir="rtl">
            صحیح جملہ بنانے، خالی جگہ پر کرنے، الفاظ کے معنی، صوتیات، الٹ الفاظ اور سننے کی 100 مختلف گیمز! ہر گیم کا اپنا بٹن دبائیں اور فوراً کھیلنا شروع کریں۔
          </p>
        </div>
      </div>

      {/* Search and Category Filters Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        
        {/* Search Input */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 100 games by # number or keyword (e.g. 16, sentence, blanks, جانور)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="text-xs text-slate-500 whitespace-nowrap">
            Showing <strong className="text-slate-900">{filteredGames.length}</strong> of 100 Games
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categoriesList.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.key
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <span>{cat.nameEng}</span>
              <span className="font-urdu ml-1.5 opacity-80" dir="rtl">({cat.nameUrdu})</span>
            </button>
          ))}
        </div>
      </div>

      {/* 100 Games Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredGames.map((game) => (
          <div
            key={game.id}
            className="bg-white rounded-2xl border border-slate-200 hover:border-emerald-300 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div className="space-y-3">
              {/* Badge & Game # & 20 Questions tag */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <span className={`px-2.5 py-1 text-white text-xs font-black rounded-lg ${game.badgeColor}`}>
                    Game #{game.id}
                  </span>
                  <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-2xs font-extrabold rounded-md">
                    20 Questions (20 سوالات)
                  </span>
                </div>

                <span className="text-2xs font-bold text-slate-500 uppercase tracking-wider bg-slate-100 px-2 py-0.5 rounded-md">
                  {game.categoryUrdu}
                </span>
              </div>

              {/* Title & Urdu Title */}
              <div>
                <h3 className="text-lg font-black text-slate-900 group-hover:text-emerald-700 transition-colors font-english leading-snug">
                  {game.title}
                </h3>
                <div className="text-xs text-amber-800 font-urdu font-medium mt-0.5 text-right" dir="rtl">
                  {game.urduTitle}
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-600 font-urdu leading-relaxed text-right" dir="rtl">
                {game.descriptionUrdu}
              </p>
            </div>

            {/* Launch Game Dedicated Button */}
            <div className="pt-4 border-t border-slate-100 mt-4">
              <button
                onClick={() => handleLaunchGame(game)}
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs hover:shadow transition-all cursor-pointer"
              >
                <Play className="w-4 h-4 fill-white" />
                <span className="font-english">Play Game #{game.id}</span>
                <span className="font-urdu text-xs" dir="rtl">(یہ گیم کھیلیں)</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredGames.length === 0 && (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
          <HelpCircle className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-lg font-bold text-slate-700">کوئی گیم نہیں ملی (No games found)</h3>
          <p className="text-sm text-slate-500">
            برائے مہربانی تلاش کا لفظ یا فلٹر تبدیل کر کے دیکھیں۔
          </p>
        </div>
      )}
    </div>
  );
};
