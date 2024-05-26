import { useContext } from 'react';
import styled from 'styled-components';
import StyledLink from './StyledLink';
import { UserContext } from '../context/userContext';
import { useUser } from '../features/authentication/useUser';
import { useSignOut } from '../features/authentication/useSignOut';
import { CartContext } from '../context/cartContext';

const StyledHeader = styled.header`
  position: fixed;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: var(--grid-gap);
  background-color: var(--color-grey-0);
  padding: var(--padding-body);
  z-index: 15;
`;

const ColumnLogo = styled.div`
  grid-column: 1 / span 2;
`;

const ColumnHeader = styled.div`
  grid-column: span 1;
`;

function Header() {
  const { currentUser } = useContext(UserContext);
  const { cartItems } = useContext(CartContext);
  const cartItemsCount = cartItems.length;
  const { user, isAuthenticated } = useUser();
  const admin = user?.email === 'admin@test.com';
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
    <StyledHeader>
      <ColumnLogo>
        <StyledLink $variation='headerLogo' to='/'>
          Magis
        </StyledLink>
      </ColumnLogo>

      <ColumnHeader>
        <StyledLink $variation='header' to='/'>
          Products
        </StyledLink>
      </ColumnHeader>

      <ColumnHeader disabled={isPending}>
        {isAuthenticated ? (
          <StyledLink $variation='header' onClick={signOut}>
            Sign Out
          </StyledLink>
        ) : (
          <StyledLink $variation='header' to='/signin'>
            Sign In
          </StyledLink>
        )}
      </ColumnHeader>
      {admin ? (
        <ColumnHeader disabled={isPending}>
          <StyledLink $variation='header' to='/manage'>
            Manage
          </StyledLink>
        </ColumnHeader>
      ) : (
        <>
          <ColumnHeader disabled={isPending}>
            <StyledLink $variation='header' to='/orders'>
              Orders
            </StyledLink>
          </ColumnHeader>

          <ColumnHeader disabled={isPending}>
            <StyledLink $variation='header' to='/cart'>
              Cart {cartItemQuantity > 0 ? `(${cartItemQuantity})` : ''}
            </StyledLink>
          </ColumnHeader>
        </>
      )}
    </StyledHeader>
  );
}

export default Header;
