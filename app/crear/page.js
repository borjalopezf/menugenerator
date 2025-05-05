'use client';

import { useRouter } from 'next/navigation';

export default function CrearMenu() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-white text-gray-900 px-6 py-16">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-4">¿Cómo quieres crear tu menú?</h1>
        <p className="mb-10 text-gray-600">Elige una opción para empezar a crear tu carta digital.</p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Opción 1: crear desde cero */}
          <button
            onClick={() => router.push('/crear/manual')}
            className="border border-gray-300 rounded-lg p-6 hover:shadow-lg transition text-left text-gray-800"
          >
            <h2 className="text-xl font-semibold mb-2">📝 Crear desde cero</h2>
            <p>Escribe tu menú paso a paso, añadiendo secciones y platos manualmente.</p>
          </button>

          {/* Opción 2: importar desde archivo */}
          <button
            onClick={() => router.push('/crear/archivo')}
            className="border border-gray-300 rounded-lg p-6 hover:shadow-lg transition text-left text-gray-800"
          >
            <h2 className="text-xl font-semibold mb-2">📤 Importar desde archivo</h2>
            <p>Sube tu carta en PDF, Word o Excel y empecemos desde ahí.</p>
          </button>
        </div>
      </div>
    </main>
  );
}
