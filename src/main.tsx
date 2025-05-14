
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Componente para fazer scroll para o topo ao mudar de página
function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

// Modificar o App para incluir o ScrollToTop
const AppWithScrollToTop = () => (
  <>
    <ScrollToTop />
    <App />
  </>
);

createRoot(document.getElementById("root")!).render(<AppWithScrollToTop />);
