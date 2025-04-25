'use client';
import { useState, useEffect } from 'react';

export default function ViewProgramsPage() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editProgramId, setEditProgramId] = useState(null);
  const [editForm, setEditForm] = useState({ program_name: '', duration: '' });

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    setLoading(true);
    const res = await fetch('/api/program');
    const data = await res.json();
    setPrograms(data);
    setLoading(false);
  };

  const handleDelete = async (id) => {
    await fetch(`/api/program/${id}`, { method: 'DELETE' });
    fetchPrograms();
  };

  const startEdit = (program) => {
    setEditProgramId(program.program_id);
    setEditForm({ program_name: program.program_name, duration: program.duration });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    await fetch(`/api/program/${editProgramId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editForm)
    });
    setEditProgramId(null);
    fetchPrograms();
  };

  if (loading) return <p style={{ textAlign: 'center', marginTop: '50px' }}>Loading programs...</p>;

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', paddingTop: '50px' }}>
      <h2>Available Programs</h2>
      {programs.length === 0 ? (
        <p>No programs have been added yet.</p>
      ) : (
        programs.map(program => (
          <div key={program.program_id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
            {editProgramId === program.program_id ? (
              <form onSubmit={handleEditSubmit}>
                <input
                  value={editForm.program_name}
                  onChange={(e) => setEditForm({ ...editForm, program_name: e.target.value })}
                  required
                /><br/>
                <input
                  type="number"
                  value={editForm.duration}
                  onChange={(e) => setEditForm({ ...editForm, duration: e.target.value })}
                  required
                /><br/>
                <button type="submit">💾 Save</button>
                <button type="button" onClick={() => setEditProgramId(null)}>Cancel</button>
              </form>
            ) : (
              <>
                <strong>{program.program_name}</strong><br/>
                Duration: {program.duration} days <br/>
                <button onClick={() => startEdit(program)}>✏️ Edit</button>
                <button onClick={() => handleDelete(program.program_id)} style={{ marginLeft: '10px' }}>🗑️ Delete</button>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
}
