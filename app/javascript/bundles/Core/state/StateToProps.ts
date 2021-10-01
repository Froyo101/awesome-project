export function mapStateToPropsAuth(state) {
  return {
    authStore: state.authReducer,
  };
}

export function mapStateToPropsProject(state) {
  return {
    projectStore: state.projectReducer,
  };
}

export function mapStateToPropsDashboard(state) {
  return {
    dashboardStore: state.dashboardReducer,
  };
}

export function mapStateToPropsAlert(state) {
  return {
    alertStore: state.alertReducer,
  };
}

export function mapStateToPropsDashboardAuth(state) {
  return {
    authStore: state.authReducer,
    dashboardStore: state.dashboardReducer,
  };
}

export function mapStateToPropsProjectAuth(state) {
  return {
    authStore: state.authReducer,
    projectStore: state.projectReducer,
  };
}