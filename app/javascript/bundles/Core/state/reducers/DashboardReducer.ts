import * as dashboardActionTypes from "../constants/DashboardConstants";

export const dashboardInitialState = {
  posts: [],
  loading: false,
  currentPage: 1,
  postsPerPage: 10,
};

const dashboardReducer = (state = dashboardInitialState, action) => {
  console.log("In dashboard reducer");

  switch (action.type) {
    case dashboardActionTypes.LOAD_PROJECTS_SUCCESS:
      return state;
  }
}

export default dashboardReducer;