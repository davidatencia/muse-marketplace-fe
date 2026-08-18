import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import Loader from '@shared/components/ui/Loader/Loader';
import LoadingProvider from '@shared/context/LoadingProvider/LoadingProvider';
import MainLayout from '@public/storefront/layouts/MainLayout/MainLayout';
import { productsNavLinks } from '@public/storefront/data/navigation';

const Home = lazy(() => import('@public/storefront/pages/Home/Home'));
const Products = lazy(() => import('@public/storefront/pages/Products/Products'));
const Login = lazy(() => import('@public/auth/pages/Login/Login'));

function App() {
  return (
    <LoadingProvider>
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
            </Route>
            <Route
              path="/"
              element={<MainLayout navOptions={productsNavLinks} />}
            >
              <Route path="productos" element={<Products />} />
            </Route>
            <Route path="/login" element={<Login />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </LoadingProvider>
  );
}

export default App;
