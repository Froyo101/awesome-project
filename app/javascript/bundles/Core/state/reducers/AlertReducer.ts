import * as alertActionTypes from "../constants/AlertConstants";

export const alertInitialState = {
  active: true,
  severity: "error",
  message: "Testing, attention please",
};

const alertReducer = (state = alertInitialState, action) => {
  console.log("In alert reducer");
  console.log("Alert state", state);

  let newState = {...state};

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