import { NavLink } from 'react-router-dom';
import SignOut from '../features/authentication/SignOut';

function Header() {
  return (
    <header>
      <h2>Magis</h2>
      <nav>
        <ul>
          <li>
            <NavLink to='/'>Shop</NavLink>
          </li>
          <li>
            <NavLink to='/signin'>Sign In</NavLink>
          </li>
          <li>
            <NavLink to='/cart'>Cart</NavLink>
          </li>
          <li>
            <SignOut />
          </li>
          {/* <li>
            <NavLink to='/manage'>Manage</NavLink>
          </li> */}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
