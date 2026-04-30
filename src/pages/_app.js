import '../styles/globals.css';
import Head from 'next/head';
import MainLayout from '../components/MainLayout';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }) {
  const router = useRouter();

  // Halaman yang tidak menggunakan MainLayout (Sidebar)
  const noSidebarPages = ['/', '/login', '/register'];
  const isNoSidebar = noSidebarPages.includes(router.pathname);

  return (
    <>
      {/* ── GLOBAL HEAD: Viewport & SEO defaults ── */}
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
        <meta name="theme-color" content="#0891B2" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </Head>

      {isNoSidebar ? (
        <Component {...pageProps} />
      ) : (
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      )}
    </>
  );
}