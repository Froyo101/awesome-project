import * as alertActionTypes from "../constants/AlertConstants";

export function showAlert(severity, message) {
  return {
    type: alertActionTypes.SHOW_ALERT,
    data: {
      severity: severity,
      message: message,
    },
  };
}

export function hideAlert() {
  return {
    type: alertActionTypes.HIDE_ALERT,
  };
}