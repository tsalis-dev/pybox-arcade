import React from 'react';
import { DuoButton } from './DuoButton';
import { CheckCircle2, AlertCircle, ArrowRight, RotateCcw } from 'lucide-react';
import { PytoMascot } from './PytoMascot';

interface CelebrationDrawerProps {
  isOpen: boolean;
  isCorrect: boolean;
  title: string;
  explanation: string;
  onContinue: () => void;
  onRetry?: () => void;
}

export const CelebrationDrawer: React.FC<CelebrationDrawerProps> = ({
  isOpen,
  isCorrect,
  title,
  explanation,
  onContinue,
  onRetry,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 border-t-4 shadow-2xl transition-all transform duration-300 ease-out ${
        isCorrect
          ? 'bg-emerald-50/95 border-emerald-500 text-emerald-950 backdrop-blur-md'
          : 'bg-rose-50/95 border-rose-500 text-rose-950 backdrop-blur-md'
      }`}
    >
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Konten Umpan Balik & Maskot */}
        <div className="flex items-center gap-4 w-full md:w-auto">
          {/* Maskot Pyto Reaktif */}
          <div className="hidden sm:block">
            <PytoMascot mood={isCorrect ? 'happy' : 'confused'} size={76} />
          </div>

          <div className="flex items-start gap-3">
            <div
              className={`p-2.5 rounded-2xl flex-shrink-0 text-white shadow-md ${
                isCorrect ? 'bg-emerald-500' : 'bg-rose-500'
              }`}
            >
              {isCorrect ? <CheckCircle2 className="w-6 h-6" /> : <AlertCircle className="w-6 h-6" />}
            </div>
            <div>
              <h3 className="text-lg font-black tracking-tight">{title}</h3>
              <p className="text-xs sm:text-sm font-medium text-slate-700 mt-1 max-w-xl leading-relaxed">
                {explanation}
              </p>
            </div>
          </div>
        </div>

        {/* Tombol Aksi Taktil 3D */}
        <div className="flex items-center gap-2.5 w-full md:w-auto justify-end">
          {!isCorrect && onRetry && (
            <DuoButton variant="neutral" onClick={onRetry} icon={<RotateCcw className="w-4 h-4" />}>
              Coba Lagi
            </DuoButton>
          )}
          <DuoButton
            variant={isCorrect ? 'primary' : 'danger'}
            onClick={onContinue}
            icon={<ArrowRight className="w-4 h-4" />}
          >
            {isCorrect ? 'Lanjutkan' : 'Mengerti'}
          </DuoButton>
        </div>
      </div>
    </div>
  );
};
