'use client';

import { useEffect, useState } from 'react';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

export default function MiPerfil() {
  const [usuario, setUsuario] = useState(null);
  const [menus, setMenus] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUsuario(user);
        const q = query(collection(db, 'menus'), where('uid', '==', user.uid));
        const querySnapshot = await getDocs(q);
        const menues = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setMenus(menues);
      } else {
        router.push('/login');
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/login');
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'menus', id));
    setMenus(menus.filter(m => m.id !== id));
  };

  const formatDate = (timestamp) => {
    if (!timestamp?.toDate) return '';
    return timestamp.toDate().toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const enlacePagoStripe = 'https://buy.stripe.com/9B628rgTd8pp8YZdl78Ra00';
  const enlaceGestionStripe = 'https://billing.stripe.com/p/login/9B628rgTd8pp8YZdl78Ra00';

  return (
    <main className="min-h-screen px-6 py-12 bg-gray-50 text-gray-900">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Cuenta */}
        <div className="bg-white shadow p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-2">Tu cuenta</h2>
          <p className="mb-4 text-gray-700">Correo: {usuario?.email}</p>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Cerrar sesión
          </button>

          {/* Botones de suscripción */}
          <div className="mt-6 space-y-3">
            <a
              href={enlacePagoStripe}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center bg-[#1E3A8A] text-white px-4 py-2 rounded hover:bg-blue-800 transition"
            >
              Activar plan profesional
            </a>

            <a
              href={enlaceGestionStripe}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center border border-[#1E3A8A] text-[#1E3A8A] px-4 py-2 rounded hover:bg-gray-100 transition"
            >
              Gestionar suscripción
            </a>
          </div>
        </div>

        {/* Menús */}
        <div className="bg-white shadow p-6 rounded-lg">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Tus menús</h2>
            {menus.length === 0 && (
              <button
                onClick={() => router.push('/crear')}
                className="bg-[#1E3A8A] text-white px-4 py-2 rounded hover:bg-blue-800 transition"
              >
                Crear menú
              </button>
            )}
          </div>

          {menus.length === 0 ? (
            <p className="text-gray-500">Aún no has creado ningún menú.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {menus.map((menu) => (
                <div
                  key={menu.id}
                  className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-1 truncate">
                      {menu.nombre || `Menú ${menu.id.slice(0, 8)}`}
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Creado el {formatDate(menu.creadoEn)}
                    </p>
                  </div>
                  <div className="flex gap-4 mt-auto">
                    <button
                      onClick={() => router.push(`/menu/${menu.id}`)}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      Ver
                    </button>
                    <button
                      onClick={() => router.push(`/menu/${menu.id}/editar`)}
                      className="text-yellow-600 hover:underline text-sm"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(menu.id)}
                      className="text-red-600 hover:underline text-sm"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
