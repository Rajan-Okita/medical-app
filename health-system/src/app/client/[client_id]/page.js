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

  if (loading) return <p className="text-center mt-12 text-gray-500 text-lg">Loading client...</p>;
  if (!client) return <p className="text-center mt-12 text-red-500 text-lg">Client not found.</p>;

  return (
    <div className="max-w-xl mx-auto mt-12 bg-white p-8 rounded shadow">
      {editMode ? (
        <form onSubmit={handleEditSubmit} className="space-y-4">
          <h3 className="text-2xl font-bold mb-4 text-center">Edit Client Info</h3>

          <input
            className="w-full border rounded px-3 py-2"
            value={editForm.first_name}
            onChange={(e) => setEditForm({ ...editForm, first_name: e.target.value })}
            placeholder="First Name"
            required
          />
          <input
            className="w-full border rounded px-3 py-2"
            value={editForm.last_name}
            onChange={(e) => setEditForm({ ...editForm, last_name: e.target.value })}
            placeholder="Last Name"
            required
          />
          <input
            type="number"
            className="w-full border rounded px-3 py-2"
            placeholder="Weight"
            value={editForm.weight}
            onChange={(e) => setEditForm({ ...editForm, weight: e.target.value })}
          />
          <input
            type="number"
            className="w-full border rounded px-3 py-2"
            placeholder="Age"
            value={editForm.age}
            onChange={(e) => setEditForm({ ...editForm, age: e.target.value })}
          />

          <div>
            <h4 className="font-medium mb-2">Manage Programs</h4>
            {allPrograms.length > 0 ? allPrograms.map(program => (
              <div key={program.program_id} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={selectedPrograms.includes(program.program_id)}
                  onChange={() => handleProgramToggle(program.program_id)}
                />
                <span>{program.program_name} ({program.duration} days)</span>
              </div>
            )) : <p className="text-sm text-gray-500">No programs available.</p>}
          </div>

          <div className="flex space-x-4">
            <button type="submit" className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
              💾 Save
            </button>
            <button type="button" onClick={() => setEditMode(false)} className="flex-1 bg-gray-300 py-2 rounded hover:bg-gray-400 transition">
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <h2 className="text-3xl font-bold mb-4 text-center">{client.first_name} {client.last_name}</h2>
          <p><strong>Age:</strong> {client.age || 'N/A'}</p>
          <p><strong>Weight:</strong> {client.weight || 'N/A'} kg</p>

          <div className="mt-4">
            <h4 className="font-medium mb-2">Enrolled Programs:</h4>
            <ul className="list-disc list-inside">
              {client.programs.length > 0 ? (
                client.programs.map(p => (
                  <li key={p.program.program_id}>
                    {p.program.program_name} ({p.program.duration} days)
                  </li>
                ))
              ) : (
                <li className="text-gray-500">No programs enrolled.</li>
              )}
            </ul>
          </div>

          <div className="flex space-x-4 mt-6">
            <button onClick={() => setEditMode(true)} className="flex-1 bg-sky-600 text-white py-2 rounded hover:bg-sky-700 transition">
              ✏️ Edit
            </button>
            <button onClick={handleDelete} className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600 transition">
              🗑️ Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}
