import React, { ChangeEvent, Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  NavLink,
  Redirect,
} from 'react-router-dom';
import { signup } from '../../redux/actions';
import { RootState } from '../../redux/reducers';
import Header from '../header/Header';
import '../signup/signup.styles/index.scss';

const Signup = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [roles, setRoles] = useState([] as any);

  const [error, setError] = useState('');

  const userSignup = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = {
      userName,
      email,
      password,
      roles,
    };
    dispatch(signup(user));
    console.log(user);
  };

  if (auth.authenticate) {
    return <Redirect to={`/`} />;
  }

  if (user.loading) {
    return <p>Loading..!</p>;
  }

  return (
    <>
      <Header />

      <form className="signupForm" onSubmit={userSignup}>
        <input
          type="text"
          placeholder="user name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />

        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="text"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="text"
          placeholder="roles"
          value={roles}
          onChange={(e) => setRoles(e.target.value)}
        />

        <button type="submit">Signup!</button>
      </form>
    </>
  );
};

export default Signup;
