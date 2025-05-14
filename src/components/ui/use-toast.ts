
import { useToast } from "@/hooks/use-toast";
import { toast as hookToast } from "@/hooks/use-toast";
import type { ToasterToast } from "@/hooks/use-toast";

// Função base para criar toasts com estilos consistentes
const createStyledToast = (
  title: string,
  message: string,
  className?: string,
  variant: "default" | "destructive" = "default"
) => {
  return hookToast({
    title,
    description: message,
    variant,
    className
  });
};

// Exportando uma função toast modificada com métodos de conveniência
const toast = (props: Parameters<typeof hookToast>[0]) => {
  return hookToast(props);
};

// Adicionando métodos auxiliares ao objeto toast
toast.success = (message: string) => 
  createStyledToast("Sucesso", message, "bg-green-50 border-green-200 text-green-800");

toast.error = (message: string) => 
  createStyledToast("Erro", message, undefined, "destructive");

toast.info = (message: string) => 
  createStyledToast("Informação", message, "bg-blue-50 border-blue-200 text-blue-800");

toast.warning = (message: string) => 
  createStyledToast("Atenção", message, "bg-yellow-50 border-yellow-200 text-yellow-800");

export { useToast, toast };
