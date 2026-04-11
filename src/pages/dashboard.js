import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Dashboard() {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loginStatus = localStorage.getItem('isLoggedIn');
    if (loginStatus !== 'true') {
      router.push('/login'); // Tendang balik ke login jika belum auth
    } else {
      setIsLoaded(true);
    }
  }, [router]);

  if (!isLoaded) return <p className="text-white text-center mt-10">Loading...</p>;

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold">Dashboard SmartFin</h1>
        <button 
          onClick={() => { localStorage.removeItem('isLoggedIn'); router.push('/'); }}
          className="bg-red-500 px-4 py-2 rounded text-sm"
        >
          Logout
        </button>
      </div>
      
      {/* Konten aplikasi (Monitoring pH & Suhu) akan diletakkan di sini */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800 p-10 rounded-xl border border-blue-500/30 text-center">
          <p className="text-gray-400">Status pH</p>
          <h2 className="text-6xl font-bold text-green-400">--</h2>
        </div>
        <div className="bg-gray-800 p-10 rounded-xl border border-blue-500/30 text-center">
          <p className="text-gray-400">Status Suhu</p>
          <h2 className="text-6xl font-bold text-orange-400">--</h2>
        </div>
      </div>
    </div>
  );
}