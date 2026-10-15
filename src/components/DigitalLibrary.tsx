import React, { useState, useEffect } from 'react';
import { 
  BookOpen, Download, Plus, Search, Sparkles, Filter, 
  Trash2, Star, CheckCircle2, ArrowRight, Eye, FileText,
  Bookmark, Award, Globe, BookMarked
} from 'lucide-react';
import { 
  LibraryBook, getStoredLibraryBooks, deleteCustomLibraryBook, 
  downloadBookFile 
} from '../data/libraryBooks';
import { BookFrontCover } from './BookFrontCover';
import { OnlineBookReader } from './OnlineBookReader';
import { BookUploadModal } from './BookUploadModal';

interface DigitalLibraryProps {
  onOpenUploadModal?: () => void;
}

export const DigitalLibrary: React.FC<DigitalLibraryProps> = () => {
  const [books, setBooks] = useState<LibraryBook[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeReadingBook, setActiveReadingBook] = useState<LibraryBook | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [bookToDelete, setBookToDelete] = useState<LibraryBook | null>(null);

  // Load books on mount
  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = () => {
    const list = getStoredLibraryBooks();
    setBooks(list);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleBookUploaded = (newBook: LibraryBook) => {
    setBooks(prev => [newBook, ...prev.filter(b => b.id !== newBook.id)]);
    showToast(`کتاب "${newBook.title}" کامیابی سے فرنٹ پیج کے ساتھ شامل ہو گئی!`);
    // Optionally open the reader immediately:
    setActiveReadingBook(newBook);
  };

  const handleDeleteBook = (book: LibraryBook) => {
    deleteCustomLibraryBook(book.id);
    setBooks(prev => prev.filter(b => b.id !== book.id));
    setBookToDelete(null);
    showToast('کتاب کامیابی سے حذف کر دی گئی ہے۔');
  };

  const categories = [
    { key: 'all', nameEng: 'All Books', nameUrdu: 'تمام کتب' },
    { key: 'grammar', nameEng: 'Grammar & 12 Tenses', nameUrdu: 'گرامر و ۱۲ ٹینسز' },
    { key: 'spoken', nameEng: 'Spoken English', nameUrdu: 'روزمرہ بول چال' },
    { key: 'stories', nameEng: 'Moral Fables', nameUrdu: 'اخلاقی کہانیاں' },
    { key: 'phonics', nameEng: 'Phonics & Reading', nameUrdu: 'فونیکس و تلفظ' },
    { key: 'science', nameEng: 'Science & Nature', nameUrdu: 'سائنس و کائنات' },
    { key: 'school', nameEng: 'School Syllabus', nameUrdu: 'سکول نصاب' },
    { key: 'custom', nameEng: 'My Uploads', nameUrdu: 'میری شامل کردہ کتب' },
  ];

  // Filter books
  const filteredBooks = books.filter(b => {
    const matchesCategory = 
      activeCategory === 'all' 
        ? true 
        : activeCategory === 'custom' 
          ? b.isUserUploaded 
          : b.category === activeCategory;

    if (!matchesCategory) return false;

    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      b.title.toLowerCase().includes(q) ||
      b.urduTitle.toLowerCase().includes(q) ||
      b.author.toLowerCase().includes(q) ||
      b.description.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-slate-900 text-white rounded-2xl shadow-xl animate-in slide-in-from-bottom duration-200 text-sm font-urdu font-medium" dir="rtl">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Online Book Reader View if a book is being read */}
      {activeReadingBook && (
        <OnlineBookReader
          book={activeReadingBook}
          onClose={() => setActiveReadingBook(null)}
        />
      )}

      {/* Hero Header for Digital Library */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-900 via-indigo-950 to-amber-950 text-white shadow-xl border border-white/10 p-6 sm:p-10">
        
        {/* Subtle decorative glow */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-3 text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-400/30 text-xs font-bold rounded-full uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Digital English-Urdu Book Library & Reader</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black font-english leading-tight tracking-tight">
              Interactive Digital Library & Book Shelf
            </h1>

            <p className="text-sm sm:text-base font-urdu text-amber-100/90 leading-relaxed text-right" dir="rtl">
              ہر کتاب کے فرنٹ پیج (سرورق) کے ساتھ آن لائن پڑھیں، لفظ بہ لفظ درست تلفظ اور با محاورہ اردو ترجمہ دیکھیں، اور براہِ راست اپنے کمپیوٹر یا موبائل میں ڈاؤنلوڈ کریں۔
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-300">
              <span className="flex items-center gap-1.5 font-semibold">
                <BookOpen className="w-4 h-4 text-amber-400" />
                <span>{books.length} Books Available</span>
              </span>
              <span className="hidden sm:inline">·</span>
              <span className="flex items-center gap-1.5 font-semibold">
                <Download className="w-4 h-4 text-emerald-400" />
                <span>100% Free Downloads</span>
              </span>
              <span className="hidden sm:inline">·</span>
              <span className="flex items-center gap-1.5 font-semibold">
                <Eye className="w-4 h-4 text-sky-400" />
                <span>Online Audio Reader</span>
              </span>
            </div>
          </div>

          {/* Action: Upload Book Button */}
          <div className="flex flex-col sm:flex-row lg:flex-col items-center gap-3 shrink-0 w-full sm:w-auto">
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-extrabold rounded-2xl shadow-xl hover:shadow-amber-500/25 transition-all duration-200 active:scale-95 cursor-pointer text-sm"
            >
              <Plus className="w-5 h-5" />
              <span>Upload Book (نئی کتاب شامل کریں)</span>
            </button>

            <div className="text-center text-[11px] text-amber-200/70 font-urdu" dir="rtl">
              پی ڈی ایف، تصاویر یا ڈاکومنٹ اپلوڈ کریں
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar & Categories Row */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search books by title, author, or keyword (کتاب تلاش کریں)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            )}
          </div>

          {/* Books Count Badge */}
          <div className="text-xs font-bold text-slate-500 flex items-center justify-end gap-1.5">
            <span>Showing {filteredBooks.length} of {books.length} Books</span>
            <span className="font-urdu" dir="rtl">(کتابیں دستیاب ہیں)</span>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map(cat => {
            const count = cat.key === 'all' 
              ? books.length 
              : cat.key === 'custom' 
                ? books.filter(b => b.isUserUploaded).length 
                : books.filter(b => b.category === cat.key).length;

            return (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeCategory === cat.key
                    ? 'bg-indigo-900 text-white shadow-sm font-bold'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                }`}
              >
                <span>{cat.nameEng}</span>
                <span className="font-urdu text-[11px] opacity-80" dir="rtl">{cat.nameUrdu}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${activeCategory === cat.key ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Book Shelf Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Upload Card Prompt in the Shelf */}
        <div
          onClick={() => setIsUploadModalOpen(true)}
          className="border-2 border-dashed border-amber-300 hover:border-amber-500 bg-amber-50/40 hover:bg-amber-50 rounded-3xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all min-h-[340px] group shadow-2xs hover:shadow-md"
        >
          <div className="w-16 h-16 rounded-2xl bg-amber-100 group-hover:scale-110 text-amber-600 flex items-center justify-center mb-4 transition-transform shadow-xs">
            <Plus className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-extrabold text-slate-800 mb-1 font-english">
            Add Your Book to Library
          </h3>
          <div className="text-sm font-bold text-amber-800 font-urdu mb-2" dir="rtl">
            اپنی کتاب فرنٹ پیج کے ساتھ شامل کریں
          </div>
          <p className="text-xs text-slate-500 max-w-xs font-urdu leading-relaxed" dir="rtl">
            پی ڈی ایف، ڈاکومنٹ یا اسباق کی فائل اپلوڈ کریں، وہ فوری طور پر اپنے سرورق کے ساتھ نظر آئے گی اور آن لائن پڑھی جا سکے گی۔
          </p>
        </div>

        {/* Book Cards */}
        {filteredBooks.map((book) => (
          <div
            key={book.id}
            className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs hover:shadow-xl hover:border-amber-400 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
          >
            {/* User-uploaded badge */}
            {book.isUserUploaded && (
              <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 font-urdu" dir="rtl">
                  آپ کی کتاب
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setBookToDelete(book);
                  }}
                  className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors"
                  title="Delete Book (کتاب حذف کریں)"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Top Section: Front Cover & Basic Info */}
            <div className="flex gap-4 items-start">
              
              {/* Front Cover Display */}
              <div 
                onClick={() => setActiveReadingBook(book)}
                className="cursor-pointer"
                title="Click to Read Online (آن لائن پڑھیں)"
              >
                <BookFrontCover book={book} size="md" />
              </div>

              {/* Book Metadata */}
              <div className="flex-1 space-y-2 min-w-0">
                <div className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md inline-block">
                  {book.categoryLabelEng}
                </div>

                <h3 
                  onClick={() => setActiveReadingBook(book)}
                  className="text-base font-extrabold text-slate-900 font-english group-hover:text-indigo-600 transition-colors leading-snug cursor-pointer line-clamp-2"
                >
                  {book.title}
                </h3>

                <div className="text-xs font-bold text-amber-800 font-urdu line-clamp-1 text-right" dir="rtl">
                  {book.urduTitle}
                </div>

                <div className="text-[11px] text-slate-500 truncate">
                  By {book.author}
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-2 text-[10px] text-slate-500 font-semibold">
                  <span className="px-2 py-0.5 bg-slate-100 rounded-md">
                    {book.chapters.length} Pages
                  </span>
                  <span className="px-2 py-0.5 bg-slate-100 rounded-md">
                    {book.fileType}
                  </span>
                  <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 font-bold rounded-md">
                    ★ {book.rating.toFixed(1)}
                  </span>
                </div>
              </div>

            </div>

            {/* Middle: Short Description in Urdu */}
            <div className="my-3 py-2 border-t border-slate-100">
              <p className="text-xs text-slate-600 font-urdu line-clamp-2 leading-relaxed text-right" dir="rtl">
                {book.descriptionUrdu}
              </p>
            </div>

            {/* Bottom Actions: Read Online & Download */}
            <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2">
              <button
                onClick={() => setActiveReadingBook(book)}
                className="flex items-center justify-center gap-1.5 px-3 py-2.5 bg-indigo-900 hover:bg-indigo-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs active:scale-95 cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                <span>Read Online</span>
                <span className="font-urdu text-[11px]" dir="rtl">(پڑھیں)</span>
              </button>

              <button
                onClick={() => downloadBookFile(book)}
                className="flex items-center justify-center gap-1.5 px-3 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs active:scale-95 cursor-pointer"
                title="Download book to computer (ڈاؤنلوڈ کریں)"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
                <span className="font-urdu text-[11px]" dir="rtl">(ڈاؤنلوڈ)</span>
              </button>
            </div>

          </div>
        ))}

      </div>

      {/* Delete Confirmation Modal */}
      {bookToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-2xl animate-in zoom-in-95">
            <h3 className="text-base font-bold text-slate-900 font-english">
              Delete Book from Library?
            </h3>
            <p className="text-xs text-slate-600 font-urdu text-right" dir="rtl">
              کیا آپ واقعی کتاب "{bookToDelete.title}" کو لائبریری سے حذف کرنا چاہتے ہیں؟
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setBookToDelete(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100"
              >
                منسوخ کریں
              </button>
              <button
                onClick={() => handleDeleteBook(bookToDelete)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 text-white hover:bg-rose-700 shadow-sm"
              >
                ہاں، حذف کریں
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Book Modal */}
      <BookUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onBookUploaded={handleBookUploaded}
      />

    </div>
  );
};
