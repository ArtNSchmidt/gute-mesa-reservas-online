
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-white overflow-hidden relative">
      {/* Elemento decorativo */}
      <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-gute-soft-green/10 z-0"></div>
      <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-gute-royal-blue/10 z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="section-heading centered-section-heading text-center text-gute-dark-blue">Sobre Nós</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <p className="text-lg text-gray-700 leading-relaxed">
              A <span className="font-semibold text-gute-royal-blue">Taberna do Gute</span> nasceu da paixão do Chef Artur Schmidt por unir suas raízes alemãs com os sabores vibrantes do Brasil. Localizado em Horizonte, Ceará, nosso restaurante oferece uma experiência gastronômica única que celebra essa fusão cultural.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Nossa proposta é trazer para você o melhor da culinária alemã tradicional com toques da rica gastronomia brasileira, criando uma experiência única para o seu paladar.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Em um ambiente aconchegante e elegante, convidamos você a desfrutar de pratos cuidadosamente elaborados, acompanhados de cervejas artesanais e uma seleção de vinhos que complementam perfeitamente nossa culinária.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <Card className="bg-gute-soft-green/10 border-none overflow-hidden rounded-xl shadow-elegant">
              <CardContent className="p-0">
                <div className="aspect-square flex items-center justify-center p-8">
                  <div className="text-center">
                    <h3 className="font-cormorant font-bold text-2xl mb-3 text-gute-dark-blue">Gastronomia</h3>
                    <p className="text-gray-700">Fusão da culinária alemã com ingredientes brasileiros</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gute-royal-blue/10 border-none overflow-hidden rounded-xl shadow-elegant">
              <CardContent className="p-0">
                <div className="aspect-square flex items-center justify-center p-8">
                  <div className="text-center">
                    <h3 className="font-cormorant font-bold text-2xl mb-3 text-gute-dark-blue">Bebidas</h3>
                    <p className="text-gray-700">Cervejas artesanais e vinhos selecionados</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gute-light-yellow/10 border-none overflow-hidden rounded-xl shadow-elegant">
              <CardContent className="p-0">
                <div className="aspect-square flex items-center justify-center p-8">
                  <div className="text-center">
                    <h3 className="font-cormorant font-bold text-2xl mb-3 text-gute-dark-blue">Ambiente</h3>
                    <p className="text-gray-700">Aconchegante e elegante para todas as ocasiões</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gute-soft-pink/10 border-none overflow-hidden rounded-xl shadow-elegant">
              <CardContent className="p-0">
                <div className="aspect-square flex items-center justify-center p-8">
                  <div className="text-center">
                    <h3 className="font-cormorant font-bold text-2xl mb-3 text-gute-dark-blue">Experiência</h3>
                    <p className="text-gray-700">Atendimento personalizado e de alta qualidade</p>
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
