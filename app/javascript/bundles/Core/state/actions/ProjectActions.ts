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
  };
}

export function addCard(data) {
  return {
    type: projectActionTypes.ADD_CARD,
    data: data,
  };
}

export function bucketExpansion(data) {
  return {
    type: projectActionTypes.BUCKET_EXPANSION,
    data: data,
  };
}

export function dndBucket(content) {
  return {
    type: projectActionTypes.DND_BUCKET,
    content: content,
  };
}

export function dndCard(content) {
  return {
    type: projectActionTypes.DND_CARD,
    content: content,
  };
}