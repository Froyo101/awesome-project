import * as React from 'react';
import ReactOnRails from 'react-on-rails';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route} from 'react-router-dom';

import HeadBar from './components/HeadBar';
import Home from './components/Home';
import Signup from './components/Signup';

const ClientApp: React.FunctionComponent = (_props, _railsContext) => {
  const store = ReactOnRails.getStore('CoreAppStore', false);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <HeadBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/signup" component={Signup} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

export default ClientApp;