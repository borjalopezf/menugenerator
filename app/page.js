export default function Home() {
  return (
    <>
      <main className="bg-white text-gray-900">
        <section className="bg-white">
          <div className="grid max-w-screen-xl px-4 py-12 mx-auto lg:gap-8 xl:gap-0 lg:py-24 lg:grid-cols-12 items-center">
            
            {/* Texto */}
            <div className="mr-auto place-self-center lg:col-span-7">
              <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-black">
                Tu menú digital, sin complicaciones
              </h1>
              <p className="max-w-2xl mb-6 font-light text-gray-700 lg:mb-8 md:text-lg lg:text-xl">
                Sube tu carta en segundos, personalízala y comparte un QR con tus clientes — sin crear una web.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#"
                  className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-white bg-[#1E3A8A] rounded-lg hover:bg-blue-800 transition"
                >
                  Crea tu menu
                  <svg
                    className="w-5 h-5 ml-2 -mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 
                      1.414l-6 6a1 1 0 01-1.414-1.414L14.586 
                      11H3a1 1 0 110-2h11.586l-4.293-4.293a1 
                      1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>

                <a
                  href="#"
                  className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-[#1E3A8A] border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                >
                  Ver precios
                </a>
              </div>
            </div>

            {/* Imagen */}
            <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
              <img
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png"
                alt="mockup"
                className="w-full h-auto"
              />
            </div>
          </div>
        </section>
        <section className="py-20 px-6 bg-gray-50 text-center">
           <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-semibold mb-12">¿Por qué usar MenuGenerator?</h2>

               <div className="grid md:grid-cols-3 gap-8">
              {/* Beneficio 1 */}
                <div className="flex flex-col items-center">
                  <svg className="w-12 h-12 mb-4 text-[#1E3A8A]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 16l-4-4 4-4m8 8l4-4-4-4M12 12h.01" />
                  </svg>
                 <h3 className="text-xl font-semibold mb-2">Rápido y sencillo</h3>
                 <p className="text-gray-600">Sube tu menú en segundos, sin necesidad de conocimientos técnicos.</p>
                </div>

              {/* Beneficio 2 */}
              <div className="flex flex-col items-center">
                <svg className="w-12 h-12 mb-4 text-[#1E3A8A]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                <h3 className="text-xl font-semibold mb-2">Diseño personalizable</h3>
                <p className="text-gray-600">Añade tu logo, colores y estilo para que el menú represente tu marca.</p>
              </div>

              {/* Beneficio 3 */}
              <div className="flex flex-col items-center">
                <svg className="w-12 h-12 mb-4 text-[#1E3A8A]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h2l1 2h13l1-2h2m-6 6a2 2 0 01-4 0" />
                </svg>
                <h3 className="text-xl font-semibold mb-2">Menú digital y QR</h3>
                <p className="text-gray-600">Comparte tu menú con un QR moderno, sin imprimir ni mantener una web.</p>
              </div>
            </div>
          </div>
        </section>
        <section className="py-20 px-6 bg-white text-center">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-semibold mb-12">¿Cómo funciona?</h2>

          <div className="grid md:grid-cols-3 gap-10">
            {/* Paso 1 */}
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[#1E3A8A] text-white text-xl font-bold mb-4">
                1
              </div>
              <h3 className="text-lg font-semibold mb-2">Sube tu menú</h3>
              <p className="text-gray-600">Carga un PDF, Word o Excel con tu carta actual en segundos.</p>
            </div>

            {/* Paso 2 */}
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[#1E3A8A] text-white text-xl font-bold mb-4">
                2
              </div>
              <h3 className="text-lg font-semibold mb-2">Personaliza diseño</h3>
              <p className="text-gray-600">Elige colores, tipografía, añade tu logo y adapta tu estilo.</p>
            </div>

            {/* Paso 3 */}
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[#1E3A8A] text-white text-xl font-bold mb-4">
                3
              </div>
              <h3 className="text-lg font-semibold mb-2">Comparte con QR</h3>
              <p className="text-gray-600">Tu menú se aloja online y puedes compartirlo con un simple QR.</p>
            </div>
          </div>
        </div>
      </section>
      </main>
      <footer className="bg-gray-100 py-8 text-center text-sm text-gray-600">
        <div className="max-w-6xl mx-auto px-4">
          <p className="mb-2 font-medium text-[#1E3A8A]">MenuGenerator</p>
          <div className="flex justify-center gap-4 mb-2">
            <a href="#" className="hover:underline">Contacto</a>
            <a href="#" className="hover:underline">Política de privacidad</a>
            <a href="#" className="hover:underline">Términos y condiciones</a>
          </div>
          <p>© {new Date().getFullYear()} MenuGenerator. Todos los derechos reservados.</p>
        </div>
      </footer>

    </>
  );
}
