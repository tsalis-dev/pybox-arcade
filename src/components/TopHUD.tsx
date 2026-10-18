import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Menu, X, Check, Box, Gamepad2, Calculator, Terminal, ArrowRight } from 'lucide-react';
import { sound } from '../utils/audio';

export interface ModuleItem {
  id: number;
  title: string;
  tagline: string;
  desc: string;
  colorBg: string;
  colorBorder: string;
  colorText: string;
  colorBadge: string;
  icon: React.ReactNode;
}

interface TopHUDProps {
  activeModuleId: number;
  onSelectModule: (id: number) => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const MODULES: ModuleItem[] = [
  {
    id: 1,
    title: 'Kotak Variabel',
    tagline: 'Memori RAM & Kaidah Penamaan',
    desc: 'Memahami bagaimana komputer menyimpan data di memori melalui analogi kotak berlabel, validasi aturan penamaan Python (tanpa spasi, larangan angka awal), serta pembuktian konsep re-assignment (menimpa nilai).',
    colorBg: 'hover:bg-sky-50/70',
    colorBorder: 'hover:border-sky-300',
    colorText: 'text-sky-700',
    colorBadge: 'bg-sky-100 text-sky-800 border-sky-200',
    icon: <Box className="w-5 h-5 text-sky-600" />,
  },
  {
    id: 2,
    title: 'Game Tipe Data',
    tagline: 'Sortir Kartu & Deteksi Miskonsepsi',
    desc: 'Arena interaktif menyortir kartu nilai ke dalam 4 corong tipe data (int, float, str, bool) untuk melatih intuisi sekaligus membongkar jebakan klasik seperti angka bertanda kutip ("16") atau desimal nol (0.0).',
    colorBg: 'hover:bg-amber-50/70',
    colorBorder: 'hover:border-amber-300',
    colorText: 'text-amber-700',
    colorBadge: 'bg-amber-100 text-amber-800 border-amber-200',
    icon: <Gamepad2 className="w-5 h-5 text-amber-600" />,
  },
  {
    id: 3,
    title: 'Lab Operasi',
    tagline: '7 Operator & Teks vs Angka',
    desc: 'Kalkulator eksperimen 7 operator aritmatika (+, -, *, /, //, %, **), penanganan ZeroDivisionError, dan pembuktian langsung perbedaan penggabungan karakter teks ("10" + "5" = "105") vs penjumlahan matematika (15).',
    colorBg: 'hover:bg-emerald-50/70',
    colorBorder: 'hover:border-emerald-300',
    colorText: 'text-emerald-700',
    colorBadge: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    icon: <Calculator className="w-5 h-5 text-emerald-600" />,
  },
  {
    id: 4,
    title: 'Tantangan Praktik',
    tagline: 'Cyber Terminal Kode Mandiri',
    desc: 'Simulator terminal virtual untuk mengeksekusi 3 program Python nyata (program sambutan & hitung usia, kalkulator 4 operasi, ambang batas kelulusan logika boolean) serta rangkuman refleksi koding.',
    colorBg: 'hover:bg-purple-50/70',
    colorBorder: 'hover:border-purple-300',
    colorText: 'text-purple-700',
    colorBadge: 'bg-purple-100 text-purple-800 border-purple-200',
    icon: <Terminal className="w-5 h-5 text-purple-600" />,
  },
];

export const TopHUD: React.FC<TopHUDProps> = ({
  activeModuleId,
  onSelectModule,
  isMuted,
  onToggleMute,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const activeModule = MODULES.find((m) => m.id === activeModuleId) || MODULES[0];

  // Tutup drawer saat menekan tombol Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleOpenMenu = () => {
    sound.playPop();
    setIsMenuOpen(true);
  };

  const handleCloseMenu = () => {
    sound.playPop();
    setIsMenuOpen(false);
  };

  const handleSelect = (id: number) => {
    sound.playPop();
    onSelectModule(id);
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-2 border-slate-200 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 py-2.5 flex items-center justify-between gap-3">
          {/* Sisi Kiri: Logo Brand & Status Modul Aktif */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 to-emerald-400 flex items-center justify-center text-white shadow-sm">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/>
                  <path d="m3.3 7 8.7 5 8.7-5"/>
                  <path d="M12 22V12"/>
                </svg>
              </div>
              <div>
                <span className="font-extrabold text-base text-slate-800 tracking-tight">PyBox</span>
                <span className="text-[10px] font-black uppercase ml-1.5 px-1.5 py-0.5 bg-sky-100 text-sky-700 rounded-md">
                  Python
                </span>
              </div>
            </div>

            {/* Badge Modul Sedang Aktif */}
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold text-slate-600">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>{activeModule.title}</span>
            </div>
          </div>

          {/* Sisi Kanan: Tombol Audio & Tombol Hamburger Menu */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={onToggleMute}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200 transition-all cursor-pointer"
              title={isMuted ? 'Nyalakan Suara' : 'Bisukan Suara'}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-rose-500" /> : <Volume2 className="w-4 h-4 text-emerald-600" />}
            </button>

            {/* Tombol Hamburger Taktil */}
            <button
              onClick={handleOpenMenu}
              className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs sm:text-sm tracking-wide shadow-sm transition-all cursor-pointer active:scale-95"
              aria-label="Buka Menu Modul"
            >
              <Menu className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Menu Modul</span>
            </button>
          </div>
        </div>
      </header>

      {/* DRAWER SLIDE-OVER DARI SISI KANAN KE KIRI (MENUTUP SETENGAH WEB) */}
      <AnimatePresence>
        {isMenuOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Latar Belakang Gelap / Backdrop (Klik untuk menutup) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={handleCloseMenu}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs cursor-pointer"
            />

            {/* Panel Drawer Slide-In dari Kanan (Menutup 50% Layar pada Desktop) */}
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="absolute top-0 right-0 bottom-0 w-full sm:w-3/4 md:w-1/2 max-w-2xl h-full bg-white border-l-2 border-slate-200 shadow-2xl flex flex-col justify-between p-5 sm:p-7 overflow-hidden z-10"
              aria-label="Menu Modul Pembelajaran"
            >
              {/* Header Drawer */}
              <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 flex-shrink-0">
                <div>
                  <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                    Menu Modul Pembelajaran
                  </h2>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    Pilih salah satu dari 4 modul berikut untuk mulai belajar:
                  </p>
                </div>

                {/* Tombol Tutup X */}
                <button
                  onClick={handleCloseMenu}
                  className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold transition-all cursor-pointer active:scale-95 border border-slate-200"
                  title="Tutup Menu (Esc)"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* 4 KONTAINER TERBAGI SAMA BESAR SECARA VERTIKAL */}
              <div className="flex-1 flex flex-col gap-3 my-3.5 overflow-y-auto pr-1">
                {MODULES.map((m, index) => {
                  const isCurrent = m.id === activeModuleId;
                  return (
                    <motion.button
                      key={m.id}
                      initial={{ opacity: 0, x: 25 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.2 }}
                      onClick={() => handleSelect(m.id)}
                      className={`flex-1 min-h-[110px] text-left p-4 sm:p-5 rounded-2xl border-2 transition-all duration-150 cursor-pointer flex flex-col justify-between group ${
                        isCurrent
                          ? 'border-sky-500 bg-sky-50/60 shadow-sm ring-2 ring-sky-500/20'
                          : `border-slate-200 bg-white hover:shadow-md hover:-translate-y-0.5 ${m.colorBg} ${m.colorBorder}`
                      }`}
                    >
                      <div>
                        {/* Baris Atas: Ikon, Judul, & Badge */}
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center flex-shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                              {m.icon}
                            </div>
                            <div>
                              <h3 className={`text-sm sm:text-base font-black text-slate-900 group-hover:${m.colorText} transition-colors tracking-tight leading-tight`}>
                                {m.title}
                              </h3>
                              <span className="text-[10px] text-slate-400 font-semibold block leading-tight">
                                {m.tagline}
                              </span>
                            </div>
                          </div>

                          {isCurrent ? (
                            <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase tracking-wider border border-emerald-200">
                              <Check className="w-3 h-3 text-emerald-600" />
                              Aktif
                            </span>
                          ) : (
                            <div className="w-6 h-6 rounded-lg flex items-center justify-center text-slate-400 group-hover:text-slate-800 group-hover:translate-x-0.5 transition-all">
                              <ArrowRight className="w-4 h-4" />
                            </div>
                          )}
                        </div>

                        {/* Penjelasan Singkat Tab Ini Untuk Apa */}
                        <p className="text-[11px] sm:text-xs text-slate-600 font-medium leading-relaxed">
                          {m.desc}
                        </p>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {/* Footer Drawer */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-medium flex-shrink-0">
                <span>Tekan <kbd className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200 font-mono text-[10px] text-slate-600">Esc</kbd> untuk menutup.</span>
                <button
                  onClick={handleCloseMenu}
                  className="font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  Tutup Drawer
                </button>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
