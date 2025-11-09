import React, { useEffect, useMemo, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import TransactionForm from './components/TransactionForm';
import TransactionTable from './components/TransactionTable';
import LogoUploader from './components/LogoUploader';
import OnboardingTour from './components/OnboardingTour';
import Login from './components/Login';

// Excel-friendly HTML export with styling and optional logo
function exportStyledExcel(filename, rows, options = {}) {
  const { logoDataUrl } = options;
  const totalWeight = rows.reduce((s, r) => s + r.weight, 0);
  const grandTotal = rows.reduce((s, r) => s + r.total, 0);

  const tableRows = rows.map(r => `
    <tr>
      <td>${r.date}</td>
      <td>${r.customer}</td>
      <td>${r.material}</td>
      <td style="mso-number-format:'0.00'; text-align:right;">${r.weight.toFixed(2)}</td>
      <td style="mso-number-format:'#,##0'; text-align:right;">${Number(r.price)}</td>
      <td style="mso-number-format:'#,##0'; text-align:right; font-weight:700;">${Number(r.total)}</td>
    </tr>
  `).join('');

  const logoBlock = logoDataUrl ? `<img src="${logoDataUrl}" alt="Logo" style="height:64px; width:64px; object-fit:cover; border-radius:12px; border:1px solid #cce6d9;" />` : '';

  const html = `
  <html>
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <style>
        body { font-family: Segoe UI, Arial, sans-serif; color: #134e4a; }
        .title { font-size: 18px; font-weight: 700; }
        .subtitle { color: #065f46; }
        table { border-collapse: collapse; width: 100%; }
        th, td { border: 1px solid #d1fae5; padding: 8px; }
        thead th { background: #d1fae5; color: #065f46; text-align: left; }
        tfoot td { background: #ecfdf5; font-weight: 700; }
      </style>
    </head>
    <body>
      <table style="margin-bottom:12px; border:none;">
        <tr style="border:none;">
          <td style="border:none; vertical-align:middle;">${logoBlock}</td>
          <td style="border:none; padding-left:12px;">
            <div class="title">Bank Sampah Sekawan Makmur</div>
            <div class="subtitle">Pembukuan Transaksi</div>
          </td>
        </tr>
      </table>

      <table>
        <thead>
          <tr>
            <th>Tanggal</th>
            <th>Penyetor</th>
            <th>Jenis</th>
            <th>Berat (kg)</th>
            <th>Harga/kg (Rp)</th>
            <th>Total (Rp)</th>
          </tr>
        </thead>
        <tbody>
          ${tableRows || '<tr><td colspan="6" style="text-align:center;color:#6b7280;">Belum ada transaksi</td></tr>'}
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3">TOTAL</td>
            <td style="mso-number-format:'0.00'; text-align:right;">${totalWeight.toFixed(2)}</td>
            <td></td>
            <td style="mso-number-format:'#,##0'; text-align:right;">${grandTotal}</td>
          </tr>
        </tfoot>
      </table>
    </body>
  </html>`;

  const blob = new Blob([html], { type: 'application/vnd.ms-excel' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${filename}.xls`;
  link.click();
}

function Dashboard() {
  const [rows, setRows] = useState([]);
  const [logo, setLogo] = useState('');
  const [showTour, setShowTour] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem('bssm_auth');
    if (!auth) navigate('/login');
  }, [navigate]);

  useEffect(() => {
    // Show tour only once
    if (!localStorage.getItem('bssm_tour_seen')) {
      setShowTour(true);
    }
  }, []);

  const totals = useMemo(() => ({
    count: rows.length,
    weight: rows.reduce((s, r) => s + r.weight, 0),
    amount: rows.reduce((s, r) => s + r.total, 0),
  }), [rows]);

  const handleAdd = async (row) => {
    setRows((prev) => [row, ...prev]);
    // Optional: persist to backend
    try {
      const base = import.meta.env.VITE_BACKEND_URL?.replace(/\/$/, '') || '';
      await fetch(`${base}/transactions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date: row.date, customer: row.customer, material: row.material, weight: row.weight, price: row.price })
      });
    } catch (e) {
      // ignore demo error
    }
  };
  const handleRemove = (idx) => setRows((prev) => prev.filter((_, i) => i !== idx));
  const handleExport = () => exportStyledExcel('Pembukuan-Bank-Sampah-Sekawan-Makmur', rows, { logoDataUrl: logo });

  const steps = [
    { target: 'logo', title: 'Identitas & Logo', description: 'Ini adalah identitas Bank Sampah Sekawan Makmur. Logo tampil stabil tanpa bergeser.' },
    { target: 'form', title: 'Form Transaksi', description: 'Catat setoran: tanggal, penyetor, jenis, berat, dan harga per kg.' },
    { target: 'stats', title: 'Ringkasan', description: 'Pantau jumlah transaksi, total berat, dan total nilai.' },
    { target: 'table', title: 'Tabel Pembukuan', description: 'Semua transaksi muncul di sini dan bisa dihapus jika salah input.' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-green-50 to-white">
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <section className="mb-6 flex flex-col items-start justify-between gap-4 rounded-2xl bg-emerald-100/60 p-4 ring-1 ring-emerald-200 md:flex-row">
          <div>
            <h2 className="text-lg font-semibold text-emerald-900">Pembukuan Bank Sampah</h2>
            <p className="text-sm text-emerald-700">Catat transaksi setoran sampah terpilah untuk pengelolaan yang transparan.</p>
          </div>
          <div>
            <LogoUploader logo={logo} onChange={setLogo} />
          </div>
        </section>

        <section className="mb-6" data-tour="form">
          <TransactionForm onAdd={handleAdd} onExport={handleExport} />
        </section>

        <section className="mb-6 grid gap-4 sm:grid-cols-3" data-tour="stats">
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

        <section data-tour="table">
          <TransactionTable data={rows} onRemove={handleRemove} />
        </section>
      </main>

      {showTour && (
        <OnboardingTour enabled steps={steps} onFinish={() => { localStorage.setItem('bssm_tour_seen', '1'); setShowTour(false); }} />
      )}
    </div>
  );
}

function RequireAuth({ children }) {
  const auth = localStorage.getItem('bssm_auth');
  if (!auth) return <Navigate to="/login" replace />;
  return children;
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<RequireAuth><Dashboard /></RequireAuth>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
