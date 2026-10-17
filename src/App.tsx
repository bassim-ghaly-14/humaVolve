import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AppProvider } from './components/providers/AppProvider';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import { ROUTES } from './constants/routes';

/**
 * Root application composition.
 * HashRouter keeps deep links working on GitHub Pages without a 404 fallback.
 */
function App() {
  return (
    <AppProvider>
      <HashRouter>
        <Navbar />
        <Routes>
          <Route path={ROUTES.PRODUCTS} element={<Products />} />
          <Route path={ROUTES.PRODUCT_DETAIL_PATTERN} element={<ProductDetails />} />
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.ABOUT} element={<About />} />
          <Route path="*" element={<Navigate to={ROUTES.PRODUCTS} replace />} />
        </Routes>
        <Footer />
      </HashRouter>
    </AppProvider>
  );
}

export default App;

