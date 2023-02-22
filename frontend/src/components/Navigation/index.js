import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';

const Navigation = () => {
  const sessionUser = useSelector((state) => state.session.user);
  let sessionLinks;

  if (sessionUser) {
    sessionLinks = <ProfileButton />;
  } else {
    sessionLinks = (
      <>
        <li>
          <NavLink exact to="/login">
            Login
          </NavLink>
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
      {sessionLinks}
    </ol>
  );
};

export default Navigation;
