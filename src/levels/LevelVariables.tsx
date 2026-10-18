import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DuoButton } from '../components/DuoButton';
import { PytoMascot, type PytoMood } from '../components/PytoMascot';
import { sound } from '../utils/audio';
import { HardDrive, PlusCircle, CheckCircle, AlertTriangle, Sparkles, Terminal } from 'lucide-react';

interface VariableSlot {
  name: string;
  value: string;
  type: 'int' | 'float' | 'str' | 'bool';
  address: string;
}

const RESERVED_KEYWORDS = [
  'False', 'None', 'True', 'and', 'as', 'assert', 'async', 'await', 'break',
  'class', 'continue', 'def', 'del', 'elif', 'else', 'except', 'finally',
  'for', 'from', 'global', 'if', 'import', 'in', 'is', 'lambda', 'nonlocal',
  'not', 'or', 'pass', 'raise', 'return', 'try', 'while', 'with', 'yield'
];

export const LevelVariables: React.FC = () => {
  const [varName, setVarName] = useState('');
  const [varValue, setVarValue] = useState('');
  const [slots, setSlots] = useState<VariableSlot[]>([
    { name: 'skor', value: '100', type: 'int', address: '0x01' },
    { name: 'nama_player', value: '"Alex"', type: 'str', address: '0x02' },
  ]);
  const [pytoMood, setPytoMood] = useState<PytoMood>('idle');
  const [pytoSpeech, setPytoSpeech] = useState<string>(
    'Halo! Aku Pyto. Ketikkan nama & nilai variabel untuk menyimpannya di slot memori RAM!'
  );
  const [lastSaved, setLastSaved] = useState<string | null>(null);

  // Validasi Aturan Sintaks Nama Variabel Python
  const validateName = (name: string): { valid: boolean; reason: string } => {
    if (!name.trim()) return { valid: false, reason: 'Nama variabel tidak boleh kosong.' };
    if (/\s/.test(name)) return { valid: false, reason: 'Python melarang spasi dalam nama variabel. Gunakan underscore (_).' };
    if (/^[0-9]/.test(name)) return { valid: false, reason: 'Nama variabel tidak boleh diawali angka (misal: gunakan skor1, bukan 1skor).' };
    if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(name)) return { valid: false, reason: 'Hanya boleh memuat huruf, angka, dan underscore (_).' };
    if (RESERVED_KEYWORDS.includes(name)) return { valid: false, reason: `'${name}' adalah kata kunci bawaan (reserved keyword) Python!` };
    return { valid: true, reason: 'Nama variabel valid menurut kaidah Python!' };
  };

  // Deteksi Tipe Data Otomatis (Type Inference)
  const detectType = (val: string): { type: 'int' | 'float' | 'str' | 'bool'; parsed: string } => {
    const trimmed = val.trim();
    if (trimmed === 'True' || trimmed === 'False') return { type: 'bool', parsed: trimmed };
    if (/^-?\d+$/.test(trimmed)) return { type: 'int', parsed: trimmed };
    if (/^-?\d+\.\d+$/.test(trimmed)) return { type: 'float', parsed: trimmed };
    if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
      return { type: 'str', parsed: trimmed };
    }
    // Jika user lupa tanda petik pada teks
    return { type: 'str', parsed: `"${trimmed}"` };
  };

  const validation = validateName(varName);

  const handleSave = () => {
    if (!validation.valid || !varValue.trim()) {
      sound.playBonk();
      setPytoMood('confused');
      setPytoSpeech(validation.valid ? 'Isi nilainya terlebih dahulu ya!' : validation.reason);
      return;
    }

    const { type, parsed } = detectType(varValue);
    const existingIndex = slots.findIndex((s) => s.name === varName.trim());

    if (existingIndex >= 0) {
      // Re-assignment (Menimpa nilai lama)
      const updated = [...slots];
      updated[existingIndex] = {
        ...updated[existingIndex],
        value: parsed,
        type: type,
      };
      setSlots(updated);
      setLastSaved(varName.trim());
      sound.playVictory();
      setPytoMood('happy');
      setPytoSpeech(`Keren! Variabel '${varName.trim()}' berhasil ditimpa (re-assigned) dengan nilai baru ${parsed}!`);
    } else {
      // Tambah variabel baru
      const nextAddress = `0x0${slots.length + 1}`;
      const newSlot: VariableSlot = {
        name: varName.trim(),
        value: parsed,
        type: type,
        address: nextAddress,
      };
      setSlots([...slots, newSlot]);
      setLastSaved(varName.trim());
      sound.playCoin();
      setPytoMood('happy');
      setPytoSpeech(`Mantap! Komputer mengalokasikan slot memori ${nextAddress} untuk '${varName.trim()}'.`);
    }

    // Reset input
    setVarName('');
    setVarValue('');
  };

  const setPreset = (name: string, val: string) => {
    sound.playPop();
    setVarName(name);
    setVarValue(val);
    setPytoMood('talking');
    setPytoSpeech(`Contoh disiapkan: ${name} = ${val}. Klik 'Simpan ke Slot' untuk mengujinya!`);
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'int':
        return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'float':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'str':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'bool':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Banner Level & Dialog Maskot */}
      <div className="bg-gradient-to-r from-sky-50 via-white to-emerald-50 border-2 border-sky-200/80 rounded-3xl p-5 shadow-sm flex flex-col md:flex-row items-center justify-between gap-5">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-700 text-xs font-black uppercase tracking-wider">
            <HardDrive className="w-3.5 h-3.5" />
            Kotak Variabel & Memori RAM
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Laboratorium Kotak Variabel
          </h1>
          <p className="text-sm text-slate-600 max-w-lg">
            Di Python, variabel adalah <strong>label</strong> pada sebuah kotak memori komputer. Pelajari aturan penamaan dan bagaimana nilai disimpan!
          </p>
        </div>

        {/* Maskot Pyto Beranimasi */}
        <div className="flex-shrink-0">
          <PytoMascot mood={pytoMood} speechText={pytoSpeech} size={130} />
        </div>
      </div>

      {/* Grid 2 Kolom: Kontrol Input & Rak Memori Visual */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Kolom Kiri: Form Deklarasi & Validasi Realtime */}
        <div className="lg:col-span-5 bg-white border-2 border-slate-200 rounded-3xl p-6 shadow-sm space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <PlusCircle className="w-5 h-5 text-sky-500" />
            <h2 className="font-extrabold text-slate-800 text-lg">Buat Variabel Python</h2>
          </div>

          {/* Input Form Berformat Koding */}
          <div className="space-y-3 font-mono">
            <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-3 focus-within:border-sky-500 focus-within:bg-white transition-all">
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1 font-sans">
                Nama Variabel :
              </label>
              <div className="flex items-center gap-2 text-slate-800 font-bold">
                <span className="text-sky-600 font-black">&gt;</span>
                <input
                  type="text"
                  value={varName}
                  onChange={(e) => setVarName(e.target.value)}
                  placeholder="contoh: skor_game"
                  className="w-full bg-transparent outline-none text-slate-800 placeholder:text-slate-300 font-bold"
                  spellCheck={false}
                />
              </div>
            </div>

            <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-3 focus-within:border-sky-500 focus-within:bg-white transition-all">
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1 font-sans">
                Nilai / Value :
              </label>
              <div className="flex items-center gap-2 text-slate-800 font-bold">
                <span className="text-emerald-600 font-black">=</span>
                <input
                  type="text"
                  value={varValue}
                  onChange={(e) => setVarValue(e.target.value)}
                  placeholder='contoh: 150 atau "Budi"'
                  className="w-full bg-transparent outline-none text-slate-800 placeholder:text-slate-300 font-bold"
                  spellCheck={false}
                />
              </div>
            </div>
          </div>

          {/* Live Syntax Rule Validator dengan Animasi Kemunculan */}
          <AnimatePresence>
            {varName && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -6 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -6 }}
                transition={{ duration: 0.18 }}
                className={`p-3 rounded-2xl border flex items-start gap-2.5 text-xs font-semibold ${
                  validation.valid
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                    : 'bg-rose-50 border-rose-200 text-rose-700 animate-error-shake'
                }`}
              >
                {validation.valid ? (
                  <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                )}
                <span>{validation.reason}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Tombol Simpan 3D */}
          <DuoButton
            variant="secondary"
            fullWidth
            onClick={handleSave}
            disabled={!varName.trim() || !varValue.trim()}
            icon={<Sparkles className="w-5 h-5" />}
          >
            Simpan ke Slot Memori
          </DuoButton>

          {/* Tombol Preset Cepat */}
          <div className="pt-2 border-t border-slate-100">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Contoh Siap Uji:
            </span>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setPreset('usia', '16')}
                className="px-2.5 py-1 text-xs font-mono font-bold bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 border border-slate-200 transition-all cursor-pointer"
              >
                usia = 16
              </button>
              <button
                onClick={() => setPreset('berat_badan', '54.5')}
                className="px-2.5 py-1 text-xs font-mono font-bold bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 border border-slate-200 transition-all cursor-pointer"
              >
                berat_badan = 54.5
              </button>
              <button
                onClick={() => setPreset('status_lulus', 'True')}
                className="px-2.5 py-1 text-xs font-mono font-bold bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 border border-slate-200 transition-all cursor-pointer"
              >
                status_lulus = True
              </button>
              <button
                onClick={() => setPreset('2skor', '99')}
                className="px-2.5 py-1 text-xs font-mono font-bold bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-lg transition-all cursor-pointer"
                title="Coba penamaan terlarang!"
              >
                2skor = 99 (Ilegal)
              </button>
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Panggung Rak Memori RAM 3D */}
        <div className="lg:col-span-7 bg-white border-2 border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <HardDrive className="w-5 h-5 text-emerald-500" />
              <h2 className="font-extrabold text-slate-800 text-lg">Panggung Memori RAM Virtual</h2>
            </div>
            <span className="text-xs font-bold text-slate-400">
              {slots.length} Kotak Tersimpan
            </span>
          </div>

          <p className="text-xs text-slate-500">
            Setiap kotak di bawah ini merepresentasikan alamat memori fisik yang dialokasikan oleh Python interpreter untuk menampung datamu:
          </p>

          {/* Rak Kotak Memori dengan Animasi Kemunculan */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {slots.map((slot) => {
              const isRecent = lastSaved === slot.name;
              return (
                <motion.div
                  key={slot.address}
                  layout
                  initial={{ opacity: 0, scale: 0.88, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                  className={`relative p-4 rounded-2xl border-2 transition-all duration-300 transform ${
                    isRecent
                      ? 'border-sky-500 bg-sky-50/50 memory-slot-active scale-102'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  {/* Alamat Hex RAM & Badge Tipe */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-500 border border-slate-200">
                      RAM {slot.address}
                    </span>
                    <span
                      className={`font-mono text-[11px] font-black uppercase px-2 py-0.5 rounded-md border ${getTypeBadge(
                        slot.type
                      )}`}
                    >
                      {slot.type}
                    </span>
                  </div>

                  {/* Label Nama Variabel (Tutup Kotak) */}
                  <div className="mb-2">
                    <span className="text-[11px] font-bold text-slate-400 block font-sans">
                      Label Kotak:
                    </span>
                    <span className="font-mono text-base font-black text-slate-900 tracking-tight">
                      {slot.name}
                    </span>
                  </div>

                  {/* Nilai Isi Kotak */}
                  <div className="bg-slate-900 rounded-xl p-2.5 text-center font-mono">
                    <span className="text-emerald-400 font-bold text-sm tracking-wider">
                      {slot.value}
                    </span>
                  </div>

                  {/* Efek Re-assignment Indicator */}
                  {isRecent && (
                    <div className="absolute -top-2.5 right-3 px-2 py-0.5 bg-sky-500 text-white text-[10px] font-black rounded-full shadow-sm animate-pulse">
                      Baru Saja Diperbarui!
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Mini Terminal Preview Kode Python */}
          <div className="mt-4 bg-slate-900 rounded-2xl p-4 text-xs font-mono text-slate-200 border-2 border-slate-800">
            <div className="flex items-center gap-1.5 mb-2 text-slate-500 text-[11px]">
              <Terminal className="w-3.5 h-3.5" />
              <span>python3 main.py</span>
            </div>
            <div className="space-y-1 text-slate-300">
              {slots.map((s) => (
                <div key={s.name}>
                  <span className="text-sky-400">{s.name}</span> = <span className="text-emerald-300">{s.value}</span>
                  <span className="text-slate-500 ml-3"># type: {s.type}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
