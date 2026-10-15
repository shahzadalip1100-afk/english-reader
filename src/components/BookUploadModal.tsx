import React, { useState, useRef } from 'react';
import { 
  Upload, X, Image as ImageIcon, Plus, Trash2, CheckCircle2, 
  AlertCircle, Sparkles, Loader2, FileText, BookOpen, Download
} from 'lucide-react';
import { LibraryBook, saveCustomLibraryBook } from '../data/libraryBooks';

interface BookUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookUploaded: (book: LibraryBook) => void;
}

export const BookUploadModal: React.FC<BookUploadModalProps> = ({
  isOpen,
  onClose,
  onBookUploaded
}) => {
  const [bookTitle, setBookTitle] = useState('');
  const [urduTitle, setUrduTitle] = useState('');
  const [author, setAuthor] = useState('My Collection');
  const [authorUrdu, setAuthorUrdu] = useState('میری ذاتی کتاب');
  const [category, setCategory] = useState<LibraryBook['category']>('stories');
  const [coverTheme, setCoverTheme] = useState<LibraryBook['coverTheme']>('royal-blue');
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(null);
  const [description, setDescription] = useState('Custom uploaded book for English-Urdu reading and practice.');
  const [descriptionUrdu, setDescriptionUrdu] = useState('انگریزی پڑھنے، تلفظ سننے اور اردو ترجمہ سیکھنے کے لیے کتاب۔');
  
  // File upload state
  const [attachedFileName, setAttachedFileName] = useState<string | null>(null);
  const [fileDataUrl, setFileDataUrl] = useState<string | null>(null);
  const [fileSizeStr, setFileSizeStr] = useState<string>('2.5 MB');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Sentences / Chapters
  const [chapterTitle, setChapterTitle] = useState('Chapter 1: Reading Lesson');
  const [chapterUrduTitle, setChapterUrduTitle] = useState('باب ۱: پڑھائی کا سبق');
  const [sentences, setSentences] = useState<{ english: string; urdu: string }[]>([
    { english: 'Welcome to this wonderful English reading book.', urdu: 'اس شاندار انگریزی کتاب میں خوش آمدید۔' },
    { english: 'Read each sentence carefully to improve your vocabulary.', urdu: 'اپنے الفاظ کے ذخیرے کو بہتر بنانے کے لیے ہر جملہ غور سے پڑھیں۔' },
    { english: 'Knowledge brings wisdom and success in life.', urdu: 'علم زندگی میں دانائی اور کامیابی لے کر آتا ہے۔' }
  ]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const coverImageInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  // Handle uploaded document/PDF/image file
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMsg(null);
    setAttachedFileName(file.name);
    const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
    setFileSizeStr(`${sizeMb} MB`);
    setIsProcessing(true);

    const reader = new FileReader();
    reader.onload = async (event) => {
      const result = event.target?.result as string;
      setFileDataUrl(result);

      // Auto-set title from filename if empty
      const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
      if (!bookTitle) {
        setBookTitle(cleanName);
      }

      // If file is an image, also use it as cover image preview
      if (file.type.startsWith('image/')) {
        setCoverImagePreview(result);
      }

      // Attempt AI extraction of text and translation if possible
      setIsProcessing(false);
      extractTextFromFile(result, file.type, file.name);
    };

    reader.onerror = () => {
      setIsProcessing(false);
      setErrorMsg('فائل پڑھنے میں مسئلہ پیش آیا۔ برائے مہربانی دوبارہ کوشش کریں۔');
    };

    reader.readAsDataURL(file);
  };

  // Handle separate cover image upload
  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setCoverImagePreview(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const extractTextFromFile = async (base64: string, mime: string, name: string) => {
    setIsExtracting(true);
    try {
      const res = await fetch('/api/extract-multimodal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileBase64: base64,
          mimeType: mime,
          filename: name,
          fileType: 'pdf'
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.title) setBookTitle(data.title);
        if (data.urduTitle) setUrduTitle(data.urduTitle);
        if (Array.isArray(data.sentences) && data.sentences.length > 0) {
          setSentences(data.sentences.map((s: any) => ({
            english: s.english || '',
            urdu: s.urdu || ''
          })));
        }
      }
    } catch (err) {
      console.warn('Multimodal extraction error (optional fallback)', err);
    } finally {
      setIsExtracting(false);
    }
  };

  const handleAddSentence = () => {
    setSentences(prev => [...prev, { english: '', urdu: '' }]);
  };

  const handleSentenceChange = (idx: number, field: 'english' | 'urdu', val: string) => {
    setSentences(prev => {
      const copy = [...prev];
      copy[idx] = { ...copy[idx], [field]: val };
      return copy;
    });
  };

  const handleRemoveSentence = (idx: number) => {
    if (sentences.length <= 1) return;
    setSentences(prev => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookTitle.trim()) {
      setErrorMsg('برائے مہربانی کتاب کا نام (English Title) درج کریں۔');
      return;
    }

    const validSentences = sentences
      .filter(s => s.english.trim())
      .map((s, idx) => ({
        id: `custom-s-${Date.now()}-${idx}`,
        english: s.english.trim(),
        urdu: s.urdu.trim() || 'اردو ترجمہ'
      }));

    if (validSentences.length === 0) {
      setErrorMsg('کم از کم ایک انگریزی جملہ لازمی درج کریں۔');
      return;
    }

    const newBook: LibraryBook = {
      id: `book-user-${Date.now()}`,
      title: bookTitle.trim(),
      urduTitle: urduTitle.trim() || bookTitle.trim(),
      author: author.trim() || 'Custom Author',
      authorUrdu: authorUrdu.trim() || 'مصنف',
      category,
      categoryLabelEng: category.toUpperCase(),
      categoryLabelUrdu: category === 'grammar' ? 'انگلش گرامر' : category === 'spoken' ? 'روزمرہ بول چال' : 'بچوں کی کہانی',
      coverTheme,
      coverImage: coverImagePreview || undefined,
      description: description.trim(),
      descriptionUrdu: descriptionUrdu.trim(),
      pagesCount: 1,
      fileSize: fileSizeStr,
      fileType: attachedFileName?.endsWith('.pdf') ? 'PDF' : 'Illustrated eBook',
      rating: 5.0,
      level: 'All Ages',
      publishedYear: '2026 Edition',
      featured: true,
      isUserUploaded: true,
      uploadedAt: new Date().toLocaleDateString('ur-PK'),
      originalFileName: attachedFileName || `${bookTitle}.pdf`,
      fileDataUrl: fileDataUrl || undefined,
      chapters: [
        {
          pageNumber: 1,
          title: chapterTitle || 'Chapter 1: Reading Lesson',
          urduTitle: chapterUrduTitle || 'پہلا باب: انگریزی پڑھائی',
          contentEnglish: validSentences.map(s => s.english).join(' '),
          contentUrdu: validSentences.map(s => s.urdu).join(' '),
          sentences: validSentences
        }
      ]
    };

    saveCustomLibraryBook(newBook);
    onBookUploaded(newBook);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-3xl overflow-hidden my-auto animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-amber-700 text-white p-5 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 flex items-center justify-center text-white shadow-md">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black font-english">
                Upload Book to Digital Library
              </h2>
              <div className="text-xs text-amber-200 font-urdu" dir="rtl">
                نئی کتاب فرنٹ پیج کے ساتھ شامل کریں (آن لائن پڑھنے اور ڈاؤنلوڈ کے لیے)
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs font-urdu flex items-center gap-2" dir="rtl">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* SECTION 1: File Upload & Auto-Detection */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              1. Upload Book File (PDF, Document, Images, Book Scan)
            </label>
            <div className="text-xs text-slate-500 font-urdu text-right" dir="rtl">
              کمپیوٹر سے پی ڈی ایف (PDF)، ورڈ ڈاکومنٹ، یا کتاب کا صفحہ اپلوڈ کریں
            </div>

            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-indigo-300 hover:border-indigo-600 bg-indigo-50/50 hover:bg-indigo-50 rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all group"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx,.txt,image/*"
                onChange={handleFileUpload}
                className="hidden"
              />

              <div className="w-12 h-12 rounded-2xl bg-indigo-100 group-hover:scale-110 text-indigo-600 flex items-center justify-center mb-2 transition-transform">
                <Upload className="w-6 h-6" />
              </div>

              {attachedFileName ? (
                <div className="text-sm font-bold text-indigo-900 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{attachedFileName} ({fileSizeStr})</span>
                </div>
              ) : (
                <>
                  <div className="text-sm font-bold text-indigo-900">
                    Click to Choose Book File (کتاب کی فائل منتخب کریں)
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    Supports PDF, DOC, Images (JPG, PNG, WebP)
                  </div>
                </>
              )}

              {isExtracting && (
                <div className="mt-3 flex items-center gap-2 text-xs font-bold text-amber-600 animate-pulse font-urdu" dir="rtl">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>AI کتاب سے انگریزی الفاظ اور اردو ترجمہ نکال رہا ہے...</span>
                </div>
              )}
            </div>
          </div>

          {/* SECTION 2: Front Page Cover Selector */}
          <div className="space-y-3 pt-2 border-t border-slate-200">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                2. Front Page / Cover (کتاب کا فرنٹ پیج / سرورق)
              </label>
              <span className="text-xs font-urdu text-amber-700" dir="rtl">
                سرورق کی تصویر اپلوڈ کریں یا ڈیزائن منتخب کریں
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200">
              
              {/* Cover Preview */}
              <div className="w-24 h-32 rounded-r-lg rounded-l-xs bg-slate-900 border border-slate-300 shadow-md flex items-center justify-center overflow-hidden shrink-0 relative">
                {coverImagePreview ? (
                  <img src={coverImagePreview} alt="Cover" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center p-2 text-white">
                    <BookOpen className="w-6 h-6 mx-auto mb-1 text-amber-400" />
                    <div className="text-[9px] font-bold uppercase line-clamp-2">{bookTitle || 'Front Cover'}</div>
                  </div>
                )}
              </div>

              {/* Cover Controls */}
              <div className="flex-1 space-y-3 w-full">
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => coverImageInputRef.current?.click()}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 hover:border-indigo-500 rounded-xl text-xs font-bold text-slate-700 hover:text-indigo-600 transition-colors cursor-pointer"
                  >
                    <ImageIcon className="w-4 h-4 text-indigo-500" />
                    <span>Upload Front Page Image (سرورق کی تصویر لگائیں)</span>
                  </button>

                  {coverImagePreview && (
                    <button
                      type="button"
                      onClick={() => setCoverImagePreview(null)}
                      className="px-2 py-1 text-xs text-rose-600 hover:underline"
                    >
                      Remove (تصویر ہٹائیں)
                    </button>
                  )}
                  <input
                    ref={coverImageInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleCoverUpload}
                    className="hidden"
                  />
                </div>

                {/* Color theme presets */}
                <div>
                  <div className="text-[11px] font-semibold text-slate-500 mb-1.5">
                    Or pick book cover theme style:
                  </div>
                  <div className="flex items-center gap-2">
                    {[
                      { key: 'royal-blue', color: 'bg-blue-800', name: 'Royal Blue' },
                      { key: 'emerald-green', color: 'bg-emerald-800', name: 'Emerald' },
                      { key: 'crimson-ruby', color: 'bg-rose-900', name: 'Ruby' },
                      { key: 'golden-amber', color: 'bg-amber-800', name: 'Gold' },
                      { key: 'deep-indigo', color: 'bg-indigo-900', name: 'Indigo' },
                      { key: 'midnight-space', color: 'bg-slate-900', name: 'Midnight' }
                    ].map(t => (
                      <button
                        key={t.key}
                        type="button"
                        onClick={() => setCoverTheme(t.key as any)}
                        className={`w-7 h-7 rounded-full ${t.color} border-2 transition-transform ${
                          coverTheme === t.key ? 'scale-125 border-amber-400 shadow-md' : 'border-white hover:scale-105'
                        }`}
                        title={t.name}
                      />
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* SECTION 3: Book Metadata (Titles, Author, Category) */}
          <div className="space-y-4 pt-2 border-t border-slate-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Book Title (English) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. My English Reading Adventure"
                  value={bookTitle}
                  onChange={(e) => setBookTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 text-right" dir="rtl">
                  کتاب کا نام (اردو میں) *
                </label>
                <input
                  type="text"
                  placeholder="مثلاً: میری انگلش پڑھائی اور کہانیوں کی کتاب"
                  value={urduTitle}
                  onChange={(e) => setUrduTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-urdu text-right"
                  dir="rtl"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Author / مصنف
                </label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Category / زمرہ
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium bg-white"
                >
                  <option value="grammar">Grammar & Tenses (گرامر)</option>
                  <option value="spoken">Spoken English (روزمرہ بول چال)</option>
                  <option value="stories">Moral Stories (کہانیاں)</option>
                  <option value="phonics">Phonics & Sight Words (فونیکس)</option>
                  <option value="science">Science & Nature (سائنس)</option>
                  <option value="school">School Syllabus (سکول کتب)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  File Size / سائز
                </label>
                <input
                  type="text"
                  value={fileSizeStr}
                  onChange={(e) => setFileSizeStr(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium"
                />
              </div>
            </div>
          </div>

          {/* SECTION 4: Sentences with Urdu Translations for Online Reading */}
          <div className="space-y-3 pt-2 border-t border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  4. Sentences & Urdu Translations for Online Reading
                </label>
                <div className="text-[11px] text-slate-500 font-urdu" dir="rtl">
                  ہر جملے کا تلفظ اور اردو ترجمہ آن لائن ریڈر میں لفظ بہ لفظ چلے گا
                </div>
              </div>

              <button
                type="button"
                onClick={handleAddSentence}
                className="flex items-center gap-1 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold rounded-xl text-xs transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Add Sentence (جملہ شامل کریں)</span>
              </button>
            </div>

            <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
              {sentences.map((s, idx) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 relative">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-400">Sentence #{idx + 1}</span>
                    {sentences.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveSentence(idx)}
                        className="text-slate-400 hover:text-rose-600 transition-colors"
                        title="Remove Sentence"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <input
                    type="text"
                    placeholder="English sentence..."
                    value={s.english}
                    onChange={(e) => handleSentenceChange(idx, 'english', e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-english font-medium"
                  />

                  <input
                    type="text"
                    placeholder="اردو با محاورہ ترجمہ..."
                    value={s.urdu}
                    onChange={(e) => handleSentenceChange(idx, 'urdu', e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-urdu text-right"
                    dir="rtl"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Cancel (منسوخ کریں)
            </button>

            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Add to Library (لائبریری میں شامل کریں)</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
