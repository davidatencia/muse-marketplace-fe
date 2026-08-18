import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import Loader from '@shared/components/ui/Loader/Loader';
import LoadingProvider from '@shared/context/LoadingProvider/LoadingProvider';
import MainLayout from '@public/storefront/layouts/MainLayout/MainLayout';
import { productsNavLinks } from '@public/storefront/data/navigation';
import ProtectedRoute from '@shared/components/routing/ProtectedRoute';

const Home = lazy(() => import('@public/storefront/pages/Home/Home'));
const Products = lazy(() => import('@public/storefront/pages/Products/Products'));
const Login = lazy(() => import('@public/auth/pages/Login/Login'));
const DashboardLayout = lazy(
  () => import('@private/dashboard/layouts/DashboardLayout/DashboardLayout'),
);
const Overview = lazy(() => import('@private/dashboard/pages/Overview/Overview'));
const Categories = lazy(() => import('@private/dashboard/pages/Categories/Categories'));
const Materials = lazy(() => import('@private/dashboard/pages/Materials/Materials'));
const Accessories = lazy(
  () => import('@private/dashboard/pages/Accessories/Accessories'),
);
const AccessoryFormPage = lazy(
  () => import('@private/dashboard/pages/AccessoryFormPage/AccessoryFormPage'),
);

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
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={<Overview />} />
                <Route path="categorias" element={<Categories />} />
                <Route path="materiales" element={<Materials />} />
                <Route path="accesorios" element={<Accessories />} />
                <Route path="accesorios/nuevo" element={<AccessoryFormPage />} />
                <Route path="accesorios/:id/editar" element={<AccessoryFormPage />} />
              </Route>
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </LoadingProvider>
  );
}

export default App;
