'use client';
import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';

export default function ClientDetailPage({ params }) {
  const router = useRouter();
  const resolvedParams = use(params);

  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState({ first_name: '', last_name: '', weight: '', age: '' });
  const [allPrograms, setAllPrograms] = useState([]);
  const [selectedPrograms, setSelectedPrograms] = useState([]);

  useEffect(() => {
    fetchClient();
    fetchPrograms();
  }, []);

  const fetchClient = async () => {
    const res = await fetch(`/api/client/${resolvedParams.client_id}`);
    if (!res.ok) {
      setClient(null);
    } else {
      const data = await res.json();
      setClient(data);
      setEditForm({
        first_name: data.first_name,
        last_name: data.last_name,
        weight: data.weight || '',
        age: data.age || ''
      });
      setSelectedPrograms(data.programs.map(p => p.program.program_id));
    }
    setLoading(false);
  };

  const fetchPrograms = async () => {
    const res = await fetch('/api/program');
    const data = await res.json();
    setAllPrograms(data);
  };

  const handleProgramToggle = (program_id) => {
    if (selectedPrograms.includes(program_id)) {
      setSelectedPrograms(selectedPrograms.filter(id => id !== program_id));
    } else {
      setSelectedPrograms([...selectedPrograms, program_id]);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    await fetch(`/api/client/${resolvedParams.client_id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...editForm, program_ids: selectedPrograms })
    });
    setEditMode(false);
    fetchClient();
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this client?");
    if (!confirmDelete) return;

    await fetch(`/api/client/${resolvedParams.client_id}`, { method: 'DELETE' });
    router.push('/client-list');
  };

  if (loading) return <p style={{ textAlign: 'center', marginTop: '50px' }}>Loading client...</p>;
  if (!client) return <p style={{ textAlign: 'center', marginTop: '50px' }}>Client not found.</p>;

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', paddingTop: '50px' }}>
      {editMode ? (
        <form onSubmit={handleEditSubmit}>
          <h3>Edit Client Info</h3>
          <input
            value={editForm.first_name}
            onChange={(e) => setEditForm({ ...editForm, first_name: e.target.value })}
            required
          /><br/>
          <input
            value={editForm.last_name}
            onChange={(e) => setEditForm({ ...editForm, last_name: e.target.value })}
            required
          /><br/>
          <input
            type="number"
            placeholder="Weight"
            value={editForm.weight}
            onChange={(e) => setEditForm({ ...editForm, weight: e.target.value })}
          /><br/>
          <input
            type="number"
            placeholder="Age"
            value={editForm.age}
            onChange={(e) => setEditForm({ ...editForm, age: e.target.value })}
          /><br/>

          <h4>Manage Programs:</h4>
          {allPrograms.length > 0 ? allPrograms.map(program => (
            <div key={program.program_id}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedPrograms.includes(program.program_id)}
                  onChange={() => handleProgramToggle(program.program_id)}
                />
                {program.program_name} ({program.duration} days)
              </label>
            </div>
          )) : <p>No programs available.</p>}

          <br/>
          <button type="submit">💾 Save</button>
          <button type="button" onClick={() => setEditMode(false)}>Cancel</button>
        </form>
      ) : (
        <>
          <h2>{client.first_name} {client.last_name}</h2>
          <p><strong>Age:</strong> {client.age || 'N/A'}</p>
          <p><strong>Weight:</strong> {client.weight || 'N/A'} kg</p>

          <h4>Enrolled Programs:</h4>
          <ul>
            {client.programs.length > 0 ? (
              client.programs.map(p => (
                <li key={p.program.program_id}>
                  {p.program.program_name} ({p.program.duration} days)
                </li>
              ))
            ) : (
              <li>No programs enrolled.</li>
            )}
          </ul>

          <button onClick={() => setEditMode(true)}>✏️ Edit</button>
          <button onClick={handleDelete} style={{ marginLeft: '10px' }}>🗑️ Delete</button>
        </>
      )}
    </div>
  );
}
