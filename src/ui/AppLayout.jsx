import { Outlet } from 'react-router-dom';
import Header from './Header';
import { HeadingProvider } from '../context/headingContext';
import Footer from './Footer';
import styled from 'styled-components';

// const Main = styled.div`
//   display: grid;
//   grid-template-columns: repeat(4, 1fr);
//   grid-template-rows: auto;
//   /* border-right: var(--border); */
//   /* border-left: var(--border); */
//   /* & > * {
//     border-bottom: var(--border);
//   } */
// `;

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
