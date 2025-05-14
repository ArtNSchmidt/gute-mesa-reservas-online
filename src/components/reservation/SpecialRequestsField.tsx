
import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface SpecialRequestsFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const SpecialRequestsField: React.FC<SpecialRequestsFieldProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="specialRequests">Solicitações especiais</Label>
      <Textarea
        id="specialRequests"
        name="specialRequests"
        value={value}
        onChange={onChange}
        placeholder="Informe se há alguma necessidade especial ou preferência"
        className="min-h-[100px]"
      />
    </div>
  );
};

export default SpecialRequestsField;
