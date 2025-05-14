
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface ReservationDetailFieldsProps {
  formData: {
    guests: number;
    date: string;
    time: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  today: string;
  maxDateString: string;
}

const ReservationDetailFields: React.FC<ReservationDetailFieldsProps> = ({ 
  formData, 
  handleChange, 
  today, 
  maxDateString 
}) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="guests">Número de pessoas</Label>
        <select
          id="guests"
          name="guests"
          value={formData.guests}
          onChange={handleChange}
          required
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
            <option key={num} value={num}>
              {num} {num === 1 ? 'pessoa' : 'pessoas'}
            </option>
          ))}
          <option value="11">Mais de 10 pessoas</option>
        </select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="date">Data</Label>
        <Input
          id="date"
          name="date"
          type="date"
          min={today}
          max={maxDateString}
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="time">Hora</Label>
        <select
          id="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <option value="">Selecione o horário</option>
          {[
            "18:00", "18:30", "19:00", "19:30", "20:00", 
            "20:30", "21:00", "21:30", "22:00"
          ].map(time => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default ReservationDetailFields;
