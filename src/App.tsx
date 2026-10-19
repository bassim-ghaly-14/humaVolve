import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AppProvider } from './components/providers/AppProvider';
import { ShopCartProvider } from './components/shop/ShopCartProvider';
import { Navbar } from './components/layout/Navbar';
import { AcademyLauncher } from './components/academy/AcademyLauncher';
import Home from './pages/Home';
import HumaVolve from './pages/HumaVolve';
import AssignmentDetails from './pages/AssignmentDetails';
import About from './pages/About';
import Collections from './pages/Collections';
import Contact from './pages/Contact';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import { ROUTES } from './constants/routes';

/**
 * Root application composition.
 * HashRouter keeps deep links working on GitHub Pages without a 404 fallback.
 * /shop is the canonical storefront; /products is a legacy alias.
 * ShopCartProvider lifts the cart state above the routes so the Shop page
 * and the dedicated /cart page share one live cart.
 */
function App() {
  return (
    <AppProvider>
      <ShopCartProvider>
        <HashRouter>
          <Navbar />
          <Routes>
            <Route path={ROUTES.SHOP} element={<Products />} />
            <Route path={ROUTES.PRODUCTS} element={<Products />} />
            <Route path={ROUTES.CART} element={<Cart />} />
            <Route path={ROUTES.PRODUCT_DETAIL_PATTERN} element={<ProductDetails />} />
            <Route path={ROUTES.ASSIGNMENT_DETAIL_PATTERN} element={<AssignmentDetails />} />
            <Route path={ROUTES.COLLECTIONS} element={<Collections />} />
            <Route path={ROUTES.CONTACT} element={<Contact />} />
            <Route path={ROUTES.HOME} element={<Home />} />
            <Route path={ROUTES.HUMAVOLVE} element={<HumaVolve />} />
            <Route path={ROUTES.ABOUT} element={<About />} />
            <Route path="*" element={<Navigate to={ROUTES.SHOP} replace />} />
          </Routes>
          <AcademyLauncher />
        </HashRouter>
      </ShopCartProvider>
    </AppProvider>
  );
}

export default App;

