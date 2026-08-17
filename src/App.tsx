import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './router';

// basename ตาม base path ของ Vite (import.meta.env.BASE_URL) — ใช้กับ GitHub Pages
const basename = (() => {
  const b = import.meta.env.BASE_URL || '/';
  return b === '/' ? '/' : b.replace(/\/+$/, '');
})();

export default function App() {
  return (
    <BrowserRouter basename={basename}>
      <AppRoutes />
    </BrowserRouter>
  );
}
