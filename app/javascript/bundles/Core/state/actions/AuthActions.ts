import * as authActionTypes from '../constants/AuthConstants';

export function successfulLogin(user) {
  console.log("Successful login - " + authActionTypes.LOGIN_SUCCESS);
  return {
    type: authActionTypes.LOGIN_SUCCESS,
    user: user,
  };
}

export function failedLogin(error) {
  console.log("Failed login - " + authActionTypes.LOGIN_ERROR);
  return {
    type: authActionTypes.LOGIN_ERROR,
    error: error,
  }
}

export function stillAuthorized(user) {
  console.log("User still authorized");
  return {
    type: authActionTypes.STILL_AUTHORIZED,
    user: user,
  }
}

export function attemptLogout() {
  return {
    type: authActionTypes.LOGOUT,
  };
}