import * as React from 'react';
import ReactOnRails from 'react-on-rails';
import axios from 'axios';

import { Provider } from 'react-redux';
import * as AuthActions from './state/actions/AuthActions';
import { BrowserRouter, Switch, Route, withRouter } from 'react-router-dom';

import HeadBar from './components/HeadBar';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Test, {TestClass} from './components/Test';

// todo - do not repeat yourself!!! separate switch/route implemenation from client/server containers!
// also, prob should properly type this at some point
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

  const checkAuthStatus = () => {
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

  React.useEffect(() => checkAuthStatus());

  // Consider putting root path last as a catch-all to reroute any misc traffic to the home page?
  return () => (
    <Provider store={store}>
      <BrowserRouter location={location} context={context}>
        <HeadBar />
        <Switch>
          <Route exact path="/" component={withRouter(Home)} />
          <Route exact path="/app" component={withRouter(Home)} />
          <Route exact path="/app/home" component={withRouter(Home)} />
          <Route exact path="/app/dashboard" component={withRouter(Dashboard)} />
          <Route exact path="/app/signin" component={withRouter(Signin)} />
          <Route exact path="/app/signup" component={withRouter(Signup)} />
          <Route exact path="/app/test" component={withRouter(Test)} />
          <Route exact path="/app/testclass" component={withRouter(TestClass)} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

export default ClientApp;