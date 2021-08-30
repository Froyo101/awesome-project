import * as authActionTypes from '../constants/AuthConstants';

export function attemptLogin() {
  console.log("Attempted login: " + authActionTypes.LOGIN);
  return {
    type: authActionTypes.LOGIN,
  };
}

export function attemptLogout() {
  return {
    type: authActionTypes.LOGOUT,
  };
}