import React from 'react';
import { Leaf, Recycle } from 'lucide-react';

export default function Header() {
  return (
    <header className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-green-600 to-teal-600 opacity-90" />
      <div className="relative mx-auto max-w-6xl px-4 py-12 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4" data-tour="logo">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/25 backdrop-blur">
              <Leaf className="h-8 w-8 text-lime-200" />
            </div>
            <div>
              <h1 className="text-2xl font-bold sm:text-3xl">Bank Sampah Sekawan Makmur</h1>
              <p className="mt-1 text-sm text-emerald-100">Pengelolaan sampah bernilai – hijau, bersih, dan ciamik</p>
            </div>
          </div>
          <div className="hidden text-sm text-emerald-100 sm:block">#HijauBersihCiamik</div>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-white/20 bg-white/10 p-4 text-sm">
            <p className="font-medium text-white/90">Misi</p>
            <p className="mt-1 text-emerald-100">Memberdayakan warga melalui tabungan hasil pilah sampah.</p>
          </div>
          <div className="rounded-xl border border-white/20 bg-white/10 p-4 text-sm">
            <p className="font-medium text-white/90">Nilai</p>
            <p className="mt-1 text-emerald-100">Transparan, akuntabel, dan ramah lingkungan.</p>
          </div>
          <div className="rounded-xl border border-white/20 bg-white/10 p-4 text-sm">
            <p className="font-medium text-white/90 flex items-center gap-2"><Recycle className="h-4 w-4"/> Tema</p>
            <p className="mt-1 text-emerald-100">Penghijauan & kebersihan sebagai gaya hidup.</p>
          </div>
        </div>
      </div>
    </header>
  );
}
