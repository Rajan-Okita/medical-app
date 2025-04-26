import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center px-4">
      <h1 className="text-4xl font-bold mb-4 text-sky-700">Welcome to Health System</h1>
      <p className="text-lg text-gray-600 mb-8">Please choose an option below:</p>
      
      <div className="space-x-4">
        <Link href="/auth/signup">
          <button className="bg-sky-600 text-white px-6 py-2 rounded hover:bg-sky-700 transition">
            Sign Up
          </button>
        </Link>
        <Link href="/auth/login">
          <button className="bg-gray-300 text-gray-800 px-6 py-2 rounded hover:bg-gray-400 transition">
            Login
          </button>
        </Link>
      </div>
    </div>
  );
}
