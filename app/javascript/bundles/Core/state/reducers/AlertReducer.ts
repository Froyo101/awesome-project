import * as alertActionTypes from "../constants/AlertConstants";

export const alertInitialState = {
  active: false,
  severity: null,
  message: null,
};

const alertReducer = (state = alertInitialState, action) => {
  console.log("In alert reducer");

  //let newState = {...state};

  switch (action.type) {
    case alertActionTypes.SHOW_ALERT:
      return {
        active: true,
        severity: action.data.severity,
        message: action.data.message,
      };
    case alertActionTypes.HIDE_ALERT:
      return {
        active: false,
        severity: null,
        message: null,
      }
    default:
      return state;
  }
};

export default alertReducer;