
import { z } from 'zod';

export const reservationSchema = z.object({
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
  special_requests: z.string().optional(),
  menu_items: z.array(z.object({
    id: z.string(),
    item_id: z.string(),
    quantity: z.number().min(1),
    name: z.string(),
    price: z.number().optional()
  })).optional().default([])
});

export type ReservationFormSchema = z.infer<typeof reservationSchema>;
