import * as projectActionTypes from "../constants/ProjectConstants";

export function loadProject(project) {
  return {
    type: projectActionTypes.LOAD_PROJECT,
    project: project,
  };
}