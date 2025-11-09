import React, { useMemo, useState } from 'react';
import Header from './components/Header';
import LogoUploader from './components/LogoUploader';
import TransactionForm from './components/TransactionForm';
import TransactionTable from './components/TransactionTable';
import OnboardingTour from './components/OnboardingTour';

const currency = (n) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(n || 0);

function App() {
  const [logo, setLogo] = useState(null);
  const [items, setItems] = useState([]);

  const totals = useMemo(() => {
    const weight = items.reduce((s, it) => s + (Number(it.weight) || 0), 0);
    const value = items.reduce((s, it) => s + (Number(it.total) || 0), 0);
    return { weight, value };
  }, [items]);

  const handleAdd = (payload) => {
    setItems((prev) => [...prev, payload]);
  };

  const handleDelete = (idx) => {
    setItems((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleExport = () => {
    // Build HTML styled table suitable for Excel
    const logoImg = logo ? `<img src="${logo}" alt="logo" style="height:64px;object-fit:contain"/>` : '';
    const rows = items
      .map(
        (it) => `
          <tr>
            <td>${it.date || ''}</td>
            <td>${it.customer || ''}</td>
            <td>${it.material || ''}</td>
            <td style="text-align:right">${Number(it.weight || 0).toFixed(2)}</td>
            <td style="text-align:right">${currency(it.price)}</td>
            <td style="text-align:right">${currency(it.total)}</td>
          </tr>`
      )
      .join('');

    const html = `
      <html>
        <head>
          <meta charset="UTF-8" />
          <style>
            body{font-family:Arial,Helvetica,sans-serif}
            h1{color:#166534;margin:0}
            .muted{color:#166534cc}
            table{border-collapse:collapse;width:100%}
            th,td{border:1px solid #cbd5e1;padding:8px}
            thead{background:#ecfdf5;color:#065f46}
            tfoot td{font-weight:700}
            .header{display:flex;align-items:center;gap:16px;margin-bottom:16px}
          </style>
        </head>
        <body>
          <div class="header">
            ${logoImg}
            <div>
              <h1>Bank Sampah Sekawan Makmur</h1>
              <div class="muted">Penghijauan • Bersih Sampah • Ciamik</div>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>Tanggal</th>
                <th>Nasabah</th>
                <th>Material</th>
                <th>Berat (kg)</th>
                <th>Harga/kg</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${rows}
            </tbody>
            <tfoot>
              <tr>
                <td colspan="3">Total</td>
                <td style="text-align:right">${totals.weight.toFixed(2)}</td>
                <td></td>
                <td style="text-align:right">${currency(totals.value)}</td>
              </tr>
            </tfoot>
          </table>
        </body>
      </html>`;

    const blob = new Blob([html], { type: 'application/vnd.ms-excel' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pembukuan-bssm.xls';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white text-green-950">
      <OnboardingTour />
      <Header logo={logo} onExport={handleExport} />

      <main className="mx-auto max-w-6xl px-4 py-6">
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6" data-tour="logo form stats">
          <div className="lg:col-span-2" data-tour="form">
            <TransactionForm onAdd={handleAdd} />
          </div>
          <div className="space-y-6">
            <div data-tour="logo">
              <LogoUploader logo={logo} setLogo={setLogo} />
            </div>
            <div className="rounded-xl border border-green-200 bg-white p-4 shadow-sm" data-tour="stats">
              <h3 className="font-semibold text-green-900">Statistik Ringkas</h3>
              <dl className="mt-3 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <dt className="text-green-700/80">Total Berat</dt>
                  <dd className="text-lg font-semibold">{totals.weight.toFixed(2)} kg</dd>
                </div>
                <div>
                  <dt className="text-green-700/80">Total Nilai</dt>
                  <dd className="text-lg font-semibold">{currency(totals.value)}</dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        <section className="mt-6" data-tour="table">
          <TransactionTable items={items} onDelete={handleDelete} />
        </section>
      </main>

      <footer className="border-t border-green-100 py-6 text-center text-sm text-green-700/80">
        © {new Date().getFullYear()} Bank Sampah Sekawan Makmur. Penghijauan • Bersih Sampah • Ciamik.
      </footer>
    </div>
  );
}

export default App;
