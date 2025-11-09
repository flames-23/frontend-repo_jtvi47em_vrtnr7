import React, { useMemo, useState } from 'react';
import Header from './components/Header';
import TransactionForm from './components/TransactionForm';
import TransactionTable from './components/TransactionTable';
import LogoUploader from './components/LogoUploader';

// Lightweight Excel export without external libs: generate .xlsx via data URI (CSV inside)
// For better fidelity you'd typically use a lib like SheetJS, but here we keep deps unchanged.
function exportToExcel(filename, rows, logoDataUrl) {
  // Build CSV content
  const header = ['Tanggal','Penyetor','Jenis','Berat (kg)','Harga/kg','Total'];
  const csvRows = [header.join(',')];
  rows.forEach(r => {
    const fields = [r.date, r.customer, r.material, r.weight, r.price, r.total];
    csvRows.push(fields.map(v => `"${String(v).replace(/"/g,'\"')}"`).join(','));
  });
  const csv = csvRows.join('\n');

  // Build a simple metadata sheet as well (in CSV) to include branding text
  const branding = [`Bank Sampah Sekawan Makmur`, `Total Transaksi: ${rows.length}`, `Catatan: Ekspor sederhana (CSV) – dapat dibuka di Excel.`].join('\n');

  // Create a zip-like multi-sheet is not possible without libs; instead, download two CSVs
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${filename}.csv`;
  link.click();

  // Download branding note as separate file including base64 logo reference (if any)
  const brandingText = logoDataUrl ? `${branding}\nLogo(b64): ${logoDataUrl.substring(0,64)}...` : branding;
  const blob2 = new Blob([brandingText], { type: 'text/plain;charset=utf-8;' });
  const link2 = document.createElement('a');
  link2.href = URL.createObjectURL(blob2);
  link2.download = `${filename}-branding.txt`;
  link2.click();
}

export default function App() {
  const [rows, setRows] = useState([]);
  const [logo, setLogo] = useState('');

  const totals = useMemo(() => ({
    count: rows.length,
    weight: rows.reduce((s, r) => s + r.weight, 0),
    amount: rows.reduce((s, r) => s + r.total, 0),
  }), [rows]);

  const handleAdd = (row) => {
    setRows((prev) => [row, ...prev]);
  };

  const handleRemove = (idx) => {
    setRows((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleExport = () => {
    exportToExcel('Pembukuan-Bank-Sampah-Sekawan-Makmur', rows, logo);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-green-50 to-white">
      <Header />

      <main className="mx-auto max-w-6xl px-4 py-8">
        <section className="mb-6 flex flex-col items-start justify-between gap-4 rounded-2xl bg-emerald-100/60 p-4 ring-1 ring-emerald-200 md:flex-row">
          <div>
            <h2 className="text-lg font-semibold text-emerald-900">Pembukuan Bank Sampah</h2>
            <p className="text-sm text-emerald-700">Catat transaksi setoran sampah terpilah untuk pengelolaan yang transparan.</p>
          </div>
          <LogoUploader logo={logo} onChange={setLogo} />
        </section>

        <section className="mb-6">
          <TransactionForm onAdd={handleAdd} onExport={handleExport} />
        </section>

        <section className="mb-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-emerald-200 bg-white p-4">
            <p className="text-sm text-gray-600">Jumlah Transaksi</p>
            <p className="mt-1 text-2xl font-bold text-emerald-700">{totals.count}</p>
          </div>
          <div className="rounded-2xl border border-emerald-200 bg-white p-4">
            <p className="text-sm text-gray-600">Total Berat</p>
            <p className="mt-1 text-2xl font-bold text-emerald-700">{totals.weight.toFixed(2)} kg</p>
          </div>
          <div className="rounded-2xl border border-emerald-200 bg-white p-4">
            <p className="text-sm text-gray-600">Total Nilai</p>
            <p className="mt-1 text-2xl font-bold text-emerald-700">Rp {totals.amount.toLocaleString('id-ID')}</p>
          </div>
        </section>

        <section>
          <TransactionTable data={rows} onRemove={handleRemove} />
        </section>
      </main>

      <footer className="mt-10 border-t border-emerald-200 bg-white/60">
        <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-emerald-800">
          <p>© {new Date().getFullYear()} Bank Sampah Sekawan Makmur • Hijau, bersih, dan ciamik</p>
        </div>
      </footer>
    </div>
  );
}
