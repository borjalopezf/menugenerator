'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

export default function LoginPage() {
  const router = useRouter();
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleAuth = async () => {
    setError('');
    try {
      if (isRegistering) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      router.push('/mi-perfil');
    } catch (err) {
      setError(err.message || 'Error en autenticación');
    }
  };

  return (
    <main className="min-h-screen bg-white text-gray-900 flex items-center justify-center px-6">
      <div className="max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4 text-center">
          {isRegistering ? 'Crear cuenta' : 'Iniciar sesión'}
        </h1>

        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-3 px-4 py-2 border border-gray-300 rounded"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-3 px-4 py-2 border border-gray-300 rounded"
        />

        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        <button
          onClick={handleAuth}
          className="w-full bg-[#1E3A8A] text-white py-2 rounded hover:bg-blue-800 transition"
        >
          {isRegistering ? 'Registrarse' : 'Entrar'}
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          {isRegistering ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?'}{' '}
          <button
            onClick={() => setIsRegistering(!isRegistering)}
            className="text-blue-600 underline"
          >
            {isRegistering ? 'Inicia sesión' : 'Regístrate aquí'}
          </button>
        </p>
      </div>
    </main>
  );
}
