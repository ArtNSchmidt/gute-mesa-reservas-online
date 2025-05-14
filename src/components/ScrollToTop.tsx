
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Componente para fazer scroll para o topo ao mudar de página
const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
};

export default ScrollToTop;
