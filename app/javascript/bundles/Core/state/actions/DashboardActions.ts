import * as dashboardActionTypes from "../constants/DashboardConstants";

export function loadProjectsSuccess(projects) {
  return {
    type: dashboardActionTypes.LOAD_PROJECTS_SUCCESS,
    data: projects,
  };
}

export function changePage(pageNumber) {
  return {
    type: dashboardActionTypes.CHANGE_PAGE,
    data: pageNumber,
  };
}