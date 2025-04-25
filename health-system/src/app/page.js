import Link from 'next/link';

export default function HomePage() {
  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>Welcome to Health System</h1>
      <p>Please choose an option below:</p>
      <div style={{ marginTop: '30px' }}>
      <Link href="/auth/signup">
          <button style={{ padding: '10px 20px' }}>Sign Up</button>
        </Link>
        <Link href="/auth/login">
          <button style={{ marginRight: '20px', padding: '10px 20px' }}>Login</button>
        </Link>
      </div>
    </div>
  );
}
