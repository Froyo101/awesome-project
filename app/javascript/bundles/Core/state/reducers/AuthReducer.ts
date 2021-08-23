import * as authActionTypes from '../constants/AuthConstants';

export const authInitialState = {
  loggedIn: false,
};

// TODO - Make an action interface!
const authReducer = (state = authInitialState, action: any) => {
  switch (action.type) {
    case authActionTypes.LOGIN:
      return Object.assign({}, state, {
        loggedIn: true,
      });
    case authActionTypes.LOGOUT:
      return Object.assign({}, state, {
        loggedIn: false,
      });
    default:
      return state;
  }
};

export default authReducer;