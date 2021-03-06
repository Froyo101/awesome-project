import * as projectActionTypes from "../constants/ProjectConstants";
import axios from "axios";

/*export function loadProject(dispatch, projectId) {
  axios
    .get(`http://localhost:3000/projects/${projectId}`, { withCredentials: true })
    .then((response) => {
      if (response.data.project_loaded) {
        dispatch(loadProjectSuccess(response.data.project));
      }
    })
    .catch((error) => {
      console.log("Project loading error", error);
    });
}*/

export function loadProjectSuccess(project) {
  return {
    type: projectActionTypes.LOAD_PROJECT_SUCCESS,
    project: project,
  };
}

export function loadProjectError() {
  return {
    type: projectActionTypes.LOAD_PROJECT_ERROR,
  };
}

export function clearProject() {
  return {
    type: projectActionTypes.CLEAR_PROJECT,
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

export function editCardTitle(bucketId, cardId, data) {
  return {
    type: projectActionTypes.EDIT_CARD_TITLE,
    bucketId: bucketId,
    cardId: cardId,
    data: data,
  };
}

export function editCardBody(bucketId, cardId, data) {
  return {
    type: projectActionTypes.EDIT_CARD_BODY,
    bucketId: bucketId,
    cardId: cardId,
    data: data,
  };
}

export function deleteCard(bucketId, cardId) {
  return {
    type: projectActionTypes.DELETE_CARD,
    bucketId: bucketId,
    cardId: cardId,
  };
}

export function editBucketTitle(bucketId, data) {
  return {
    type: projectActionTypes.EDIT_BUCKET_TITLE,
    bucketId: bucketId,
    data: data,
  };
}

export function deleteBucket(bucketId) {
  return {
    type: projectActionTypes.DELETE_BUCKET,
    bucketId: bucketId,
  };
}
