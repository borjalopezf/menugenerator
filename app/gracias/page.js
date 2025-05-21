'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function GraciasPage() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.prefetch('/mi-perfil');
    }, 1000);
    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-20 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow max-w-xl w-full text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">¡Gracias por suscribirte!</h1>
        <p className="text-gray-700 mb-6">
          Tu suscripción ha sido registrada correctamente. Puedes empezar a usar todas las funcionalidades de MenuGenerator ahora mismo.
        </p>

        <button
          onClick={() => router.push('/mi-perfil')}
          className="bg-[#1E3A8A] text-white px-6 py-3 rounded hover:bg-blue-800 transition text-lg w-full"
        >
          Ir a mi perfil
        </button>

        <p className="mt-6 text-sm text-gray-500">
          ¿Tienes alguna duda o problema?{' '}
          <a href="mailto:hola@menugenerator.com" className="text-blue-600 hover:underline">
            Escríbenos
          </a>
        </p>
      </div>
    </main>
  );
}
