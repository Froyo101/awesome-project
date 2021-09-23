import axios from "axios";
import * as projectActionTypes from "../constants/ProjectConstants";

export const projectInitialState = {
  projectLoaded: false,
  projectId: -1,
  title: "Loading...",
  owner: "Anon.",
  content: [
    {
      id: 0,
      title: "Sample Bucket 0",
      expanded: true,
      cards: [
        {
          id: 0,
          title: "Sample Card 0",
          body: "Lorem ipsum et cetera et cetera",
        },
      ],
    },
  ],
};

//Need a function for retrieving last bucket/card id from a list that's loaded in
//Scratch that, just make these a field of the state; indexData: {curBucketID: x, curCardID: y}
let curBucketID = 2;
let curCardID = 5;

//Call this from reducer switch before actually applying state changes to page
//If a positive response is returned, apply the state change (return modified newState)
//Otherwise return the initial state as is, or perhaps initial state plus a custom error state mapped on top of it
const patchContent = () => {
  axios.patch("")
    .then((response) => {
      if (true) return true;
    })
    .catch((error) => {

    });
}

const projectReducer = (state = projectInitialState, action) => {
  console.log("In project reducer");
  
  let newState = { ...state };

  switch (action.type) {
    case projectActionTypes.LOAD_PROJECT_SUCCESS:
      const parsedContent = JSON.parse(action.project.content);

      console.log(parsedContent);

      return Object.assign({}, newState, {
        projectLoaded: true,
        projectId: action.project.id,
        title: action.project.title,
        owner: action.project.owner,
        content: parsedContent,
      });
    case projectActionTypes.CLEAR_PROJECT:
      return Object.assign({}, projectInitialState);
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
        expanded: true,
        cards: [],
      };
      curBucketID++;
      newState.content.push(newBucket);
      return newState;
    case projectActionTypes.BUCKET_EXPANSION:
      const newContentExpansion = newState.content.map((bucket) => {
        if (bucket.id === action.data) {
          return {
            ...bucket,
            expanded: !bucket.expanded,
          };
        } else {
          return bucket;
        }
      });
      
      return Object.assign({}, newState, { content: newContentExpansion });
    case projectActionTypes.DND_BUCKET:
      return Object.assign({}, newState, { content: action.content });
    case projectActionTypes.DND_CARD:
      return Object.assign({}, newState, { content: action.content });
    default:
      return newState;
  }
};

export default projectReducer;

//UPDATE BUCKETS TO CONTAIN A HEADER FIELD TO PASS DOWN!
