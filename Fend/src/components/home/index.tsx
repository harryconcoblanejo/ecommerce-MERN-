import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  NavLink,
} from 'react-router-dom';
import { signout } from '../../redux/actions';
import { RootState } from '../../redux/reducers';
import Header from '../header/Header';
import Layout from '../layout/Layout';
import './homeStyles/index.scss';

const Home = () => {
  return (
    <Layout>
      <div className="subContainer">
        <div className="sideBar">
          <ul>
            <li>
              <NavLink to={'/'}>Home</NavLink>{' '}
            </li>

            <li>
              <NavLink to={'/Products'}>Products</NavLink>{' '}
            </li>

            <li>
              <NavLink to={'/Orders'}>Orders</NavLink>
            </li>
          </ul>
        </div>

        <div className="container">container</div>
      </div>
    </Layout>
  );
};

export default Home;
