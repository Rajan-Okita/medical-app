'use client';
import { useState } from 'react';

export default function AddProgramPage() {
  const [formData, setFormData] = useState({ program_name: '', duration: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('/api/program', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    alert('Program added!');
  };

  return (
    <div className="max-w-xl mx-auto mt-12 bg-white p-8 rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Program</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Program Name</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            value={formData.program_name}
            onChange={(e) => setFormData({ ...formData, program_name: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Duration (days)</label>
          <input
            type="number"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            required
          />
        </div>
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
          Add Program
        </button>
      </form>
    </div>
  );
}
