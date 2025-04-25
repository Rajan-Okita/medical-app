'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

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
      alert('Signup successful! Redirecting to login...');
      router.push('/auth/login');
    } else {
      setError(data.message);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', paddingTop: '50px' }}>
      <h2>Doctor Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="First Name"
          value={form.first_name}
          onChange={(e) => setForm({ ...form, first_name: e.target.value })}
          required
        /><br/>
        <input
          placeholder="Last Name"
          value={form.last_name}
          onChange={(e) => setForm({ ...form, last_name: e.target.value })}
          required
        /><br/>
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        /><br/>
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        /><br/>
        <button type="submit">Sign Up</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
