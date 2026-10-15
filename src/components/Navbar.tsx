import React from 'react';
import { BookOpen, PlusCircle, Bot, Sparkles, Trophy, Library } from 'lucide-react';

export type NavView = 'digital-library' | 'library' | 'custom' | 'vocab' | 'quiz' | 'ai-teacher';

interface NavbarProps {
  activeView: NavView;
  onSelectView: (view: NavView) => void;
  onOpenCreateModal: () => void;
  onOpenBookUploadModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  onSelectView,
  onOpenCreateModal,
  onOpenBookUploadModal
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 px-4 sm:px-6 py-3">
        
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => onSelectView('digital-library')}
          className="flex items-center gap-2.5 text-left text-slate-900 hover:text-indigo-600 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-600 flex items-center justify-center text-white shadow-md">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <div className="text-base sm:text-lg font-black tracking-tight font-english">
              Kids English Reader
            </div>
            <div className="text-2xs text-amber-800 font-urdu -mt-1 hidden sm:block text-right" dir="rtl">
              ڈیجیٹل کتب خانہ و انگلش ریڈر مع اردو ترجمہ
            </div>
          </div>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-4 text-sm font-medium text-slate-600">
          
          {/* DIGITAL LIBRARY TAB (کتب خانہ) */}
          <button
            onClick={() => onSelectView('digital-library')}
            className={`whitespace-nowrap shrink-0 transition-all py-1 px-2.5 rounded-lg flex items-center gap-1.5 cursor-pointer ${
              activeView === 'digital-library'
                ? 'text-indigo-900 font-extrabold bg-indigo-50 border-b-2 border-indigo-600'
                : 'hover:text-indigo-600 font-bold'
            }`}
          >
            <Library className="w-4 h-4 text-amber-500" />
            <span>Digital Library (کتب خانہ)</span>
          </button>

          {/* STORY LESSONS TAB */}
          <button
            onClick={() => onSelectView('library')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer ${
              activeView === 'library'
                ? 'text-indigo-600 font-bold border-b-2 border-indigo-600'
                : 'hover:text-slate-900'
            }`}
          >
            Picture Lessons (اسباق)
          </button>

          {/* MY CUSTOM STORIES */}
          <button
            onClick={() => onSelectView('custom')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer ${
              activeView === 'custom'
                ? 'text-indigo-600 font-bold border-b-2 border-indigo-600'
                : 'hover:text-slate-900'
            }`}
          >
            My Stories (میری کہانیاں)
          </button>

          {/* AI TEACHER */}
          <button
            onClick={() => onSelectView('ai-teacher')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 flex items-center gap-1.5 cursor-pointer ${
              activeView === 'ai-teacher'
                ? 'text-indigo-600 font-bold border-b-2 border-indigo-600'
                : 'text-indigo-700 hover:text-indigo-900 font-semibold'
            }`}
          >
            <Bot className="w-4 h-4 text-amber-500" />
            <span>Ustad AI (استاد اے آئی)</span>
          </button>

          {/* 100K+ VOCABULARY */}
          <button
            onClick={() => onSelectView('vocab')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer ${
              activeView === 'vocab'
                ? 'text-indigo-600 font-bold border-b-2 border-indigo-600'
                : 'hover:text-slate-900'
            }`}
          >
            100K+ Words (1 لاکھ الفاظ)
          </button>

          {/* 100 GAMES */}
          <button
            onClick={() => onSelectView('quiz')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 flex items-center gap-1.5 cursor-pointer ${
              activeView === 'quiz'
                ? 'text-emerald-600 font-bold border-b-2 border-emerald-600'
                : 'text-emerald-700 hover:text-emerald-900 font-semibold'
            }`}
          >
            <Trophy className="w-4 h-4 text-amber-500" />
            <span>100 Games (100 گیمز)</span>
          </button>
        </nav>

        {/* Zone 3: CTA Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          
          {/* Upload Book CTA */}
          <button
            onClick={onOpenBookUploadModal}
            className="flex items-center gap-1.5 px-3 sm:px-4 py-2 text-xs sm:text-sm font-bold text-white bg-amber-500 hover:bg-amber-600 rounded-xl shadow-xs hover:shadow transition-all whitespace-nowrap active:scale-95 cursor-pointer"
            title="Upload new book with front page (نئی کتاب لائبریری میں شامل کریں)"
          >
            <Library className="w-4 h-4" />
            <span className="hidden sm:inline font-english">+ Upload Book</span>
            <span className="font-urdu text-xs" dir="rtl">(کتاب شامل کریں)</span>
          </button>

          {/* Upload Page / Image CTA */}
          <button
            onClick={onOpenCreateModal}
            className="hidden xl:flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all whitespace-nowrap active:scale-95 cursor-pointer"
            title="Upload single picture page (تصویر شامل کریں)"
          >
            <PlusCircle className="w-4 h-4 text-emerald-600" />
            <span>+ Page</span>
          </button>
        </div>
      </div>

      {/* Mobile Secondary Navigation Row */}
      <div className="flex lg:hidden items-center justify-around border-t border-slate-100 bg-slate-50/90 px-2 py-2 text-xs font-semibold text-slate-600 overflow-x-auto gap-1">
        <button
          onClick={() => onSelectView('digital-library')}
          className={`px-3 py-1.5 rounded-lg whitespace-nowrap flex items-center gap-1 ${activeView === 'digital-library' ? 'bg-indigo-900 text-white font-bold shadow-xs' : 'text-slate-700'}`}
        >
          <Library className="w-3.5 h-3.5 text-amber-400" />
          <span>کتب خانہ (Library)</span>
        </button>
        <button
          onClick={() => onSelectView('library')}
          className={`px-2.5 py-1.5 rounded-lg whitespace-nowrap ${activeView === 'library' ? 'bg-indigo-100 text-indigo-700 font-bold' : ''}`}
        >
          اسباق
        </button>
        <button
          onClick={() => onSelectView('custom')}
          className={`px-2.5 py-1.5 rounded-lg whitespace-nowrap ${activeView === 'custom' ? 'bg-indigo-100 text-indigo-700 font-bold' : ''}`}
        >
          میری کہانیاں
        </button>
        <button
          onClick={() => onSelectView('ai-teacher')}
          className={`px-2.5 py-1.5 rounded-lg whitespace-nowrap flex items-center gap-1 ${activeView === 'ai-teacher' ? 'bg-amber-100 text-amber-900 font-bold' : 'text-indigo-700'}`}
        >
          <Bot className="w-3.5 h-3.5 text-amber-600" />
          <span>استاد AI</span>
        </button>
        <button
          onClick={() => onSelectView('vocab')}
          className={`px-2.5 py-1.5 rounded-lg whitespace-nowrap ${activeView === 'vocab' ? 'bg-indigo-100 text-indigo-700 font-bold' : ''}`}
        >
          1 لاکھ الفاظ
        </button>
        <button
          onClick={() => onSelectView('quiz')}
          className={`px-2.5 py-1.5 rounded-lg whitespace-nowrap flex items-center gap-1 ${activeView === 'quiz' ? 'bg-emerald-100 text-emerald-800 font-bold' : 'text-emerald-700'}`}
        >
          <Trophy className="w-3.5 h-3.5 text-amber-500" />
          <span>100 گیمز</span>
        </button>
      </div>
    </header>
  );
};
