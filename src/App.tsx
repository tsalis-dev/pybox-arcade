import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TopHUD } from './components/TopHUD';
import { LevelVariables } from './levels/LevelVariables';
import { LevelSorting } from './levels/LevelSorting';
import { LevelOperators } from './levels/LevelOperators';
import { LevelChallenges } from './levels/LevelChallenges';
import { sound } from './utils/audio';

export const App: React.FC = () => {
  const [activeModuleId, setActiveModuleId] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const handleToggleMute = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between selection:bg-sky-200">
      {/* Top Navbar dengan Tombol Menu Hamburger & Audio */}
      <TopHUD
        activeModuleId={activeModuleId}
        onSelectModule={(id) => setActiveModuleId(id)}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
      />

      {/* Konten Utama Modul dengan Animasi Transisi Halus Saat Ganti Tab */}
      <main className="max-w-6xl w-full mx-auto px-4 py-6 sm:py-8 flex-1 overflow-x-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeModuleId}
            initial={{ opacity: 0, y: 16, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.985 }}
            transition={{ duration: 0.22, ease: [0.25, 1, 0.5, 1] }}
          >
            {activeModuleId === 1 && <LevelVariables />}
            {activeModuleId === 2 && <LevelSorting />}
            {activeModuleId === 3 && <LevelOperators />}
            {activeModuleId === 4 && <LevelChallenges />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer Bersih & Minimalis */}
      <footer className="border-t border-slate-200/80 bg-white/60 py-3.5 px-4 text-center text-xs text-slate-400 font-medium">
        PyBox — Media Interaktif Pemrograman Python
      </footer>
    </div>
  );
};

export default App;
