import React from 'react';
import { Volume2, Volume1, X, BookOpen, Sparkles } from 'lucide-react';
import { WordDefinition, lookupWord } from '../data/dictionary';
import { speakWord } from '../utils/speech';

interface WordInspectorModalProps {
  word: string;
  onClose: () => void;
}

export const WordInspectorModal: React.FC<WordInspectorModalProps> = ({ word, onClose }) => {
  const definition: WordDefinition = lookupWord(word);

  const handlePlayNormal = () => {
    speakWord(definition.word, 0.95);
  };

  const handlePlaySlow = () => {
    speakWord(definition.word, 0.65);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-200" />
            <h3 className="text-sm font-semibold tracking-wide uppercase">Word Inspector · الفاظ و معنی</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/20 transition-colors text-white"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          {/* Main Word Presentation */}
          <div className="text-center space-y-2">
            <div className="text-4xl font-extrabold text-slate-900 tracking-tight font-english">
              {definition.word}
            </div>
            
            {/* Phonetic Pronunciation in Urdu */}
            {definition.transliteration && (
              <div className="text-lg text-amber-700 font-urdu font-medium" dir="rtl">
                تلفظ: <span className="font-bold underline decoration-amber-300 underline-offset-4">{definition.transliteration}</span>
              </div>
            )}

            <div className="inline-block px-3 py-1 bg-amber-50 text-amber-800 text-xs font-semibold rounded-full uppercase tracking-wider">
              {definition.partOfSpeech} · {definition.category}
            </div>
          </div>

          {/* Urdu Meaning Card */}
          <div className="bg-amber-50/60 border border-amber-200/60 rounded-xl p-4 text-center">
            <div className="text-xs font-semibold text-amber-800/80 mb-1">اردو معنی (Urdu Meaning)</div>
            <div className="text-2xl font-bold text-slate-800 font-urdu py-1" dir="rtl">
              {definition.urdu}
            </div>
          </div>

          {/* Audio Pronunciation Controls */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <button
              onClick={handlePlayNormal}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium shadow-xs hover:shadow transition-all active:scale-95"
            >
              <Volume2 className="w-5 h-5" />
              <span>Normal Voice</span>
            </button>

            <button
              onClick={handlePlaySlow}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-xl font-medium border border-amber-300 transition-all active:scale-95"
            >
              <Volume1 className="w-5 h-5" />
              <span>Slow Phonics (آہستہ)</span>
            </button>
          </div>

          {/* Example Sentence */}
          {definition.example && (
            <div className="border-t border-slate-100 pt-4">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 mb-1.5">
                <BookOpen className="w-4 h-4 text-slate-400" />
                <span>Example Sentence:</span>
              </div>
              <p className="text-sm text-slate-700 font-english italic bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                "{definition.example}"
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span className="font-urdu" dir="rtl">بچوں کی آسانی کے لیے مکمل آف لائن</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg font-medium transition-colors"
          >
            بند کریں (Close)
          </button>
        </div>
      </div>
    </div>
  );
};
