
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { text: 'Início', href: '/' },
    { text: 'Cardápio', href: '/menu' },
    { text: 'Sobre', href: '/#about' },
    { text: 'Galeria', href: '/#gallery' },
    { text: 'Reservas', href: '/#reservations' },
  ];

  return (
    <header className="bg-restaurant-dark-wine py-4 text-white sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link to="/" className="flex items-center">
          <span className="text-xl md:text-2xl font-playfair font-bold text-restaurant-lime-green">
            Taberna do Gute
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
                  {navItems.map((item, index) => (
                    <Link 
                      key={index}
                      to={item.href}
                      className="text-white hover:text-restaurant-lime-green py-2 border-b border-restaurant-forest-green/30"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.text}
                    </Link>
                  ))}
                </nav>
              </div>
            )}
          </>
        ) : (
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <Link 
                key={index}
                to={item.href}
                className="text-white hover:text-restaurant-lime-green transition-colors"
              >
                {item.text}
              </Link>
            ))}
            <Button className="bg-restaurant-lime-green hover:bg-restaurant-light-green text-restaurant-dark-wine hover:text-restaurant-dark-wine font-medium">
              <Link to="/#reservations">Reservar Mesa</Link>
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
