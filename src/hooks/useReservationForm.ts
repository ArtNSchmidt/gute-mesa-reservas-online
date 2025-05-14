
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// Schema de validação com Zod
const reservationFormSchema = z.object({
  name: z.string().min(3, { message: 'Nome deve ter pelo menos 3 caracteres' }),
  email: z.string().email({ message: 'Email inválido' }),
  phone: z.string().min(10, { message: 'Telefone inválido' }),
  date: z.string().min(1, { message: 'Data é obrigatória' }),
  time: z.string().min(1, { message: 'Horário é obrigatório' }),
  guests: z.coerce.number().min(1).max(20, { message: 'Máximo de 20 pessoas' }),
  special_requests: z.string().optional(),
});

export type ReservationFormValues = z.infer<typeof reservationFormSchema>;

export function useReservationForm() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Get today's date in YYYY-MM-DD format for min date
  const today = new Date().toISOString().split('T')[0];
  
  // Get date 3 months from now for max date
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 3);
  const maxDateString = maxDate.toISOString().split('T')[0];

  // Inicializa o React Hook Form
  const form = useForm<ReservationFormValues>({
    resolver: zodResolver(reservationFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      guests: 1,
      special_requests: ''
    }
  });

  const handleSubmit = form.handleSubmit((formData) => {
    setIsSubmitting(true);

    // In a real application, this would be an API call
    setTimeout(() => {
      // Create reservation object with all data
      const reservationData = {
        ...formData,
        id: `res-${Date.now()}`,
        status: 'pending',
        createdAt: new Date().toISOString()
      };
      
      // Get existing reservations from localStorage or initialize empty array
      const existingReservations = JSON.parse(localStorage.getItem('reservations') || '[]');
      
      // Add new reservation
      localStorage.setItem('reservations', JSON.stringify([...existingReservations, reservationData]));
      
      setIsSubmitting(false);
      toast({
        title: "Solicitação enviada!",
        description: "Sua reserva foi recebida e está em análise.",
      });
      
      // Redirect to confirmation page with reservation ID
      navigate(`/confirmation/${reservationData.id}`);
    }, 1500);
  });

  // Para manter compatibilidade com componentes existentes
  const formData = {
    name: form.watch('name'),
    email: form.watch('email'),
    phone: form.watch('phone'),
    date: form.watch('date'),
    time: form.watch('time'),
    guests: form.watch('guests'),
    special_requests: form.watch('special_requests')
  };

  // Função de manipulação de mudanças para manter compatibilidade com componentes existentes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    form.setValue(name as keyof ReservationFormValues, value);
  };

  return {
    form,
    formData,
    isSubmitting,
    handleChange,
    handleSubmit,
    today,
    maxDateString,
    formState: form.formState,
  };
}
