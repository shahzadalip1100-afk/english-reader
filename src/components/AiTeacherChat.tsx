import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, Bot, User, Volume2, RotateCcw, Loader2, Lightbulb, 
  Paperclip, Image as ImageIcon, FileText, Music, Video, Folder, 
  X, Check, AlertCircle, File
} from 'lucide-react';
import { speakSentence, stopSpeech } from '../utils/speech';
import { OFFLINE_DICTIONARY as OFFLINE_WORDS } from '../data/dictionary';

export interface ChatAttachment {
  name: string;
  type: 'image' | 'pdf' | 'document' | 'audio' | 'video' | 'folder';
  mimeType: string;
  base64: string;
  size?: number;
  previewUrl?: string;
  count?: number; // for folders
}

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: Date;
  attachments?: ChatAttachment[];
}

const PRESET_PROMPTS = [
  {
    en: 'Tell me a simple 3-sentence story with Urdu translation.',
    ur: 'مجھے اردو ترجمے کے ساتھ 3 جملوں کی ایک چھوٹی کہانی سنائیں۔'
  },
  {
    en: 'Teach me the pronunciation and meaning of "Butterfly".',
    ur: 'مجھے لفظ "Butterfly" کا تلفظ اور معنی سکھائیں۔'
  },
  {
    en: 'Explain this attached picture or document with Urdu meaning.',
    ur: 'اس فائل کی تحریر اور اردو ترجمہ بتائیں۔'
  },
  {
    en: 'Give me 5 easy animal words with phonics sounds.',
    ur: 'پانچ آسان جانوروں کے نام مع اردو معنی سکھائیں۔'
  }
];

export const AiTeacherChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      content: `Hello! سلام بچو!
میں آپ کا انگریزی استاد **Ustad AI (استاد اے آئی)** ہوں۔
آپ مجھ سے انگریزی پڑھنے، کسی بھی لفظ کا تلفظ (Pronunciation)، اردو معنی، گرامر یا کوئی بھی نئی کہانی سن سکتے ہیں۔

اب آپ یہاں **تصاویر (Images)، دستاویزات / پی ڈی ایف (PDFs)، آڈیو (Audio)، ویڈیو (Video) اور پورا فولڈر (Folder)** بھی اپلوڈ کر سکتے ہیں اور ان کا انگریزی و اردو ترجمہ پوچھ سکتے ہیں! 🌟`,
      timestamp: new Date()
    }
  ]);
  const [inputPrompt, setInputPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [playingMessageId, setPlayingMessageId] = useState<string | null>(null);
  const [attachments, setAttachments] = useState<ChatAttachment[]>([]);
  const [showAttachMenu, setShowAttachMenu] = useState(false);

  // Hidden file inputs
  const imageInputRef = useRef<HTMLInputElement>(null);
  const docInputRef = useRef<HTMLInputElement>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const folderInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, attachments]);

  // Read file as base64 helper
  const readFileAsBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  };

  // Compress image before sending to avoid large payloads
  const compressImageFile = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_SIZE = 800;
          let width = img.width;
          let height = img.height;
          if (width > height) {
            if (width > MAX_SIZE) {
              height = Math.round((height * MAX_SIZE) / width);
              width = MAX_SIZE;
            }
          } else {
            if (height > MAX_SIZE) {
              width = Math.round((width * MAX_SIZE) / height);
              height = MAX_SIZE;
            }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            resolve(canvas.toDataURL('image/jpeg', 0.8));
          } else {
            resolve(e.target?.result as string);
          }
        };
        img.onerror = () => resolve(e.target?.result as string);
        img.src = e.target?.result as string;
      };
      reader.onerror = () => resolve('');
      reader.readAsDataURL(file);
    });
  };

  // Handle single or multi-file upload with size validation
  const handleFiles = async (
    files: FileList | null, 
    type: 'image' | 'pdf' | 'document' | 'audio' | 'video' | 'folder'
  ) => {
    if (!files || files.length === 0) return;
    setShowAttachMenu(false);

    try {
      if (type === 'folder') {
        const validFiles = Array.from(files).filter(f => 
          f.type.startsWith('image/') || 
          f.type === 'application/pdf' || 
          f.type.startsWith('text/') ||
          f.type.startsWith('audio/') ||
          f.type.startsWith('video/')
        );

        if (validFiles.length === 0) return;

        const firstFile = validFiles[0];
        let base64 = '';
        if (firstFile.type.startsWith('image/')) {
          base64 = await compressImageFile(firstFile);
        } else {
          base64 = await readFileAsBase64(firstFile);
        }

        const folderAtt: ChatAttachment = {
          name: `${validFiles.length} files from folder`,
          type: 'folder',
          mimeType: firstFile.type || 'application/octet-stream',
          base64,
          count: validFiles.length,
          previewUrl: firstFile.type.startsWith('image/') ? base64 : undefined,
        };

        setAttachments(prev => [...prev, folderAtt]);
      } else {
        for (let i = 0; i < Math.min(files.length, 3); i++) {
          const file = files[i];

          // 10MB safety check
          if (file.size > 10 * 1024 * 1024) {
            alert(`فائل "${file.name}" کا سائز 10MB سے زیادہ ہے۔ برائے مہربانی چھوٹی فائل منتخب کریں۔`);
            continue;
          }

          let resolvedType = type;
          if (file.type === 'application/pdf') resolvedType = 'pdf';
          else if (file.type.startsWith('image/')) resolvedType = 'image';
          else if (file.type.startsWith('audio/')) resolvedType = 'audio';
          else if (file.type.startsWith('video/')) resolvedType = 'video';
          else if (file.type.startsWith('text/')) resolvedType = 'document';

          let base64 = '';
          if (resolvedType === 'image') {
            base64 = await compressImageFile(file);
          } else {
            base64 = await readFileAsBase64(file);
          }

          const newAtt: ChatAttachment = {
            name: file.name,
            type: resolvedType,
            mimeType: file.type || 'application/octet-stream',
            base64,
            size: file.size,
            previewUrl: resolvedType === 'image' ? base64 : undefined,
          };

          setAttachments(prev => [...prev, newAtt]);
        }
      }
    } catch (err) {
      console.error('File reading failed', err);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputPrompt).trim();
    if ((!text && attachments.length === 0) || isLoading) return;

    const currentAttachments = [...attachments];

    const userMsg: ChatMessage = {
      id: 'user-' + Date.now(),
      role: 'user',
      content: text || (currentAttachments.length > 0 ? 'Please analyze this attached file for reading and translation.' : ''),
      timestamp: new Date(),
      attachments: currentAttachments.length > 0 ? currentAttachments : undefined,
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInputPrompt('');
    setAttachments([]);
    setIsLoading(true);

    try {
      // Filter out welcome and error messages so Gemini only receives actual user/model conversation turns
      const chatPayload = newMessages
        .filter(m => m.id !== 'welcome' && !m.id.startsWith('welcome-') && !m.id.startsWith('error-'))
        .map(m => ({
          role: m.role,
          content: m.content,
          attachments: m.attachments?.map(a => ({
            name: a.name,
            mimeType: a.mimeType,
            base64: a.base64,
          }))
        }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          messages: chatPayload
        })
      });

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}));
        throw new Error(errJson.error || `Server responded with ${response.status}`);
      }

      const data = await response.json();
      const modelMsg: ChatMessage = {
        id: 'model-' + Date.now(),
        role: 'model',
        content: data.reply || 'معذرت، میں ابھی جواب تیار نہیں کر سکا۔ برائے مہربانی دوبارہ پوچھیں۔',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, modelMsg]);
    } catch (err: any) {
      console.error('Chat error:', err);
      
      // Check if user asked about a specific word, provide intelligent offline answer
      const userTextClean = (text || '').toLowerCase().replace(/[^a-zA-Z\s]/g, ' ').trim();
      const wordsInPrompt = userTextClean.split(/\s+/).filter(w => w.length > 2);
      
      let fallbackAnswer = '';
      if (wordsInPrompt.length > 0) {
        const foundWord = wordsInPrompt.find(w => OFFLINE_WORDS[w]);
        if (foundWord && OFFLINE_WORDS[foundWord]) {
          const item = OFFLINE_WORDS[foundWord];
          fallbackAnswer = `Hello! سلام!
آپ کے سوال کے مطابق لفظ کا جواب یہ ہے:
* **English Word:** ${item.word}
* **Urdu Meaning (اردو معنی):** ${item.urdu}
* **Pronunciation (تلفظ):** ${item.transliteration}
* **Example:** ${item.example}`;
        }
      }

      const errorMsg: ChatMessage = {
        id: 'error-' + Date.now(),
        role: 'model',
        content: fallbackAnswer || `معذرت! سرور سے رابطہ نہیں ہو سکا۔ برائے مہربانی انٹرنیٹ کنکشن چیک کر کے دوبارہ بھیجیں۔ (${err?.message || 'Failed to fetch'})`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  // Play English voice for a message
  const handlePlayVoice = (msgId: string, text: string) => {
    if (playingMessageId === msgId) {
      stopSpeech();
      setPlayingMessageId(null);
      return;
    }

    stopSpeech();
    setPlayingMessageId(msgId);

    const englishOnly = text
      .split('\n')
      .filter(line => /[a-zA-Z]/.test(line))
      .join('. ')
      .replace(/[*#_]/g, '');

    speakSentence(englishOnly || text, {
      rate: 0.85,
      onEnd: () => setPlayingMessageId(null),
      onError: () => setPlayingMessageId(null)
    });
  };

  const handleClearChat = () => {
    stopSpeech();
    setAttachments([]);
    setMessages([
      {
        id: 'welcome-' + Date.now(),
        role: 'model',
        content: `گفتگو دوبارہ شروع ہو گئی۔ آپ جو بھی سوال پوچھنا چاہیں لکھیں، یا تصویر، پی ڈی ایف، آڈیو، ویڈیو اور فولڈر اپلوڈ کریں! 📚`,
        timestamp: new Date()
      }
    ]);
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col h-[calc(100vh-180px)] min-h-[560px] bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden relative">
      
      {/* Hidden File Inputs for all media types */}
      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files, 'image')}
      />
      <input
        ref={docInputRef}
        type="file"
        accept=".pdf,.txt,.doc,.docx,application/pdf,text/plain"
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files, 'pdf')}
      />
      <input
        ref={audioInputRef}
        type="file"
        accept="audio/*"
        className="hidden"
        onChange={(e) => handleFiles(e.target.files, 'audio')}
      />
      <input
        ref={videoInputRef}
        type="file"
        accept="video/*"
        className="hidden"
        onChange={(e) => handleFiles(e.target.files, 'video')}
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
        onChange={(e) => handleFiles(e.target.files, 'folder')}
      />

      {/* Chat Header */}
      <div className="bg-gradient-to-r from-indigo-700 via-indigo-600 to-amber-600 px-6 py-4 flex items-center justify-between text-white shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white/15 flex items-center justify-center text-amber-300 shadow-xs">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-extrabold tracking-tight font-english">
                Ustad AI (استاد اے آئی)
              </h2>
              <span className="px-2 py-0.5 bg-amber-400 text-amber-950 font-bold text-2xs rounded-full uppercase">
                AI Tutor + Multimodal
              </span>
            </div>
            <div className="text-xs text-indigo-100 font-urdu" dir="rtl">
              تصاویر، ڈاکومنٹس، پی ڈی ایف، آڈیو، ویڈیو اور فولڈرز کی رہنمائی
            </div>
          </div>
        </div>

        <button
          onClick={handleClearChat}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold transition-colors"
          title="Clear chat"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">New Chat (نئی گفتگو)</span>
        </button>
      </div>

      {/* Messages Stream */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/50">
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          const isPlaying = playingMessageId === msg.id;

          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-white ${
                  isUser ? 'bg-indigo-600' : 'bg-amber-500 shadow-2xs'
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              {/* Message Bubble */}
              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 shadow-2xs ${
                  isUser
                    ? 'bg-indigo-600 text-white rounded-tr-none'
                    : 'bg-white text-slate-800 border border-slate-200/90 rounded-tl-none'
                }`}
              >
                {/* Attached Media Previews in User Message */}
                {msg.attachments && msg.attachments.length > 0 && (
                  <div className="mb-3 space-y-2">
                    {msg.attachments.map((att, attIdx) => (
                      <div
                        key={attIdx}
                        className={`p-2.5 rounded-xl border flex items-center gap-2.5 ${
                          isUser ? 'bg-white/15 border-white/20 text-white' : 'bg-slate-100 border-slate-200 text-slate-800'
                        }`}
                      >
                        {att.previewUrl ? (
                          <img
                            src={att.previewUrl}
                            alt={att.name}
                            className="w-12 h-12 rounded-lg object-cover bg-black/10 shrink-0"
                          />
                        ) : att.type === 'pdf' ? (
                          <div className="w-10 h-10 rounded-lg bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                            <FileText className="w-5 h-5" />
                          </div>
                        ) : att.type === 'audio' ? (
                          <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                            <Music className="w-5 h-5" />
                          </div>
                        ) : att.type === 'video' ? (
                          <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                            <Video className="w-5 h-5" />
                          </div>
                        ) : att.type === 'folder' ? (
                          <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                            <Folder className="w-5 h-5" />
                          </div>
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                            <File className="w-5 h-5" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0 text-xs">
                          <div className="font-semibold truncate">{att.name}</div>
                          <div className="opacity-75 uppercase text-2xs">
                            {att.type} {att.count ? `· ${att.count} items` : ''}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Content with LTR for English and RTL for Urdu */}
                <div className="space-y-2 text-sm sm:text-base leading-relaxed">
                  {msg.content.split('\n').map((paragraph, pIdx) => {
                    const hasUrdu = /[\u0600-\u06FF]/.test(paragraph);
                    const isEnglish = /[a-zA-Z]/.test(paragraph);

                    if (hasUrdu && !isEnglish) {
                      return (
                        <p
                          key={pIdx}
                          dir="rtl"
                          className={`font-urdu text-right text-base sm:text-lg leading-loose ${
                            isUser ? 'text-indigo-50' : 'text-slate-800'
                          }`}
                        >
                          {paragraph}
                        </p>
                      );
                    }

                    if (hasUrdu && isEnglish) {
                      return (
                        <div key={pIdx} className="space-y-1">
                          <p dir="ltr" className={`text-left font-english ${isUser ? 'text-white' : 'text-slate-900 font-medium'}`}>
                            {paragraph.replace(/[\u0600-\u06FF]+/g, '').trim()}
                          </p>
                          <p dir="rtl" className={`text-right font-urdu text-sm sm:text-base leading-loose ${isUser ? 'text-indigo-100' : 'text-amber-900 font-semibold'}`}>
                            {paragraph.match(/[\u0600-\u06FF\s،۔]+/g)?.join(' ').trim()}
                          </p>
                        </div>
                      );
                    }

                    return (
                      <p
                        key={pIdx}
                        dir="ltr"
                        className={`font-english text-left ${
                          isUser ? 'text-white' : 'text-slate-800'
                        }`}
                      >
                        {paragraph}
                      </p>
                    );
                  })}
                </div>

                {/* AI Audio Speak Button */}
                {!isUser && (
                  <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => handlePlayVoice(msg.id, msg.content)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                        isPlaying
                          ? 'bg-rose-100 text-rose-700'
                          : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700'
                      }`}
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>{isPlaying ? 'Stop Audio (آواز روکیں)' : 'Listen English (آواز سنیں)'}</span>
                    </button>
                    <span className="text-2xs text-slate-400">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Loading Bubble */}
        {isLoading && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-500 flex items-center justify-center shrink-0 text-white shadow-2xs">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-none p-4 shadow-2xs flex items-center gap-2 text-slate-500 text-sm">
              <Loader2 className="w-4 h-4 animate-spin text-amber-500" />
              <span className="font-urdu" dir="rtl">
                {attachments.length > 0 
                  ? 'استاد اے آئی فائل کا جائزہ لے کر اردو ترجمہ اور تجزیہ تیار کر رہے ہیں...' 
                  : 'استاد اے آئی جواب لکھ رہے ہیں...'}
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Preset Prompt Suggestions */}
      {messages.length <= 2 && (
        <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 flex items-center gap-2 overflow-x-auto scrollbar-none">
          <span className="text-xs font-bold text-slate-400 flex items-center gap-1 shrink-0">
            <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
            <span>Try:</span>
          </span>
          {PRESET_PROMPTS.map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(item.en)}
              className="px-3 py-1.5 bg-white hover:bg-indigo-50 border border-slate-200 text-slate-700 hover:text-indigo-600 rounded-xl text-xs font-medium whitespace-nowrap transition-colors shadow-2xs text-left"
            >
              {item.en}
            </button>
          ))}
        </div>
      )}

      {/* Active Attachments Preview Bar */}
      {attachments.length > 0 && (
        <div className="px-4 py-2 bg-indigo-50/70 border-t border-indigo-100 flex items-center gap-2 overflow-x-auto">
          {attachments.map((att, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 px-3 py-1.5 bg-white border border-indigo-200 rounded-xl text-xs font-medium text-slate-700 shadow-2xs shrink-0"
            >
              {att.type === 'image' && <ImageIcon className="w-3.5 h-3.5 text-emerald-600" />}
              {att.type === 'pdf' && <FileText className="w-3.5 h-3.5 text-red-600" />}
              {att.type === 'document' && <File className="w-3.5 h-3.5 text-blue-600" />}
              {att.type === 'audio' && <Music className="w-3.5 h-3.5 text-purple-600" />}
              {att.type === 'video' && <Video className="w-3.5 h-3.5 text-rose-600" />}
              {att.type === 'folder' && <Folder className="w-3.5 h-3.5 text-amber-600" />}

              <span className="max-w-[140px] truncate">{att.name}</span>

              <button
                type="button"
                onClick={() => removeAttachment(idx)}
                className="p-0.5 text-slate-400 hover:text-rose-500 rounded-full transition-colors ml-1"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Popup Menu for Multimodal Attachment Options */}
      {showAttachMenu && (
        <div 
          className="absolute bottom-20 left-4 z-50 bg-white border border-slate-200 shadow-2xl rounded-2xl p-2.5 w-64 space-y-1 animate-in fade-in zoom-in-95 duration-150"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="px-2.5 py-1 text-2xs font-bold text-slate-400 uppercase tracking-wider">
            اپلوڈ کا انتخاب کریں (Select Upload)
          </div>

          {/* 1. Images */}
          <button
            type="button"
            onClick={() => imageInputRef.current?.click()}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 rounded-xl transition-colors text-left"
          >
            <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-600">
              <ImageIcon className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <div className="font-bold">Pictures (تصاویر)</div>
              <div className="text-2xs text-slate-400">JPG, PNG, WebP</div>
            </div>
          </button>

          {/* 2. Documents & PDF */}
          <button
            type="button"
            onClick={() => docInputRef.current?.click()}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-red-50 hover:text-red-700 rounded-xl transition-colors text-left"
          >
            <div className="p-1.5 rounded-lg bg-red-100 text-red-600">
              <FileText className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <div className="font-bold">PDF & Documents (پی ڈی ایف)</div>
              <div className="text-2xs text-slate-400">PDF, TXT, DOCX</div>
            </div>
          </button>

          {/* 3. Audio */}
          <button
            type="button"
            onClick={() => audioInputRef.current?.click()}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-purple-50 hover:text-purple-700 rounded-xl transition-colors text-left"
          >
            <div className="p-1.5 rounded-lg bg-purple-100 text-purple-600">
              <Music className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <div className="font-bold">Audio Recording (آڈیو)</div>
              <div className="text-2xs text-slate-400">MP3, WAV, Voice Notes</div>
            </div>
          </button>

          {/* 4. Video */}
          <button
            type="button"
            onClick={() => videoInputRef.current?.click()}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-rose-50 hover:text-rose-700 rounded-xl transition-colors text-left"
          >
            <div className="p-1.5 rounded-lg bg-rose-100 text-rose-600">
              <Video className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <div className="font-bold">Video Clip (ویڈیو)</div>
              <div className="text-2xs text-slate-400">MP4, WebM</div>
            </div>
          </button>

          {/* 5. Folder */}
          <button
            type="button"
            onClick={() => folderInputRef.current?.click()}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-amber-50 hover:text-amber-800 rounded-xl transition-colors text-left"
          >
            <div className="p-1.5 rounded-lg bg-amber-100 text-amber-700">
              <Folder className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <div className="font-bold">Folder of Files (مکمل فولڈر)</div>
              <div className="text-2xs text-slate-400">Multiple pictures/documents</div>
            </div>
          </button>
        </div>
      )}

      {/* Target Focus Input Box: CSS Selector target: form > input */}
      <div className="p-4 bg-white border-t border-slate-200">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          {/* Multimodal Attachment Button */}
          <button
            type="button"
            onClick={() => setShowAttachMenu(!showAttachMenu)}
            className={`p-3 rounded-2xl border transition-all shrink-0 ${
              attachments.length > 0
                ? 'bg-indigo-50 border-indigo-300 text-indigo-600'
                : 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-600'
            }`}
            title="Attach Pictures, Documents, PDF, Audio, Video, or Folder"
          >
            <Paperclip className="w-5 h-5" />
          </button>

          {/* Text Input (Targeted Element from CSS selector) */}
          <input
            type="text"
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            placeholder="Ask Ustad AI or attach Image, PDF, Audio, Video, Folder... (کوئی سوال یا فائل بھیجیں)"
            className="flex-1 px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-sans placeholder:text-slate-400 transition-all"
            disabled={isLoading}
          />

          {/* Send Button */}
          <button
            type="submit"
            disabled={(!inputPrompt.trim() && attachments.length === 0) || isLoading}
            className={`p-3 rounded-2xl transition-all shadow-xs shrink-0 ${
              (inputPrompt.trim() || attachments.length > 0) && !isLoading
                ? 'bg-indigo-600 hover:bg-indigo-700 text-white active:scale-95'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}
            title="Send Message"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};
