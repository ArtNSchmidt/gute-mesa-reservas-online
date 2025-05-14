
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MenuItem from '@/components/MenuItem';
import MenuSection from '@/components/MenuSection';
import { AspectRatio } from "@/components/ui/aspect-ratio";

const Menu = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <div className="flex-grow pt-20">
        {/* Hero Section - Modified to use bg-gute-dark-blue without opacity */}
        <div className="relative bg-gute-dark-blue py-28 overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-30">
            <img 
              src="/lovable-uploads/96096df2-e5bf-403c-92fd-3834f4e08e59.png" 
              alt="Mesa com pratos tradicionais alemães" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gute-dark-blue/70"></div>
          </div>
          
          <div className="container mx-auto px-4 text-center relative z-10">
            <h1 className="text-5xl md:text-6xl font-cormorant font-bold text-white mb-4">
              Nosso Cardápio
            </h1>
            <p className="text-xl text-gute-light-yellow font-cormorant">Uma experiência única de sabores tradicionais</p>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
        </div>

        {/* Menu Content */}
        <div className="container mx-auto px-4 py-16 max-w-5xl">
          
          {/* Entradas */}
          <MenuSection title="Entradas">
            <MenuItem title="BATATA FRITA" />
            <MenuItem title="MACAXEIRA FRITA" />
            <MenuItem title="PÃO DE ALHO COM CALABRESA" />
            <MenuItem title="BATATA ROSTI" />
          </MenuSection>
          
          {/* Pratos Principais */}
          <MenuSection title="Pratos Principais">
            <MenuItem 
              title="FILÉ À PIAMONTESE" 
              description="Filé ao molho madeira com arroz à piamontese, com batata frita e salada (serve duas pessoas)"
            />
            <MenuItem 
              title="FILÉ À GORGONZOLA" 
              description="Filé ao molho gorgonzola com batata sauté, arroz de alho e salada (serve duas pessoas)"
            />
            <MenuItem 
              title="FILÉ À KISSIÉ" 
              description="Filé ao molho mostarda com bolinhas de batata rosti, arroz de alho e salada (serve duas pessoas)"
            />
            <MenuItem 
              title="FILÉ À PROVOLONE" 
              description="Filé com queijo provolone derretido, batata sauté, arroz de alho e salada (serve duas pessoas)"
            />
            <MenuItem 
              title="FILÉ COM BACON" 
              description="Filé rodeado por fatias de bacon, batata sauté, arroz de alho e salada (serve duas pessoas)"
            />
            <MenuItem 
              title="EISBEIN" 
              description="Joelho de porco cozido, chucrute linguiça calabresa e batata cozida, acompanhado por arroz de alho e salada (serve duas pessoas)"
            />
            <MenuItem 
              title="SIRIGADO" 
              description="Filé de peixe grelhado, com alcaparras e batata sauté, ou à portuguesa acompanhado por arroz de alho e salada (serve duas pessoas)"
            />
            <MenuItem 
              title="GALINHA CAIPIRA" 
              description="Galinha caipira guisada, acompanhada por pirão, arroz e salada (serve duas pessoas)"
            />
            <MenuItem 
              title="PATO À MAROCA" 
              description="Pato caipira guisado ao molho picante agridoce, acompanhado por arroz e salada (serve duas pessoas)"
            />
            <MenuItem 
              title="GALINHA DA ANGOLA" 
              description="Galinha da angola guisada, acompanhada por arroz e salada (Reservar com antecedência) (serve duas pessoas)"
            />
          </MenuSection>
          
          <div className="text-center mt-4 mb-16 text-gray-500 italic text-sm bg-gray-50 rounded-lg py-3">
            <p>Meia porção disponível</p>
            <p>Uma porção e meia disponível</p>
          </div>
          
          {/* Sobremesas */}
          <MenuSection title="Sobremesas">
            <MenuItem 
              title="CREME DE PAPAIA" 
              description="Creme de papaia com licor de cassis"
            />
            <MenuItem 
              title="GUTELO" 
              description="Musse de tangerina com farofa de brownie"
            />
            <MenuItem title="BROWNIE COM SORVETE" />
            <MenuItem title="SORVETE 1 BOLA" />
            <MenuItem title="SORVETE 2 BOLAS" />
            <MenuItem title="SORVETE 3 BOLAS" />
            <MenuItem 
              title="BARQUINHO"
              description="5 bolas de sorvete servidas em uma taca de porcelana em formato de barco"
            />
            <MenuItem title="CAPUCCINO" />
            <MenuItem title="SORVETE CLÁUDIA BEGHINI" />
          </MenuSection>
          
          {/* Para Viagem */}
          <MenuSection title="Para Viagem">
            <MenuItem 
              title="SORVETE" 
              description="Disponível: 1 litro / 1,5 litros / 2 litros (Ninho com morango / Queijo com goiabada / Café, banana e canela / Ovomaltine / Nutella / Jaca / Graviola / Ameixa / Caju e Castanha / Biscoito) (Consultar sabores disponíveis)"
            />
            <MenuItem 
              title="SOPA DE LEGUMES" 
              description="Carne, Frango e Peixe - 500ML"
            />
          </MenuSection>
          
          {/* Bebidas - Apenas Sucos */}
          <MenuSection title="Bebidas">
            <MenuItem 
              title="SUCO NATURAL" 
              description="Limão, Manga, Melancia, Goiaba, Caju, Tamarindo (Disponível: Jarra / Copo)"
            />
            <MenuItem 
              title="SUCO NATURAL II" 
              description="Cajá, Seriguela, Abacaxi, Abacaxi com hortelã (Disponível: Jarra / Copo)"
            />
            <MenuItem 
              title="SUCO NATURAL III" 
              description="Tangerina, Graviola, Laranja (Disponível: Jarra / Copo)"
            />
          </MenuSection>
          
          {/* Bebidas Alcoólicas - Apenas cervejas 600ml e mantendo o resto exceto cervejas 350ml */}
          <MenuSection title="Bebidas Alcoólicas">
            <MenuItem title="HEINEKEN (600ML)" />
            <MenuItem title="STELLA ARTOIS (600ML)" />
            <MenuItem title="SPATEN (600ML)" />
            <MenuItem title="CAIPIRINHA" />
            <MenuItem title="CAIPIROSKA" />
            <MenuItem title="CUBA-LIBRE (RUM COLA)" />
            <MenuItem title="CACHAÇA (DOSE)" />
          </MenuSection>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Menu;
