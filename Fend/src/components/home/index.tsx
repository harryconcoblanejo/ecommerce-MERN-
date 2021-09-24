import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  NavLink,
} from 'react-router-dom'
import { signout } from '../../redux/actions'
import { RootState } from '../../redux/reducers'
import Header from '../header/Header'
import '../home/homeStyles.css'

const Home = () => {
  return (
    <div className="homeContainer">
      <Header />

      <div className="subContainer">
        <div className="sideBar">
          <h2>sidebar</h2>
        </div>
        <div className="container">
          <h2>container</h2>
        </div>
      </div>
    </div>
  )
}

export default Home
