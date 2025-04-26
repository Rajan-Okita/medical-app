'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignupPage() {
  const [form, setForm] = useState({ first_name: '', last_name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });

    const data = await res.json();
    if (res.ok) {
      router.push('/auth/login');
    } else {
      setError(data.message);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-16 bg-white p-8 rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Doctor Signup</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          placeholder="First Name"
          value={form.first_name}
          onChange={(e) => setForm({ ...form, first_name: e.target.value })}
          required
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
        />
        <input
          placeholder="Last Name"
          value={form.last_name}
          onChange={(e) => setForm({ ...form, last_name: e.target.value })}
          required
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
        />
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
          Sign Up
        </button>
      </form>

      {error && (
        <p className="mt-4 text-center text-red-600 font-medium">{error}</p>
      )}

      <p className="mt-6 text-center text-sm text-gray-600">
        Already have an account?{' '}
        <Link href="/auth/login" className="text-sky-600 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}
