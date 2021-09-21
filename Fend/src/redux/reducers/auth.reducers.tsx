import { authconstants } from '../actions/constants'

export const initialState = {
  token: null,
  user: {
    userName: '',
    email: '',
  },
  authenticate: false,
  authenticating: false,
}

export default (state = initialState, action: any) => {
  console.log(action)
  switch (action.type) {
    case authconstants.LOGIN_REQUEST:
      state = {
        ...state,
        authenticating: true,
      }
      break

    case authconstants.LOGIN_SUCCESS:
      state = {
        ...state,
        user: action.payload.userFound,
        token: action.payload.token,
        authenticate: true,
        authenticating: false,
      }
      break
    case authconstants.LOGOUT_REQUEST:
      state = {
        ...initialState,
      }

      break
  }

  return state
}
