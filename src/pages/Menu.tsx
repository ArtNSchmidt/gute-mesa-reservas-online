
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Menu = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow">
        {/* Menu Header */}
        <div className="bg-restaurant-moss-green py-12 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-white mb-4">
            Taberna do Gute
          </h1>
          <p className="text-xl text-restaurant-lime-green font-medium">Cardápio</p>
        </div>

        {/* Menu Content */}
        <div className="container mx-auto px-4 py-12">
          {/* Entradas */}
          <div className="mb-16">
            <h2 className="section-heading centered-section-heading text-center">Entradas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <Card className="bg-restaurant-light-green/10 border-restaurant-forest-green">
                <CardHeader>
                  <CardTitle className="text-restaurant-forest-green">BATATA FRITA</CardTitle>
                </CardHeader>
              </Card>
              
              <Card className="bg-restaurant-light-green/10 border-restaurant-forest-green">
                <CardHeader>
                  <CardTitle className="text-restaurant-forest-green">MACAXEIRA FRITA</CardTitle>
                </CardHeader>
              </Card>
              
              <Card className="bg-restaurant-light-green/10 border-restaurant-forest-green">
                <CardHeader>
                  <CardTitle className="text-restaurant-forest-green">PÃO DE ALHO COM CALABRESA</CardTitle>
                </CardHeader>
              </Card>
              
              <Card className="bg-restaurant-light-green/10 border-restaurant-forest-green">
                <CardHeader>
                  <CardTitle className="text-restaurant-forest-green">BATATA ROSTI</CardTitle>
                </CardHeader>
              </Card>
            </div>
          </div>
          
          {/* Pratos Principais */}
          <div className="mb-16">
            <h2 className="section-heading centered-section-heading text-center">Pratos Principais</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <Card className="bg-restaurant-light-green/10 border-restaurant-forest-green">
                <CardHeader>
                  <CardTitle className="text-restaurant-forest-green">FILÉ À PIAMONTESE</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Filé ao molho madeira com arroz à piamontese, com batata frita e salada
                    <br />(serve duas pessoas)
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-restaurant-light-green/10 border-restaurant-forest-green">
                <CardHeader>
                  <CardTitle className="text-restaurant-forest-green">FILÉ À GORGONZOLA</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Filé ao molho gorgonzola com batata sauté, arroz de alho e salada
                    <br />(serve duas pessoas)
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-restaurant-light-green/10 border-restaurant-forest-green">
                <CardHeader>
                  <CardTitle className="text-restaurant-forest-green">FILÉ À KISSIÉ</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Filé ao molho mostarda com bolinhas de batata rosti, arroz de alho e salada
                    <br />(serve duas pessoas)
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-restaurant-light-green/10 border-restaurant-forest-green">
                <CardHeader>
                  <CardTitle className="text-restaurant-forest-green">FILÉ À PROVOLONE</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Filé com queijo provolone derretido, batata sauté, arroz de alho e salada
                    <br />(serve duas pessoas)
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-restaurant-light-green/10 border-restaurant-forest-green">
                <CardHeader>
                  <CardTitle className="text-restaurant-forest-green">FILÉ COM BACON</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Filé rodeado por fatias de bacon, batata sauté, arroz de alho e salada
                    <br />(serve duas pessoas)
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-restaurant-light-green/10 border-restaurant-forest-green">
                <CardHeader>
                  <CardTitle className="text-restaurant-forest-green">EISBEIN</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Joelho de porco cozido, chucrute linguiça calabresa e batata cozida, acompanhado por arroz de alho e salada.
                    <br />(serve duas pessoas)
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-restaurant-light-green/10 border-restaurant-forest-green">
                <CardHeader>
                  <CardTitle className="text-restaurant-forest-green">SIRIGADO</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Filé de peixe grelhado, com alcaparras e batata sauté, ou à portuguesa acompanhado por arroz de alho e salada.
                    <br />(serve duas pessoas)
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-restaurant-light-green/10 border-restaurant-forest-green">
                <CardHeader>
                  <CardTitle className="text-restaurant-forest-green">GALINHA CAIPIRA</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Galinha caipira guisada, acompanhada por pirão, arroz e salada.
                    <br />(serve duas pessoas)
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-restaurant-light-green/10 border-restaurant-forest-green">
                <CardHeader>
                  <CardTitle className="text-restaurant-forest-green">PATO À MAROCA</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Pato caipira guisado ao molho picante agridoce, acompanhado por arroz e salada
                    <br />(serve duas pessoas)
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-restaurant-light-green/10 border-restaurant-forest-green">
                <CardHeader>
                  <CardTitle className="text-restaurant-forest-green">GALINHA DA ANGOLA</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Galinha da angola guisada, acompanhada por arroz e salada (Reservar com antecedência)
                    <br />(serve duas pessoas)
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="text-center mt-8 text-gray-700 italic">
              <p>Meia porção disponível</p>
              <p>Uma porção e meia disponível</p>
            </div>
          </div>
          
          {/* Sobremesas */}
          <div className="mb-16">
            <h2 className="section-heading centered-section-heading text-center">Sobremesas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <Card className="bg-restaurant-light-green/10 border-restaurant-forest-green">
                <CardHeader>
                  <CardTitle className="text-restaurant-forest-green">CREME DE PAPAIA</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">(Creme de papaia com liquor de cassis)</p>
                </CardContent>
              </Card>
              
              <Card className="bg-restaurant-light-green/10 border-restaurant-forest-green">
                <CardHeader>
                  <CardTitle className="text-restaurant-forest-green">GUTELO</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">(Musse de tangerina com farofa de brownie)</p>
                </CardContent>
              </Card>
              
              <Card className="bg-restaurant-light-green/10 border-restaurant-forest-green">
                <CardHeader>
                  <CardTitle className="text-restaurant-forest-green">BROWNIE COM SORVETE</CardTitle>
                </CardHeader>
              </Card>
              
              <Card className="bg-restaurant-light-green/10 border-restaurant-forest-green">
                <CardHeader>
                  <CardTitle className="text-restaurant-forest-green">CAPUCCINO</CardTitle>
                </CardHeader>
              </Card>
              
              <Card className="bg-restaurant-light-green/10 border-restaurant-forest-green">
                <CardHeader>
                  <CardTitle className="text-restaurant-forest-green">SORVETE CLÁUDIA BEGHINI</CardTitle>
                </CardHeader>
              </Card>
              
              <Card className="bg-restaurant-light-green/10 border-restaurant-forest-green">
                <CardHeader>
                  <CardTitle className="text-restaurant-forest-green">SORVETE</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    (Ninho com morango / Queijo com goiabada / Café, banana e canela / Ovomaltine / Nutella / Jaca / Graviola / Ameixa / Caju e Castanha / Biscoito)
                  </p>
                  <p className="mt-2 text-gray-700">
                    Disponível: 1 bola / 2 bolas / 3 bolas / Barquinho
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Para Viagem */}
          <div className="mb-16">
            <h2 className="section-heading centered-section-heading text-center">Para Viagem</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <Card className="bg-restaurant-light-green/10 border-restaurant-forest-green">
                <CardHeader>
                  <CardTitle className="text-restaurant-forest-green">SORVETE</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Disponível: 1 litro / 1,5 litros / 2 litros
                    <br /><br />
                    (Ninho com morango / Queijo com goiabada / Café, banana e canela / Ovomaltine / Nutella / Jaca / Graviola / Ameixa / Caju e Castanha / Biscoito)
                    <br /><br />
                    (Consultar sabores disponíveis)
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-restaurant-light-green/10 border-restaurant-forest-green">
                <CardHeader>
                  <CardTitle className="text-restaurant-forest-green">SOPA DE LEGUMES</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">Carne, Frango e Peixe - 500ML</p>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Bebidas */}
          <div className="mb-16">
            <h2 className="section-heading centered-section-heading text-center">Bebidas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              <Card className="bg-restaurant-light-green/10 border-restaurant-forest-green">
                <CardHeader>
                  <CardTitle className="text-restaurant-forest-green">ÁGUA MINERAL</CardTitle>
                </CardHeader>
              </Card>
              
              <Card className="bg-restaurant-light-green/10 border-restaurant-forest-green">
                <CardHeader>
                  <CardTitle className="text-restaurant-forest-green">ÁGUA COM GÁS</CardTitle>
                </CardHeader>
              </Card>
              
              <Card className="bg-restaurant-light-green/10 border-restaurant-forest-green">
                <CardHeader>
                  <CardTitle className="text-restaurant-forest-green">REFRIGERANTE KS</CardTitle>
                </CardHeader>
              </Card>
              
              <Card className="bg-restaurant-light-green/10 border-restaurant-forest-green">
                <CardHeader>
                  <CardTitle className="text-restaurant-forest-green">REFRIGERANTE LATA</CardTitle>
                </CardHeader>
              </Card>
              
              <Card className="bg-restaurant-light-green/10 border-restaurant-forest-green">
                <CardHeader>
                  <CardTitle className="text-restaurant-forest-green">SUCO NATURAL</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    (Limão, Manga, Melancia, Goiaba, Caju, Tamarindo)
                    <br />
                    Disponível: Jarra / Copo
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-restaurant-light-green/10 border-restaurant-forest-green">
                <CardHeader>
                  <CardTitle className="text-restaurant-forest-green">SUCO NATURAL II</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    (Cajá, Seriguela, Abacaxi, Abacaxi com hortelã)
                    <br />
                    Disponível: Jarra / Copo
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-restaurant-light-green/10 border-restaurant-forest-green">
                <CardHeader>
                  <CardTitle className="text-restaurant-forest-green">SUCO NATURAL III</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    (Tangerina, Graviola, Laranja)
                    <br />
                    Disponível: Jarra / Copo
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Bebidas Alcoólicas */}
          <div className="mb-16">
            <h2 className="section-heading centered-section-heading text-center">Bebidas Alcoólicas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              <Card className="bg-restaurant-light-green/10 border-restaurant-forest-green">
                <CardHeader>
                  <CardTitle className="text-restaurant-forest-green">HEINEKEN (600ML)</CardTitle>
                </CardHeader>
              </Card>
              
              <Card className="bg-restaurant-light-green/10 border-restaurant-forest-green">
                <CardHeader>
                  <CardTitle className="text-restaurant-forest-green">STELLA ARTOIS (600ML)</CardTitle>
                </CardHeader>
              </Card>
              
              <Card className="bg-restaurant-light-green/10 border-restaurant-forest-green">
                <CardHeader>
                  <CardTitle className="text-restaurant-forest-green">SPATEN (600ML)</CardTitle>
                </CardHeader>
              </Card>
              
              <Card className="bg-restaurant-light-green/10 border-restaurant-forest-green">
                <CardHeader>
                  <CardTitle className="text-restaurant-forest-green">CAIPIRINHA</CardTitle>
                </CardHeader>
              </Card>
              
              <Card className="bg-restaurant-light-green/10 border-restaurant-forest-green">
                <CardHeader>
                  <CardTitle className="text-restaurant-forest-green">CAIPIROSKA</CardTitle>
                </CardHeader>
              </Card>
              
              <Card className="bg-restaurant-light-green/10 border-restaurant-forest-green">
                <CardHeader>
                  <CardTitle className="text-restaurant-forest-green">CUBA-LIBRE (RUM COLA)</CardTitle>
                </CardHeader>
              </Card>
              
              <Card className="bg-restaurant-light-green/10 border-restaurant-forest-green">
                <CardHeader>
                  <CardTitle className="text-restaurant-forest-green">HEINEKEN (350ML)</CardTitle>
                </CardHeader>
              </Card>
              
              <Card className="bg-restaurant-light-green/10 border-restaurant-forest-green">
                <CardHeader>
                  <CardTitle className="text-restaurant-forest-green">SPATTEN (350ML)</CardTitle>
                </CardHeader>
              </Card>
              
              <Card className="bg-restaurant-light-green/10 border-restaurant-forest-green">
                <CardHeader>
                  <CardTitle className="text-restaurant-forest-green">STELLA (350ML)</CardTitle>
                </CardHeader>
              </Card>
              
              <Card className="bg-restaurant-light-green/10 border-restaurant-forest-green">
                <CardHeader>
                  <CardTitle className="text-restaurant-forest-green">CACHAÇA (DOSE)</CardTitle>
                </CardHeader>
              </Card>
            </div>
          </div>
          
          {/* Contato */}
          <div className="text-center mt-16 p-8 border border-restaurant-forest-green rounded-lg bg-restaurant-light-green/10">
            <h3 className="text-2xl font-playfair font-bold text-restaurant-forest-green mb-4">CONTATO PARA RESERVA</h3>
            <p className="text-xl">(85) 9 9815-3884</p>
            <p className="text-xl">(85) 9 8148-2382</p>
            <p className="mt-4 text-restaurant-forest-green">@tabernadogute</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Menu;
