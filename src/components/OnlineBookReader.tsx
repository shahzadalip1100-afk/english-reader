import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, ChevronLeft, ChevronRight, Download, Volume2, Square,
  BookOpen, Sparkles, Sliders, Search, Bookmark, BookmarkCheck,
  Maximize2, Minimize2, ZoomIn, ZoomOut, Sun, Moon, Coffee,
  List, CheckCircle2, FileText, Share2, HelpCircle
} from 'lucide-react';
import { LibraryBook, BookChapter, downloadBookFile } from '../data/libraryBooks';
import { speakWord, speakSentence, stopSpeech } from '../utils/speech';
import { WordInspectorModal } from './WordInspectorModal';
import { BookFrontCover } from './BookFrontCover';

interface OnlineBookReaderProps {
  book: LibraryBook;
  onClose: () => void;
}

type ReaderTheme = 'day' | 'sepia' | 'night';
type ReaderMode = 'interactive' | 'book';

export const OnlineBookReader: React.FC<OnlineBookReaderProps> = ({ book, onClose }) => {
  // Page index: 0 is Front Cover, 1..N are chapters
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);
  const [readerTheme, setReaderTheme] = useState<ReaderTheme>('day');
  const [readerMode, setReaderMode] = useState<ReaderMode>('interactive');
  const [fontSize, setFontSize] = useState<number>(18);
  const [showUrduTranslation, setShowUrduTranslation] = useState<boolean>(true);
  const [isTocOpen, setIsTocOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [speechRate, setSpeechRate] = useState<number>(0.85);

  // Audio speech playback tracking
  const [isReadingPage, setIsReadingPage] = useState<boolean>(false);
  const [speakingSentenceId, setSpeakingSentenceId] = useState<string | null>(null);
  const [activeWordIndexInSentence, setActiveWordIndexInSentence] = useState<number | null>(null);

  const totalPages = book.chapters.length; // Chapters count
  const isCoverPage = currentPageIndex === 0;
  const currentChapter: BookChapter | undefined = !isCoverPage 
    ? book.chapters[currentPageIndex - 1] 
    : undefined;

  // Cleanup speech on page change or unmount
  useEffect(() => {
    stopSpeech();
    setIsReadingPage(false);
    setSpeakingSentenceId(null);
    setActiveWordIndexInSentence(null);
    return () => {
      stopSpeech();
    };
  }, [currentPageIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'ArrowRight') {
        goToNextPage();
      } else if (e.key === 'ArrowLeft') {
        goToPrevPage();
      } else if (e.key === 'Escape') {
        if (isTocOpen) setIsTocOpen(false);
        else onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPageIndex, totalPages, isTocOpen]);

  const goToNextPage = () => {
    if (currentPageIndex < totalPages) {
      setCurrentPageIndex(prev => prev + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(prev => prev - 1);
    }
  };

  const handleWordClick = (word: string) => {
    stopSpeech();
    setIsReadingPage(false);
    setSpeakingSentenceId(null);
    const clean = word.replace(/[.,/#!$%^&*;:{}=\-_`~()?"']/g, '');
    speakWord(clean, speechRate);
    setSelectedWord(clean);
  };

  const handleReadSentence = (sentence: { id: string; english: string; urdu: string }) => {
    if (speakingSentenceId === sentence.id) {
      stopSpeech();
      setSpeakingSentenceId(null);
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

  const handleReadFullPage = () => {
    if (isReadingPage) {
      stopSpeech();
      setIsReadingPage(false);
      setSpeakingSentenceId(null);
      return;
    }

    if (!currentChapter || !currentChapter.sentences || currentChapter.sentences.length === 0) return;

    setIsReadingPage(true);
    let index = 0;

    const playNext = () => {
      if (index >= currentChapter.sentences.length) {
        setIsReadingPage(false);
        setSpeakingSentenceId(null);
        setActiveWordIndexInSentence(null);
        return;
      }

      const item = currentChapter.sentences[index];
      setSpeakingSentenceId(item.id);

      speakSentence(item.english, {
        rate: speechRate,
        onWordBoundary: (wIdx) => {
          setActiveWordIndexInSentence(wIdx);
        },
        onEnd: () => {
          index++;
          playNext();
        },
        onError: () => {
          setIsReadingPage(false);
          setSpeakingSentenceId(null);
        }
      });
    };

    playNext();
  };

  // Theme styling classes
  const themeClasses = {
    day: 'bg-slate-50 text-slate-900 border-slate-200',
    sepia: 'bg-[#FAF6EE] text-[#433422] border-[#E8DFC8]',
    night: 'bg-slate-900 text-slate-100 border-slate-800'
  }[readerTheme];

  const paperClasses = {
    day: 'bg-white shadow-xl border-slate-200 text-slate-900',
    sepia: 'bg-[#FDFBF7] shadow-xl border-[#E8DFC8] text-[#3D2F1D]',
    night: 'bg-slate-800/90 shadow-xl border-slate-700 text-slate-100'
  }[readerTheme];

  return (
    <div className={`fixed inset-0 z-50 flex flex-col ${themeClasses} select-text overflow-hidden transition-colors duration-200`}>
      
      {/* Top Controls & Navigation Bar */}
      <header className={`px-4 py-3 border-b flex items-center justify-between gap-3 shrink-0 ${
        readerTheme === 'night' ? 'bg-slate-900/95 border-slate-800 text-white' : 'bg-white/95 border-slate-200 text-slate-800'
      } backdrop-blur-md`}>
        
        {/* Left: Back button & Title */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={() => {
              stopSpeech();
              onClose();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-sm font-semibold transition-all shrink-0 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Library (واپس)</span>
          </button>

          <div className="h-5 w-px bg-slate-300 dark:bg-slate-700 hidden sm:block"></div>

          <div className="min-w-0">
            <h1 className="text-sm sm:text-base font-extrabold truncate font-english">
              {book.title}
            </h1>
            <div className="text-xs text-amber-600 dark:text-amber-400 font-urdu truncate" dir="rtl">
              {book.urduTitle}
            </div>
          </div>
        </div>

        {/* Center: Page Controls */}
        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={goToPrevPage}
            disabled={currentPageIndex === 0}
            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-40 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Previous Page (پچھلا صفحہ)"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <span className="text-xs font-bold px-2 whitespace-nowrap">
            {isCoverPage ? (
              <span className="text-amber-600 dark:text-amber-400">Front Cover (سرورق)</span>
            ) : (
              <span>Page {currentPageIndex} of {totalPages} (صفحہ {currentPageIndex} از {totalPages})</span>
            )}
          </span>

          <button
            onClick={goToNextPage}
            disabled={currentPageIndex === totalPages}
            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-40 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Next Page (اگلا صفحہ)"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Right: Actions (Download, Theme, Mode, TOC) */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          
          {/* Table of contents button */}
          <button
            onClick={() => setIsTocOpen(!isTocOpen)}
            className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1 border transition-colors ${
              isTocOpen 
                ? 'bg-indigo-600 text-white border-indigo-600' 
                : 'border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
            title="Table of Contents (فہرست ابواب)"
          >
            <List className="w-4 h-4" />
            <span className="hidden xl:inline">Chapters</span>
          </button>

          {/* Theme Switcher */}
          <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-xl p-0.5">
            <button
              onClick={() => setReaderTheme('day')}
              className={`p-1.5 rounded-lg text-xs transition-colors ${readerTheme === 'day' ? 'bg-amber-100 text-amber-900 font-bold' : 'text-slate-500'}`}
              title="Day Mode (روشن موڈ)"
            >
              <Sun className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setReaderTheme('sepia')}
              className={`p-1.5 rounded-lg text-xs transition-colors ${readerTheme === 'sepia' ? 'bg-[#EBDDC3] text-[#433422] font-bold' : 'text-slate-500'}`}
              title="Sepia Mode (کتابی موڈ)"
            >
              <Coffee className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setReaderTheme('night')}
              className={`p-1.5 rounded-lg text-xs transition-colors ${readerTheme === 'night' ? 'bg-slate-700 text-white font-bold' : 'text-slate-500'}`}
              title="Night Mode (نائٹ موڈ)"
            >
              <Moon className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Font Size Scaling */}
          <div className="hidden sm:flex items-center border border-slate-200 dark:border-slate-700 rounded-xl p-0.5 text-xs font-bold">
            <button
              onClick={() => setFontSize(prev => Math.max(14, prev - 2))}
              className="px-2 py-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
              title="Smaller Font"
            >
              A-
            </button>
            <button
              onClick={() => setFontSize(prev => Math.min(26, prev + 2))}
              className="px-2 py-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
              title="Larger Font"
            >
              A+
            </button>
          </div>

          {/* Download Book Button */}
          <button
            onClick={() => downloadBookFile(book)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs transition-all active:scale-95"
            title="Download Book to your Computer (کتاب ڈاؤنلوڈ کریں)"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Download</span>
            <span className="font-urdu text-[11px]" dir="rtl">(ڈاؤنلوڈ)</span>
          </button>
        </div>
      </header>

      {/* Reading Progress Line */}
      <div className="w-full bg-slate-200 dark:bg-slate-800 h-1">
        <div 
          className="bg-gradient-to-r from-amber-500 to-emerald-500 h-full transition-all duration-300"
          style={{ width: `${((currentPageIndex) / totalPages) * 100}%` }}
        ></div>
      </div>

      {/* Main Reading Stage */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* Table of Contents Drawer */}
        {isTocOpen && (
          <aside className={`w-80 shrink-0 border-r ${
            readerTheme === 'night' ? 'bg-slate-850 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-800'
          } p-4 overflow-y-auto flex flex-col z-20 shadow-2xl animate-in slide-in-from-left duration-200`}>
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-700 mb-3">
              <div className="font-extrabold text-sm font-english flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-amber-500" />
                <span>Table of Contents</span>
              </div>
              <span className="text-xs font-urdu text-slate-500" dir="rtl">فہرست ابواب</span>
            </div>

            <div className="space-y-1.5 flex-1">
              {/* Front Cover Entry */}
              <button
                onClick={() => {
                  setCurrentPageIndex(0);
                  setIsTocOpen(false);
                }}
                className={`w-full text-left p-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
                  currentPageIndex === 0 
                    ? 'bg-amber-500 text-white font-bold' 
                    : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span>Front Cover & Details</span>
                <span className="font-urdu" dir="rtl">سرورق و تعارف</span>
              </button>

              {/* Chapters list */}
              {book.chapters.map((ch, idx) => {
                const pageNum = idx + 1;
                const isActive = currentPageIndex === pageNum;
                return (
                  <button
                    key={ch.pageNumber}
                    onClick={() => {
                      setCurrentPageIndex(pageNum);
                      setIsTocOpen(false);
                    }}
                    className={`w-full text-left p-2.5 rounded-xl text-xs flex flex-col gap-0.5 transition-colors ${
                      isActive 
                        ? 'bg-indigo-600 text-white font-bold' 
                        : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold">Page {pageNum}: {ch.title}</span>
                    </div>
                    <div className={`text-[11px] font-urdu text-right ${isActive ? 'text-indigo-100' : 'text-slate-500'}`} dir="rtl">
                      {ch.urduTitle}
                    </div>
                  </button>
                );
              })}
            </div>
          </aside>
        )}

        {/* Center Stage: The Book Page */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 flex justify-center items-start">
          
          {/* VIEW A: FRONT COVER DISPLAY (Page 0) */}
          {isCoverPage ? (
            <div className="max-w-4xl w-full my-auto animate-in fade-in duration-300">
              <div className={`${paperClasses} rounded-3xl p-6 sm:p-10 border flex flex-col md:flex-row items-center gap-8 shadow-2xl`}>
                
                {/* 3D Book Cover View */}
                <div className="flex flex-col items-center">
                  <BookFrontCover book={book} size="lg" showHoverAction={false} />
                  <div className="mt-3 text-xs text-slate-500 dark:text-slate-400 font-urdu text-center" dir="rtl">
                    کتاب کا مکمل فرنٹ پیج (سرورق)
                  </div>
                </div>

                {/* Book Details, Synopsis & Actions */}
                <div className="flex-1 space-y-5 text-left">
                  <div>
                    <span className="inline-block px-3 py-1 bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-xs font-bold rounded-full uppercase tracking-wider mb-2">
                      {book.categoryLabelEng} · {book.categoryLabelUrdu}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold font-english leading-tight mb-2">
                      {book.title}
                    </h2>
                    <h3 className="text-lg sm:text-xl font-bold font-urdu text-amber-700 dark:text-amber-400 text-right leading-relaxed" dir="rtl">
                      {book.urduTitle}
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 py-3 border-y border-slate-200 dark:border-slate-700 text-xs">
                    <div>
                      <div className="text-slate-400 text-[11px]">Author / مصنف</div>
                      <div className="font-bold truncate">{book.author}</div>
                    </div>
                    <div>
                      <div className="text-slate-400 text-[11px]">Total Pages / کل صفحات</div>
                      <div className="font-bold">{totalPages} Interactive Pages</div>
                    </div>
                    <div>
                      <div className="text-slate-400 text-[11px]">Format / فارمیٹ</div>
                      <div className="font-bold">{book.fileType} ({book.fileSize})</div>
                    </div>
                  </div>

                  <p className="text-sm font-urdu text-slate-600 dark:text-slate-300 leading-relaxed text-right" dir="rtl">
                    {book.descriptionUrdu}
                  </p>

                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal font-english">
                    {book.description}
                  </p>

                  {/* Primary Call to Actions */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      onClick={goToNextPage}
                      className="flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-2xl shadow-lg transition-all active:scale-95 cursor-pointer text-sm"
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>Start Reading (آن لائن پڑھنا شروع کریں)</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => downloadBookFile(book)}
                      className="flex items-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-md transition-all active:scale-95 cursor-pointer text-sm"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download Book (کتاب ڈاؤنلوڈ کریں)</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>
          ) : currentChapter ? (
            /* VIEW B: CHAPTER / BOOK PAGE VIEW */
            <div className="max-w-4xl w-full space-y-6 animate-in fade-in duration-200">
              
              <div className={`${paperClasses} rounded-3xl p-6 sm:p-10 border transition-all duration-300`}>
                
                {/* Chapter Heading Banner */}
                <div className="pb-6 border-b border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                      Page {currentChapter.pageNumber} of {totalPages}
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black font-english text-left">
                      {currentChapter.title}
                    </h2>
                    <h3 className="text-base sm:text-lg font-bold font-urdu text-amber-700 dark:text-amber-400 text-right mt-1" dir="rtl">
                      {currentChapter.urduTitle}
                    </h3>
                  </div>

                  {/* Audio Controls for this Page */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={handleReadFullPage}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs shadow-xs transition-all active:scale-95 cursor-pointer ${
                        isReadingPage 
                          ? 'bg-rose-600 text-white animate-pulse' 
                          : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                      }`}
                    >
                      {isReadingPage ? (
                        <>
                          <Square className="w-4 h-4" />
                          <span>Stop Audio (آواز روکیں)</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-4 h-4" />
                          <span>Listen Page (پورا صفحہ سنیں)</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => setShowUrduTranslation(!showUrduTranslation)}
                      className={`p-2.5 rounded-xl border text-xs font-bold transition-colors ${
                        showUrduTranslation 
                          ? 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-900/40 dark:text-amber-200' 
                          : 'border-slate-300 text-slate-500 hover:bg-slate-100'
                      }`}
                      title="Toggle Urdu Translations (اردو ترجمہ چھپائیں یا دکھائیں)"
                    >
                      ترجمہ
                    </button>
                  </div>
                </div>

                {/* Chapter Overview Text */}
                {currentChapter.contentEnglish && (
                  <div className="my-6 p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700/60 space-y-2">
                    <p className="font-english leading-relaxed font-medium" style={{ fontSize: `${fontSize - 1}px` }}>
                      {currentChapter.contentEnglish}
                    </p>
                    {showUrduTranslation && (
                      <p className="font-urdu text-slate-600 dark:text-slate-300 leading-relaxed text-right border-t border-slate-200 dark:border-slate-700 pt-2" dir="rtl" style={{ fontSize: `${fontSize - 2}px` }}>
                        {currentChapter.contentUrdu}
                      </p>
                    )}
                  </div>
                )}

                {/* Interactive Sentences: Word-by-word Clickable Reading */}
                <div className="space-y-4">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                    <span>Interactive Sentences & Clickable Words</span>
                    <span className="font-urdu text-[11px]" dir="rtl">کسی بھی لفظ پر کلک کر کے آواز اور معنی دیکھیں</span>
                  </div>

                  {currentChapter.sentences.map((sentence, sIdx) => {
                    const isSpeakingThis = speakingSentenceId === sentence.id;
                    const words = sentence.english.split(' ');

                    return (
                      <div
                        key={sentence.id}
                        className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 ${
                          isSpeakingThis
                            ? 'bg-amber-50 dark:bg-amber-950/30 border-amber-400 ring-2 ring-amber-300/40'
                            : 'bg-white/60 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/80 hover:border-indigo-300'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          
                          {/* Sentence Words Flow */}
                          <div className="flex-1 flex flex-wrap gap-x-2 gap-y-2 leading-relaxed" style={{ fontSize: `${fontSize}px` }}>
                            {words.map((word, wIdx) => {
                              const isHighlightedWord = isSpeakingThis && activeWordIndexInSentence === wIdx;
                              return (
                                <span
                                  key={wIdx}
                                  onClick={() => handleWordClick(word)}
                                  className={`inline-block px-1 py-0.5 rounded cursor-pointer transition-all ${
                                    isHighlightedWord
                                      ? 'bg-amber-400 text-slate-900 font-extrabold scale-110 shadow-sm'
                                      : 'hover:bg-amber-200 hover:text-slate-900 font-semibold'
                                  }`}
                                  title="Click to hear pronunciation & meaning (لفظ پر کلک کریں)"
                                >
                                  {word}
                                </span>
                              );
                            })}
                          </div>

                          {/* Sentence Audio Button */}
                          <button
                            onClick={() => handleReadSentence(sentence)}
                            className={`p-2 rounded-xl transition-all shrink-0 cursor-pointer ${
                              isSpeakingThis
                                ? 'bg-amber-500 text-white shadow-md'
                                : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200'
                            }`}
                            title="Play sentence audio (جملہ سنیں)"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Urdu Translation of Sentence */}
                        {showUrduTranslation && (
                          <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-700/50 text-right" dir="rtl">
                            <span className="font-urdu text-amber-800 dark:text-amber-300 font-medium leading-loose" style={{ fontSize: `${fontSize - 2}px` }}>
                              {sentence.urdu}
                            </span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Bottom Page Navigation in Paper */}
                <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between gap-4">
                  <button
                    onClick={goToPrevPage}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold transition-all cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous (پچھلا صفحہ)</span>
                  </button>

                  <div className="text-xs font-bold text-slate-500">
                    {currentPageIndex} / {totalPages}
                  </div>

                  <button
                    onClick={goToNextPage}
                    disabled={currentPageIndex >= totalPages}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:opacity-40 text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
                  >
                    <span>Next (اگلا صفحہ)</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

              </div>

            </div>
          ) : null}

        </main>
      </div>

      {/* Floating Word Inspector Modal when any word is clicked */}
      {selectedWord && (
        <WordInspectorModal
          word={selectedWord}
          onClose={() => setSelectedWord(null)}
        />
      )}

    </div>
  );
};
