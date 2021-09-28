import * as dashboardActionTypes from "../constants/DashboardConstants";

export function loadProjectsSuccess(projects) {
  return {
    type: dashboardActionTypes.LOAD_PROJECTS_SUCCESS,
    data: projects,
  };
}