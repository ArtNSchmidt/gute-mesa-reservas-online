
import { ReservationFormData } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

export async function submitReservation(values: ReservationFormData): Promise<string> {
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
    menu_items: values.menu_items.length > 0 ? values.menu_items : null,
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
  
  return id;
}
