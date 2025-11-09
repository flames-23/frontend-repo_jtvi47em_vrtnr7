import React, { useState } from 'react';
import { LockKeyhole, Leaf } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({ nik: '', password: '', role: 'warga' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.nik || !form.password) {
      setError('Silakan isi NIK dan kata sandi.');
      return;
    }
    setLoading(true);
    try {
      const base = import.meta.env.VITE_BACKEND_URL?.replace(/\/$/, '') || '';
      const res = await fetch(`${base}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nik: form.nik, password: form.password })
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.detail || 'Gagal masuk. Periksa kredensial.');
      }
      const data = await res.json();
      // Simpan profil + token. Role dari backend menggantikan pilihan lokal.
      localStorage.setItem('bssm_auth', JSON.stringify({ nik: data.nik, name: data.name, role: data.role, token: data.token }));
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-green-50 to-white flex items-center justify-center px-4">
      <div className="w-full max-w-md overflow-hidden rounded-2xl border border-emerald-200 bg-white shadow-sm">
        <div className="flex items-center gap-3 bg-gradient-to-r from-emerald-600 to-green-600 px-6 py-5 text-white">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/25" data-tour="logo">
            <Leaf className="h-7 w-7 text-lime-200" />
          </div>
          <div>
            <h1 className="text-lg font-bold">Bank Sampah Sekawan Makmur</h1>
            <p className="text-xs text-emerald-100">Portal Admin & Warga</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 px-6 py-6">
          <div>
            <label className="text-sm text-gray-700">NIK</label>
            <input name="nik" value={form.nik} onChange={handleChange} placeholder="Contoh: 3512xxxxxxxxxxxx" className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-emerald-500 focus:outline-none" />
          </div>
          <div>
            <label className="text-sm text-gray-700">Kata Sandi</label>
            <input type="password" name="password" value={form.password} onChange={handleChange} className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-emerald-500 focus:outline-none" />
          </div>
          <div>
            <label className="text-sm text-gray-700">Peran</label>
            <select name="role" value={form.role} onChange={handleChange} className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-emerald-500 focus:outline-none">
              <option value="warga">Warga</option>
              <option value="pengurus">Pengurus</option>
              <option value="admin">Admin</option>
            </select>
            <p className="mt-1 text-xs text-gray-500">Peran akhir mengikuti data akun di server.</p>
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button type="submit" disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 font-medium text-white hover:bg-emerald-700 disabled:opacity-60">
            <LockKeyhole className="h-4 w-4" /> {loading ? 'Memproses...' : 'Masuk'}
          </button>
          <p className="text-center text-xs text-gray-500">Akses khusus warga/pengurus Sekawan Makmur</p>
        </form>
      </div>
    </div>
  );
}
