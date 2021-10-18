import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { signout } from '../../redux/actions';
import { RootState } from '../../redux/reducers';

const Header = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);

  const logout = () => {
    dispatch(signout());
  };

  const renderLoggedInLinks = () => {
    return (
      <div>
        <span onClick={logout}>Signout</span>
      </div>
    );
  };

  const renderNonLoggedInLinks = () => {
    return (
      <div>
        <NavLink to="signin">Signin</NavLink>
        <br />
        <NavLink to="signup">Signup</NavLink>
      </div>
    );
  };
  return (
    <div className="header">
      <p className="headerTitle">Welcome to admin Dashboard</p>
      <p>
        {' '}
        {auth.authenticate ? (
          <div className="signout">{renderLoggedInLinks()}</div>
        ) : (
          renderNonLoggedInLinks()
        )}{' '}
      </p>
    </div>
  );
};

export default Header;
