import * as React from 'react';
import ReactOnRails from 'react-on-rails';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route} from 'react-router-dom';

import HeadBar from './components/HeadBar';

const App: React.FunctionComponent = (props, railsContext) => {
  const store = ReactOnRails.getStore('CoreAppStore', false);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <HeadBar />
        <Switch>
          <Route path="/" exact component={Home} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

export default App;