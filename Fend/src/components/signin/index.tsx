import React, { ChangeEvent, Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { BrowserRouter as Router, NavLink, Redirect } from 'react-router-dom';
import { login } from '../../redux/actions/index';
import { RootState } from '../../redux/reducers/index';
import Header from '../header/Header';
import '../signin/signinStyles/signin.styles.scss';

export type singinUser = {
  email: string;
  password: string;
};

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const auth = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch();

  const userLogin = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const user: singinUser = {
      email,
      password,
    };

    dispatch(login(user));
  };
  if (auth.authenticate) {
    return <Redirect to={`/`} />;
  }
  return (
    <Fragment>
      <Header />
      <form className="form" onSubmit={userLogin}>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />

        <button type="submit">Signin!</button>
      </form>

      {/* <NavLink to="/">HOME</NavLink> */}
    </Fragment>
  );
};

export default Signin;
