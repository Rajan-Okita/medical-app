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
      setMessage('Client added and enrolled successfully!');
      setForm({ first_name: '', last_name: '', weight: '', age: '' });
      setSelectedPrograms([]);
    } else {
      setMessage(data.message);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', paddingTop: '50px' }}>
      <h2>Add New Client</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="First Name" value={form.first_name} onChange={(e) => setForm({ ...form, first_name: e.target.value })} required /><br/>
        <input placeholder="Last Name" value={form.last_name} onChange={(e) => setForm({ ...form, last_name: e.target.value })} required /><br/>
        <input type="number" placeholder="Weight (kg)" value={form.weight} onChange={(e) => setForm({ ...form, weight: e.target.value })} /><br/>
        <input type="number" placeholder="Age" value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} /><br/>

        <h4>Select Programs:</h4>
        {programs.map(program => (
          <div key={program.program_id}>
            <label>
              <input
                type="checkbox"
                checked={selectedPrograms.includes(program.program_id)}
                onChange={() => handleProgramChange(program.program_id)}
              />
              {program.program_name} ({program.duration} days)
            </label>
          </div>
        ))}

        <br/>
        <button type="submit">Add Client</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
