'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUsuario(user);
    });
    return () => unsubscribe();
  }, []);

  const cerrarSesion = async () => {
    await signOut(auth);
    setUsuario(null);
  };

  return (
    <header className="w-full border-b border-gray-200 bg-white sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-[#1E3A8A]">
          MenuGenerator
        </Link>

        {/* Botón hamburguesa (solo móvil) */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Enlaces (desktop) */}
        <div className="hidden md:flex gap-6 items-center">
          <Link href="/crear" className="text-gray-700 hover:text-black transition">Sube tu menú</Link>
          <Link href="/planes" className="text-gray-700 hover:text-black transition">Planes</Link>
          {usuario ? (
            <>
              <Link href="/mi-perfil" className="text-gray-700 hover:text-black transition">Mi perfil</Link>
              <button onClick={cerrarSesion} className="text-sm text-gray-500 hover:text-red-600 transition">Cerrar sesión</button>
            </>
          ) : (
            <Link href="/login" className="bg-[#1E3A8A] text-white px-4 py-2 rounded hover:bg-blue-800 transition">
              Sign in / Sign up
            </Link>
          )}
        </div>
      </nav>

      {/* Enlaces (mobile) */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-3">
          <Link href="/crear" className="text-gray-700 hover:text-black transition">Sube tu menú</Link>
          <Link href="/planes" className="text-gray-700 hover:text-black transition">Planes</Link>
          {usuario ? (
            <>
              <Link href="/mi-perfil" className="text-gray-700 hover:text-black transition">Mi perfil</Link>
              <button onClick={cerrarSesion} className="text-sm text-gray-500 hover:text-red-600 transition">Cerrar sesión</button>
            </>
          ) : (
            <Link href="/login" className="bg-[#1E3A8A] text-white px-4 py-2 rounded hover:bg-blue-800 transition">
              Sign in / Sign up
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
