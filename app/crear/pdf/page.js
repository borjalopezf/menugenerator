'use client';

import PdfUploadServer from '@/components/PdfUploadServer';

export default function ImportarDesdeArchivo() {
  return (
    <main className="min-h-screen bg-white text-gray-900 px-6 py-16">
      <div className="max-w-3xl mx-auto text-center mb-10">
        <h1 className="text-3xl font-bold mb-4">Importar desde archivo</h1>
        <p className="text-gray-600 mb-6">
          Sube tu carta en PDF y genera tu menú automáticamente.
        </p>

        <PdfUploadServer />
      </div>
    </main>
  );
}
