import React, { useRef } from 'react';
import { ImagePlus } from 'lucide-react';

export default function LogoUploader({ logo, onChange }) {
  const inputRef = useRef(null);

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      onChange(ev.target?.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex items-center gap-4">
      <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-xl border border-emerald-200 bg-emerald-50">
        {logo ? (
          <img src={logo} alt="Logo" className="h-full w-full object-cover" />
        ) : (
          <ImagePlus className="h-8 w-8 text-emerald-500" />
        )}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-700">Logo Bank Sampah Sekawan Makmur</p>
        <p className="text-xs text-gray-500">Unggah PNG/JPG. Logo akan ikut pada berkas Excel.</p>
        <div className="mt-2 flex items-center gap-2">
          <button type="button" onClick={() => inputRef.current?.click()} className="rounded-lg border border-emerald-600 px-3 py-1.5 text-sm text-emerald-700 hover:bg-emerald-50">Pilih Logo</button>
          <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
        </div>
      </div>
    </div>
  );
}
