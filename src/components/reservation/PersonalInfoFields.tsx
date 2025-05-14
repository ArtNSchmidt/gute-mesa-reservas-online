
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FieldErrors } from 'react-hook-form';
import { ReservationFormValues } from '@/hooks/useReservationForm';

interface PersonalInfoFieldsProps {
  formData: {
    name: string;
    email: string;
    phone: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors?: FieldErrors<ReservationFormValues>;
}

const PersonalInfoFields: React.FC<PersonalInfoFieldsProps> = ({ 
  formData, 
  handleChange, 
  errors 
}) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="name">Nome completo</Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Seu nome completo"
          className={errors?.name ? "border-red-500" : ""}
        />
        {errors?.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="seu.email@exemplo.com"
          className={errors?.email ? "border-red-500" : ""}
        />
        {errors?.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="phone">Telefone</Label>
        <Input
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          placeholder="(00) 00000-0000"
          className={errors?.phone ? "border-red-500" : ""}
        />
        {errors?.phone && (
          <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
        )}
      </div>
    </>
  );
};

export default PersonalInfoFields;
