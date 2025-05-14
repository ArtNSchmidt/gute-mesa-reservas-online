
import React from 'react';
import { Button } from '@/components/ui/button';

const Hero: React.FC = () => {
  return (
    <div className="hero-pattern relative">
      <div className="absolute inset-0 bg-gradient-to-r from-restaurant-dark-gray/80 to-transparent" />
      <div className="relative container mx-auto px-4 py-28 md:py-36 lg:py-48 flex flex-col items-start justify-center">
        <div className="max-w-xl animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Taberna do Gute
          </h1>
          <p className="text-xl md:text-2xl text-restaurant-light-green mb-6">
            Uma experiência única de culinária alemã com toques brasileiros
          </p>
          <p className="text-white mb-8">
            Localizado em Horizonte, Ceará, nosso restaurante oferece um ambiente aconchegante e uma gastronomia única, com pratos elaborados pelo Chef Artur Schmidt.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#reservation">
              <Button className="bg-restaurant-medium-green hover:bg-restaurant-light-green text-restaurant-dark-gray text-lg px-6 py-6">
                Reservar Mesa
              </Button>
            </a>
            <a href="#menu">
              <Button variant="outline" className="border-restaurant-medium-green text-white hover:bg-restaurant-medium-green/20 text-lg px-6 py-6">
                Ver Cardápio
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
