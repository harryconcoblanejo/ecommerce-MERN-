import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { signout } from '../../redux/actions'
import { RootState } from '../../redux/reducers'

const Header = () => {
  const dispatch = useDispatch()
  const auth = useSelector((state: RootState) => state.auth)

  const logout = () => {
    dispatch(signout())
  }

  const renderLoggedInLinks = () => {
    return (
      <div>
        {/* <NavLink to="signin">Signin</NavLink>
        <br />
        <NavLink to="signup">Signup</NavLink> */}
        <br />
        <span onClick={logout}>Signout</span>
      </div>
    )
  }

  const renderNonLoggedInLinks = () => {
    return (
      <div>
        <NavLink to="signin">Signin</NavLink>
        <br />
        <NavLink to="signup">Signup</NavLink>
      </div>
    )
  }
  return (
    <div>
      <h1>Welcome to admin Dashboard</h1>
      {auth.authenticate ? renderLoggedInLinks() : renderNonLoggedInLinks()}
    </div>
  )
}

export default Header
