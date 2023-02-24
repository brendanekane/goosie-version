import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';

const Navigation = ({ isLoaded }) => {
  const sessionUser = useSelector((state) => state.session.user);
  let sessionLinks;

  if (sessionUser) {
    sessionLinks = <ProfileButton />;
  } else {
    sessionLinks = (
      <>
        <li>
          <LoginFormModal />
        </li>
        <li>
          <NavLink exact to="/signup">
            Signup
          </NavLink>
        </li>
      </>
    );
  }

  return (
    <ol>
      <li>
        <NavLink exact to="/">
          Home
        </NavLink>
      </li>
      {isLoaded && sessionLinks}
    </ol>
  );
};

export default Navigation;
