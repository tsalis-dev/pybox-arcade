import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DuoButton } from '../components/DuoButton';
import { PytoMascot, type PytoMood } from '../components/PytoMascot';
import { sound } from '../utils/audio';
import { Calculator, Zap, AlertTriangle, Sparkles } from 'lucide-react';

type Operator = '+' | '-' | '*' | '/' | '//' | '%' | '**';

export const LevelOperators: React.FC = () => {
  const [valA, setValA] = useState('10');
  const [valB, setValB] = useState('3');
  const [selectedOp, setSelectedOp] = useState<Operator>('+');
  const [calcResult, setCalcResult] = useState<{
    expr: string;
    output: string;
    type: string;
    explanation: string;
    isError?: boolean;
  } | null>(null);

  const [pytoMood, setPytoMood] = useState<PytoMood>('idle');
  const [pytoSpeech, setPytoSpeech] = useState<string>(
    'Pilih operator aritmatika Python untuk melihat bagaimana komputer memproses angka atau teks!'
  );

  // Komparator Jebakan Teks vs Angka
  const [strA, setStrA] = useState('10');
  const [strB, setStrB] = useState('5');

  const operators: { symbol: Operator; name: string; desc: string }[] = [
    { symbol: '+', name: 'Penjumlahan', desc: 'Menjumlahkan dua bilangan' },
    { symbol: '-', name: 'Pengurangan', desc: 'Mengurangi nilai A dengan B' },
    { symbol: '*', name: 'Perkalian', desc: 'Mengalikan dua bilangan' },
    { symbol: '/', name: 'Pembagian Riil', desc: 'Selalu menghasilkan float (desimal)' },
    { symbol: '//', name: 'Floor Division', desc: 'Pembagian bulat (membuang desimal)' },
    { symbol: '%', name: 'Modulo', desc: 'Sisa hasil pembagian' },
    { symbol: '**', name: 'Pangkat', desc: 'A dipangkatkan B (eksponensial)' },
  ];

  const handleCalculate = () => {
    const a = parseFloat(valA);
    const b = parseFloat(valB);

    if (isNaN(a) || isNaN(b)) {
      sound.playBonk();
      setPytoMood('confused');
      setPytoSpeech('Pastikan kedua input adalah angka yang valid ya!');
      return;
    }

    if ((selectedOp === '/' || selectedOp === '//' || selectedOp === '%') && b === 0) {
      sound.playBonk();
      setCalcResult({
        expr: `${valA} ${selectedOp} 0`,
        output: 'ZeroDivisionError: division by zero',
        type: 'Error',
        explanation: 'Di Python dan matematika, pembagian dengan angka 0 adalah operasi ilegal yang memicu galat runtime!',
        isError: true,
      });
      setPytoMood('confused');
      setPytoSpeech('Ups! ZeroDivisionError terjadi. Kita tidak boleh membagi bilangan dengan nol!');
      return;
    }

    let res: number | string = 0;
    let type = 'int';
    let explanation = '';

    switch (selectedOp) {
      case '+':
        res = a + b;
        type = Number.isInteger(res) ? 'int' : 'float';
        explanation = `Hasil penjumlahan ${a} ditambah ${b} adalah ${res}.`;
        break;
      case '-':
        res = a - b;
        type = Number.isInteger(res) ? 'int' : 'float';
        explanation = `Hasil selisih ${a} dikurangi ${b} adalah ${res}.`;
        break;
      case '*':
        res = a * b;
        type = Number.isInteger(res) ? 'int' : 'float';
        explanation = `Hasil perkalian ${a} dikali ${b} adalah ${res}.`;
        break;
      case '/':
        res = a / b;
        type = 'float';
        explanation = `Perhatikan! Di Python 3, pembagian tunggal (/) SELALU menghasilkan bilangan berkoma (float), contoh: 10 / 2 = 5.0.`;
        break;
      case '//':
        res = Math.floor(a / b);
        type = 'int';
        explanation = `Floor division (//) membagi bilangan lalu membuang seluruh angka di belakang koma (dibulatkan ke bawah).`;
        break;
      case '%':
        res = ((a % b) + b) % b; // Python modulo wrap
        type = Number.isInteger(res) ? 'int' : 'float';
        explanation = `Modulo (%) mengembalikan sisa bagi. Misal: 10 dibagi 3 menghasilkan 3 bersisa 1.`;
        break;
      case '**':
        res = Math.pow(a, b);
        type = Number.isInteger(res) ? 'int' : 'float';
        explanation = `Pangkat (**) mengalikan bilangan sebanyak pangkatnya. ${a} ** ${b} = ${res}.`;
        break;
    }

    sound.playVictory();
    sound.playCoin();

    setCalcResult({
      expr: `${valA} ${selectedOp} ${valB}`,
      output: String(res),
      type,
      explanation,
      isError: false,
    });
    setPytoMood('happy');
    setPytoSpeech(explanation);
  };

  return (
    <div className="space-y-6">
      {/* Banner Level */}
      <div className="bg-gradient-to-r from-emerald-50 via-white to-sky-50 border-2 border-emerald-200/80 rounded-3xl p-5 shadow-sm flex flex-col md:flex-row items-center justify-between gap-5">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5" />
            Lab Operasi Aritmatika
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Laboratorium Operasi Python
          </h1>
          <p className="text-sm text-slate-600 max-w-lg">
            Buktikan perbedaan pembagian nyata <code>/</code>, pembagian bulat <code>//</code>, dan sisa bagi <code>%</code>!
          </p>
        </div>

        {/* Maskot Pyto */}
        <div className="flex-shrink-0">
          <PytoMascot mood={pytoMood} speechText={pytoSpeech} size={130} />
        </div>
      </div>

      {/* Grid 2 Kolom: Reaktor Kalkulator & Hasil Reaksi */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Kolom Kiri: Input Nilai & Pemilih Operator */}
        <div className="lg:col-span-6 bg-white border-2 border-slate-200 rounded-3xl p-6 shadow-sm space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Zap className="w-5 h-5 text-emerald-500" />
            <h2 className="font-extrabold text-slate-800 text-lg">Reaktor Perhitungan</h2>
          </div>

          {/* Form Input Angka */}
          <div className="grid grid-cols-2 gap-3 font-mono">
            <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-3 focus-within:border-emerald-500 focus-within:bg-white transition-all">
              <label className="block text-[11px] font-bold text-slate-400 uppercase font-sans mb-1">
                Angka A :
              </label>
              <input
                type="number"
                value={valA}
                onChange={(e) => setValA(e.target.value)}
                className="w-full bg-transparent outline-none text-slate-800 font-bold text-lg"
              />
            </div>

            <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-3 focus-within:border-emerald-500 focus-within:bg-white transition-all">
              <label className="block text-[11px] font-bold text-slate-400 uppercase font-sans mb-1">
                Angka B :
              </label>
              <input
                type="number"
                value={valB}
                onChange={(e) => setValB(e.target.value)}
                className="w-full bg-transparent outline-none text-slate-800 font-bold text-lg"
              />
            </div>
          </div>

          {/* Tombol Pilihan 7 Operator */}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 font-sans">
              Pilih Operator Python:
            </label>
            <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5 font-mono">
              {operators.map((op) => (
                <button
                  key={op.symbol}
                  onClick={() => {
                    sound.playPop();
                    setSelectedOp(op.symbol);
                  }}
                  className={`py-2 rounded-xl font-black text-sm transition-all border-2 cursor-pointer ${
                    selectedOp === op.symbol
                      ? 'bg-emerald-500 border-emerald-700 text-white shadow-md scale-105'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                  title={`${op.name}: ${op.desc}`}
                >
                  {op.symbol}
                </button>
              ))}
            </div>
          </div>

          {/* Tombol Eksekusi Reaksi */}
          <DuoButton
            variant="primary"
            fullWidth
            onClick={handleCalculate}
            icon={<Sparkles className="w-5 h-5" />}
          >
            Hitung Reaksi
          </DuoButton>

          {/* Hasil Perhitungan Box dengan Animasi Kemunculan */}
          <AnimatePresence>
            {calcResult && (
              <motion.div
                initial={{ opacity: 0, y: 12, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12, scale: 0.96 }}
                transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                className={`p-4 rounded-2xl border-2 space-y-2 ${
                  calcResult.isError
                    ? 'bg-rose-50 border-rose-300 text-rose-900'
                    : 'bg-emerald-50/70 border-emerald-300 text-emerald-950'
                }`}
              >
                <div className="flex items-center justify-between font-mono text-xs font-bold text-slate-500">
                  <span>Ekspresi: {calcResult.expr}</span>
                  <span className="px-2 py-0.5 rounded-md bg-white border font-mono">
                    tipe: {calcResult.type}
                  </span>
                </div>
                <div className="font-mono text-2xl font-black">
                  = {calcResult.output}
                </div>
                <p className="text-xs font-semibold text-slate-600 leading-relaxed">
                  {calcResult.explanation}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Kolom Kanan: Jebakan Penggabungan Teks vs Angka (Concatenation Trap) */}
        <div className="lg:col-span-6 bg-white border-2 border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            <h2 className="font-extrabold text-slate-800 text-lg">
              Jebakan Klasik: Teks vs Angka
            </h2>
          </div>

          <p className="text-xs text-slate-600">
            Perhatikan apa yang terjadi saat operator <code>+</code> digunakan pada angka murni vs teks bertanda kutip:
          </p>

          <div className="grid grid-cols-2 gap-2 font-mono text-xs">
            <div className="bg-slate-50 border rounded-xl p-2">
              <label className="text-[10px] text-slate-400 block font-sans">Uji Nilai 1:</label>
              <input
                type="text"
                value={strA}
                onChange={(e) => setStrA(e.target.value)}
                className="w-full bg-transparent font-bold text-slate-800 outline-none"
              />
            </div>
            <div className="bg-slate-50 border rounded-xl p-2">
              <label className="text-[10px] text-slate-400 block font-sans">Uji Nilai 2:</label>
              <input
                type="text"
                value={strB}
                onChange={(e) => setStrB(e.target.value)}
                className="w-full bg-transparent font-bold text-slate-800 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Kolom Angka (Penjumlahan) */}
            <div className="p-4 rounded-2xl border-2 border-blue-200 bg-blue-50/50 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-100 text-blue-800 inline-block font-sans">
                Operasi Matematika (int)
              </span>
              <div className="font-mono text-sm font-bold text-slate-700">
                {Number(strA) || 0} + {Number(strB) || 0}
              </div>
              <div className="font-mono text-2xl font-black text-blue-700">
                = {(Number(strA) || 0) + (Number(strB) || 0)}
              </div>
              <p className="text-[11px] text-slate-500 leading-snug">
                Kedua nilai adalah tipe <strong>int</strong>, sehingga dijumlahkan nilainya secara matematis.
              </p>
            </div>

            {/* Kolom String (Penggabungan / Concatenation) */}
            <div className="p-4 rounded-2xl border-2 border-amber-200 bg-amber-50/50 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-100 text-amber-800 inline-block font-sans">
                Penggabungan Karakter (str)
              </span>
              <div className="font-mono text-sm font-bold text-slate-700">
                "{strA}" + "{strB}"
              </div>
              <div className="font-mono text-2xl font-black text-amber-700">
                = "{strA}{strB}"
              </div>
              <p className="text-[11px] text-slate-500 leading-snug">
                Kedua nilai bertipe <strong>str</strong>. Operator <code>+</code> merekatkan karakter, bukan menjumlahkan!
              </p>
            </div>
          </div>

          <div className="bg-slate-900 rounded-2xl p-4 text-xs font-mono text-slate-200 border-2 border-slate-800 space-y-2">
            <div className="text-amber-400 font-bold"># Mengapa ini sangat penting?</div>
            <p className="text-slate-300 leading-relaxed">
              Fungsi bawaan <code className="text-sky-300">input()</code> di Python selalu menghasilkan tipe <code className="text-emerald-300">str</code>! Jika kamu tidak membungkusnya dengan <code className="text-sky-300">int(input())</code>, maka <code className="text-emerald-300">"5" + "5"</code> akan menghasilkan <code className="text-amber-300">"55"</code>, bukan <code className="text-emerald-300">10</code>!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
