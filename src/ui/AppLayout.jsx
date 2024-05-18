import { Outlet } from 'react-router-dom';
import Header from './Header';
import { HeadingProvider } from '../context/headingContext';
import Footer from './Footer';
import styled from 'styled-components';

const StyledMain = styled.main`
  padding-top: var(--top);
`;

function AppLayout() {
  return (
    <>
      <Header />
      <StyledMain>
        <Outlet />
      </StyledMain>
      <Footer />
    </>
  );
}

export default AppLayout;
