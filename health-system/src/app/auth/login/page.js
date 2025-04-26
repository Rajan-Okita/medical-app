'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });

    const data = await res.json();
    if (res.ok) {
      router.push('/dashboard');
    } else {
      setError(data.message);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-16 bg-white p-8 rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Doctor Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
        />
        <button 
          type="submit"
          className="w-full bg-sky-600 text-white py-2 rounded hover:bg-sky-700 transition"
        >
          Login
        </button>
      </form>

      {error && (
        <p className="mt-4 text-center text-red-600 font-medium">{error}</p>
      )}

      <p className="mt-6 text-center text-sm text-gray-600">
        Don't have an account?{' '}
        <Link href="/auth/signup" className="text-sky-600 hover:underline">
          Sign Up
        </Link>
      </p>
    </div>
  );
}
