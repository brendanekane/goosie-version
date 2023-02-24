import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutAndRemoveSession } from '../../store/session';
import './ProfileButton.css';

const ProfileButton = () => {
  const dispatch = useDispatch(),
    [showMenu, setShowMenu] = useState(false),
    sessionUser = useSelector((state) => state.session.user);

  const handleIconClick = () => {
    setShowMenu(!showMenu);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logoutAndRemoveSession());
    setShowMenu(false);
  };

  let dropdown;

  if (showMenu) {
    dropdown = (
      <div className="session-dropdown-menu">
        <p>{sessionUser.email}</p>
        <p>{sessionUser.username}</p>
        <button onClick={handleLogout}>logout</button>
      </div>
    );
  } else {
    dropdown = null;
  }

  return (
    <>
      <div className="profile-icon-container">
        <i className="fa-solid fa-user" onClick={handleIconClick}></i>
      </div>
      {dropdown}
    </>
  );
};

export default ProfileButton;
