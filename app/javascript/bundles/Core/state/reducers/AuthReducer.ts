import * as authActionTypes from '../constants/AuthConstants';

export const authInitialState = {
  loggedIn: false,
  user: null,
  authError: null,
  initialAuthCheck: false,
};

// TODO - Make an action interface!
const authReducer = (state = authInitialState, action: any) => {
  console.log("In authReducer");
  const newState = {...state};
  switch (action.type) {
    case authActionTypes.LOGIN_SUCCESS:
      //console.log(Object.assign({}, newState, {loggedIn: true}));
      return Object.assign({}, newState, {
        loggedIn: true,
        user: action.user,
        authError: null,
      });
    case authActionTypes.LOGIN_ERROR:
      //console.log(Object.assign({}, newState, {loggedIn: true}));
      return Object.assign({}, newState, {
        loggedIn: false,
        user: null,
        authError: action.error,
      });
    case authActionTypes.STILL_AUTHORIZED:
      return Object.assign({}, newState, {
        loggedIn: true,
        user: action.user,
        authError: null,
        initialAuthCheck: true,
      });
    case authActionTypes.LOGOUT:
      return Object.assign({}, newState, {
        loggedIn: false,
        user: null,
        authError: null,
      });
    default:
      return newState;
  }
};

export default authReducer;