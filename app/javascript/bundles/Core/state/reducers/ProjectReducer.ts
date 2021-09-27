import axios from "axios";
import * as projectActionTypes from "../constants/ProjectConstants";

export const projectInitialState = {
  projectLoaded: false,
  projectId: -1,
  title: "Loading...",
  owner: "Anon.",
  indexData: {
    curBucketId: 0,
    curCardId: 0,
  },
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

//Call this from reducer switch before actually applying state changes to page
//If a positive response is returned, apply the state change (return modified newState)
//Otherwise return the initial state as is, or perhaps initial state plus a custom error state mapped on top of it
const patchContent = (projectId, newContent, indexData) => {
  let updated = false;

  axios
    .patch(
      `http://localhost:3000/projects/${projectId}`,
      {
        project: {
          content: JSON.stringify(newContent),
          indexData: indexData,
        },
      },
      { withCredentials: true }
    )
    .then((response) => {
      if (response.data.project_saved) {
        updated = true;
      }
    })
    .catch((error) => {
      console.log(error);
    });

  return updated;
};

//need to apply post to add actions, alter bucket/card render flow to check for deleted state and return an empty,
//hidden box/div/span if so

const projectReducer = (state = projectInitialState, action) => {
  console.log("In project reducer");

  let newState = { ...state };

  switch (action.type) {
    case projectActionTypes.LOAD_PROJECT_SUCCESS:
      const parsedContent = JSON.parse(action.project.content);

      console.log(parsedContent);

      return {
        projectLoaded: true,
        projectId: action.project.id,
        title: action.project.title,
        owner: action.project.owner,
        indexData: {
          curBucketId: action.project.cur_bucket_id,
          curCardId: action.project.cur_card_id,
        },
        content: parsedContent,
      };
    case projectActionTypes.CLEAR_PROJECT:
      return Object.assign({}, projectInitialState);
    case projectActionTypes.ADD_CARD:
      const newContent = newState.content.map((bucket) => {
        if (bucket.id === action.data.bucketID) {
          const newCard = {
            id: newState.indexData.curCardId + 1,
            title: action.data.title,
            body: "Lorem ipsum...",
          };

          newState.indexData.curCardId++;

          /*return {
            ...bucket,
            cards: [...bucket.cards, newCard],
          };*/

          console.log("bucket before new card", bucket);
          bucket.cards.push(newCard);
          console.log("bucket after new card", bucket);
          return bucket;
        } else {
          return bucket;
        }
      });

      if (patchContent(
        newState.projectId,
        newContent,
        newState.indexData,
      )) {
        return Object.assign({}, newState, { content: newContent });
      } else {
        return state;
      }
    case projectActionTypes.ADD_BUCKET:
      const newBucket = {
        id: newState.indexData.curBucketId + 1,
        title: action.data,
        expanded: true,
        cards: [],
      };
      newState.indexData.curBucketId++;
      newState.content.push(newBucket);
      
      if (patchContent(
        newState.projectId,
        newState.content,
        newState.indexData,
      )) {
        return newState;
      } else {
        return state;
      }
    case projectActionTypes.EDIT_CARD_TITLE:
      const newContentCardTitle = newState.content.map((bucket) => {
        if (bucket.id === action.bucketId) {
          const newCards = bucket.cards.map((card) => {
            if (card.id === action.cardId) {
              card.title = action.data;
            }

            return card;
          });

          return {
            ...bucket,
            cards: newCards,
          };
        } else {
          return bucket;
        }
      });

      if (
        patchContent(
          newState.projectId,
          newContentCardTitle,
          newState.indexData
        )
      ) {
        return Object.assign({}, newState, { content: newContentCardTitle });
      } else {
        return state;
      }
    case projectActionTypes.EDIT_CARD_BODY:
      const newContentCardBody = newState.content.map((bucket) => {
        if (bucket.id === action.bucketId) {
          const newCards = bucket.cards.map((card) => {
            if (card.id === action.cardId) {
              card.body = action.data;
            }

            return card;
          });

          return {
            ...bucket,
            cards: newCards,
          };
        } else {
          return bucket;
        }
      });

      if (
        patchContent(
          newState.projectId,
          newContentCardBody,
          newState.indexData
        )
      ) {
        return Object.assign({}, newState, { content: newContentCardBody });
      } else {
        return state;
      }
    case projectActionTypes.DELETE_CARD:
      console.log("deletion reached in reducer");
      
      const newContentCardDeletion = newState.content.map((bucket) => {
        if (bucket.id === action.bucketId) {
          const newCards = bucket.cards.filter((card) => {
            if (card.id === action.cardId) {
              console.log("target reached");
              return false;
            } else {
              return true;
            }
          })

          console.log(newCards);

          return {
            ...bucket,
            cards: newCards,
          };
        } else {
          return bucket;
        }
      });

      if (
        patchContent(
          newState.projectId,
          newContentCardDeletion,
          newState.indexData,
        )
      ) {
        return Object.assign({}, newState, { content: newContentCardDeletion });
      } else {
        return state;
      }
    case projectActionTypes.EDIT_BUCKET_TITLE:
      const newContentBucketTitle = newState.content.map((bucket) => {
        if (bucket.id === action.bucketId) {
          bucket.title = action.data;
        }

        return bucket;
      });

      if (
        patchContent(
          newState.projectId,
          newContentBucketTitle,
          newState.indexData,
        )
      ) {
        return Object.assign({}, newState, { content: newContentBucketTitle });
      } else {
        return state;
      }
    case projectActionTypes.DELETE_BUCKET:
      const newContentBucketDeletion = newState.content.filter((bucket) => {
        if (bucket.id === action.bucketId) {
          return false;
        } else {
          return true;
        }
      });

      if (
        patchContent(
          newState.projectId,
          newContentBucketDeletion,
          newState.indexData,
        )
      ) {
        return Object.assign({}, newState, { content: newContentBucketDeletion });
      } else {
        return state;
      }
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

      patchContent(newState.projectId, newContentExpansion, newState.indexData);

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
