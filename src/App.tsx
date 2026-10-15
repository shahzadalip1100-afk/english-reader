/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  BookOpen, Sparkles, Upload, Volume2, ArrowRight, 
  Trash2, Plus, Star, CheckCircle2, Award, Heart, Bot, Library
} from 'lucide-react';
import { 
  StoryLesson, PRELOADED_STORIES, 
  getStoredCustomStories, deleteCustomStory 
} from './data/lessons';
import { Navbar, NavView } from './components/Navbar';
import { StoryReader } from './components/StoryReader';
import { CustomPageCreatorModal } from './components/CustomPageCreatorModal';
import { VocabularyExplorer } from './components/VocabularyExplorer';
import { GamesHub } from './components/GamesHub';
import { AiTeacherChat } from './components/AiTeacherChat';
import { DeleteConfirmationModal } from './components/DeleteConfirmationModal';
import { DigitalLibrary } from './components/DigitalLibrary';
import { BookUploadModal } from './components/BookUploadModal';
import { LibraryBook } from './data/libraryBooks';

export default function App() {
  const [activeView, setActiveView] = useState<NavView>('digital-library');
  const [activeStory, setActiveStory] = useState<StoryLesson | null>(null);
  const [customStories, setCustomStories] = useState<StoryLesson[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isBookUploadModalOpen, setIsBookUploadModalOpen] = useState(false);
  const [storyToDelete, setStoryToDelete] = useState<StoryLesson | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [levelFilter, setLevelFilter] = useState<string>('all');

  // Load custom stories on mount
  useEffect(() => {
    const loaded = getStoredCustomStories();
    setCustomStories(loaded);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleStoryCreated = (newStory: StoryLesson) => {
    setCustomStories(prev => [newStory, ...prev.filter(s => s.id !== newStory.id)]);
    setActiveStory(newStory);
    showToast('نئی کہانی کامیابی سے شامل ہو گئی ہے!');
  };

  const handleInitiateDelete = (e: React.MouseEvent, story: StoryLesson) => {
    e.stopPropagation();
    setStoryToDelete(story);
  };

  const handleConfirmDelete = () => {
    if (!storyToDelete) return;
    const id = storyToDelete.id;
    deleteCustomStory(id);
    setCustomStories(prev => prev.filter(s => s.id !== id));
    
    // If the currently reading story was deleted, close reader
    if (activeStory?.id === id) {
      setActiveStory(null);
    }

    setStoryToDelete(null);
    showToast('کہانی کامیابی سے حذف کر دی گئی ہے۔');
  };

  // Combine preloaded and custom stories for display
  const allStories = [...customStories, ...PRELOADED_STORIES];

  const displayedStories = allStories.filter(story => {
    if (activeView === 'custom') {
      return story.isCustom;
    }
    if (levelFilter === 'all') return true;
    return story.level === levelFilter;
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Top Navigation */}
      <Navbar
        activeView={activeView}
        onSelectView={(view) => {
          setActiveView(view);
          setActiveStory(null);
        }}
        onOpenCreateModal={() => setIsCreateModalOpen(true)}
        onOpenBookUploadModal={() => setIsBookUploadModalOpen(true)}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-slate-900 text-white rounded-2xl shadow-xl animate-in slide-in-from-bottom duration-200 text-sm font-urdu font-medium" dir="rtl">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        
        {/* VIEW 1: Active Reading Mode (Storybook) */}
        {activeStory ? (
          <StoryReader
            story={activeStory}
            onBack={() => setActiveStory(null)}
            onDeleteStory={(story) => setStoryToDelete(story)}
          />
        ) : activeView === 'digital-library' ? (
          /* VIEW 2: DIGITAL LIBRARY WITH FRONT COVERS, DOWNLOAD & ONLINE READING */
          <DigitalLibrary onOpenUploadModal={() => setIsBookUploadModalOpen(true)} />
        ) : activeView === 'ai-teacher' ? (
          /* VIEW 3: AI Teacher (ChatGPT-like Assistant) */
          <AiTeacherChat />
        ) : activeView === 'vocab' ? (
          /* VIEW 4: Vocabulary & Dictionary Explorer */
          <VocabularyExplorer />
        ) : activeView === 'quiz' ? (
          /* VIEW 5: 100 Educational Games */
          <GamesHub />
        ) : (
          /* VIEW 6: Graded Picture Lessons or Custom Stories */
          <div className="space-y-8">
            
            {/* Hero Visual Section */}
            {activeView === 'library' && (
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-indigo-900 via-indigo-800 to-amber-700 text-white shadow-lg">
                <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[300px]">
                  
                  {/* Text Content (7 cols) */}
                  <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-center space-y-4 relative z-10">
                    <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-300">
                      <Sparkles className="w-4 h-4" />
                      <span>100% Offline Kids Reading Platform</span>
                    </div>

                    <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight font-english text-left" dir="ltr">
                      Learn English Reading Easily With Urdu Translations
                    </h1>

                    <p className="text-base sm:text-lg text-amber-100 font-urdu leading-loose text-right" dir="rtl">
                      بچوں کے لیے انگریزی پڑھنے، ہر لفظ کا درست تلفظ (آواز) سننے، با محاورہ اردو ترجمہ اور کمپیوٹر سے تصاویر اپلوڈ کر کے نئے اسباق بنانے کا مکمل آف لائن پورٹل۔
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <button
                        onClick={() => setActiveView('digital-library')}
                        className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold rounded-xl shadow-md transition-all active:scale-95 text-sm cursor-pointer"
                      >
                        <Library className="w-4 h-4" />
                        <span>Visit Digital Library (کتب خانہ دیکھیں)</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => {
                          if (PRELOADED_STORIES.length > 0) {
                            setActiveStory(PRELOADED_STORIES[0]);
                          }
                        }}
                        className="flex items-center gap-2 px-4 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl border border-white/20 transition-all active:scale-95 text-sm cursor-pointer"
                      >
                        <BookOpen className="w-4 h-4" />
                        <span>Start First Story (پہلا سبق)</span>
                      </button>

                      <button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="flex items-center gap-2 px-4 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl border border-white/20 transition-all active:scale-95 text-sm cursor-pointer"
                      >
                        <Upload className="w-4 h-4 text-emerald-300" />
                        <span>Upload Image (تصویر سے سبق بنائیں)</span>
                      </button>
                    </div>
                  </div>

                  {/* Visual Illustration (5 cols) */}
                  <div className="lg:col-span-5 relative hidden lg:block overflow-hidden">
                    <img
                      src="/src/assets/images/app_hero_reading_1791978753855.jpg"
                      alt="Children reading magic book"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-900 via-indigo-900/40 to-transparent"></div>
                  </div>
                </div>
              </div>
            )}

            {/* Sub-header & Level Filters */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 font-english text-left" dir="ltr">
                  {activeView === 'custom' ? 'My Custom Stories & Pages' : 'Graded Storybooks & Reading Lessons'}
                </h2>
                <div className="text-xs text-slate-500 font-urdu text-right" dir="rtl">
                  {activeView === 'custom' 
                    ? 'آپ کی کمپیوٹر سے شامل کردہ تصاویر اور ذاتی اسباق'
                    : 'کہانی منتخب کریں اور ہر لفظ کا تلفظ اور ترجمہ دیکھیں'}
                </div>
              </div>

              {/* Filter Tabs */}
              {activeView === 'library' && (
                <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl text-xs overflow-x-auto">
                  <button
                    onClick={() => setLevelFilter('all')}
                    className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
                      levelFilter === 'all' ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    All Stories ({allStories.length})
                  </button>
                  <button
                    onClick={() => setLevelFilter('Level 1: Phonics')}
                    className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
                      levelFilter === 'Level 1: Phonics' ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Level 1: Phonics
                  </button>
                  <button
                    onClick={() => setLevelFilter('Level 2: Easy Reader')}
                    className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
                      levelFilter === 'Level 2: Easy Reader' ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Level 2: Easy Reader
                  </button>
                  <button
                    onClick={() => setLevelFilter('Level 3: Short Stories')}
                    className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
                      levelFilter === 'Level 3: Short Stories' ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Level 3: Stories
                  </button>
                </div>
              )}
            </div>

            {/* Story Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedStories.map((story) => (
                <div
                  key={story.id}
                  onClick={() => setActiveStory(story)}
                  className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-lg hover:border-amber-400 transition-all duration-300 overflow-hidden flex flex-col cursor-pointer group"
                >
                  {/* Story Image Cover */}
                  <div className="relative aspect-4/3 bg-slate-100 overflow-hidden">
                    <img
                      src={story.coverImage}
                      alt={story.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                    />

                    {/* Level Label */}
                    <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-xs text-white text-xs font-semibold px-2.5 py-1 rounded-lg">
                      {story.level}
                    </div>

                    {/* Delete button for custom stories with stopPropagation and in-app modal */}
                    {story.isCustom && (
                      <button
                        onClick={(e) => handleInitiateDelete(e, story)}
                        className="absolute top-3 right-3 p-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl shadow-md transition-transform hover:scale-110 active:scale-95"
                        title="Delete custom story (کہانی حذف کریں)"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {/* Story Card Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-1.5">
                      <h3 className="text-xl font-bold text-slate-900 font-english group-hover:text-indigo-600 transition-colors text-left" dir="ltr">
                        {story.title}
                      </h3>
                      <div className="text-sm font-bold text-amber-800 font-urdu text-right" dir="rtl">
                        {story.urduTitle}
                      </div>
                      <p className="text-xs text-slate-600 font-urdu line-clamp-2 leading-relaxed text-right" dir="rtl">
                        {story.descriptionUrdu}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                      <span>{story.pages.length} Pages · {story.pages[0]?.sentences.length || 0} Sentences</span>
                      <span className="font-semibold text-indigo-600 group-hover:translate-x-1 transition-transform flex items-center gap-1 font-english">
                        Read Story <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Upload Card Prompt in the Grid */}
              <div
                onClick={() => setIsCreateModalOpen(true)}
                className="border-2 border-dashed border-slate-300 hover:border-emerald-500 bg-slate-50/60 hover:bg-emerald-50/40 rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all min-h-[300px] group"
              >
                <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Plus className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-1 font-english text-center" dir="ltr">
                  Create Lesson With Your Own Picture
                </h3>
                <div className="text-sm text-emerald-800 font-urdu mb-2 text-center" dir="rtl">
                  کمپیوٹر سے اپنی تصویر شامل کریں
                </div>
                <p className="text-xs text-slate-500 max-w-xs font-urdu text-center leading-relaxed" dir="rtl">
                  کوئی بھی تصویر اپلوڈ کر کے AI سے انگریزی اور اردو ترجمہ خودکار حاصل کریں اور الفاظ کے تلفظ سنیں۔
                </p>
              </div>
            </div>

            {/* Empty state for custom stories if none created yet */}
            {activeView === 'custom' && customStories.length === 0 && (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                  <Upload className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-slate-800 font-english" dir="ltr">No Custom Stories Yet</h3>
                  <p className="text-sm text-slate-600 font-urdu" dir="rtl">
                    آپ نے ابھی تک کمپیوٹر سے کوئی تصویر شامل نہیں کی۔ اوپر دیے گئے بٹن سے تصویر شامل کریں اور AI کی مدد سے فوری سبق بنائیں!
                  </p>
                </div>
                <button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-sm transition-all"
                >
                  Upload Picture & Create (+ تصویر شامل کریں)
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 px-4 sm:px-8 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800 font-english">Kids English-Urdu Digital Library & Reader</span>
            <span>·</span>
            <span className="font-urdu" dir="rtl">ڈیجیٹل کتب خانہ و آف لائن ریڈنگ پورٹل</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-emerald-700 font-medium">● 100% Free Downloads · Offline Ready · Online Audio Reader</span>
          </div>
        </div>
      </footer>

      {/* Custom Page / Image Upload Modal */}
      <CustomPageCreatorModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onStoryCreated={handleStoryCreated}
      />

      {/* Book Upload to Digital Library Modal */}
      <BookUploadModal
        isOpen={isBookUploadModalOpen}
        onClose={() => setIsBookUploadModalOpen(false)}
        onBookUploaded={(book) => {
          setActiveView('digital-library');
          showToast(`کتاب "${book.title}" فرنٹ پیج کے ساتھ لائبریری میں شامل ہو گئی!`);
        }}
      />

      {/* In-App Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={!!storyToDelete}
        storyTitle={storyToDelete?.title || ''}
        onConfirm={handleConfirmDelete}
        onCancel={() => setStoryToDelete(null)}
      />
    </div>
  );
}
