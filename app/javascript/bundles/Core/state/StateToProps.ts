export function mapStateToPropsAuth(state) {
  return {
    authStore: state.authReducer,
  };
}

export function mapStateToPropsProject(state) {
  return {
    authStore: state.authReducer,
    projectStore: state.projectReducer,
  }
}