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
            <NavLink
              className="sidebarLink"
              activeClassName="selected"
              to={'/'}
              exact
            >
              Home
            </NavLink>

            <NavLink
              className="sidebarLink"
              to={'/category'}
              activeClassName="selected"
            >
              Categories
            </NavLink>

            <NavLink
              className="sidebarLink"
              to={'/Products'}
              activeClassName="selected"
            >
              Products
            </NavLink>

            <NavLink
              className="sidebarLink "
              to={'/Orders'}
              activeClassName="selected"
            >
              Orders
            </NavLink>
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
