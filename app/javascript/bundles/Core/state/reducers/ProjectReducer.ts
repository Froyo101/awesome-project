import * as projectActionTypes from "../constants/ProjectConstants";

export const projectInitialState = {
  projectLoaded: false,
  projectId: -1,
  title: "Loading...",
  owner: "Unknown",
  indexData: {
    curBucketId: 0,
    curCardId: 0,
  },
  content: [
    {
      id: 0,
      title: "Loading...",
      expanded: true,
      cards: [
        {
          id: 0,
          title: "Loading...",
          body: "...",
        },
      ],
    },
  ],
};

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
            body: "Click actions to edit this card!",
          };

          newState.indexData.curCardId++;

          /*return {
            ...bucket,
            cards: [...bucket.cards, newCard],
          };*/

          bucket.cards.push(newCard);
          return bucket;
        } else {
          return bucket;
        }
      });

      return Object.assign({}, newState, { content: newContent });
    case projectActionTypes.ADD_BUCKET:
      const newBucket = {
        id: newState.indexData.curBucketId + 1,
        title: action.data,
        expanded: true,
        cards: [],
      };
      newState.indexData.curBucketId++;
      newState.content.push(newBucket);

      return newState;
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

      return Object.assign({}, newState, { content: newContentCardTitle });
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

      return Object.assign({}, newState, { content: newContentCardBody });
    case projectActionTypes.DELETE_CARD:
      const newContentCardDeletion = newState.content.map((bucket) => {
        if (bucket.id === action.bucketId) {
          const newCards = bucket.cards.filter((card) => {
            console.log("Card being filtered", card);
            if (card.id === action.cardId) {
              console.log("target reached");
              return false;
            } else {
              return true;
            }
          });

          console.log("newCards", newCards);

          return {
            ...bucket,
            cards: newCards,
          };
        } else {
          return bucket;
        }
      });

      return Object.assign({}, newState, { content: newContentCardDeletion });
    case projectActionTypes.EDIT_BUCKET_TITLE:
      const newContentBucketTitle = newState.content.map((bucket) => {
        if (bucket.id === action.bucketId) {
          bucket.title = action.data;
        }

        return bucket;
      });

      return Object.assign({}, newState, { content: newContentBucketTitle });
    case projectActionTypes.DELETE_BUCKET:
      const newContentBucketDeletion = newState.content.filter((bucket) => {
        if (bucket.id === action.bucketId) {
          return false;
        } else {
          return true;
        }
      });

      return Object.assign({}, newState, { content: newContentBucketDeletion });
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
