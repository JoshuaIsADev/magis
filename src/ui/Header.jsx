import { useContext } from 'react';
import SignOut from '../features/authentication/SignOut';
import styled from 'styled-components';
import StyledLink from './StyledLink';
import { UserContext } from '../context/user';
import { useUser } from '../features/authentication/useUser';

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: 0 auto;
`;

const Ul = styled.ul`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;

function Header() {
  const { currentUser } = useContext(UserContext);
  // console.log(currentUser);
  const { isPending, isAuthenticated } = useUser();
  console.log(isAuthenticated);
  return (
    <StyledHeader>
      <h2>Magis</h2>
      <nav>
        <Ul>
          <li className='mainNav'>
            <StyledLink $variation='header' to='/'>
              Shop
            </StyledLink>
          </li>
          <li>
            <StyledLink $variation='header' to='/signin'>
              Sign In
            </StyledLink>
          </li>
          <li>
            <StyledLink $variation='header' to='/cart'>
              Cart
            </StyledLink>
          </li>
          <li>{isAuthenticated ? <SignOut /> : ''}</li>

          {/* <li>
            <StyledLink $variation='header' to='/manage'>Manage</StyledLink>
          </li> */}
        </Ul>
      </nav>
    </StyledHeader>
  );
}

export default Header;
