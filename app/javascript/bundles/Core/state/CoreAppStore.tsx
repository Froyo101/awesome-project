import { applyMiddleware, compose, createStore, combineReducers } from '@reduxjs/toolkit';
import { routerReducer } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
// TODO - Add logger middleware!
// TODO - Import reducers and initialStates from a reducers folder!
import authReducer, { authInitialState } from './reducers/AuthReducer';
import railsContextReducer from './reducers/RailsContextReducer';

const coreAppStore = (props, railsContext) => {
  const initialProps = props;
  const combinedState = {
    authStore: authInitialState,
    railsContext,
  };

  const combinedReducer = combineReducers({
    authReducer,
    railsContextReducer,
    routing: routerReducer,
  });

  const combinedCreateStore = compose(applyMiddleware(thunkMiddleware))(createStore);
  return combinedCreateStore(combinedReducer, combinedState);
}

export default coreAppStore;