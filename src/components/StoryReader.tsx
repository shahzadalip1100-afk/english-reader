import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Volume2, Square, ChevronLeft, ChevronRight, 
  Eye, EyeOff, Sparkles, Sliders, CheckCircle, RefreshCw, Trash2
} from 'lucide-react';
import { StoryLesson, SentenceItem } from '../data/lessons';
import { speakWord, speakSentence, stopSpeech } from '../utils/speech';
import { WordInspectorModal } from './WordInspectorModal';

interface StoryReaderProps {
  story: StoryLesson;
  onBack: () => void;
  onDeleteStory?: (story: StoryLesson) => void;
}

export const StoryReader: React.FC<StoryReaderProps> = ({ story, onBack, onDeleteStory }) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [speechRate, setSpeechRate] = useState<number>(0.85); // 0.65 = slow phonics, 0.88 = normal
  const [showAllTranslations, setShowAllTranslations] = useState<boolean>(true);
  const [revealedSentenceIds, setRevealedSentenceIds] = useState<Record<string, boolean>>({});
  
  // Real-time speech tracking
  const [isReadingPage, setIsReadingPage] = useState<boolean>(false);
  const [speakingSentenceId, setSpeakingSentenceId] = useState<string | null>(null);
  const [activeWordIndexInSentence, setActiveWordIndexInSentence] = useState<number | null>(null);

  const currentPage = story.pages[currentPageIndex] || story.pages[0];

  // Stop speech on page change or unmount
  useEffect(() => {
    stopSpeech();
    setIsReadingPage(false);
    setSpeakingSentenceId(null);
    setActiveWordIndexInSentence(null);
    return () => {
      stopSpeech();
    };
  }, [currentPageIndex, story]);

  // Handle individual word click
  const handleWordClick = (word: string) => {
    stopSpeech();
    setIsReadingPage(false);
    setSpeakingSentenceId(null);
    setActiveWordIndexInSentence(null);
    
    // Clean trailing punctuation for speech
    const clean = word.replace(/[.,/#!$%^&*;:{}=\-_`~()?"']/g, '');
    speakWord(clean, speechRate);
    setSelectedWord(clean);
  };

  // Read a single sentence
  const handleReadSentence = (sentence: SentenceItem) => {
    if (speakingSentenceId === sentence.id) {
      stopSpeech();
      setSpeakingSentenceId(null);
      setActiveWordIndexInSentence(null);
      setIsReadingPage(false);
      return;
    }

    stopSpeech();
    setIsReadingPage(false);
    setSpeakingSentenceId(sentence.id);
    setActiveWordIndexInSentence(null);

    speakSentence(sentence.english, {
      rate: speechRate,
      onWordBoundary: (wordIndex) => {
        setActiveWordIndexInSentence(wordIndex);
      },
      onEnd: () => {
        setSpeakingSentenceId(null);
        setActiveWordIndexInSentence(null);
      },
      onError: () => {
        setSpeakingSentenceId(null);
        setActiveWordIndexInSentence(null);
      }
    });
  };

  // Continuous read-aloud for the whole page
  const handleReadFullPage = () => {
    if (isReadingPage) {
      stopSpeech();
      setIsReadingPage(false);
      setSpeakingSentenceId(null);
      setActiveWordIndexInSentence(null);
      return;
    }

    const sentences = currentPage.sentences;
    if (!sentences || sentences.length === 0) return;

    setIsReadingPage(true);
    let index = 0;

    const playNext = () => {
      if (index >= sentences.length) {
        setIsReadingPage(false);
        setSpeakingSentenceId(null);
        setActiveWordIndexInSentence(null);
        return;
      }

      const curr = sentences[index];
      setSpeakingSentenceId(curr.id);
      setActiveWordIndexInSentence(null);

      speakSentence(curr.english, {
        rate: speechRate,
        onWordBoundary: (wordIdx) => {
          setActiveWordIndexInSentence(wordIdx);
        },
        onEnd: () => {
          index++;
          // Brief pleasant pause between sentences
          setTimeout(() => {
            playNext();
          }, 450);
        },
        onError: () => {
          setIsReadingPage(false);
          setSpeakingSentenceId(null);
          setActiveWordIndexInSentence(null);
        }
      });
    };

    playNext();
  };

  const toggleSentenceTranslation = (id: string) => {
    setRevealedSentenceIds(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const isTranslationVisible = (id: string) => {
    if (showAllTranslations) return true;
    return !!revealedSentenceIds[id];
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Top Header & Navigation Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              stopSpeech();
              onBack();
            }}
            className="flex items-center gap-2 px-3.5 py-2 text-sm font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back (واپس)</span>
          </button>
          
          <div className="hidden sm:block border-l border-slate-200 h-6 mx-1"></div>

          <div>
            <h1 className="text-lg font-bold text-slate-900 tracking-tight font-english text-left" dir="ltr">
              {story.title}
            </h1>
            <div className="text-xs text-amber-800 font-urdu text-right" dir="rtl">
              {story.urduTitle}
            </div>
          </div>
        </div>

        {/* Global Reading Helpers & Controls */}
        <div className="flex items-center gap-2">
          {/* Delete Button for custom stories */}
          {story.isCustom && onDeleteStory && (
            <button
              onClick={() => onDeleteStory(story)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 transition-colors"
              title="Delete this custom story"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Delete Story (حذف کریں)</span>
            </button>
          )}

          {/* Phonics Speed Selector */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs">
            <span className="text-slate-500 px-2 font-medium hidden md:inline">Voice Speed:</span>
            <button
              onClick={() => setSpeechRate(0.68)}
              className={`px-2.5 py-1.5 rounded-lg font-medium transition-colors ${
                speechRate < 0.75 
                  ? 'bg-amber-500 text-white shadow-xs' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Slow Phonics (آہستہ)
            </button>
            <button
              onClick={() => setSpeechRate(0.88)}
              className={`px-2.5 py-1.5 rounded-lg font-medium transition-colors ${
                speechRate >= 0.75 
                  ? 'bg-indigo-600 text-white shadow-xs' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Normal (عام رفتار)
            </button>
          </div>

          {/* Toggle All Translations */}
          <button
            onClick={() => setShowAllTranslations(!showAllTranslations)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
              showAllTranslations
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
            title="Toggle Urdu translations"
          >
            {showAllTranslations ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            <span className="hidden sm:inline font-urdu" dir="rtl">اردو ترجمہ {showAllTranslations ? 'آن' : 'آف'}</span>
          </button>
        </div>
      </div>

      {/* Main Two-Stage Sandbox Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Stage: Visual / Page Illustration (5 cols) */}
        <div className="lg:col-span-5 flex flex-col space-y-4">
          <div className="relative bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs flex-1 flex flex-col min-h-[340px] group">
            {/* Story Image */}
            <div className="relative w-full aspect-4/3 sm:aspect-auto sm:flex-1 bg-slate-100 flex items-center justify-center overflow-hidden">
              <img
                src={currentPage.image}
                alt={currentPage.title || story.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain sm:object-cover transition-transform duration-500 group-hover:scale-102"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = 'none';
                  const fallback = target.parentElement?.querySelector('.img-fallback') as HTMLElement;
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
              <div className="img-fallback hidden absolute inset-0 bg-gradient-to-br from-amber-100 to-indigo-100 items-center justify-center p-6 text-center text-slate-600">
                <Sparkles className="w-8 h-8 text-amber-500 mb-2 mx-auto" />
                <p className="font-english font-semibold">{story.title}</p>
              </div>

              {/* Page Number Overlay */}
              <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-xs text-white text-xs font-semibold px-2.5 py-1 rounded-lg">
                Page {currentPage.pageNumber} of {story.pages.length}
              </div>

              {/* Urdu Page Label */}
              <div className="absolute top-3 right-3 bg-amber-500/90 text-white text-xs font-bold px-2.5 py-1 rounded-lg font-urdu text-right" dir="rtl">
                صفحہ {currentPage.pageNumber} از {story.pages.length}
              </div>
            </div>

            {/* Page Subtitle / Theme */}
            {currentPage.title && (
              <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                <span className="font-semibold text-slate-800 font-english text-left" dir="ltr">{currentPage.title}</span>
                {currentPage.urduTitle && (
                  <span className="font-urdu text-amber-800 text-right" dir="rtl">{currentPage.urduTitle}</span>
                )}
              </div>
            )}
          </div>

          {/* Quick Guidance Card for Kids */}
          <div className="bg-amber-50/80 border border-amber-200/80 rounded-2xl p-4 flex items-start gap-3 text-amber-900">
            <div className="p-2 bg-amber-200/60 rounded-xl text-amber-800 shrink-0 mt-0.5">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="space-y-1 text-xs text-right w-full" dir="rtl">
              <div className="font-bold font-urdu text-sm">بچوں کے لیے سنہری رہنمائی:</div>
              <div className="font-urdu leading-relaxed">
                کہانی کے <strong className="font-bold text-amber-950">کسی بھی لفظ پر کلک کریں</strong> تاکہ اس کی درست آواز، اردو تلفظ اور معنی سامنے آئیں۔
              </div>
            </div>
          </div>
        </div>

        {/* Right Stage: Interactive Text & Reader (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between shadow-xs space-y-6">
          
          {/* Read Entire Page Bar */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="text-left" dir="ltr">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Read & Learn</span>
              <div className="text-xs text-slate-500 mt-0.5">Click any word to inspect meaning & phonetics</div>
            </div>

            <button
              onClick={handleReadFullPage}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-xs active:scale-95 ${
                isReadingPage 
                  ? 'bg-rose-500 hover:bg-rose-600 text-white' 
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'
              }`}
            >
              {isReadingPage ? (
                <>
                  <Square className="w-4 h-4" />
                  <span>Stop Reading (آواز روکیں)</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4" />
                  <span>Listen Whole Page (سارا صفحہ سنیں)</span>
                </>
              )}
            </button>
          </div>

          {/* Sentences List */}
          <div className="space-y-6 flex-1 py-2">
            {currentPage.sentences.map((sent) => {
              const isSpeakingThisSentence = speakingSentenceId === sent.id;
              const words = sent.english.split(/\s+/);

              return (
                <div 
                  key={sent.id}
                  className={`p-4 rounded-2xl transition-all border ${
                    isSpeakingThisSentence 
                      ? 'bg-amber-50/50 border-amber-300 shadow-xs ring-2 ring-amber-200' 
                      : 'bg-white hover:bg-slate-50/70 border-slate-100'
                  }`}
                >
                  {/* English Sentence with Clickable Word Tokens: Strict LTR and text-left */}
                  <div className="flex items-start gap-3">
                    <button
                      onClick={() => handleReadSentence(sent)}
                      className={`p-2 rounded-xl shrink-0 transition-colors mt-1 ${
                        isSpeakingThisSentence 
                          ? 'bg-amber-500 text-white' 
                          : 'bg-slate-100 hover:bg-indigo-100 text-slate-600 hover:text-indigo-600'
                      }`}
                      title="Play this sentence"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>

                    <div className="flex-1 text-left" dir="ltr">
                      <div className="text-xl sm:text-2xl font-medium text-slate-900 leading-relaxed font-english flex flex-wrap items-center text-left" dir="ltr">
                        {words.map((w, wIdx) => {
                          const isWordActive = isSpeakingThisSentence && activeWordIndexInSentence === wIdx;
                          return (
                            <span
                              key={wIdx}
                              onClick={() => handleWordClick(w)}
                              className={`word-token ${isWordActive ? 'active-speaking' : ''}`}
                            >
                              {w}
                            </span>
                          );
                        })}
                      </div>

                      {/* Collapsible Urdu Translation: Strict RTL and text-right */}
                      {isTranslationVisible(sent.id) && (
                        <div className="mt-3 pt-2.5 border-t border-slate-100/80 flex items-start justify-between gap-2" dir="rtl">
                          <p className="text-base sm:text-lg text-emerald-800 font-urdu leading-loose text-right flex-1" dir="rtl">
                            {sent.urdu}
                          </p>
                          <button
                            onClick={() => toggleSentenceTranslation(sent.id)}
                            className="text-slate-400 hover:text-slate-600 p-1 shrink-0"
                            title="Hide translation"
                          >
                            <EyeOff className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}

                      {!isTranslationVisible(sent.id) && (
                        <div className="text-right" dir="rtl">
                          <button
                            onClick={() => toggleSentenceTranslation(sent.id)}
                            className="mt-2 text-xs font-medium text-slate-400 hover:text-emerald-700 inline-flex items-center gap-1 font-urdu transition-colors"
                            dir="rtl"
                          >
                            <Eye className="w-3 h-3" />
                            <span>اردو ترجمہ دیکھنے کے لیے کلک کریں</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Pagination Controls */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => setCurrentPageIndex(prev => Math.max(0, prev - 1))}
              disabled={currentPageIndex === 0}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                currentPageIndex === 0 
                  ? 'opacity-40 cursor-not-allowed text-slate-400 bg-slate-100' 
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous (پچھلا صفحہ)</span>
            </button>

            {/* Page Dots */}
            <div className="flex items-center gap-2">
              {story.pages.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={() => setCurrentPageIndex(dotIdx)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    currentPageIndex === dotIdx 
                      ? 'w-7 bg-amber-500' 
                      : 'bg-slate-200 hover:bg-slate-300'
                  }`}
                  aria-label={`Go to page ${dotIdx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => {
                if (currentPageIndex < story.pages.length - 1) {
                  setCurrentPageIndex(prev => prev + 1);
                } else {
                  stopSpeech();
                  onBack();
                }
              }}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold bg-amber-500 hover:bg-amber-600 text-white transition-all shadow-xs"
            >
              <span>{currentPageIndex < story.pages.length - 1 ? 'Next (اگلا صفحہ)' : 'Complete (مکمل ہوا)'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Floating Word Inspector Modal */}
      {selectedWord && (
        <WordInspectorModal
          word={selectedWord}
          onClose={() => setSelectedWord(null)}
        />
      )}
    </div>
  );
};
