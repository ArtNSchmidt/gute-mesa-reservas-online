
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { authState, logout } = useAuth();
  const isAdmin = authState.isAuthenticated;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-restaurant-dark-teal text-white py-4 sticky top-0 z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link to="/" className="flex items-center space-x-2">
          <span className="font-playfair font-bold text-2xl">Taberna do Gute</span>
        </Link>
        
        {/* Mobile menu button */}
        <button onClick={toggleMenu} className="lg:hidden text-white">
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        {/* Desktop menu */}
        <div className="hidden lg:flex items-center space-x-8">
          <a href="#about" className="hover:text-restaurant-light-green transition-colors">Sobre</a>
          <a href="#menu" className="hover:text-restaurant-light-green transition-colors">Cardápio</a>
          <a href="#gallery" className="hover:text-restaurant-light-green transition-colors">Galeria</a>
          <a href="#contact" className="hover:text-restaurant-light-green transition-colors">Contato</a>
          <a href="#reservation" className="bg-restaurant-medium-green hover:bg-restaurant-light-green text-restaurant-dark-gray font-medium px-5 py-2 rounded-md transition-colors">Reservar</a>
          
          {isAdmin && (
            <>
              <Link to="/admin/dashboard" className="hover:text-restaurant-light-green transition-colors">
                Painel Admin
              </Link>
              <Button 
                variant="ghost" 
                onClick={logout}
                className="hover:text-restaurant-light-green transition-colors"
              >
                Sair
              </Button>
            </>
          )}
          
          {!isAdmin && (
            <Link to="/admin/login" className="hover:text-restaurant-light-green transition-colors">
              Admin
            </Link>
          )}
        </div>
      </div>
      
      {/* Mobile menu dropdown */}
      {isMenuOpen && (
        <div className="lg:hidden bg-restaurant-dark-teal border-t border-restaurant-medium-green animate-fade-in">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-3">
            <a href="#about" className="py-2 hover:text-restaurant-light-green transition-colors" onClick={toggleMenu}>Sobre</a>
            <a href="#menu" className="py-2 hover:text-restaurant-light-green transition-colors" onClick={toggleMenu}>Cardápio</a>
            <a href="#gallery" className="py-2 hover:text-restaurant-light-green transition-colors" onClick={toggleMenu}>Galeria</a>
            <a href="#contact" className="py-2 hover:text-restaurant-light-green transition-colors" onClick={toggleMenu}>Contato</a>
            <a href="#reservation" className="py-2 bg-restaurant-medium-green text-center hover:bg-restaurant-light-green text-restaurant-dark-gray font-medium px-5 py-2 rounded-md transition-colors" onClick={toggleMenu}>Reservar</a>
            
            {isAdmin && (
              <>
                <Link to="/admin/dashboard" className="py-2 hover:text-restaurant-light-green transition-colors" onClick={toggleMenu}>
                  Painel Admin
                </Link>
                <Button 
                  variant="ghost" 
                  onClick={() => { logout(); toggleMenu(); }}
                  className="py-2 justify-start p-0 hover:text-restaurant-light-green transition-colors"
                >
                  Sair
                </Button>
              </>
            )}
            
            {!isAdmin && (
              <Link to="/admin/login" className="py-2 hover:text-restaurant-light-green transition-colors" onClick={toggleMenu}>
                Admin
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
