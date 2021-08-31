import * as authActionTypes from '../constants/AuthConstants';

export const authInitialState = {
  loggedIn: false,
  user: null,
  authError: null,
};

// TODO - Make an action interface!
const authReducer = (state = authInitialState, action: any) => {
  console.log("In authReducer");
  switch (action.type) {
    case authActionTypes.LOGIN_SUCCESS:
      console.log(Object.assign({}, state, {loggedIn: true}));
      return Object.assign({}, state, {
        loggedIn: true,
        user: action.user,
        authError: null,
      });
    case authActionTypes.LOGIN_ERROR:
      console.log(Object.assign({}, state, {loggedIn: true}));
      return Object.assign({}, state, {
        loggedIn: false,
        user: null,
        authError: action.error,
      });
    case authActionTypes.STILL_AUTHORIZED:
      return Object.assign({}, state, {
        loggedIn: true,
        user: action.user,
        authError: null,
      })
    case authActionTypes.LOGOUT:
      return Object.assign({}, state, {
        loggedIn: false,
        user: null,
        authError: null,
      });
    default:
      return state;
  }
};

export default authReducer;