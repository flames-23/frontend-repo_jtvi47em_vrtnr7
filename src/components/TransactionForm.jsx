import React, { useState } from 'react';
import { PlusCircle, Download } from 'lucide-react';

const materialOptions = [
  { value: 'Plastik', price: 3000 },
  { value: 'Kertas', price: 2000 },
  { value: 'Logam', price: 5000 },
  { value: 'Kaca', price: 1500 },
  { value: 'Organik', price: 800 },
];

export default function TransactionForm({ onAdd, onExport }) {
  const [form, setForm] = useState({
    date: '',
    customer: '',
    material: materialOptions[0].value,
    weight: '',
    price: materialOptions[0].price,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleMaterialChange = (e) => {
    const selected = materialOptions.find((m) => m.value === e.target.value);
    setForm((prev) => ({ ...prev, material: selected.value, price: selected.price }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.date || !form.customer || !form.weight) return;
    const weightNum = parseFloat(form.weight);
    if (Number.isNaN(weightNum) || weightNum <= 0) return;
    const total = weightNum * Number(form.price);
    onAdd({ ...form, weight: weightNum, total });
    setForm({ date: '', customer: '', material: materialOptions[0].value, weight: '', price: materialOptions[0].price });
  };

  return (
    <div className="rounded-2xl border border-emerald-200 bg-white p-4 shadow-sm">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-6">
        <div className="md:col-span-1">
          <label className="text-sm text-gray-600">Tanggal</label>
          <input type="date" name="date" value={form.date} onChange={handleChange} className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-emerald-500 focus:outline-none" />
        </div>
        <div className="md:col-span-2">
          <label className="text-sm text-gray-600">Nama Penyetor</label>
          <input type="text" name="customer" value={form.customer} onChange={handleChange} placeholder="Contoh: Siti Aminah" className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-emerald-500 focus:outline-none" />
        </div>
        <div className="md:col-span-1">
          <label className="text-sm text-gray-600">Jenis</label>
          <select name="material" value={form.material} onChange={handleMaterialChange} className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-emerald-500 focus:outline-none">
            {materialOptions.map((m) => (
              <option key={m.value} value={m.value}>{m.value}</option>
            ))}
          </select>
        </div>
        <div className="md:col-span-1">
          <label className="text-sm text-gray-600">Berat (kg)</label>
          <input type="number" min="0" step="0.01" name="weight" value={form.weight} onChange={handleChange} placeholder="0.00" className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-emerald-500 focus:outline-none" />
        </div>
        <div className="md:col-span-1">
          <label className="text-sm text-gray-600">Harga/kg (Rp)</label>
          <input type="number" name="price" value={form.price} onChange={handleChange} className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-emerald-500 focus:outline-none" />
        </div>
        <div className="md:col-span-6 flex items-end justify-between gap-2">
          <button type="submit" className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700">
            <PlusCircle className="h-4 w-4" /> Tambah Transaksi
          </button>
          <button type="button" onClick={onExport} className="inline-flex items-center gap-2 rounded-lg border border-emerald-600 px-4 py-2 text-emerald-700 hover:bg-emerald-50">
            <Download className="h-4 w-4" /> Export ke Excel
          </button>
        </div>
      </form>
    </div>
  );
}
