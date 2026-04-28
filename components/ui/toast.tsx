"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, AlertCircle, X } from "lucide-react";

export type ToastType = "success" | "error" | "info";

export interface ToastProps {
  id: string;
  message: string;
  type: ToastType;
}

let toastListener: ((toast: ToastProps) => void) | null = null;

export const toast = (message: string, type: ToastType = "info") => {
  if (toastListener) {
    toastListener({ id: Math.random().toString(), message, type });
  }
};

export function Toaster() {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  useEffect(() => {
    toastListener = (toast) => {
      setToasts((prev) => [...prev, toast]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== toast.id));
      }, 5000);
    };

    return () => {
      toastListener = null;
    };
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`flex items-center gap-3 p-4 pr-12 min-w-[300px] rounded-xl border shadow-xl pointer-events-auto animate-in slide-in-from-right-8 fade-in duration-300 ${
            t.type === "success"
              ? "bg-zinc-900 border-green-500/20 text-white"
              : t.type === "error"
              ? "bg-red-950 border-red-500/30 text-white"
              : "bg-zinc-900 border-white/10 text-white"
          }`}
        >
          {t.type === "success" && <CheckCircle2 className="h-5 w-5 text-green-500" />}
          {t.type === "error" && <AlertCircle className="h-5 w-5 text-red-500" />}
          {t.type === "info" && <AlertCircle className="h-5 w-5 text-blue-500" />}
          
          <span className="font-medium">{t.message}</span>
          
          <button
            onClick={() => removeToast(t.id)}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-zinc-400 hover:text-white transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
