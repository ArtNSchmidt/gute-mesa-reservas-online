
import React from 'react';
import { Button } from '@/components/ui/button';

const Hero: React.FC = () => {
  return (
    <div className="relative min-h-[90vh] flex items-center overflow-hidden bg-gute-dark-blue">
      {/* Imagem de fundo com overlay de gradiente */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/lovable-uploads/96096df2-e5bf-403c-92fd-3834f4e08e59.png" 
          alt="Mesa com pratos tradicionais alemães" 
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 hero-gradient"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-20">
        <div className="max-w-2xl animate-fade-in">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-cormorant font-bold text-white mb-6 leading-tight">
            Taberna do Gute
          </h1>
          <p className="text-2xl md:text-3xl text-gute-light-yellow font-medium mb-6 font-cormorant">
            Uma experiência única de culinária alemã com toques brasileiros
          </p>
          <p className="text-white/80 mb-10 text-lg">
            Localizado em Horizonte, Ceará, nosso restaurante oferece um ambiente aconchegante e uma gastronomia única, com pratos elaborados pelo Chef Artur Schmidt.
          </p>
          <div className="flex flex-col sm:flex-row gap-5">
            <a href="#reservation">
              <Button className="bg-gute-light-yellow hover:bg-gute-light-yellow/90 text-gute-dark-blue text-lg px-8 py-6 rounded-md shadow-lg font-medium">
                Reservar Mesa
              </Button>
            </a>
            <a href="#menu">
              <Button variant="outline" className="border-gute-soft-pink bg-transparent text-gute-soft-pink hover:bg-gute-dark-blue/50 hover:border-gute-soft-pink/80 hover:text-gute-soft-pink/80 text-lg px-8 py-6 transition-colors">
                Ver Cardápio
              </Button>
            </a>
          </div>
        </div>
      </div>
      
      {/* Elemento decorativo */}
      <div className="absolute right-0 bottom-0 w-1/2 h-20 md:h-32 bg-gute-royal-blue/30 backdrop-blur-sm z-10"></div>
      <div className="absolute right-10 bottom-8 w-32 h-32 rounded-full bg-gute-soft-green/20 backdrop-blur-sm z-0"></div>
    </div>
  );
};

export default Hero;
