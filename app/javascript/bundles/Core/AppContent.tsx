import * as React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as AuthActions from './state/actions/AuthActions';
import { Switch, Route, withRouter } from 'react-router-dom';

import HeadBar from './components/HeadBar';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Test, {TestClass} from './components/Test';

const mapStateToProps = (state) => {
  return {
    authStore: state.authReducer,
  };
};

//const AppContent: React.FunctionComponent = (props: any) => {
class AppContent extends React.Component<any, any> {
  constructor(props) {
    super(props);

    this.checkAuthStatus = this.checkAuthStatus.bind(this);
  }

  actions = bindActionCreators(AuthActions, this.props.dispatch);

  checkAuthStatus = () => {
    axios.get("http://localhost:3000/logged_in", { withCredentials: true })
    .then(response => {
      console.log("authorized? response", response);
      if (response.data.logged_in && !this.props.authStore.loggedIn) {
        this.actions.stillAuthorized(response.data.user);
      }
      else if (!response.data.logged_in && this.props.authStore.loggedIn) {
        this.actions.attemptLogout;
      }
    })
    .catch(error => {
      console.log("authorized? error", error);
      this.actions.failedLogin(error);
    });
  }

  //React.useEffect(() => checkAuthStatus());

  componentDidMount() {
    this.checkAuthStatus();
  }
  
  render() {
    return (
      <div>
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
      </div>
    );
  }
}

export default connect(mapStateToProps)(AppContent);