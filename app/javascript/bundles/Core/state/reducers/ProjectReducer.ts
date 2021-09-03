import * as projectActionTypes from "../constants/ProjectConstants";

export const projectInitialState = {
  projectLoaded: true,
  title: "Sample Project",
  owner: "Froyo101",
  sharedWith: ["jdoe123", "Froyo102"],
  content: [
    {
      id: 0,
      title: "Sample Bucket 0",
      cards: [
        {
          id: 0,
          title: "Sample Card 0",
          body: "Lorem ipsum et cetera et cetera",
        },
        {
          id: 1,
          title: "Sample Card 1",
          body: "Lorem ipsum et cetera et cetera you get the idea",
        },
      ],
    },
    {
      id: 1,
      title: "Sample Bucket 1",
      cards: [
        {
          id: 0,
          title: "Sample Card 0",
          body: "Lorem ipsum et cetera et cetera",
        },
        {
          id: 1,
          title: "Sample Card 1",
          body: "Lorem ipsum et cetera et cetera you get the idea",
        },
      ],
    },
    {
      id: 2,
      title: "Sample Bucket 2",
      cards: [
        {
          id: 0,
          title: "Sample Card 0",
          body: "Lorem ipsum et cetera et cetera",
        },
        {
          id: 1,
          title: "Sample Card 1",
          body: "Lorem ipsum et cetera et cetera you get the idea",
        },
      ],
    },
  ],
};

const projectReducer = (state = projectInitialState, action) => {
  const newState = { ...state };

  switch (action.type) {
    case projectActionTypes.LOAD_PROJECT:
      return Object.assign({}, newState, {
        projectLoaded: true,
        ...action.project,
      });
    default:
      return newState;
  }
};

export default projectReducer;
