'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ClientListPage() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClients = async () => {
      const res = await fetch('/api/client');
      const data = await res.json();
      setClients(data);
      setLoading(false);
    };
    fetchClients();
  }, []);

  if (loading) return <p style={{ textAlign: 'center', marginTop: '50px' }}>Loading clients...</p>;

  return (
    <div style={{ maxWidth: '800px', margin: 'auto', paddingTop: '50px' }}>
      <h2>All Clients</h2>
      {clients.length === 0 ? (
        <p>No clients found.</p>
      ) : (
        clients.map(client => (
          <div key={client.client_id} style={{ borderBottom: '1px solid #ccc', padding: '10px' }}>
            <Link href={`/client/${client.client_id}`}>
              <strong>{client.first_name} {client.last_name}</strong>
            </Link>
          </div>
        ))
      )}
    </div>
  );
}
