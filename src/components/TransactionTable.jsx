import React from 'react';

export default function TransactionTable({ data, onRemove }) {
  const totalWeight = data.reduce((sum, r) => sum + r.weight, 0);
  const grandTotal = data.reduce((sum, r) => sum + r.total, 0);

  return (
    <div className="overflow-hidden rounded-2xl border border-emerald-200 bg-white shadow-sm">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-emerald-50">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold text-emerald-900">Tanggal</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-emerald-900">Penyetor</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-emerald-900">Jenis</th>
            <th className="px-4 py-3 text-right text-sm font-semibold text-emerald-900">Berat (kg)</th>
            <th className="px-4 py-3 text-right text-sm font-semibold text-emerald-900">Harga/kg</th>
            <th className="px-4 py-3 text-right text-sm font-semibold text-emerald-900">Total (Rp)</th>
            <th className="px-4 py-3" />
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {data.length === 0 ? (
            <tr>
              <td colSpan="7" className="px-4 py-6 text-center text-gray-500">Belum ada transaksi</td>
            </tr>
          ) : (
            data.map((row, idx) => (
              <tr key={idx} className="hover:bg-emerald-50/40">
                <td className="px-4 py-3 text-gray-700">{row.date}</td>
                <td className="px-4 py-3 text-gray-700">{row.customer}</td>
                <td className="px-4 py-3 text-gray-700">{row.material}</td>
                <td className="px-4 py-3 text-right tabular-nums text-gray-700">{row.weight.toFixed(2)}</td>
                <td className="px-4 py-3 text-right tabular-nums text-gray-700">{Number(row.price).toLocaleString('id-ID')}</td>
                <td className="px-4 py-3 text-right tabular-nums font-semibold text-emerald-700">{Number(row.total).toLocaleString('id-ID')}</td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => onRemove(idx)} className="text-sm text-red-600 hover:underline">Hapus</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
        <tfoot className="bg-emerald-50">
          <tr>
            <td className="px-4 py-3 text-sm font-medium text-emerald-900" colSpan="3">Total</td>
            <td className="px-4 py-3 text-right tabular-nums text-sm font-medium text-emerald-900">{totalWeight.toFixed(2)}</td>
            <td />
            <td className="px-4 py-3 text-right tabular-nums text-sm font-bold text-emerald-900">{grandTotal.toLocaleString('id-ID')}</td>
            <td />
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
