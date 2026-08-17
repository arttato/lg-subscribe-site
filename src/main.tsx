import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './i18n';
import './index.css';
import App from './App';

// SPA fallback (GitHub Pages): ถ้าเข้า deep link แล้วถูก redirect จาก 404.html ให้ restore path
const savedRoute = sessionStorage.getItem('lg-sub-route');
if (savedRoute) {
  sessionStorage.removeItem('lg-sub-route');
  window.history.replaceState(null, '', savedRoute);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
