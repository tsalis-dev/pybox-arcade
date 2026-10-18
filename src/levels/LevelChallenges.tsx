import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DuoButton } from '../components/DuoButton';
import { PytoMascot, type PytoMood } from '../components/PytoMascot';
import { sound } from '../utils/audio';
import { triggerLevelWinConfetti } from '../utils/confetti';
import { Terminal, Play, ChevronDown, ChevronUp, Sparkles, BookOpen } from 'lucide-react';

export const LevelChallenges: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'inspect' | 'p1' | 'p2' | 'p3'>('inspect');
  const [pytoMood, setPytoMood] = useState<PytoMood>('idle');
  const [pytoSpeech, setPytoSpeech] = useState<string>(
    'Selamat datang di Terminal Master! Uji pemahamanmu dan eksekusi program mandiri di terminal cyber!'
  );

  // State Program 1 (Sambutan & Umur)
  const [p1Name, setP1Name] = useState('Budi');
  const [p1Year, setP1Year] = useState('2009');
  const [p1Output, setP1Output] = useState<string[]>([]);

  // State Program 2 (Kalkulator 4 Operasi)
  const [p2A, setP2A] = useState('20');
  const [p2B, setP2B] = useState('4');
  const [p2Output, setP2Output] = useState<string[]>([]);

  // State Program 3 (Status Kelulusan)
  const [p3Score, setP3Score] = useState('80');
  const [p3Output, setP3Output] = useState<string[]>([]);

  // State Accordion Refleksi
  const [expandedReflect, setExpandedReflect] = useState<number | null>(null);

  const runProgram1 = () => {
    sound.playVictory();
    sound.playCoin();
    const currentYear = new Date().getFullYear();
    const birthYear = parseInt(p1Year, 10) || 2008;
    const age = currentYear - birthYear;

    setP1Output([
      `$ python3 program1_sambutan.py`,
      `[INPUT] Masukkan nama Anda: ${p1Name}`,
      `[INPUT] Masukkan tahun lahir: ${birthYear}`,
      `---------------------------------------`,
      `Halo, ${p1Name}! Senang berkenalan denganmu.`,
      `Pada tahun ${currentYear}, usiamu adalah ${age} tahun.`,
      `[Tipe Data]: nama=${typeof p1Name} (str), umur=${typeof age} (int)`,
      `[SUCCESS] Program selesai dieksekusi dengan kode keluar 0.`
    ]);

    setPytoMood('happy');
    setPytoSpeech(`Luar biasa! Program berhasil menghitung umur ${p1Name} (${age} tahun) dari input yang dikonversi ke integer.`);
  };

  const runProgram2 = () => {
    sound.playVictory();
    sound.playCoin();
    const a = parseFloat(p2A) || 0;
    const b = parseFloat(p2B) || 1;

    setP2Output([
      `$ python3 program2_kalkulator.py`,
      `[INPUT] Angka Pertama: ${a}`,
      `[INPUT] Angka Kedua  : ${b}`,
      `=======================================`,
      `Penjumlahan (+) : ${a} + ${b} = ${a + b}`,
      `Pengurangan (-) : ${a} - ${b} = ${a - b}`,
      `Perkalian   (*) : ${a} * ${b} = ${a * b}`,
      `Pembagian   (/) : ${a} / ${b} = ${(a / b).toFixed(2)} (float)`,
      `=======================================`,
      `[SUCCESS] Semua 4 operasi aritmatika sukses dihitung.`
    ]);

    setPytoMood('happy');
    setPytoSpeech(`Hebat! Kalkulator 4 operasi berjalan mulus. Perhatikan bahwa pembagian selalu menghasilkan angka berkoma!`);
  };

  const runProgram3 = () => {
    sound.playVictory();
    sound.playCoin();
    triggerLevelWinConfetti();
    const score = parseFloat(p3Score) || 0;
    const isPassed = score >= 75;

    setP3Output([
      `$ python3 program3_kelulusan.py`,
      `[INPUT] Masukkan nilai ujian: ${score}`,
      `---------------------------------------`,
      `Ambang Batas Kelulusan: >= 75`,
      `Ekspresi Logika: ${score} >= 75`,
      `Status Kelulusan (Boolean): ${isPassed ? 'True' : 'False'}`,
      `Keterangan: ${isPassed ? 'Selamat, Anda dinyatakan LULUS!' : 'Perlu remedial / belajar kembali.'}`,
      `[SUCCESS] Evaluasi kondisi boolean selesai.`
    ]);

    setPytoMood('happy');
    setPytoSpeech(`Keren! Kamu membuktikan ekspresi logika menghasilkan nilai kebenaran Boolean: ${isPassed ? 'True' : 'False'}!`);
  };

  return (
    <div className="space-y-6">
      {/* Banner Level */}
      <div className="bg-gradient-to-r from-purple-50 via-white to-sky-50 border-2 border-purple-200/80 rounded-3xl p-5 shadow-sm flex flex-col md:flex-row items-center justify-between gap-5">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-black uppercase tracking-wider">
            <Terminal className="w-3.5 h-3.5" />
            Terminal Kode Mandiri
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Tantangan Koding Mandiri
          </h1>
          <p className="text-sm text-slate-600 max-w-lg">
            Jalankan program Python mandiri dan amati keluaran baris demi baris di terminal virtual!
          </p>
        </div>

        {/* Maskot Pyto */}
        <div className="flex-shrink-0">
          <PytoMascot mood={pytoMood} speechText={pytoSpeech} size={130} />
        </div>
      </div>

      {/* Navigasi Pilihan Latihan */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => {
            sound.playPop();
            setActiveTab('inspect');
          }}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
            activeTab === 'inspect'
              ? 'bg-purple-600 text-white shadow-md'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          1. Inspeksi type()
        </button>

        <button
          onClick={() => {
            sound.playPop();
            setActiveTab('p1');
          }}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
            activeTab === 'p1'
              ? 'bg-purple-600 text-white shadow-md'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          2. Sambutan & Umur
        </button>

        <button
          onClick={() => {
            sound.playPop();
            setActiveTab('p2');
          }}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
            activeTab === 'p2'
              ? 'bg-purple-600 text-white shadow-md'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          3. Kalkulator 4 Operasi
        </button>

        <button
          onClick={() => {
            sound.playPop();
            setActiveTab('p3');
          }}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
            activeTab === 'p3'
              ? 'bg-purple-600 text-white shadow-md'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          4. Evaluasi Kelulusan
        </button>
      </div>

      {/* Konten Sub-Tab dengan Animasi Transisi Halus */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.18 }}
        >
          {activeTab === 'inspect' && (
        <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <BookOpen className="w-5 h-5 text-purple-600" />
            <h2 className="font-extrabold text-slate-800 text-lg">
              Eksperimen Fungsi Bawaan type()
            </h2>
          </div>
          <p className="text-xs text-slate-600">
            Fungsi <code>type()</code> digunakan untuk memeriksa tipe objek atau variabel secara dinamis di runtime Python:
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono border-collapse">
              <thead>
                <tr className="border-b-2 border-slate-200 text-slate-400 font-sans uppercase">
                  <th className="py-2.5 px-3">Baris Kode Python</th>
                  <th className="py-2.5 px-3">Panggilan Fungsi</th>
                  <th className="py-2.5 px-3">Output Python Console</th>
                  <th className="py-2.5 px-3">Penjelasan Logis</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr className="hover:bg-slate-50">
                  <td className="py-3 px-3 font-bold text-sky-600">x = 25</td>
                  <td className="py-3 px-3">print(type(x))</td>
                  <td className="py-3 px-3 font-bold text-emerald-600">&lt;class 'int'&gt;</td>
                  <td className="py-3 px-3 font-sans text-slate-500">Bilangan bulat murni</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-3 px-3 font-bold text-sky-600">suhu = 36.5</td>
                  <td className="py-3 px-3">print(type(suhu))</td>
                  <td className="py-3 px-3 font-bold text-amber-600">&lt;class 'float'&gt;</td>
                  <td className="py-3 px-3 font-sans text-slate-500">Bilangan berkoma desimal</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-3 px-3 font-bold text-sky-600">nama = "Andi"</td>
                  <td className="py-3 px-3">print(type(nama))</td>
                  <td className="py-3 px-3 font-bold text-purple-600">&lt;class 'str'&gt;</td>
                  <td className="py-3 px-3 font-sans text-slate-500">Rangkaian karakter berpetik</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-3 px-3 font-bold text-sky-600">status = True</td>
                  <td className="py-3 px-3">print(type(status))</td>
                  <td className="py-3 px-3 font-bold text-rose-600">&lt;class 'bool'&gt;</td>
                  <td className="py-3 px-3 font-sans text-slate-500">Nilai kebenaran logika</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Konten Tab Program 1 */}
      {activeTab === 'p1' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-5 bg-white border-2 border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="font-extrabold text-slate-800 text-base">Parameter Program 1</h3>
            <div className="space-y-3 font-mono">
              <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-3">
                <label className="block text-[11px] font-bold text-slate-400 font-sans mb-1">
                  Nama Pengguna (str):
                </label>
                <input
                  type="text"
                  value={p1Name}
                  onChange={(e) => setP1Name(e.target.value)}
                  className="w-full bg-transparent outline-none text-slate-800 font-bold"
                />
              </div>
              <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-3">
                <label className="block text-[11px] font-bold text-slate-400 font-sans mb-1">
                  Tahun Lahir (int):
                </label>
                <input
                  type="number"
                  value={p1Year}
                  onChange={(e) => setP1Year(e.target.value)}
                  className="w-full bg-transparent outline-none text-slate-800 font-bold"
                />
              </div>
            </div>

            <DuoButton
              variant="secondary"
              fullWidth
              onClick={runProgram1}
              icon={<Play className="w-4 h-4 fill-white" />}
            >
              Jalankan Program
            </DuoButton>
          </div>

          <div className="lg:col-span-7 bg-slate-900 rounded-3xl p-6 border-4 border-slate-800 shadow-xl font-mono text-xs text-slate-200 space-y-2 min-h-[220px]">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-slate-500 text-[11px]">
              <span>PyBox Cyber Terminal v2.0</span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>
            {p1Output.length > 0 ? (
              p1Output.map((line, i) => (
                <div key={i} className="leading-relaxed">
                  {line}
                </div>
              ))
            ) : (
              <div className="text-slate-600 italic pt-8 text-center">
                Klik 'Jalankan Program' untuk melihat output eksekusi terminal...
              </div>
            )}
          </div>
        </div>
      )}

      {/* Konten Tab Program 2 */}
      {activeTab === 'p2' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-5 bg-white border-2 border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="font-extrabold text-slate-800 text-base">Parameter Program 2</h3>
            <div className="grid grid-cols-2 gap-3 font-mono">
              <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-3">
                <label className="block text-[11px] font-bold text-slate-400 font-sans mb-1">
                  Angka 1:
                </label>
                <input
                  type="number"
                  value={p2A}
                  onChange={(e) => setP2A(e.target.value)}
                  className="w-full bg-transparent outline-none text-slate-800 font-bold"
                />
              </div>
              <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-3">
                <label className="block text-[11px] font-bold text-slate-400 font-sans mb-1">
                  Angka 2:
                </label>
                <input
                  type="number"
                  value={p2B}
                  onChange={(e) => setP2B(e.target.value)}
                  className="w-full bg-transparent outline-none text-slate-800 font-bold"
                />
              </div>
            </div>

            <DuoButton
              variant="warning"
              fullWidth
              onClick={runProgram2}
              icon={<Play className="w-4 h-4 fill-amber-950" />}
            >
              Jalankan Program
            </DuoButton>
          </div>

          <div className="lg:col-span-7 bg-slate-900 rounded-3xl p-6 border-4 border-slate-800 shadow-xl font-mono text-xs text-slate-200 space-y-2 min-h-[220px]">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-slate-500 text-[11px]">
              <span>PyBox Cyber Terminal v2.0</span>
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span>
            </div>
            {p2Output.length > 0 ? (
              p2Output.map((line, i) => (
                <div key={i} className="leading-relaxed">
                  {line}
                </div>
              ))
            ) : (
              <div className="text-slate-600 italic pt-8 text-center">
                Klik 'Jalankan Program' untuk melihat hasil 4 operasi...
              </div>
            )}
          </div>
        </div>
      )}

      {/* Konten Tab Program 3 */}
      {activeTab === 'p3' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-5 bg-white border-2 border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="font-extrabold text-slate-800 text-base">Evaluasi Ambang Batas</h3>
            <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-3 font-mono">
              <label className="block text-[11px] font-bold text-slate-400 font-sans mb-1">
                Nilai Siswa (0 - 100):
              </label>
              <input
                type="number"
                value={p3Score}
                onChange={(e) => setP3Score(e.target.value)}
                className="w-full bg-transparent outline-none text-slate-800 font-bold text-lg"
              />
            </div>

            <DuoButton
              variant="primary"
              fullWidth
              onClick={runProgram3}
              icon={<Play className="w-4 h-4 fill-white" />}
            >
              Evaluasi Kelulusan
            </DuoButton>
          </div>

          <div className="lg:col-span-7 bg-slate-900 rounded-3xl p-6 border-4 border-slate-800 shadow-xl font-mono text-xs text-slate-200 space-y-2 min-h-[220px]">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-slate-500 text-[11px]">
              <span>PyBox Cyber Terminal v2.0</span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>
            {p3Output.length > 0 ? (
              p3Output.map((line, i) => (
                <div key={i} className="leading-relaxed">
                  {line}
                </div>
              ))
            ) : (
              <div className="text-slate-600 italic pt-8 text-center">
                Masukkan nilai dan klik 'Evaluasi Kelulusan'...
              </div>
            )}
          </div>
        </div>
      )}
        </motion.div>
      </AnimatePresence>

      {/* Kartu Refleksi Pemahaman (Accordion) */}
      <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 shadow-sm space-y-3">
        <h3 className="font-extrabold text-slate-800 text-base flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-purple-600" />
          Rangkuman & Refleksi Pemahaman Koding
        </h3>

        {[
          {
            q: 'Mengapa input() harus dikonversi dengan int() atau float() saat melakukan operasi hitung?',
            a: 'Karena Python membaca semua masukan keyboard melalui fungsi input() sebagai tipe string (str). Jika tidak diubah ke int() atau float(), operator + hanya akan menggabungkan teks (misal "10" + "2" menjadi "102"), bukan menjumlahkannya menjadi 12.',
          },
          {
            q: 'Apa perbedaan mendasar antara pembagian / dan // di Python?',
            a: 'Pembagian tunggal (/) selalu menghasilkan bilangan desimal berpresisi (float), bahkan jika bilangannya habis dibagi (contoh 8 / 2 menghasilkan 4.0). Sedangkan floor division (//) membagi dan membulatkan ke bawah dengan membuang angka di belakang koma sehingga menghasilkan integer.',
          },
          {
            q: 'Apa fungsi utama tipe data Boolean (bool) dalam logika pemrograman?',
            a: 'Tipe data boolean merepresentasikan dua kemungkinan nilai kebenaran: True (benar) atau False (salah). Tipe ini menjadi dasar logika pengambilan keputusan di komputer (percabangan IF/ELSE) dan pengulangan (WHILE loops).',
          },
        ].map((item, idx) => {
          const isOpen = expandedReflect === idx;
          return (
            <div key={idx} className="border border-slate-200 rounded-2xl overflow-hidden">
              <button
                onClick={() => {
                  sound.playPop();
                  setExpandedReflect(isOpen ? null : idx);
                }}
                className="w-full p-3.5 text-left bg-slate-50 hover:bg-slate-100 flex items-center justify-between gap-3 text-xs font-bold text-slate-800 transition-all cursor-pointer"
              >
                <span>{item.q}</span>
                {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </button>
              {isOpen && (
                <div className="p-3.5 bg-white text-xs text-slate-600 leading-relaxed border-t border-slate-100 animate-in fade-in duration-150">
                  {item.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
