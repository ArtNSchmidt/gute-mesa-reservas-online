
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Shield, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/contexts/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const location = useLocation();
  const { authState } = useAuth();
  const isAdmin = authState.isAuthenticated && authState.admin;
  const isAdminPage = location.pathname.startsWith('/admin');

  // Adiciona detecção de scroll para mudar o estilo da navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <header 
      className={`py-4 text-white fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-gute-dark-blue/95 backdrop-blur-sm shadow-md py-2' : 
        isAdminPage ? 'bg-gute-royal-blue' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link to="/" className="flex items-center">
          {isAdmin && (
            <Shield size={20} className="mr-2 text-gute-light-yellow" />
          )}
          <span className={`text-xl md:text-2xl font-cormorant font-bold ${isScrolled ? 'text-gute-light-yellow' : 'text-gute-light-yellow'}`}>
            {isAdminPage ? 'Painel Admin - Taberna do Gute' : 'Taberna do Gute'}
          </span>
        </Link>

        {isMobile ? (
          <>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleMenu} 
              className="text-white hover:bg-gute-royal-blue/20"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
            
            {isMenuOpen && (
              <div className="fixed top-16 left-0 right-0 bg-gute-dark-blue/95 backdrop-blur-md p-6 animate-slide-in border-t border-gute-royal-blue/30 shadow-lg">
                <nav className="flex flex-col space-y-4">
                  {!isAdminPage && navItems.map((item, index) => (
                    <a 
                      key={index}
                      href={item.href}
                      className="text-white hover:text-gute-light-yellow py-3 border-b border-gute-royal-blue/30 flex items-center justify-between"
                      onClick={(e) => item.isScroll ? scrollToSection(item.href.substring(1), e) : setIsMenuOpen(false)}
                    >
                      <span>{item.text}</span>
                      <ChevronDown size={16} className="opacity-50" />
                    </a>
                  ))}
                  {isAdmin && (
                    <Link
                      to="/admin/dashboard"
                      className="text-white hover:text-gute-light-yellow py-3 border-b border-gute-royal-blue/30"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Dashboard Admin
                    </Link>
                  )}
                  {!isAdminPage && (
                    <a 
                      href="#reservation" 
                      className="text-gute-light-yellow font-semibold hover:text-gute-light-yellow/80 py-3 mt-4"
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
          <nav className="hidden md:flex items-center space-x-10">
            {!isAdminPage && navItems.map((item, index) => (
              item.isScroll ? (
                <a
                  key={index}
                  href={item.href}
                  className="text-white hover-underline-animation hover:text-gute-light-yellow transition-colors text-sm font-medium"
                  onClick={(e) => scrollToSection(item.href.substring(1), e)}
                >
                  {item.text}
                </a>
              ) : (
                <Link 
                  key={index}
                  to={item.href}
                  className="text-white hover-underline-animation hover:text-gute-light-yellow transition-colors text-sm font-medium"
                >
                  {item.text}
                </Link>
              )
            ))}
            {isAdmin && (
              <Link 
                to="/admin/dashboard" 
                className="flex items-center text-white hover:text-gute-light-yellow transition-colors"
              >
                <Shield size={16} className="mr-1" />
                <span>Dashboard Admin</span>
              </Link>
            )}
            {!isAdminPage && (
              <Button 
                className="bg-gute-light-yellow hover:bg-gute-light-yellow/90 text-gute-dark-blue hover:text-gute-dark-blue font-medium shadow-lg"
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
