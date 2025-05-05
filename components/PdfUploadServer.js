'use client';

import { useState } from 'react';
import { parseMenu } from '../utils/parseMenu';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { getAuth } from 'firebase/auth';

export default function PdfUploadServer() {
  const [productos, setProductos] = useState([]);
  const [textoCrudo, setTextoCrudo] = useState('');
  const [cargando, setCargando] = useState(false);
  const router = useRouter();

  const guardarMenu = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
  
    if (!user) {
      alert('Debes iniciar sesión para guardar un menú.');
      return;
    }
  
    try {
      const docRef = await addDoc(collection(db, 'menus'), {
        productos,
        creadoEn: Timestamp.now(),
        uid: user.uid, // asocia el menú con el usuario
      });
  
      console.log('Menú guardado con ID:', docRef.id);
      router.push(`/menu/${docRef.id}`);
    } catch (error) {
      console.error('Error al guardar menú:', error);
      alert('Hubo un error al guardar el menú.');
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setCargando(true);
    setTextoCrudo('');
    setProductos([]);

    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/extraer-pdf', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    setCargando(false);

    if (res.ok) {
      const productosParseados = parseMenu(data.text);
      setTextoCrudo(data.text);
      setProductos(productosParseados);
    } else {
      alert('Error procesando el PDF');
    }
  };

  const actualizarCampo = (index, campo, valor) => {
    const copia = [...productos];
    copia[index][campo] = valor;
    setProductos(copia);
  };

  const eliminarProducto = (index) => {
    const copia = productos.filter((_, i) => i !== index);
    setProductos(copia);
  };

  const añadirProducto = () => {
    setProductos([
      ...productos,
      { nombre: '', descripcion: '', precio: '', seccion: '' },
    ]);
  };

  const subirImagen = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const copia = [...productos];
      copia[index].imagen = reader.result;
      setProductos(copia);
    };
    reader.readAsDataURL(file);
  };

  const eliminarImagen = (index) => {
    const copia = [...productos];
    copia[index].imagen = '';
    setProductos(copia);
  };

  return (
    <div className="text-center">
      <label
        htmlFor="file-upload"
        className="inline-block cursor-pointer bg-[#1E3A8A] text-white px-5 py-3 rounded hover:bg-blue-800 transition mb-6"
      >
        Sube tu carta en PDF
      </label>
      <input
        id="file-upload"
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        className="hidden"
      />

      {cargando && <p className="text-gray-500 mt-4">Procesando PDF...</p>}

      {productos.length > 0 && (
        <>
          <h2 className="text-xl font-semibold mt-8 mb-4">Revisa y edita tu menú</h2>

          <div className="space-y-6">
            {productos.map((p, i) => (
              <div
                key={i}
                className="rounded-xl border border-gray-200 bg-white p-6 shadow-md text-left mb-8"
              >
                <h3 className="text-lg font-semibold mb-4">Producto {i + 1}</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Nombre</label>
                    <input
                      type="text"
                      value={p.nombre}
                      onChange={(e) => actualizarCampo(i, 'nombre', e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Precio</label>
                    <input
                      type="text"
                      value={p.precio}
                      onChange={(e) => actualizarCampo(i, 'precio', e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block mb-1 text-sm font-medium text-gray-700">Descripción</label>
                    <textarea
                      value={p.descripcion}
                      onChange={(e) => actualizarCampo(i, 'descripcion', e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 resize-none"
                      rows={3}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block mb-1 text-sm font-medium text-gray-700">Sección</label>
                    <input
                      type="text"
                      value={p.seccion}
                      onChange={(e) => actualizarCampo(i, 'seccion', e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block mb-1 text-sm font-medium text-gray-700">Imagen del plato</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => subirImagen(e, i)}
                      className="block w-full text-sm text-gray-700
                        file:mr-4 file:py-2 file:px-4
                        file:rounded file:border-0
                        file:bg-gray-100 file:text-gray-700
                        hover:file:bg-gray-200"
                    />
                    {p.imagen && (
                      <div className="relative mt-3 w-40">
                        <img
                          src={p.imagen}
                          alt={p.nombre}
                          className="rounded shadow border w-full h-auto object-cover"
                        />
                        <button
                          onClick={() => eliminarImagen(i)}
                          className="absolute top-1 right-1 bg-white border border-gray-300 rounded-full p-1 hover:bg-red-100 transition"
                          title="Eliminar imagen"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => eliminarProducto(i)}
                  className="mt-6 text-sm text-red-600 border border-red-200 px-3 py-1 rounded hover:bg-red-50 transition inline-flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-1 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>
                  Eliminar producto
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={añadirProducto}
            className="mt-6 inline-block bg-[#1E3A8A] text-white px-4 py-2 rounded hover:bg-blue-800 transition"
          >
            Añadir producto manualmente
          </button>

          <button
            onClick={guardarMenu}
            className="mt-10 ml-4 inline-block bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition"
          >
            Guardar y generar menú
          </button>
        </>
      )}

      {textoCrudo && productos.length === 0 && (
        <div className="mt-6 p-4 bg-red-100 rounded text-left text-red-700">
          <p>No se pudo interpretar el menú correctamente.</p>
        </div>
      )}
    </div>
  );
}