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

export function mapStateToPropsProjectAuth(state) {
  return {
    authStore: state.authReducer,
    projectStore: state.projectReducer,
  };
}