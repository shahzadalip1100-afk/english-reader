import React from 'react';
import { BookOpen, Sparkles, Award, FileText } from 'lucide-react';
import { LibraryBook } from '../data/libraryBooks';

interface BookFrontCoverProps {
  book: LibraryBook;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showHoverAction?: boolean;
}

export const BookFrontCover: React.FC<BookFrontCoverProps> = ({
  book,
  size = 'md',
  className = '',
  showHoverAction = true
}) => {
  const getThemeGradient = (theme: LibraryBook['coverTheme']) => {
    switch (theme) {
      case 'royal-blue':
        return 'from-blue-900 via-indigo-900 to-slate-900 border-amber-400/40 text-amber-200';
      case 'emerald-green':
        return 'from-emerald-900 via-teal-900 to-slate-900 border-emerald-400/40 text-emerald-200';
      case 'crimson-ruby':
        return 'from-rose-950 via-red-900 to-amber-950 border-rose-400/40 text-rose-200';
      case 'golden-amber':
        return 'from-amber-950 via-yellow-900 to-stone-900 border-amber-400/50 text-amber-100';
      case 'deep-indigo':
        return 'from-indigo-950 via-violet-900 to-slate-950 border-indigo-400/40 text-indigo-200';
      case 'midnight-space':
        return 'from-slate-950 via-sky-950 to-indigo-950 border-cyan-400/40 text-cyan-200';
      case 'violet-purple':
        return 'from-purple-950 via-fuchsia-950 to-slate-950 border-fuchsia-400/40 text-fuchsia-200';
      default:
        return 'from-slate-900 via-indigo-950 to-blue-950 border-amber-400/40 text-amber-200';
    }
  };

  const dimensions = {
    sm: 'w-24 h-34',
    md: 'w-44 h-64 sm:w-48 sm:h-68',
    lg: 'w-56 h-80 sm:w-64 sm:h-92',
    xl: 'w-72 h-100 sm:w-80 sm:h-112'
  }[size];

  return (
    <div className={`relative ${dimensions} rounded-r-xl rounded-l-xs shadow-xl transition-all duration-300 group overflow-hidden select-none shrink-0 ${className}`}>
      
      {/* 3D Book Spine Effect (Left Edge) */}
      <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r from-black/60 via-white/20 to-black/30 z-20 pointer-events-none"></div>
      <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-black/40 z-20 pointer-events-none"></div>

      {/* Book Cover Content: Either custom image or generated cover artwork */}
      {book.coverImage ? (
        <div className="w-full h-full relative overflow-hidden bg-slate-900">
          <img
            src={book.coverImage}
            alt={book.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {/* Subtle lighting overlay for authentic paper/book texture */}
          <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-white/10 pointer-events-none"></div>

          {/* Top category ribbon */}
          <div className="absolute top-2.5 right-2.5 z-10 bg-black/75 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm border border-white/20">
            {book.categoryLabelUrdu || book.category}
          </div>

          {/* Bottom title banner */}
          <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black via-black/85 to-transparent text-white z-10">
            <div className="text-xs sm:text-sm font-extrabold font-english leading-tight line-clamp-2 drop-shadow">
              {book.title}
            </div>
            <div className="text-[11px] font-bold font-urdu text-amber-300 text-right line-clamp-1 mt-0.5" dir="rtl">
              {book.urduTitle}
            </div>
          </div>
        </div>
      ) : (
        /* Realistic Gilded Book Cover Artwork */
        <div className={`w-full h-full bg-gradient-to-br ${getThemeGradient(book.coverTheme)} p-3.5 flex flex-col justify-between relative border-2`}>
          
          {/* Ornamental Inner Border */}
          <div className="absolute inset-2 border border-white/15 rounded-md pointer-events-none"></div>
          <div className="absolute inset-2.5 border border-amber-300/25 rounded-md pointer-events-none"></div>

          {/* Header Tag & Rating */}
          <div className="relative z-10 flex items-center justify-between text-[10px] font-bold tracking-wider uppercase opacity-90 pl-2">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>{book.fileType}</span>
            </span>
            <span className="text-amber-300 bg-black/40 px-1.5 py-0.5 rounded text-[9px]">
              {book.level}
            </span>
          </div>

          {/* Center Title Zone */}
          <div className="relative z-10 text-center my-auto py-2 pl-2">
            <div className="w-8 h-8 mx-auto mb-2 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-amber-300 shadow-inner">
              <BookOpen className="w-4 h-4" />
            </div>

            <h3 className="text-xs sm:text-sm font-extrabold text-white font-english leading-snug tracking-tight uppercase line-clamp-3 drop-shadow-md">
              {book.title}
            </h3>

            <div className="w-12 h-0.5 bg-amber-400/60 mx-auto my-1.5 rounded-full"></div>

            <div className="text-[11px] sm:text-xs font-bold text-amber-300 font-urdu leading-normal line-clamp-2" dir="rtl">
              {book.urduTitle}
            </div>
          </div>

          {/* Footer Author & Seal */}
          <div className="relative z-10 border-t border-white/15 pt-2 flex items-center justify-between text-[10px] pl-2 text-white/80">
            <div className="truncate max-w-[110px] font-medium">
              {book.author}
            </div>
            <div className="text-amber-400 font-bold flex items-center gap-0.5">
              <span>★</span>
              <span>{book.rating.toFixed(1)}</span>
            </div>
          </div>
        </div>
      )}

      {/* Gloss / Light reflection across the cover */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/20 pointer-events-none"></div>

      {/* Hover Read Indicator */}
      {showHoverAction && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-2xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center text-white p-3 text-center z-30">
          <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-white mb-2 shadow-lg transform group-hover:scale-110 transition-transform">
            <BookOpen className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold font-english">Read Online</span>
          <span className="text-[11px] font-urdu text-amber-300" dir="rtl">آن لائن پڑھیں</span>
        </div>
      )}
    </div>
  );
};
