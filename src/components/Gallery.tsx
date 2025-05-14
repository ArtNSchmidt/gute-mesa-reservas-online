
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
  // Novas imagens do restaurante
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
    <section id="gallery" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="section-heading centered-section-heading text-center mb-10">Galeria</h2>
        
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <div 
              key={index} 
              className="relative group overflow-hidden rounded-lg shadow-md h-64"
            >
              <img 
                src={image.url} 
                alt={image.alt} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <h3 className="text-white font-bold text-lg">{image.title}</h3>
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
                  <div className="relative overflow-hidden rounded-lg shadow-md">
                    <AspectRatio ratio={4/3}>
                      <img 
                        src={image.url} 
                        alt={image.alt} 
                        className="w-full h-full object-cover"
                      />
                    </AspectRatio>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                      <h3 className="text-white font-bold text-lg">{image.title}</h3>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
