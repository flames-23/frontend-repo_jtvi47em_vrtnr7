import React from 'react';

const currency = (n) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(n || 0);

const TransactionTable = ({ items, onDelete }) => {
  const totalWeight = items.reduce((s, it) => s + (Number(it.weight) || 0), 0);
  const grandTotal = items.reduce((s, it) => s + (Number(it.total) || 0), 0);

  return (
    <div className="rounded-xl border border-green-200 bg-white p-4 shadow-sm">
      <h3 className="mb-4 font-semibold text-green-900">Daftar Transaksi</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-green-50 text-green-900">
              <th className="px-3 py-2 text-left">Tanggal</th>
              <th className="px-3 py-2 text-left">Nasabah</th>
              <th className="px-3 py-2 text-left">Material</th>
              <th className="px-3 py-2 text-right">Berat (kg)</th>
              <th className="px-3 py-2 text-right">Harga/kg</th>
              <th className="px-3 py-2 text-right">Total</th>
              {onDelete && <th className="px-3 py-2"></th>}
            </tr>
          </thead>
          <tbody>
            {items.map((it, idx) => (
              <tr key={idx} className="border-t">
                <td className="px-3 py-2">{it.date}</td>
                <td className="px-3 py-2">{it.customer}</td>
                <td className="px-3 py-2">{it.material}</td>
                <td className="px-3 py-2 text-right">{Number(it.weight).toFixed(2)}</td>
                <td className="px-3 py-2 text-right">{currency(it.price)}</td>
                <td className="px-3 py-2 text-right">{currency(it.total)}</td>
                {onDelete && (
                  <td className="px-3 py-2 text-right">
                    <button
                      onClick={() => onDelete(idx)}
                      className="text-red-600 hover:underline"
                    >
                      Hapus
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t font-semibold">
              <td className="px-3 py-2" colSpan={3}>Total</td>
              <td className="px-3 py-2 text-right">{totalWeight.toFixed(2)}</td>
              <td className="px-3 py-2 text-right">—</td>
              <td className="px-3 py-2 text-right">{currency(grandTotal)}</td>
              {onDelete && <td></td>}
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default TransactionTable;
