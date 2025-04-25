import prisma from '../../../lib/prisma';

export default async function ClientDetailPage({ params }) {
  const clientId = parseInt(params.client_id);

  const client = await prisma.client.findUnique({
    where: { client_id: clientId },
    include: { programs: { include: { program: true } } }
  });

  if (!client) {
    return <p style={{ textAlign: 'center', marginTop: '50px' }}>Client not found.</p>;
  }

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', paddingTop: '50px' }}>
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
    </div>
  );
}
