import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      setAuthorized(false);
      router.push('/login'); // Tendang ke login jika belum ada session
    } else {
      setAuthorized(true);
    }
  }, [router]);

  if (!authorized) return null; // Jangan tampilkan apa-apa selama loading/checking

  return <>{children}</>;
}