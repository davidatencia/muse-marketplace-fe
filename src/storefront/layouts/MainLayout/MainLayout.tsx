import { Outlet } from 'react-router';
import Footer from '@storefront/components/layout/Footer/Footer';
import Header from '@storefront/components/layout/Header/Header';
import { contactDetails } from '@storefront/data/contact';
import { navLinks } from '@storefront/data/navigation';
import type { NavLink } from '@/storefront/types/content';

interface MainLayoutProps {
  navOptions?: NavLink[];
}

function MainLayout({ navOptions = navLinks }: MainLayoutProps) {
  return (
    <>
      <Header links={navOptions} />
      <main>
        <Outlet />
      </main>
      <Footer links={navLinks} contact={contactDetails} />
    </>
  );
}

export default MainLayout;
