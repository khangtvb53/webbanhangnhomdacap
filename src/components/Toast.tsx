import React from 'react';
import { useStore } from '../context/StoreContext';
import { CheckCircle2 } from 'lucide-react';

export const Toast: React.FC = () => {
  const { activeToast } = useStore();

  if (!activeToast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 bg-zinc-900/95 border border-zinc-700/80 text-white text-xs font-semibold rounded-xl shadow-2xl shadow-black/60 backdrop-blur-md animate-in fade-in slide-in-from-bottom-3 duration-200">
      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
      <span>{activeToast}</span>
    </div>
  );
};
