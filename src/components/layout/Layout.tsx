import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { CallCenterBar } from './CallCenterBar';

export function Layout() {
  const { pathname } = useLocation();

  // เลื่อนขึ้นบนสุดเมื่อเปลี่ยนหน้า
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CallCenterBar />
    </div>
  );
}
