
import React from 'react';
import { Button } from '@/components/ui/button';

interface SubmitButtonProps {
  isSubmitting: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ isSubmitting }) => {
  return (
    <>
      <Button 
        type="submit" 
        className="w-full bg-restaurant-dark-teal hover:bg-restaurant-dark-gray text-white py-6"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Enviando...' : 'Solicitar Reserva'}
      </Button>
      
      <p className="text-sm text-center text-gray-500">
        Reservas estão sujeitas à disponibilidade. Enviaremos uma confirmação por email.
      </p>
    </>
  );
};

export default SubmitButton;
