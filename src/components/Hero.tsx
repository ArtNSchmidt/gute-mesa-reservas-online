
import React from 'react';
import { Button } from '@/components/ui/button';

const Hero: React.FC = () => {
  return (
    <div className="relative min-h-[80vh] flex items-center overflow-hidden bg-restaurant-dark-wine">
      {/* Overlay de gradiente */}
      <div className="absolute inset-0 bg-gradient-to-r from-restaurant-dark-wine to-transparent z-10" />
      
      {/* Fundo com padrão */}
      <div className="absolute inset-0 hero-pattern opacity-20" />
      
      <div className="container mx-auto px-4 relative z-20">
        <div className="max-w-xl animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-playfair text-white mb-6 leading-tight">
            Taberna do Gute
          </h1>
          <p className="text-xl md:text-2xl text-restaurant-lime-green font-medium mb-6">
            Uma experiência única de culinária alemã com toques brasileiros
          </p>
          <p className="text-gray-300 mb-8 text-lg">
            Localizado em Horizonte, Ceará, nosso restaurante oferece um ambiente aconchegante e uma gastronomia única, com pratos elaborados pelo Chef Artur Schmidt.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#reservation">
              <Button className="bg-restaurant-lime-green hover:bg-restaurant-light-green text-restaurant-dark-wine text-lg px-6 py-6 shadow-lg font-medium">
                Reservar Mesa
              </Button>
            </a>
            <a href="#menu">
              <Button variant="outline" className="border-restaurant-lime-green bg-transparent text-restaurant-lime-green hover:bg-restaurant-dark-wine/50 hover:border-restaurant-light-green hover:text-restaurant-light-green text-lg px-6 py-6 transition-colors">
                Ver Cardápio
              </Button>
            </a>
          </div>
        </div>
      </div>
      
      {/* Elemento decorativo */}
      <div className="absolute -bottom-10 right-0 w-1/3 h-40 bg-restaurant-forest-green rounded-tl-[50px] z-0 opacity-50 transform rotate-6" />
    </div>
  );
};

export default Hero;
