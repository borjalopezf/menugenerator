'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default function PlanesPage() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.plan === 'pro') {
        router.push('/mi-perfil'); // si ya está suscrito
      }
    });

    return () => unsubscribe();
  }, [router]);

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-16 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-xl w-full text-center">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-4">Elige tu plan y publica tu menú</h1>
        <p className="text-gray-600 mb-6">
          Publica tu carta digital con diseño profesional, accesible desde cualquier dispositivo.
        </p>

        <div className="border-t border-b py-6 mb-6">
          <h2 className="text-4xl font-extrabold text-[#1E3A8A] mb-2">15 €/mes</h2>
          <p className="text-gray-700 mb-4 font-medium">Plan Profesional</p>
          <ul className="text-left text-gray-700 mb-4 space-y-2">
            <li>✅ 1 carta digital publicada</li>
            <li>✅ Hosting y mantenimiento incluidos</li>
            <li>✅ Editor visual integrado</li>
            <li>✅ Imágenes, descripciones y alérgenos</li>
            <li>✅ Acceso desde cualquier dispositivo</li>
            <li>✅ Soporte por email</li>
          </ul>
        </div>

        <a
          href="https://buy.stripe.com/9B628rgTd8pp8YZdl78Ra00"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#1E3A8A] text-white px-6 py-3 rounded hover:bg-blue-800 transition text-lg w-full block text-center"
        >
          Suscribirse ahora
        </a>

        <p className="mt-6 text-sm text-gray-500">
          ¿Tienes varios locales o necesitas más cartas?{' '}
          <a href="mailto:hola@menugenerator.com" className="text-blue-600 hover:underline">
            Contáctanos
          </a>
        </p>
      </div>
    </main>
  );
}
