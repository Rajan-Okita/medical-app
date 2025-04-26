'use client';
import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();

  const noNavPaths = ['/', '/auth/login', '/auth/signup'];

  const showNav = !noNavPaths.includes(pathname);

  return (
    <>
      <Header showNav={showNav} />
      <main className="min-h-[80vh] container mx-auto px-4">{children}</main>
      <Footer />
    </>
  );
}
