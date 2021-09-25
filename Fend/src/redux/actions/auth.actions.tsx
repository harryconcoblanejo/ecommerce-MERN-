import { authconstants } from './constants';
import { singinUser } from '../../components/signin';
import axios from '../../helpers/axios';
import { Dispatch } from 'redux';

export const login = (user: singinUser) => {
  console.log(user);
  return async (dispatch: Dispatch) => {
    dispatch({ type: authconstants.LOGIN_REQUEST });
    const res = await axios.post(`/admin/signin`, {
      ...user,
    });
    if (res.status === 200) {
      const { token, userFound } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      dispatch({
        type: authconstants.LOGIN_SUCCESS,
        payload: {
          token,
          userFound,
        },
      });
    } else {
      if (res.status === 400) {
        dispatch({
          type: authconstants.LOGIN_FAILURE,
          payload: { error: res.data.error },
        });
      }
    }
  };
};

export const isUserLoggedIn = () => {
  return async (dispatch: Dispatch<any>) => {
    const token = window.localStorage.getItem('token');
    if (token) {
      const userFound = JSON.parse(localStorage.getItem('user')!);
      dispatch({
        type: authconstants.LOGIN_SUCCESS,
        payload: {
          token,
          userFound,
        },
      });
    } else {
      dispatch({
        type: authconstants.LOGIN_FAILURE,
        payload: { error: 'Failed to login' },
      });
    }
  };
};

export const signout = () => {
  // const token = localStorage.getItem('token')

  return async (dispatch: Dispatch<any>) => {
    const res = await axios.post('/admin/signout');

    dispatch({ type: authconstants.LOGOUT_REQUEST });

    if (res.status === 200) {
      localStorage.clear();
      dispatch({
        type: authconstants.LOGOUT_SUCCCES,
      });
    } else {
      dispatch({
        type: authconstants.LOGOUT_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};
