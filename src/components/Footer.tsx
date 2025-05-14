
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-restaurant-dark-gray text-gray-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h3 className="font-playfair text-2xl font-bold mb-4 text-white">Taberna do Gute</h3>
            <p className="mb-6 text-gray-300">
              Uma experiência única com o melhor da culinária alemã e brasileira em um ambiente acolhedor.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="bg-restaurant-forest-green p-2 rounded-full hover:bg-restaurant-medium-green transition-colors">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                </svg>
              </a>
              <a href="https://instagram.com" className="bg-restaurant-forest-green p-2 rounded-full hover:bg-restaurant-medium-green transition-colors">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465.668.25 1.272.644 1.772 1.153.509.5.902 1.104 1.153 1.772.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772c-.5.509-1.104.902-1.772 1.153-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-playfair text-xl font-bold mb-4 text-white">Informações</h4>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-restaurant-lime-green shrink-0 mt-0.5" />
                <span>Av. Joaquim Nogueira Lopes, 2998 - Horizonte, CE, 62880-000</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-restaurant-lime-green shrink-0" />
                <span>(85) 98181-5840</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-restaurant-lime-green shrink-0" />
                <span>schmidttaberna@hotmail.com</span>
              </li>
              <li className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-restaurant-lime-green shrink-0 mt-0.5" />
                <div>
                  <p>Terça - Domingo: 11:30 - 15:00</p>
                  <p>Segunda: Fechado</p>
                </div>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-playfair text-xl font-bold mb-4 text-white">Mapa</h4>
            <div className="h-[200px] bg-gray-200 rounded-lg overflow-hidden">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3980.258333886889!2d-38.4919233!3d-3.9907378!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7b8b43a0acb27f5%3A0x61f9392e4c043c28!2sAv.%20Joaquim%20Nogueira%20Lopes%2C%202998%20-%20Horizonte%2C%20CE%2C%2062880-000!5e0!3m2!1spt-BR!2sbr!4v1621362128974!5m2!1spt-BR!2sbr" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                loading="lazy"
                title="Localização da Taberna do Gute"
              ></iframe>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-restaurant-lime-green/30">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} Taberna do Gute. Todos os direitos reservados.
            </p>
            <div className="mt-4 sm:mt-0">
              <ul className="flex space-x-6 text-sm">
                <li>
                  <Link to="/" className="text-gray-400 hover:text-restaurant-lime-green transition-colors">
                    Política de Privacidade
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-gray-400 hover:text-restaurant-lime-green transition-colors">
                    Termos de Uso
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-gray-400 hover:text-restaurant-lime-green transition-colors">
                    Acessibilidade
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
