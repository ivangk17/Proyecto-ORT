import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full md:w-1/3 mb-4 md:mb-0">
            <h3 className="text-2xl font-bold">EduWave</h3>
            <p className="mt-2 text-gray-400">
              Conecta a estudiantes con profesores
            </p>
          </div>
          <div className="w-full md:w-1/3 mb-4 md:mb-0 text-center">
            <h3 className="text-xl font-bold">Contacto</h3>
            <p className="mt-2 text-gray-400">
              <a href="mailto:info@eduwave.com" className="hover:text-gray-300">
                info@eduwave.com
              </a>
            </p>
          </div>
          <div className="w-full md:w-1/3 text-center md:text-right">
            <h3 className="text-xl font-bold">Síguenos</h3>
            <div className="flex justify-center md:justify-end mt-2 space-x-4">
              <a href="https://www.facebook.com/eduwave" className="hover:text-gray-300">
                <FaFacebook size={24} />
              </a>
              <a href="https://www.instagram.com/eduwave" className="hover:text-gray-300">
                <FaInstagram size={24} />
              </a>
              <a href="https://www.twitter.com/eduwave" className="hover:text-gray-300">
                <FaTwitter size={24} />
              </a>
              <a href="https://www.linkedin.com/eduwave" className="hover:text-gray-300">
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-4 text-center">
          <p className="text-gray-500">&copy; 2024 EduWave. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
