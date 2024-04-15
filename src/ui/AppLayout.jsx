import { Outlet } from 'react-router-dom';
import Header from './Header';
import { HeadingProvider } from '../context/headingContext';

function AppLayout() {
  return (
    <div>
      <HeadingProvider>
        <Header />
        <main>
          <Outlet />
        </main>
      </HeadingProvider>
    </div>
  );
}

export default AppLayout;
