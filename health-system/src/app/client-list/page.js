'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ClientListPage() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    const fetchClients = async () => {
      const res = await fetch('/api/client');
      const data = await res.json();
      setClients(data);
      setLoading(false);
    };
    fetchClients();
  }, []);

  // Filter clients by search
  const filteredClients = clients.filter(client =>
    `${client.first_name} ${client.last_name}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination Logic
  const totalPages = Math.ceil(filteredClients.length / ITEMS_PER_PAGE);
  const displayedClients = filteredClients.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePrev = () => setCurrentPage(prev => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));

  // Reset to page 1 
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="text-gray-500 text-lg">Loading clients...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-12 p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">All Clients</h2>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search clients by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
        />
      </div>

      {filteredClients.length === 0 ? (
        <p className="text-center text-gray-500">No clients match your search.</p>
      ) : (
        <>
          <div className="space-y-4">
            {displayedClients.map(client => (
              <Link 
                key={client.client_id} 
                href={`/client/${client.client_id}`}
                className="block border rounded p-4 shadow hover:shadow-md transition"
              >
                <p className="font-semibold text-lg">
                  {client.first_name} {client.last_name}
                </p>
                <p className="text-sm text-gray-500">Click to view details</p>
              </Link>
            ))}
          </div>

          {/* Pagination Controls */}
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
