'use client';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <main className="bg-white text-gray-900">
      {/* HERO */}
      <motion.section
        className="bg-white"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="grid max-w-screen-xl px-4 py-24 mx-auto lg:grid-cols-12 items-center gap-12">
          <div className="lg:col-span-6">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight mb-6">
              Publica tu carta digital <span className="text-[#1E3A8A]">en Google Maps</span>
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              Crea una URL visual y editable para tu menú, sin necesidad de tener web. Muestra tus platos como en Glovo o Uber Eats, y colócala en el botón “Ver carta” de tu ficha de Google.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="/crear" className="px-6 py-3 text-base font-medium text-white bg-[#1E3A8A] rounded-lg hover:bg-blue-800 transition text-center">
                Crea tu menú gratis
              </a>
              <a href="#como-funciona" className="px-6 py-3 text-base font-medium text-[#1E3A8A] border border-gray-300 rounded-lg hover:bg-gray-100 transition text-center">
                Ver cómo funciona
              </a>
            </div>
          </div>
          <div className="lg:col-span-6 flex justify-center">
            <img
              src="/herobannermockup.png"
              alt="Mockup del menú digital"
              className="w-[300px] md:w-[380px] drop-shadow-xl"
            />
          </div>
        </div>
      </motion.section>

      {/* CONFIDENCE */}
      <motion.section
        className="py-12 bg-gray-50 text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <div className="max-w-5xl mx-auto px-4">
          <p className="text-gray-500 uppercase tracking-wide text-sm font-semibold mb-4">Ya confían en nosotros</p>
          <div className="flex flex-wrap justify-center items-center gap-6">
            <span className="text-gray-400">[Logo restaurante 1]</span>
            <span className="text-gray-400">[Logo restaurante 2]</span>
            <span className="text-gray-400">[Logo restaurante 3]</span>
          </div>
        </div>
      </motion.section>

      {/* BENEFICIOS */}
      <motion.section
        className="py-20 px-6 bg-white text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true }}
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-semibold mb-12">¿Por qué usar MenuGenerator?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <h3 className="text-xl font-semibold mb-2">Tu carta en Google Maps</h3>
              <p className="text-gray-600">Publica tu menú con una URL editable y colócala en el botón “Ver carta” de tu ficha de Google.</p>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-xl font-semibold mb-2">Diseño tipo Glovo/Uber Eats</h3>
              <p className="text-gray-600">Tus clientes verán tus platos con fotos, precios y secciones claras.</p>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-xl font-semibold mb-2">Sin web, sin complicaciones</h3>
              <p className="text-gray-600">Crea, edita y publica sin necesidad de conocimientos técnicos ni dominio propio.</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* CÓMO FUNCIONA - rediseñado */}
      <motion.section
        id="como-funciona"
        className="py-24 px-6 bg-gray-50"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">¿Cómo funciona?</h2>
            <ul className="space-y-6 text-gray-700 text-lg">
              <li className="flex items-start">
                <span className="w-3 h-3 mt-2 mr-3 bg-[#1E3A8A] rounded-full"></span>
                <span><strong>Regístrate</strong> gratis en segundos con tu email.</span>
              </li>
              <li className="flex items-start">
                <span className="w-3 h-3 mt-2 mr-3 bg-[#1E3A8A] rounded-full"></span>
                <span><strong>Sube tu carta</strong> en PDF o Excel, o créala desde cero.</span>
              </li>
              <li className="flex items-start">
                <span className="w-3 h-3 mt-2 mr-3 bg-[#1E3A8A] rounded-full"></span>
                <span><strong>Edita y personaliza</strong> cada plato, sección, precio o foto.</span>
              </li>
              <li className="flex items-start">
                <span className="w-3 h-3 mt-2 mr-3 bg-[#1E3A8A] rounded-full"></span>
                <span><strong>Publica y comparte</strong> tu URL en Google Maps o QR.</span>
              </li>
            </ul>
          </div>
          <div className="flex justify-center">
            <img
              src="/mockups/menu-flow-demo.gif"
              alt="Demo animada del flujo de creación"
              className="w-full max-w-md rounded-xl shadow-xl"
            />
          </div>
        </div>
      </motion.section>

      {/* CAPTURA DEMO */}
      <motion.section
        className="py-20 px-6 bg-white text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-semibold mb-12">Así se ve tu menú</h2>
          <div className="flex justify-center">
            <img src="/mockups/menu-laptop.png" alt="Mockup del menú en portátil" className="rounded-xl shadow-xl w-full max-w-3xl" />
          </div>
        </div>
      </motion.section>

      {/* CTA FINAL */}
      <motion.section
        className="py-20 px-6 bg-[#1E3A8A] text-white text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true }}
      >
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-semibold mb-6">¿Listo para digitalizar tu menú?</h2>
          <p className="text-lg mb-8">Empieza gratis y consigue una carta profesional en minutos.</p>
          <a href="/crear" className="inline-block px-8 py-4 text-base font-medium bg-white text-[#1E3A8A] rounded-lg hover:bg-gray-100 transition">
            Crear mi menú ahora
          </a>
        </div>
      </motion.section>

      {/* FOOTER */}
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
    </main>
  );
}