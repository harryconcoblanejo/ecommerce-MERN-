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
      <div className="signout" onClick={logout}>
        <span>Signout</span>
      </div>
    );
  };

  const renderNonLoggedInLinks = () => {
    return (
      <>
        <NavLink className="signin" to="signin">
          Signin
        </NavLink>
        <br />
        <NavLink className="signup" to="signup">
          Signup
        </NavLink>
      </>
    );
  };
  return (
    <div className="header">
      <p className="headerTitle">Welcome to admin Dashboard</p>
      <div className="signinSignup">
        {auth.authenticate ? renderLoggedInLinks() : renderNonLoggedInLinks()}
      </div>
    </div>
  );
};

export default Header;
