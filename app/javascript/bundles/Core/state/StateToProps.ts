export function mapStateToPropsAuth(state) {
  return {
    authStore: state.authReducer,
  };
}