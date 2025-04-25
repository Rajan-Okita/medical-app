import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div style={{ textAlign: 'center', paddingTop: '80px' }}>
      <h1>🩺 Health System Dashboard</h1>
      <p>Welcome, Doctor! What would you like to do today?</p>

      <div style={{ marginTop: '50px' }}>
        <h3>Client Managements</h3>
        <Link href="/client">
          <button style={buttonStyle}>➕ Add Client</button>
        </Link>
        <Link href="/client-list">
          <button style={buttonStyle}>👥 View Clients</button>
        </Link>
      </div>

      <div style={{ marginTop: '40px' }}>
        <h3>Program Management</h3>
        <Link href="/program">
          <button style={buttonStyle}>➕ Add Program</button>
        </Link>
        <Link href="/program-list">
          <button style={buttonStyle}>📋View all programs</button>
        </Link>
      </div>

      <div style={{ marginTop: '60px' }}>
        <button style={{ ...buttonStyle, backgroundColor: '#e74c3c' }}>🚪 Logout</button>
      </div>
    </div>
  );
}

const buttonStyle = {
  margin: '10px',
  padding: '12px 25px',
  fontSize: '16px',
  cursor: 'pointer'
};
