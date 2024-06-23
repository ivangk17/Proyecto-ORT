import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-2">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full md:w-1/3 mb-1 md:mb-0">
            <h3 className="text-base font-bold">EduWave</h3>
            <p className="mt-1 text-xs text-gray-400">
              Conecta a estudiantes con profesores
            </p>
          </div>
          <div className="w-full md:w-1/3 mb-1 md:mb-0 text-center">
            <h3 className="text-sm font-bold">Contacto</h3>
            <p className="mt-1 text-xs text-gray-400">
              <a href="mailto:info@eduwave.com" className="hover:text-gray-300">
                info@eduwave.com
              </a>
            </p>
          </div>
          <div className="w-full md:w-1/3 text-center md:text-right">
            <h3 className="text-sm font-bold">Síguenos</h3>
            <div className="flex justify-center md:justify-end mt-1 space-x-2">
              <a href="https://www.facebook.com/eduwave"  target="_blank" className="hover:text-gray-300">
                <FaFacebook size={18} />
              </a>
              <a href="https://www.instagram.com/delfikraselnik/" target="_blank" className="hover:text-gray-300">
                <FaInstagram size={18} />
              </a>
              <a href="https://www.twitter.com/eduwave" target="_blank" className="hover:text-gray-300">
                <FaTwitter size={18} />
              </a>
              <a href="https://www.linkedin.com/eduwave" target="_blank" className="hover:text-gray-300">
                <FaLinkedin size={18} />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-2 border-t border-gray-700 pt-1 text-center">
          <p className="text-xxs text-gray-500">&copy; 2024 EduWave. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
