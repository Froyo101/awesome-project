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

export function editCardTitle(data) {
  return {
    type: projectActionTypes.EDIT_CARD_TITLE,
    data: data,
  };
}

export function editCardBody(data) {
  return {
    type: projectActionTypes.EDIT_CARD_BODY,
    data: data,
  };
}

export function deleteCard(data) {
  return {
    type: projectActionTypes.EDIT_CARD_TITLE,
    data: data,
  };
}

export function editBucketTitle(data) {
  return {
    type: projectActionTypes.EDIT_BUCKET_TITLE,
    data: data,
  };
}

export function deleteBucket(data) {
  return {
    type: projectActionTypes.DELETE_BUCKET,
    data: data,
  };
}