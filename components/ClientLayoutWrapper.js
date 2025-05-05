'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';

export default function ClientLayoutWrapper({ children }) {
  const pathname = usePathname();
  const mostrarNavbar = !pathname.startsWith('/menu/');

  return (
    <>
      {mostrarNavbar && <Navbar />}
      {children}
    </>
  );
}
