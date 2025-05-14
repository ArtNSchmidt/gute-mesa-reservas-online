
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="section-heading centered-section-heading text-center">Sobre Nós</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-lg mb-6 text-restaurant-dark-gray">
              A Taberna do Gute nasceu da paixão do Chef Artur Schmidt por unir suas raízes alemãs com os sabores vibrantes do Brasil. Localizado em Horizonte, Ceará, nosso restaurante oferece uma experiência gastronômica única que celebra essa fusão cultural.
            </p>
            <p className="text-lg mb-6 text-restaurant-dark-gray">
              Nossa proposta é trazer para você o melhor da culinária alemã tradicional com toques da rica gastronomia brasileira, criando uma experiência única para o seu paladar.
            </p>
            <p className="text-lg mb-6 text-restaurant-dark-gray">
              Em um ambiente aconchegante e elegante, convidamos você a desfrutar de pratos cuidadosamente elaborados, acompanhados de cervejas artesanais e uma seleção de vinhos que complementam perfeitamente nossa culinária.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-restaurant-light-green border-none overflow-hidden">
              <CardContent className="p-0">
                <div className="aspect-square bg-restaurant-medium-green/30 flex items-center justify-center p-6">
                  <div className="text-center">
                    <h3 className="font-playfair font-bold text-xl mb-2">Gastronomia</h3>
                    <p className="text-restaurant-dark-gray">Fusão da culinária alemã com ingredientes brasileiros</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-restaurant-medium-green border-none overflow-hidden">
              <CardContent className="p-0">
                <div className="aspect-square bg-restaurant-medium-green flex items-center justify-center p-6">
                  <div className="text-center">
                    <h3 className="font-playfair font-bold text-xl mb-2 text-white">Bebidas</h3>
                    <p className="text-white">Cervejas artesanais e vinhos selecionados</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-restaurant-dark-teal border-none overflow-hidden">
              <CardContent className="p-0">
                <div className="aspect-square bg-restaurant-dark-teal flex items-center justify-center p-6">
                  <div className="text-center">
                    <h3 className="font-playfair font-bold text-xl mb-2 text-white">Ambiente</h3>
                    <p className="text-white">Aconchegante e elegante para todas as ocasiões</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-restaurant-dark-gray border-none overflow-hidden">
              <CardContent className="p-0">
                <div className="aspect-square bg-restaurant-dark-gray flex items-center justify-center p-6">
                  <div className="text-center">
                    <h3 className="font-playfair font-bold text-xl mb-2 text-white">Experiência</h3>
                    <p className="text-white">Atendimento personalizado e de alta qualidade</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
