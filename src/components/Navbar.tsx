
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Menu, X, User, LogIn } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { authState, logout } = useAuth();
  const isAdmin = authState.isAuthenticated;
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Detecta quando a página é rolada para adicionar sombra
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`bg-restaurant-dark-wine text-white py-4 sticky top-0 z-50 transition-all ${isScrolled ? 'shadow-lg' : ''}`}>
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link to="/" className="flex items-center space-x-2">
          <span className="font-playfair font-bold text-2xl text-restaurant-lime-green">Taberna do Gute</span>
        </Link>
        
        {/* Mobile menu button */}
        <button 
          onClick={toggleMenu} 
          className="lg:hidden text-white hover:text-restaurant-lime-green transition-colors p-2 rounded-full"
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        {/* Desktop menu */}
        <div className="hidden lg:flex items-center space-x-6">
          <a href="#about" className="hover:text-restaurant-lime-green transition-colors font-medium">Sobre</a>
          <a href="#menu" className="hover:text-restaurant-lime-green transition-colors font-medium">Cardápio</a>
          <a href="#gallery" className="hover:text-restaurant-lime-green transition-colors font-medium">Galeria</a>
          <a href="#contact" className="hover:text-restaurant-lime-green transition-colors font-medium">Contato</a>
          <a href="#reservation" className="bg-restaurant-lime-green hover:bg-restaurant-light-green text-restaurant-dark-wine font-medium px-5 py-2 rounded-md transition-colors shadow-md">Reservar</a>
          
          {isAdmin ? (
            <>
              <Link to="/admin/dashboard" className="hover:text-restaurant-lime-green transition-colors flex items-center gap-1 font-medium">
                <User size={18} />
                Painel Admin
              </Link>
              <Button 
                variant="ghost" 
                onClick={logout}
                className="hover:text-restaurant-lime-green transition-colors"
              >
                Sair
              </Button>
            </>
          ) : (
            <Link 
              to="/admin/login" 
              className={`flex items-center gap-1 hover:text-restaurant-lime-green transition-colors font-medium ${location.pathname === '/admin/login' ? 'text-restaurant-lime-green' : ''}`}
            >
              <LogIn size={18} />
              Admin
            </Link>
          )}
        </div>
      </div>
      
      {/* Mobile menu dropdown */}
      {isMenuOpen && (
        <div className="lg:hidden bg-restaurant-dark-wine/95 backdrop-blur-sm border-t border-restaurant-forest-green animate-fade-in">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-3">
            <a href="#about" className="py-2 hover:text-restaurant-lime-green transition-colors" onClick={toggleMenu}>Sobre</a>
            <a href="#menu" className="py-2 hover:text-restaurant-lime-green transition-colors" onClick={toggleMenu}>Cardápio</a>
            <a href="#gallery" className="py-2 hover:text-restaurant-lime-green transition-colors" onClick={toggleMenu}>Galeria</a>
            <a href="#contact" className="py-2 hover:text-restaurant-lime-green transition-colors" onClick={toggleMenu}>Contato</a>
            <a href="#reservation" className="py-2 bg-restaurant-lime-green text-center hover:bg-restaurant-light-green text-restaurant-dark-wine font-medium px-5 py-2 rounded-md transition-colors shadow-md" onClick={toggleMenu}>Reservar</a>
            
            {isAdmin ? (
              <>
                <Link to="/admin/dashboard" className="py-2 hover:text-restaurant-lime-green transition-colors flex items-center gap-1" onClick={toggleMenu}>
                  <User size={18} />
                  Painel Admin
                </Link>
                <Button 
                  variant="ghost" 
                  onClick={() => { logout(); toggleMenu(); }}
                  className="py-2 justify-start p-0 hover:text-restaurant-lime-green transition-colors"
                >
                  Sair
                </Button>
              </>
            ) : (
              <Link 
                to="/admin/login" 
                className={`py-2 flex items-center gap-1 hover:text-restaurant-lime-green transition-colors ${location.pathname === '/admin/login' ? 'text-restaurant-lime-green' : ''}`} 
                onClick={toggleMenu}
              >
                <LogIn size={18} />
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
