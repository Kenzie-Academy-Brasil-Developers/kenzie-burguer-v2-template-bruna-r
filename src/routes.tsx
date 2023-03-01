import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import { ProtectedRoutes } from './pages/ProtectedRoutes';
import RegisterPage from './pages/RegisterPage';
import ShopPage from './pages/ShopPage';
import { CartProvider } from './providers/CartContext/CartContext';
import { ProductsProvider } from './providers/ProductsContext/Products.Context';

const Router = () => (
  <Routes>
    <Route path='/' element={<LoginPage />} />
    <Route path='/register' element={<RegisterPage />} />
    <Route path='/shop' element={<ProtectedRoutes />}>
      <Route
        index
        element={
          <ProductsProvider>
            <CartProvider>
              <ShopPage />
            </CartProvider>
          </ProductsProvider>
        }
      />
    </Route>
  </Routes>
);

export default Router;
