'use client';

import { useState } from 'react';
import { getAuth } from 'firebase/auth';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import ExcelUpload from '@/components/ExcelUpload';
import { toast } from 'react-hot-toast';

export default function CrearDesdeExcel() {
  const router = useRouter();
  const [subiendo, setSubiendo] = useState(false);

  const handleParse = async (productos) => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      toast.error('Debes iniciar sesión para crear un menú.');
      return;
    }

    setSubiendo(true);

    try {
      const docRef = await addDoc(collection(db, 'menus'), {
        uid: user.uid,
        creadoEn: Timestamp.now(),
        productos,
      });

      toast.success('Menú creado correctamente');
      router.push(`/menu/${docRef.id}/editar`);
    } catch (error) {
      console.error('Error al guardar menú desde Excel:', error);
      toast.error('Hubo un error al guardar el menú.');
    } finally {
      setSubiendo(false);
    }
  };

  return (
    <main className="min-h-screen bg-white text-gray-900 px-6 py-16">
      <div className="max-w-3xl mx-auto text-center mb-10">
        <h1 className="text-3xl font-bold mb-4">Importar desde Excel</h1>
        <p className="text-gray-600 mb-6">
          Sube tu carta en formato Excel (.xlsx) y genera tu menú automáticamente.
        </p>

        <div className="text-left">
          <ExcelUpload onParse={handleParse} />
          {subiendo && <p className="text-sm text-gray-500 mt-4">Creando menú...</p>}
        </div>
      </div>
    </main>
  );
}
