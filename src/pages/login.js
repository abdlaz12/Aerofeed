import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Login() {
  const [username, setUsername] = useState('');
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulasi login sederhana
    if (username === 'admin') {
      localStorage.setItem('isLoggedIn', 'true'); // Simpan status login di browser
      router.push('/dashboard');
    } else {
      alert('Gunakan username: admin');
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Login SmartFin</h2>
        <input 
          type="text" 
          placeholder="Username (ketik 'admin')" 
          className="w-full p-3 border rounded mb-4 text-black"
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700">
          Masuk
        </button>
      </form>
    </div>
  );
}