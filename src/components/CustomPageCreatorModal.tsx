import React, { useState, useRef } from 'react';
import { 
  Upload, X, Image as ImageIcon, Plus, Trash2, CheckCircle2, 
  AlertCircle, Sparkles, Loader2, FileText, Music, Video, Folder,
  File, Wand2 
} from 'lucide-react';
import { StoryLesson, StoryPage, saveCustomStory } from '../data/lessons';

interface CustomPageCreatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStoryCreated: (story: StoryLesson) => void;
}

interface SentenceDraft {
  english: string;
  urdu: string;
}

type UploadTab = 'image' | 'pdf' | 'audio' | 'video' | 'folder';

export const CustomPageCreatorModal: React.FC<CustomPageCreatorModalProps> = ({
  isOpen,
  onClose,
  onStoryCreated
}) => {
  const [activeTab, setActiveTab] = useState<UploadTab>('image');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [folderImages, setFolderImages] = useState<{ name: string; base64: string }[]>([]);
  const [attachedFileName, setAttachedFileName] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string>('image/jpeg');
  const [englishTitle, setEnglishTitle] = useState('');
  const [urduTitle, setUrduTitle] = useState('');
  const [sentences, setSentences] = useState<SentenceDraft[]>([
    { english: 'This is my reading lesson.', urdu: 'یہ میرا پڑھنے کا سبق ہے۔' }
  ]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isProcessingFile, setIsProcessingFile] = useState(false);
  const [isExtractingText, setIsExtractingText] = useState(false);
  const [extractSuccess, setExtractSuccess] = useState(false);

  // Hidden inputs
  const fileInputRef = useRef<HTMLInputElement>(null);
  const docInputRef = useRef<HTMLInputElement>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const folderInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  // Process multimodal content via AI
  const extractFromMultimodal = async (
    fileBase64: string, 
    fileMime: string, 
    filename?: string, 
    kind?: string
  ) => {
    setIsExtractingText(true);
    setErrorMsg(null);
    setExtractSuccess(false);

    try {
      const response = await fetch('/api/extract-multimodal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileBase64,
          mimeType: fileMime,
          filename,
          fileType: kind || activeTab
        })
      });

      if (!response.ok) {
        throw new Error('AI extraction failed');
      }

      const data = await response.json();

      if (data.title) setEnglishTitle(data.title);
      if (data.urduTitle) setUrduTitle(data.urduTitle);

      if (Array.isArray(data.sentences) && data.sentences.length > 0) {
        setSentences(data.sentences.map((s: any) => ({
          english: s.english || '',
          urdu: s.urdu || ''
        })));
        setExtractSuccess(true);
      }
    } catch (err: any) {
      console.warn('AI Extraction error, manual entry remains available', err);
    } finally {
      setIsExtractingText(false);
    }
  };

  // Handle single image file
  const handleImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAttachedFileName(file.name);
    setMimeType(file.type);
    setIsProcessingFile(true);
    setErrorMsg(null);

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_DIM = 2400;
        const scale = Math.min(1, MAX_DIM / Math.max(img.width, img.height));
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;

        const ctx = canvas.getContext('2d');
        let compressed = event.target?.result as string;
        if (ctx) {
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          compressed = canvas.toDataURL('image/jpeg', 0.95);
        }
        setImagePreview(compressed);
        setIsProcessingFile(false);
        extractFromMultimodal(compressed, 'image/jpeg', file.name, 'image');
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  // Handle Document or PDF file
  const handleDocFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAttachedFileName(file.name);
    setMimeType(file.type || 'application/pdf');
    setIsProcessingFile(true);
    setErrorMsg(null);

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      setIsProcessingFile(false);
      extractFromMultimodal(base64, file.type || 'application/pdf', file.name, 'document');
    };
    reader.readAsDataURL(file);
  };

  // Handle Audio file
  const handleAudioFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAttachedFileName(file.name);
    setMimeType(file.type || 'audio/mp3');
    setIsProcessingFile(true);
    setErrorMsg(null);

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      setIsProcessingFile(false);
      extractFromMultimodal(base64, file.type || 'audio/mp3', file.name, 'audio');
    };
    reader.readAsDataURL(file);
  };

  // Handle Video file
  const handleVideoFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAttachedFileName(file.name);
    setMimeType(file.type || 'video/mp4');
    setIsProcessingFile(true);
    setErrorMsg(null);

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      setIsProcessingFile(false);
      extractFromMultimodal(base64, file.type || 'video/mp4', file.name, 'video');
    };
    reader.readAsDataURL(file);
  };

  // Handle Folder Upload (multiple pictures)
  const handleFolderUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const imgFiles = Array.from(files).filter(f => f.type.startsWith('image/'));
    if (imgFiles.length === 0) {
      setErrorMsg('اس فولڈر میں کوئی تصویر نہیں ملی۔');
      return;
    }

    setIsProcessingFile(true);
    setAttachedFileName(`${imgFiles.length} images from folder: ${imgFiles[0].webkitRelativePath?.split('/')[0] || 'Selected Folder'}`);

    const loadedImages: { name: string; base64: string }[] = [];
    for (const file of imgFiles.slice(0, 10)) {
      const b64: string = await new Promise((res) => {
        const fr = new FileReader();
        fr.onload = () => res(fr.result as string);
        fr.readAsDataURL(file);
      });
      loadedImages.push({ name: file.name, base64: b64 });
    }

    setFolderImages(loadedImages);
    if (loadedImages[0]) {
      setImagePreview(loadedImages[0].base64);
      extractFromMultimodal(loadedImages[0].base64, 'image/jpeg', loadedImages[0].name, 'folder');
    }
    setIsProcessingFile(false);
  };

  const handleAddSentence = () => {
    setSentences([...sentences, { english: '', urdu: '' }]);
  };

  const handleRemoveSentence = (index: number) => {
    if (sentences.length <= 1) return;
    setSentences(sentences.filter((_, i) => i !== index));
  };

  const handleSentenceChange = (index: number, field: 'english' | 'urdu', value: string) => {
    const next = [...sentences];
    next[index][field] = value;
    setSentences(next);
  };

  const handleSave = () => {
    if (!englishTitle.trim()) {
      setErrorMsg('برائے مہربانی کہانی کا انگریزی عنوان (English Title) لکھیں۔');
      return;
    }

    const validSentences = sentences.filter(s => s.english.trim());
    if (validSentences.length === 0) {
      setErrorMsg('برائے مہربانی کم از کم ایک انگریزی جملہ لکھیں۔');
      return;
    }

    const finalCover = imagePreview || (folderImages[0]?.base64) || '/src/assets/images/app_hero_reading_1791978753855.jpg';
    const newStoryId = 'custom-' + Date.now();

    // If folder with multiple images, create multi-page storybook!
    let pages: StoryPage[] = [];
    if (folderImages.length > 1) {
      pages = folderImages.map((fImg, idx) => ({
        pageNumber: idx + 1,
        image: fImg.base64,
        title: `${englishTitle.trim()} - Page ${idx + 1}`,
        urduTitle: `${urduTitle.trim()} - صفحہ ${idx + 1}`,
        sentences: validSentences.map((s, sIdx) => ({
          id: `f-${idx}-${sIdx}`,
          english: s.english.trim(),
          urdu: s.urdu.trim() || 'ترجمہ دستیاب نہیں'
        }))
      }));
    } else {
      pages = [
        {
          pageNumber: 1,
          image: finalCover,
          title: englishTitle.trim(),
          urduTitle: urduTitle.trim(),
          sentences: validSentences.map((s, idx) => ({
            id: `cs-${idx}`,
            english: s.english.trim(),
            urdu: s.urdu.trim() || 'ترجمہ دستیاب نہیں'
          }))
        }
      ];
    }

    const newStory: StoryLesson = {
      id: newStoryId,
      title: englishTitle.trim(),
      urduTitle: urduTitle.trim() || 'میری بنائی گئی کہانی',
      level: 'Custom Created',
      levelUrdu: 'بچوں کی ذاتی کہانی',
      coverImage: finalCover,
      description: validSentences[0].english,
      descriptionUrdu: validSentences[0].urdu || 'میری پسندیدہ تصویر اور الفاظ',
      isCustom: true,
      pages,
    };

    const saved = saveCustomStory(newStory);
    if (saved) {
      onStoryCreated(newStory);
      onClose();
    } else {
      setErrorMsg('فائلوں کا سائز بڑا ہونے کی وجہ سے محفوظ نہ ہو سکا۔ برائے مہربانی چھوٹی فائلیں استعمال کریں۔');
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden transform transition-all my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Hidden File Inputs */}
        <input 
          ref={fileInputRef} 
          type="file" 
          accept="image/*" 
          className="hidden" 
          onChange={handleImageFile} 
        />
        <input 
          ref={docInputRef} 
          type="file" 
          accept=".pdf,.txt,.doc,.docx,application/pdf,text/plain" 
          className="hidden" 
          onChange={handleDocFile} 
        />
        <input 
          ref={audioInputRef} 
          type="file" 
          accept="audio/*" 
          className="hidden" 
          onChange={handleAudioFile} 
        />
        <input 
          ref={videoInputRef} 
          type="file" 
          accept="video/*" 
          className="hidden" 
          onChange={handleVideoFile} 
        />
        <input 
          ref={folderInputRef} 
          type="file" 
          // @ts-ignore
          webkitdirectory="" 
          // @ts-ignore
          directory="" 
          multiple 
          className="hidden" 
          onChange={handleFolderUpload} 
        />

        {/* Modal Header */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-700 px-6 py-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-white/10 rounded-xl">
              <Upload className="w-5 h-5 text-emerald-200" />
            </div>
            <div>
              <h2 className="text-base font-bold font-english">
                Upload & Create Reading Lesson
              </h2>
              <div className="text-xs text-emerald-100 font-urdu text-right" dir="rtl">
                تصویر، پی ڈی ایف، ڈاکومنٹ، آڈیو، ویڈیو یا پورا فولڈر اپلوڈ کریں
              </div>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/20 transition-colors text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Upload Mode Tabs */}
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-2.5 flex items-center gap-2 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('image')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'image' 
                ? 'bg-emerald-600 text-white shadow-xs' 
                : 'text-slate-600 hover:text-slate-900 bg-white border border-slate-200'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Picture (تصویر)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('pdf')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'pdf' 
                ? 'bg-red-600 text-white shadow-xs' 
                : 'text-slate-600 hover:text-slate-900 bg-white border border-slate-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>PDF / Doc (پی ڈی ایف)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('audio')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'audio' 
                ? 'bg-purple-600 text-white shadow-xs' 
                : 'text-slate-600 hover:text-slate-900 bg-white border border-slate-200'
            }`}
          >
            <Music className="w-3.5 h-3.5" />
            <span>Audio (آڈیو)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('video')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'video' 
                ? 'bg-rose-600 text-white shadow-xs' 
                : 'text-slate-600 hover:text-slate-900 bg-white border border-slate-200'
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            <span>Video (ویڈیو)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('folder')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'folder' 
                ? 'bg-amber-600 text-white shadow-xs' 
                : 'text-slate-600 hover:text-slate-900 bg-white border border-slate-200'
            }`}
          >
            <Folder className="w-3.5 h-3.5" />
            <span>Folder (مکمل فولڈر)</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 max-h-[72vh] overflow-y-auto">
          {errorMsg && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-medium font-urdu text-right" dir="rtl">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Interactive Upload Box based on activeTab */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-slate-800 font-english">
                1. Select File from Computer:
              </label>
              {attachedFileName && (
                <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg truncate max-w-xs">
                  {attachedFileName}
                </span>
              )}
            </div>

            <div 
              onClick={() => {
                if (activeTab === 'image') fileInputRef.current?.click();
                else if (activeTab === 'pdf') docInputRef.current?.click();
                else if (activeTab === 'audio') audioInputRef.current?.click();
                else if (activeTab === 'video') videoInputRef.current?.click();
                else if (activeTab === 'folder') folderInputRef.current?.click();
              }}
              className="border-2 border-dashed border-slate-300 hover:border-emerald-500 bg-slate-50 hover:bg-emerald-50/20 rounded-2xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center min-h-[160px] group relative overflow-hidden"
            >
              {imagePreview ? (
                <div className="relative w-full max-h-[200px] rounded-xl overflow-hidden shadow-xs">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="w-full h-full object-contain max-h-[200px] mx-auto" 
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-semibold">
                    تبدیل کرنے کے لیے کلک کریں (Click to change)
                  </div>
                </div>
              ) : attachedFileName ? (
                <div className="space-y-2 py-4">
                  <div className="w-12 h-12 mx-auto rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center shadow-xs">
                    {activeTab === 'pdf' && <FileText className="w-6 h-6" />}
                    {activeTab === 'audio' && <Music className="w-6 h-6" />}
                    {activeTab === 'video' && <Video className="w-6 h-6" />}
                    {activeTab === 'folder' && <Folder className="w-6 h-6" />}
                  </div>
                  <div className="text-sm font-bold text-slate-800">{attachedFileName}</div>
                  <div className="text-xs text-indigo-600 font-urdu" dir="rtl">فائل منتخب کر لی گئی ہے۔ کلک کر کے دوسری فائل چن سکتے ہیں۔</div>
                </div>
              ) : (
                <div className="space-y-2 text-slate-600 py-3">
                  <div className="w-12 h-12 mx-auto rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {activeTab === 'image' && <ImageIcon className="w-6 h-6" />}
                    {activeTab === 'pdf' && <FileText className="w-6 h-6" />}
                    {activeTab === 'audio' && <Music className="w-6 h-6" />}
                    {activeTab === 'video' && <Video className="w-6 h-6" />}
                    {activeTab === 'folder' && <Folder className="w-6 h-6" />}
                  </div>
                  <div className="text-sm font-bold text-slate-800 font-english">
                    {activeTab === 'image' && 'Click to Upload Picture from Computer (JPG, PNG)'}
                    {activeTab === 'pdf' && 'Click to Upload PDF or Document from Computer'}
                    {activeTab === 'audio' && 'Click to Upload Audio Recording / Phonics (MP3, WAV)'}
                    {activeTab === 'video' && 'Click to Upload Video Lesson (MP4, WebM)'}
                    {activeTab === 'folder' && 'Click to Select Entire Folder of Pictures'}
                  </div>
                  <div className="text-xs text-slate-500 font-urdu" dir="rtl">
                    {activeTab === 'folder' 
                      ? 'فولڈر کی تمام تصاویر خودکار طریقے سے ملٹی پیج بک میں شامل ہو جائیں گی' 
                      : 'AI خودکار طریقے سے اس فائل کی انگریزی تحریر اور اردو ترجمہ تیار کرے گا'}
                  </div>
                </div>
              )}

              {/* Extraction Progress Overlay */}
              {(isExtractingText || isProcessingFile) && (
                <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-xs flex flex-col items-center justify-center text-white p-4 space-y-2">
                  <Loader2 className="w-8 h-8 animate-spin text-amber-400" />
                  <div className="text-sm font-bold font-english">Extracting Exact Page Text (OCR)...</div>
                  <div className="text-xs font-urdu text-amber-200" dir="rtl">
                    کتاب کے صفحے سے ہو بہو اصل انگریزی متن اور اردو ترجمہ نکالا جا رہا ہے...
                  </div>
                </div>
              )}
            </div>

            {extractSuccess && (
              <div className="flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-xs text-emerald-900 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-urdu" dir="rtl">
                  کتاب کے صفحے کا اصل متن ہو بہو بغیر کسی تبدیلی کے نکال کر درج کر دیا گیا ہے، ساتھ درست اردو ترجمہ بھی تیار ہے۔
                </span>
              </div>
            )}
          </div>

          {/* Titles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 font-english text-left" dir="ltr">
                English Title (انگریزی عنوان):
              </label>
              <input
                type="text"
                dir="ltr"
                value={englishTitle}
                onChange={(e) => setEnglishTitle(e.target.value)}
                placeholder="e.g. Learning from My Book"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-english text-left"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 font-urdu text-right" dir="rtl">
                اردو عنوان (Urdu Title):
              </label>
              <input
                type="text"
                dir="rtl"
                value={urduTitle}
                onChange={(e) => setUrduTitle(e.target.value)}
                placeholder="مثال: میری کتاب سے نیا سبق"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-urdu text-right"
              />
            </div>
          </div>

          {/* Sentences List */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-slate-800 font-english">
                2. Sentences to Read & Pronounce (پڑھنے کے جملے):
              </label>
              <button
                type="button"
                onClick={handleAddSentence}
                className="flex items-center gap-1 px-3 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-lg transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Add Sentence (نیا جملہ)</span>
              </button>
            </div>

            <div className="space-y-3">
              {sentences.map((sent, idx) => (
                <div key={idx} className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2 relative">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500 font-english" dir="ltr">
                      Sentence {idx + 1}
                    </span>
                    {sentences.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveSentence(idx)}
                        className="text-slate-400 hover:text-red-500 transition-colors p-1"
                        title="Remove sentence"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {/* English Input: LTR */}
                  <div>
                    <label className="block text-2xs text-slate-400 font-semibold mb-0.5 text-left font-english" dir="ltr">
                      English Text (انگریزی):
                    </label>
                    <input
                      type="text"
                      dir="ltr"
                      value={sent.english}
                      onChange={(e) => handleSentenceChange(idx, 'english', e.target.value)}
                      placeholder="Type or extracted English sentence..."
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-english text-left"
                    />
                  </div>

                  {/* Urdu Input: RTL */}
                  <div>
                    <label className="block text-2xs text-slate-400 font-semibold mb-0.5 text-right font-urdu" dir="rtl">
                      اردو ترجمہ (Urdu Translation):
                    </label>
                    <input
                      type="text"
                      dir="rtl"
                      value={sent.urdu}
                      onChange={(e) => handleSentenceChange(idx, 'urdu', e.target.value)}
                      placeholder="اردو با محاورہ ترجمہ..."
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-urdu text-right"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 transition-colors"
          >
            Cancel (منسوخ کریں)
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={isExtractingText}
            className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold shadow-xs hover:shadow transition-all active:scale-95 disabled:opacity-50"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Save & Read (محفوظ کریں اور پڑھیں)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
