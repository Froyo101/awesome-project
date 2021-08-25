import * as React from 'react';
import ReactOnRails from 'react-on-rails';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router'; 
import { Switch, Route} from 'react-router-dom';

import HeadBar from './components/HeadBar';
import Home from './components/Home';
import Signup from './components/Signup';

// TODO - DO NOT REPEAT YOURSELF!!! Separate switch/route implemenation from Client/Server containers!
// Also, prob should properly type this at some point
const ServerApp: any = (_props, railsContext) => {
  const store = ReactOnRails.getStore('CoreAppStore', false);

  let error;
  let redirectLocation;

  if (error || redirectLocation) {
    return { error, redirectLocation };
  }

  const { location } = railsContext;
  const context = {};

  return (
    <Provider store={store}>
      <StaticRouter location={location} context={context}>
        <HeadBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signup" component={Signup} />
        </Switch>
      </StaticRouter>
    </Provider>
  );
};

//export default ServerApp; // If using this, need to return () => () in ServerApp
export default (props) => <ServerApp {...props} />;