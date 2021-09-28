import { applyMiddleware, compose, createStore, combineReducers } from '@reduxjs/toolkit';
import { routerReducer } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
// TODO - Add logger middleware!
import authReducer, { authInitialState } from './reducers/AuthReducer';
import projectReducer, { projectInitialState } from './reducers/ProjectReducer';
import dashboardReducer, { dashboardInitialState } from './reducers/DashboardReducer';
import railsContextReducer, { railsContextInitialState } from './reducers/RailsContextReducer';

// CONSIDER - Make interface for combinedState?

const coreAppStore = (props, railsContext) => {
  //const initialProps = props;
  const combinedState = {
    authReducer: authInitialState,
    projectReducer: projectInitialState,
    dashboardReducer: dashboardInitialState,
    railsContext,
    routing: null,
  };

  const combinedReducer = combineReducers({
    authReducer,
    projectReducer,
    dashboardReducer,
    railsContext: railsContextReducer,
    routing: routerReducer,
  });

  const combinedCreateStore = compose(applyMiddleware(thunkMiddleware))(createStore);
  return combinedCreateStore(combinedReducer, combinedState);
}

export default coreAppStore;