import React, { useRef } from 'react';
import { ImagePlus } from 'lucide-react';

const LogoUploader = ({ logo, setLogo }) => {
  const fileInputRef = useRef(null);

  const onFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setLogo(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <div className="rounded-xl border border-green-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-green-900">Logo Bank</h3>
          <p className="text-sm text-green-700/80">Unggah logo untuk ditampilkan pada laporan dan ekspor Excel.</p>
        </div>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="inline-flex items-center gap-2 rounded-md bg-green-700 px-3 py-2 text-white shadow hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          <ImagePlus className="h-4 w-4" /> Pilih Logo
        </button>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={onFileChange}
          className="hidden"
        />
      </div>
      {logo && (
        <div className="mt-4 flex items-center gap-4">
          <img src={logo} alt="Logo preview" className="h-16 w-16 rounded border object-contain p-1" />
          <p className="text-sm text-green-800">Logo akan tersemat otomatis pada laporan dan file Excel.</p>
        </div>
      )}
    </div>
  );
};

export default LogoUploader;
