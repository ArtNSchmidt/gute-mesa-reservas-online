
import { useToast, toast } from "@/hooks/use-toast";

// Exportando com configurações padrão melhoradas
const enhancedToast = {
  ...toast,
  success: (message: string) => 
    toast({
      title: "Sucesso",
      description: message,
      variant: "default",
      className: "bg-green-50 border-green-200 text-green-800"
    }),
  error: (message: string) => 
    toast({
      title: "Erro",
      description: message,
      variant: "destructive"
    }),
  info: (message: string) => 
    toast({
      title: "Informação",
      description: message,
      variant: "default",
      className: "bg-blue-50 border-blue-200 text-blue-800"
    }),
  warning: (message: string) => 
    toast({
      title: "Atenção",
      description: message,
      variant: "default",
      className: "bg-yellow-50 border-yellow-200 text-yellow-800"
    })
};

export { useToast, enhancedToast as toast };
