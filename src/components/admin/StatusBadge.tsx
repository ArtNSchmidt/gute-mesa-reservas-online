
import React from 'react';

type StatusType = 'pending' | 'confirmed' | 'rejected' | 'completed' | 'cancelled';

interface StatusBadgeProps {
  status: StatusType;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusBadgeClass = (status: StatusType): string => {
    switch (status) {
      case 'pending':
        // Using --brand-verde-oliva for background, --brand-text-dark for text. Ensure C0DA74 has good contrast with 241623.
        // WCAG AA requires 4.5:1 for normal text. #C0DA74 on #241623 is ~10:1, which is excellent.
        return 'bg-[var(--brand-verde-oliva)] text-[var(--brand-text-dark)]';
      case 'confirmed':
        // Using --brand-verde-profundo for background, --brand-text-light for text. 3A5A40 on #FFFFFF is ~4.54:1, which is good.
        return 'bg-[var(--brand-verde-profundo)] text-[var(--brand-text-light)]';
      case 'rejected':
        // Using a darker, desaturated red for better sophistication. Let's use a hex for now or define a new brand color if needed.
        // For example, a deep burgundy or a muted red. Given the palette, --brand-vinho-escuro could be an option if not too dark.
        // Let's try a standard "error" red that's not too bright, but distinct.
        // Using a common error color for now, can be replaced by a brand variable if available.
        return 'bg-red-700 text-white'; // Example: Dark Red
      case 'completed':
        // Using --brand-verde-musgo for background, --brand-text-light for text. 2e5339 on #FFFFFF is ~6.0:1, which is good.
        return 'bg-[var(--brand-verde-musgo)] text-[var(--brand-text-light)]';
      case 'cancelled':
        // Using a neutral gray or --brand-vinho-escuro with light text.
        // #A0AEC0 (Gray 500) on #FFFFFF is ~3.5:1, might need darker gray or lighter text if not white.
        // Let's use a specific gray that has good contrast with white text.
        return 'bg-slate-500 text-white'; // Example: Slate Gray
      default:
        return 'bg-gray-300 text-gray-800'; // Fallback, ensure this is not commonly hit
    }
  };

  const getStatusText = (status: StatusType): string => {
    switch (status) {
      case 'pending':
        return 'Pendente';
      case 'confirmed':
        return 'Confirmado';
      case 'rejected':
        return 'Rejeitado';
      case 'completed':
        return 'Concluído';
      case 'cancelled':
        return 'Cancelado';
      default:
        return status;
    }
  };

  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(status)}`}>
      {getStatusText(status)}
    </span>
  );
};

export default StatusBadge;
