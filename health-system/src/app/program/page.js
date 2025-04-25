'use client';
import { useState } from 'react';

export default function AddProgramPage() {
  const [form, setForm] = useState({ program_name: '', duration: '' });
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    const res = await fetch('/api/program', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });

    const data = await res.json();
    if (res.ok) {
      setMessage('Program added successfully!');
      setForm({ program_name: '', duration: '' });
    } else {
      setMessage(data.message);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', paddingTop: '50px' }}>
      <h2>Add New Program</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Program Name"
          value={form.program_name}
          onChange={(e) => setForm({ ...form, program_name: e.target.value })}
          required
        /><br/>
        <input
          type="number"
          placeholder="Duration (in days)"
          value={form.duration}
          onChange={(e) => setForm({ ...form, duration: e.target.value })}
          required
        /><br/>
        <button type="submit">Add Program</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
