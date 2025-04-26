'use client';
import { useState, useEffect } from 'react';

export default function ViewProgramsPage() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editProgramId, setEditProgramId] = useState(null);
  const [editForm, setEditForm] = useState({ program_name: '', duration: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 5;

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
    const confirmDelete = window.confirm("Are you sure you want to delete this program?");
    if (!confirmDelete) return;
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

  // Filtered Programs
  const filteredPrograms = programs.filter(program =>
    program.program_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPrograms.length / ITEMS_PER_PAGE);
  const displayedPrograms = filteredPrograms.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePrev = () => setCurrentPage(prev => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="text-gray-500 text-lg">Loading programs...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-12 p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Available Programs</h2>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search programs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
        />
      </div>

      {filteredPrograms.length === 0 ? (
        <p className="text-center text-gray-500">No programs match your search.</p>
      ) : (
        <>
          <div className="space-y-4">
            {displayedPrograms.map(program => (
              <div key={program.program_id} className="border rounded p-4 shadow hover:shadow-md transition">
                {editProgramId === program.program_id ? (
                  <form onSubmit={handleEditSubmit} className="space-y-2">
                    <input
                      className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                      value={editForm.program_name}
                      onChange={(e) => setEditForm({ ...editForm, program_name: e.target.value })}
                      required
                    />
                    <input
                      type="number"
                      className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                      value={editForm.duration}
                      onChange={(e) => setEditForm({ ...editForm, duration: e.target.value })}
                      required
                    />
                    <div className="space-x-2">
                      <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
                        💾 Save
                      </button>
                      <button type="button" onClick={() => setEditProgramId(null)} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition">
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <p className="font-semibold text-lg">{program.program_name}</p>
                    <p className="text-gray-600 mb-2">Duration: {program.duration} days</p>
                    <button
                      onClick={() => startEdit(program)}
                      className="px-4 py-2 bg-sky-600 text-white rounded hover:bg-sky-700 transition"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(program.program_id)}
                      className="ml-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                    >
                      🗑️ Delete
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center space-x-4 mt-6">
              <button 
                onClick={handlePrev} 
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded ${currentPage === 1 ? 'bg-gray-300' : 'bg-sky-600 text-white hover:bg-sky-700'}`}
              >
                Previous
              </button>
              <button 
                onClick={handleNext} 
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded ${currentPage === totalPages ? 'bg-gray-300' : 'bg-sky-600 text-white hover:bg-sky-700'}`}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
