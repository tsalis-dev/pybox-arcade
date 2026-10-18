import React from 'react';

export type PytoMood = 'idle' | 'happy' | 'confused' | 'talking';

interface PytoMascotProps {
  mood?: PytoMood;
  speechText?: string;
  size?: number;
  className?: string;
}

export const PytoMascot: React.FC<PytoMascotProps> = ({
  mood = 'idle',
  speechText,
  size = 140,
  className = '',
}) => {
  return (
    <div className={`relative flex items-center gap-3 select-none ${className}`}>
      {/* Speech Bubble (Balon Percakapan Pyto) */}
      {speechText && (
        <div className="relative bg-white border-2 border-emerald-500/80 rounded-2xl p-3.5 shadow-lg max-w-xs text-xs sm:text-sm font-semibold text-slate-700 animate-in fade-in zoom-in-95 duration-200">
          <p>{speechText}</p>
          {/* Ekor Balon Percakapan mengarah ke kanan (ke arah kepala Pyto) */}
          <div className="absolute top-1/2 -right-2 -translate-y-1/2 w-3 h-3 bg-white border-t-2 border-r-2 border-emerald-500/80 rotate-45"></div>
        </div>
      )}

      {/* Wadah Karakter Ular Vektor */}
      <div style={{ width: size, height: size }} className="relative flex-shrink-0">
        <svg
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`w-full h-full drop-shadow-md transition-all duration-300 ${
            mood === 'idle'
              ? 'animate-pyto-breathe'
              : mood === 'happy'
              ? 'animate-pyto-jump'
              : mood === 'confused'
              ? 'animate-pyto-tilt'
              : ''
          }`}
        >
          <defs>
            <linearGradient id="pytoGreenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#34D399" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
            <linearGradient id="pytoYellowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FBBF24" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
          </defs>

          {/* Bayangan Lantai */}
          <ellipse cx="100" cy="180" rx="55" ry="9" fill="#94A3B8" opacity="0.35" />

          {/* Tubuh Melingkar (Coiled Body) */}
          <path
            d="M 50 155 C 38 135 60 110 90 115 C 130 120 160 140 152 162 C 146 178 78 182 50 155 Z"
            fill="url(#pytoGreenGrad)"
            stroke="#065F46"
            strokeWidth="4"
          />

          {/* Pola Perut Kuning Bersegmen */}
          <path
            d="M 64 152 C 75 142 118 144 136 164 C 112 176 80 171 64 152 Z"
            fill="url(#pytoYellowGrad)"
            opacity="0.95"
          />

          {/* Kepala Pyto */}
          <g
            className={`origin-[100px_90px] transition-transform duration-300 ${
              mood === 'confused' ? 'rotate-12' : ''
            }`}
          >
            {/* Bentuk Kepala Bulat Ramah */}
            <ellipse
              cx="100"
              cy="80"
              rx="50"
              ry="44"
              fill="url(#pytoGreenGrad)"
              stroke="#065F46"
              strokeWidth="4"
            />

            {/* Bintik Khas Piton di Kening */}
            <circle cx="100" cy="50" r="8" fill="url(#pytoYellowGrad)" />
            <circle cx="82" cy="54" r="5" fill="url(#pytoYellowGrad)" />
            <circle cx="118" cy="54" r="5" fill="url(#pytoYellowGrad)" />

            {/* Pipi Merah Blush Lembut */}
            <ellipse cx="65" cy="94" rx="8" ry="4.5" fill="#F43F5E" opacity="0.45" />
            <ellipse cx="135" cy="94" rx="8" ry="4.5" fill="#F43F5E" opacity="0.45" />

            {/* MATA (Ekspresif berdasarkan mood) */}
            {mood === 'happy' ? (
              /* Mata Lengkung Gembira (^ ^) */
              <g stroke="#064E3B" strokeWidth="4" strokeLinecap="round">
                <path d="M 72 78 Q 82 68 92 78" />
                <path d="M 108 78 Q 118 68 128 78" />
              </g>
            ) : (
              /* Mata Normal dengan Animasi Berkedip Spontan */
              <g className="animate-pyto-blink origin-[100px_76px]">
                {/* Mata Kiri */}
                <circle cx="82" cy="76" r="13" fill="#FFFFFF" stroke="#065F46" strokeWidth="3" />
                <circle cx="84" cy="76" r="6.5" fill="#0F172A" />
                <circle cx="82" cy="73" r="2.5" fill="#FFFFFF" />

                {/* Mata Kanan */}
                <circle cx="118" cy="76" r="13" fill="#FFFFFF" stroke="#065F46" strokeWidth="3" />
                <circle cx="120" cy="76" r="6.5" fill="#0F172A" />
                <circle cx="118" cy="73" r="2.5" fill="#FFFFFF" />
              </g>
            )}

            {/* Lidah Bercabang Menjulur */}
            <path
              d="M 100 106 L 100 120 M 100 120 L 94 128 M 100 120 L 106 128"
              stroke="#F43F5E"
              strokeWidth="3.5"
              strokeLinecap="round"
              className="animate-pyto-tongue origin-[100px_106px]"
            />

            {/* Mulut / Senyuman */}
            {mood === 'talking' ? (
              <ellipse cx="100" cy="100" rx="9" ry="6" fill="#991B1B" />
            ) : mood === 'confused' ? (
              <path
                d="M 90 100 Q 100 95 110 102"
                stroke="#065F46"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M 88 98 Q 100 110 112 98"
                stroke="#065F46"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
            )}

            {/* Tanda Tanya saat Berpikir / Bingung */}
            {mood === 'confused' && (
              <text
                x="142"
                y="40"
                fontSize="26"
                fontWeight="900"
                fill="#F59E0B"
                className="animate-bounce font-mono"
              >
                ?
              </text>
            )}

            {/* Topi Pesta saat Happy */}
            {mood === 'happy' && (
              <g transform="translate(85, 12)">
                <polygon points="15,0 0,35 30,35" fill="#EC4899" stroke="#BE185D" strokeWidth="2" />
                <circle cx="15" cy="0" r="4" fill="#FBBF24" />
              </g>
            )}
          </g>
        </svg>
      </div>
    </div>
  );
};
