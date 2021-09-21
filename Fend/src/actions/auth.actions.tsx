import { authconstants } from './constants'
import { singinUser } from '../components/signin'
import axios from '../helpers/axios'
import { Dispatch } from 'redux'

export const login = (user: singinUser) => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: authconstants.LOGIN_REQUEST })
    const res = await axios.post(`/signin`, {
      ...user,
    })
    if (res.status === 200) {
      const { token, userFound } = res.data
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))

      dispatch({
        type: authconstants.LOGIN_SUCCESS,
        payload: {
          token,
          userFound,
        },
      })
    } else {
      if (res.status === 400) {
        dispatch({
          type: authconstants.LOGIN_FAILURE,
          payload: { error: res.data.error },
        })
      }
    }
  }
}

export const isUserLoggedIn = () => {
  return async (dispatch: Dispatch<any>) => {
    const token = localStorage.getItem('token')
    if (token) {
      const userFound = JSON.parse(localStorage.getItem('user')!)
      dispatch({
        type: authconstants.LOGIN_SUCCESS,
        payload: {
          token,
          userFound,
        },
      })
    } else {
      dispatch({
        type: authconstants.LOGIN_FAILURE,
        payload: { error: 'Failed to login' },
      })
    }
  }
}

export const signout = () => {
  return (dispatch: Dispatch<any>) => {
    localStorage.clear()
    dispatch({
      type: authconstants.LOGOUT_REQUEST,
    })
  }
}
