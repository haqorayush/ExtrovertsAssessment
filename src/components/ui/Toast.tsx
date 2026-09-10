import { AlertCircle, CheckCircle2, Info, X } from 'lucide-react';
import type { ToastNotification } from '../../types/wizard';

interface ToastProps {
  toasts: ToastNotification[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 w-11/12 max-w-md pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-2xl transition-all duration-300 transform translate-y-0 backdrop-blur-md ${
            toast.type === 'error'
              ? 'bg-[#1F1018]/95 border-red-500/40 text-red-100'
              : toast.type === 'success'
              ? 'bg-[#0E2018]/95 border-emerald-500/40 text-emerald-100'
              : 'bg-[#141226]/95 border-purple-500/40 text-purple-100'
          }`}
        >
          <div className="mt-0.5 shrink-0">
            {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-red-400" />}
            {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
            {toast.type === 'info' && <Info className="w-5 h-5 text-purple-400" />}
          </div>

          <div className="flex-1 text-sm font-medium leading-relaxed">
            {toast.message}
          </div>

          <button
            onClick={() => onDismiss(toast.id)}
            className="text-white/50 hover:text-white transition-colors p-1 -mr-1 -mt-1 rounded-lg"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
