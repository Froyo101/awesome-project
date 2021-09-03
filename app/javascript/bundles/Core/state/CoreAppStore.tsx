import { applyMiddleware, compose, createStore, combineReducers } from '@reduxjs/toolkit';
import { routerReducer } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
// TODO - Add logger middleware!
// TODO - Import reducers and initialStates from a reducers folder!
import authReducer, { authInitialState } from './reducers/AuthReducer';
import projectReducer, { projectInitialState } from './reducers/ProjectReducer';
import railsContextReducer, { railsContextInitialState } from './reducers/RailsContextReducer';

// CONSIDER - Make interface for combinedState?

const coreAppStore = (props, railsContext) => {
  //const initialProps = props;
  const combinedState = {
    authReducer: authInitialState,
    projectReducer: projectInitialState,
    railsContext,
    routing: null,
  };

  const combinedReducer = combineReducers({
    authReducer,
    projectReducer,
    railsContext: railsContextReducer,
    routing: routerReducer,
  });

  const combinedCreateStore = compose(applyMiddleware(thunkMiddleware))(createStore);
  return combinedCreateStore(combinedReducer, combinedState);
}

export default coreAppStore;