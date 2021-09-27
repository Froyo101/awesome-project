import * as React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { mapStateToPropsAuth } from './state/StateToProps';
import * as AuthActions from './state/actions/AuthActions';
import { Switch, Route, withRouter } from 'react-router-dom';

import HeadBar from './components/HeadBar';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import ProjectDetailView from './components/ProjectDetailView';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Test, {TestClass} from './components/Test';
import ProjectContainer from './components/ProjectContainer';

//const AppContent: React.FunctionComponent = (props: any) => {
class AppContent extends React.Component<any, any> {
  constructor(props) {
    super(props);

    this.checkAuthStatus = this.checkAuthStatus.bind(this);
  }

  actions = bindActionCreators(AuthActions, this.props.dispatch);

  checkAuthStatus = () => {
    axios.get("http://localhost:3000/logged_in", { withCredentials: true })
    .then((response) => {
      console.log("authorized? response", response);
      if (response.data.logged_in && !this.props.authStore.loggedIn) {
        this.actions.stillAuthorized(response.data.user);
      }
      else if (!response.data.logged_in && this.props.authStore.loggedIn) {
        this.actions.logout;
      }
    })
    .catch((error) => {
      console.log("authorized? error", error);
      this.actions.failedLogin(error);
    });
  }

  //React.useEffect(() => checkAuthStatus());

  initialCheck = false;

  componentDidMount() {
    //In the future for sec may want to update this to be flagged whenever a new route is detected
    if (!this.props.authStore.initialAuthCheck) this.checkAuthStatus();
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
          <Route exact path="/app/project/:id" component={withRouter(ProjectDetailView)} />
          <Route exact path="/app/signin" component={withRouter(Signin)} />
          <Route exact path="/app/signup" component={withRouter(Signup)} />
          <Route exact path="/app/test" component={withRouter(Test)} />
          <Route exact path="/app/testclass" component={withRouter(TestClass)} />
        </Switch>
      </div>
    );
  }
}

export default connect(mapStateToPropsAuth)(AppContent);