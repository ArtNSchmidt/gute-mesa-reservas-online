
import React, { useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { OrderItem } from "@/types";
import { MenuItem, MenuCategory } from "@/utils/menuData";
import { Plus, Minus } from "lucide-react";

interface MenuItemSelectProps {
  categories: MenuCategory[];
  selectedItems: OrderItem[];
  onAddItem: (item: MenuItem) => void;
  onRemoveItem: (itemId: string) => void;
  onUpdateQuantity: (itemId: string, quantity: number) => void;
}

const MenuItemSelect: React.FC<MenuItemSelectProps> = ({
  categories,
  selectedItems,
  onAddItem,
  onRemoveItem,
  onUpdateQuantity
}) => {
  // Função para verificar se um item está selecionado e obter sua quantidade
  const getSelectedQuantity = (itemId: string): number => {
    const found = selectedItems.find(item => item.item_id === itemId);
    return found ? found.quantity : 0;
  };

  return (
    <div className="w-full mt-6">
      <h3 className="text-lg font-medium mb-4">Selecione os itens do cardápio (opcional)</h3>
      
      <Tabs defaultValue={categories[0]?.name || ""} className="w-full">
        <TabsList className="w-full max-w-full h-auto flex flex-wrap mb-4">
          {categories.map((category) => (
            <TabsTrigger
              key={category.name}
              value={category.name}
              className="text-sm py-2 px-4"
              onClick={(e) => {
                // Previne o comportamento padrão que pode causar navegação
                e.preventDefault();
              }}
            >
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {categories.map((category) => (
          <TabsContent key={category.name} value={category.name} className="mt-0">
            <div className="grid grid-cols-1 gap-3">
              {category.items.map((item) => {
                const quantity = getSelectedQuantity(item.id);
                
                return (
                  <Card key={item.id} className="overflow-hidden border-neutral-100">
                    <CardContent className="p-4 flex justify-between items-center">
                      <div className="flex-1">
                        <div className="font-medium">{item.title}</div>
                        {item.description && (
                          <p className="text-sm text-neutral-500 mt-1">{item.description}</p>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {quantity > 0 ? (
                          <>
                            <Button
                              size="icon"
                              variant="outline"
                              className="h-8 w-8 rounded-full"
                              onClick={(e) => {
                                e.preventDefault(); // Previne navegação
                                onRemoveItem(item.id);
                              }}
                              type="button" // Explicitamente define como button para evitar submit do form
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            
                            <span className="w-8 text-center">{quantity}</span>
                            
                            <Button
                              size="icon"
                              variant="outline"
                              className="h-8 w-8 rounded-full"
                              onClick={(e) => {
                                e.preventDefault(); // Previne navegação
                                onAddItem(item);
                              }}
                              type="button" // Explicitamente define como button para evitar submit do form
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            className="rounded-full"
                            onClick={(e) => {
                              e.preventDefault(); // Previne navegação
                              onAddItem(item);
                            }}
                            type="button" // Explicitamente define como button para evitar submit do form
                          >
                            <Plus className="h-4 w-4 mr-1" /> Adicionar
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        ))}
      </Tabs>
      
      {selectedItems.length > 0 && (
        <div className="mt-4 border-t border-neutral-200 pt-4">
          <h4 className="font-medium mb-2">Itens selecionados:</h4>
          <div className="bg-neutral-50 p-3 rounded-md">
            {selectedItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center mb-2 last:mb-0">
                <span>{item.name} x{item.quantity}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuItemSelect;
