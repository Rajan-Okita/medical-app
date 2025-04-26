import Link from 'next/link';

export default function Header({ showNav = true }) {
  return (
    <header className="bg-sky-800 text-white py-4 shadow">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Health System</h1>
        {showNav && (
          <nav className="space-x-4">
            <Link href="/dashboard" className="hover:underline">Dashboard</Link>
            <Link href="/client-list" className="hover:underline">Clients</Link>
            <Link href="/program-list" className="hover:underline">Programs</Link>
            <Link href="/auth/login" className="hover:underline">Logout</Link>
          </nav>
        )}
      </div>
    </header>
  );
}
