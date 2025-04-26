import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-white text-center px-4">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">Dashboard</h1>
      <p className="mb-10 text-gray-500">Manage your clients and health programs efficiently.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-md">
        <Link href="/client">
          <button className="w-full px-6 py-3 bg-sky-600 text-white rounded-lg shadow hover:bg-sky-700 transition">
            ➕ Add Client
          </button>
        </Link>
        <Link href="/client-list">
          <button className="w-full px-6 py-3 bg-gray-200 text-gray-800 rounded-lg shadow hover:bg-gray-300 transition">
            👥 View Clients
          </button>
        </Link>
        <Link href="/program">
          <button className="w-full px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition">
            ➕ Add Program
          </button>
        </Link>
        <Link href="/program-list">
          <button className="w-full px-6 py-3 bg-gray-200 text-gray-800 rounded-lg shadow hover:bg-gray-300 transition">
            📋 View Programs
          </button>
        </Link>
      </div>

      <div className="mt-10">
        <Link href="/">
          <button className="px-6 py-3 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition">
            🚪 Logout
          </button>
        </Link>
      </div>
    </div>
  );
}
