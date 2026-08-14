import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import MainLayout from '@storefront/layouts/MainLayout/MainLayout';
import { productsNavLinks } from './storefront/data/navigation';

const Home = lazy(() => import('@storefront/pages/Home/Home'));
const Products = lazy(() => import('@storefront/pages/Products/Products'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="container">Loading...</div>}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
          </Route>
          <Route path="/" element={<MainLayout navOptions={productsNavLinks} />}>
            <Route path="productos" element={<Products />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
