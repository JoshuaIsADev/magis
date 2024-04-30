import { Outlet } from 'react-router-dom';
import Header from './Header';
import { HeadingProvider } from '../context/headingContext';
import Footer from './Footer';

function AppLayout() {
  return (
    <>
      <HeadingProvider>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </HeadingProvider>
    </>
  );
}

export default AppLayout;
