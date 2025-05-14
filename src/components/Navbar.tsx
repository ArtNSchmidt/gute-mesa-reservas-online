
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Shield } from 'lucide-react';
import { Button } from './ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/contexts/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const location = useLocation();
  const { authState } = useAuth();
  const isAdmin = authState.isAuthenticated && authState.admin;
  const isAdminPage = location.pathname.startsWith('/admin');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId: string, event: React.MouseEvent) => {
    event.preventDefault();
    
    // Se estiver em uma página diferente da inicial, primeiro navega para a página inicial
    if (location.pathname !== '/') {
      navigate('/');
      // Usamos setTimeout para garantir que a navegação termine antes de tentar rolar
      setTimeout(() => {
        if (sectionId === 'top') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          const section = document.getElementById(sectionId);
          if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }, 100);
    } else {
      if (sectionId === 'top') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
    
    if (isMenuOpen) setIsMenuOpen(false);
  };

  const navItems = [
    { text: 'Início', href: '#top', isScroll: true },
    { text: 'Cardápio', href: '/menu', isScroll: false },
    { text: 'Sobre', href: '#about', isScroll: true },
    { text: 'Galeria', href: '#gallery', isScroll: true },
  ];

  return (
    <header className={`py-4 text-white sticky top-0 z-50 ${isAdminPage ? 'bg-restaurant-forest-green' : 'bg-restaurant-dark-wine'}`}>
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link to="/" className="flex items-center">
          {isAdmin && (
            <Shield size={20} className="mr-2 text-restaurant-lime-green" />
          )}
          <span className="text-xl md:text-2xl font-playfair font-bold text-restaurant-lime-green">
            {isAdminPage ? 'Painel Admin - Taberna do Gute' : 'Taberna do Gute'}
          </span>
        </Link>

        {isMobile ? (
          <>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleMenu} 
              className="text-white hover:bg-restaurant-forest-green/20"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
            
            {isMenuOpen && (
              <div className="fixed top-16 left-0 right-0 bg-restaurant-dark-wine p-4 animate-slide-in">
                <nav className="flex flex-col space-y-4">
                  {!isAdminPage && navItems.map((item, index) => (
                    <a 
                      key={index}
                      href={item.href}
                      className="text-white hover:text-restaurant-lime-green py-2 border-b border-restaurant-forest-green/30"
                      onClick={(e) => item.isScroll ? scrollToSection(item.href.substring(1), e) : setIsMenuOpen(false)}
                    >
                      {item.text}
                    </a>
                  ))}
                  {isAdmin && (
                    <Link
                      to="/admin/dashboard"
                      className="text-white hover:text-restaurant-lime-green py-2 border-b border-restaurant-forest-green/30"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Dashboard Admin
                    </Link>
                  )}
                  {!isAdminPage && (
                    <a 
                      href="#reservation" 
                      className="text-white hover:text-restaurant-lime-green py-2 border-b border-restaurant-forest-green/30"
                      onClick={(e) => scrollToSection('reservation', e)}
                    >
                      Reservar Mesa
                    </a>
                  )}
                </nav>
              </div>
            )}
          </>
        ) : (
          <nav className="hidden md:flex items-center space-x-8">
            {!isAdminPage && navItems.map((item, index) => (
              item.isScroll ? (
                <a
                  key={index}
                  href={item.href}
                  className="text-white hover:text-restaurant-lime-green transition-colors"
                  onClick={(e) => scrollToSection(item.href.substring(1), e)}
                >
                  {item.text}
                </a>
              ) : (
                <Link 
                  key={index}
                  to={item.href}
                  className="text-white hover:text-restaurant-lime-green transition-colors"
                >
                  {item.text}
                </Link>
              )
            ))}
            {isAdmin && (
              <Link 
                to="/admin/dashboard" 
                className="flex items-center text-white hover:text-restaurant-lime-green transition-colors"
              >
                <Shield size={16} className="mr-1" />
                <span>Dashboard Admin</span>
              </Link>
            )}
            {!isAdminPage && (
              <Button 
                className="bg-restaurant-lime-green hover:bg-restaurant-light-green text-restaurant-dark-wine hover:text-restaurant-dark-wine font-medium"
                onClick={(e) => scrollToSection('reservation', e)}
              >
                Reservar Mesa
              </Button>
            )}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
