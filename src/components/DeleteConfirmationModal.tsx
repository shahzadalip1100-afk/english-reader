import React from 'react';
import { Trash2, AlertTriangle, X } from 'lucide-react';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  storyTitle: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  storyTitle,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onCancel}
    >
      <div
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden transform transition-all p-6 space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center">
            <Trash2 className="w-6 h-6" />
          </div>
          <button
            onClick={onCancel}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-bold text-slate-900 font-english">
            Delete Story? (کہانی حذف کریں؟)
          </h3>
          <p className="text-sm text-slate-600 font-urdu leading-relaxed" dir="rtl">
            کیا آپ واقعی کہانی <strong className="text-rose-600 font-bold">"{storyTitle}"</strong> کو حذف کرنا چاہتے ہیں؟ یہ کہانی آپ کے براؤزر سے ہمیشہ کے لیے ختم ہو جائے گی۔
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 font-semibold text-sm transition-colors"
          >
            منسوخ کریں (Cancel)
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-sm shadow-xs transition-all active:scale-95"
          >
            جی ہاں، حذف کریں (Delete)
          </button>
        </div>
      </div>
    </div>
  );
};
