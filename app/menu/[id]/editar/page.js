'use client';

import { useEffect, useRef, useState } from 'react';
import { db, auth } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { useParams, useRouter } from 'next/navigation';

export default function VistaMenuEditable() {
  const { id } = useParams();
  const router = useRouter();
  const [menu, setMenu] = useState(null);
  const [secciones, setSecciones] = useState([]);
  const [usuario, setUsuario] = useState(null);
  const [modalIndex, setModalIndex] = useState(null); // producto en edición
  const [productosEditados, setProductosEditados] = useState([]);

  const seccionRefs = useRef({});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) return router.push('/login');
      setUsuario(user);

      const docRef = doc(db, 'menus', id);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) return router.push('/404');

      const data = docSnap.data();
      if (data.uid !== user.uid) return router.push('/');

      setMenu(data);
      setProductosEditados(data.productos);

      const nombresSecciones = [...new Set(data.productos.map((p) => p.seccion || 'Sin sección'))];
      setSecciones(nombresSecciones);
    });

    return () => unsubscribe();
  }, [id, router]);

  const handleChange = (index, field, value) => {
    const copia = [...productosEditados];
    copia[index][field] = value;
    setProductosEditados(copia);
  };

  const handleImagen = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => handleChange(index, 'imagen', reader.result);
    reader.readAsDataURL(file);
  };

  if (!menu || !usuario) {
    return <p className="text-center mt-20 text-gray-500">Cargando menú...</p>;
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Editar menú</h1>
          <div className="space-x-4">
            <button
              onClick={() => alert('Cambios guardados en estado local. (Aquí irá la subida a Firestore)')}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
              Guardar cambios
            </button>
            <button
              onClick={() => router.push('/mi-perfil')}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
            >
              Volver a perfil
            </button>
          </div>
        </div>

        {secciones.map((sec) => (
          <section key={sec} className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-700">{sec}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {productosEditados
                .map((p, i) => ({ ...p, index: i }))
                .filter((p) => (p.seccion || 'Sin sección') === sec)
                .map((p) => (
                  <div key={p.index} className="relative group bg-white rounded-xl shadow p-4 flex flex-col">
                    {p.imagen && (
                      <img
                        src={p.imagen}
                        alt={p.nombre}
                        className="mb-3 rounded object-cover h-40 w-full"
                      />
                    )}
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{p.nombre}</h3>
                    <p className="text-sm text-gray-600 mb-1">{p.descripcion}</p>
                    <p className="text-sm text-gray-400 mb-1">Alérgenos: {p.alergenos}</p>
                    <p className="text-sm text-gray-400 mb-1">Etiqueta: {p.etiqueta}</p>
                    <p className="text-lg font-bold text-gray-900 mt-auto">{p.precio}</p>

                    {/* Botón de edición centrado en hover */}
                    <div className="absolute inset-0 bg-white/60 hidden group-hover:flex items-center justify-center rounded-xl transition">
                      <button
                        onClick={() => setModalIndex(p.index)}
                        className="text-sm text-[#1E3A8A] bg-white border border-gray-300 px-4 py-2 rounded shadow hover:bg-gray-100 transition"
                      >
                        Editar
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </section>
        ))}
      </div>

      {/* Modal */}
      {modalIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg max-w-xl w-full p-6">
            <h2 className="text-xl font-bold mb-4">Editar producto</h2>
            <div className="space-y-4">
              {['nombre', 'descripcion', 'seccion', 'precio', 'alergenos', 'etiqueta'].map((campo) => (
                <div key={campo}>
                  <label className="block text-sm font-medium text-gray-700 capitalize">{campo}</label>
                  <input
                    type="text"
                    value={productosEditados[modalIndex][campo] || ''}
                    onChange={(e) => handleChange(modalIndex, campo, e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>
              ))}

              <div>
                <label className="block text-sm font-medium text-gray-700">Imagen</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImagen(e, modalIndex)}
                />
                {productosEditados[modalIndex].imagen && (
                  <img
                    src={productosEditados[modalIndex].imagen}
                    alt="preview"
                    className="mt-2 rounded shadow max-h-32"
                  />
                )}
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={() => setModalIndex(null)}
                className="text-gray-700 px-4 py-2 rounded hover:bg-gray-100"
              >
                Cancelar
              </button>
              <button
                onClick={() => setModalIndex(null)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
