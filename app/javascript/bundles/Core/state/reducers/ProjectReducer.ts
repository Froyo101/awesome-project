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
          id: 2,
          title: "Sample Card 0",
          body: "Lorem ipsum et cetera et cetera",
        },
        {
          id: 3,
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
          id: 4,
          title: "Sample Card 0",
          body: "Lorem ipsum et cetera et cetera",
        },
        {
          id: 5,
          title: "Sample Card 1",
          body: "Lorem ipsum et cetera et cetera you get the idea",
        },
      ],
    },
  ],
};

//Need a function for retrieving last bucket/card id from a list that's loaded in
let curBucketID = 2;
let curCardID = 5;

const projectReducer = (state = projectInitialState, action) => {
  let newState = { ...state };

  switch (action.type) {
    case projectActionTypes.LOAD_PROJECT:
      return Object.assign({}, newState, {
        projectLoaded: true,
        ...action.project,
      });
    case projectActionTypes.ADD_CARD:
      const newContent = newState.content.map((bucket) => {
        if (bucket.id === action.data.bucketID) {
          const newCard = {
            id: curCardID + 1,
            title: action.data.title,
            body: "Lorem ipsum...",
          };

          curCardID++;

          return {
            ...bucket,
            cards: [...bucket.cards, newCard],
          };
        } else {
          return bucket;
        }
      });

      return Object.assign({}, newState, { content: newContent });
    case projectActionTypes.ADD_BUCKET:
      const newBucket = {
        id: curBucketID + 1,
        title: action.data,
        cards: [],
      };
      curBucketID++;
      newState.content.push(newBucket);
      return newState;
    default:
      return newState;
  }
};

export default projectReducer;

//UPDATE BUCKETS TO CONTAIN A HEADER FIELD TO PASS DOWN!
