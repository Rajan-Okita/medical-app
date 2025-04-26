'use client';
import { useState, useEffect } from 'react';

export default function AddClientPage() {
  const [form, setForm] = useState({ first_name: '', last_name: '', weight: '', age: '' });
  const [programs, setPrograms] = useState([]);
  const [selectedPrograms, setSelectedPrograms] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchPrograms = async () => {
      const res = await fetch('/api/program');
      const data = await res.json();
      setPrograms(data);
    };
    fetchPrograms();
  }, []);

  const handleProgramChange = (program_id) => {
    if (selectedPrograms.includes(program_id)) {
      setSelectedPrograms(selectedPrograms.filter(id => id !== program_id));
    } else {
      setSelectedPrograms([...selectedPrograms, program_id]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    const res = await fetch('/api/client', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, program_ids: selectedPrograms })
    });

    const data = await res.json();
    if (res.ok) {
      setMessage('✅ Client added and enrolled successfully!');
      setForm({ first_name: '', last_name: '', weight: '', age: '' });
      setSelectedPrograms([]);
    } else {
      setMessage(`❌ ${data.message}`);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-12 bg-white p-8 rounded shadow">
      <h2 className='text-2xl font-bold mb-6 text-center'>Add New Client</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block mb-1 font-medium">First Name</label>
          <input 
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
            placeholder="First Name"
            value={form.first_name}
            onChange={(e) => setForm({ ...form, first_name: e.target.value })}
            required 
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Last Name</label>
          <input 
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
            placeholder="Last Name"
            value={form.last_name}
            onChange={(e) => setForm({ ...form, last_name: e.target.value })}
            required 
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Weight (kg)</label>
          <input 
            type="number"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
            placeholder="Weight"
            value={form.weight}
            onChange={(e) => setForm({ ...form, weight: e.target.value })}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Age</label>
          <input 
            type="number"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
            placeholder="Age"
            value={form.age}
            onChange={(e) => setForm({ ...form, age: e.target.value })}
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Select Programs</label>
          {programs.length > 0 ? programs.map(program => (
            <div key={program.program_id} className="flex items-center mb-2">
              <input
                type="checkbox"
                className="mr-2"
                checked={selectedPrograms.includes(program.program_id)}
                onChange={() => handleProgramChange(program.program_id)}
              />
              <span>{program.program_name} ({program.duration} days)</span>
            </div>
          )) : <p className="text-sm text-gray-500">No programs available.</p>}
        </div>

        <button 
          type="submit" 
          className="w-full bg-sky-600 text-white py-2 rounded hover:bg-sky-700 transition"
        >
          Add Client
        </button>
      </form>

      {message && (
        <p className={`mt-4 text-center font-medium ${message.startsWith('✅') ? 'text-green-600' : 'text-red-600'}`}>
          {message}
        </p>
      )}
    </div>
  );
}
