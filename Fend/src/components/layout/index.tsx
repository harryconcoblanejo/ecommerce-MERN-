import React from 'react';
import { NavLink } from 'react-router-dom';
import Header from '../header/Header';

const Layout = (props: any) => {
  return (
    <div className="homeContainer">
      <Header />

      {props.sidebar ? (
        <div className="subContainer">
          <div className="sideBar">
            <ul>
              <li>
                <NavLink to={'/'}>Home</NavLink>
              </li>
              <li>
                <NavLink to={'/category'}>Categories</NavLink>
              </li>

              <li>
                <NavLink to={'/Products'}>Products</NavLink>
              </li>

              <li>
                <NavLink to={'/Orders'}>Orders</NavLink>
              </li>
            </ul>
          </div>

          <div className="container">{props.children}</div>
        </div>
      ) : (
        props.children
      )}
    </div>
  );
};

export default Layout;
