import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Plans from './pages/Plans';
import Services from './pages/Services';
import Business from './pages/Business';
import About from './pages/About';
import Help from './pages/Help';
import Contact from './pages/Contact';
import { Legal } from './pages/Legal';
import NotFound from './pages/NotFound';

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:slug" element={<ProductDetail />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/services" element={<Services />} />
        <Route path="/business" element={<Business />} />
        <Route path="/about" element={<About />} />
        <Route path="/help" element={<Help />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Legal type="privacy" />} />
        <Route path="/terms" element={<Legal type="terms" />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
