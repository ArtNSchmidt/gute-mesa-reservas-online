
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

interface SubmitButtonProps {
  isSubmitting: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ isSubmitting }) => {
  return (
    <>
      <Button 
        type="submit" 
        className="w-full bg-restaurant-forest-green hover:bg-restaurant-moss-green text-white py-6 shadow-md flex items-center justify-center gap-2 font-medium"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Enviando...
          </>
        ) : (
          <>
            <Check size={20} />
            Solicitar Reserva
          </>
        )}
      </Button>
      
      <p className="text-sm text-center text-gray-500 mt-4">
        Reservas estão sujeitas à disponibilidade. Enviaremos uma confirmação por email em até 24 horas.
      </p>
    </>
  );
};

export default SubmitButton;
