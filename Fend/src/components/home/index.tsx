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
import Layout from '../layout';
import './homeStyles/index.scss';
import '../header/header.styes/header.scss';

const Home = () => {
  return <Layout sidebar></Layout>;
};

export default Home;
