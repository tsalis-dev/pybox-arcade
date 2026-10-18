import React from 'react';
import { sound } from '../utils/audio';

export type DuoButtonVariant = 'primary' | 'secondary' | 'warning' | 'danger' | 'neutral';

interface DuoButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: DuoButtonVariant;
  children: React.ReactNode;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

export const DuoButton: React.FC<DuoButtonProps> = ({
  variant = 'primary',
  children,
  icon,
  fullWidth = false,
  className = '',
  onClick,
  disabled,
  ...props
}) => {
  const styles: Record<DuoButtonVariant, string> = {
    primary:
      'bg-emerald-500 hover:bg-emerald-400 text-white border-b-4 border-emerald-700 active:border-b-0 active:translate-y-1',
    secondary:
      'bg-sky-500 hover:bg-sky-400 text-white border-b-4 border-sky-700 active:border-b-0 active:translate-y-1',
    warning:
      'bg-amber-400 hover:bg-amber-300 text-amber-950 border-b-4 border-amber-600 active:border-b-0 active:translate-y-1',
    danger:
      'bg-rose-500 hover:bg-rose-400 text-white border-b-4 border-rose-700 active:border-b-0 active:translate-y-1',
    neutral:
      'bg-white hover:bg-slate-50 text-slate-700 border-2 border-slate-200 border-b-4 border-b-slate-300 active:border-b-2 active:translate-y-0.5',
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled) {
      sound.playPop();
      if (onClick) onClick(e);
    }
  };

  return (
    <button
      {...props}
      disabled={disabled}
      onClick={handleClick}
      className={`relative inline-flex items-center justify-center gap-2 font-bold tracking-wide uppercase px-5 py-3 rounded-2xl cursor-pointer select-none transition-all duration-75 shadow-sm active:shadow-none hover:-translate-y-0.5 disabled:opacity-50 disabled:pointer-events-none disabled:border-b-4 ${
        styles[variant]
      } ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};
