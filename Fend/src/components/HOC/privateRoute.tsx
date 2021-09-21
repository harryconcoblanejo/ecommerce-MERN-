import React, { Component } from 'react'
import { Redirect, Route, RouteProps } from 'react-router'
export interface IProps {
  exact?: boolean
  path: string
  component: React.ComponentType<any>
}

const PrivateRoute: React.FC<IProps> = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      component={(props: IProps) => {
        const token = window.localStorage.getItem('token')
        if (token) {
          return <Component {...props} />
        } else {
          return <Redirect to={'/signin'} />
        }
      }}
    />
  )
}

export default PrivateRoute
