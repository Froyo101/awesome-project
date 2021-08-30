import * as authActionTypes from '../constants/AuthConstants';

export const authInitialState = {
  loggedIn: false,
};

// TODO - Make an action interface!
const authReducer = (state = authInitialState, action: any) => {
  console.log("In authReducer");
  switch (action.type) {
    case authActionTypes.LOGIN:
      console.log(Object.assign({}, state, {loggedIn: true}));
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