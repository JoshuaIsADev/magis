import { useContext } from 'react';
import SignOut from '../features/authentication/SignOut';
import styled from 'styled-components';
import StyledLink from './StyledLink';
import { UserContext } from '../context/userContext';
import { useUser } from '../features/authentication/useUser';
import { useSignOut } from '../features/authentication/useSignOut';
import Hr from './Hr';
import { CartContext } from '../context/cartContext';

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: var(--width-max);
  margin: 0 auto;
  padding: var(--padding-s) var(--padding-s) 0;
`;

const Ul = styled.ul`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  align-items: center;
  font-size: 1.5rem;
`;

function Header() {
  const { currentUser } = useContext(UserContext);
  const { cartItems } = useContext(CartContext);
  const cartItemsCount = cartItems.length;
  const { isAuthenticated } = useUser();
  const { signOut, isPending } = useSignOut();

  let cartItemQuantityArray = [];
  let cartItemQuantity = 0;
  for (const cartItem of cartItems) {
    cartItemQuantityArray.push(cartItem.quantity);
  }
  for (let i = 0; i < cartItemQuantityArray.length; i++) {
    cartItemQuantity += cartItemQuantityArray[i];
  }

  return (
    <>
      <StyledHeader>
        <h2>Magis</h2>
        <nav>
          <Ul>
            <li className='mainNav'>
              <StyledLink $variation='header' to='/'>
                Shop
              </StyledLink>
            </li>
            |
            {/* <li>
            <StyledLink $variation='header' to='/signin'>
            Sign In
            </StyledLink>
          </li> */}
            <li disabled={isPending}>
              {isAuthenticated ? (
                <StyledLink $variation='header' onClick={signOut}>
                  Sign Out
                </StyledLink>
              ) : (
                <StyledLink $variation='header' to='/signin'>
                  Sign In
                </StyledLink>
              )}
            </li>
            |
            <li disabled={isPending}>
              {isAuthenticated ? (
                <StyledLink $variation='header' to='/manage'>
                  Manage
                </StyledLink>
              ) : (
                <StyledLink $variation='header' to='/cart'>
                  Cart {cartItemQuantity > 0 ? `(${cartItemQuantity})` : ''}
                </StyledLink>
              )}
            </li>
            {/* <li>
            <StyledLink $variation='header' to='/manage'>Manage</StyledLink>
          </li> */}
          </Ul>
        </nav>
      </StyledHeader>
      <Hr />
    </>
  );
}

export default Header;
