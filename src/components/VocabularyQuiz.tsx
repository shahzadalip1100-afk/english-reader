import React, { useState, useEffect } from 'react';
import { Volume2, Trophy, RotateCcw, CheckCircle2, XCircle, Sparkles, Star } from 'lucide-react';
import { OFFLINE_DICTIONARY, WordDefinition } from '../data/dictionary';
import { speakWord } from '../utils/speech';

interface QuizQuestion {
  targetWord: WordDefinition;
  options: string[]; // Urdu meanings
  correctOption: string;
}

export const VocabularyQuiz: React.FC = () => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // Generate a batch of 8 questions from dictionary
  const generateNewQuiz = () => {
    const allWords = Object.values(OFFLINE_DICTIONARY).filter(w => w.urdu && w.urdu !== 'نامعلوم لفظ');
    // Shuffle words
    const shuffled = [...allWords].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 8);

    const generated: QuizQuestion[] = selected.map(target => {
      // Pick 3 distractor words
      const distractors = allWords
        .filter(w => w.word !== target.word && w.urdu !== target.urdu)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map(w => w.urdu);

      const options = [target.urdu, ...distractors].sort(() => 0.5 - Math.random());

      return {
        targetWord: target,
        options,
        correctOption: target.urdu
      };
    });

    setQuestions(generated);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsAnswerChecked(false);
    setScore(0);
    setQuizFinished(false);
  };

  useEffect(() => {
    generateNewQuiz();
  }, []);

  const currentQ = questions[currentIndex];

  // Auto speak word when question loads
  useEffect(() => {
    if (currentQ && !isAnswerChecked) {
      speakWord(currentQ.targetWord.word, 0.85);
    }
  }, [currentIndex, currentQ]);

  const handleSelectOption = (option: string) => {
    if (isAnswerChecked) return;
    setSelectedAnswer(option);
    setIsAnswerChecked(true);

    if (option === currentQ.correctOption) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswerChecked(false);
    } else {
      setQuizFinished(true);
    }
  };

  if (questions.length === 0) return null;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Quiz Card */}
      {!quizFinished ? (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-8 space-y-6">
          {/* Progress & Score */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Question:</span>
              <span className="text-sm font-extrabold text-indigo-600 font-mono">
                {currentIndex + 1} / {questions.length}
              </span>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-800 rounded-full text-xs font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>Score: {score}</span>
            </div>
          </div>

          {/* Word Prompt Stage */}
          <div className="text-center py-4 space-y-3">
            <div className="text-xs font-semibold text-slate-500 font-urdu" dir="rtl">
              اس انگریزی لفظ کا صحیح اردو معنی منتخب کریں:
            </div>

            <div className="text-4xl sm:text-5xl font-black text-slate-900 font-english tracking-tight">
              {currentQ.targetWord.word}
            </div>

            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => speakWord(currentQ.targetWord.word, 0.85)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl text-xs font-semibold transition-colors active:scale-95"
              >
                <Volume2 className="w-4 h-4" />
                <span>آواز سنیں (Play Pronunciation)</span>
              </button>

              <button
                onClick={() => speakWord(currentQ.targetWord.word, 0.65)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 hover:bg-amber-100 text-amber-800 rounded-xl text-xs font-semibold transition-colors active:scale-95"
              >
                <span>آہستہ سنیں (Slow)</span>
              </button>
            </div>

            {currentQ.targetWord.transliteration && (
              <div className="text-sm text-slate-500 font-urdu" dir="rtl">
                اردو تلفظ: <span className="font-bold text-amber-800">{currentQ.targetWord.transliteration}</span>
              </div>
            )}
          </div>

          {/* 4 Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {currentQ.options.map((opt, optIdx) => {
              let buttonStyle = 'bg-slate-50 hover:bg-indigo-50/50 border-slate-200 text-slate-800';

              if (isAnswerChecked) {
                if (opt === currentQ.correctOption) {
                  buttonStyle = 'bg-emerald-500 text-white border-emerald-600 shadow-xs';
                } else if (opt === selectedAnswer) {
                  buttonStyle = 'bg-rose-500 text-white border-rose-600 shadow-xs';
                } else {
                  buttonStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                }
              }

              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelectOption(opt)}
                  disabled={isAnswerChecked}
                  className={`p-4 rounded-2xl border text-xl font-bold font-urdu transition-all text-center flex items-center justify-center gap-2 min-h-[64px] ${buttonStyle}`}
                  dir="rtl"
                >
                  {isAnswerChecked && opt === currentQ.correctOption && (
                    <CheckCircle2 className="w-5 h-5 text-white shrink-0" />
                  )}
                  {isAnswerChecked && opt === selectedAnswer && opt !== currentQ.correctOption && (
                    <XCircle className="w-5 h-5 text-white shrink-0" />
                  )}
                  <span>{opt}</span>
                </button>
              );
            })}
          </div>

          {/* Next Button */}
          {isAnswerChecked && (
            <div className="pt-4 flex justify-end animate-in fade-in">
              <button
                onClick={handleNextQuestion}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold shadow-xs transition-all active:scale-95 flex items-center gap-2"
              >
                <span>{currentIndex < questions.length - 1 ? 'Next Question (اگلا سوال)' : 'See Results (نتیجہ دیکھیں)'}</span>
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Result Screen */
        <div className="bg-white rounded-3xl border border-slate-200 shadow-lg p-8 text-center space-y-6">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-100 flex items-center justify-center text-amber-600 shadow-inner">
            <Trophy className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight font-english">
              Shabash! بہت خوب!
            </h2>
            <p className="text-slate-600 font-urdu text-lg" dir="rtl">
              آپ نے <strong className="text-indigo-600">{questions.length}</strong> میں سے <strong className="text-emerald-600 font-bold">{score}</strong> درست جوابات دیے!
            </p>
          </div>

          <div className="flex justify-center gap-1 text-amber-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-8 h-8 ${
                  i < Math.round((score / questions.length) * 5)
                    ? 'fill-amber-400 text-amber-400'
                    : 'text-slate-200'
                }`}
              />
            ))}
          </div>

          <div className="pt-4">
            <button
              onClick={generateNewQuiz}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold shadow-xs transition-all active:scale-95"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Play Again (دوبارہ کوئز کھیلیں)</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
