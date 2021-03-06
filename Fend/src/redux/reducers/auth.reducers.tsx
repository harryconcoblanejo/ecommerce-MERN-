import { authconstants } from '../actions/constants';

export const initialState = {
  token: null,
  user: {
    userName: '',
    email: '',
  },
  authenticate: false,
  authenticating: false,
  loading: false,
  error: null,
  message: '',
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case authconstants.LOGIN_REQUEST:
      state = {
        ...state,
        authenticating: true,
      };
      break;

    case authconstants.LOGIN_SUCCESS:
      state = {
        ...state,
        user: action.payload.userFound,
        token: action.payload.token,
        authenticate: true,
        authenticating: false,
      };
      break;
    case authconstants.LOGOUT_REQUEST:
      state = {
        ...state,
        loading: true,
      };

      break;

    case authconstants.LOGOUT_SUCCCES:
      state = {
        ...initialState,
      };
      break;

    case authconstants.LOGOUT_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        loading: false,
      };

      break;
  }

  return state;
};
