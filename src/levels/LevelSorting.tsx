import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DuoButton } from '../components/DuoButton';
import { PytoMascot, type PytoMood } from '../components/PytoMascot';
import { CelebrationDrawer } from '../components/CelebrationDrawer';
import { sound } from '../utils/audio';
import { triggerLevelWinConfetti } from '../utils/confetti';
import { Gamepad2, Award, RotateCcw } from 'lucide-react';

interface CardQuestion {
  id: number;
  valueText: string;
  correctType: 'int' | 'float' | 'str' | 'bool';
  explanation: string;
  isTrap?: boolean;
}

const CARDS_DATA: CardQuestion[] = [
  {
    id: 1,
    valueText: '42',
    correctType: 'int',
    explanation: '42 adalah bilangan bulat tanpa tanda koma atau titik desimal.',
  },
  {
    id: 2,
    valueText: '"Halo Dunia"',
    correctType: 'str',
    explanation: 'Semua teks yang diapit tanda petik (" atau \') adalah string (str).',
  },
  {
    id: 3,
    valueText: '3.14',
    correctType: 'float',
    explanation: 'Bilangan dengan titik pecahan desimal di Python adalah float.',
  },
  {
    id: 4,
    valueText: 'True',
    correctType: 'bool',
    explanation: 'True dan False (diawali huruf kapital) adalah nilai kebenaran Boolean (bool).',
  },
  {
    id: 5,
    valueText: '"16"',
    correctType: 'str',
    isTrap: true,
    explanation: 'Jebakan Klasik! Walau isinya angka 16, karena diapit tanda petik ("16"), tipenya adalah string (str).',
  },
  {
    id: 6,
    valueText: '0.0',
    correctType: 'float',
    isTrap: true,
    explanation: 'Meskipun nilainya nol, adanya titik pecahan (.0) menjadikannya float.',
  },
  {
    id: 7,
    valueText: 'False',
    correctType: 'bool',
    explanation: 'False adalah tipe Boolean yang merepresentasikan kondisi salah.',
  },
  {
    id: 8,
    valueText: '"False"',
    correctType: 'str',
    isTrap: true,
    explanation: 'Awas Tertipu! Karena diapit tanda petik ("False"), komputer membacanya sebagai teks biasa (str), bukan boolean!',
  },
  {
    id: 9,
    valueText: '-250',
    correctType: 'int',
    explanation: 'Bilangan bulat negatif tanpa koma tetap bertipe integer (int).',
  },
  {
    id: 10,
    valueText: '7.0',
    correctType: 'float',
    isTrap: true,
    explanation: 'Adanya .0 membuat Python menyimpannya sebagai float berpresisi ganda.',
  },
];

export const LevelSorting: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [currentFeedback, setCurrentFeedback] = useState({ title: '', explanation: '' });
  const [pytoMood, setPytoMood] = useState<PytoMood>('idle');
  const [pytoSpeech, setPytoSpeech] = useState<string>(
    'Pilah kartu nilai di tengah ke dalam corong tipe data yang tepat!'
  );
  const [cardError, setCardError] = useState(false);

  const currentCard = CARDS_DATA[currentIndex];

  const handleSelectBasket = (type: 'int' | 'float' | 'str' | 'bool') => {
    if (drawerOpen) return;

    if (type === currentCard.correctType) {
      // Benar
      sound.playVictory();
      sound.playCoin();
      setIsCorrect(true);
      setCurrentFeedback({
        title: currentCard.isTrap ? 'Hebat! Kamu Lolos dari Jebakan!' : 'Luar Biasa, Tepat!',
        explanation: currentCard.explanation,
      });
      setDrawerOpen(true);
      setPytoMood('happy');
      setPytoSpeech(currentCard.explanation);
    } else {
      // Salah
      sound.playBonk();
      setIsCorrect(false);
      setCardError(true);
      setTimeout(() => setCardError(false), 500);
      setCurrentFeedback({
        title: 'Ups! Kurang Tepat',
        explanation: currentCard.explanation,
      });
      setDrawerOpen(true);
      setPytoMood('confused');
      setPytoSpeech(`Jangan menyerah! ${currentCard.explanation}`);
    }
  };

  const handleNextCard = () => {
    setDrawerOpen(false);
    if (currentIndex + 1 < CARDS_DATA.length) {
      setCurrentIndex(currentIndex + 1);
      setPytoMood('idle');
      setPytoSpeech('Kartu berikutnya siap! Tentukan tipe datanya.');
    } else {
      setIsFinished(true);
      sound.playVictory();
      triggerLevelWinConfetti();
      setPytoMood('happy');
      setPytoSpeech('Horeee! Kamu telah menamatkan semua 10 kartu tipe data dengan gemilang!');
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setIsFinished(false);
    setDrawerOpen(false);
    setPytoMood('idle');
    setPytoSpeech('Game dimulai kembali. Ayo raih rekor skor baru!');
  };

  return (
    <div className="space-y-6">
      {/* Banner Level */}
      <div className="bg-gradient-to-r from-amber-50 via-white to-purple-50 border-2 border-amber-200/80 rounded-3xl p-5 shadow-sm flex flex-col md:flex-row items-center justify-between gap-5">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-black uppercase tracking-wider">
            <Gamepad2 className="w-3.5 h-3.5" />
            Game Sortir Tipe Data
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Pilahan Kartu Tipe Data
          </h1>
          <p className="text-sm text-slate-600 max-w-lg">
            Uji intuisimu membedakan <strong>int</strong>, <strong>float</strong>, <strong>str</strong>, dan <strong>bool</strong>. Awas jebakan tanda petik!
          </p>
        </div>

        {/* Maskot Pyto */}
        <div className="flex-shrink-0">
          <PytoMascot mood={pytoMood} speechText={pytoSpeech} size={130} />
        </div>
      </div>

      {!isFinished ? (
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Progress Bar Soal */}
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 px-1">
            <span>Kartu {currentIndex + 1} dari {CARDS_DATA.length}</span>
            <span>{Math.round(((currentIndex + 1) / CARDS_DATA.length) * 100)}% Selesai</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden p-0.5 border border-slate-300">
            <div
              className="bg-gradient-to-r from-amber-400 to-emerald-400 h-full rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / CARDS_DATA.length) * 100}%` }}
            ></div>
          </div>

          {/* Kartu Pertanyaan 3D dengan Animasi Masuk/Keluar Halus */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.92, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: -15 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className={`bg-white border-4 border-slate-800 rounded-3xl p-8 sm:p-12 text-center shadow-xl transform transition-all duration-200 ${
                cardError ? 'animate-error-shake' : 'hover:scale-102'
              }`}
            >
              <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 bg-slate-100 rounded-full text-slate-500 mb-4 inline-block">
                Periksa Nilai Ini:
              </span>
              <div className="my-6">
                <span className="font-mono text-4xl sm:text-5xl font-black text-slate-900 bg-slate-50 px-6 py-3 rounded-2xl border-2 border-slate-200 inline-block shadow-inner">
                  {currentCard.valueText}
                </span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-slate-400">
                Manakah tipe data Python yang paling tepat untuk nilai di atas?
              </p>
            </motion.div>
          </AnimatePresence>

          {/* 4 Corong / Tombol Taktil 3D */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <DuoButton
              variant="secondary"
              fullWidth
              onClick={() => handleSelectBasket('int')}
            >
              int
            </DuoButton>

            <DuoButton
              variant="warning"
              fullWidth
              onClick={() => handleSelectBasket('float')}
            >
              float
            </DuoButton>

            <DuoButton
              variant="primary"
              fullWidth
              onClick={() => handleSelectBasket('str')}
            >
              str
            </DuoButton>

            <DuoButton
              variant="danger"
              fullWidth
              onClick={() => handleSelectBasket('bool')}
            >
              bool
            </DuoButton>
          </div>
        </div>
      ) : (
        /* Layar Sukses Menamatkan Semua Kartu */
        <div className="max-w-xl mx-auto bg-white border-2 border-emerald-400 rounded-3xl p-8 text-center shadow-xl space-y-5 animate-in zoom-in-95 duration-300">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-inner">
            <Award className="w-10 h-10" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Selamat! Semua Kartu Selesai!
          </h2>
          <p className="text-sm text-slate-600">
            Kamu telah berhasil menuntaskan seluruh 10 kartu tipe data, termasuk mengenali jebakan tanda petik dan nilai desimal dengan tepat.
          </p>

          <div className="pt-3">
            <DuoButton
              variant="primary"
              fullWidth
              onClick={handleRestart}
              icon={<RotateCcw className="w-5 h-5" />}
            >
              Mainkan Lagi untuk Latihan
            </DuoButton>
          </div>
        </div>
      )}

      {/* Sliding Celebration Drawer */}
      <CelebrationDrawer
        isOpen={drawerOpen}
        isCorrect={isCorrect}
        title={currentFeedback.title}
        explanation={currentFeedback.explanation}
        onContinue={handleNextCard}
        onRetry={() => setDrawerOpen(false)}
      />
    </div>
  );
};
