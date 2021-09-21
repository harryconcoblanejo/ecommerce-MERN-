import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  NavLink,
  Redirect,
} from 'react-router-dom'
import { RootState } from '../../redux/reducers'

const Signup = () => {
  const auth = useSelector((state: RootState) => state.auth)

  if (auth.authenticate) {
    return <Redirect to={`/`} />
  }

  return (
    <Fragment>
      <form action="  ">
        <input type="text" placeholder="password" />
        <input type="text" placeholder="email" />
        <button type="submit">Signup!</button>
      </form>
      <NavLink to="/">HOME</NavLink>
    </Fragment>
  )
}

export default Signup
