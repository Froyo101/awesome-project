import * as React from 'react';
import ReactOnRails from 'react-on-rails';
import axios from 'axios';

import { Provider } from 'react-redux';
import * as AuthActions from './state/actions/AuthActions';
import { BrowserRouter } from 'react-router-dom';

import AppContent from './AppContent';

const ClientApp: any = (_props, railsContext) => {
  const store = ReactOnRails.getStore('CoreAppStore', false);

  let error;
  let redirectLocation;

  if (error || redirectLocation) {
    return { error, redirectLocation };
  }

  const { location } = railsContext;
  console.log("Location: " + railsContext.location);
  const context = {};

  // TENTATIVELY MOVED TO APPCONTENT COMPONENT
  /*const checkAuthStatus = () => {
    axios.get("http://localhost:3000/logged_in", { withCredentials: true })
    .then(response => {
      console.log("authorized? response", response);
      if (response.data.logged_in && !store.authReducer.loggedIn) {
        store.dispatch(AuthActions.stillAuthorized(response.data.user));
      }
      else if (!response.data.logged_in && store.authReducer.loggedIn) {
        store.dispatch(AuthActions.attemptLogout);
      }
    })
    .catch(error => {
      console.log("authorized? error", error);
    });
  }

  React.useEffect(() => checkAuthStatus());*/

  return () => (
    <Provider store={store}>
      <BrowserRouter location={location} context={context}>
        <AppContent />
      </BrowserRouter>
    </Provider>
  );
};

export default ClientApp;