'use client';

import { useState } from 'react';
import ExcelJS from 'exceljs';
import { useRouter } from 'next/navigation';
import { getAuth } from 'firebase/auth';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function CrearDesdeExcel() {
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const workbook = new ExcelJS.Workbook();
      const arrayBuffer = await file.arrayBuffer();
      await workbook.xlsx.load(arrayBuffer);

      const worksheet = workbook.worksheets[0];
      const productos = [];

      worksheet.eachRow((row, rowNumber) => {
        if (rowNumber === 1) return;

        const [
          nombre,
          descripcion,
          precio,
          seccion,
          alergenos,
          etiqueta,
        ] = row.values.slice(1);

        productos.push({
          nombre: nombre?.toString() || '',
          descripcion: descripcion?.toString() || '',
          precio: precio?.toString() || '',
          seccion: seccion?.toString() || '',
          alergenos: alergenos?.toString() || '',
          etiqueta: etiqueta?.toString() || '',
          imagen: '',
        });
      });

      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        alert('Debes iniciar sesión para crear un menú.');
        return;
      }

      const docRef = await addDoc(collection(db, 'menus'), {
        uid: user.uid,
        creadoEn: Timestamp.now(),
        productos,
      });

      router.push(`/menu/${docRef.id}/editar`);
    } catch (err) {
      console.error('Error procesando archivo Excel:', err);
      setError('No se pudo leer el archivo Excel.');
    }
  };

  return (
    <main className="min-h-screen bg-white text-gray-900 px-6 py-16">
      <div className="max-w-3xl mx-auto text-center mb-10">
        <h1 className="text-3xl font-bold mb-4">Importar desde Excel</h1>
        <p className="text-gray-600 mb-4">
          Sube tu carta en formato Excel (.xlsx) con esta estructura:
        </p>

        <a
          href="/plantilla_menu.xlsx"
          download
          className="inline-block mb-6 bg-[#1E3A8A] text-white px-4 py-2 rounded hover:bg-blue-800 transition"
        >
          Descargar plantilla de ejemplo
        </a>

        <div className="text-left">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Subir archivo Excel
          </label>
          <input
            type="file"
            accept=".xlsx"
            onChange={handleFile}
            className="border border-gray-300 rounded px-4 py-2"
          />
          {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
        </div>
      </div>
    </main>
  );
}
    