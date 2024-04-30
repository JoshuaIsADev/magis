import { useContext, useEffect, useRef, useState } from 'react';
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
  grid-template-columns: repeat(2, 1fr);
  border-right: var(--border);
  border-left: var(--border);
  border-bottom: var(--border);
  padding: 2rem;
  background-color: var(--color-grey-0);
  z-index: 15;
`;

const HeaderLogo = styled.nav`
  grid-column: span 1;
`;

const HeaderNav = styled.nav`
  grid-column: span 1;
`;

const Ul = styled.ul`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 2rem;
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
      <HeaderLogo>
        <StyledLink $variation='headerLogo' to='/'>
          Magis
        </StyledLink>
      </HeaderLogo>
      <HeaderNav>
        <Ul>
          <li>
            <StyledLink $variation='header' to='/'>
              Shop
            </StyledLink>
          </li>

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
          {admin ? (
            <li disabled={isPending}>
              <StyledLink $variation='header' to='/manage'>
                Manage
              </StyledLink>
            </li>
          ) : (
            <>
              <li disabled={isPending}>
                <StyledLink $variation='header' to='/orders'>
                  Orders
                </StyledLink>
              </li>

              <li disabled={isPending}>
                <StyledLink $variation='header' to='/cart'>
                  Cart {cartItemQuantity > 0 ? `(${cartItemQuantity})` : ''}
                </StyledLink>
              </li>
            </>
          )}
        </Ul>
      </HeaderNav>
    </StyledHeader>
  );
}

export default Header;
