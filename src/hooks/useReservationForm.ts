
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReservationFormData, OrderItem } from '@/types';
import { toast } from '@/components/ui/use-toast';
import { MenuItem } from '@/utils/menuData';
import { reservationSchema } from '@/schemas/reservationSchema';
import { addMenuItem, removeMenuItem, updateMenuItemQuantity } from '@/utils/menuItemsManager';
import { submitReservation } from '@/utils/reservationSubmitter';

export const useReservationForm = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Datas para o seletor de datas
  const today = new Date();
  const maxDate = new Date();
  maxDate.setMonth(today.getMonth() + 3);
  
  const todayString = today.toISOString().split('T')[0];
  const maxDateString = maxDate.toISOString().split('T')[0];

  const form = useForm<ReservationFormData>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      date: todayString,
      time: '19:00',
      guests: 2,
      special_requests: '',
      menu_items: []
    }
  });

  const formState = form.formState;
  const [formData, setFormData] = useState<ReservationFormData>(form.getValues());

  // Manipular mudanças no formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    let parsedValue: any = value;
    if (name === 'guests') {
      parsedValue = parseInt(value, 10);
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: parsedValue
    }));
    
    form.setValue(name as keyof ReservationFormData, parsedValue);
  };

  // Gerenciar itens do menu
  const handleAddMenuItem = (item: MenuItem) => {
    const updatedItems = addMenuItem(formData.menu_items, item);
    setFormData(prev => ({ ...prev, menu_items: updatedItems }));
    form.setValue('menu_items', updatedItems);
  };

  const handleRemoveMenuItem = (itemId: string) => {
    const updatedItems = removeMenuItem(formData.menu_items, itemId);
    setFormData(prev => ({ ...prev, menu_items: updatedItems }));
    form.setValue('menu_items', updatedItems);
  };

  const handleUpdateMenuItemQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) return handleRemoveMenuItem(itemId);
    
    const updatedItems = updateMenuItemQuantity(formData.menu_items, itemId, quantity);
    setFormData(prev => ({ ...prev, menu_items: updatedItems }));
    form.setValue('menu_items', updatedItems);
  };

  // Processar submissão do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const validatedData = await form.trigger();
      
      if (!validatedData) {
        // Mostrar erro de validação
        toast({
          variant: "destructive",
          title: "Erro na validação",
          description: "Por favor, verifique os campos do formulário.",
        });
        return;
      }
      
      setIsSubmitting(true);
      
      // Valores do formulário
      const values = form.getValues();
      
      // Enviar reserva
      const reservationId = await submitReservation(values);
      
      // Redirecionar para página de confirmação
      navigate(`/confirmation/${reservationId}`);
      
    } catch (error) {
      console.error('Error submitting reservation:', error);
      
      toast({
        variant: "destructive",
        title: "Erro ao enviar reserva",
        description: "Ocorreu um problema ao processar sua reserva. Tente novamente mais tarde.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    formData,
    isSubmitting,
    handleChange,
    handleSubmit,
    handleAddMenuItem,
    handleRemoveMenuItem,
    handleUpdateMenuItemQuantity,
    today: todayString,
    maxDateString,
    formState
  };
};

export default useReservationForm;
