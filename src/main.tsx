import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './index.css';
import App from './App';
import Procesar from './pages/procesar';
import GraficaVotos from './pages/graficar';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/procesar" element={<Procesar />} />
      <Route path="/graficar" element={<GraficaVotos />} />
    </Routes>
  </BrowserRouter>
);