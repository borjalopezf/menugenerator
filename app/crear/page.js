'use client';

import { useRouter } from 'next/navigation';
import { getAuth } from 'firebase/auth';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function CrearMenu() {
  const router = useRouter();

  const crearMenuVacio = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      alert('Debes iniciar sesión para crear un menú.');
      return;
    }

    try {
      const docRef = await addDoc(collection(db, 'menus'), {
        uid: user.uid,
        creadoEn: Timestamp.now(),
        productos: [],
      });

      router.push(`/menu/${docRef.id}/editar`);
    } catch (error) {
      console.error('Error al crear menú vacío:', error);
      alert('Hubo un error al crear el menú.');
    }
  };

  return (
    <main className="min-h-screen bg-white text-gray-900 px-6 py-16">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-4">¿Cómo quieres crear tu menú?</h1>
        <p className="mb-10 text-gray-600">Elige una opción para empezar a crear tu carta digital.</p>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Opción 1: crear desde cero */}
          <button
            onClick={crearMenuVacio}
            className="border border-gray-300 rounded-lg p-6 hover:shadow-lg transition text-left text-gray-800"
          >
            <h2 className="text-xl font-semibold mb-2">📝 Crear desde cero</h2>
            <p>Escribe tu menú paso a paso, añadiendo secciones y platos manualmente.</p>
          </button>

          {/* Opción 2: importar desde PDF */}
          <button
            onClick={() => router.push('/crear/pdf')}
            className="border border-gray-300 rounded-lg p-6 hover:shadow-lg transition text-left text-gray-800"
          >
            <h2 className="text-xl font-semibold mb-2">📄 Importar desde PDF</h2>
            <p>Sube tu carta en PDF y generaremos tu menú automáticamente.</p>
          </button>

          {/* Opción 3: importar desde Excel */}
          <button
            onClick={() => router.push('/crear/excel')}
            className="border border-gray-300 rounded-lg p-6 hover:shadow-lg transition text-left text-gray-800"
          >
            <h2 className="text-xl font-semibold mb-2">📊 Importar desde Excel</h2>
            <p>Sube un archivo Excel estructurado y convierte los datos en un menú editable.</p>
          </button>
        </div>
      </div>
    </main>
  );
}
