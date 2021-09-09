import * as projectActionTypes from "../constants/ProjectConstants";

export function loadProject(project) {
  return {
    type: projectActionTypes.LOAD_PROJECT,
    project: project,
  };
}

export function addBucket(data) {
  return {
    type: projectActionTypes.ADD_BUCKET,
    data: data,
  }
}

export function addCard(data) {
  return {
    type: projectActionTypes.ADD_CARD,
    data: data,
  }
}