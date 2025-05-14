
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReservationFormData } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

const reservationSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(10, 'Telefone inválido').max(15, 'Telefone inválido'),
  date: z.string().refine(val => {
    const selectedDate = new Date(val);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selectedDate >= today;
  }, { message: 'A data deve ser hoje ou no futuro' }),
  time: z.string().min(1, 'Horário é obrigatório'),
  guests: z.number().min(1, 'Mínimo de 1 convidado').max(20, 'Máximo de 20 convidados'),
  special_requests: z.string().optional()
});

export const useReservationForm = () => {
  const navigate = useNavigate();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Get today's date and 3 months from now for date picker boundaries
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
      special_requests: ''
    }
  });

  const formState = form.formState;
  const [formData, setFormData] = useState<ReservationFormData>(form.getValues());

  // Handle form changes
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

  // Handle form submission
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
      
      // Criar ID para a reserva
      const id = uuidv4();
      
      const newReservation = {
        id,
        user_id: id, // Usar o mesmo ID para usuários não autenticados
        name: values.name,
        email: values.email,
        phone: values.phone,
        date: values.date,
        time: values.time,
        guests: values.guests,
        special_requests: values.special_requests || null,
        status: 'pending',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      // Salvar no Supabase
      const { error } = await supabase
        .from('reservations')
        .insert([newReservation]);
        
      if (error) throw error;
      
      // Mostrar confirmação
      toast({
        title: "Reserva enviada!",
        description: "Sua reserva foi recebida. Aguarde nossa confirmação em breve.",
      });
      
      // Redirecionar para página de confirmação
      navigate(`/confirmation/${id}`);
      
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
    today: todayString,
    maxDateString,
    formState
  };
};

export default useReservationForm;
