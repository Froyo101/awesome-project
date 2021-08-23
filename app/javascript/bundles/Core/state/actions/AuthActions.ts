import * as authActionTypes from '../constants/AuthConstants';

export function attemptLogin() {
  return {
    type: authActionTypes.LOGIN,
  };
}

export function attemptLogout() {
  return {
    type: authActionTypes.LOGOUT,
  };
}