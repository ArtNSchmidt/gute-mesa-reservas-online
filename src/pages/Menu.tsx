
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MenuItem from '@/components/MenuItem';
import MenuSection from '@/components/MenuSection';
import { AspectRatio } from "@/components/ui/aspect-ratio";

const Menu = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#fafafa]">
      <Navbar />
      
      <div className="flex-grow">
        {/* Hero Section */}
        <div className="relative bg-white border-b border-neutral-200">
          <div className="container mx-auto px-4 py-16 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-medium text-neutral-800 mb-2">
              Cardápio
            </h1>
            <p className="text-lg text-neutral-500">Taberna do Gute</p>
          </div>
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
          
          <div className="text-center mt-4 mb-12 text-neutral-500 italic text-sm">
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
            <MenuItem title="CAPUCCINO" />
            <MenuItem title="SORVETE CLÁUDIA BEGHINI" />
            <MenuItem 
              title="SORVETE" 
              description="Ninho com morango / Queijo com goiabada / Café, banana e canela / Ovomaltine / Nutella / Jaca / Graviola / Ameixa / Caju e Castanha / Biscoito (Disponível: 1 bola / 2 bolas / 3 bolas / Barquinho)"
            />
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
          
          {/* Bebidas */}
          <MenuSection title="Bebidas">
            <MenuItem title="ÁGUA MINERAL" />
            <MenuItem title="ÁGUA COM GÁS" />
            <MenuItem title="REFRIGERANTE KS" />
            <MenuItem title="REFRIGERANTE LATA" />
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
          
          {/* Bebidas Alcoólicas */}
          <MenuSection title="Bebidas Alcoólicas">
            <MenuItem title="HEINEKEN (600ML)" />
            <MenuItem title="STELLA ARTOIS (600ML)" />
            <MenuItem title="SPATEN (600ML)" />
            <MenuItem title="CAIPIRINHA" />
            <MenuItem title="CAIPIROSKA" />
            <MenuItem title="CUBA-LIBRE (RUM COLA)" />
            <MenuItem title="HEINEKEN (350ML)" />
            <MenuItem title="SPATTEN (350ML)" />
            <MenuItem title="STELLA (350ML)" />
            <MenuItem title="CACHAÇA (DOSE)" />
          </MenuSection>
          
          {/* Contato */}
          <div className="text-center mt-20 mb-8 py-8 border-t border-b border-neutral-200">
            <h3 className="text-2xl font-playfair font-medium text-neutral-800 mb-3">CONTATO PARA RESERVA</h3>
            <p className="text-lg">(85) 9 9815-3884</p>
            <p className="text-lg">(85) 9 8148-2382</p>
            <p className="mt-3 text-neutral-600">@tabernadogute</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Menu;
