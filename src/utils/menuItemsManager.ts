
import { v4 as uuidv4 } from 'uuid';
import { OrderItem } from '@/types';
import { MenuItem } from '@/utils/menuData';

export function addMenuItem(currentItems: OrderItem[], item: MenuItem): OrderItem[] {
  const existingItemIndex = currentItems.findIndex(
    i => i.item_id === item.id
  );

  if (existingItemIndex >= 0) {
    // Se o item já existe, incrementar a quantidade
    const updatedItems = [...currentItems];
    updatedItems[existingItemIndex].quantity += 1;
    return updatedItems;
  } else {
    // Se não existe, adicionar à lista
    const newItem: OrderItem = {
      id: uuidv4(),
      item_id: item.id,
      name: item.title,
      quantity: 1,
      price: item.price
    };
    return [...currentItems, newItem];
  }
}

export function removeMenuItem(currentItems: OrderItem[], itemId: string): OrderItem[] {
  const existingItemIndex = currentItems.findIndex(
    i => i.item_id === itemId
  );

  if (existingItemIndex >= 0) {
    const updatedItems = [...currentItems];
    if (updatedItems[existingItemIndex].quantity > 1) {
      // Se há mais de um item, decrementar a quantidade
      updatedItems[existingItemIndex].quantity -= 1;
      return updatedItems;
    } else {
      // Se há apenas um, remover da lista
      return currentItems.filter((_, index) => index !== existingItemIndex);
    }
  }
  
  return currentItems; // Retorna a lista original se o item não for encontrado
}

export function updateMenuItemQuantity(currentItems: OrderItem[], itemId: string, quantity: number): OrderItem[] {
  if (quantity <= 0) {
    // Se a quantidade for zero ou negativa, remover o item
    return currentItems.filter(item => item.item_id !== itemId);
  }

  const existingItemIndex = currentItems.findIndex(
    i => i.item_id === itemId
  );

  if (existingItemIndex >= 0) {
    const updatedItems = [...currentItems];
    updatedItems[existingItemIndex].quantity = quantity;
    return updatedItems;
  }
  
  return currentItems; // Retorna a lista original se o item não for encontrado
}
