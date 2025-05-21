'use client';

import { useEffect, useRef, useState } from 'react';
import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';

export default function VistaMenu() {
  const { id } = useParams();
  const [menu, setMenu] = useState(null);
  const [secciones, setSecciones] = useState([]);
  const [seccionActiva, setSeccionActiva] = useState('');
  const [nombreMenu, setNombreMenu] = useState('');
  const [editandoNombre, setEditandoNombre] = useState(false);
  const seccionRefs = useRef({});

  const getImagenUrl = (menuId, imagen) => {
    if (!imagen) return '';
    if (imagen.startsWith('http')) return imagen;
    return `/imagenes/${menuId}/${imagen}`;
  };

  useEffect(() => {
    const fetchMenu = async () => {
      const docRef = doc(db, 'menus', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setMenu(data);
        setNombreMenu(data.nombre || '');

        const nombresSecciones = [
          ...new Set(data.productos.map((p) => p.seccion || 'Sin sección')),
        ];
        setSecciones(nombresSecciones);
      }
    };
    fetchMenu();
  }, [id]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      let activa = '';
      secciones.forEach((sec) => {
        const el = seccionRefs.current[sec];
        if (el && el.offsetTop - 100 <= scrollY) {
          activa = sec;
        }
      });
      if (activa) setSeccionActiva(activa);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [secciones]);

  const scrollToSection = (sec) => {
    const el = seccionRefs.current[sec];
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 80,
        behavior: 'smooth',
      });
    }
  };

  const guardarNombreMenu = async () => {
    if (!nombreMenu.trim()) return;
    await updateDoc(doc(db, 'menus', id), { nombre: nombreMenu.trim() });
    setEditandoNombre(false);
  };

  if (!menu) {
    return <p className="text-center mt-20 text-gray-500">Cargando menú...</p>;
  }

  return (
    <main className="bg-gray-50 min-h-screen px-4 pb-20">
      <div className="max-w-5xl mx-auto py-6">
        {editandoNombre ? (
          <div className="flex items-center gap-2 mb-6">
            <input
              value={nombreMenu}
              onChange={(e) => setNombreMenu(e.target.value)}
              className="text-2xl font-bold px-3 py-1 border rounded w-full"
              placeholder="Nombre del menú"
            />
            <button
              onClick={guardarNombreMenu}
              className="px-4 py-2 bg-[#1E3A8A] text-white rounded hover:bg-blue-800 transition"
            >
              Guardar
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              {nombreMenu || 'Menú sin nombre'}
            </h1>
            <button
              onClick={() => setEditandoNombre(true)}
              className="text-sm text-blue-600 hover:underline"
            >
              Cambiar nombre
            </button>
          </div>
        )}
      </div>

      {/* Barra sticky */}
      <nav className="sticky top-0 bg-white border-b border-gray-200 z-10 shadow-sm w-full">
        <div className="w-full px-4 py-3 flex gap-4 overflow-x-auto scrollbar-hide">
          {secciones.map((sec) => (
            <button
              key={sec}
              onClick={() => scrollToSection(sec)}
              className={`text-sm whitespace-nowrap transition-all duration-300 ease-in-out px-2 py-1 rounded-md
                ${seccionActiva === sec
                  ? 'text-[#1E3A8A] font-semibold bg-blue-50'
                  : 'text-gray-400 hover:text-gray-600'}
              `}
            >
              {sec}
            </button>
          ))}
        </div>
      </nav>

      {/* Secciones */}
      <div className="max-w-5xl mx-auto mt-10 space-y-16">
        {secciones.map((sec) => (
          <section
            key={sec}
            ref={(el) => (seccionRefs.current[sec] = el)}
            id={sec}
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-800">{sec}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {menu.productos
                .filter((p) => (p.seccion || 'Sin sección') === sec)
                .map((p, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="bg-white rounded-xl shadow p-4 flex flex-col"
                  >
                    {p.imagen && (
                      <img
                        src={getImagenUrl(id, p.imagen)}
                        alt={p.nombre}
                        className="mb-3 rounded object-cover h-40 w-full"
                      />
                    )}
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{p.nombre}</h3>
                    {p.descripcion && (
                      <p className="text-sm text-gray-600 mb-1">{p.descripcion}</p>
                    )}
                    {p.alergenos && (
                      <p className="text-sm text-gray-400 mb-1">Alérgenos: {p.alergenos}</p>
                    )}
                    <p className="text-lg font-bold text-gray-900 mt-auto">{p.precio}</p>
                  </motion.div>
                ))}
            </div>
          </section>
        ))}
      </div>

      <footer className="bg-[#1E3A8A] text-white text-sm text-center py-4 mt-16">
        <link href="/" className="hover:underline">
          Hecho con MenuGenerator
        </link>
      </footer>
    </main>
  );
}
