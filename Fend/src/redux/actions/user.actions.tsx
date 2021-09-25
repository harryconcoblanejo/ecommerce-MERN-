import { authconstants, userConstants } from './constants'

import axios from '../../helpers/axios'
import { Dispatch } from 'redux'

type signupUser = {
  userName: string
  email: string
  password: string
  roles: string[] | undefined
}

export const signup = (user: signupUser) => {
  console.log(user)
  return async (dispatch: Dispatch) => {
    dispatch({ type: userConstants.USER_REGISTER_SUCCESS })
    const res = await axios.post(`/admin/signup`, {
      ...user,
    })
    if (res.status === 200) {
      const { message } = res.data

      dispatch({
        type: userConstants.USER_REGISTER_SUCCESS,
        payload: {
          message,
        },
      })
    } else {
      if (res.status === 400) {
        dispatch({
          type: userConstants.USER_REGISTER_FAILURE,
          payload: { error: res.data.error },
        })
      }
    }
  }
}
