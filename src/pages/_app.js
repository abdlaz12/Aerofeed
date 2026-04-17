import '../styles/globals.css';
import MainLayout from '../components/MainLayout';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }) {
  const router = useRouter();

  // Daftar halaman yang TIDAK ingin menampilkan Sidebar
  // Kamu bisa tambah '/login' atau '/register' di sini nanti
  // src/pages/_app.js
  const noSidebarPages = ['/', '/login', '/register'];

  const isNoSidebar = noSidebarPages.includes(router.pathname);

  // Jika halaman ada di daftar noSidebarPages, render langsung tanpa MainLayout
  if (isNoSidebar) {
    return <Component {...pageProps} />;
  }

  // Jika tidak, bungkus dengan MainLayout agar Sidebar muncul
  return (
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  );
}