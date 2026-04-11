import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-5xl font-bold text-blue-400 mb-4">Aerofin</h1>
      <p className="text-xl text-gray-400 mb-8 text-center max-w-lg">
        Solusi cerdas monitoring kualitas air secara real-time untuk masa depan perikanan.
      </p>
      <div className="flex gap-4">
        <Link href="/login">
          <button className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg font-semibold transition">
            Masuk ke SmartFin
          </button>
        </Link>
      </div>
    </div>
  );
}