
import React from 'react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious 
} from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const Gallery: React.FC = () => {
  // Imagens do restaurante
  const images = [
    {
      url: "/lovable-uploads/5f91b079-b6a8-48e7-853b-1bf1de39d9ab.png",
      alt: "Sobremesa com sorvete e frutas vermelhas",
      title: "Sobremesas Artesanais"
    },
    {
      url: "/lovable-uploads/def5c757-2de7-426c-950d-ddf6c459adb3.png",
      alt: "Carne assada com cebola roxa caramelizada",
      title: "Especialidades da Casa"
    },
    {
      url: "/lovable-uploads/96096df2-e5bf-403c-92fd-3834f4e08e59.png",
      alt: "Mesa com pratos tradicionais alemães",
      title: "Culinária Alemã"
    },
    {
      url: "/lovable-uploads/89c4bd0d-0b1b-48d7-9183-c97f04c32bd2.png",
      alt: "Carne com purê de batata doce",
      title: "Pratos Especiais"
    },
    {
      url: "/lovable-uploads/79e71dde-6730-45bf-a03a-5084f86523d7.png",
      alt: "Drink refrescante com limão",
      title: "Bebidas Exclusivas"
    },
    {
      url: "/lovable-uploads/8ced8667-aca1-491d-aebf-17f7531ca8ae.png",
      alt: "Sobremesas com calda de frutas vermelhas",
      title: "Doces e Sobremesas"
    },
  ];

  return (
    <section id="gallery" className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Elementos decorativos */}
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-gute-soft-pink/10 z-0"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-gute-soft-green/10 z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="section-heading centered-section-heading text-center text-gute-dark-blue mb-16">Nossa Galeria</h2>
        
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((image, index) => (
            <div 
              key={index} 
              className="relative group overflow-hidden rounded-xl shadow-elegant h-80 card-hover"
            >
              <img 
                src={image.url} 
                alt={image.alt} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gute-dark-blue/90 via-gute-dark-blue/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                <h3 className="text-white font-cormorant font-semibold text-2xl">{image.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Carrossel para dispositivos móveis */}
        <div className="md:hidden">
          <Carousel className="w-full">
            <CarouselContent>
              {images.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="relative overflow-hidden rounded-xl shadow-elegant">
                    <AspectRatio ratio={4/3}>
                      <img 
                        src={image.url} 
                        alt={image.alt} 
                        className="w-full h-full object-cover"
                      />
                    </AspectRatio>
                    <div className="absolute inset-0 bg-gradient-to-t from-gute-dark-blue/80 to-transparent flex items-end p-6">
                      <h3 className="text-white font-cormorant font-semibold text-2xl">{image.title}</h3>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2 bg-white/80 text-gute-dark-blue hover:bg-white" />
            <CarouselNext className="right-2 bg-white/80 text-gute-dark-blue hover:bg-white" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
