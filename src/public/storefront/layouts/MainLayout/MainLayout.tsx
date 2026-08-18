import { Outlet } from 'react-router';
import Footer from '@public/storefront/components/layout/Footer/Footer';
import Header from '@public/storefront/components/layout/Header/Header';
import { contactDetails } from '@public/storefront/data/contact';
import { navLinks } from '@public/storefront/data/navigation';
import type { NavLink } from '@public/storefront/types/content';

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
