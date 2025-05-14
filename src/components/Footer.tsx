
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-gute-dark-blue text-gray-200 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h3 className="font-cormorant text-2xl font-bold mb-6 text-white">Taberna do Gute</h3>
            <p className="mb-6 text-gray-300 leading-relaxed">
              Uma experiência única com o melhor da culinária alemã e brasileira em um ambiente acolhedor e sofisticado.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="bg-gute-royal-blue/20 p-3 rounded-full hover:bg-gute-royal-blue/30 transition-colors">
                <Facebook className="w-5 h-5 text-gute-light-yellow" />
              </a>
              <a href="https://instagram.com" className="bg-gute-royal-blue/20 p-3 rounded-full hover:bg-gute-royal-blue/30 transition-colors">
                <Instagram className="w-5 h-5 text-gute-light-yellow" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-cormorant text-xl font-bold mb-6 text-white">Informações</h4>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-gute-soft-pink shrink-0 mt-1" />
                <span className="leading-relaxed">Av. Joaquim Nogueira Lopes, 2998 - Horizonte, CE, 62880-000</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-gute-soft-pink shrink-0" />
                <span>(85) 98181-5840</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gute-soft-pink shrink-0" />
                <span>schmidttaberna@hotmail.com</span>
              </li>
              <li className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-gute-soft-pink shrink-0 mt-1" />
                <div>
                  <p>Terça - Domingo: 11:30 - 15:00</p>
                  <p>Segunda: Fechado</p>
                </div>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-cormorant text-xl font-bold mb-6 text-white">Mapa</h4>
            <div className="h-[200px] bg-gray-800 rounded-lg overflow-hidden shadow-lg border border-gute-royal-blue/20">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3980.258333886889!2d-38.4919233!3d-3.9907378!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7b8b43a0acb27f5%3A0x61f9392e4c043c28!2sAv.%20Joaquim%20Nogueira%20Lopes%2C%202998%20-%20Horizonte%2C%20CE%2C%2062880-000!5e0!3m2!1spt-BR!2sbr!4v1621362128974!5m2!1spt-BR!2sbr" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                loading="lazy"
                title="Localização da Taberna do Gute"
                className="grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              ></iframe>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gute-royal-blue/30">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} Taberna do Gute. Todos os direitos reservados.
            </p>
            <div className="mt-4 sm:mt-0">
              <ul className="flex flex-wrap justify-center sm:justify-end gap-x-6 gap-y-2 text-sm">
                <li>
                  <Link to="/" className="text-gray-400 hover:text-gute-light-yellow transition-colors hover-underline-animation">
                    Política de Privacidade
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-gray-400 hover:text-gute-light-yellow transition-colors hover-underline-animation">
                    Termos de Uso
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-gray-400 hover:text-gute-light-yellow transition-colors hover-underline-animation">
                    Acessibilidade
                  </Link>
                </li>
                <li>
                  <Link to="/admin/login" className="text-gray-400 hover:text-gute-light-yellow transition-colors hover-underline-animation opacity-70">
                    Login
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
