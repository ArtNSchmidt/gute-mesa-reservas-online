
// Dados do cardápio organizados por categoria
export type MenuItem = {
  id: string;
  title: string;
  description?: string;
  price?: number;
};

export type MenuCategory = {
  name: string;
  items: MenuItem[];
};

export const menuData: MenuCategory[] = [
  {
    name: "Entradas",
    items: [
      { id: "e1", title: "BATATA FRITA", price: 25 },
      { id: "e2", title: "MACAXEIRA FRITA", price: 25 },
      { id: "e3", title: "PÃO DE ALHO COM CALABRESA", price: 28 },
      { id: "e4", title: "BATATA ROSTI", price: 30 },
    ]
  },
  {
    name: "Pratos Principais",
    items: [
      { 
        id: "p1", 
        title: "FILÉ À PIAMONTESE", 
        description: "Filé ao molho madeira com arroz à piamontese, com batata frita e salada (serve duas pessoas)",
        price: 120
      },
      { 
        id: "p2", 
        title: "FILÉ À GORGONZOLA", 
        description: "Filé ao molho gorgonzola com batata sauté, arroz de alho e salada (serve duas pessoas)",
        price: 130
      },
      { 
        id: "p3", 
        title: "FILÉ À KISSIÉ", 
        description: "Filé ao molho mostarda com bolinhas de batata rosti, arroz de alho e salada (serve duas pessoas)",
        price: 125
      },
      { 
        id: "p4", 
        title: "FILÉ À PROVOLONE", 
        description: "Filé com queijo provolone derretido, batata sauté, arroz de alho e salada (serve duas pessoas)",
        price: 130
      },
      { 
        id: "p5", 
        title: "EISBEIN", 
        description: "Joelho de porco cozido, chucrute linguiça calabresa e batata cozida, acompanhado por arroz de alho e salada (serve duas pessoas)",
        price: 125
      }
    ]
  },
  {
    name: "Sobremesas",
    items: [
      { 
        id: "s1", 
        title: "CREME DE PAPAIA", 
        description: "Creme de papaia com licor de cassis",
        price: 20
      },
      { 
        id: "s2", 
        title: "GUTELO", 
        description: "Musse de tangerina com farofa de brownie",
        price: 25
      },
      { 
        id: "s3", 
        title: "BROWNIE COM SORVETE", 
        price: 22
      },
      {
        id: "s4",
        title: "SORVETE 1 BOLA",
        description: "Escolha entre nossos sabores: Ninho com morango, Queijo com goiabada, Café, Ovomaltine, Nutella ou sabores da estação",
        price: 12
      },
      {
        id: "s5",
        title: "SORVETE 2 BOLAS",
        description: "Dupla experiência de sabores à sua escolha",
        price: 18
      },
      {
        id: "s6",
        title: "SORVETE 3 BOLAS",
        description: "Trio de sabores para uma experiência completa",
        price: 23
      },
      {
        id: "s7",
        title: "BARQUINHO",
        description: "Embarque em uma viagem de sabores com cinco bolas de sorvete servidas em taça especial em formato de barco, decorada com frutas frescas e calda à sua escolha",
        price: 35
      }
    ]
  },
  {
    name: "Bebidas",
    items: [
      { 
        id: "b1", 
        title: "SUCO NATURAL", 
        description: "Limão, Manga, Melancia, Goiaba, Caju, Tamarindo",
        price: 12
      },
      { 
        id: "b2", 
        title: "SUCO NATURAL II", 
        description: "Cajá, Seriguela, Abacaxi, Abacaxi com hortelã",
        price: 14
      },
      { 
        id: "b3", 
        title: "SUCO NATURAL III", 
        description: "Tangerina, Graviola, Laranja",
        price: 15
      }
    ]
  },
  {
    name: "Bebidas Alcoólicas",
    items: [
      { id: "ba1", title: "HEINEKEN (600ML)", price: 16 },
      { id: "ba2", title: "STELLA ARTOIS (600ML)", price: 16 },
      { id: "ba3", title: "SPATEN (600ML)", price: 15 },
      { id: "ba4", title: "CAIPIRINHA", price: 20 },
      { id: "ba5", title: "CAIPIROSKA", price: 22 },
      { id: "ba6", title: "CUBA-LIBRE (RUM COLA)", price: 19 },
      { id: "ba7", title: "CACHAÇA (DOSE)", price: 10 }
    ]
  }
];

// Encontrar um item pelo ID
export function findItemById(id: string): MenuItem | undefined {
  for (const category of menuData) {
    const item = category.items.find(item => item.id === id);
    if (item) return item;
  }
  return undefined;
}
