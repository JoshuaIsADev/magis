import { useContext, useEffect, useRef, useState } from 'react';
import SignOut from '../features/authentication/SignOut';
import styled from 'styled-components';
import StyledLink from './StyledLink';
import { UserContext } from '../context/userContext';
import { useUser } from '../features/authentication/useUser';
import { useSignOut } from '../features/authentication/useSignOut';
import { CartContext } from '../context/cartContext';
import Heading from './Heading';
import { Link } from 'react-router-dom';
import { HeadingContext } from '../context/headingContext';

const StyledHeader = styled.header`
  position: fixed;
  width: 100vw;
  padding: var(--padding-s) var(--padding-s);
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  max-width: var(--width-max);
  width: 100%;
  margin: 0 auto;
  padding-right: 1rem;
`;

const Ul = styled.ul`
  display: flex;
  flex-direction: row;
  gap: 2rem;
  align-items: center;
  font-size: 1rem;
`;

function Header() {
  const { currentUser } = useContext(UserContext);
  const { cartItems } = useContext(CartContext);
  const { headingColor } = useContext(HeadingContext);
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
    <>
      <StyledHeader>
        <Nav>
          <StyledLink $variation='headerLogo' to='/' $color={headingColor}>
            Magis
          </StyledLink>
          <Ul>
            <li>
              <StyledLink $variation='header' to='/' $color={headingColor}>
                Shop
              </StyledLink>
            </li>

            <li disabled={isPending}>
              {isAuthenticated ? (
                <StyledLink
                  $variation='header'
                  $color={headingColor}
                  onClick={signOut}
                >
                  Sign Out
                </StyledLink>
              ) : (
                <StyledLink
                  $variation='header'
                  to='/signin'
                  $color={headingColor}
                >
                  Sign In
                </StyledLink>
              )}
            </li>

            {admin ? (
              <li disabled={isPending}>
                <StyledLink
                  $variation='header'
                  to='/manage'
                  $color={headingColor}
                >
                  Manage
                </StyledLink>
              </li>
            ) : (
              <>
                <li disabled={isPending}>
                  <StyledLink
                    $variation='header'
                    to='/orders'
                    $color={headingColor}
                  >
                    Orders
                  </StyledLink>
                </li>

                <li disabled={isPending}>
                  <StyledLink
                    $variation='header'
                    to='/cart'
                    $color={headingColor}
                  >
                    Cart {cartItemQuantity > 0 ? `(${cartItemQuantity})` : ''}
                  </StyledLink>
                </li>
              </>
            )}
          </Ul>
        </Nav>
      </StyledHeader>
    </>
  );
}

export default Header;
