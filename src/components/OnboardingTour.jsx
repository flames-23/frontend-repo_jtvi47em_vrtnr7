import React, { useEffect, useState } from 'react';

const steps = [
  { key: 'logo', title: 'Logo Bank', desc: 'Unggah logo Bank Sampah Sekawan Makmur untuk memperkuat identitas laporan.' },
  { key: 'form', title: 'Form Transaksi', desc: 'Isi data transaksi: tanggal, nasabah, material, berat, dan harga per kg.' },
  { key: 'stats', title: 'Statistik Ringkas', desc: 'Pantau total berat dan nilai transaksi terkini.' },
  { key: 'table', title: 'Tabel Transaksi', desc: 'Semua transaksi tampil di sini dan bisa diekspor ke Excel.' },
];

const OnboardingTour = () => {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const seen = localStorage.getItem('bssm_tour_seen');
    if (!seen) setVisible(true);
  }, []);

  const next = () => {
    if (step < steps.length - 1) setStep(step + 1);
    else {
      localStorage.setItem('bssm_tour_seen', '1');
      setVisible(false);
    }
  };

  if (!visible) return null;

  const s = steps[step];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/40">
      <div className="w-full max-w-lg rounded-xl bg-white p-5 shadow-xl">
        <h3 className="text-lg font-semibold text-green-900 mb-1">{s.title}</h3>
        <p className="text-green-800/80 mb-4">{s.desc}</p>
        <div className="flex items-center justify-between text-sm">
          <span className="text-green-700/70">Langkah {step + 1} dari {steps.length}</span>
          <button onClick={next} className="rounded-md bg-green-700 px-4 py-2 text-white hover:bg-green-800">Lanjut</button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingTour;
