
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { ReservationFormData } from '@/types';

export function useReservationForm() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const initialFormData: ReservationFormData = {
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: 1,
    special_requests: ''
  };

  const [formData, setFormData] = useState<ReservationFormData>(initialFormData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
  };

  // Get today's date in YYYY-MM-DD format for min date
  const today = new Date().toISOString().split('T')[0];
  
  // Get date 3 months from now for max date
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 3);
  const maxDateString = maxDate.toISOString().split('T')[0];

  return {
    formData,
    isSubmitting,
    handleChange,
    handleSubmit,
    today,
    maxDateString
  };
}
