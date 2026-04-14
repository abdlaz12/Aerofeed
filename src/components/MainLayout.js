import Sidebar from './Sidebar';

export default function MainLayout({ children }) {
  return (
    <div className="flex bg-[#F8FAFC] min-h-screen">
      {/* Sidebar dipanggil di sini, otomatis muncul di tiap page */}
      <Sidebar />

      {/* Konten Area: Ditambahkan margin-left 64 (w-64) agar tidak tertutup sidebar */}
      <main className="flex-1 ml-64 p-8 overflow-y-auto">
        {/* Container Maksimal agar layout tetap rapi di layar lebar */}
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}