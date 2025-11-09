import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';

const initialForm = { date: '', customer: '', material: '', weight: '', price: '' };

const TransactionForm = ({ onAdd }) => {
  const [form, setForm] = useState(initialForm);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const weight = parseFloat(form.weight || '0');
    const price = parseFloat(form.price || '0');
    const total = weight * price;
    const payload = { ...form, weight, price, total };
    onAdd(payload);
    setForm(initialForm);
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-green-200 bg-white p-4 shadow-sm">
      <h3 className="mb-4 font-semibold text-green-900">Tambah Transaksi</h3>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        <input
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          className="w-full rounded-md border-green-300 focus:border-green-500 focus:ring-green-500"
          required
        />
        <input
          name="customer"
          placeholder="Nama Nasabah"
          value={form.customer}
          onChange={handleChange}
          className="w-full rounded-md border-green-300 focus:border-green-500 focus:ring-green-500"
          required
        />
        <input
          name="material"
          placeholder="Jenis Material"
          value={form.material}
          onChange={handleChange}
          className="w-full rounded-md border-green-300 focus:border-green-500 focus:ring-green-500"
          required
        />
        <input
          name="weight"
          type="number"
          step="0.01"
          placeholder="Berat (kg)"
          value={form.weight}
          onChange={handleChange}
          className="w-full rounded-md border-green-300 focus:border-green-500 focus:ring-green-500"
          required
        />
        <input
          name="price"
          type="number"
          step="0.01"
          placeholder="Harga/kg"
          value={form.price}
          onChange={handleChange}
          className="w-full rounded-md border-green-300 focus:border-green-500 focus:ring-green-500"
          required
        />
      </div>
      <div className="mt-4">
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-md bg-green-700 px-4 py-2 text-white shadow hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          <PlusCircle className="h-4 w-4" /> Tambah
        </button>
      </div>
    </form>
  );
};

export default TransactionForm;
