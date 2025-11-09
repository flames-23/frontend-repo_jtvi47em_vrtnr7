import React from 'react';
import { Leaf, Download } from 'lucide-react';

const Header = ({ logo, onExport }) => {
  return (
    <header className="w-full bg-green-700 text-white">
      <div className="mx-auto max-w-6xl px-4 py-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {logo ? (
            <img
              src={logo}
              alt="Logo Bank Sampah Sekawan Makmur"
              className="h-12 w-12 rounded bg-white/10 object-contain p-1 ring-1 ring-white/20"
            />
          ) : (
            <div className="h-12 w-12 flex items-center justify-center rounded bg-white/10 ring-1 ring-white/20">
              <Leaf className="h-7 w-7" />
            </div>
          )}
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">Bank Sampah Sekawan Makmur</h1>
            <p className="text-white/80 text-sm">Penghijauan • Bersih Sampah • Ciamik</p>
          </div>
        </div>
        <button
          onClick={onExport}
          className="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-green-800 font-medium shadow hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/40"
        >
          <Download className="h-4 w-4" />
          Export Excel
        </button>
      </div>
    </header>
  );
};

export default Header;
