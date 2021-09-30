import * as dashboardActionTypes from "../constants/DashboardConstants";

export const dashboardInitialState = {
  projects: [],
  projectsLoaded: false,
  currentPage: 1,
  projectsPerPage: 10,
};

const dashboardReducer = (state = dashboardInitialState, action) => {
  console.log("In dashboard reducer");

  let newState = {...state};

  switch (action.type) {
    case dashboardActionTypes.LOAD_PROJECTS_SUCCESS:
      return Object.assign({}, newState, { projects: action.data, projectsLoaded: true });
    case dashboardActionTypes.CHANGE_PAGE:
      return Object.assign({}, newState, { currentPage: action.data });
    case dashboardActionTypes.RELOAD_DASHBOARD:
      return Object.assign({}, newState, { projectsLoaded: false });
    default:
      return state;
  }
}

export default dashboardReducer;