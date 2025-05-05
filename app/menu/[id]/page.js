'use client';

import { useEffect, useRef, useState } from 'react';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useParams } from 'next/navigation';

export default function VistaMenu() {
  const { id } = useParams();
  const [menu, setMenu] = useState(null);
  const [secciones, setSecciones] = useState([]);
  const [seccionActiva, setSeccionActiva] = useState('');
  const seccionRefs = useRef({});

  useEffect(() => {
    const fetchMenu = async () => {
      const docRef = doc(db, 'menus', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setMenu(data);

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

  if (!menu) {
    return <p className="text-center mt-20 text-gray-500">Cargando menú...</p>;
  }

  return (
    <main className="bg-gray-50 min-h-screen px-4 pb-20">
      {/* Barra sticky */}
      <nav className="sticky top-0 bg-white border-b border-gray-200 z-10 shadow-sm w-full">
        <div className="w-full px-4 py-3 flex gap-4 overflow-x-auto">
            {secciones.map((sec) => (
            <button
                key={sec}
                onClick={() => scrollToSection(sec)}
                className={`text-sm whitespace-nowrap transition ${
                seccionActiva === sec ? 'text-black font-semibold' : 'text-gray-400'
                }`}
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
                  <div
                    key={i}
                    className="bg-white rounded-xl shadow p-4 flex flex-col"
                  >
                    {p.imagen && (
                      <img
                        src={p.imagen}
                        alt={p.nombre}
                        className="mb-3 rounded object-cover h-40 w-full"
                      />
                    )}
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      {p.nombre}
                    </h3>
                    {p.descripcion && (
                      <p className="text-sm text-gray-600 mb-1">
                        {p.descripcion}
                      </p>
                    )}
                    {p.alergenos && (
                      <p className="text-sm text-gray-400 mb-1">
                        Alérgenos: {p.alergenos}
                      </p>
                    )}
                    <p className="text-lg font-bold text-gray-900 mt-auto">
                      {p.precio}
                    </p>
                  </div>
                ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
